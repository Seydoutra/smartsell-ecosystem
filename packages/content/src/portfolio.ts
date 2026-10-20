import { applyPublished } from './publishing';
/*
 * Travaux réels de Smartsell : clients, solutions développées par Labs,
 * identités de marque, sites web, séances photo et films.
 */
import { t } from '@smartsell/routing';
import { clip, local, type Photo, type VideoClip } from './photos';

export const clients = [
  'Jess Holding',
  'EAMS',
  'MIRS',
  'Cherifa Corporation',
  'Minas Traiteurs',
  'CPR',
  'FK Picture',
  'Kumacis',
  'Mid Clean',
  'Timam Corp',
  'Novacom',
  'GRS Studios',
  'Yathrib',
  'Best Médical Center',
];

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  pitch: string;
  url: string;
  cta: string;
  status: string;
  shots: Photo[];
  audiences: { who: string; gain: string }[];
};

const shot = (file: string, alt: string) => local(file, alt);

export const products: Product[] = [
  {
    slug: 'management',
    name: 'Smartsell Management',
    tagline: t(
      'Une seule plateforme pour piloter votre activité.',
      'One platform to run your business.',
    ),
    pitch: t(
      'Clients, projets, planning, production, devis, communication et finances : toute l’activité de l’entreprise réunie sur un seul écran.',
      'Clients, projects, planning, production, quotes, communication and finances: the whole business on a single screen.',
    ),
    url: 'https://seydoutra.github.io/smartsell-management/',
    cta: t('Découvrir Management', 'Discover Management'),
    status: t('Disponible', 'Available'),
    shots: [
      shot(
        'web/management',
        t('Accueil de Smartsell Management', 'Smartsell Management home page'),
      ),
      shot(
        'products/management-1',
        t(
          'Tableau de bord de Smartsell Management',
          'Smartsell Management dashboard',
        ),
      ),
      shot(
        'products/management-3',
        t(
          'Gestion des tâches et du calendrier éditorial',
          'Task and editorial calendar management',
        ),
      ),
    ],
    audiences: [
      {
        who: t('Dirigeants de PME', 'SME owners'),
        gain: t(
          'Une vue claire du chiffre d’affaires, des projets et des échéances.',
          'A clear view of revenue, projects and deadlines.',
        ),
      },
      {
        who: t('Agences & équipes créatives', 'Agencies & creative teams'),
        gain: t(
          'Projets, tâches et calendrier éditorial partagés.',
          'Shared projects, tasks and editorial calendar.',
        ),
      },
      {
        who: t('Comptabilité', 'Accounting'),
        gain: t(
          'Devis, factures et suivi des paiements au même endroit.',
          'Quotes, invoices and payment tracking in one place.',
        ),
      },
    ],
  },
  {
    slug: 'kuma',
    name: 'Kuma',
    tagline: t(
      'La parole de vos clients, enfin comprise.',
      'Your customers’ voices, finally understood.',
    ),
    pitch: t(
      'Un assistant WhatsApp qui comprend les messages et notes vocales en pular, soussou, malinké et français, répond aux demandes courantes et vous transmet l’essentiel.',
      'A WhatsApp assistant that understands messages and voice notes in Pular, Susu, Malinke and French, answers common requests and passes on what matters.',
    ),
    url: 'https://seydoutra.github.io/smartsell-management/kuma/',
    cta: t('Découvrir Kuma', 'Discover Kuma'),
    status: t('Nouveau', 'New'),
    shots: [
      shot('web/kuma', t('Accueil de Kuma', 'Kuma home page')),
      shot(
        'products/kuma-1',
        t(
          'Tableau de suivi des demandes clients dans Kuma',
          'Customer request tracking in Kuma',
        ),
      ),
      shot(
        'products/kuma-2',
        t(
          'Kuma transforme les messages en demandes structurées',
          'Kuma turns messages into structured requests',
        ),
      ),
    ],
    audiences: [
      {
        who: t('Commerces & restaurants', 'Shops & restaurants'),
        gain: t(
          'Aucune commande perdue dans les vocaux WhatsApp.',
          'No order lost in WhatsApp voice notes.',
        ),
      },
      {
        who: t('Cliniques & services', 'Clinics & services'),
        gain: t(
          'Rendez-vous et questions triés automatiquement.',
          'Appointments and questions sorted automatically.',
        ),
      },
      {
        who: t('Service client', 'Customer service'),
        gain: t(
          'Les réponses courantes partent seules, l’équipe garde les cas importants.',
          'Common answers go out on their own; the team keeps the important cases.',
        ),
      },
    ],
  },
  {
    slug: 'obtura',
    name: 'Obtura',
    tagline: t('Vos séances. Vos photos.', 'Your sessions. Your photos.'),
    pitch: t(
      'Obtura aide les photographes et créatifs à organiser leurs rendez-vous, suivre leurs clients et leur livrer les photos en ligne.',
      'Obtura helps photographers and creatives organise bookings, follow their clients and deliver photos online.',
    ),
    url: 'https://seydoutra.github.io/obtura/#commencer',
    cta: t('Essayer Obtura', 'Try Obtura'),
    status: t('Démo disponible', 'Demo available'),
    shots: [
      shot('web/obtura', t('Accueil d’Obtura', 'Obtura home page')),
      shot(
        'products/obtura-3',
        t('Espace studio dans Obtura', 'Studio workspace in Obtura'),
      ),
      shot('products/obtura-4', t('Démonstration d’Obtura', 'Obtura demo')),
    ],
    audiences: [
      {
        who: t('Photographes', 'Photographers'),
        gain: t(
          'Réservations, séances et livraisons suivies sans tableur.',
          'Bookings, sessions and deliveries tracked without spreadsheets.',
        ),
      },
      {
        who: t('Vidéastes & studios', 'Videographers & studios'),
        gain: t(
          'Chaque projet avance étape par étape, jusqu’à la livraison.',
          'Every project moves step by step through to delivery.',
        ),
      },
      {
        who: t('Leurs clients', 'Their clients'),
        gain: t(
          'Un espace élégant pour retrouver et télécharger leurs photos.',
          'An elegant space to find and download their photos.',
        ),
      },
    ],
  },
  {
    slug: 'garant',
    name: 'Garant',
    tagline: t(
      'Chaque document professionnel mérite une preuve de confiance.',
      'Every professional document deserves proof of trust.',
    ),
    pitch: t(
      'Émettez des attestations sécurisées, vérifiables en un instant par QR code, depuis une plateforme unique.',
      'Issue secure certificates that can be checked instantly by QR code, from a single platform.',
    ),
    url: 'https://seydoutra.github.io/garant/#demonstration',
    cta: t('Voir la démonstration', 'See the demo'),
    status: t('Démo disponible', 'Demo available'),
    shots: [
      shot('web/garant', t('Accueil de Garant', 'Garant home page')),
      shot(
        'products/garant-2',
        t('Les problèmes que résout Garant', 'The problems Garant solves'),
      ),
      shot(
        'products/garant-3',
        t(
          'Vérification d’un document dans Garant',
          'Checking a document in Garant',
        ),
      ),
    ],
    audiences: [
      {
        who: t('Entreprises & RH', 'Companies & HR'),
        gain: t(
          'Attestations de travail impossibles à falsifier.',
          'Work certificates that cannot be forged.',
        ),
      },
      {
        who: t('Écoles & centres de formation', 'Schools & training centres'),
        gain: t(
          'Diplômes et certificats vérifiables par tous.',
          'Diplomas and certificates anyone can verify.',
        ),
      },
      {
        who: t('Administrations', 'Administrations'),
        gain: t(
          'Documents officiels authentifiés en quelques secondes.',
          'Official documents authenticated in seconds.',
        ),
      },
    ],
  },
];

