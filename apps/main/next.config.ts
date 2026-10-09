import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'export',
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, ''),
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: [
    '@smartsell/brand',
    '@smartsell/ui',
    '@smartsell/content',
    '@smartsell/routing',
    '@smartsell/types',
    '@smartsell/seo',
  ],
  poweredByHeader: false,
};
export default config;
