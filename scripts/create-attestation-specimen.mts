import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { makeAttestationPdf } from '../packages/ui/src/platform/attestation-pdf';
const output = process.argv[2];
if (!output) throw Error('Provide an output PDF path');
const [regular, bold, brand] = await Promise.all(
  ['fonts/vera.ttf', 'fonts/vera-bold.ttf', 'brand/wordmark-purple.png'].map(
    (p) => readFile('apps/main/public/' + p),
  ),
);
const bytes = await makeAttestationPdf(
  {
    id: '00000000-0000-4000-8000-000000000000',
    learner_name: 'Exemple Apprenant',
    course_title: { fr: 'Faire un court-métrage avec l’IA' },
    issued_at: '2026-10-21T09:00:00Z',
  },
  { regular, bold, brand },
  true,
);
await mkdir(dirname(output), { recursive: true });
await writeFile(output, bytes);
console.log('Specimen generated; no database record issued: ' + output);