export type Brand = {
  slug: string;
  name: string;
  sector: string;
  summary: string;
  deliverables: string[];
  pages: Photo[];
};

const pages = (slug: string, name: string, n = 8) =>
  Array.from({ length: n }, (_, i) =>
    local(
      `brand/${slug}-${i + 1}`,
      t(
        `Planche ${i + 1} du brandbook ${name}`,
        `${name} brandbook spread ${i + 1}`,
      ),
    ),
  );

export const brands: Brand[] = [
  {
    slug: 'focus-com',
    name: 'Focus-Com',
    sector: t('Communication & image', 'Communication & image'),
    summary: t(
      'Une charte graphique bleu électrique pour une agence au service de l’image : logo, couleurs, typographie, papeterie, vêtements et supports média.',
      'An electric-blue brand guide for an image-focused agency: logo, colours, typography, stationery, apparel and media assets.',
    ),
    deliverables: [
      t('Logo & règles d’usage', 'Logo & usage rules'),
      t('Palette & typographie', 'Palette & typography'),
      t('Papeterie', 'Stationery'),
      t('Vêtements & goodies', 'Apparel & merchandise'),
      t('Maquettes média', 'Media mock-ups'),
    ],
    pages: pages('focus', 'Focus-Com'),
  },
  {
    slug: 'g-traf',
    name: 'G-TRAF+',
    sector: t('Travaux publics & fournitures', 'Public works & supplies'),
    summary: t(
      'L’identité d’une entreprise guinéenne de travaux et de fournitures : emblème, chantiers, signalétique, véhicules et réseaux sociaux.',
      'The identity of a Guinean works and supplies company: emblem, sites, signage, vehicles and social media.',
    ),
    deliverables: [
      t('Logo & emblème', 'Logo & emblem'),
      t('Signalétique de chantier', 'Site signage'),
      t('Uniformes & EPI', 'Uniforms & PPE'),
      t('Flotte & affichage', 'Fleet & billboards'),
      t('Réseaux sociaux', 'Social media'),
    ],
    pages: pages('gtraf', 'G-TRAF+'),
  },
  {
    slug: 'bet224',
    name: 'Bet224',
    sector: t('Paris sportifs', 'Sports betting'),
    summary: t(
      'Une identité jaune et noire pleine d’énergie : « Le prochain, c’est toi ». Gadgets, maillots, véhicules, affichage et application.',
      'A high-energy yellow and black identity: “You’re next”. Merchandise, jerseys, vehicles, billboards and app.',
    ),
    deliverables: [
      t('Logo & typographie', 'Logo & typography'),
      t('Gadgets & textile', 'Merchandise & apparel'),
      t('Véhicules & signalétique', 'Vehicles & signage'),
      t('Campagne d’affichage', 'Billboard campaign'),
    ],
    pages: pages('bet224', 'Bet224'),
  },
  {
    slug: 'laguipres',
    name: 'LAGUIPRES',
    sector: t('Sécurité & incendie', 'Security & fire safety'),
    summary: t(
      'L’Internationale de prestation de service : un sceau institutionnel, un bleu royal et un univers « Toujours là pour votre sécurité ».',
      'L’Internationale de prestation de service: an institutional seal, a royal blue and a “Always there for your safety” world.',
    ),
    deliverables: [
      t('Sceau & déclinaisons', 'Seal & variations'),
      t('Uniformes & badges', 'Uniforms & badges'),
      t('Site web & application', 'Website & app'),
      t('Affichage urbain', 'Outdoor advertising'),
    ],
    pages: pages('laguipres', 'LAGUIPRES'),
  },
  {
    slug: 'tmc',
    name: 'Timam Corporation',
    sector: t('Mines & industrie', 'Mining & industry'),
    summary: t(
      'Brand identity guidelines pour TMC : un orange industriel, la typographie Montserrat, un motif de marque et des visuels de terrain.',
      'Brand identity guidelines for TMC: an industrial orange, Montserrat typography, a brand pattern and field visuals.',
    ),
    deliverables: [
      t('Histoire & évolution du logo', 'Logo story & evolution'),
      t('Couleurs & motif', 'Colours & pattern'),
      t('Papeterie & textile', 'Stationery & apparel'),
      t('Digital & affichage', 'Digital & outdoor'),
    ],
    pages: pages('tmc', 'Timam Corporation'),
  },
  {
    slug: 'trixion',
    name: 'Trixion',
    sector: t('Sportswear', 'Sportswear'),
    summary: t(
      'Built for the bold : une marque de sport vert acide, un F en mouvement, des textiles, accessoires et campagnes urbaines.',
      'Built for the bold: an acid-green sports brand, an F in motion, apparel, accessories and urban campaigns.',
    ),
    deliverables: [
      t('Conceptualisation du logo', 'Logo concept'),
      t('Moodboard & ton', 'Moodboard & tone'),
      t('Textile & accessoires', 'Apparel & accessories'),
      t('Campagnes', 'Campaigns'),
    ],
    pages: pages('trixion', 'Trixion'),
  },
];

