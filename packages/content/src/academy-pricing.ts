import defaults from './academy-pricing-defaults.json';
import published from './published.json';
export type Pricing = typeof defaults;
export type ModulePricing = Pricing['courses'][number];
export const freeFilmSlugs = ['court-metrage-ia', 'court-metrage-ia-complet'];
export const defaultPricing: Pricing = defaults;
export const normalizePricing = (value: unknown): unknown =>
  !value ||
  (typeof value === 'object' &&
    !Array.isArray(value) &&
    (value as { version?: unknown }).version !== 2)
    ? structuredClone(defaults)
    : value;
const object = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);
const money = (v: unknown) =>
  typeof v === 'number' && Number.isSafeInteger(v) && v >= 0 && v <= 100000000;
const bilingual = (v: unknown) =>
  object(v) &&
  ['fr', 'en'].every(
    (k) =>
      typeof v[k] === 'string' &&
      (v[k] as string).trim().length > 0 &&
      (v[k] as string).length <= 120,
  );
export function coursePrice(
  config: Pricing,
  slug: string,
  now = Date.now(),
): number {
  if (freeFilmSlugs.includes(slug)) return 0;
  const row = config.courses.find((c) => c.slug === slug);
  if (!row) return 0;
  const promo = row.promotion;
  return promo.enabled &&
    now >= Date.parse(promo.start) &&
    now < Date.parse(promo.end)
    ? promo.price
    : row.price;
}
const validDate = (value: string) =>
  Number.isFinite(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 16) === value.slice(0, 16);
export function pricingErrors(value: unknown): string[] {
  if (!object(value)) return ['Configuration des prix invalide.'];
  const errors: string[] = [];
  const fail = (ok: unknown, message: string) => {
    if (!ok) errors.push(message);
  };
  fail(
    value.version === 2 && value.currency === 'GNF',
    'Version 2 et devise GNF requises.',
  );
  const rows = Array.isArray(value.courses) ? value.courses : [];
  fail(
    rows.length === defaults.courses.length &&
      defaults.courses.every(
        (c) => rows.filter((x) => object(x) && x.slug === c.slug).length === 1,
      ),
    'Tous les modules du catalogue sont requis, sans doublon.',
  );
  for (const row of rows) {
    if (!object(row)) {
      errors.push('Module invalide.');
      continue;
    }
    fail(
      money(row.price),
      'Prix du module : entier entre 0 et 100 000 000 GNF (0 = gratuit).',
    );
    const p = row.promotion;
    if (!object(p)) {
      errors.push('Promotion invalide.');
      continue;
    }
    fail(
      typeof p.enabled === 'boolean' &&
        money(p.price) &&
        typeof p.start === 'string' &&
        typeof p.end === 'string',
      'Promotion : montant et dates valides requis.',
    );
    if (p.enabled)
      fail(
        money(row.price) &&
          Number(row.price) > 0 &&
          money(p.price) &&
          Number(p.price) < Number(row.price) &&
          typeof p.start === 'string' &&
          typeof p.end === 'string' &&
          /^\d{4}-\d\d-\d\dT\d\d:\d\d:00Z$/.test(p.start) &&
          /^\d{4}-\d\d-\d\dT\d\d:\d\d:00Z$/.test(p.end) &&
          validDate(p.start) &&
          validDate(p.end) &&
          Date.parse(p.end) > Date.parse(p.start),
        'Une promotion doit réduire un prix payant et avoir une date de fin après son début (UTC).',
      );
    if (freeFilmSlugs.includes(String(row.slug)))
      fail(
        row.price === 0 && p.enabled === false && p.price === 0,
        'Le court-métrage IA doit rester gratuit, sans promotion payante.',
      );
  }
  const sub = value.subscription;
  fail(
    object(sub) && sub.status === 'coming_soon' && sub.catalog === 'all',
    'L’abonnement futur doit rester inactif et couvrir tout le catalogue.',
  );
  const plans = object(sub) && Array.isArray(sub.plans) ? sub.plans : [];
  const seen = new Set<string>();
  fail(
    plans.length >= 1 && plans.length <= 12,
    'Prévoir de 1 à 12 périodes d’abonnement.',
  );
  for (const plan of plans) {
    if (!object(plan)) {
      errors.push('Période invalide.');
      continue;
    }
    fail(
      typeof plan.id === 'string' &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(plan.id) &&
        !seen.has(plan.id) &&
        bilingual(plan.name) &&
        Number.isInteger(plan.durationDays) &&
        Number(plan.durationDays) >= 1 &&
        Number(plan.durationDays) <= 1095 &&
        money(plan.price),
      'Abonnement : nom FR/EN, période de 1 à 1 095 jours et montant entier requis.',
    );
    seen.add(String(plan.id));
  }
  return [...new Set(errors)];
}
const snapshot = published as Record<
  string,
  Record<string, { configuration?: unknown }[]>
>;
const candidate = snapshot.academy?.pricing?.[0]?.configuration;
// Older tier-based snapshots predate the user's correction: start every module free.
const current =
  object(candidate) && candidate.version === 2 ? candidate : defaults;
if (pricingErrors(current).length)
  throw new Error('Les prix publiés sont invalides.');
export const academyPricing = current as Pricing;
export const pricingItem = {
  slug: 'academy-pricing',
  title: { fr: 'Prix et promotions', en: 'Prices and promotions' },
  configuration: academyPricing,
};
export const formatGNF = (amount: number, lang = 'fr') =>
  `${new Intl.NumberFormat(lang === 'fr' ? 'fr-GN' : 'en-GB').format(amount)} GNF`;
