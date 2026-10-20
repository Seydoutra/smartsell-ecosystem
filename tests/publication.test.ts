import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  normalizeData,
  publicationErrors,
  publicData,
} from '../apps/main/components/admin/model';

test('The complete existing bilingual catalog can be republished without discarding optional fields or changing Management', () => {
  const seed = readFileSync(
    new URL('../supabase/seed.sql', import.meta.url),
    'utf8',
  );
  const catalog: Record<string, Record<string, unknown[]>> = {};
  for (const match of seed.matchAll(
    /insert into public.content_collections\(segment,collection,items\) values\('([^']+)','([^']+)','((?:[^']|'')*)'::jsonb\)/g,
  )) {
    catalog[match[1]] ??= {};
    catalog[match[1]][match[2]] = JSON.parse(match[3].replaceAll("''", "'"));
  }
  assert.equal(catalog.academy.courses.length, 13);
  assert.equal(catalog.media.articles.length, 20);
  const normalized = normalizeData(catalog);
  assert.deepEqual(publicationErrors(normalized), []);
  const published = publicData(normalized);
  const management = published.labs.products.find(
    (item) => item.slug === 'management',
  );
  assert.equal(
    management?.url,
    'https://seydoutra.github.io/smartsell-management/',
  );
  const cpr = published.agency.websites.find((item) => item.slug === 'cpr');
  assert.ok(cpr, 'existing CPR item preserved');
  assert.equal(published.agency.websites.length, 13);
});
