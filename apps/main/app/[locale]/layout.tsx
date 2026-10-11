import { Footer } from '@smartsell/ui';
import { locale } from '@smartsell/routing';
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale }];
}
import { MainNavigation } from '../../components/main-navigation';
export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavigation />
      {children}
      <Footer />
    </>
  );
}
