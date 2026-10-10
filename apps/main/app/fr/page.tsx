import type { Metadata } from 'next';
import {
  CountUp,
  Highlight,
  PixelMosaic,
  ScrollLitText,
} from '@smartsell/ui/signature';
import {
  Carousel,
  CtaLink,
  FloatingCta,
  HorizontalScroll,
  Img,
  Marquee,
  ParallaxGallery,
  PhotoColumns,
  StackCards,
  ZoomReveal,
  type HorizontalItem,
  type Slide,
} from '@smartsell/ui/immersive';
import {
  BriefBuilder,
  ExpandPanels,
  JourneyPicker,
  Rail,
  type Journey,
  type Panel,
} from '@smartsell/ui/home';
import {
  photos,
  photoUrl,
  photoCredits,
  type Photo,
} from '@smartsell/content/photos';
import {
  agencyServices,
  articles,
  cases,
  courses,
  packs,
  siteMenus,
} from '@smartsell/content/sites';
import { verticals } from '@smartsell/content';
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
    'Stratégie de marque, réseaux sociaux, publicité digitale, production photo et vidéo, sites web, formation et outils : Smartsell fait parler votre marque.',
  alternates: { canonical: withBasePath('/fr/') },
};
const go = (vertical: VerticalId, path = '') =>
  urlFor(vertical, 'fr', path, routingConfig);
const contact = go('agency', 'contact');

const quick: [VerticalId, string, string][] = [
  ['agency', 'Être vu & choisi', 'Stratégie, création, campagnes'],
  ['academy', 'Monter en compétences', 'Formations pratiques'],
  ['media', 'Comprendre ce qui vient', 'Tech, business, culture'],
  ['studio', 'Produire un contenu', 'Photo, vidéo, podcast'],
  ['labs', 'Piloter son activité', 'Produits numériques'],
];

const journeys: Journey[] = [
  {
    id: 'entreprise',
    label: 'une entreprise',
    headline: 'Structurer votre marque et faire grandir vos équipes.',
    photo: photos.meeting,
    steps: [
      {
        site: 'Agency',
        title: 'Clarifier votre positionnement',
        copy: 'Un atelier stratégique pour aligner marque, publics et messages.',
        href: go('agency', 'services/strategie'),
      },
      {
        site: 'Academy',
        title: 'Former votre équipe marketing',
        copy: 'Des parcours sur mesure, pensés pour vos outils et vos objectifs.',
        href: go('academy', 'corporate'),
      },
      {
        site: 'Labs',
        title: 'Piloter clients et ventes',
        copy: 'Smartsell Management réunit clients, projets, planning et finances.',
        href: managementUrl,
      },
    ],
    cta: { href: contact, label: 'Demander un devis' },
  },
  {
    id: 'entrepreneur',
    label: 'un entrepreneur',
    headline: 'Lancer une marque qu’on remarque dès le premier jour.',
    photo: photos.founder,
    steps: [
      {
        site: 'Agency',
        title: 'Créer votre identité',
        copy: 'Nom, logo, couleurs et ton : une marque cohérente partout.',
        href: go('agency', 'services/branding'),
      },
      {
        site: 'Studios',
        title: 'Produire vos premiers contenus',
        copy: 'Une Creator Session pour tourner plusieurs formats courts d’un coup.',
        href: go('studio', 'packs/creator'),
      },
      {
        site: 'Agency',
        title: 'Lancer votre première campagne',
        copy: 'Meta, Google ou TikTok : un budget maîtrisé, des résultats suivis.',
        href: go('agency', 'services/performance'),
      },
    ],
    cta: { href: contact, label: 'Lancer mon projet' },
  },
  {
    id: 'talent',
    label: 'un talent',
    headline: 'Apprendre un métier du digital en pratiquant.',
    photo: photos.learner,
    steps: [
      {
        site: 'Academy',
        title: 'Choisir votre module',
        copy: 'Marketing, design, web, IA, data ou vidéo : huit terrains de pratique.',
        href: go('academy', 'courses'),
      },
      {
        site: 'Academy',
        title: 'Essayer une leçon',
        copy: 'Trois leçons d’aperçu par module, avec exercice et quiz.',
        href: go('academy', 'courses/marketing-digital'),
      },
      {
        site: 'Agency',
        title: 'Rejoindre le collectif',
        copy: 'Créatifs, stratèges, développeurs : présentez votre travail.',
        href: go('agency', 'careers'),
      },
    ],
    cta: { href: go('academy', 'courses'), label: 'Voir les modules' },
  },
  {
    id: 'createur',
    label: 'un créateur',
    headline: 'Donner une image et une voix à vos idées.',
    photo: photos.podcastWhite,
    steps: [
      {
        site: 'Studios',
        title: 'Réserver un plateau',
        copy: 'Photo, vidéo ou podcast : choisissez l’espace qui vous ressemble.',
        href: go('studio', 'spaces'),
      },
      {
        site: 'Studios',
        title: 'Lancer votre podcast',
        copy: 'Conducteur, installation audio et enregistrement accompagné.',
        href: go('studio', 'packs/podcast'),
      },
      {
        site: 'Academy',
        title: 'Maîtriser la vidéo',
        copy: 'Tournage, montage et formats courts pour les réseaux.',
        href: go('academy', 'courses/creation-video'),
      },
    ],
    cta: { href: go('studio', 'booking'), label: 'Préparer ma session' },
  },
  {
    id: 'institution',
    label: 'une institution',
    headline: 'Informer, mobiliser et rendre votre action visible.',
    photo: photos.partners,
    steps: [
      {
        site: 'Agency',
        title: 'Construire une campagne d’information',
        copy: 'Messages clairs, contenus adaptés, diffusion multicanale.',
        href: go('agency', 'services/contenus'),
      },
      {
        site: 'Studios',
        title: 'Filmer une prise de parole',
        copy: 'Une interview soignée, de la préparation au tournage.',
        href: go('studio', 'packs/interview'),
      },
      {
        site: 'Media',
        title: 'Suivre les idées qui comptent',
        copy: 'Analyses et guides sur la tech, le business et la création.',
        href: go('media', 'latest'),
      },
    ],
    cta: { href: contact, label: 'Parlons de votre mission' },
  },
];

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

