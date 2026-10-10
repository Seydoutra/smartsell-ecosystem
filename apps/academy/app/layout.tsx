import type { Metadata } from 'next';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/space-grotesk/wght.css';
import '@smartsell/brand/tokens.css';
import '@smartsell/ui/styles.css';
import '@smartsell/ui/sites.css';
import '@smartsell/ui/experience.css';
import { indexable, siteUrl } from '@smartsell/seo';
import { assetUrl } from '@smartsell/routing';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Smartsell Academy', template: '%s | Smartsell Academy' },
  robots: { index: indexable, follow: indexable },
  icons: { icon: assetUrl('/brand/app-icon-192.png') },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body id="top">{children}</body>
    </html>
  );
}
