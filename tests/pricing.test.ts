import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import {
  defaultPricing,
  pricingErrors,
  normalizePricing,
  coursePrice,
  type Pricing,
} from '../packages/content/src/academy-pricing';
const fixture = () => structuredClone(defaultPricing);
const offer = (d: Pricing) => {
  d.courses[0].price = 150000;
  d.courses[0].promotion = {
    enabled: true,
    price: 100000,
    start: '2026-11-01T10:00:00Z',
    end: '2026-11-08T10:00:00Z',
  };
};
test('Every module starts free; individual prices and bounded promotions are independent', () => {
  const c = fixture();
  assert.deepEqual(
    normalizePricing({ tiers: [{ price: 100000 }] }),
    c,
    'old unpublished tier snapshots become the free individual-module model',
  );
  assert.deepEqual(pricingErrors(c), []);
  assert.equal(c.courses.length, 14);
  assert.ok(c.courses.every((r) => r.price === 0 && !r.promotion.enabled));
  assert.equal(c.subscription.status, 'coming_soon');
  assert.equal(c.subscription.catalog, 'all');
  const changed = fixture();
  offer(changed);
  assert.deepEqual(pricingErrors(changed), []);
  assert.equal(
    coursePrice(
      changed,
      'communication-digitale',
      Date.parse('2026-11-01T09:59:59Z'),
    ),
    150000,
  );
  assert.equal(
    coursePrice(
      changed,
      'communication-digitale',
      Date.parse('2026-11-01T10:00:00Z'),
    ),
    100000,
  );
  assert.equal(
    coursePrice(
      changed,
      'communication-digitale',
      Date.parse('2026-11-08T10:00:00Z'),
    ),
    150000,
  );
  assert.equal(coursePrice(changed, 'redaction-web'), 0);
  assert.equal(coursePrice(changed, 'court-metrage-ia-complet'), 0);
  changed.courses[0].promotion.price = 0;
  assert.deepEqual(pricingErrors(changed), []);
  assert.equal(
    coursePrice(
      changed,
      'communication-digitale',
      Date.parse('2026-11-02T10:00:00Z'),
    ),
    0,
    'temporary free promotion',
  );
  for (const change of [
    (d: Pricing) => {
      d.courses[0].price = -1;
    },
    (d: Pricing) => {
      d.courses[0].price = 1.5;
    },
    (d: Pricing) => {
      d.courses[13].price = 200000;
    },
    (d: Pricing) => {
      d.courses[0].slug = 'unknown';
    },
    (d: Pricing) => {
      offer(d);
      d.courses[0].promotion.price = 150000;
    },
    (d: Pricing) => {
      offer(d);
      d.courses[0].promotion.end = d.courses[0].promotion.start;
    },
    (d: Pricing) => {
      offer(d);
      d.courses[0].promotion.start = 'invalid';
    },
    (d: Pricing) => {
      d.subscription.status = 'active';
    },
    (d: Pricing) => {
      d.subscription.catalog = 'selected';
    },
    (d: Pricing) => {
      d.subscription.plans[0].durationDays = 0;
    },
  ]) {
    const draft = fixture();
    change(draft);
    assert.ok(pricingErrors(draft).length);
  }
});
test('Supabase preserves free launch, owner-only per-module prices, promotion rules and inactive all-catalog subscriptions', async () => {
  const db = await PGlite.create();
  const owner = '00000000-0000-4000-8000-000000000001';
  const editor = '00000000-0000-4000-8000-000000000002';
  const read = (name: string) =>
    readFileSync(new URL(`../supabase/${name}`, import.meta.url), 'utf8');
  try {
    await db.exec(
      `create role anon nologin;create role authenticated nologin;create schema auth;create table auth.users(id uuid primary key,email text unique,email_confirmed_at timestamptz,raw_user_meta_data jsonb default '{}');create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;`,
    );
    await db.exec(
      read(
        'migrations/20261020115600_ecosystem_accounts_learning_insights.sql',
      ),
    );
    await db.exec(read('seed.sql'));
    await db.exec(read('migrations/20261021095752_academy_pricing_packs.sql'));
    await db.exec(
      read('migrations/20261021102007_academy_module_prices_promotions.sql'),
    );
    await db.query(
      'insert into auth.users(id,email,email_confirmed_at)values($1,$2,now()),($3,$4,now())',
      [owner, 'contact.smartsell@gmail.com', editor, 'editor@example.invalid'],
    );
    await db.query(
      "insert into public.user_roles(user_id,segment,role)values($1,'academy','editor')",
      [editor],
    );
    const asUser = async (id: string, role = 'authenticated') => {
      await db.exec('reset role');
      await db.query("select set_config('request.jwt.claim.sub',$1,false)", [
        id,
      ]);
      await db.exec(`set role ${role}`);
    };
    const saved = async () =>
      (
        await db.query<{
          items: { configuration: Pricing }[];
          revision: number;
        }>(
          "select items,revision from public.content_collections where segment='academy' and collection='pricing'",
        )
      ).rows[0];
    const save = async (c: Pricing, rev = 2) =>
      db.query(
        "select public.ecosystem_save_collection('academy','pricing',$1::jsonb,$2)",
        [
          JSON.stringify([
            {
              slug: 'academy-pricing',
              title: { fr: 'Prix', en: 'Prices' },
              configuration: c,
            },
          ]),
          rev,
        ],
      );
    await asUser('', 'anon');
    const publicRow = (
      await db.query<{ items: { configuration: Pricing }[] }>(
        "select items from public.published_collections where segment='academy' and collection='pricing'",
      )
    ).rows[0];
    assert.deepEqual(publicRow.items[0].configuration, fixture());
    await assert.rejects(save(fixture()), /permission denied/);
    await asUser(editor);
    await assert.rejects(save(fixture()), /owner-only/);
    await asUser(owner);
    assert.equal((await saved()).revision, 2);
    for (const change of [
      (d: Pricing) => {
        d.courses[13].price = 100000;
      },
      (d: Pricing) => {
        d.subscription.status = 'active';
      },
      (d: Pricing) => {
        offer(d);
        d.courses[0].promotion.price = 160000;
      },
      (d: Pricing) => {
        offer(d);
        d.courses[0].promotion.end = '2026-10-01T10:00:00Z';
      },
      (d: Pricing) => {
        d.courses[0].price = 10.5;
      },
    ]) {
      const d = fixture();
      change(d);
      await assert.rejects(save(d));
      assert.equal((await saved()).revision, 2);
    }
    const changed = fixture();
    offer(changed);
    await save(changed);
    assert.equal((await saved()).revision, 3);
    const publicPrice = async () =>
      (
        await db.query<{ items: { configuration: Pricing }[] }>(
          "select items from public.published_collections where segment='academy' and collection='pricing'",
        )
      ).rows[0].items[0].configuration.courses[0].price;
    assert.equal(
      await publicPrice(),
      0,
      'draft must not leak into public prices',
    );
    await assert.rejects(save(fixture()), /Conflict/);
    await db.query('select public.ecosystem_publish_content()');
    assert.equal(await publicPrice(), 150000);
    assert.equal(
      (
        await db.query<{ count: number }>(
          'select count(*)::int as count from public.academy_enrollments',
        )
      ).rows[0].count,
      0,
      'settings do not create or change enrolments',
    );
    await assert.rejects(
      db.exec(
        "delete from public.content_collections where collection='pricing'",
      ),
      /permission denied/,
    );
  } finally {
    await db.close();
  }
});