const slidePhotos: Record<VerticalId, Photo> = {
  agency: photos.teamSofa,
  academy: photos.learnerDesk,
  media: photos.phoneShop,
  studio: photos.podcastNeon,
  labs: photos.manager,
};
const slidePitch: Record<VerticalId, string> = {
  agency:
    'Stratégie, création et campagnes digitales pour les marques qui veulent compter sur leur marché.',
  academy:
    'Des formations pratiques en marketing digital, design, web et IA, pour les talents comme pour les équipes.',
  media:
    'Le média qui décrypte la tech, le business et la culture créative, depuis la Guinée et l’Afrique.',
  studio:
    'Plateaux photo, vidéo et podcast pour produire des contenus qui arrêtent le défilement.',
  labs: 'Des produits numériques, comme Smartsell Management, pour piloter clients, projets et ventes.',
};
const slideSecondary: Record<VerticalId, { href: string; label: string }> = {
  agency: { href: contact, label: 'Demander un devis' },
  academy: { href: go('academy', 'courses'), label: 'Voir les modules' },
  media: { href: go('media', 'latest'), label: 'Lire les articles' },
  studio: { href: go('studio', 'booking'), label: 'Simuler une réservation' },
  labs: { href: managementUrl, label: 'Découvrir Management' },
};
const slides: Slide[] = verticals.map((v) => ({
  id: v.id,
  kicker: `${v.number} · Smartsell ${v.name}`,
  name: v.name,
  pitch: slidePitch[v.id],
  photo: slidePhotos[v.id],
  primary: { href: go(v.id), label: `Entrer dans ${v.name}` },
  secondary: slideSecondary[v.id],
  links: siteMenus[v.id]
    .slice(0, 4)
    .map((m) => ({ href: go(v.id, m.path), label: m.label })),
}));

