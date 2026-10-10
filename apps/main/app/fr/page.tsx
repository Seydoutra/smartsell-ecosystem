import type { Metadata } from 'next';
import { Highlight, PixelMosaic, ScrollLitText } from '@smartsell/ui/signature';
import {
  Carousel,
  CtaLink,
  FloatingCta,
  HorizontalScroll,
  Marquee,
  ParallaxGallery,
  PhotoColumns,
  StackCards,
  ZoomReveal,
  type HorizontalItem,
  type Slide,
} from '@smartsell/ui/immersive';
import { photos, photoUrl, photoCredits } from '@smartsell/content/photos';
import {
  withBasePath,
  routingConfig,
  urlFor,
  managementUrl,
} from '@smartsell/routing';
import { absoluteUrl } from '@smartsell/seo';
import type { VerticalId } from '@smartsell/types';
export const metadata: Metadata = {
  title: {
    absolute:
      'Smartsell — Agence de communication & marketing digital à Conakry',
  },
  description:
    'Stratégie de marque, réseaux sociaux, publicité digitale, production photo et vidéo, sites web et formation : Smartsell fait parler votre marque.',
  alternates: { canonical: withBasePath('/fr/') },
};
const go = (vertical: VerticalId, path = '') =>
  urlFor(vertical, 'fr', path, routingConfig);
const contact = go('agency', 'contact');

const services: HorizontalItem[] = [
  {
    label: '01 · Stratégie',
    title: 'Stratégie & identité de marque',
    copy: 'Positionnement, plateforme de marque, logo et univers visuel : des fondations solides pour être reconnu au premier regard.',
    photo: photos.meeting,
    href: go('agency', 'services/strategie'),
    cta: 'Construire ma marque',
  },
  {
    label: '02 · Social media',
    title: 'Réseaux sociaux & communauté',
    copy: 'Ligne éditoriale, posts, Reels et animation de communauté, au rythme de votre audience et de vos temps forts.',
    photo: photos.phonePink,
    href: go('agency', 'services/social-media'),
    cta: 'Booster mes réseaux',
  },
  {
    label: '03 · Publicité',
    title: 'Publicité digitale qui performe',
    copy: 'Campagnes Meta, Google et TikTok ciblées, suivies et optimisées pour que chaque franc investi travaille pour vous.',
    photo: photos.phoneYellow,
    href: go('agency', 'services/performance'),
    cta: 'Lancer une campagne',
  },
  {
    label: '04 · Production',
    title: 'Photo, vidéo & podcast',
    copy: 'Spots, portraits, captations et podcasts : nos studios donnent une image et une voix à vos histoires.',
    photo: photos.videoField,
    href: go('studio', 'booking'),
    cta: 'Préparer un tournage',
  },
  {
    label: '05 · Web',
    title: 'Sites web & e-commerce',
    copy: 'Des sites rapides, élégants et pensés pour convertir, de la vitrine à la boutique en ligne.',
    photo: photos.phoneDesk,
    href: go('agency', 'services/web-development'),
    cta: 'Créer mon site',
  },
  {
    label: '06 · Formation',
    title: 'Former vos équipes',
    copy: 'Marketing digital, création de contenu, IA : vos équipes apprennent à faire grandir la marque en interne.',
    photo: photos.learnerFocus,
    href: go('academy', 'corporate'),
    cta: 'Former mon équipe',
  },
  {
    label: '07 · Outils',
    title: 'Outils & automatisation',
    copy: 'CRM, tableaux de bord et automatisations : Smartsell Labs construit les outils qui vous font gagner du temps.',
    photo: photos.founder,
    href: go('labs', 'products'),
    cta: 'Découvrir nos outils',
  },
];

const slides: Slide[] = [
  {
    id: 'agency',
    kicker: '01 · Smartsell Agency',
    name: 'Agency',
    pitch:
      'Stratégie, création et campagnes digitales pour les marques qui veulent compter sur leur marché.',
    photo: photos.teamSofa,
    primary: { href: go('agency'), label: 'Entrer dans Agency' },
    secondary: { href: contact, label: 'Demander un devis' },
  },
  {
    id: 'academy',
    kicker: '02 · Smartsell Academy',
    name: 'Academy',
    pitch:
      'Des formations pratiques en marketing digital, design, web et IA, pour les talents comme pour les équipes.',
    photo: photos.learnerDesk,
    primary: { href: go('academy'), label: 'Entrer dans Academy' },
    secondary: { href: go('academy', 'courses'), label: 'Voir les modules' },
  },
  {
    id: 'media',
    kicker: '03 · Smartsell Media',
    name: 'Media',
    pitch:
      'Le média qui décrypte la tech, le business et la culture créative, depuis la Guinée et l’Afrique.',
    photo: photos.phoneShop,
    primary: { href: go('media'), label: 'Entrer dans Media' },
    secondary: { href: go('media', 'latest'), label: 'Lire les articles' },
  },
  {
    id: 'studio',
    kicker: '04 · Smartsell Studios',
    name: 'Studios',
    pitch:
      'Plateaux photo, vidéo et podcast pour produire des contenus qui arrêtent le défilement.',
    photo: photos.podcastNeon,
    primary: { href: go('studio'), label: 'Entrer dans Studios' },
    secondary: {
      href: go('studio', 'booking'),
      label: 'Simuler une réservation',
    },
  },
  {
    id: 'labs',
    kicker: '05 · Smartsell Labs',
    name: 'Labs',
    pitch:
      'Des produits numériques, comme Smartsell Management, pour piloter clients, projets et ventes.',
    photo: photos.manager,
    primary: { href: go('labs'), label: 'Entrer dans Labs' },
    secondary: { href: managementUrl, label: 'Découvrir Management' },
  },
];

