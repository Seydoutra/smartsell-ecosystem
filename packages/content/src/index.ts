import type { SearchEntry, Vertical } from '@smartsell/types';
import { getSitePages } from './sites';
import {
  urlFor,
  withBasePath,
  routingConfig,
  managementUrl,
  locale,
  t,
} from '@smartsell/routing';
export const verticals: readonly Vertical[] = [
  {
    id: 'agency',
    name: 'Agency',
    verb: t('Créer', 'Create'),
    number: '01',
    headline: t('Des marques qui avancent.', 'Brands that move forward.'),
    description: t(
      'De la stratégie à l’expérience digitale, nous donnons une direction aux marques et une forme à leurs ambitions.',
      'From strategy to digital experience, we give brands a direction and their ambitions a shape.',
    ),
    focus: [
      t('Stratégie & identité', 'Strategy & identity'),
      t('Digital & produit', 'Digital & product'),
      t('Marketing & contenus', 'Marketing & content'),
    ],
    journey: t('Construire votre marque', 'Build your brand'),
    theme: 'light',
  },
  {
    id: 'academy',
    name: 'Academy',
    verb: t('Apprendre', 'Learn'),
    number: '02',
    headline: t(
      'Les compétences ouvrent des possibilités.',
      'Skills open possibilities.',
    ),
    description: t(
      'Apprendre, pratiquer et évoluer. Un univers pour développer les compétences qui font grandir les talents et les équipes.',
      'Learn, practise and grow. A universe to develop the skills that help talents and teams grow.',
    ),
    focus: [
      t('Marketing & création', 'Marketing & creative'),
      t('Web, IA & data', 'Web, AI & data'),
      t('Formations entreprises', 'Corporate training'),
    ],
    journey: t('Développer vos compétences', 'Develop your skills'),
    theme: 'light',
  },
  {
    id: 'media',
    name: 'Media',
    verb: t('Comprendre', 'Understand'),
    number: '03',
    headline: t('Lire le changement.', 'Read the change.'),
    description: t(
      'Tech, business et culture créative : comprendre les idées, les outils et les voix qui transforment la Guinée et l’Afrique.',
      'Tech, business and creative culture: understand the ideas, tools and voices transforming Guinea and Africa.',
    ),
    focus: [
      t('Tech & intelligence artificielle', 'Tech & artificial intelligence'),
      'Business & entrepreneurs',
      t('Afrique & culture créative', 'Africa & creative culture'),
    ],
    journey: t('Comprendre ce qui vient', 'Understand what’s coming'),
    theme: 'light',
  },
  {
    id: 'studio',
    name: 'Studios',
    verb: t('Produire', 'Produce'),
    number: '04',
    headline: t('Votre idée. Notre espace.', 'Your idea. Our space.'),
    description: t(
      'Un univers dédié à l’image, au son et à la production. Pour les créateurs, les marques et les histoires qui méritent de prendre forme.',
      'A universe dedicated to image, sound and production. For creators, brands and stories that deserve to take shape.',
    ),
    focus: [
      t('Photo & vidéo', 'Photo & video'),
      'Podcast & interview',
      t('Contenus de marque', 'Brand content'),
    ],
    journey: t('Donner forme à vos contenus', 'Shape your content'),
    theme: 'dark',
  },
  {
    id: 'labs',
    name: 'Labs',
    verb: t('Innover', 'Innovate'),
    number: '05',
    headline: t(
      'Des problèmes réels. Des produits utiles.',
      'Real problems. Useful products.',
    ),
    description: t(
      'Nous ne faisons pas qu’utiliser la technologie. Nous construisons des outils numériques pour les entreprises et les créateurs.',
      'We don’t just use technology. We build digital tools for businesses and creators.',
    ),
    focus: [
      'Smartsell Management',
      'Obtura',
      t('IA & automatisation', 'AI & automation'),
    ],
    journey: t('Construire les outils de demain', 'Build tomorrow’s tools'),
    theme: 'purple',
  },
];
/** Public entry points; Labs remains available through Products and existing URLs. */
export const primaryVerticals = verticals.filter((v) => v.id !== 'labs');

