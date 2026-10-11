import type { Metadata } from 'next';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/space-grotesk/wght.css';
import '@smartsell/brand/tokens.css';
import '@smartsell/ui/styles.css';
import '@smartsell/ui/sites.css';
import '@smartsell/ui/experience.css';
import '@smartsell/ui/signature.css';
import '@smartsell/ui/immersive.css';
import '@smartsell/ui/home.css';
import '@smartsell/ui/universe.css';
import {
  IntroCurtain,
  IntroScript,
  SiteTransitions,
} from '@smartsell/ui/signature';
import { indexable, siteUrl } from '@smartsell/seo';
import { assetUrl, locale } from '@smartsell/routing';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Smartsell Labs', template: '%s | Smartsell Labs' },
  robots: { index: indexable, follow: indexable },
  icons: { icon: assetUrl('/brand/app-icon-192.png') },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body id="top">
        <IntroScript site="labs" />
        <IntroCurtain
          name="Labs"
          tagline="Innover · Site Smartsell"
          tone="labs"
        />
        {children}
        <SiteTransitions />
      </body>
    </html>
  );
}