const method = [
  {
    title: 'On écoute.',
    copy: 'Votre marché, vos clients, vos objectifs. Un atelier, des questions franches, et une vision claire de ce qui doit changer.',
    photo: photos.partners,
  },
  {
    title: 'On imagine.',
    copy: 'Concept créatif, messages clés, plan de diffusion : une idée forte, pensée pour se décliner partout où votre public se trouve.',
    photo: photos.creator,
  },
  {
    title: 'On produit.',
    copy: 'Visuels, vidéos, textes, sites : nos créatifs et nos studios passent à l’action, avec le souci du détail.',
    photo: photos.videoGimbal,
  },
  {
    title: 'On diffuse.',
    copy: 'Réseaux sociaux, publicité, influence : le bon message, au bon endroit, au bon moment.',
    photo: photos.phoneShop,
  },
  {
    title: 'On mesure.',
    copy: 'Tableaux de bord et rapports clairs. Ce qui marche est amplifié, le reste est ajusté.',
    photo: photos.portraitPro,
  },
];

const quickLinks: [VerticalId, string, string][] = [
  ['agency', 'contact', 'Demander un devis'],
  ['agency', 'work', 'Voir nos réalisations'],
  ['agency', 'services/social-media', 'Gérer mes réseaux'],
  ['agency', 'services/performance', 'Lancer une pub'],
  ['studio', 'booking', 'Préparer un tournage'],
  ['academy', 'courses', 'Me former'],
  ['academy', 'corporate', 'Former mon équipe'],
  ['media', 'newsletter', 'Recevoir la newsletter'],
  ['labs', 'products', 'Découvrir nos outils'],
];

