import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
// Assemble l'export d'une langue : `fr` réinitialise dist/, `en` s'y ajoute.
const locale = process.argv[2] === 'en' ? 'en' : 'fr';
const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'apps/main/out');
const dist = resolve(root, 'dist');
await readFile(resolve(out, locale, 'index.html'));
if (locale === 'fr') {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(out, dist, { recursive: true });
} else {
  await cp(resolve(out, locale), resolve(dist, locale), { recursive: true });
  await cp(resolve(out, '_next'), resolve(dist, '_next'), {
    recursive: true,
    force: false,
  });
}
for (const id of ['agency', 'academy', 'media', 'studio', 'labs']) {
  const appOut = resolve(root, 'apps', id, 'out');
  await readFile(resolve(appOut, 'index.html'));
  await cp(appOut, resolve(dist, locale, id), { recursive: true });
}
await writeFile(resolve(dist, '.nojekyll'), '');
console.log(`Export statique ${locale} prêt dans dist/.`);
