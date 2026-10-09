import test from 'node:test';
import assert from 'node:assert/strict';
import { urlFor, withBasePath } from '../packages/routing/src/index';
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

test('Project hosting keeps navigation and assets inside its mount without changing external products', () => {
  const basePath = '/smartsell-ecosystem';
  assert.equal(
    urlFor('academy', 'fr', 'courses/design', { basePath }),
    '/smartsell-ecosystem/fr/academy/courses/design/',
  );
  assert.equal(
    withBasePath('/brand/icon-yellow.png', basePath),
    '/smartsell-ecosystem/brand/icon-yellow.png',
  );
  assert.equal(
    withBasePath('/smartsell-ecosystem/fr/#vision', basePath),
    '/smartsell-ecosystem/fr/#vision',
  );
  assert.equal(withBasePath('#vision', basePath), '#vision');
  assert.equal(
    withBasePath('https://seydoutra.github.io/smartsell-management/', basePath),
    'https://seydoutra.github.io/smartsell-management/',
  );
  assert.equal(
    urlFor('academy', 'fr', '', {
      basePath,
      origins: { academy: 'https://academy.smartsell.pro' },
    }),
    'https://academy.smartsell.pro/fr/',
  );
});
