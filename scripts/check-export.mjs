import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const mount = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, '');
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
    mount +
    '/' +
    path
      .relative(root, file)
      .replaceAll(path.sep, '/')
      .replace(/index\.html$/, '');
  for (const element of html.matchAll(/<[^>]+\b(?:href|src)="[^"]+"[^>]*>/g)) {
    if (/\brel="(?:preconnect|dns-prefetch)"/.test(element[0])) continue;
    const value = element[0]
      .match(/\b(?:href|src)="([^"]+)"/)[1]
      .replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|tel:|data:|\/\/)/.test(value)) continue;
    const url = new URL(value, 'https://local.invalid' + pagePath);
    if (mount && !url.pathname.startsWith(mount + '/')) {
      failures.add(`${pagePath}: target escapes site mount ${value}`);
      continue;
    }
    let target = path.join(
      root,
      decodeURIComponent(url.pathname.slice(mount.length)),
    );

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
