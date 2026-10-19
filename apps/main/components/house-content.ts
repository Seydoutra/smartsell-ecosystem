import {
  t,
  urlFor,
  routingConfig,
  managementUrl,
  locale,
} from '@smartsell/routing';
import { photos } from '@smartsell/content/photos';
import type { VerticalId } from '@smartsell/types';
import type { Journey } from '@smartsell/ui/home';
const go = (id: VerticalId, path = '') =>
  urlFor(id, locale, path, routingConfig);
const contact = go('agency', 'contact');
export const journeys: Journey[] = [
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

export const method = [
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
