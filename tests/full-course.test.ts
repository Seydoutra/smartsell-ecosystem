import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';

test('Full courses keep content private, grade all answers server-side, enforce module order and issue a single attestation', async () => {
  const db = await PGlite.create();
  const owner = '00000000-0000-4000-8000-000000000001';
  const alice = '00000000-0000-4000-8000-000000000002';
  const bob = '00000000-0000-4000-8000-000000000003';
  const slug = 'full-course-test';
  const scalar = async (sql: string, params: unknown[] = []) =>
    Object.values(
      (await db.query(sql, params)).rows[0] as Record<string, unknown>,
    )[0] as any;
  const asUser = async (id: string | null, role = 'authenticated') => {
    await db.exec('reset role');
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [
      id || '',
    ]);
    await db.exec(`set role ${role}`);
  };
  try {
    await db.exec(`create role anon nologin;create role authenticated nologin;create schema auth;
      create table auth.users(id uuid primary key,email text,email_confirmed_at timestamptz,raw_user_meta_data jsonb default '{}');
      create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
      grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;`);
    for (const path of [
      '../supabase/migrations/20261020115600_ecosystem_accounts_learning_insights.sql',
      '../supabase/seed.sql',
      '../supabase/migrations/20261020180047_course_participation_attestations.sql',
      '../supabase/migrations/20261020181210_immersive_full_courses.sql',
      '../supabase/migrations/20261020183617_guided_course_progression.sql',
    ])
      await db.exec(readFileSync(new URL(path, import.meta.url), 'utf8'));
    for (const [id, email] of [
      [owner, 'contact.smartsell@gmail.com'],
      [alice, 'alice@example.invalid'],
      [bob, 'bob@example.invalid'],
    ])
      await db.query(
        `insert into auth.users values($1,$2,now(),' {"display_name":"Learner Test"}')`,
        [id, email],
      );
    const question = {
      number: 1,
      group: 'Test',
      text: 'A learning question',
      options: ['A', 'B'],
      answer: 1,
      explanation: 'Explanation after submission',
    };
    const curriculum = {
      sourceSha256: 'a'.repeat(64),
      intro: [],
      modules: [
        {
          title: 'First',
          blocks: [{ type: 'text', text: 'Private lesson' }],
          questions: [question, { ...question, number: 2 }],
          passScore: 2,
        },
        { title: 'Final', blocks: [], questions: [question], passScore: 1 },
      ],
    };
    await db.query('select private.install_full_course($1,$2,$3,false)', [
      slug,
      JSON.stringify({ fr: 'Full test' }),
      JSON.stringify(curriculum),
    ]);
    await asUser(alice);
    await assert.rejects(
      db.query('select public.ecosystem_enroll($1)', [slug]),
      /Invitation required/,
    );
    await assert.rejects(
      db.query('select public.ecosystem_read_course_module($1,0)', [slug]),
      /Full access required/,
    );
    await assert.rejects(
      db.query('select * from private.academy_full_courses'),
      /permission denied/,
    );
    await assert.rejects(
      db.query('select public.ecosystem_grant_course_access($1,$2)', [
        slug,
        'alice@example.invalid',
      ]),
      /Forbidden/,
    );
    await asUser(owner);
    await db.query('select public.ecosystem_grant_course_access($1,$2)', [
      slug,
      'alice@example.invalid',
    ]);
    await asUser(alice);
    const unit = await scalar(
      'select public.ecosystem_read_course_module($1,0)',
      [slug],
    );
    assert.equal(unit.blocks[0].text, 'Private lesson');
    assert.equal('answer' in unit.questions[0], false);
    assert.equal('explanation' in unit.questions[0], false);
    await assert.rejects(
      db.query('select public.ecosystem_read_course_module($1,1)', [slug]),
      /previous modules/,
    );
    await assert.rejects(
      db.query('select public.ecosystem_answer_course_question($1,1,0,1)', [
        slug,
      ]),
      /previous modules/,
    );
    for (const [questionIndex, choice] of [
      [-1, 1],
      [2, 1],
      [null, 1],
      [0, null],
      [0, 2],
    ])
      await assert.rejects(
        db.query('select public.ecosystem_answer_course_question($1,0,$2,$3)', [
          slug,
          questionIndex,
          choice,
        ]),
        /Invalid question or choice/,
      );
    assert.deepEqual(
      await scalar('select public.ecosystem_answer_course_question($1,0,0,0)', [
        slug,
      ]),
      { correct: false, answer: 1, explanation: question.explanation },
    );
    assert.equal(
      (
        await scalar(
          'select public.ecosystem_answer_course_question($1,0,0,1)',
          [slug],
        )
      ).correct,
      true,
    );
    assert.equal(
      await scalar('select count(*)::int from public.academy_progress'),
      0,
      'practice never completes a module',
    );
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      0,
      'practice never issues an attestation',
    );
    await assert.rejects(
      db.query('select public.ecosystem_complete_lesson($1,0,0)', [slug]),
      /Full assessment required/,
    );
    await assert.rejects(
      db.query('select private.complete_preview_lesson($1,0,0)', [slug]),
      /permission denied/,
    );
    await assert.rejects(
      db.query('select public.ecosystem_submit_course_quiz($1,1,$2)', [
        slug,
        '[1]',
      ]),
      /previous modules/,
    );
    await assert.rejects(
      db.query('select public.ecosystem_submit_course_quiz($1,0,$2)', [
        slug,
        '[1]',
      ]),
      /every question/,
    );
    const failed = await scalar(
      'select public.ecosystem_submit_course_quiz($1,0,$2)',
      [slug, '[0,1]'],
    );
    assert.equal(failed.passed, false);
    assert.equal(failed.score, 1);
    assert.equal(failed.feedback[0].answer, 1);
    assert.equal(
      await scalar('select count(*)::int from public.academy_progress'),
      0,
    );
    await db.query('select public.ecosystem_submit_course_quiz($1,0,$2)', [
      slug,
      '[1,1]',
    ]);
    assert.equal(
      (await scalar('select public.ecosystem_read_course_module($1,1)', [slug]))
        .title,
      'Final',
    );
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      0,
    );
    await db.query('select public.ecosystem_submit_course_quiz($1,1,$2)', [
      slug,
      '[1]',
    ]);
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      1,
    );
    await db.query('select public.ecosystem_submit_course_quiz($1,1,$2)', [
      slug,
      '[1]',
    ]);
    assert.equal(
      await scalar('select count(*)::int from public.academy_attestations'),
      1,
    );
    await db.query(
      'insert into public.academy_workbooks(user_id,course_slug,lesson_index,notes)values($1,$2,0,$3)',
      [alice, slug, 'Private project notes'],
    );
    await asUser(bob);
    await assert.rejects(
      db.query('select public.ecosystem_answer_course_question($1,0,0,1)', [
        slug,
      ]),
      /Full access required/,
    );
    assert.equal(
      await scalar('select count(*)::int from public.academy_workbooks'),
      0,
    );
    await assert.rejects(
      db.query('select public.ecosystem_read_course_module($1,0)', [slug]),
      /Full access required/,
    );
    await assert.rejects(
      db.query(
        'insert into public.academy_workbooks(user_id,course_slug,lesson_index,notes)values($1,$2,1,$3)',
        [alice, slug, 'Forged'],
      ),
      /row-level security/,
    );
    await asUser(null, 'anon');
    await assert.rejects(
      db.query('select public.ecosystem_answer_course_question($1,0,0,1)', [
        slug,
      ]),
      /permission denied/,
    );
    await assert.rejects(
      db.query('select public.ecosystem_read_course_module($1,0)', [slug]),
      /permission denied/,
    );
    await db.exec('reset role');
    await db.query(
      "insert into public.published_collections(segment,collection,items,revision) select segment,collection,items,revision from public.content_collections where segment='academy' and collection='courses' on conflict(segment,collection) do update set items=excluded.items",
    );
    assert.equal(
      await scalar(
        'select published from public.academy_courses where slug=$1',
        [slug],
      ),
      true,
      'publishing previews preserves full course',
    );
    const changed = { ...curriculum, sourceSha256: 'b'.repeat(64) };
    await assert.rejects(
      db.query('select private.install_full_course($1,$2,$3,false)', [
        slug,
        '{}',
        JSON.stringify(changed),
      ]),
      /immutable/,
    );
    await db.query(
      'update private.academy_full_courses set self_enroll=true where course_slug=$1',
      [slug],
    );
    await asUser(bob);
    await db.query('select public.ecosystem_enroll($1)', [slug]);
    assert.equal(
      (await scalar('select public.ecosystem_read_course_module($1,0)', [slug]))
        .title,
      'First',
    );
  } finally {
    await db.close();
  }
});
