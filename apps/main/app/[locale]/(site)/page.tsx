import type { Metadata } from 'next';
import { Img, CtaLink } from '@smartsell/ui/immersive';
import { Icon } from '@smartsell/ui/icons';
import { clip, photos, videos } from '@smartsell/content/photos';
import { brands, clients, websites, films } from '@smartsell/content/portfolio';
import {
  locale,
  t,
  urlFor,
  routingConfig,
  withBasePath,
} from '@smartsell/routing';
import { absoluteUrl } from '@smartsell/seo';
import { LegacyHomeLinks } from '../../../components/legacy-home-links';
import {
  HeroMotion,
  HouseMotion,
  HoverVideo,
  Starburst,
} from '../../../components/house-motion';
import './house-motion.css';

export const metadata: Metadata = {
  title: {
    absolute: t(
      'Smartsell — Un écosystème digital. Quatre univers.',
      'Smartsell — One digital ecosystem. Four universes.',
    ),
  },
  description: t(
    'Agency, Academy, Media et Studios : un écosystème digital qui réunit agence, formation, média et production créative, depuis Conakry.',
    'Agency, Academy, Media and Studios: a digital ecosystem bringing together an agency, learning, media and creative production, from Conakry.',
  ),
  alternates: { canonical: withBasePath(`/${locale}/`) },
};
const go = (id: 'agency' | 'academy' | 'media' | 'studio', path = '') =>
  urlFor(id, locale, path, routingConfig);
