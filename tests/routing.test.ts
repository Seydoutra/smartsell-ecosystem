import test from 'node:test';
import assert from 'node:assert/strict';
import { urlFor } from '../packages/routing/src/index';
test('URLs portable between path and subdomain without changing content paths', () => {
  assert.equal(
    urlFor('academy', 'fr', 'courses/design'),
    '/fr/academy/courses/design/',
  );
  assert.equal(
    urlFor('academy', 'fr', 'courses/design', {
      origins: { academy: 'https://academy.smartsell.pro' },
    }),
    'https://academy.smartsell.pro/fr/courses/design/',
  );
  assert.equal(urlFor('main', 'fr'), '/fr/');
  assert.equal(
    urlFor('studio', 'en', 'spaces/main'),
    '/en/studio/spaces/main/',
  );
});
test('Origins reject unsafe or path-based values and content paths cannot escape their mount', () => {
  for (const origin of [
    'http://academy.smartsell.pro',
    'https://example.org/path',
    'https://user:password@example.org',
    'https://example.org/?x=1',
  ])
    assert.throws(() =>
      urlFor('academy', 'fr', '', { origins: { academy: origin } }),
    );
  for (const path of ['../labs', 'a/../../labs', 'https://example.org?x=1'])
    assert.throws(() => urlFor('academy', 'fr', path));
  assert.equal(
    urlFor('media', 'fr', 'article/une idée'),
    '/fr/media/article/une%20id%C3%A9e/',
  );
});
