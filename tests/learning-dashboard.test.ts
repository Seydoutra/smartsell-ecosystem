import test from 'node:test';
import assert from 'node:assert/strict';
import { courses, type Course } from '../packages/content/src/academy';
import {
  courseProgress,
  learningSummary,
  suggestedCourses,
  matchesCourse,
  resumeLesson,
} from '../packages/ui/src/platform/learning-model';

const course = (slug: string, changes: Partial<Course> = {}): Course => ({
  ...courses[0],
  slug,
  ...changes,
});

test('Progress ignores duplicate, removed and invalid lessons, and resumes the first gap', () => {
  const c = course('one');
  assert.deepEqual(courseProgress(c, { one: [0, 0, 2, -1, 3, 1.5] }), {
    total: 3,
    done: 2,
    percent: 67,
    finished: false,
    next: 1,
  });
  assert.equal(courseProgress(c, { one: [2, 0, 1] }).finished, true);
  assert.equal(courseProgress(c, { one: [2, 0, 1] }).next, 0);
  assert.equal(
    courseProgress(course('empty', { lessons: [] }), { empty: [] }).finished,
    false,
  );
});

test('Overall progress is weighted by real lesson count, excluding unknown courses', () => {
  const catalog = [
    course('a'),
    course('b', {
      lessons: [...courses[0].lessons, ...courses[0].lessons.slice(0, 2)],
    }),
    course('not-enrolled'),
  ];
  const result = learningSummary(catalog, {
    a: [0, 1, 2],
    b: [0, 1],
    removed: [0, 1, 2],
  });
  assert.deepEqual(
    {
      done: result.done,
      total: result.total,
      percent: result.percent,
      completed: result.completed,
    },
    { done: 5, total: 8, percent: 63, completed: 1 },
  );
  assert.deepEqual(
    result.enrolled.map((c) => c.slug),
    ['a', 'b'],
  );
  assert.equal(learningSummary(catalog, {}).percent, 0);
});

test('Suggestions exclude added courses and rank category then track with a stable cold start', () => {
  const catalog = [
    course('enrolled', { category: 'Design', track: 'A' }),
    course('other', { category: 'Video', track: 'B' }),
    course('track', { category: 'Marketing', track: 'A' }),
    course('category', { category: 'Design', track: 'B' }),
  ];
  assert.deepEqual(
    suggestedCourses(catalog, { enrolled: [] }).map((c) => c.slug),
    ['category', 'track', 'other'],
  );
  assert.deepEqual(
    suggestedCourses(catalog, {}, 2).map((c) => c.slug),
    ['enrolled', 'other'],
  );
  assert.deepEqual(
    suggestedCourses(catalog, {
      enrolled: [],
      other: [],
      track: [],
      category: [],
    }),
    [],
  );
  assert.deepEqual(suggestedCourses(catalog, {}, 0), []);
});

test('Course search handles accents and track filters; resume URLs accept only bounded lesson numbers', () => {
  const c = course('a', { title: 'Création de vidéos', track: 'Créatif' });
  assert.equal(matchesCourse(c, ' creation de videos ', 'Créatif'), true);
  assert.equal(matchesCourse(c, '', 'Other'), false);
  assert.equal(matchesCourse(c, 'no matching course'), false);
  const p = { a: [0, 1] };
  assert.equal(resumeLesson(c, p, '2'), 1);
  for (const invalid of [null, '', '0', '-1', '99', '2/', '2.5', 'NaN', '1e2'])
    assert.equal(resumeLesson(c, p, invalid), 2);
});
