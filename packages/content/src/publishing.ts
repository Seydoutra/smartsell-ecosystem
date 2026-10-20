import { locale } from '@smartsell/routing';
import snapshot from './published.json';
import type { Photo } from './photos';
type Row = Record<string, unknown>;
const catalog = snapshot as Record<string, Record<string, Row[]>>;
function localized(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(localized);
  if (value && typeof value === 'object') {
    const row = value as Row;
    if ('fr' in row && 'en' in row) return localized(row[locale]);
    return Object.fromEntries(
      Object.entries(row)
        .filter(([key]) => key !== '_admin')
        .map(([key, v]) => [key, localized(v)]),
    );
  }
  return value;
}
function photo(ref: unknown, alt: string): Photo {
  const value = String(ref || '');
  if (value.startsWith('https://'))
    return {
      id: value,
      url: value,
      alt,
      credit: 'Smartsell',
      ratio: 'landscape',
    };
  if (value.startsWith('unsplash:'))
    return { id: value.slice(9), alt, credit: 'Unsplash', ratio: 'landscape' };
  const file = value.replace(/^local:/, '');
  return { id: file, file, alt, credit: 'Smartsell', ratio: 'landscape' };
}
/** Called once at module initialization, before route generation and rendering. */
export function applyPublished<T>(
  target: T[],
  site: string,
  collection: string,
) {
  const values = catalog[site]?.[collection];
  if (!values) return;
  const rows = values.map((raw) => {
    const row = localized(raw) as Row;
    if (collection === 'clients') return String(row.name);
    const alt = String(row.title || row.name || '');
    for (const key of ['photo', 'shot'])
      if (key in row) row[key] = photo(row[key], alt);
    for (const key of ['photos', 'pages', 'shots'])
      if (Array.isArray(row[key]))
        row[key] = (row[key] as unknown[]).map((x) => photo(x, alt));
    if (collection === 'films') {
      const ref = String(row.clip);
      row.clip = { src: ref, poster: ref.startsWith('https://') ? '' : ref };
    }
    const original = (target as Row[]).find(
      (value) => typeof value === 'object' && value?.slug === row.slug,
    );
    for (const key of ['photo', 'shot']) {
      const previous = original?.[key] as Photo | undefined;
      const next = row[key] as Photo | undefined;
      if (previous && next && previous.id === next.id) row[key] = previous;
    }
    for (const key of ['photos', 'pages', 'shots']) {
      const previous = original?.[key];
      if (Array.isArray(previous) && Array.isArray(row[key]))
        row[key] = (row[key] as Photo[]).map(
          (next) => previous.find((old) => old.id === next.id) || next,
        );
    }
    if (collection === 'spaces') row.symbol = original?.symbol || '';
    return { ...original, ...row };
  });
  target.splice(0, target.length, ...(rows as T[]));
}
