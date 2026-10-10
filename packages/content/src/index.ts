import type { SearchEntry, Vertical } from '@smartsell/types';
import { getSitePages } from './sites';
import {
  urlFor,
  withBasePath,
  routingConfig,
  managementUrl,
} from '@smartsell/routing';
export const verticals: readonly Vertical[] = [
  {
    id: 'agency',
    name: 'Agency',
    verb: 'Créer',
    number: '01',
    headline: 'Des marques qui avancent.',
    description:
      'De la stratégie à l’expérience digitale, nous donnons une direction aux marques et une forme à leurs ambitions.',
    focus: [
      'Stratégie & identité',
      'Digital & produit',
      'Marketing & contenus',
    ],
    journey: 'Construire votre marque',
    theme: 'light',
  },
  {
    id: 'academy',
    name: 'Academy',
    verb: 'Apprendre',
    number: '02',
    headline: 'Les compétences ouvrent des possibilités.',
    description:
      'Apprendre, pratiquer et évoluer. Un univers pour développer les compétences qui font grandir les talents et les équipes.',
    focus: ['Marketing & création', 'Web, IA & data', 'Formations entreprises'],
    journey: 'Développer vos compétences',
    theme: 'light',
  },
  {
    id: 'media',
    name: 'Media',
    verb: 'Comprendre',
    number: '03',
    headline: 'Lire le changement.',
    description:
      'Tech, business et culture créative : comprendre les idées, les outils et les voix qui transforment la Guinée et l’Afrique.',
    focus: [
      'Tech & intelligence artificielle',
      'Business & entrepreneurs',
      'Afrique & culture créative',
    ],
    journey: 'Comprendre ce qui vient',
    theme: 'light',
  },
  {
    id: 'studio',
    name: 'Studios',
    verb: 'Produire',
    number: '04',
    headline: 'Votre idée. Notre espace.',
    description:
      'Un univers dédié à l’image, au son et à la production. Pour les créateurs, les marques et les histoires qui méritent de prendre forme.',
    focus: ['Photo & vidéo', 'Podcast & interview', 'Contenus de marque'],
    journey: 'Donner forme à vos contenus',
    theme: 'dark',
  },
  {
    id: 'labs',
    name: 'Labs',
    verb: 'Innover',
    number: '05',
    headline: 'Des problèmes réels. Des produits utiles.',
    description:
      'Nous ne faisons pas qu’utiliser la technologie. Nous construisons des outils numériques pour les entreprises et les créateurs.',
    focus: ['Smartsell Management', 'Obtura', 'IA & automatisation'],
    journey: 'Construire les outils de demain',
    theme: 'purple',
  },
];
export const products = [
  {
    name: 'Smartsell Management',
    category: 'CRM · VENTES · OPÉRATIONS',
    description:
      'Clients, projets, planning et finances : un produit pour réunir le travail de votre entreprise.',
    state: 'Découvrir le produit',
    url: managementUrl,
    external: true,
  },
  {
    name: 'Obtura',
    category: 'BUSINESS OS · CRÉATEURS VISUELS',
    description:
      'Un univers produit pensé pour les photographes, vidéastes et créateurs visuels.',
    state: 'Découvrir la vision Obtura',
    url: urlFor('labs', 'fr', 'products/obtura', routingConfig),
    external: false,
  },
] as const;
export const searchEntries: readonly SearchEntry[] = [
  ...verticals.map((v) => ({
    title: `Smartsell ${v.name}`,
    summary: `${v.verb}. ${v.description}`,
    url: urlFor(v.id, 'fr', '', routingConfig),
    type: 'Univers',
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
        url: urlFor(v.id, 'fr', p.path, routingConfig),
        type: v.name,
      })),
  ),
  ...products.map((p) => ({
    title: p.name,
    summary: p.description,
    url: p.url,
    type: 'Produit',
  })),
  {
    title: 'La maison Smartsell',
    summary:
      'Notre vision : relier création, apprentissage, information, production et innovation.',
    url: withBasePath('/fr/#vision'),
    type: 'La maison',
  },
];
export const nextJourney = [
  {
    step: 'Une idée',
    title: 'Poser la direction',
    copy: 'La stratégie et le design donnent un cap à votre marque.',
    vertical: 'agency',
  },
  {
    step: 'Une compétence',
    title: 'Développer le savoir-faire',
    copy: 'La formation transforme une intention en pratique.',
    vertical: 'academy',
  },
  {
    step: 'Un contenu',
    title: 'Passer à la production',
    copy: 'L’image et le son donnent une forme à votre histoire.',
    vertical: 'studio',
  },
  {
    step: 'Un outil',
    title: 'Faire avancer le quotidien',
    copy: 'Des produits numériques relient vos opérations.',
    vertical: 'labs',
  },
] as const;