export type Website = {
  slug: string;
  name: string;
  sector: string;
  url: string;
  shot: Photo;
};

const site = (
  slug: string,
  name: string,
  sector: string,
  url: string,
): Website => ({
  slug,
  name,
  sector,
  url,
  shot: local(
    `web/${slug}`,
    t(`Page d’accueil du site ${name}`, `${name} website home page`),
  ),
});

export const websites: Website[] = [
  site(
    'mirs',
    'MIRS Spatial Systems',
    t('Solutions intégrées', 'Integrated solutions'),
    'https://seydoutra.github.io/mirs-spatial-systems/',
  ),
  site(
    'simandou',
    'Simandou Mining Summit 2026',
    t('Événement minier', 'Mining event'),
    'https://seydoutra.github.io/simandou-mining-summit-2026/fr/',
  ),
  site(
    'tmc',
    'Timam Corporation',
    t('Mines & industrie', 'Mining & industry'),
    'https://timamcorp.com/',
  ),
  site(
    'cpr',
    'CPR',
    t('Prévention routière', 'Road safety'),
    'http://cprgn.com/',
  ),
  site(
    'accreditation',
    t('Portail national d’accréditation', 'National accreditation portal'),
    t('Événements officiels', 'Official events'),
    'https://seydoutra.github.io/accreditation/?version=navigation2#accueil',
  ),
  site(
    'econova',
    'Econova',
    t('Économie circulaire', 'Circular economy'),
    'https://econova-site-institutionnel-officiel-conomie-circ.ai.studio',
  ),
  site(
    'yathrib',
    'Yathrib',
    t('BTP & préfabrication', 'Construction & prefab'),
    'https://yathribgn.netlify.app/',
  ),
  site(
    'grs',
    'GRS Vision',
    t('Studio photo', 'Photo studio'),
    'https://seydoutra.github.io/grs-vision/#/',
  ),
  site(
    'maamouu',
    'Chez Maamouu',
    t('Restauration', 'Food'),
    'https://maamouu-culinary-hub.base44.app/',
  ),
  site(
    'obtura',
    'Obtura',
    t('Produit Smartsell Labs', 'Smartsell Labs product'),
    'https://seydoutra.github.io/obtura/',
  ),
  site(
    'garant',
    'Garant',
    t('Produit Smartsell Labs', 'Smartsell Labs product'),
    'https://seydoutra.github.io/garant/',
  ),
  site(
    'kuma',
    'Kuma',
    t('Produit Smartsell Labs', 'Smartsell Labs product'),
    'https://seydoutra.github.io/smartsell-management/kuma/',
  ),
  site(
    'management',
    'Smartsell Management',
    t('Produit Smartsell Labs', 'Smartsell Labs product'),
    'https://seydoutra.github.io/smartsell-management/',
  ),
];

