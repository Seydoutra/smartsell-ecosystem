import { Icon } from '@smartsell/ui/icons';
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
  ExpandPanels,
  JourneyPicker,
  type Journey,
  type Panel,
} from '@smartsell/ui/home';
import {
  photos,
  photoUrl,
  photoCredits,
  videos,
  type Photo,
} from '@smartsell/content/photos';
import {
  agencyServices,
  articles,
  courses,
  packs,
  siteMenus,
} from '@smartsell/content/sites';
import { verticals } from '@smartsell/content';
import {
  brands,
  clients,
  films,
  products as solutions,
  shoots,
  websites,
} from '@smartsell/content/portfolio';
import { DigitalField, RotatingWords } from '@smartsell/ui/kinetic';
import {
  ClientMarquee,
  ClipTile,
  CourseCarousel,
  PortfolioTabs,
  SlideRail,
  SmartBrief,
  SolutionsShowcase,
} from '@smartsell/ui/showcase';
import {
  withBasePath,
  routingConfig,
  urlFor,
  managementUrl,
  locale,
  t,
} from '@smartsell/routing';
import { absoluteUrl } from '@smartsell/seo';
import type { VerticalId } from '@smartsell/types';
export const metadata: Metadata = {
  title: {
    absolute: t(
      'Smartsell — Agence de communication & marketing digital à Conakry',
      'Smartsell — Communication & digital marketing agency in Conakry',
    ),
  },
  description: t(
    'Stratégie de marque, réseaux sociaux, publicité digitale, production photo et vidéo, sites web, formation et outils : Smartsell fait parler votre marque.',
    'Brand strategy, social media, digital advertising, photo and video production, websites, training and tools: Smartsell gets your brand talked about.',
  ),
  alternates: { canonical: withBasePath(`/${locale}/`) },
};
const go = (vertical: VerticalId, path = '') =>
  urlFor(vertical, locale, path, routingConfig);
const contact = go('agency', 'contact');

const quick: [VerticalId, string, string][] = [
  [
    'agency',
    t('Être vu & choisi', 'Get seen & chosen'),
    t('Stratégie, création, campagnes', 'Strategy, creative, campaigns'),
  ],
  [
    'academy',
    t('Monter en compétences', 'Build your skills'),
    t('Formations pratiques', 'Hands-on training'),
  ],
  [
    'media',
    t('Comprendre ce qui vient', 'Understand what’s next'),
    'Tech, business, culture',
  ],
  [
    'studio',
    t('Produire un contenu', 'Produce content'),
    t('Photo, vidéo, podcast', 'Photo, video, podcast'),
  ],
  [
    'labs',
    t('Piloter son activité', 'Run your business'),
    t('Produits numériques', 'Digital products'),
  ],
];

