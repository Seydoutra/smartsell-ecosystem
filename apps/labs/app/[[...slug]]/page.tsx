import { notFound } from 'next/navigation';
import { SitePage } from '@smartsell/ui/sites';
import { getSitePages } from '@smartsell/content/sites';
import { routingConfig, urlFor } from '@smartsell/routing';
const id = 'labs' as const;
export const dynamicParams = false;
export function generateStaticParams() {
  return getSitePages(id).map((p) => ({
    slug: p.path ? p.path.split('/') : [],
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const p = getSitePages(id).find((p) => p.path === slug.join('/'));
  return {
    title: p?.title,
    description: p?.intro,
    alternates: { canonical: urlFor(id, 'fr', slug.join('/'), routingConfig) },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const p = getSitePages(id).find((p) => p.path === slug.join('/'));
  if (!p) notFound();
  return <SitePage id={id} page={p} />;
}
