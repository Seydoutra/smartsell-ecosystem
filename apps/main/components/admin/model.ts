import {
  pricingItem,
  pricingErrors,
  normalizePricing,
} from '@smartsell/content/pricing';
import { modules, type Collection, type Field } from './schema';

export type Item = Record<string, unknown>;
export type Data = Record<string, Record<string, Item[]>>;
export type Bi = { fr: unknown; en: unknown };
export type Status = 'draft' | 'review' | 'published' | 'archived';
export type Meta = { id: string; status: Status; updatedAt?: string };
export type Activity = { at: string; text: string };
export type RequestItem = {
  id: string;
  site: string;
  subject: string;
  name: string;
  email: string;
  status: 'new' | 'qualified' | 'in_progress' | 'closed';
  priority: 'normal' | 'high';
  assignee: string;
  due: string;
  notes: string;
  created_at: string;
};
export type Member = {
  user_id: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
};
export const statusLabels: Record<Status, [string, string]> = {
  draft: ['Brouillon', 'Draft'],
  review: ['À relire', 'In review'],
  published: ['Prêt à publier', 'Ready to publish'],
  archived: ['Archivé', 'Archived'],
};
export const isBi = (v: unknown): v is Bi =>
  !!v && typeof v === 'object' && !Array.isArray(v) && 'fr' in v && 'en' in v;
