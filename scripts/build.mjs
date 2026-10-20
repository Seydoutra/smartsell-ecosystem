import { execSync } from 'node:child_process';
execSync('tsx scripts/prepare-publication.ts', { stdio: 'inherit' });
// Contenus des deux langues pour l'espace d'administration.
for (const locale of ['fr', 'en'])
  execSync('tsx scripts/export-content.ts', {
    stdio: 'inherit',
    env: { ...process.env, NEXT_PUBLIC_LOCALE: locale },
  });
// Chaque langue est exportée séparément, puis assemblée dans dist/.
for (const locale of ['fr', 'en']) {
  const env = { ...process.env, NEXT_PUBLIC_LOCALE: locale };
  execSync('turbo run build --concurrency=2', { stdio: 'inherit', env });
  execSync(`node scripts/package-static.mjs ${locale}`, {
    stdio: 'inherit',
    env,
  });
}