export default function Home() {
  return (
    <main id="main">
      <section className="im-hero" aria-labelledby="hero-title">
        <PixelMosaic tone="main" />
        <div className="im-hero-copy">
          <p className="sg-mono">
            ✳ Agence de communication & marketing digital · Conakry
          </p>
          <h1 id="hero-title">
            <span>Votre marque</span>
            <span>mérite qu’on</span>
            <span>
              <Highlight>parle d’elle.</Highlight>
            </span>
          </h1>
          <p className="im-hero-lead">
            Stratégie, réseaux sociaux, publicité, production et web : Smartsell
            imagine des campagnes qui se voient, se partagent et font grandir
            votre activité.
          </p>
          <div className="im-actions">
            <CtaLink href={contact}>Lancer mon projet</CtaLink>
            <CtaLink href={go('agency', 'work')} tone="ghost">
              Voir nos réalisations
            </CtaLink>
          </div>
          <div className="im-hero-proof">
            <span className="im-faces" aria-hidden="true">
              {[
                photos.portraitSmile,
                photos.portraitWall,
                photos.portraitPrint,
                photos.creator,
              ].map((p) => (
                <img key={p.id} src={photoUrl(p, 96)} alt="" />
              ))}
            </span>
            Une équipe de stratèges, créatifs et producteurs.
          </div>
        </div>
        <PhotoColumns
          columns={[
            [
              photos.phonePink,
              photos.photographer,
              photos.portraitGold,
              photos.teamLaptop,
            ],
            [
              photos.podcastWhite,
              photos.portraitTurban,
              photos.videoGimbal,
              photos.phoneYellow,
            ],
            [
              photos.cameraStreet,
              photos.portraitYellow,
              photos.learner,
              photos.podcastNeon,
            ],
          ]}
        />
      </section>

      <Marquee
        tone="yellow"
        items={[
          'Stratégie de marque',
          'Réseaux sociaux',
          'Publicité digitale',
          'Production vidéo',
          'Identité visuelle',
          'Sites web',
          'Podcasts',
          'Formation',
        ]}
      />

      <ZoomReveal
        photo={photos.teamLaptop}
        eyebrow="01 · Une seule équipe"
        title={
          <>
            Penser, créer, diffuser, mesurer.{' '}
            <Highlight>Sous le même toit.</Highlight>
          </>
        }
        copy="Fini les prestataires qui ne se parlent pas. Chez Smartsell, la stratégie, la création, la production et la formation avancent ensemble, au service de vos résultats."
        cta={<CtaLink href="#services">Voir nos expertises</CtaLink>}
      />

      <div id="services">
        <HorizontalScroll
          eyebrow="02 · Ce que nous faisons"
          title="Tout ce qu’il faut pour que votre marque soit vue, choisie et recommandée."
          items={services}
        />
      </div>

      <section className="sg-manifesto" id="manifeste">
        <div className="container">
          <span className="sg-mono">03 · Notre conviction</span>
          <ScrollLitText text="On ne fait pas de la communication pour faire joli. On construit des marques qui se reconnaissent au premier regard, des messages qui touchent juste et des campagnes dont on mesure l’effet. Votre ambition mérite mieux qu’un post de temps en temps." />
          <div className="im-actions" style={{ marginTop: 48 }}>
            <CtaLink href={contact}>Parlons de votre marque</CtaLink>
          </div>
        </div>
      </section>

      <section
        className="im-section im-dark"
        id="ecosystem"
        aria-labelledby="eco-title"
      >
        <div className="im-head">
          <div>
            <span className="sg-mono">04 · L’écosystème Smartsell</span>
            <h2 id="eco-title">
              Une maison mère. <Highlight>Cinq expertises</Highlight> à part
              entière.
            </h2>
          </div>
          <p>
            Chaque univers a son site, son équipe et son savoir-faire. Ensemble,
            ils couvrent toute la vie de votre marque, de l’idée aux résultats.
          </p>
        </div>
        <Carousel slides={slides} label="Les cinq sites Smartsell" />
      </section>

      <section
        className="im-section im-light"
        id="methode"
        aria-labelledby="method-title"
      >
        <div className="im-head">
          <div>
            <span className="sg-mono">05 · Notre méthode</span>
            <h2 id="method-title">Du brief aux résultats, en cinq temps.</h2>
          </div>
          <div className="im-head-side">
            <p>
              Une méthode simple, transparente et rythmée, pour que vous sachiez
              toujours où en est votre projet.
            </p>
            <CtaLink href={contact} tone="dark">
              Démarrer un projet
            </CtaLink>
          </div>
        </div>
        <div className="container">
          <StackCards steps={method} />
        </div>
      </section>

      <ParallaxGallery
        columns={[
          [photos.portraitSmile, photos.photographer, photos.portraitPro],
          [photos.portraitGold, photos.podcastLaptop, photos.creator],
          [photos.portraitTurban, photos.learner, photos.portraitWall],
          [photos.portraitPrint, photos.cameraClose, photos.portraitStand],
        ]}
      >
        <span className="sg-mono">06 · Pour celles et ceux qui avancent</span>
        <h2>
          Des visages. Des voix. <Highlight>Des histoires.</Highlight>
        </h2>
        <p>
          Entrepreneurs, créateurs, marques et institutions : nous aidons celles
          et ceux qui font bouger la Guinée et l’Afrique à se faire entendre.
        </p>
        <div className="im-actions">
          <CtaLink href={contact}>Raconter mon histoire</CtaLink>
          <CtaLink href={go('studio')} tone="ghost">
            Découvrir nos studios
          </CtaLink>
        </div>
      </ParallaxGallery>

      <Marquee
        tone="dark"
        reverse
        items={[
          'Faites-vous remarquer',
          'Faites-vous choisir',
          'Faites-vous recommander',
        ]}
      />

      <section className="sg-closing">
        <div className="container">
          <div className="sg-closing-card">
            <PixelMosaic tone="agency" />
            <p className="sg-mono">Smartsell · Votre prochaine campagne</p>
            <h2>
              Prêt à faire
              <br />
              <em>du bruit ?</em>
            </h2>
            <div className="im-actions">
              <CtaLink href={contact}>Lancer mon projet</CtaLink>
              <CtaLink href={go('agency', 'work')} tone="ghost">
                Voir nos réalisations
              </CtaLink>
            </div>
            <nav className="sg-chips" aria-label="Accès directs">
              {quickLinks.map(([vertical, path, label]) => (
                <a key={vertical + path} href={go(vertical, path)}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <p className="im-credits">
            Photographies d’illustration : Unsplash ({photoCredits.join(', ')}).
          </p>
        </div>
      </section>

      <FloatingCta href={contact} label="Parlons de votre projet" />

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
              'Agence de communication et de marketing digital à Conakry : stratégie, réseaux sociaux, publicité, production, web et formation.',
          }).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
