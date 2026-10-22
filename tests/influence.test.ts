import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import {
  demoData,
  summary,
  influenceHref,
} from '../apps/main/components/influence/model';
test('Influence reports use the latest cumulative snapshot and separate planned fees from recorded payments', () => {
  const d = demoData();
  const first = summary(d);
  assert.equal(first.views, 110000);
  assert.equal(first.planned, 5500000);
  assert.equal(first.paid, 1800000);
  d.metrics.push({
    ...d.metrics[0],
    id: 'new',
    views: 70000,
    captured_at: '2026-11-15T10:00:00Z',
  });
  assert.equal(summary(d).views, 118000);
  assert.equal(summary({ ...d, metrics: [] }).views, null);
  assert.equal(summary({ ...d, metrics: [] }).engagement, null);
  assert.ok(
    influenceHref('dashboard?demo=1').endsWith('/influence/dashboard/?demo=1'),
  );
});
test('Influence isolates brands and creators, protects approval and finance, preserves contract snapshots and rejects stale writes', async () => {
  const db = await PGlite.create();
  const owner = '00000000-0000-4000-8000-000000000001',
    clientA = '00000000-0000-4000-8000-000000000002',
    clientB = '00000000-0000-4000-8000-000000000003',
    creator = '00000000-0000-4000-8000-000000000004';
  const read = (f: string) =>
    readFileSync(
      new URL('../supabase/migrations/' + f, import.meta.url),
      'utf8',
    );
  const as = async (id: string, role = 'authenticated') => {
    await db.exec('reset role');
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id]);
    await db.exec(`set role ${role}`);
  };
  const cmd = async (
    op: string,
    target: string | null,
    input: unknown,
    revision: number | null = null,
  ) =>
    (
      await db.query<{ id: string }>(
        'select public.influence_command($1,$2,$3::jsonb,$4) as id',
        [op, target, JSON.stringify(input), revision],
      )
    ).rows[0].id;
  const workspace = async () =>
    (
      await db.query<{ d: ReturnType<typeof demoData> }>(
        'select public.influence_workspace() as d',
      )
    ).rows[0].d;
  try {
    await db.exec(
      `create role anon nologin;create role authenticated nologin;create schema auth;create table auth.users(id uuid primary key,email text unique,email_confirmed_at timestamptz,raw_user_meta_data jsonb default '{}');create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;`,
    );
    await db.exec(
      read('20261020115600_ecosystem_accounts_learning_insights.sql'),
    );
    await db.exec(read('20261022170635_influence_campaign_portals.sql'));
    for (const [id, email] of [
      [owner, 'contact.smartsell@gmail.com'],
      [clientA, 'a@example.invalid'],
      [clientB, 'b@example.invalid'],
      [creator, 'creator@example.invalid'],
    ])
      await db.query(
        'insert into auth.users(id,email,email_confirmed_at)values($1,$2,now())',
        [id, email],
      );
    await as(creator);
    const profile = await cmd('apply_creator', null, {
      consent: 'yes',
      name: 'Créateur test',
      category: 'Tech',
      location: 'Conakry',
      network: 'YouTube',
      bio: 'Une description fictive de test suffisamment longue.',
      social_url: 'https://example.invalid/creator',
    });
    assert.equal(
      (await workspace()).creators.length,
      0,
      'application must not publish itself',
    );
    await assert.rejects(
      cmd('review_creator', profile, { publish: true }),
      /Forbidden/,
    );
    await as(owner);
    await cmd('review_creator', profile, { publish: true, followers: 1000 });
    await as(clientA);
    const brief = {
      title: 'Campagne A',
      brand: 'Marque A',
      objective: 'Découverte',
      brief: 'Une campagne de test fictive avec un objectif à vérifier.',
      budget_gnf: 12000000,
      start_date: '2026-11-01',
      end_date: '2026-11-30',
      creators: [profile],
    };
    const campaignA = await cmd('create_campaign', null, brief);
    await as(clientB);
    const campaignB = await cmd('create_campaign', null, {
      ...brief,
      title: 'Campagne B',
      brand: 'Marque B',
      creators: [],
    });
    assert.deepEqual(
      (await workspace()).campaigns.map((c) => c.id),
      [campaignB],
    );
    await assert.rejects(
      cmd('assign_creator', campaignA, { creator_id: profile }),
      /Forbidden/,
    );
    await as(owner);
    const mission = await cmd('assign_creator', campaignA, {
      creator_id: profile,
      title: 'Vidéo test',
      objective: 'Présenter un produit de démonstration',
      deadline: '2026-11-15',
      fee_gnf: 500000,
    });
    await as(clientB);
    assert.equal((await workspace()).missions.length, 0);
    await assert.rejects(
      cmd(
        'mission_action',
        mission,
        { state: 'approved', feedback: 'Très bon contenu.' },
        1,
      ),
      /Forbidden/,
    );
    await as(creator);
    let d = await workspace();
    assert.equal(d.missions.length, 1);
    assert.equal(d.campaigns.length, 1);
    assert.equal(
      d.campaigns[0].budget_gnf,
      0,
      'creator must not see the brand total budget',
    );
    assert.equal(
      (await db.query('select * from public.influence_campaigns')).rows.length,
      0,
      'direct reads must not reveal campaign budget',
    );
    await assert.rejects(
      cmd('record_metric', mission, {
        views: 10,
        likes: 2,
        comments: 0,
        shares: 0,
        clicks: 0,
        evidence_url: 'https://example.invalid/proof',
      }),
      /submitted/,
    );
    await cmd('mission_action', mission, { state: 'accepted' }, 1);
    await assert.rejects(
      cmd(
        'mission_action',
        mission,
        { state: 'submitted', content_url: 'https://example.invalid/video' },
        1,
      ),
      /Conflict/,
    );
    await cmd(
      'mission_action',
      mission,
      { state: 'submitted', content_url: 'https://example.invalid/video' },
      2,
    );
    await cmd('record_metric', mission, {
      views: 100,
      likes: 10,
      comments: 2,
      shares: 1,
      clicks: 4,
      evidence_url: 'https://example.invalid/proof',
    });
    await assert.rejects(
      cmd('record_metric', mission, {
        views: -1,
        likes: 0,
        comments: 0,
        shares: 0,
        clicks: 0,
        evidence_url: 'https://example.invalid/proof',
      }),
    );
    await as(clientA);
    d = await workspace();
    assert.equal(d.metrics.length, 1);
    assert.equal(d.campaigns[0].budget_gnf, 12000000);
    await assert.rejects(
      cmd(
        'mission_action',
        mission,
        { state: 'approved', feedback: 'Validation du client.' },
        3,
      ),
      /Only Smartsell/,
    );
    await assert.rejects(
      cmd('record_cost', campaignA, {
        amount_gnf: 100000,
        kind: 'other',
        reference: 'R-1',
      }),
      /Forbidden/,
    );
    await as(owner);
    await cmd(
      'configure_mission',
      mission,
      {
        contract_text:
          'Conditions fictives suffisamment détaillées pour ce test.',
        contract_status: 'signed',
        contract_reference: 'TEST-CONTRAT',
      },
      3,
    );
    await assert.rejects(
      cmd(
        'configure_mission',
        mission,
        {
          contract_text: 'Réécriture non autorisée.',
          contract_status: 'signed',
          contract_reference: 'TEST-CONTRAT',
        },
        4,
      ),
      /immutable/,
    );
    await cmd(
      'mission_action',
      mission,
      { state: 'approved', feedback: 'Validation éditoriale Smartsell.' },
      4,
    );
    await cmd('record_cost', campaignA, {
      mission_id: mission,
      amount_gnf: 250000,
      kind: 'creator_payment',
      reference: 'TEST-VERSEMENT',
    });
    await assert.rejects(
      cmd('record_cost', campaignB, {
        mission_id: mission,
        amount_gnf: 250000,
        kind: 'creator_payment',
        reference: 'TEST-ERREUR',
      }),
      /another campaign/,
    );
    await assert.rejects(
      cmd('record_cost', campaignA, {
        mission_id: mission,
        amount_gnf: 250000,
        kind: 'creator_payment',
        reference: 'TEST-VERSEMENT',
      }),
      /unique/,
    );
    await cmd('record_cost', campaignA, {
      amount_gnf: 100000,
      kind: 'production',
      reference: 'TEST-PROD',
    });
    await as(creator);
    d = await workspace();
    assert.equal(d.costs.length, 1);
    assert.equal(summary(d).paid, 250000);
    await as(clientB);
    assert.equal((await workspace()).costs.length, 0);
    await as('', 'anon');
    assert.equal(
      (await db.query('select * from public.influence_directory')).rows.length,
      1,
    );
    await assert.rejects(
      db.query('select * from public.influence_profiles'),
      /permission denied/,
    );
    await assert.rejects(
      db.query('select public.influence_workspace()'),
      /permission denied/,
    );
    await assert.rejects(
      cmd('create_campaign', null, brief),
      /permission denied/,
    );
    await db.exec('reset role');
    assert.equal(
      (
        await db.query<{ n: number }>(
          "select count(*)::int n from public.user_roles where segment='*' and role='admin'",
        )
      ).rows[0].n,
      1,
      'no new global role is granted',
    );
  } finally {
    await db.close();
  }
});

