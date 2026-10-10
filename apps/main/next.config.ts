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
  ...(process.env.NODE_ENV === 'development'
    ? {
        async rewrites() {
          return ['agency', 'academy', 'media', 'studio', 'labs'].map(
            (id, i) => ({
              source: `/fr/${id}/:path*`,
              destination: `http://127.0.0.1:${3001 + i}/fr/${id}/:path*`,
            }),
          );
        },
      }
    : {}),
};
export default config;
