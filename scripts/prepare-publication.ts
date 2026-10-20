import { writeFile } from 'node:fs/promises';
import config from '../packages/ui/src/platform/config.json';
import {
  normalizeData,
  publicationErrors,
  publicData,
} from '../apps/main/components/admin/model';
async function main() {
  let data: unknown = {};
  if (Boolean(config.url) !== Boolean(config.publishableKey))
    throw new Error('Configuration Supabase incomplète.');
  if (config.url) {
    if (!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(config.url))
      throw new Error('URL Supabase invalide.');
    const response = await fetch(
      `${config.url}/rest/v1/published_collections?select=segment,collection,items,revision`,
      {
        headers: { apikey: config.publishableKey },
        signal: AbortSignal.timeout(20000),
      },
    );
    if (!response.ok)
      throw new Error(
        `Lecture de la publication impossible (${response.status}). Le site en ligne est conservé.`,
      );
    const rows = (await response.json()) as {
      segment: string;
      collection: string;
      items: unknown[];
    }[];
    if (rows.length) {
      const catalog: Record<string, Record<string, unknown[]>> = {};
      for (const row of rows) {
        catalog[row.segment] ??= {};
        catalog[row.segment][row.collection] = row.items;
      }
      const normalised = normalizeData(catalog);
      const errors = publicationErrors(normalised);
      if (errors.length) throw new Error(errors.slice(0, 15).join('\n'));
      data = publicData(normalised);
      console.log(
        `Publication Supabase : ${rows.length} collections approuvées.`,
      );
    } else
      console.log('Catalogue source conservé : aucune publication approuvée.');
  }
  await writeFile(
    'packages/content/src/published.json',
    JSON.stringify(data, null, 2) + '\n',
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
