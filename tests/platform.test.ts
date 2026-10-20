import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
const migration = readFileSync(
  new URL(
    '../supabase/migrations/20261020115600_ecosystem_accounts_learning_insights.sql',
    import.meta.url,
  ),
  'utf8',
);
const seed = readFileSync(
  new URL('../supabase/seed.sql', import.meta.url),
  'utf8',
);
const owner = '00000000-0000-4000-8000-000000000001';
const alice = '00000000-0000-4000-8000-000000000002';
const bob = '00000000-0000-4000-8000-000000000003';
const media = '00000000-0000-4000-8000-000000000004';
test('Supabase policies, owner bootstrap, learning commands, conflicts and real analytics', async () => {
  const db = await PGlite.create();
  try {
    await db.exec(`create role anon nologin;create role authenticated nologin;create schema auth;
 create table auth.users(id uuid primary key,email text unique,email_confirmed_at timestamptz,raw_user_meta_data jsonb default '{}');
 create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;
 `);
    await db.exec(migration);
    await db.exec(seed);
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
    await db.query('insert into auth.users(id,email) values($1,$2)', [
      owner,
      'contact.smartsell@gmail.com',
    ]);
    assert.equal(
      await scalar('select count(*)::int from public.user_roles'),
      0,
      'unconfirmed owner must not receive a role',
    );
    await db.query(
      'update auth.users set email_confirmed_at=now() where id=$1',
      [owner],
    );
    assert.equal(
      await scalar('select count(*)::int from public.user_roles'),
      1,
    );
    for (const [id, email] of [
      [alice, 'alice@example.invalid'],
      [bob, 'bob@example.invalid'],
      [media, 'media@example.invalid'],
    ])
      await db.query(
        'insert into auth.users(id,email,email_confirmed_at,raw_user_meta_data) values($1,$2,now(),\'{"role":"admin"}\')',
        [id, email],
      );
    await db.query(
      "insert into public.user_roles(user_id,segment,role)values($1,'media','editor')",
      [media],
    );
    await asUser(alice);
    assert.equal(
      await scalar('select count(*)::int from public.user_roles'),
      0,
      'user metadata cannot assign an admin role',
    );
    await assert.rejects(
      db.query("insert into public.user_roles values($1,'*','admin')", [alice]),
      /permission denied/,
    );
    await assert.rejects(
      db.query(
        "select public.ecosystem_statistics(now()-interval '1 day',now()+interval '1 day')",
      ),
      /Forbidden/,
    );
    await db.query("select public.ecosystem_enroll('communication-digitale')");
    await db.query("select public.ecosystem_enroll('communication-digitale')");
    assert.equal(
      await scalar('select count(*)::int from public.academy_enrollments'),
      1,
      'idempotent enrolment',
    );
    assert.equal(
      await scalar(
        "select public.ecosystem_complete_lesson('communication-digitale',0,2)",
      ),
      false,
    );
    assert.equal(
      await scalar('select count(*)::int from public.academy_progress'),
      0,
    );
    assert.equal(
      await scalar(
        "select public.ecosystem_complete_lesson('communication-digitale',0,0)",
      ),
      true,
    );
    assert.equal(
      await scalar(
        "select public.ecosystem_complete_lesson('communication-digitale',0,0)",
      ),
      true,
    );
    assert.equal(
      await scalar('select count(*)::int from public.academy_progress'),
      1,
      'idempotent completion',
    );
    await assert.rejects(
      db.query(
        'insert into public.academy_progress(user_id,course_slug,lesson_index)values($1,$2,2)',
        [alice, 'communication-digitale'],
      ),
      /permission denied/,
    );
    await assert.rejects(
      db.query('select * from private.lesson_keys'),
      /permission denied/,
    );
    await db.query(
      "insert into public.requests(user_id,segment,subject,message)values($1,'academy','Formation équipe','Nous souhaitons connaître les dates de formation.')",
      [alice],
    );
    await asUser(bob);
    assert.equal(
      await scalar('select count(*)::int from public.academy_enrollments'),
      0,
      'Bob cannot read Alice enrolment',
    );
    assert.equal(
      await scalar('select count(*)::int from public.academy_progress'),
      0,
      'Bob cannot read Alice progress',
    );
    assert.equal(
      await scalar('select count(*)::int from public.requests'),
      0,
      'Bob cannot read Alice request',
    );
    await assert.rejects(
      db.query(
        "select public.ecosystem_complete_lesson('communication-digitale',0,0)",
      ),
      /Enrollment required/,
    );
    await asUser(media);
    assert.equal(
      await scalar(
        "select count(*)::int from public.content_collections where segment='academy'",
      ),
      0,
      'scoped media role cannot read academy drafts',
    );
    await assert.rejects(
      db.query(
        "select public.ecosystem_save_collection('academy','courses','[]',1)",
      ),
      /Forbidden/,
    );
    await asUser(null, 'anon');
    await assert.rejects(
      db.query('select * from public.profiles'),
      /permission denied/,
    );
    await assert.rejects(
      db.query('select * from public.content_collections'),
      /permission denied/,
    );
    await assert.rejects(
      db.query('select * from public.academy_progress'),
      /permission denied/,
    );
    assert.equal(
      await scalar('select count(*)::int from public.academy_courses'),
      13,
    );
    await assert.rejects(
      db.query(
        "select public.ecosystem_track_visit('00000000-0000-4000-8000-000000000010','/fr/admin/','page_view')",
      ),
      /Invalid event/,
    );
    await db.query(
      "select public.ecosystem_track_visit('00000000-0000-4000-8000-000000000010','/fr/agency/','page_view')",
    );
    await db.query(
      "select public.ecosystem_track_visit('00000000-0000-4000-8000-000000000010','/fr/academy/','page_view')",
    );
    await db.query(
      "select public.ecosystem_track_visit('00000000-0000-4000-8000-000000000010','/fr/agency/','page_view')",
    );
    await assert.rejects(
      db.query('select * from public.visit_events'),
      /permission denied/,
    );
    await asUser(owner);
    const revision = await scalar(
      "select revision::int from public.content_collections where segment='media' and collection='articles'",
    );
    const items = await scalar(
      "select items from public.content_collections where segment='media' and collection='articles'",
    );
    assert.equal(
      await scalar(
        "select public.ecosystem_save_collection('media','articles',$1,$2)::int",
        [JSON.stringify(items), revision],
      ),
      2,
    );
    await assert.rejects(
      db.query(
        "select public.ecosystem_save_collection('media','articles','[]',1)",
      ),
      /Conflict/,
    );
    assert.equal(
      await scalar(
        "select revision::int from public.content_collections where segment='media' and collection='articles'",
      ),
      2,
    );
    const stats = (await scalar(
      "select public.ecosystem_statistics(now()-interval '1 day',now()+interval '1 day')",
    )) as {
      enrollments: number;
      lessons_completed: number;
      journeys: unknown[];
      segments: { segment: string; page_views: number }[];
    };
    assert.equal(stats.enrollments, 1);
    assert.equal(stats.lessons_completed, 1);
    assert.equal(stats.journeys.length, 1);
    assert.equal(
      stats.segments.find((s) => s.segment === 'agency')?.page_views,
      1,
      'deduplicated page views',
    );
    assert.equal(
      stats.segments.find((s) => s.segment === 'academy')?.page_views,
      1,
    );
    const requestId = await scalar('select id from public.requests');
    await db.query(
      "update public.requests set state='in_progress' where id=$1",
      [requestId],
    );
    await assert.rejects(
      db.query('update public.requests set user_id=$1 where id=$2', [
        bob,
        requestId,
      ]),
      /permission denied/,
    );
    await db.query('select public.ecosystem_publish_content()');
    assert.equal(
      await scalar('select count(*)::int from public.published_collections'),
      12,
    );
    await asUser(null, 'anon');
    assert.equal(
      await scalar('select count(*)::int from public.published_collections'),
      12,
    );
    await asUser(null, 'anon');
    await assert.rejects(
      db.query('select public.ecosystem_publish_content()'),
      /permission denied/,
    );
    await asUser(null);
    await db.exec('reset role');
    await db.query('delete from public.user_roles where user_id=$1', [owner]);
    await asUser(owner);
    await assert.rejects(
      db.query(
        "select public.ecosystem_save_collection('media','articles','[]',2)",
      ),
      /Forbidden/,
      'revocation takes effect without JWT refresh',
    );
  } finally {
    await db.close();
  }
});
