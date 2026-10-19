import type { Metadata } from 'next';
import { locale, t, withBasePath } from '@smartsell/routing';
import { SmartBrief } from '@smartsell/ui/showcase';
export const metadata: Metadata = {
  title: t('Parler à Smartsell', 'Talk to Smartsell'),
  alternates: { canonical: withBasePath(`/${locale}/contact/`) },
};
export default function Contact() {
  return (
    <main id="main" data-kin-off className="house-page">
      <header className="house-page-hero house-wrap">
        <p className="house-label">SMARTSELL / CONTACT</p>
        <h1>{t('Une idée ?\nParlons-en.', 'An idea?\nLet’s talk.')}</h1>
        <p>
          {t(
            'Une marque à construire, une compétence à développer, un contenu à produire. Commençons par votre besoin.',
            'A brand to build, a skill to develop, content to produce. Let’s start with your needs.',
          )}
        </p>
        <a
          className="house-direct-contact"
          href="https://wa.me/224620619064"
          target="_blank"
          rel="noreferrer"
        >
          {t('Écrire sur WhatsApp', 'Message us on WhatsApp')} ↗
        </a>
      </header>
      <section
        id="brief"
        className="house-wrap house-page-section"
        aria-label={t('Préparer votre projet', 'Prepare your project')}
      >
        <SmartBrief />
      </section>
    </main>
  );
}
