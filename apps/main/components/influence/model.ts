import { locale, withBasePath } from '@smartsell/routing';
export const influenceHref = (path = '') => {
  const [route, query] = path.split('?');
  return withBasePath(
    `/${locale}/influence/${route ? route.replace(/^\/+|\/+$/g, '') + '/' : ''}${query ? '?' + query : ''}`,
  );
};
export type Creator = {
  id: string;
  name: string;
  category: string;
  location: string;
  network: string;
  bio: string;
  avatar: string;
  social_url?: string;
  followers: number | null;
  verified_at?: string | null;
};
export type Campaign = {
  id: string;
  title: string;
  brand: string;
  objective: string;
  brief: string;
  budget_gnf: number;
  start_date: string;
  end_date: string;
  state: string;
  created_at?: string;
};
export type Mission = {
  id: string;
  campaign_id: string;
  creator_id: string;
  title: string;
  objective: string;
  deadline: string;
  fee_gnf: number;
  state: string;
  contract_text: string;
  contract_version: number;
  contract_status: string;
  contract_reference: string;
  content_url: string;
  feedback: string;
  revision: number;
};
export type Metric = {
  id: string;
  mission_id: string;
  captured_at: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  evidence_url: string;
  source: string;
};
export type Cost = {
  id: string;
  campaign_id: string;
  mission_id: string | null;
  amount_gnf: number;
  kind: string;
  reference: string;
  recorded_at: string;
};
export type PortalData = {
  campaigns: Campaign[];
  missions: Mission[];
  metrics: Metric[];
  costs: Cost[];
  creators: Creator[];
  applications: Creator[];
  owner: boolean;
};
export const categories = [
  'Lifestyle',
  'Beauté',
  'Tech',
  'Food',
  'Culture',
  'Sport',
];
export const demoCreators: Creator[] = [
  {
    id: 'demo-a',
    name: 'Studio Awa',
    category: 'Lifestyle',
    location: 'Conakry',
    network: 'Instagram',
    bio: 'Des récits du quotidien, des découvertes et des formats courts.',
    avatar: '/media/social-selfie.jpg',
    followers: 42000,
  },
  {
    id: 'demo-b',
    name: 'Le regard créatif',
    category: 'Tech',
    location: 'Conakry',
    network: 'YouTube',
    bio: 'Des produits expliqués simplement, avec démonstrations et tutoriels.',
    avatar: '/media/portrait-man.jpg',
    followers: 28000,
  },
  {
    id: 'demo-c',
    name: 'Le goût du partage',
    category: 'Food',
    location: 'Conakry',
    network: 'TikTok',
    bio: 'Des recettes, des adresses et des histoires autour de la cuisine.',
    avatar: '/media/social-hearts.jpg',
    followers: 65000,
  },
  {
    id: 'demo-d',
    name: 'Culture en mouvement',
    category: 'Culture',
    location: 'Dakar',
    network: 'Instagram',
    bio: 'Création, rencontres et nouvelles scènes culturelles.',
    avatar: '/media/portrait-woman.jpg',
    followers: 19000,
  },
];
export function summary(
  data: Pick<PortalData, 'missions' | 'metrics' | 'costs'>,
) {
  const latest = new Map<string, Metric>();
  for (const m of data.metrics)
    if (
      !latest.has(m.mission_id) ||
      Date.parse(m.captured_at) >
        Date.parse(latest.get(m.mission_id)!.captured_at)
    )
      latest.set(m.mission_id, m);
  const measured = [...latest.values()];
  const views = measured.reduce((s, m) => s + m.views, 0);
  const interactions = measured.reduce(
    (s, m) => s + m.likes + m.comments + m.shares,
    0,
  );
  return {
    views: measured.length ? views : null,
    interactions: measured.length ? interactions : null,
    engagement:
      measured.length && views > 0 ? (interactions / views) * 100 : null,
    measured: measured.length,
    planned: data.missions.reduce((s, m) => s + m.fee_gnf, 0),
    spent: data.costs.reduce((s, c) => s + c.amount_gnf, 0),
    paid: data.costs
      .filter((c) => c.kind === 'creator_payment')
      .reduce((s, c) => s + c.amount_gnf, 0),
  };
}
export const money = (n: number) =>
  `${new Intl.NumberFormat(locale === 'fr' ? 'fr-GN' : 'en-GB').format(n)} GNF`;
export const number = (n: number | null) =>
  n === null
    ? '—'
    : new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(n);
export function demoData(): PortalData {
  const campaign: Campaign = {
    id: 'demo-campaign',
    title: 'Les voix de Conakry',
    brand: 'Maison Kalo · marque fictive',
    objective: 'Faire découvrir une nouvelle collection',
    brief:
      'Raconter le produit dans votre quotidien. Montrer un usage concret et identifier le partenariat commercial.',
    budget_gnf: 12000000,
    start_date: '2026-11-01',
    end_date: '2026-11-30',
    state: 'active',
  };
  const missions: Mission[] = demoCreators.slice(0, 3).map((c, i) => ({
    id: `demo-mission-${i}`,
    campaign_id: campaign.id,
    creator_id: i === 2 ? 'demo-a' : c.id,
    title: [
      'Un Reel de découverte',
      'Une vidéo de démonstration',
      'Trois stories en immersion',
    ][i],
    objective: 'Présenter un usage et inviter à découvrir la collection',
    deadline: `2026-11-${12 + i * 3}`,
    fee_gnf: [1800000, 2500000, 1200000][i],
    state: ['approved', 'submitted', 'in_progress'][i],
    contract_text:
      'Document de démonstration. Un contenu original, identification du partenariat, deux séries de retours. Droits de republication limités à 30 jours sur les comptes organiques de la marque. Aucune signature ni obligation réelle.',
    contract_version: 1,
    contract_status: 'signed',
    contract_reference: 'DEMO-CONTRAT-01',
    content_url: '',
    feedback:
      'Le format et le message sont validés. Merci de vérifier les sous titres.',
    revision: 1,
  }));
  const metrics: Metric[] = missions.slice(0, 2).map((m, i) => ({
    id: `metric-${i}`,
    mission_id: m.id,
    captured_at: '2026-11-14T10:00:00Z',
    views: [62000, 48000][i],
    likes: [2600, 1900][i],
    comments: [220, 170][i],
    shares: [430, 310][i],
    clicks: [340, 260][i],
    evidence_url: '',
    source: 'Simulation',
  }));
  return {
    campaigns: [campaign],
    missions,
    metrics,
    costs: [
      {
        id: 'cost-demo',
        campaign_id: campaign.id,
        mission_id: missions[0].id,
        amount_gnf: 1800000,
        kind: 'creator_payment',
        reference: 'Paiement fictif',
        recorded_at: '2026-11-12',
      },
    ],
    creators: demoCreators,
    applications: [],
    owner: true,
  };
}
export function safePublicUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && !u.username && !u.password;
  } catch {
    return false;
  }
}
