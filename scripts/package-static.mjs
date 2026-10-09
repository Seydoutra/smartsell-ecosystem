import { cp, mkdir, rm, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'apps/main/out');
await readFile(resolve(out, 'fr/index.html'));
await rm(resolve(root, 'dist'), { recursive: true, force: true });
await mkdir(resolve(root, 'dist'), { recursive: true });
await cp(out, resolve(root, 'dist'), { recursive: true });
console.log('Export statique prêt dans dist/.');