export const products = [
  {
    name: 'Smartsell Management',
    category: t('CRM · VENTES · OPÉRATIONS', 'CRM · SALES · OPERATIONS'),
    description: t(
      'Clients, projets, planning et finances : un produit pour réunir le travail de votre entreprise.',
      'Clients, projects, planning and finances: one product to bring your company’s work together.',
    ),
    state: t('Découvrir le produit', 'Discover the product'),
    url: managementUrl,
    external: true,
  },
  {
    name: 'Obtura',
    category: t(
      'BUSINESS OS · CRÉATEURS VISUELS',
      'BUSINESS OS · VISUAL CREATORS',
    ),
    description: t(
      'Un univers produit pensé pour les photographes, vidéastes et créateurs visuels.',
      'A product universe designed for photographers, videographers and visual creators.',
    ),
    state: t('Découvrir la vision Obtura', 'Discover the Obtura vision'),
    url: urlFor('labs', locale, 'products/obtura', routingConfig),
    external: false,
  },
] as const;
export const searchEntries: readonly SearchEntry[] = [
  ...verticals.map((v) => ({
    title: `Smartsell ${v.name}`,
    summary: `${v.verb}. ${v.description}`,
    url: urlFor(v.id, locale, '', routingConfig),
    type: t('Univers', 'Universe'),
  })),
  ...verticals.flatMap((v) =>
    getSitePages(v.id)
      .filter(
        (p) =>
          p.path &&
          !['enroll', 'learn', 'dashboard', 'certificates', 'privacy'].includes(
            p.kind || p.path,
          ),
      )
      .map((p) => ({
        title: `${v.name} · ${p.title}`,
        summary: p.intro,
        url: urlFor(v.id, locale, p.path, routingConfig),
        type: v.name,
      })),
  ),
  ...products.map((p) => ({
    title: p.name,
    summary: p.description,
    url: p.url,
    type: t('Produit', 'Product'),
  })),
  ...[
    {
      path: 'about',
      title: t('À propos de Smartsell', 'About Smartsell'),
      summary: t(
        'Une maison, quatre univers et une même méthode.',
        'One house, four universes and a shared method.',
      ),
    },
    {
      path: 'contact',
      title: t('Parler à Smartsell', 'Talk to Smartsell'),
      summary: t(
        'Préparer un projet et contacter l’équipe.',
        'Prepare a project and contact our team.',
      ),
    },
    {
      path: 'products',
      title: t('Produits Smartsell', 'Smartsell products'),
      summary: t(
        'Management, Kuma, Obtura et Garant.',
        'Management, Kuma, Obtura and Garant.',
      ),
    },
    {
      path: 'explore',
      title: t('Explorer Smartsell en détail', 'Explore Smartsell in detail'),
      summary: t(
        'Les parcours, métiers, réalisations, formations et crédits.',
        'Journeys, fields, work, courses and credits.',
      ),
    },
  ].map((p) => ({
    title: p.title,
    summary: p.summary,
    url: withBasePath(`/${locale}/${p.path}/`),
    type: t('La maison', 'The house'),
  })),
  {
    title: t('La maison Smartsell', 'The Smartsell house'),
    summary: t(
      'Agence de communication et de marketing digital : stratégie, réseaux sociaux, publicité, production, web et formation.',
      'Communication and digital marketing agency: strategy, social media, advertising, production, web and training.',
    ),
    url: withBasePath(`/${locale}/about/#conviction`),
    type: t('La maison', 'The house'),
  },
];
export const nextJourney = [
  {
    step: t('Une idée', 'An idea'),
    title: t('Poser la direction', 'Set the direction'),
    copy: t(
      'La stratégie et le design donnent un cap à votre marque.',
      'Strategy and design give your brand a heading.',
    ),
    vertical: 'agency',
  },
  {
    step: t('Une compétence', 'A skill'),
    title: t('Développer le savoir-faire', 'Develop know-how'),
    copy: t(
      'La formation transforme une intention en pratique.',
      'Training turns an intention into practice.',
    ),
    vertical: 'academy',
  },
  {
    step: t('Un contenu', 'A piece of content'),
    title: t('Passer à la production', 'Move into production'),
    copy: t(
      'L’image et le son donnent une forme à votre histoire.',
      'Image and sound give your story a shape.',
    ),
    vertical: 'studio',
  },
  {
    step: t('Un outil', 'A tool'),
    title: t('Faire avancer le quotidien', 'Move daily work forward'),
    copy: t(
      'Des produits numériques relient vos opérations.',
      'Digital products connect your operations.',
    ),
    vertical: 'labs',
  },
] as const;
