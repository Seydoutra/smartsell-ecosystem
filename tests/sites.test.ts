import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getSitePages,
  courses,
  articles,
  cases,
  packs,
  siteMenus,
} from '../packages/content/src/sites';
import {
  parseProgress,
  parseBooking,
  sessionError,
} from '../packages/ui/src/sites/demo-state';
import { urlFor } from '../packages/routing/src/index';
test('Every vertical menu reaches a generated page in its own site', () => {
  for (const id of ['agency', 'academy', 'media', 'studio', 'labs'] as const) {
    const pages = getSitePages(id);
    const paths = new Set(pages.map((p) => p.path));
    assert.equal(paths.size, pages.length);
    assert.ok(paths.has(''));
    for (const item of siteMenus[id])
      assert.ok(paths.has(item.path), `${id}/${item.path}`);
    for (const page of pages)
      assert.ok(urlFor(id, 'fr', page.path).startsWith(`/fr/${id}/`));
  }
  assert.equal(cases.length, 6);
  assert.equal(courses.length, 8);
  assert.equal(articles.length, 20);
  assert.equal(packs.length, 6);
});
test('Every course has a reachable enrollment and lesson path, with a valid quiz answer', () => {
  const paths = new Set(getSitePages('academy').map((p) => p.path));
  for (const course of courses) {
    for (const prefix of ['courses', 'enroll', 'learn'])
      assert.ok(paths.has(`${prefix}/${course.slug}`));
    assert.equal(course.lessons.length, 3);
    for (const lesson of course.lessons)
      assert.ok(lesson.options[lesson.answer]);
  }
});
test('Restored local progress rejects corrupt data and cannot manufacture completed lessons', () => {
  assert.deepEqual(parseProgress('broken'), {});
  assert.deepEqual(parseProgress('[]'), {});
  assert.deepEqual(
    parseProgress('{"marketing-digital":[0,0,1,9,-1,"2"],"unknown":[0,1,2]}'),
    { 'marketing-digital': [0, 1] },
  );
});
test('A simulated studio session rejects dates and times outside its schedule', () => {
  assert.ok(sessionError('2026-02-30', '09:00', 2, '2026-01-01'));
  assert.ok(sessionError('2026-10-09', '09:00', 2, '2026-10-10'));
  assert.ok(sessionError('2026-11-01', '16:00', 4, '2026-10-10'));
  assert.ok(sessionError('2026-11-01', '03:00', 2, '2026-10-10'));
  assert.equal(sessionError('2026-11-01', '14:00', 4, '2026-10-10'), '');
});
test('Restored booking excludes personal fields and invalid packs', () => {
  const data = {
    reference: 'DEMO-123',
    pack: 'photo',
    date: '2026-11-01',
    time: '09:00',
    duration: 2,
    addons: ['Montage', 'unsafe'],
    name: 'Private name',
    email: 'private@example.org',
  };
  assert.deepEqual(parseBooking(JSON.stringify(data)), {
    reference: 'DEMO-123',
    pack: 'photo',
    date: '2026-11-01',
    time: '09:00',
    duration: 2,
    addons: ['Montage'],
  });
  assert.equal(
    parseBooking(JSON.stringify({ ...data, pack: 'nonexistent' })),
    null,
  );
  assert.equal(parseBooking('{bad'), null);
});
test('Agency and main origins support autonomous deployment', () => {
  assert.equal(
    urlFor('agency', 'fr', 'work', {
      origins: { agency: 'https://agency.example' },
    }),
    'https://agency.example/fr/work/',
  );
  assert.equal(
    urlFor('main', 'fr', '', {
      origins: { main: 'https://smartsell.example' },
    }),
    'https://smartsell.example/fr/',
  );
});
