import type { NextConfig } from 'next';
const mount =
  process.env.NEXT_PUBLIC_APP_BASE_PATH ??
  `${(process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, '')}/fr/agency`;
const config: NextConfig = {
  output: 'export',
  basePath: mount,
  trailingSlash: true,
  env: { NEXT_PUBLIC_APP_BASE_PATH: mount },
  images: { unoptimized: true },
  poweredByHeader: false,
  transpilePackages: [
    '@smartsell/brand',
    '@smartsell/ui',
    '@smartsell/content',
    '@smartsell/routing',
    '@smartsell/types',
    '@smartsell/seo',
  ],
};
export default config;
