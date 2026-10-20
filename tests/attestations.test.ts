import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';

test('Attestations require full access and every server-validated lesson; ownership, verification and revocation hold', async () => {
  const db = await PGlite.create();
  const owner = '00000000-0000-4000-8000-000000000001';
  const alice = '00000000-0000-4000-8000-000000000002';
  const bob = '00000000-0000-4000-8000-000000000003';
  const unconfirmed = '00000000-0000-4000-8000-000000000004';
  const slug = 'communication-digitale';
  const scalar = async (sql: string, params: unknown[] = []) =>
    Object.values(
      (await db.query(sql, params)).rows[0] as Record<string, unknown>,
    )[0];
  const asUser = async (id: string | null, role = 'authenticated') => {
    await db.exec('reset role');
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [
      id || '',
    ]);
    await db.exec(`set role ${role}`);
  };
  try {
    await db.exec(`create role anon nologin; create role authenticated nologin; create schema auth;
      create table auth.users(id uuid primary key,email text,email_confirmed_at timestamptz,raw_user_meta_data jsonb default '{}');
      create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
      grant usage on schema auth to anon,authenticated; grant execute on function auth.uid() to anon,authenticated;`);
    for (const path of [
      '../supabase/migrations/20261020115600_ecosystem_accounts_learning_insights.sql',
      '../supabase/seed.sql',
      '../supabase/migrations/20261020180047_course_participation_attestations.sql',
    ])
      await db.exec(readFileSync(new URL(path, import.meta.url), 'utf8'));
    for (const [id, email] of [
      [owner, 'contact.smartsell@gmail.com'],
      [alice, 'alice@example.invalid'],
      [bob, 'bob@example.invalid'],
      [unconfirmed, 'unconfirmed@example.invalid'],
    ])
      await db.query(
        'insert into auth.users values($1,$2,case when $1::uuid=$3::uuid then null else now() end,\'{"display_name":"Camara Test"}\')',
        [id, email, unconfirmed],
      );
    await asUser(alice);
    await db.query('select public.ecosystem_enroll($1)', [slug]);
    for (let i = 0; i < 3; i++)
      await db.query('select public.ecosystem_complete_lesson($1,$2,0)', [
        slug,
        i,
      ]);
    await db.exec('select public.ecosystem_claim_attestations()');
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      0,
      'a completed preview never earns an attestation',
    );
    await assert.rejects(
      db.query(
        'update public.academy_enrollments set full_access_granted_at=now()',
      ),
      /permission denied/,
    );
    await assert.rejects(
      db.query(
        "insert into public.academy_attestations(user_id,course_slug,learner_name,course_title,lessons_completed)values($1,$2,'Forged','{}',3)",
        [alice, slug],
      ),
      /permission denied/,
    );
    await db.exec('reset role');
    await db.query(
      "update public.academy_courses set access='invitation' where slug=$1",
      [slug],
    );
    await db.query(
      'insert into private.academy_attestation_policies(course_slug,enabled,required_lessons)values($1,true,3)',
      [slug],
    );
    await db.query(
      'update public.academy_enrollments set full_access_granted_at=now() where user_id=$1 and course_slug=$2',
      [alice, slug],
    );
    await asUser(alice);
    await db.exec('select public.ecosystem_claim_attestations()');
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      0,
      'preview work before full access is not enough',
    );
    assert.equal(
      await scalar('select public.ecosystem_complete_lesson($1,0,2)', [slug]),
      false,
    );
    for (let i = 0; i < 2; i++)
      await db.query('select public.ecosystem_complete_lesson($1,$2,0)', [
        slug,
        i,
      ]);
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      0,
      'incomplete training is ineligible',
    );
    await db.query('select public.ecosystem_complete_lesson($1,2,0)', [slug]);
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      1,
      'the final correct answer issues the attestation',
    );
    const id = (await scalar(
      'select id::text from public.academy_attestations',
    )) as string;
    await db.exec(
      'select public.ecosystem_claim_attestations();select public.ecosystem_claim_attestations()',
    );
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      1,
      'issuance is idempotent',
    );
    await db.query(
      "update public.profiles set display_name='Changed name' where id=$1",
      [alice],
    );
    const record = (await scalar(
      'select public.ecosystem_verify_attestation($1)',
      [id],
    )) as Record<string, unknown>;
    assert.equal(
      record.learner_name,
      'Camara Test',
      'issued names are immutable snapshots',
    );
    assert.equal(record.status, 'valid');
    assert.equal('user_id' in record, false);
    assert.equal('email' in record, false);
    await asUser(bob);
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      0,
      'other learners cannot list documents',
    );
    await assert.rejects(
      db.query("select public.ecosystem_revoke_attestation($1,'Test reason')", [
        id,
      ]),
      /Forbidden/,
    );
    await db.exec('reset role');
    await db.query(
      'insert into public.academy_enrollments(user_id,course_slug,full_access_granted_at)values($1,$2,now())',
      [unconfirmed, slug],
    );
    await asUser(unconfirmed);
    for (let i = 0; i < 3; i++)
      await db.query('select public.ecosystem_complete_lesson($1,$2,0)', [
        slug,
        i,
      ]);
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      0,
      'an unconfirmed identity cannot receive a document',
    );
    await assert.rejects(
      db.query('select * from private.academy_attestation_policies'),
      /permission denied/,
    );
    await asUser(null, 'anon');
    await assert.rejects(
      db.query('select * from public.academy_attestations'),
      /permission denied/,
    );
    await assert.rejects(
      db.exec('select public.ecosystem_claim_attestations()'),
      /permission denied/,
    );
    await assert.rejects(
      db.query('select private.issue_attestation($1,$2)', [alice, slug]),
      /permission denied/,
    );
    const publicRecord = (await scalar(
      'select public.ecosystem_verify_attestation($1)',
      [id],
    )) as Record<string, unknown>;
    assert.equal(publicRecord.status, 'valid');
    assert.equal(
      await scalar(
        "select public.ecosystem_verify_attestation('00000000-0000-4000-8000-000000000099')",
      ),
      null,
    );
    await asUser(owner);
    await db.query(
      "select public.ecosystem_revoke_attestation($1,'Correction nécessaire')",
      [id],
    );
    await asUser(null, 'anon');
    assert.equal(
      (
        (await scalar('select public.ecosystem_verify_attestation($1)', [
          id,
        ])) as Record<string, unknown>
      ).status,
      'revoked',
    );
  } finally {
    await db.close();
  }
});
