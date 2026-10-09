import { withBasePath } from '@smartsell/routing';
import type { MetadataRoute } from 'next';
import { absoluteUrl, indexable } from '@smartsell/seo';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(indexable
        ? { allow: '/', disallow: withBasePath('/fr/design-system/') }
        : { disallow: '/' }),
    },
    ...(indexable
      ? { sitemap: absoluteUrl(withBasePath('/sitemap.xml')) }
      : {}),
  };
}
