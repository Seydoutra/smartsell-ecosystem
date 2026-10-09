import { Footer } from '@smartsell/ui';
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
