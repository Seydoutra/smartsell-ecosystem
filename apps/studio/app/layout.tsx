import type { Metadata } from 'next';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/space-grotesk/wght.css';
import '@smartsell/brand/tokens.css';
import '@smartsell/ui/styles.css';
import '@smartsell/ui/sites.css';
import '@smartsell/ui/experience.css';
import '@smartsell/ui/signature.css';
import '@smartsell/ui/immersive.css';
import {
  IntroCurtain,
  IntroScript,
  SiteTransitions,
} from '@smartsell/ui/signature';
import { indexable, siteUrl } from '@smartsell/seo';
import { assetUrl } from '@smartsell/routing';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Smartsell Studio', template: '%s | Smartsell Studio' },
  robots: { index: indexable, follow: indexable },
  icons: { icon: assetUrl('/brand/app-icon-192.png') },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body id="top">
        <IntroScript site="studio" />
        <IntroCurtain
          name="Studios"
          tagline="Produire · Site Smartsell"
          tone="studio"
        />
        {children}
        <SiteTransitions />
      </body>
    </html>
  );
}
