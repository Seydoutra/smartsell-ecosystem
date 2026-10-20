import test from 'node:test';
import assert from 'node:assert/strict';
import {
  attestationQr,
  attestationReference,
  attestationUrl,
} from '../packages/ui/src/platform/attestation-model';

test('Attestation references accept printed IDs and QR codes encode only the public verification URL', async () => {
  const id = '00000000-0000-4000-8000-000000000099';
  assert.equal(attestationReference(` SSA-${id.toUpperCase()} `), id);
  for (const invalid of [
    '../../../profiles',
    '',
    '<script>',
    `${id}?email=private@example.com`,
  ])
    assert.equal(attestationReference(invalid), null);
  assert.throws(() => attestationUrl('invalid'));
  const link = new URL(attestationUrl(id));
  assert.equal(link.protocol, 'https:');
  assert.ok(link.pathname.endsWith('/academy/verify/'));
  assert.deepEqual([...link.searchParams.entries()], [['id', id]]);
  const qr = await attestationQr(id);
  assert.ok(qr.startsWith('data:image/png;base64,iVBORw0KGgo'));
  assert.ok(Buffer.from(qr.split(',')[1], 'base64').length > 1000);
});
