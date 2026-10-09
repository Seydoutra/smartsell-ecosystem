import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
async function filesAt(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? filesAt(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    ),
  );
  return nested.flat();
}
const htmlFiles = (await filesAt(root)).filter((file) =>
  file.endsWith('.html'),
);
const failures = new Set();
let checked = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pagePath =
    '/' +
    path
      .relative(root, file)
      .replaceAll(path.sep, '/')
      .replace(/index\.html$/, '');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|tel:|data:|\/\/)/.test(value)) continue;
    const url = new URL(value, 'https://local.invalid' + pagePath);
    let target = path.join(root, decodeURIComponent(url.pathname));
    try {
      const info = await stat(target);
      if (info.isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
      if (url.hash && target.endsWith('.html')) {
        const destination = await readFile(target, 'utf8');
        const id = decodeURIComponent(url.hash.slice(1));
        if (!destination.includes(`id="${id}"`))
          failures.add(`${pagePath}: missing anchor ${value}`);
      }
      checked++;
    } catch {
      failures.add(`${pagePath}: missing target ${value}`);
    }
  }
}
if (failures.size) {
  console.error([...failures].join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Export verified: ${htmlFiles.length} HTML pages, ${checked} local links and assets.`,
  );
}
