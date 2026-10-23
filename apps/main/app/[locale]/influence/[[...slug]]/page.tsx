import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InfluenceSite } from '../../../../components/influence/site';
import { influenceHref } from '../../../../components/influence/model';
import { t } from '@smartsell/routing';
const pages = [
  '',
  'creators',
  'campaigns/new',
  'method',
  'join',
  'dashboard',
  'creator',
  'admin',
  'privacy',
];
export const dynamicParams = false;
export function generateStaticParams() {
  return pages.map((path) => ({ slug: path ? path.split('/') : [] }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = slug.join('/');
  return {
    title: `${t('Créateurs et campagnes', 'Creators and campaigns')} | Smartsell Influence`,
    description: t(
      'Rencontrez les créateurs, préparez vos campagnes et suivez chaque collaboration avec Smartsell Influence.',
      'Meet creators, build your campaigns and track every collaboration with Smartsell Influence.',
    ),
    alternates: { canonical: influenceHref(path) },
    robots: ['dashboard', 'creator', 'admin'].includes(path)
      ? { index: false, follow: false }
      : undefined,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const path = slug.join('/');
  if (!pages.includes(path)) notFound();
  return <InfluenceSite path={path} />;
}
