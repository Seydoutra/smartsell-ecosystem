import { Brand, ButtonLink, SectionHeading } from '@smartsell/ui';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
};
export default function DesignSystem() {
  return (
    <main id="main" className="design-system container section">
      <p className="eyebrow">SMARTSELL / BIBLIOTHÈQUE DE COMPOSANTS</p>
      <h1>
        Une signature.
        <br />
        Un langage commun.
      </h1>
      <p className="design-intro">
        Tokens, typographies et composants partagés par les cinq verticales.
      </p>
      <section>
        <h2>La marque</h2>
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
        <h2>La palette</h2>
        <div className="token-grid">
          {[
            ['Violet', '#692B84', 'var(--purple-700)'],
            ['Jaune', '#F3E433', 'var(--yellow-500)'],
            ['Violet profond', '#1A0A22', 'var(--purple-950)'],
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
        <h2>Typographie</h2>
        <div className="type-samples">
          <h1>Créer. Apprendre.</h1>
          <h2>Comprendre ce qui vient.</h2>
          <h3>Des produits utiles.</h3>
          <p>
            Space Grotesk pour les titres. Inter pour la lecture. Polices
            auto-hébergées, avec une échelle fluide et une réduction du
            mouvement.
          </p>
        </div>
      </section>
      <section>
        <h2>Actions</h2>
        <div className="button-samples">
          <ButtonLink href="/fr/">Action principale</ButtonLink>
          <ButtonLink href="/fr/" tone="secondary">
            Action secondaire
          </ButtonLink>
          <ButtonLink href="/fr/" tone="text">
            Lien éditorial
          </ButtonLink>
        </div>
      </section>
      <section>
        <SectionHeading
          number="01"
          label="Composant partagé"
          title="Une hiérarchie éditoriale claire."
          description="Les mêmes composants, adaptés au rythme de chaque verticale."
        />
      </section>
    </main>
  );
}