const casePhotos: Photo[] = [
  photos.teamSofa,
  photos.portraitTurban,
  photos.meeting,
  photos.partners,
  photos.learnerDesk,
  photos.phoneShop,
];
const coursePhotos: Record<string, Photo> = {
  'marketing-digital': photos.learnerFocus,
  'community-management': photos.phonePink,
  'design-graphique': photos.portraitWall,
  'ui-ux': photos.learnerDesk,
  web: photos.phoneDesk,
  'intelligence-artificielle': photos.founder,
  'power-bi': photos.manager,
  'creation-video': photos.videoGimbal,
};
const articlePhotos: Photo[] = [
  photos.teamLaptop,
  photos.creator,
  photos.portraitPro,
  photos.phoneShop,
  photos.founder,
];

const spacesPanels: Panel[] = [
  {
    kicker: 'Studios · Plateau photo',
    title: 'Portraits, produits, séries de marque.',
    copy: 'Fonds interchangeables, zone lumière et table de prise de vue pour des images qui vous ressemblent.',
    photo: photos.cameraClose,
    href: go('studio', 'spaces/photo'),
    cta: 'Découvrir le plateau photo',
  },
  {
    kicker: 'Studios · Plateau vidéo',
    title: 'Interviews, formats de marque, créations.',
    copy: 'Un cadre modulable avec éclairage et retour image pour des prises de parole soignées.',
    photo: photos.videoField,
    href: go('studio', 'spaces/video'),
    cta: 'Découvrir le plateau vidéo',
  },
  {
    kicker: 'Studios · Espace podcast',
    title: 'Conversations enregistrées, audio et vidéo.',
    copy: 'Table de conversation, micros et retour casque : votre émission prend forme.',
    photo: photos.podcastNeon,
    href: go('studio', 'spaces/podcast'),
    cta: 'Découvrir l’espace podcast',
  },
];

