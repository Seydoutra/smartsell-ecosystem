import { AnalyticsConsent } from '@smartsell/ui/platform';
import '@smartsell/ui/platform.css';
import type { Metadata } from 'next';
import '@fontsource-variable/montserrat/wght.css';
import '@smartsell/brand/tokens.css';
import '@smartsell/ui/styles.css';
import '@smartsell/ui/sites.css';
import '@smartsell/ui/experience.css';
import '@smartsell/ui/signature.css';
import '@smartsell/ui/immersive.css';
import '@smartsell/ui/home.css';
import '@smartsell/ui/universe.css';
import '@smartsell/ui/refresh.css';
import {
  IntroCurtain,
  IntroScript,
  SiteTransitions,
} from '@smartsell/ui/signature';
import { indexable, siteUrl } from '@smartsell/seo';
import { assetUrl, locale } from '@smartsell/routing';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Smartsell Agency', template: '%s | Smartsell Agency' },
  robots: { index: indexable, follow: indexable },
  icons: { icon: assetUrl('/brand/app-icon-192.png') },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body id="top">
        <IntroScript site="agency" />
        <IntroCurtain
          name="Agency"
          tagline="Créer · Site Smartsell"
          tone="agency"
        />
        {children}
        <AnalyticsConsent />
        <SiteTransitions />
      </body>
    </html>
  );
}