test('Owner reservation moves to the requested professional address without confirming accounts or changing a claimed owner', async () => {
  const db = new PGlite();
  const read = async (name: string) =>
    readFileSync(
      new URL('../supabase/migrations/' + name, import.meta.url),
      'utf8',
    );
  try {
    await db.exec(`create role anon; create role authenticated; create schema auth;
      create table auth.users(id uuid primary key, email text, email_confirmed_at timestamptz, raw_user_meta_data jsonb default '{}');
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true),'')::uuid $$;`);
    await db.exec(
      await read('20261020115600_ecosystem_accounts_learning_insights.sql'),
    );
    const pro = '50000000-0000-0000-0000-000000000001';
    const old = '50000000-0000-0000-0000-000000000002';
    await db.query('insert into auth.users(id,email) values($1,$2)', [
      pro,
      'contact@smartsell.pro',
    ]);
    const change = await read('20261022183255_smartsell_owner_contact_pro.sql');
    await db.exec(change);
    assert.equal(
      (await db.query('select * from public.user_roles')).rows.length,
      0,
    );
    assert.equal(
      (
        await db.query(
          'select email_confirmed_at from auth.users where id=$1',
          [pro],
        )
      ).rows[0].email_confirmed_at,
      null,
    );
    await db.query(
      'insert into auth.users(id,email,email_confirmed_at) values($1,$2,now())',
      [old, 'contact.smartsell@gmail.com'],
    );
    assert.equal(
      (
        await db.query('select * from public.user_roles where user_id=$1', [
          old,
        ])
      ).rows.length,
      0,
    );
    await db.query(
      'update auth.users set email_confirmed_at=now() where id=$1',
      [pro],
    );
    assert.equal(
      (
        await db.query(
          "select * from public.user_roles where user_id=$1 and segment='*' and role='admin'",
          [pro],
        )
      ).rows.length,
      1,
    );
    await db.exec(change);
    assert.equal(
      (await db.query('select * from public.user_roles')).rows.length,
      1,
    );
    await db.query(
      'insert into private.owner_bootstrap(email,claimed_by) values($1,$2)',
      ['contact.smartsell@gmail.com', old],
    );
    await assert.rejects(db.exec(change), /Original owner already claimed/);
  } finally {
    await db.close();
  }
});