const journeys: Journey[] = [
  {
    id: 'entreprise',
    label: t('une entreprise', 'a company'),
    headline: t(
      'Structurer votre marque et faire grandir vos équipes.',
      'Structure your brand and grow your teams.',
    ),
    photo: photos.meeting,
    steps: [
      {
        site: 'Agency',
        title: t('Clarifier votre positionnement', 'Clarify your positioning'),
        copy: t(
          'Un atelier stratégique pour aligner marque, publics et messages.',
          'A strategy workshop to align brand, audiences and messages.',
        ),
        href: go('agency', 'services/strategie'),
      },
      {
        site: 'Academy',
        title: t('Former votre équipe marketing', 'Train your marketing team'),
        copy: t(
          'Des parcours sur mesure, pensés pour vos outils et vos objectifs.',
          'Tailored learning paths designed around your tools and goals.',
        ),
        href: go('academy', 'corporate'),
      },
      {
        site: 'Labs',
        title: t('Piloter clients et ventes', 'Manage clients and sales'),
        copy: t(
          'Smartsell Management réunit clients, projets, planning et finances.',
          'Smartsell Management brings clients, projects, planning and finances together.',
        ),
        href: managementUrl,
      },
    ],
    cta: { href: contact, label: t('Demander un devis', 'Get a quote') },
  },
  {
    id: 'entrepreneur',
    label: t('un entrepreneur', 'an entrepreneur'),
    headline: t(
      'Lancer une marque qu’on remarque dès le premier jour.',
      'Launch a brand people notice from day one.',
    ),
    photo: photos.founder,
    steps: [
      {
        site: 'Agency',
        title: t('Créer votre identité', 'Create your identity'),
        copy: t(
          'Nom, logo, couleurs et ton : une marque cohérente partout.',
          'Name, logo, colours and tone: a brand that is consistent everywhere.',
        ),
        href: go('agency', 'services/branding'),
      },
      {
        site: 'Studios',
        title: t(
          'Produire vos premiers contenus',
          'Produce your first content',
        ),
        copy: t(
          'Une Creator Session pour tourner plusieurs formats courts d’un coup.',
          'A Creator Session to shoot several short formats in one go.',
        ),
        href: go('studio', 'packs/shooting-mode'),
      },
      {
        site: 'Agency',
        title: t(
          'Lancer votre première campagne',
          'Launch your first campaign',
        ),
        copy: t(
          'Meta, Google ou TikTok : un budget maîtrisé, des résultats suivis.',
          'Meta, Google or TikTok: a controlled budget, tracked results.',
        ),
        href: go('agency', 'services/performance'),
      },
    ],
    cta: { href: contact, label: t('Lancer mon projet', 'Start my project') },
  },
  {
    id: 'talent',
    label: t('un talent', 'a talent'),
    headline: t(
      'Apprendre un métier du digital en pratiquant.',
      'Learn a digital profession by practising it.',
    ),
    photo: photos.learner,
    steps: [
      {
        site: 'Academy',
        title: t('Choisir votre module', 'Choose your course'),
        copy: t(
          'Marketing, design, web, IA, data ou vidéo : huit terrains de pratique.',
          'Marketing, design, web, AI, data or video: eight fields to practise.',
        ),
        href: go('academy', 'courses'),
      },
      {
        site: 'Academy',
        title: t('Essayer une leçon', 'Try a lesson'),
        copy: t(
          'Trois leçons d’aperçu par module, avec exercice et quiz.',
          'Three preview lessons per course, with exercises and quizzes.',
        ),
        href: go('academy', 'courses/communication-digitale'),
      },
      {
        site: 'Agency',
        title: t('Rejoindre le collectif', 'Join the collective'),
        copy: t(
          'Créatifs, stratèges, développeurs : présentez votre travail.',
          'Creatives, strategists, developers: show us your work.',
        ),
        href: go('agency', 'careers'),
      },
    ],
    cta: {
      href: go('academy', 'courses'),
      label: t('Voir les modules', 'See the courses'),
    },
  },
  {
    id: 'createur',
    label: t('un créateur', 'a creator'),
    headline: t(
      'Donner une image et une voix à vos idées.',
      'Give your ideas an image and a voice.',
    ),
    photo: photos.podcastWhite,
    steps: [
      {
        site: 'Studios',
        title: t('Réserver un plateau', 'Book a set'),
        copy: t(
          'Photo, vidéo ou podcast : choisissez l’espace qui vous ressemble.',
          'Photo, video or podcast: choose the space that suits you.',
        ),
        href: go('studio', 'spaces'),
      },
      {
        site: 'Studios',
        title: t('Lancer votre podcast', 'Launch your podcast'),
        copy: t(
          'Conducteur, installation audio et enregistrement accompagné.',
          'Running order, audio setup and supported recording.',
        ),
        href: go('studio', 'packs/podcast-montage'),
      },
      {
        site: 'Academy',
        title: t('Maîtriser la vidéo', 'Master video'),
        copy: t(
          'Tournage, montage et formats courts pour les réseaux.',
          'Shooting, editing and short formats for social media.',
        ),
        href: go('academy', 'courses/montage-video'),
      },
    ],
    cta: {
      href: go('studio', 'booking'),
      label: t('Préparer ma session', 'Prepare my session'),
    },
  },
  {
    id: 'institution',
    label: t('une institution', 'an institution'),
    headline: t(
      'Informer, mobiliser et rendre votre action visible.',
      'Inform, mobilise and make your work visible.',
    ),
    photo: photos.partners,
    steps: [
      {
        site: 'Agency',
        title: t(
          'Construire une campagne d’information',
          'Build an awareness campaign',
        ),
        copy: t(
          'Messages clairs, contenus adaptés, diffusion multicanale.',
          'Clear messages, adapted content, multichannel distribution.',
        ),
        href: go('agency', 'services/contenus'),
      },
      {
        site: 'Studios',
        title: t('Filmer une prise de parole', 'Film a statement'),
        copy: t(
          'Une interview soignée, de la préparation au tournage.',
          'A polished interview, from preparation to shoot.',
        ),
        href: go('studio', 'packs/podcast-reels'),
      },
      {
        site: 'Media',
        title: t(
          'Suivre les idées qui comptent',
          'Follow the ideas that matter',
        ),
        copy: t(
          'Analyses et guides sur la tech, le business et la création.',
          'Analyses and guides on tech, business and creativity.',
        ),
        href: go('media', 'latest'),
      },
    ],
    cta: {
      href: contact,
      label: t('Parlons de votre mission', 'Let’s talk about your mission'),
    },
  },
];