const work = (n: string, alt: string, ratio: Photo['ratio'] = 'portrait') =>
  local(`work/shoot-${n}`, alt, ratio);

export const shoots = {
  fashion: [
    work(
      '09181',
      t(
        'Portrait mode en tenue wax verte, dans un jardin',
        'Fashion portrait in a green wax outfit, in a garden',
      ),
    ),
    work(
      '09258',
      t(
        'Mannequin en robe vichy rouge, terrasse d’hôtel',
        'Model in a red gingham dress on a hotel terrace',
      ),
    ),
    work(
      '09276',
      t(
        'Mannequin en robe vichy, lunettes de soleil, terrasse',
        'Model in gingham with sunglasses on a terrace',
      ),
      'landscape',
    ),
    work(
      '09693',
      t(
        'Mannequin en robe blanche brodée sous une pergola',
        'Model in an embroidered white dress under a pergola',
      ),
    ),
    work(
      '09697',
      t(
        'Mannequin en robe blanche et sac rouge sur un transat',
        'Model in a white dress with a red bag on a lounger',
      ),
    ),
    work(
      '09703',
      t('Mannequin sous les pergolas en bois', 'Model under wooden pergolas'),
    ),
    work(
      '09724',
      t(
        'Silhouette au coucher du soleil, au bord de l’eau',
        'Silhouette at sunset by the water',
      ),
    ),
    work(
      '09849',
      t(
        'Mannequin en tenue blanche à franges, salon d’hôtel',
        'Model in a fringed white outfit, hotel lounge',
      ),
    ),
    work(
      '09862',
      t(
        'Mannequin devant un grand vase bleu et un escalier',
        'Model by a large blue vase and a staircase',
      ),
    ),
    work(
      '09872',
      t(
        'Mannequin en blanc avec sac en cuir',
        'Model in white with a leather bag',
      ),
    ),
    work(
      '09894',
      t(
        'Mannequin en blanc devant une façade vitrée',
        'Model in white in front of a glass façade',
      ),
    ),
    work(
      '09170',
      t(
        'Mannequin en wax dans un jardin d’hôtel',
        'Model in wax print in a hotel garden',
      ),
      'landscape',
    ),
  ],
  sport: [
    work(
      '00557',
      t(
        'Un joueur international échange avant le match',
        'An international player talks before the match',
      ),
    ),
    work(
      '00447',
      t(
        'Les joueurs célèbrent au bord du terrain',
        'Players celebrate on the touchline',
      ),
    ),
    work(
      '00549',
      t(
        'Interview d’après-match sur la pelouse',
        'Post-match interview on the pitch',
      ),
    ),
    work(
      '09841',
      t(
        'Action de jeu dans un stade plein',
        'Match action in a packed stadium',
      ),
    ),
    work('09850', t('Un joueur en pleine course', 'A player mid-sprint')),
    work(
      '00064',
      t(
        'Joueurs en noir et blanc sur le terrain',
        'Players in black and white on the pitch',
      ),
    ),
    work(
      '09891',
      t(
        'Portrait d’un joueur en noir et blanc',
        'Black and white portrait of a player',
      ),
    ),
    work(
      '09990',
      t(
        'Les équipes sur le terrain devant les tribunes',
        'Teams on the pitch in front of the stands',
      ),
    ),
  ],
  spaces: [
    work(
      '09296',
      t(
        'Salle de conférence aux chaises vertes',
        'Conference room with green chairs',
      ),
      'landscape',
    ),
    work(
      '09287',
      t(
        'Écran et pupitre dans une salle de réunion',
        'Screen and lectern in a meeting room',
      ),
      'landscape',
    ),
    work(
      '09285',
      t(
        'Salon avec fauteuil vert et coussins orange',
        'Lounge with a green armchair and orange cushions',
      ),
      'landscape',
    ),
    work(
      '09409',
      t(
        'Escalier en marbre au garde-corps noir',
        'Marble staircase with a black railing',
      ),
    ),
    work(
      '09419',
      t('Fauteuils verts vus d’en haut', 'Green armchairs seen from above'),
    ),
    work(
      '09333',
      t(
        'Coussins orange et vert sur un canapé',
        'Orange and green cushions on a sofa',
      ),
      'landscape',
    ),
  ],
};