const people: Panel[] = [
  {
    kicker: 'Métier · Stratégie',
    title: 'Les stratèges',
    copy: 'Ils écoutent, analysent votre marché et transforment une ambition en plan d’action clair.',
    photo: photos.partners,
    href: go('agency', 'services/strategie'),
    cta: 'Travailler avec eux',
  },
  {
    kicker: 'Métier · Création',
    title: 'Les créatifs',
    copy: 'Directeurs artistiques, designers et rédacteurs : ils donnent une forme et une voix à votre marque.',
    photo: photos.portraitWall,
    href: go('agency', 'work'),
    cta: 'Voir leurs explorations',
  },
  {
    kicker: 'Métier · Production',
    title: 'Les producteurs',
    copy: 'Photographes, vidéastes et ingénieurs du son font naître les images et les voix de vos histoires.',
    photo: photos.cameraStreet,
    href: go('studio'),
    cta: 'Entrer dans les studios',
  },
  {
    kicker: 'Métier · Diffusion',
    title: 'Les community managers',
    copy: 'Ils animent vos réseaux, répondent à votre communauté et font vivre la marque au quotidien.',
    photo: photos.phonePink,
    href: go('agency', 'services/social-media'),
    cta: 'Confier mes réseaux',
  },
  {
    kicker: 'Métier · Transmission',
    title: 'Les formateurs',
    copy: 'Praticiens avant tout, ils transmettent des méthodes que vos équipes utilisent dès le lendemain.',
    photo: photos.portraitPro,
    href: go('academy', 'instructors'),
    cta: 'Découvrir les intervenants',
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

const needs = [
  'Stratégie de marque',
  'Identité visuelle',
  'Réseaux sociaux',
  'Publicité digitale',
  'Site web',
  'Vidéo / photo',
  'Podcast',
  'Formation d’équipe',
  'Outil de gestion',
];

export default function Home() {
  const [lead, ...more] = articles;
  return (
    <main id="main">
      {/* 01 · Héros */}
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
            Stratégie, réseaux sociaux, publicité, production, web et formation
            : Smartsell imagine des campagnes qui se voient, se partagent et
            font grandir votre activité.
          </p>
          <div className="im-actions">
            <CtaLink href={contact}>Lancer mon projet</CtaLink>
            <CtaLink href="#parcours" tone="ghost">
              Trouver mon parcours
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
            Stratèges, créatifs, producteurs et formateurs réunis.
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

      {/* Accès directs aux cinq univers */}
      <div className="hm-quick">
        <nav className="hm-wrap" aria-label="Accès directs aux univers">
          {quick.map(([id, title, sub]) => {
            const v = verticals.find((x) => x.id === id)!;
            return (
              <a key={id} href={go(id)}>
                <small>
                  {v.number} · {v.name}
                </small>
                <strong>{title}</strong>
                <span>{sub} ↗</span>
              </a>
            );
          })}
        </nav>
      </div>

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
          'Outils digitaux',
        ]}
      />

      {/* 02 · Parcours par profil */}
      <section
        className="im-section im-light"
        id="parcours"
        aria-labelledby="journey-title"
      >
        <div className="im-head">
          <div>
            <span className="sg-mono">01 · Votre parcours</span>
            <h2 id="journey-title">
              Dites-nous qui vous êtes.{' '}
              <Highlight>On trace la route.</Highlight>
            </h2>
          </div>
          <p>
            Choisissez votre profil : nous vous proposons les trois étapes les
            plus utiles, à travers nos cinq univers.
          </p>
        </div>
        <div className="hm-wrap">
          <JourneyPicker journeys={journeys} />
        </div>
      </section>

      {/* 03 · Zoom : une seule équipe */}
      <ZoomReveal
        photo={photos.teamLaptop}
        eyebrow="02 · Une seule équipe"
        title={
          <>
            Penser, créer, diffuser, mesurer.{' '}
            <Highlight>Sous le même toit.</Highlight>
          </>
        }
        copy="Fini les prestataires qui ne se parlent pas. Chez Smartsell, la stratégie, la création, la production et la formation avancent ensemble, au service de vos résultats."
        cta={<CtaLink href="#services">Voir nos expertises</CtaLink>}
      />

      {/* 04 · Services en défilement horizontal */}
      <div id="services">
        <HorizontalScroll
          eyebrow="03 · Ce que nous faisons"
          title="Tout ce qu’il faut pour que votre marque soit vue, choisie et recommandée."
          items={services}
        />
      </div>

      {/* 05 · Les cinq sites */}
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

      {/* 06 · Produit phare */}
      <section className="im-section im-light" aria-labelledby="spot-title">
        <div className="hm-wrap">
          <div className="hm-spotlight">
            <PixelMosaic tone="labs" />
            <div className="hm-spotlight-copy">
              <span className="hm-badge">
                <i aria-hidden="true" /> Produit disponible · Smartsell Labs
              </span>
              <h2 id="spot-title">
                Smartsell <em>Management</em>, votre activité sur un seul écran.
              </h2>
              <p>
                Un produit conçu par Smartsell Labs pour réunir le travail de
                votre entreprise : clients, projets, planning et finances.
              </p>
              <div className="im-actions">
                <CtaLink href={managementUrl}>Découvrir Management</CtaLink>
                <CtaLink href={go('labs', 'products')} tone="ghost">
                  Tous nos produits
                </CtaLink>
              </div>
            </div>
            <div className="hm-features">
              {[
                ['01', 'Clients', 'Un historique clair de chaque relation.'],
                [
                  '02',
                  'Projets',
                  'Les étapes et les responsables au même endroit.',
                ],
                [
                  '03',
                  'Planning',
                  'Les échéances de l’équipe, visibles d’un coup d’œil.',
                ],
                ['04', 'Finances', 'Devis, factures et suivi réunis.'],
              ].map(([n, t, c]) => (
                <div key={t}>
                  <span className="sg-mono">{n}</span>
                  <strong>{t}</strong>
                  <p>{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 07 · Explorations créatives (Agency) */}
      <section className="im-section im-dark" aria-labelledby="work-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">05 · Smartsell Agency</span>
            <h2 id="work-title">
              Des idées qui prennent <Highlight>forme.</Highlight>
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              Six explorations créatives pour montrer notre manière de faire :
              du contexte à la direction, jusqu’aux livrables.
            </p>
            <CtaLink href={go('agency', 'work')}>Tout le portfolio</CtaLink>
          </div>
        </div>
        <Rail label="Explorations créatives Agency" tone="dark">
          {cases.map((c, i) => (
            <a
              key={c.slug}
              className="hm-case"
              href={go('agency', `work/${c.slug}`)}
            >
              <Img photo={casePhotos[i % casePhotos.length]} width={700} />
              <span className="hm-case-mark" aria-hidden="true">
                {c.mark}
              </span>
              <div className="hm-case-body">
                <span className="sg-mono">
                  {c.category} · Exploration créative
                </span>
                <h3>{c.title}</h3>
                <p>{c.tagline}</p>
                <ul>
                  {c.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </Rail>
      </section>

      {/* 08 · Academy */}
      <section className="im-section im-light" aria-labelledby="academy-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">06 · Smartsell Academy</span>
            <h2 id="academy-title">
              Apprendre en faisant. <Highlight>Pour de vrai.</Highlight>
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              Huit modules pratiques, un projet concret par module et trois
              leçons à essayer dès maintenant.
            </p>
            <CtaLink href={go('academy', 'courses')} tone="dark">
              Tous les modules
            </CtaLink>
          </div>
        </div>
        <Rail label="Modules Academy">
          {courses.map((c) => (
            <a
              key={c.slug}
              className="hm-course"
              href={go('academy', `courses/${c.slug}`)}
            >
              <div className="hm-course-media">
                <Img
                  photo={coursePhotos[c.slug] ?? photos.learner}
                  width={600}
                />
                <span>{c.category}</span>
              </div>
              <div className="hm-course-body">
                <span className="sg-mono">{c.level}</span>
                <h3>{c.title}</h3>
                <p>{c.goal}</p>
                <div className="hm-course-meta">
                  <span>Format envisagé : {c.hours} h</span>
                  <b>Essayer ↗</b>
                </div>
              </div>
            </a>
          ))}
        </Rail>
      </section>

      {/* 09 · Studios */}
      <section className="im-section im-dark" aria-labelledby="studio-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">07 · Smartsell Studios</span>
            <h2 id="studio-title">
              Trois plateaux. <Highlight>Mille histoires.</Highlight>
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              Choisissez un espace, un pack et un créneau : simulez votre
              session en quelques clics.
            </p>
            <CtaLink href={go('studio', 'booking')}>
              Simuler une réservation
            </CtaLink>
          </div>
        </div>
        <div className="hm-wrap">
          <ExpandPanels panels={spacesPanels} />
          <nav className="hm-packs" aria-label="Packs Studios">
            {packs.map((p) => (
              <a key={p.slug} href={go('studio', `packs/${p.slug}`)}>
                <small>{p.duration} h · pack</small>
                <strong>{p.title}</strong>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 10 · Media */}
      <section className="im-section im-light" aria-labelledby="media-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">08 · Smartsell Media</span>
            <h2 id="media-title">
              Les idées qui font <Highlight>bouger</Highlight> l’Afrique.
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              Guides, analyses et opinions sur la tech, le business et la
              culture créative.
            </p>
            <CtaLink href={go('media', 'newsletter')} tone="dark">
              Recevoir la newsletter
            </CtaLink>
          </div>
        </div>
        <div className="hm-wrap hm-mag">
          <a className="hm-mag-lead" href={go('media', `article/${lead.slug}`)}>
            <Img photo={articlePhotos[0]} width={1100} />
            <div>
              <span className="hm-tag">{lead.category} · À la une</span>
              <h3>{lead.title}</h3>
              <p>{lead.summary}</p>
            </div>
          </a>
          <div className="hm-mag-list">
            {more.slice(0, 4).map((a, i) => (
              <a
                key={a.slug}
                className="hm-mag-item"
                href={go('media', `article/${a.slug}`)}
              >
                <figure>
                  <Img photo={articlePhotos[i + 1]} width={260} />
                </figure>
                <div>
                  <span className="sg-mono">
                    {a.category} · {a.minutes} min
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11 · Les métiers */}
      <section className="im-section im-dark" aria-labelledby="people-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">09 · Les femmes et les hommes</span>
            <h2 id="people-title">
              Derrière chaque campagne, <Highlight>des talents.</Highlight>
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              Cinq métiers qui travaillent ensemble sur votre projet. Survolez
              pour les rencontrer.
            </p>
            <CtaLink href={go('agency', 'team')}>
              Découvrir le collectif
            </CtaLink>
          </div>
        </div>
        <div className="hm-wrap">
          <ExpandPanels panels={people} />
        </div>
      </section>

      {/* 12 · Galerie en parallaxe */}
      <ParallaxGallery
        columns={[
          [photos.portraitSmile, photos.photographer, photos.portraitPro],
          [photos.portraitGold, photos.podcastLaptop, photos.creator],
          [photos.portraitTurban, photos.learner, photos.portraitWall],
          [photos.portraitPrint, photos.cameraClose, photos.portraitStand],
        ]}
      >
        <span className="sg-mono">10 · Pour celles et ceux qui avancent</span>
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

      {/* 13 · Méthode */}
      <section
        className="im-section im-light"
        id="methode"
        aria-labelledby="method-title"
      >
        <div className="im-head">
          <div>
            <span className="sg-mono">11 · Notre méthode</span>
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

      {/* 14 · Conviction + chiffres réels du contenu */}
      <section className="sg-manifesto" id="manifeste">
        <div className="container">
          <span className="sg-mono">12 · Notre conviction</span>
          <ScrollLitText text="On ne fait pas de la communication pour faire joli. On construit des marques qui se reconnaissent au premier regard, des messages qui touchent juste et des campagnes dont on mesure l’effet. Votre ambition mérite mieux qu’un post de temps en temps." />
          <div className="sg-figures" data-reveal style={{ marginTop: 64 }}>
            {(
              [
                [5, 'Univers Smartsell'],
                [agencyServices.length, 'Expertises Agency'],
                [courses.length, 'Modules Academy'],
                [articles.length, 'Articles Media'],
                [packs.length, 'Packs Studios'],
              ] as [number, string][]
            ).map(([n, l]) => (
              <div key={l}>
                <strong>
                  <CountUp value={n} />
                </strong>
                <span className="sg-mono">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15 · Composer son brief */}
      <section
        className="im-section im-dark"
        id="brief"
        aria-labelledby="brief-title"
      >
        <div className="im-head">
          <div>
            <span className="sg-mono">13 · Votre brief en 30 secondes</span>
            <h2 id="brief-title">
              Composez votre projet.{' '}
              <Highlight>On s’occupe du reste.</Highlight>
            </h2>
          </div>
          <p>
            Sélectionnez vos besoins, votre objectif et votre calendrier : votre
            brief vous suit jusqu’au formulaire de contact.
          </p>
        </div>
        <div className="hm-wrap">
          <BriefBuilder needs={needs} contactHref={contact} />
        </div>
      </section>

      <Marquee
        tone="dark"
        reverse
        items={[
          'Faites-vous remarquer',
          'Faites-vous choisir',
          'Faites-vous recommander',
        ]}
      />

      {/* 16 · Plan express */}
      <section className="im-section im-dark" aria-labelledby="map-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">14 · Plan express</span>
            <h2 id="map-title">Tout Smartsell, en un coup d’œil.</h2>
          </div>
          <p>Chaque page de chaque univers, à un clic.</p>
        </div>
        <nav className="hm-wrap hm-map" aria-label="Plan des sites Smartsell">
          {verticals.map((v) => (
            <div className="hm-map-col" key={v.id}>
              <a href={go(v.id)}>
                <small>
                  {v.number} · {v.verb}
                </small>
                <strong>{v.name}</strong>
              </a>
              {siteMenus[v.id].map((m) => (
                <a key={m.path} href={go(v.id, m.path)}>
                  {m.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          ))}
        </nav>
      </section>

      {/* 17 · Clôture */}
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
              <CtaLink href="#brief" tone="ghost">
                Composer mon brief
              </CtaLink>
            </div>
          </div>
          <p className="im-credits">
            Photographies d’illustration : Unsplash ({photoCredits.join(', ')}).
            Les explorations Agency sont des concepts avec des marques fictives.
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
              'Agence de communication et de marketing digital à Conakry : stratégie, réseaux sociaux, publicité, production, web, formation et outils.',
          }).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