const services: HorizontalItem[] = [
  {
    label: t('01 · Stratégie', '01 · Strategy'),
    title: t('Stratégie & identité de marque', 'Brand strategy & identity'),
    copy: t(
      'Positionnement, plateforme de marque, logo et univers visuel : des fondations solides pour être reconnu au premier regard.',
      'Positioning, brand platform, logo and visual universe: solid foundations to be recognised at first glance.',
    ),
    photo: photos.meeting,
    href: go('agency', 'services/strategie'),
    cta: t('Construire ma marque', 'Build my brand'),
  },
  {
    label: '02 · Social media',
    title: t('Réseaux sociaux & communauté', 'Social media & community'),
    copy: t(
      'Ligne éditoriale, posts, Reels et animation de communauté, au rythme de votre audience et de vos temps forts.',
      'Editorial line, posts, Reels and community management, at the pace of your audience and your key moments.',
    ),
    photo: photos.phonePink,
    video: videos.phone,
    href: go('agency', 'services/social-media'),
    cta: t('Booster mes réseaux', 'Boost my socials'),
  },
  {
    label: t('03 · Publicité', '03 · Advertising'),
    title: t(
      'Publicité digitale qui performe',
      'Digital advertising that performs',
    ),
    copy: t(
      'Campagnes Meta, Google et TikTok ciblées, suivies et optimisées pour que chaque franc investi travaille pour vous.',
      'Targeted Meta, Google and TikTok campaigns, tracked and optimised so every franc invested works for you.',
    ),
    photo: photos.phoneYellow,
    href: go('agency', 'services/performance'),
    cta: t('Lancer une campagne', 'Launch a campaign'),
  },
  {
    label: '04 · Production',
    title: t('Photo, vidéo & podcast', 'Photo, video & podcast'),
    copy: t(
      'Spots, portraits, captations et podcasts : nos studios donnent une image et une voix à vos histoires.',
      'Ads, portraits, event coverage and podcasts: our studios give your stories an image and a voice.',
    ),
    photo: photos.videoField,
    video: videos.camera,
    href: go('studio', 'booking'),
    cta: t('Préparer un tournage', 'Prepare a shoot'),
  },
  {
    label: '05 · Web',
    title: t('Sites web & e-commerce', 'Websites & e-commerce'),
    copy: t(
      'Des sites rapides, élégants et pensés pour convertir, de la vitrine à la boutique en ligne.',
      'Fast, elegant websites built to convert, from showcase sites to online shops.',
    ),
    photo: photos.phoneDesk,
    href: go('agency', 'services/web-development'),
    cta: t('Créer mon site', 'Build my website'),
  },
  {
    label: t('06 · Formation', '06 · Training'),
    title: t('Former vos équipes', 'Train your teams'),
    copy: t(
      'Marketing digital, création de contenu, IA : vos équipes apprennent à faire grandir la marque en interne.',
      'Digital marketing, content creation, AI: your teams learn to grow the brand in-house.',
    ),
    photo: photos.learnerFocus,
    href: go('academy', 'corporate'),
    cta: t('Former mon équipe', 'Train my team'),
  },
  {
    label: t('07 · Outils', '07 · Tools'),
    title: t('Outils & automatisation', 'Tools & automation'),
    copy: t(
      'CRM, tableaux de bord et automatisations : Smartsell Labs construit les outils qui vous font gagner du temps.',
      'CRM, dashboards and automations: Smartsell Labs builds the tools that save you time.',
    ),
    photo: photos.founder,
    href: go('labs', 'products'),
    cta: t('Découvrir nos outils', 'Discover our tools'),
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
  agency: t(
    'Stratégie, création et campagnes digitales pour les marques qui veulent compter sur leur marché.',
    'Strategy, creative and digital campaigns for brands that want to count in their market.',
  ),
  academy: t(
    'Des formations pratiques en marketing digital, design, web et IA, pour les talents comme pour les équipes.',
    'Hands-on training in digital marketing, design, web and AI, for talents and teams alike.',
  ),
  media: t(
    'Le média qui décrypte la tech, le business et la culture créative, depuis la Guinée et l’Afrique.',
    'The media decoding tech, business and creative culture, from Guinea and Africa.',
  ),
  studio: t(
    'Plateaux photo, vidéo et podcast pour produire des contenus qui arrêtent le défilement.',
    'Photo, video and podcast sets to produce content that stops the scroll.',
  ),
  labs: t(
    'Des produits numériques, comme Smartsell Management, pour piloter clients, projets et ventes.',
    'Digital products, like Smartsell Management, to manage clients, projects and sales.',
  ),
};
const slideSecondary: Record<VerticalId, { href: string; label: string }> = {
  agency: { href: contact, label: t('Demander un devis', 'Get a quote') },
  academy: {
    href: go('academy', 'courses'),
    label: t('Voir les modules', 'See the courses'),
  },
  media: {
    href: go('media', 'latest'),
    label: t('Lire les articles', 'Read the articles'),
  },
  studio: {
    href: go('studio', 'booking'),
    label: t('Réserver une séance', 'Book a session'),
  },
  labs: {
    href: managementUrl,
    label: t('Découvrir Management', 'Discover Management'),
  },
};
const slides: Slide[] = verticals.map((v) => ({
  id: v.id,
  kicker: `${v.number} · Smartsell ${v.name}`,
  name: v.name,
  pitch: slidePitch[v.id],
  photo: slidePhotos[v.id],
  primary: { href: go(v.id), label: `${t('Entrer dans', 'Enter')} ${v.name}` },
  secondary: slideSecondary[v.id],
  links: siteMenus[v.id]
    .slice(0, 4)
    .map((m) => ({ href: go(v.id, m.path), label: m.label })),
}));

const spacesPanels: Panel[] = [
  {
    kicker: t('Studios · Plateau photo', 'Studios · Photo set'),
    title: t(
      'Portraits, produits, séries de marque.',
      'Portraits, products, brand series.',
    ),
    copy: t(
      'Fonds interchangeables, zone lumière et table de prise de vue pour des images qui vous ressemblent.',
      'Interchangeable backdrops, a lighting area and a shooting table for images that look like you.',
    ),
    photo: photos.cameraClose,
    href: go('studio', 'spaces/photo'),
    cta: t('Découvrir le plateau photo', 'Discover the photo set'),
  },
  {
    kicker: t('Studios · Plateau vidéo', 'Studios · Video set'),
    title: t(
      'Interviews, formats de marque, créations.',
      'Interviews, brand formats, creations.',
    ),
    copy: t(
      'Un cadre modulable avec éclairage et retour image pour des prises de parole soignées.',
      'A modular frame with lighting and monitoring for polished talks.',
    ),
    photo: photos.videoField,
    video: videos.camera,
    href: go('studio', 'spaces/video'),
    cta: t('Découvrir le plateau vidéo', 'Discover the video set'),
  },
  {
    kicker: t('Studios · Espace podcast', 'Studios · Podcast room'),
    title: t(
      'Conversations enregistrées, audio et vidéo.',
      'Recorded conversations, audio and video.',
    ),
    copy: t(
      'Table de conversation, micros et retour casque : votre émission prend forme.',
      'Conversation table, microphones and headphone monitoring: your show takes shape.',
    ),
    photo: photos.podcastNeon,
    video: videos.podcast,
    href: go('studio', 'spaces/podcast'),
    cta: t('Découvrir l’espace podcast', 'Discover the podcast room'),
  },
];

const people: Panel[] = [
  {
    kicker: t('Métier · Stratégie', 'Craft · Strategy'),
    title: t('Les stratèges', 'The strategists'),
    copy: t(
      'Ils écoutent, analysent votre marché et transforment une ambition en plan d’action clair.',
      'They listen, analyse your market and turn an ambition into a clear action plan.',
    ),
    photo: photos.partners,
    href: go('agency', 'services/strategie'),
    cta: t('Travailler avec eux', 'Work with them'),
  },
  {
    kicker: t('Métier · Création', 'Craft · Creative'),
    title: t('Les créatifs', 'The creatives'),
    copy: t(
      'Directeurs artistiques, designers et rédacteurs : ils donnent une forme et une voix à votre marque.',
      'Art directors, designers and copywriters: they give your brand a shape and a voice.',
    ),
    photo: photos.portraitWall,
    href: go('agency', 'work'),
    cta: t('Voir leurs explorations', 'See their explorations'),
  },
  {
    kicker: t('Métier · Production', 'Craft · Production'),
    title: t('Les producteurs', 'The producers'),
    copy: t(
      'Photographes, vidéastes et ingénieurs du son font naître les images et les voix de vos histoires.',
      'Photographers, videographers and sound engineers bring the images and voices of your stories to life.',
    ),
    photo: photos.cameraStreet,
    href: go('studio'),
    cta: t('Entrer dans les studios', 'Enter the studios'),
  },
  {
    kicker: t('Métier · Diffusion', 'Craft · Distribution'),
    title: t('Les community managers', 'The community managers'),
    copy: t(
      'Ils animent vos réseaux, répondent à votre communauté et font vivre la marque au quotidien.',
      'They run your social media, answer your community and keep the brand alive every day.',
    ),
    photo: photos.phonePink,
    href: go('agency', 'services/social-media'),
    cta: t('Confier mes réseaux', 'Hand over my socials'),
  },
  {
    kicker: t('Métier · Transmission', 'Craft · Teaching'),
    title: t('Les formateurs', 'The trainers'),
    copy: t(
      'Praticiens avant tout, ils transmettent des méthodes que vos équipes utilisent dès le lendemain.',
      'Practitioners first, they teach methods your teams use the very next day.',
    ),
    photo: photos.portraitPro,
    href: go('academy', 'corporate'),
    cta: t('Former mon équipe', 'Train my team'),
  },
];

const method = [
  {
    title: t('On écoute.', 'We listen.'),
    copy: t(
      'Votre marché, vos clients, vos objectifs. Un atelier, des questions franches, et une vision claire de ce qui doit changer.',
      'Your market, your customers, your goals. A workshop, honest questions and a clear view of what needs to change.',
    ),
    photo: photos.partners,
  },
  {
    title: t('On imagine.', 'We imagine.'),
    copy: t(
      'Concept créatif, messages clés, plan de diffusion : une idée forte, pensée pour se décliner partout où votre public se trouve.',
      'Creative concept, key messages, media plan: one strong idea, designed to work wherever your audience is.',
    ),
    photo: photos.creator,
  },
  {
    title: t('On produit.', 'We produce.'),
    copy: t(
      'Visuels, vidéos, textes, sites : nos créatifs et nos studios passent à l’action, avec le souci du détail.',
      'Visuals, videos, copy, websites: our creatives and studios get to work, with an eye for detail.',
    ),
    photo: photos.videoGimbal,
  },
  {
    title: t('On diffuse.', 'We distribute.'),
    copy: t(
      'Réseaux sociaux, publicité, influence : le bon message, au bon endroit, au bon moment.',
      'Social media, advertising, influence: the right message, in the right place, at the right time.',
    ),
    photo: photos.phoneShop,
  },
  {
    title: t('On mesure.', 'We measure.'),
    copy: t(
      'Tableaux de bord et rapports clairs. Ce qui marche est amplifié, le reste est ajusté.',
      'Dashboards and clear reports. What works gets amplified, the rest gets adjusted.',
    ),
    photo: photos.portraitPro,
  },
];

export default function Home() {
  return (
    <main id="main">
      {/* 01 · Héros */}
      <section className="im-hero" aria-labelledby="hero-title">
        <DigitalField />
        <div className="im-hero-copy">
          <p className="sg-mono">
            <Icon name="stars" />{' '}
            {t(
              'Agence de communication & marketing digital · Conakry',
              'Communication & digital marketing agency · Conakry',
            )}
          </p>
          <h1 id="hero-title">
            <span>{t('Votre marque', 'Your brand')}</span>
            <span>{t('mérite d’être', 'deserves to be')}</span>
            <span>
              <RotatingWords
                words={[
                  t('vue.', 'seen.'),
                  t('choisie.', 'chosen.'),
                  t('retenue.', 'remembered.'),
                  t('partagée.', 'shared.'),
                  t('recommandée.', 'recommended.'),
                ]}
              />
            </span>
          </h1>
          <p className="im-hero-lead">
            {t(
              'Stratégie, réseaux sociaux, publicité, production, web et formation : Smartsell imagine des campagnes qui se voient, se partagent et font grandir votre activité.',
              'Strategy, social media, advertising, production, web and training: Smartsell creates campaigns that get seen, get shared and grow your business.',
            )}
          </p>
          <div className="im-actions">
            <CtaLink href={contact}>
              {t('Lancer mon projet', 'Start my project')}
            </CtaLink>
            <CtaLink href="#parcours" tone="ghost">
              {t('Trouver mon parcours', 'Find my path')}
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
            {t(
              'Stratèges, créatifs, producteurs et formateurs réunis.',
              'Strategists, creatives, producers and trainers, together.',
            )}
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
              photos.socialNight,
              photos.portraitYellow,
              photos.learnerFocus,
              photos.podcastNeon,
            ],
          ]}
        />
      </section>

      {/* Accès directs aux cinq univers */}
      <div className="hm-quick">
        <nav
          className="hm-wrap"
          aria-label={t(
            'Accès directs aux univers',
            'Quick access to the universes',
          )}
        >
          {quick.map(([id, title, sub]) => {
            const v = verticals.find((x) => x.id === id)!;
            return (
              <a key={id} href={go(id)}>
                <small>
                  {v.number} · {v.name}
                </small>
                <strong>{title}</strong>
                <span>
                  {sub} <Icon name="arrowUpRight" />
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <Marquee
        tone="yellow"
        items={[
          t('Stratégie de marque', 'Brand strategy'),
          t('Réseaux sociaux', 'Social media'),
          t('Publicité digitale', 'Digital advertising'),
          t('Production vidéo', 'Video production'),
          t('Identité visuelle', 'Visual identity'),
          t('Sites web', 'Websites'),
          'Podcasts',
          t('Formation', 'Training'),
          t('Outils digitaux', 'Digital tools'),
        ]}
      />

      <ClientMarquee
        clients={clients}
        title={
          <>
            {t('Des marques et institutions', 'Brands and institutions')}{' '}
            <Highlight>
              {t('qui avancent avec nous.', 'moving forward with us.')}
            </Highlight>
          </>
        }
      />

      {/* 02 · Parcours par profil */}
      <section
        className="im-section im-light"
        id="parcours"
        aria-labelledby="journey-title"
      >
        <div className="im-head">
          <div>
            <span className="sg-mono">
              {t('01 · Votre parcours', '01 · Your path')}
            </span>
            <h2 id="journey-title">
              {t('Dites-nous qui vous êtes.', 'Tell us who you are.')}{' '}
              <Highlight>
                {t('On trace la route.', 'We’ll map the way.')}
              </Highlight>
            </h2>
          </div>
          <p>
            {t(
              'Choisissez votre profil : nous vous proposons les trois étapes les plus utiles, à travers nos cinq univers.',
              'Choose your profile: we suggest the three most useful steps across our five universes.',
            )}
          </p>
        </div>
        <div className="hm-wrap">
          <JourneyPicker journeys={journeys} />
        </div>
      </section>

      {/* 03 · Zoom : une seule équipe */}
      <ZoomReveal
        photo={photos.teamLaptop}
        video={videos.team}
        eyebrow={t('02 · Une seule équipe', '02 · One team')}
        title={
          <>
            {t(
              'Penser, créer, diffuser, mesurer.',
              'Think, create, distribute, measure.',
            )}{' '}
            <Highlight>{t('Sous le même toit.', 'Under one roof.')}</Highlight>
          </>
        }
        copy={t(
          'Fini les prestataires qui ne se parlent pas. Chez Smartsell, la stratégie, la création, la production et la formation avancent ensemble, au service de vos résultats.',
          'No more suppliers who don’t talk to each other. At Smartsell, strategy, creative, production and training move forward together, in service of your results.',
        )}
        cta={
          <CtaLink href="#services">
            {t('Voir nos expertises', 'See our services')}
          </CtaLink>
        }
      />

      {/* 04 · Services en défilement horizontal */}
      <div id="services">
        <HorizontalScroll
          eyebrow={t('03 · Ce que nous faisons', '03 · What we do')}
          title={t(
            'Tout ce qu’il faut pour que votre marque soit vue, choisie et recommandée.',
            'Everything your brand needs to be seen, chosen and recommended.',
          )}
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
            <span className="sg-mono">
              {t('04 · L’écosystème Smartsell', '04 · The Smartsell ecosystem')}
            </span>
            <h2 id="eco-title">
              {t('Une maison mère.', 'One parent house.')}{' '}
              <Highlight>
                {t('Cinq expertises', 'Five areas of expertise')}
              </Highlight>{' '}
              {t('à part entière.', 'in their own right.')}
            </h2>
          </div>
          <p>
            {t(
              'Chaque univers a son site, son équipe et son savoir-faire. Ensemble, ils couvrent toute la vie de votre marque, de l’idée aux résultats.',
              'Each universe has its own site, team and know-how. Together they cover your brand’s whole life, from idea to results.',
            )}
          </p>
        </div>
        <Carousel
          slides={slides}
          label={t('Les cinq sites Smartsell', 'The five Smartsell sites')}
        />
      </section>

      {/* 06 · Nos solutions */}
      <section
        className="sc-section sc-deep"
        id="solutions"
        aria-labelledby="sol-title"
      >
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="sg-mono">
                {t(
                  '05 · Nos solutions digitales',
                  '05 · Our digital solutions',
                )}
              </span>
              <h2 id="sol-title">
                {t('Des outils conçus', 'Tools designed')}{' '}
                <Highlight>
                  {t('pour votre métier.', 'for your trade.')}
                </Highlight>
              </h2>
            </div>
            <p>
              {t(
                'Smartsell Labs développe des produits utilisés au quotidien : gestion d’activité, assistant WhatsApp multilingue, plateforme pour photographes et certification de documents.',
                'Smartsell Labs builds products used every day: business management, a multilingual WhatsApp assistant, a platform for photographers and document certification.',
              )}
            </p>
          </div>
          <SolutionsShowcase
            products={solutions}
            allHref={go('labs', 'products')}
          />
        </div>
      </section>

      {/* 07 · Portfolio */}
      <section
        className="sc-section sc-dark"
        id="portfolio"
        aria-labelledby="work-title"
      >
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="sg-mono">06 · Portfolio</span>
              <h2 id="work-title">
                {t('Le travail', 'The work')}{' '}
                <Highlight>{t('parle pour nous.', 'speaks for us.')}</Highlight>
              </h2>
            </div>
            <div>
              <p>
                {t(
                  'Identités de marque, sites web, séances photo et films : une sélection de projets réalisés pour nos clients.',
                  'Brand identities, websites, photo shoots and films: a selection of projects made for our clients.',
                )}
              </p>
              <CtaLink href={go('agency', 'work')}>
                {t('Tout le portfolio', 'The whole portfolio')}
              </CtaLink>
            </div>
          </div>
          <PortfolioTabs
            brands={brands}
            websites={websites}
            photos={[...shoots.fashion, ...shoots.sport, ...shoots.spaces]}
            films={films}
            brandHrefs={Object.fromEntries(
              brands.map((b) => [b.slug, go('agency', `work/${b.slug}`)]),
            )}
            filmHrefs={Object.fromEntries(
              films.map((f) => [f.slug, go('media', `video/${f.slug}`)]),
            )}
          />
        </div>
      </section>

      {/* 08 · Academy */}
      <section className="im-section im-light" aria-labelledby="academy-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">06 · Smartsell Academy</span>
            <h2 id="academy-title">
              {t('Apprendre en faisant.', 'Learn by doing.')}{' '}
              <Highlight>{t('Pour de vrai.', 'For real.')}</Highlight>
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              {t(
                'Treize formations pratiques : marketing digital, design, réseaux sociaux, vidéo, IA et IA créative.',
                'Thirteen hands-on courses: digital marketing, design, social media, video, AI and creative AI.',
              )}
            </p>
            <CtaLink href={go('academy', 'courses')} tone="dark">
              {t('Tous les modules', 'All courses')}
            </CtaLink>
          </div>
        </div>
        <div className="hm-wrap">
          <CourseCarousel
            courses={courses}
            hrefs={Object.fromEntries(
              courses.map((c) => [c.slug, go('academy', `courses/${c.slug}`)]),
            )}
          />
        </div>
      </section>

      {/* 09 · Studios */}
      <section className="im-section im-dark" aria-labelledby="studio-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">07 · Smartsell Studios</span>
            <h2 id="studio-title">
              {t('Trois plateaux.', 'Three sets.')}{' '}
              <Highlight>
                {t('Mille histoires.', 'A thousand stories.')}
              </Highlight>
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              {t(
                'Choisissez un espace, un pack et un créneau : simulez votre session en quelques clics.',
                'Choose a space, a pack and a slot: simulate your session in a few clicks.',
              )}
            </p>
            <CtaLink href={go('studio', 'booking')}>
              {t('Simuler une réservation', 'Try a booking')}
            </CtaLink>
          </div>
        </div>
        <div className="hm-wrap">
          <ExpandPanels panels={spacesPanels} />
          <nav
            className="hm-packs"
            aria-label={t('Packs Studios', 'Studios packs')}
          >
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
              {t('Des images qui', 'Images that')}{' '}
              <Highlight>{t('font bouger', 'move')}</Highlight>{' '}
              {t('les écrans.', 'screens.')}
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              {t(
                'Clips, films de marque, publicités et mode : nos productions, et des articles sur la tech, le business et la création.',
                'Music videos, brand films, adverts and fashion: our productions, plus articles on tech, business and creativity.',
              )}
            </p>
            <CtaLink href={go('media', 'videos')} tone="dark">
              {t('Toutes nos vidéos', 'All our videos')}
            </CtaLink>
          </div>
        </div>
        <div className="hm-wrap">
          <SlideRail
            label={t('Vidéos Smartsell Media', 'Smartsell Media videos')}
          >
            {films.slice(0, 10).map((f) => (
              <ClipTile
                key={f.slug}
                film={f}
                href={go('media', `video/${f.slug}`)}
                className="hm-film"
              />
            ))}
          </SlideRail>
        </div>
      </section>

      {/* 11 · Les métiers */}
      <section className="im-section im-dark" aria-labelledby="people-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">
              {t('09 · Les femmes et les hommes', '09 · The people')}
            </span>
            <h2 id="people-title">
              {t('Derrière chaque campagne,', 'Behind every campaign,')}{' '}
              <Highlight>{t('des talents.', 'talented people.')}</Highlight>
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              {t(
                'Cinq métiers qui travaillent ensemble sur votre projet. Survolez pour les rencontrer.',
                'Five crafts working together on your project. Hover to meet them.',
              )}
            </p>
            <CtaLink href={go('agency', 'team')}>
              {t('Découvrir le collectif', 'Meet the collective')}
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
        <span className="sg-mono">
          {t(
            '10 · Pour celles et ceux qui avancent',
            '10 · For those moving forward',
          )}
        </span>
        <h2>
          {t('Des visages. Des voix.', 'Faces. Voices.')}{' '}
          <Highlight>{t('Des histoires.', 'Stories.')}</Highlight>
        </h2>
        <p>
          {t(
            'Entrepreneurs, créateurs, marques et institutions : nous aidons celles et ceux qui font bouger la Guinée et l’Afrique à se faire entendre.',
            'Entrepreneurs, creators, brands and institutions: we help the people moving Guinea and Africa forward be heard.',
          )}
        </p>
        <div className="im-actions">
          <CtaLink href={contact}>
            {t('Raconter mon histoire', 'Tell my story')}
          </CtaLink>
          <CtaLink href={go('studio')} tone="ghost">
            {t('Découvrir nos studios', 'Discover our studios')}
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
            <span className="sg-mono">
              {t('11 · Notre méthode', '11 · Our method')}
            </span>
            <h2 id="method-title">
              {t(
                'Du brief aux résultats, en cinq temps.',
                'From brief to results, in five steps.',
              )}
            </h2>
          </div>
          <div className="im-head-side">
            <p>
              {t(
                'Une méthode simple, transparente et rythmée, pour que vous sachiez toujours où en est votre projet.',
                'A simple, transparent and well-paced method, so you always know where your project stands.',
              )}
            </p>
            <CtaLink href={contact} tone="dark">
              {t('Démarrer un projet', 'Start a project')}
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
          <span className="sg-mono">
            {t('12 · Notre conviction', '12 · Our conviction')}
          </span>
          <ScrollLitText
            text={t(
              'On ne fait pas de la communication pour faire joli. On construit des marques qui se reconnaissent au premier regard, des messages qui touchent juste et des campagnes dont on mesure l’effet. Votre ambition mérite mieux qu’un post de temps en temps.',
              'We don’t do communication just to look good. We build brands recognised at first glance, messages that hit home and campaigns whose impact we measure. Your ambition deserves more than the occasional post.',
            )}
          />
          <div className="sg-figures" data-reveal style={{ marginTop: 64 }}>
            {(
              [
                [5, t('Univers Smartsell', 'Smartsell universes')],
                [
                  agencyServices.length,
                  t('Expertises Agency', 'Agency services'),
                ],
                [courses.length, t('Modules Academy', 'Academy courses')],
                [articles.length, t('Articles Media', 'Media articles')],
                [packs.length, t('Packs Studios', 'Studios packs')],
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
            <span className="sg-mono">
              {t('13 · Votre brief intelligent', '13 · Your smart brief')}
            </span>
            <h2 id="brief-title">
              {t('Composez votre projet.', 'Compose your project.')}{' '}
              <Highlight>
                {t('On s’occupe du reste.', 'We’ll handle the rest.')}
              </Highlight>
            </h2>
          </div>
          <p>
            {t(
              'Six étapes, des questions qui s’adaptent à vos besoins, et vos réponses arrivent directement sur notre WhatsApp.',
              'Six steps, questions that adapt to your needs, and your answers go straight to our WhatsApp.',
            )}
          </p>
        </div>
        <div className="hm-wrap">
          <SmartBrief />
        </div>
      </section>

      <Marquee
        tone="dark"
        reverse
        items={[
          t('Faites-vous remarquer', 'Get noticed'),
          t('Faites-vous choisir', 'Get chosen'),
          t('Faites-vous recommander', 'Get recommended'),
        ]}
      />

      {/* 16 · Plan express */}
      <section className="im-section im-dark" aria-labelledby="map-title">
        <div className="im-head">
          <div>
            <span className="sg-mono">
              {t('14 · Plan express', '14 · Express map')}
            </span>
            <h2 id="map-title">
              {t(
                'Tout Smartsell, en un coup d’œil.',
                'All of Smartsell, at a glance.',
              )}
            </h2>
          </div>
          <p>
            {t(
              'Chaque page de chaque univers, à un clic.',
              'Every page of every universe, one click away.',
            )}
          </p>
        </div>
        <nav
          className="hm-wrap hm-map"
          aria-label={t('Plan des sites Smartsell', 'Smartsell site map')}
        >
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
                  {m.label}{' '}
                  <span aria-hidden="true">
                    <Icon name="arrowUpRight" />
                  </span>
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
            <p className="sg-mono">
              {t(
                'Smartsell · Votre prochaine campagne',
                'Smartsell · Your next campaign',
              )}
            </p>
            <h2>
              {t('Prêt à faire', 'Ready to make')}
              <br />
              <em>{t('du bruit ?', 'some noise?')}</em>
            </h2>
            <div className="im-actions">
              <CtaLink href={contact}>
                {t('Lancer mon projet', 'Start my project')}
              </CtaLink>
              <CtaLink href="#brief" tone="ghost">
                {t('Composer mon brief', 'Compose my brief')}
              </CtaLink>
            </div>
          </div>
          <p className="im-credits">
            {t(
              'Photographies et vidéos d’illustration : Envato Elements et Unsplash',
              'Illustrative photos and videos: Envato Elements and Unsplash',
            )}
            ({photoCredits.join(', ')}).{' '}
            {t(
              'Portfolio, photos de shooting et films : réalisations Smartsell.',
              'Portfolio, shoot photos and films: Smartsell productions.',
            )}
          </p>
        </div>
      </section>

      <FloatingCta
        href={contact}
        label={t('Parlons de votre projet', 'Let’s talk about your project')}
      />

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
              'Agence de communication et de marketing digital à Conakry : stratégie, réseaux sociaux, publicité, production, web, formation et outils.',
              'Communication and digital marketing agency in Conakry: strategy, social media, advertising, production, web, training and tools.',
            ),
          }).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
