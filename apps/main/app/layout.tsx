import { withBasePath } from '@smartsell/routing';
import type { Metadata } from 'next';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/space-grotesk/wght.css';
import '@smartsell/brand/tokens.css';
import '@smartsell/ui/styles.css';
import './globals.css';
import {
  siteUrl,
  title,
  description,
  indexable,
  absoluteUrl,
} from '@smartsell/seo';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | Smartsell' },
  description,
  robots: { index: indexable, follow: indexable },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'fr_GN',
    siteName: 'Smartsell',
    images: [
      {
        url: absoluteUrl(withBasePath('/brand/wordmark-purple.png')),
        width: 3240,
        height: 3240,
        alt: 'Smartsell',
      },
    ],
  },
  twitter: { card: 'summary', title, description },
  icons: {
    icon: absoluteUrl(withBasePath('/brand/app-icon-192.png')),
    apple: absoluteUrl(withBasePath('/brand/app-icon-192.png')),
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body id="top">{children}</body>
    </html>
  );
}