export const text = (v: unknown, lang: 'fr' | 'en' = 'fr'): string => {
  const x = isBi(v) ? v[lang] : v;
  return Array.isArray(x) ? x.join(' · ') : x == null ? '' : String(x);
};
export function normalize(field: Field, value: unknown): unknown {
  if (field.type === 'academy-pricing') return normalizePricing(value);
  if (field.type === 'group')
    return (Array.isArray(value) ? value : []).map((row) =>
      Object.fromEntries(
        (field.fields || []).map((f) => [
          f.key,
          normalize(f, (row as Item)[f.key]),
        ]),
      ),
    );
  const empty = ['list', 'images'].includes(field.type)
    ? []
    : field.type === 'bool'
      ? false
      : '';
  if (field.i18n)
    return isBi(value) ? value : { fr: value ?? empty, en: value ?? empty };
  return (isBi(value) ? value.fr : value) ?? empty;
}
export const blank = (c: Collection): Item => ({
  ...Object.fromEntries(c.fields.map((f) => [f.key, normalize(f, undefined)])),
  _admin: { id: crypto.randomUUID(), status: 'draft' },
});
export function meta(item: Item): Meta {
  const value = item._admin as Meta | undefined;
  return value &&
    typeof value.id === 'string' &&
    Object.hasOwn(statusLabels, value.status)
    ? value
    : { id: String(item.slug || item.name || ''), status: 'published' };
}
export function normalizeData(input: unknown): Data {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    throw new Error('Format de contenu invalide.');
  const data = input as Data;
  const clean: Data = {};
  for (const m of modules) {
    if (!data[m.id] || typeof data[m.id] !== 'object')
      throw new Error(`Module absent : ${m.name}`);
    clean[m.id] = {};
    for (const c of m.collections) {
      const rows =
        data[m.id][c.id] ??
        (m.id === 'academy' && c.id === 'pricing' ? [pricingItem] : undefined);
      if (!Array.isArray(rows) || rows.length > 2000)
        throw new Error(`Collection invalide : ${m.name}/${c.id}`);
      clean[m.id][c.id] = rows.map((item, i) => {
        if (!item || typeof item !== 'object' || Array.isArray(item))
          throw new Error('Contenu invalide.');
        return {
          ...Object.fromEntries(
            c.fields.map((f) => [f.key, normalize(f, item[f.key])]),
          ),
          _admin: {
            ...meta(item),
            id: meta(item).id || `${m.id}-${c.id}-${i}`,
          },
        };
      });
    }
  }
  return clean;
}
export function validateItem(
  c: Collection,
  item: Item,
  siblings: Item[],
  ownId?: string,
): string[] {
  const errors: string[] =
    c.id === 'pricing' ? pricingErrors(item.configuration) : [];
  for (const lang of ['fr', 'en'] as const)
    if (!text(item[c.titleKey], lang).trim())
      errors.push(`Titre requis (${lang.toUpperCase()}).`);
  if (c.fields.some((f) => f.key === 'slug')) {
    const slug = text(item.slug);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
      errors.push('Identifiant : minuscules, chiffres et tirets uniquement.');
    if (siblings.some((x) => meta(x).id !== ownId && x.slug === item.slug))
      errors.push('Cet identifiant est déjà utilisé dans la collection.');
  }
  const check = (fields: Field[], row: Item) => {
    for (const f of fields) {
      const value = row[f.key];
      if (f.type === 'group' && Array.isArray(value))
        value.forEach((v) => check(f.fields || [], v as Item));
      if (
        f.type === 'number' &&
        value != null &&
        value !== '' &&
        (typeof value !== 'number' || !Number.isFinite(value) || value < 0)
      )
        errors.push(`${f.label} : nombre positif requis.`);
      if (f.type === 'url' && value) {
        try {
          const url = new URL(String(value));
          if (
            !['https:', 'http:'].includes(url.protocol) ||
            url.username ||
            url.password
          )
            throw new Error();
        } catch {
          errors.push(`${f.label} : adresse HTTP(S) valide requise.`);
        }
      }
      if (f.type === 'select' && !f.options?.includes(String(value)))
        errors.push(`${f.label} : choisissez une option.`);
      if (['image', 'images', 'video'].includes(f.type)) {
        const refs = Array.isArray(value) ? value : [value];
        for (const ref of refs)
          if (
            ref &&
            !/^(local:[a-zA-Z0-9/_-]+|unsplash:[a-zA-Z0-9_-]+|https:\/\/[^\s]+|[a-zA-Z0-9/_-]+)$/.test(
              String(ref),
            )
          )
            errors.push(
              `${f.label} : référence de média non durable ou invalide.`,
            );
      }
    }
    if (Array.isArray(row.options) || isBi(row.options)) {
      const options = isBi(row.options) ? row.options.fr : row.options;
      if (
        typeof row.answer === 'number' &&
        (row.answer >= (options as unknown[]).length ||
          !Number.isInteger(row.answer))
      )
        errors.push('Quiz : la bonne réponse doit correspondre à une option.');
    }
  };
  check(c.fields, item);
  return [...new Set(errors)];
}
export function publicationErrors(data: Data): string[] {
  return modules.flatMap((m) =>
    m.collections.flatMap((c) =>
      data[m.id][c.id]
        .filter((x) => meta(x).status === 'published')
        .flatMap((x) =>
          validateItem(c, x, data[m.id][c.id], meta(x).id).map(
            (e) => `${m.name} / ${text(x[c.titleKey])} : ${e}`,
          ),
        ),
    ),
  );
}
export function publicData(data: Data): Data {
  return Object.fromEntries(
    modules.map((m) => [
      m.id,
      Object.fromEntries(
        m.collections.map((c) => [
          c.id,
          data[m.id][c.id]
            .filter((x) => meta(x).status === 'published')
            .map(({ _admin, ...item }) => item),
        ]),
      ),
    ]),
  );
}
export const allItems = (data: Data) =>
  modules.flatMap((m) =>
    m.collections.flatMap((c) =>
      data[m.id][c.id].map((item) => ({ module: m, collection: c, item })),
    ),
  );
export function collectMedia(data: Data) {
  const images = new Set<string>(),
    clips = new Set<string>();
  for (const { collection, item } of allItems(data))
    for (const f of collection.fields) {
      const v = item[f.key];
      if (f.type === 'image' && v) images.add(String(v));
      if (f.type === 'images' && Array.isArray(v))
        v.forEach((x) => images.add(String(x)));
      if (f.type === 'video' && v) clips.add(String(v));
    }
  return { images: [...images], clips: [...clips] };
}
export function requestErrors(r: RequestItem): string[] {
  return [
    !r.subject.trim() && 'Objet requis.',
    !r.name.trim() && 'Nom requis.',
    r.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email) && 'Email invalide.',
    !modules.some((m) => m.id === r.site) && 'Univers invalide.',
  ].filter(Boolean) as string[];
}
