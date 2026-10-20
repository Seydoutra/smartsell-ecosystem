import fs from 'node:fs';
import { getSitePages } from '../packages/content/src/sites';
type Item = Record<string, unknown>;
const catalog = JSON.parse(
  fs.readFileSync('apps/main/public/admin/content.json', 'utf8'),
).data as Record<string, Record<string, Item[]>>;
const quote = (value: unknown) =>
  "'" + String(value).replaceAll("'", "''") + "'";
const sql = [
  '-- Initial public catalog only. Existing rows are preserved on rerun.',
  'begin;',
];
for (const [segment, collections] of Object.entries(catalog))
  for (const [collection, items] of Object.entries(collections))
    sql.push(
      `insert into public.content_collections(segment,collection,items) values(${quote(segment)},${quote(collection)},${quote(JSON.stringify(items))}::jsonb) on conflict do nothing;`,
    );
for (const course of catalog.academy.courses) {
  const lessons = course.lessons as Item[];
  sql.push(
    `insert into public.academy_courses(slug,title,lesson_count) values(${quote(course.slug)},${quote(JSON.stringify(course.title))}::jsonb,${lessons.length}) on conflict do nothing;`,
  );
  lessons.forEach((lesson, index) =>
    sql.push(
      `insert into private.lesson_keys(course_slug,lesson_index,answer) values(${quote(course.slug)},${index},${Number(lesson.answer)}) on conflict do nothing;`,
    ),
  );
}
for (const lang of ['fr', 'en']) {
  for (const segment of [
    'agency',
    'academy',
    'media',
    'studio',
    'labs',
  ] as const)
    for (const page of getSitePages(segment)) {
      const path = `/${lang}/${segment}/${page.path ? page.path + '/' : ''}`;
      sql.push(
        `insert into public.site_routes(path,segment) values(${quote(path)},${quote(segment)}) on conflict do nothing;`,
      );
    }
  for (const path of ['', 'about/', 'contact/', 'products/', 'explore/'])
    sql.push(
      `insert into public.site_routes(path,segment) values(${quote(`/${lang}/${path}`)},'main') on conflict do nothing;`,
    );
}
sql.push(
  'insert into public.published_collections(segment,collection,items,revision) select segment,collection,items,revision from public.content_collections on conflict do nothing;',
);
sql.push('commit;');
fs.writeFileSync('supabase/seed.sql', sql.join('\n') + '\n');
console.log('Seed public préparé : collections, 13 aperçus et routes FR/EN.');
