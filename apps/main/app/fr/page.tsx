import type { Metadata } from 'next';
import { ButtonLink, SectionHeading } from '@smartsell/ui';
import { verticals, products, nextJourney } from '@smartsell/content';
import { routingConfig, urlFor } from '@smartsell/routing';
import { absoluteUrl } from '@smartsell/seo';
export const metadata: Metadata = { alternates: { canonical: '/fr/' } };
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-watermark" aria-hidden="true">
          <img src="/brand/icon-yellow.png" width="3240" height="3240" alt="" />
        </div>
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Depuis Conakry. Ouvert sur le monde.</p>
            <h1>
              Un écosystème.
              <br />
              Cinq façons
              <br />
              <em>d’avancer.</em>
            </h1>
            <p className="hero-description">
              Nous relions les marques, les talents et les idées.
              <br className="desktop-break" /> Pour créer ce qui compte. Et
              faire avancer la suite.
            </p>
            <div className="hero-actions">
              <ButtonLink href="#ecosystem">Explorer l’écosystème</ButtonLink>
              <ButtonLink href="#vision" tone="text">
                Découvrir la maison
              </ButtonLink>
            </div>
          </div>
          <div className="hero-universes">
            <p className="eyebrow">Une maison. Cinq univers.</p>
            {verticals.map((v) => (
              <a key={v.id} href={urlFor(v.id, 'fr', '', routingConfig)}>
                <span className="universe-number">{v.number}</span>
                <span className="universe-word">{v.verb}</span>
                <span className="universe-name">
                  {v.name}
                  <span aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="container hero-baseline">
          <span>STRATÉGIE · CRÉATION · COMPÉTENCES · PRODUITS</span>
          <span>
            Faites le premier mouvement <span aria-hidden="true">↓</span>
          </span>
        </div>
      </section>
      <section className="ecosystem-section section" id="ecosystem">
        <div className="container">
          <SectionHeading
            number="01"
            label="L’écosystème"
            title="Cinq univers. Une même ambition."
            description="Chaque univers a sa mission. Ensemble, ils ouvrent de nouvelles possibilités."
          />
          <div className="ecosystem-grid">
            {verticals.map((v) => (
              <a
                className={`ecosystem-card ecosystem-card--${v.id}`}
                key={v.id}
                href={urlFor(v.id, 'fr', '', routingConfig)}
              >
                <div className="card-top">
                  <span>{v.number} / 05</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <p className="card-verb">{v.verb}.</p>
                <h3>{v.name}</h3>
                <p className="card-description">{v.description}</p>
                <span className="card-link">
                  Explorer l’univers <span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="vision-section section" id="vision">
        <div className="container vision-grid">
          <div>
            <p className="eyebrow">02 / LA MAISON SMARTSELL</p>
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
            number="03"
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
      <section className="learning-section section">
        <div className="container learning-grid">
          <div>
            <p className="eyebrow">04 / SMARTSELL ACADEMY</p>
            <h2>
              Apprendre.
              <br />
              Pratiquer.
              <br />
              <em>Évoluer.</em>
            </h2>
            <p>
              Les compétences ouvrent des possibilités. Academy est notre
              univers pour apprendre à créer, utiliser les outils du digital et
              développer votre savoir-faire.
            </p>
            <ButtonLink
              href={urlFor('academy', 'fr', '', routingConfig)}
              tone="secondary"
            >
              Découvrir Academy
            </ButtonLink>
          </div>
          <div className="learning-board">
            <p className="eyebrow">Votre prochain terrain de jeu</p>
            {[
              ['01', 'Marketing & communication'],
              ['02', 'Design & création'],
              ['03', 'Web & produit'],
              ['04', 'IA & data'],
            ].map(([n, t]) => (
              <div key={n}>
                <span>{n}</span>
                <strong>{t}</strong>
                <span aria-hidden="true">↗</span>
              </div>
            ))}
            <p className="board-caption">
              Des compétences pour faire le prochain pas.
            </p>
          </div>
        </div>
      </section>
      <section className="media-section section">
        <div className="container">
          <SectionHeading
            number="05"
            label="Smartsell Media"
            title="Comprendre ce qui vient."
            description="Un regard sur la technologie, les entreprises et la culture créative en Afrique."
          />
          <div className="editorial-grid">
            <div className="editorial-manifesto">
              <p className="eyebrow">TECH · BUSINESS · CRÉATION</p>
              <h3>
                Les outils changent.
                <br />
                Les idées circulent.
                <br />
                Les histoires comptent.
              </h3>
              <ButtonLink
                href={urlFor('media', 'fr', '', routingConfig)}
                tone="text"
              >
                Découvrir Media
              </ButtonLink>
            </div>
            <div className="editorial-themes">
              {[
                [
                  'Tech & intelligence artificielle',
                  'Les outils et les transformations du digital.',
                ],
                [
                  'Business & entrepreneurs',
                  'Les personnes et les idées qui font avancer les entreprises.',
                ],
                [
                  'Afrique & culture créative',
                  'Des voix, des regards et de nouvelles façons de créer.',
                ],
              ].map(([title, copy]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="studio-section section">
        <div className="container studio-grid">
          <div className="studio-lettering" aria-hidden="true">
            <span>IMAGE.</span>
            <span>SON.</span>
            <span>IMPACT.</span>
          </div>
          <div>
            <p className="eyebrow">06 / SMARTSELL STUDIOS</p>
            <h2>
              Votre idée.
              <br />
              Notre espace.
            </h2>
            <p>
              Photo, vidéo, podcast, interview. Un univers dédié à la production
              de contenus, pour donner une forme aux histoires des marques et
              des créateurs.
            </p>
            <ButtonLink href={urlFor('studio', 'fr', '', routingConfig)}>
              Découvrir Studios
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="journey-section section" id="parcours">
        <div className="container">
          <SectionHeading
            number="07"
            label="Continuez votre parcours"
            title="Tout commence quelque part. La suite se construit ensemble."
          />
          <div className="journey-grid">
            {nextJourney.map((j, i) => (
              <a
                key={j.step}
                href={urlFor(j.vertical, 'fr', '', routingConfig)}
              >
                <span className="eyebrow">
                  0{i + 1} / {j.step}
                </span>
                <h3>{j.title}</h3>
                <p>{j.copy}</p>
                <span className="journey-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="closing-section">
        <div className="container">
          <p className="eyebrow">SMARTSELL / AVEC VOUS, DE BOUT EN BOUT.</p>
          <h2>
            Quel sera votre
            <br />
            prochain <em>mouvement ?</em>
          </h2>
          <ButtonLink href="#ecosystem" tone="secondary">
            Trouver mon univers
          </ButtonLink>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Smartsell',
            url: absoluteUrl('/fr/'),
            logo: absoluteUrl('/brand/wordmark-purple.png'),
            description:
              'Un écosystème digital et créatif : Agency, Academy, Media, Studios et Labs.',
          }).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
