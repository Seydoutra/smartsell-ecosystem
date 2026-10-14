import { withBasePath, locale, t } from '@smartsell/routing';
import { Brand, ButtonLink, SectionHeading } from '@smartsell/ui';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
};
export default function DesignSystem() {
  return (
    <main id="main" className="design-system container section">
      <p className="eyebrow">
        {t(
          'SMARTSELL / BIBLIOTHÈQUE DE COMPOSANTS',
          'SMARTSELL / COMPONENT LIBRARY',
        )}
      </p>
      <h1>
        {t('Une signature.', 'One signature.')}
        <br />
        {t('Un langage commun.', 'A shared language.')}
      </h1>
      <p className="design-intro">
        {t(
          'Tokens, typographies et composants partagés par les cinq verticales.',
          'Tokens, typography and components shared by the five verticals.',
        )}
      </p>
      <section>
        <h2>{t('La marque', 'The brand')}</h2>
        <div className="brand-samples">
          <div>
            <Brand variant="purple" />
          </div>
          <div>
            <Brand variant="yellow" />
          </div>
          <div>
            <Brand variant="white" />
          </div>
        </div>
      </section>
      <section>
        <h2>{t('La palette', 'The palette')}</h2>
        <div className="token-grid">
          {[
            ['Violet', '#692B84', 'var(--purple-700)'],
            [t('Jaune', 'Yellow'), '#F3E433', 'var(--yellow-500)'],
            [
              t('Violet profond', 'Deep purple'),
              '#1A0A22',
              'var(--purple-950)',
            ],
            ['Neutre', '#101014', 'var(--neutral-950)'],
          ].map(([name, hex, value]) => (
            <div key={name}>
              <span style={{ background: value }} />
              <strong>{name}</strong>
              <code>{hex}</code>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>{t('Typographie', 'Typography')}</h2>
        <div className="type-samples">
          <h1>{t('Créer. Apprendre.', 'Create. Learn.')}</h1>
          <h2>{t('Comprendre ce qui vient.', 'Understand what’s next.')}</h2>
          <h3>{t('Des produits utiles.', 'Useful products.')}</h3>
          <p>
            {t(
              'Space Grotesk pour les titres. Inter pour la lecture. Polices auto-hébergées, avec une échelle fluide et une réduction du mouvement.',
              'Space Grotesk for headings. Inter for reading. Self-hosted fonts, with a fluid scale and reduced motion support.',
            )}
          </p>
        </div>
      </section>
      <section>
        <h2>Actions</h2>
        <div className="button-samples">
          <ButtonLink href={withBasePath(`/${locale}/`)}>
            {t('Action principale', 'Primary action')}
          </ButtonLink>
          <ButtonLink href={withBasePath(`/${locale}/`)} tone="secondary">
            {t('Action secondaire', 'Secondary action')}
          </ButtonLink>
          <ButtonLink href={withBasePath(`/${locale}/`)} tone="text">
            {t('Lien éditorial', 'Editorial link')}
          </ButtonLink>
        </div>
      </section>
      <section>
        <SectionHeading
          number="01"
          label={t('Composant partagé', 'Shared component')}
          title={t(
            'Une hiérarchie éditoriale claire.',
            'A clear editorial hierarchy.',
          )}
          description={t(
            'Les mêmes composants, adaptés au rythme de chaque verticale.',
            'The same components, adapted to the rhythm of each vertical.',
          )}
        />
      </section>
    </main>
  );
}
