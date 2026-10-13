import { locale } from '@smartsell/routing';
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale }];
}
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
