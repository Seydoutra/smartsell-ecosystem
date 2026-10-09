import type { MetadataRoute } from 'next';
import { siteUrl, indexable } from '@smartsell/seo';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(indexable
        ? { allow: '/', disallow: '/fr/design-system/' }
        : { disallow: '/' }),
    },
    ...(indexable ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
