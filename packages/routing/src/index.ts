import type { Locale, VerticalId } from '@smartsell/types';
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(
  /\/+$/,
  '',
);
if (basePath && !/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(basePath))
  throw new Error(
    'NEXT_PUBLIC_BASE_PATH must be a site mount such as /smartsell-ecosystem.',
  );
export function withBasePath(path: string, mount = basePath): string {
  if (!path.startsWith('/') || path.startsWith('//') || !mount) return path;
  if (
    path === mount ||
    path.startsWith(mount + '/') ||
    path.startsWith(mount + '#') ||
    path.startsWith(mount + '?')
  )
    return path;
  return mount + path;
}
export interface RouteConfig {
  basePath?: string;
  origins?: Partial<Record<VerticalId, string>>;
}
export const verticalIds = [
  'agency',
  'academy',
  'media',
  'studio',
  'labs',
] as const;
export function isVertical(value: string): value is VerticalId {
  return verticalIds.includes(value as VerticalId);
}
export function urlFor(
  vertical: VerticalId | 'main',
  locale: Locale = 'fr',
  path = '',
  config: RouteConfig = {},
): string {
  const segments = path.split('/').filter(Boolean);
  if (
    segments.some((segment) => segment === '.' || segment === '..') ||
    /[?#\\]/.test(path)
  )
    throw new Error('Use a relative content path, without query or fragment.');
  const tail = segments.map((segment) => encodeURIComponent(segment)).join('/');
  const origin = vertical === 'main' ? undefined : config.origins?.[vertical];
  if (origin) {
    const parsed = new URL(origin);
    if (
      parsed.protocol !== 'https:' ||
      parsed.pathname !== '/' ||
      parsed.search ||
      parsed.hash ||
      parsed.username ||
      parsed.password
    )
      throw new Error('Vertical origins must be HTTPS origins.');
    return `${parsed.origin}/${locale}/${tail ? tail + '/' : ''}`;
  }
  return withBasePath(
    `/${locale}/${vertical === 'main' ? '' : vertical + '/'}${tail ? tail + '/' : ''}`,
    config.basePath ?? basePath,
  );
}
export const routingConfig: RouteConfig = {
  origins: {
    academy: process.env.NEXT_PUBLIC_ACADEMY_ORIGIN || undefined,
    media: process.env.NEXT_PUBLIC_MEDIA_ORIGIN || undefined,
    studio: process.env.NEXT_PUBLIC_STUDIO_ORIGIN || undefined,
    labs: process.env.NEXT_PUBLIC_LABS_ORIGIN || undefined,
  },
};
export const managementUrl =
  process.env.NEXT_PUBLIC_MANAGEMENT_URL ||
  'https://seydoutra.github.io/smartsell-management/';
