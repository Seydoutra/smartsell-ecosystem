import type { MetadataRoute } from 'next';
import { verticals } from '@smartsell/content';
import { withBasePath, routingConfig, urlFor } from '@smartsell/routing';
import { absoluteUrl, indexable } from '@smartsell/seo';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return indexable
    ? [
        {
          url: absoluteUrl(withBasePath('/fr/')),
          changeFrequency: 'weekly',
          priority: 1,
        },
        ...verticals.map((v) => ({
          url: absoluteUrl(urlFor(v.id, 'fr', '', routingConfig)),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })),
      ]
    : [];
}