const cards = [
  {
    name: 'Agency',
    number: '01',
    tone: 'agency',
    photo: photos.agencyGlass,
    clip: clip('ghost'),
    copy: t(
      'Construire des marques et des expériences digitales.',
      'Build brands and digital experiences.',
    ),
    label: t('Découvrir l’agence', 'Discover the agency'),
    href: go('agency'),
  },
  {
    name: 'Academy',
    number: '02',
    tone: 'academy',
    photo: photos.academyRoom,
    copy: t(
      'Apprendre les compétences qui créent des opportunités.',
      'Learn the skills that create opportunities.',
    ),
    label: t('Voir les formations', 'Explore the courses'),
    href: go('academy', 'courses'),
  },
  {
    name: 'Media',
    number: '03',
    tone: 'media',
    photo: photos.mediaPresenter,
    clip: clip('la-patronne'),
    copy: t(
      'Comprendre le digital, la tech et l’innovation.',
      'Understand digital, technology and innovation.',
    ),
    label: t('Lire le média', 'Read the media'),
    href: go('media'),
  },
  {
    name: 'Studios',
    number: '04',
    tone: 'studio',
    photo: photos.podcastWhite,
    clip: videos.podcast,
    copy: t('Créer. Produire. Enregistrer.', 'Create. Produce. Record.'),
    label: t('Préparer ma séance', 'Plan my session'),
    href: go('studio', 'booking'),
  },
];
export default function Home() {
  const brand = brands[0],
    website = websites.find((w) => w.slug === 'grs') || websites[0],
    film = films.find((f) => f.slug === 'radisson-karaa') || films[0];
  const selected = [
    {
      title: brand.name,
      type: t('Identité de marque', 'Brand identity'),
      photo: brand.pages[0],
      href: go('agency', `work/${brand.slug}`),
    },
    {
      title: website.name,
      type: t('Site web', 'Website'),
      photo: website.shot,
      href: go('agency', 'work'),
    },
    {
      title: film.title,
      type: film.kind,
      photo: {
        id: film.clip.poster,
        file: film.clip.poster,
        alt: film.title,
        credit: 'Smartsell',
        ratio: 'landscape' as const,
      },
      href: go('media', `video/${film.slug}`),
    },
  ];
  return (
    <main id="main" data-kin-off className="house-v2">
      <LegacyHomeLinks />
      <HouseMotion />
      <section className="house-hero" aria-labelledby="house-title">
        <div className="house-hero-top">
          <p className="house-label">
            {t(
              'UN ÉCOSYSTÈME DIGITAL · CONAKRY',
              'A DIGITAL ECOSYSTEM · CONAKRY',
            )}
          </p>
          <span className="house-coordinate">
            {t('GUINÉE / AFRIQUE DE L’OUEST', 'GUINEA / WEST AFRICA')}
          </span>
        </div>
        <p className="house-name">SMARTSELL</p>
        <HeroMotion
          scenes={[
            {
              word: t('CRÉER.', 'CREATE.'),
              universe: 'Agency',
              tone: 'agency',
              photo: photos.agencyGlass,
              clip: clip('ghost'),
            },
            {
              word: t('APPRENDRE.', 'LEARN.'),
              universe: 'Academy',
              tone: 'academy',
              photo: photos.academyRoom,
            },
            {
              word: t('INFORMER.', 'INFORM.'),
              universe: 'Media',
              tone: 'media',
              photo: photos.mediaPresenter,
              clip: clip('la-patronne'),
            },
            {
              word: t('PRODUIRE.', 'PRODUCE.'),
              universe: 'Studios',
              tone: 'studio',
              photo: photos.podcastWhite,
              clip: videos.podcast,
            },
          ]}
        />
        <div className="house-hero-bottom">
          <p>
            {t(
              'Un écosystème digital qui réunit agence, formation, média et production créative.',
              'A digital ecosystem bringing together an agency, learning, media and creative production.',
            )}
          </p>
          <div className="house-actions">
            <CtaLink href="#univers">
              {t('Explorer l’écosystème', 'Explore the ecosystem')}
            </CtaLink>
            <CtaLink href={withBasePath(`/${locale}/contact/`)} tone="ghost">
              {t('Parler à Smartsell', 'Talk to Smartsell')}
            </CtaLink>
          </div>
        </div>
        <div className="house-hero-note">
          <span>
            {t(
              'Une maison. Quatre façons d’avancer.',
              'One house. Four ways forward.',
            )}
          </span>
          <a href="#univers">
            {t('Choisir mon univers', 'Find my universe')}{' '}
            <Icon name="arrowDown" />
          </a>
        </div>
      </section>
      <section
        className="house-universes house-wrap"
        id="univers"
        aria-labelledby="univers-title"
      >
        <span id="ecosystem" className="house-anchor" />
        <header className="house-section-head" data-hm>
          <p className="house-label">
            01 / {t('QUATRE UNIVERS', 'FOUR UNIVERSES')}
          </p>
          <h2 id="univers-title">
            {t('Une envie.\nLa bonne porte.', 'An ambition.\nThe right door.')}
          </h2>
          <p>
            {t(
              'Choisissez votre point de départ.',
              'Choose your starting point.',
            )}
          </p>
        </header>
        <div className="house-card-grid">
          {cards.map((card, i) => (
            <a
              data-hm
              style={{ '--i': i } as React.CSSProperties}
              className={`house-universe house-universe-${card.tone}`}
              href={card.href}
              key={card.name}
            >
              <div className="house-card-picture">
                <Img photo={card.photo} width={900} />
                {card.clip && <HoverVideo clip={card.clip} />}
                <span className="house-card-number">
                  {card.number} / SMARTSELL
                </span>
                <span className="house-card-arrow" aria-hidden="true">
                  <Icon name="arrowUpRight" />
                </span>
              </div>
              <div className="house-card-copy">
                <h3>{card.name}</h3>
                <p>{card.copy}</p>
                <span>
                  {card.label} <Icon name="arrowRight" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section className="house-selected" aria-labelledby="selected-title">
        <div className="house-wrap">
          <header className="house-section-head" data-hm>
            <p className="house-label">
              02 / {t('UNE SÉLECTION DE RÉALISATIONS', 'SELECTED WORK')}
            </p>
            <h2 id="selected-title">
              {t('Des idées devenues réelles.', 'Ideas made real.')}
            </h2>
            <a href={go('agency', 'work')}>
              {t('Tout le portfolio', 'All our work')}{' '}
              <Icon name="arrowUpRight" />
            </a>
          </header>
          <div className="house-work-grid">
            {selected.map((project, i) => (
              <a
                href={project.href}
                key={project.title}
                className="house-work"
                data-hm
                style={{ '--i': i } as React.CSSProperties}
              >
                <div>
                  <Img photo={project.photo} width={700} />
                  <span aria-hidden="true">
                    <Icon name="arrowUpRight" />
                  </span>
                </div>
                <p>{project.type}</p>
                <h3>{project.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="house-proof house-wrap" aria-labelledby="proof-title">
        <p className="house-label">
          03 / {t('ILS NOUS FONT CONFIANCE', 'THEY TRUST US')}
        </p>
        <h2 id="proof-title" data-hm>
          {t(
            'Des marques qui avancent avec nous.',
            'Brands moving forward with us.',
          )}
        </h2>
        <ul className="sr-only">
          {clients.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <div className="hm-marquee" aria-hidden="true">
          {[0, 1].map((row) => (
            <div
              key={row}
              className={`hm-marquee-row ${row ? 'is-reverse' : ''}`}
            >
              <div>
                {[...clients, ...clients].map((name, i) => (
                  <span key={i}>{name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="house-closing" aria-labelledby="next-title">
        <div className="house-wrap">
          <p className="house-label">
            04 / {t('LE PROCHAIN PAS', 'THE NEXT STEP')}
          </p>
          <h2 id="next-title" data-hm>
            {t(
              'Votre prochain pas\ncommence ici.',
              'Your next step\nstarts here.',
            )}
          </h2>
          <CtaLink href={withBasePath(`/${locale}/contact/`)}>
            {t('Parler à Smartsell', 'Talk to Smartsell')}
          </CtaLink>
        </div>
        <Starburst />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Smartsell',
            url: absoluteUrl(withBasePath(`/${locale}/`)),
            logo: absoluteUrl(withBasePath('/brand/wordmark-purple.png')),
            description: t(
              'Un écosystème digital : agence, formation, média et production créative.',
              'A digital ecosystem: agency, learning, media and creative production.',
            ),
          }).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
