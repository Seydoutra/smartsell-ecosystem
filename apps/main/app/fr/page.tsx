import type { Metadata } from 'next';
import { ChangingHeadline } from '@smartsell/ui/experience';
import {
  CountUp,
  CrossGrid,
  Highlight,
  PixelMosaic,
  ScrollLitText,
  UniverseOrbit,
  UniverseTabs,
} from '@smartsell/ui/signature';
import { ButtonLink, SectionHeading } from '@smartsell/ui';
import { products, nextJourney } from '@smartsell/content';
import { withBasePath, routingConfig, urlFor } from '@smartsell/routing';
import { absoluteUrl } from '@smartsell/seo';
import type { VerticalId } from '@smartsell/types';
const names: Record<VerticalId, string> = {
  agency: 'Agency',
  academy: 'Academy',
  media: 'Media',
  studio: 'Studios',
  labs: 'Labs',
};
const closingLinks: [VerticalId, string, string][] = [
  ['agency', 'work', 'Voir les explorations'],
  ['agency', 'contact', 'Parler d’un projet'],
  ['academy', 'courses', 'Explorer les modules'],
  ['academy', 'corporate', 'Former une équipe'],
  ['media', 'latest', 'Lire les idées'],
  ['media', 'newsletter', 'La newsletter'],
  ['studio', 'spaces', 'Découvrir les espaces'],
  ['studio', 'booking', 'Simuler une session'],
  ['labs', 'products', 'Les produits'],
  ['labs', 'research', 'Les pistes de recherche'],
];
export const metadata: Metadata = {
  alternates: { canonical: withBasePath('/fr/') },
};
export default function Home() {
  return (
    <main id="main">
      <section className="sg-hero" aria-labelledby="sg-hero-title">
        <div className="sg-hero-card">
          <PixelMosaic tone="main" />
          <div className="sg-hero-top">
            <span className="sg-mono">✳ La maison Smartsell</span>
            <span className="sg-mono">Conakry · Guinée</span>
          </div>
          <div className="sg-hero-bottom">
            <h1 id="sg-hero-title">
              <span>Un écosystème</span>
              <span>
                pour <ChangingHeadline />
              </span>
            </h1>
            <div className="sg-hero-aside">
              <p>
                Une maison mère, cinq sites à part entière. Nous relions les
                marques, les talents et les idées pour donner une forme à vos
                ambitions.
              </p>
              <div className="sg-hero-actions">
                <a className="sg-pill-link" href="#ecosystem">
                  Explorer l’écosystème <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="sg-hero-strip sg-mono">
          <span>Stratégie · Création · Compétences · Produits</span>
          <span>05 sites · 01 maison</span>
          <a href="#manifeste">Faites le premier mouvement ↓</a>
        </div>
      </section>
      <section className="sg-manifesto" id="manifeste">
        <div className="container">
          <span className="sg-mono">01 / Le manifeste</span>
          <ScrollLitText text="Une marque a besoin d’une direction. Un talent, de compétences. Une histoire, d’un espace pour prendre forme. Une entreprise, d’outils pour avancer. Smartsell réunit ces cinq façons de faire dans une même maison." />
        </div>
      </section>
      <section
        className="sg-architecture"
        id="ecosystem"
        aria-labelledby="sg-architecture-title"
      >
        <div className="container">
          <div className="sg-architecture-head" data-reveal>
            <div>
              <p className="sg-mono">02 / L’architecture</p>
              <h2 id="sg-architecture-title">
                Une maison mère.
                <br />
                <em>Cinq sites à part entière.</em>
              </h2>
            </div>
            <p>
              Chaque univers a son adresse, sa navigation et son rythme. Tous
              partagent la même ambition et vous ramènent à la maison
              Smartsell. Choisissez votre porte d’entrée.
            </p>
          </div>
          <UniverseOrbit />
          <div className="sg-figures" data-reveal>
            <div>
              <strong>
                <CountUp value={5} />
              </strong>
              <span className="sg-mono">Sites autonomes</span>
            </div>
            <div>
              <strong>
                <CountUp value={1} />
              </strong>
              <span className="sg-mono">Maison mère</span>
            </div>
            <div>
              <strong>GN</strong>
              <span className="sg-mono">Pensé depuis Conakry</span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="sg-universes"
        id="apercus"
        aria-labelledby="sg-universes-title"
      >
        <div className="container">
          <div className="sg-universes-head" data-reveal>
            <div>
              <p className="sg-mono">03 / Cinq sites. Une même énergie.</p>
              <h2 id="sg-universes-title">
                Entrez dans <Highlight>le mouvement.</Highlight>
              </h2>
            </div>
            <p>
              Une marque à construire, une compétence à développer, une idée à
              partager. Parcourez chaque site avant d’y entrer.
            </p>
          </div>
          <UniverseTabs />
        </div>
      </section>
      <section className="vision-section section" id="vision">
        <div className="container vision-grid">
          <div>
            <p className="eyebrow">04 / LA MAISON SMARTSELL</p>
            <span className="vision-note">
              DIGITAL.
              <br />
              CRÉATIF.
              <br />
              CONNECTÉ.
            </span>
          </div>
          <div>
            <h2>
              Les bonnes idées
              <br />
              méritent{' '}
              <em>
                plus
                <br />
                qu’un point de départ.
              </em>
            </h2>
            <div className="vision-copy">
              <p>
                Une marque a besoin d’une direction. Un talent, de compétences.
                Une histoire, d’un espace pour prendre forme. Une entreprise,
                d’outils pour avancer.
              </p>
              <p>
                Smartsell réunit ces cinq façons de faire dans une même maison.
                Notre ambition : créer de la continuité entre ce que l’on
                imagine, ce que l’on apprend et ce que l’on construit.
              </p>
            </div>
            <p className="vision-location">
              <span aria-hidden="true">↗</span> Depuis Conakry, en Guinée.
            </p>
          </div>
        </div>
      </section>
      <section className="products-section section" id="produits">
        <div className="container">
          <SectionHeading
            number="05"
            label="Smartsell Labs"
            title="Nous construisons aussi les outils."
            description="Des produits pensés pour les réalités des entreprises et des créateurs."
          />
          <div className="products-grid">
            {products.map((product, i) => (
              <article
                className={`product-card product-card--${i}`}
                key={product.name}
              >
                <div className="product-label">
                  <span className="eyebrow">{product.category}</span>
                  <span className="product-status">
                    {i === 0 ? 'PRODUIT EXISTANT' : 'VISION PRODUIT'}
                  </span>
                </div>
                <div className="product-mark" aria-hidden="true">
                  {i === 0 ? 'M' : 'O'}
                  <span>↗</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <ButtonLink
                  href={product.url}
                  tone={i === 0 ? 'primary' : 'text'}
                >
                  {product.state}
                  {product.external ? (
                    <span className="sr-only">, site du produit existant</span>
                  ) : null}
                </ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sg-path" id="parcours" aria-labelledby="sg-path-title">
        <div className="container">
          <div className="sg-path-head" data-reveal>
            <p className="sg-mono">06 / Continuez votre parcours</p>
            <h2 id="sg-path-title">
              Tout commence quelque part. La suite se construit ensemble.
            </h2>
          </div>
          <CrossGrid
            items={nextJourney.map((j, i) => ({
              label: `0${i + 1} / ${j.step}`,
              title: j.title,
              copy: j.copy,
              href: urlFor(j.vertical, 'fr', '', routingConfig),
            }))}
          />
        </div>
      </section>
      <section className="sg-closing">
        <div className="container">
          <div className="sg-closing-card">
            <PixelMosaic tone="agency" />
            <p className="sg-mono">Smartsell / Avec vous, de bout en bout.</p>
            <h2>
              Quel sera votre
              <br />
              prochain <em>mouvement ?</em>
            </h2>
            <nav className="sg-chips" aria-label="Accès directs aux sites">
              {closingLinks.map(([vertical, path, label]) => (
                <a key={vertical + path} href={urlFor(vertical, 'fr', path, routingConfig)}>
                  <span>{names[vertical]}</span>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Smartsell',
            url: absoluteUrl(withBasePath('/fr/')),
            logo: absoluteUrl(withBasePath('/brand/wordmark-purple.png')),
            description:
              'Un écosystème digital et créatif : Agency, Academy, Media, Studios et Labs.',
          }).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