export const shootSeries = [
  {
    slug: 'mode',
    title: t('Éditorial mode', 'Fashion editorial'),
    copy: t(
      'Direction artistique, stylisme et lumière naturelle dans des lieux d’exception.',
      'Art direction, styling and natural light in exceptional venues.',
    ),
    photos: shoots.fashion,
  },
  {
    slug: 'sport',
    title: t('Reportage football', 'Football reportage'),
    copy: t(
      'Au bord du terrain, au cœur de l’émotion : avant, pendant et après le match.',
      'On the touchline, in the thick of the emotion: before, during and after the match.',
    ),
    photos: shoots.sport,
  },
  {
    slug: 'lieux',
    title: t('Lieux & hôtellerie', 'Venues & hospitality'),
    copy: t(
      'Salles, salons et détails : des images qui donnent envie de réserver.',
      'Rooms, lounges and details: images that make people want to book.',
    ),
    photos: shoots.spaces,
  },
];

export type Film = {
  slug: string;
  title: string;
  kind: string;
  clip: VideoClip;
  vertical: boolean;
};

const film = (
  slug: string,
  title: string,
  kind: string,
  vertical = false,
): Film => ({
  slug,
  title,
  kind,
  clip: clip(slug),
  vertical,
});
const kinds = {
  clip: t('Clip musical', 'Music video'),
  teaser: 'Teaser',
  ad: t('Publicité', 'Advert'),
  fashion: t('Mode', 'Fashion'),
  live: 'Live',
  brand: t('Film de marque', 'Brand film'),
};

export const films: Film[] = [
  film('la-patronne', 'La Patronne', kinds.live),
  film('kader-aye-sonna', 'Kader & Aye Sonna', kinds.teaser),
  film('prestige-glow', 'Prestige Glow', kinds.ad, true),
  film('dkh-dkr', 'DKH Parfums', kinds.ad, true),
  film('radisson-karaa', 'Radisson × Karaa', kinds.brand),
  film('princess', 'Princess', kinds.fashion, true),
  film('aye-sonna', 'Aye Sonna', kinds.clip),
  film('ghost', 'Ghost', kinds.brand),
  film('johndoe', 'John Doe', kinds.fashion, true),
  film('r2', 'R2', kinds.fashion, true),
  film('ak-teaser', 'AK', kinds.teaser),
  film('kdkr', 'KDKR', kinds.clip),
  film('kk', 'KK', kinds.brand),
  film('coco', 'Coco', kinds.ad, true),
  film('seye', 'Seye', kinds.clip),
  film('aissa', 'Aïssa', kinds.clip),
  film('drews', 'Drews', kinds.fashion),
  film('reel-studio', t('Reel studio', 'Studio reel'), kinds.brand),
];

applyPublished(clients, 'agency', 'clients');
applyPublished(products, 'labs', 'products');
applyPublished(brands, 'agency', 'brands');
applyPublished(websites, 'agency', 'websites');
applyPublished(shootSeries, 'agency', 'series');
applyPublished(films, 'media', 'films');
