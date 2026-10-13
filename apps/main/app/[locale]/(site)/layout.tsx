import { Footer } from '@smartsell/ui';
import { MainNavigation } from '../../../components/main-navigation';
export default function SiteLayout({
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
