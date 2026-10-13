/*
 * Exporte les contenus du site pour l'espace d'administration.
 * Lancé une fois par langue (NEXT_PUBLIC_LOCALE=fr puis en) ; le second
 * passage fusionne les deux langues dans apps/main/public/admin/content.json.
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  agencyServices,
  articles,
  spaces,
  packs,
} from '../packages/content/src/sites';
import { courses, corporateOffers } from '../packages/content/src/academy';
import {
  brands,
  clients,
  films,
  products,
  shootSeries,
  websites,
} from '../packages/content/src/portfolio';
import type { Photo } from '../packages/content/src/photos';

const locale = process.env.NEXT_PUBLIC_LOCALE === 'en' ? 'en' : 'fr';
const img = (p: Photo) => (p.file ? `local:${p.file}` : `unsplash:${p.id}`);

const snapshot = {
  agency: {
    services: agencyServices.map((s) => ({ ...s })),
    brands: brands.map((b) => ({ ...b, pages: b.pages.map(img) })),
    websites: websites.map((w) => ({ ...w, shot: img(w.shot) })),
    clients: clients.map((name) => ({ name })),
    series: shootSeries.map((s) => ({ ...s, photos: s.photos.map(img) })),
  },
  academy: {
    courses: courses.map((c) => ({ ...c, photo: img(c.photo) })),
    offers: corporateOffers.map((o) => ({ ...o, photo: img(o.photo) })),
  },
  media: {
    films: films.map((f) => ({ ...f, clip: f.clip.src })),
    articles: articles.map((a) => ({
      slug: a.slug,
      category: a.category,
      title: a.title,
      summary: a.summary,
      minutes: a.minutes,
      paragraphs: a.paragraphs,
    })),
  },
  studio: {
    spaces: spaces.map((s) => ({
      slug: s.slug,
      title: s.title,
      copy: s.copy,
      use: s.use,
      equipment: s.equipment,
    })),
    packs: packs.map((p) => ({ ...p })),
  },
  labs: {
    products: products.map((p) => ({ ...p, shots: p.shots.map(img) })),
  },
};

const dir = path.join('apps', 'main', 'public', 'admin');
fs.mkdirSync(dir, { recursive: true });
const part = path.join(dir, `.content-${locale}.json`);
fs.writeFileSync(part, JSON.stringify(snapshot));

// Fusion : une valeur qui diffère entre les langues devient { fr, en }.
type Json = unknown;
const merge = (fr: Json, en: Json): Json => {
  if (Array.isArray(fr) && Array.isArray(en))
    return typeof fr[0] === 'object' && fr[0] !== null
      ? fr.map((x, i) => merge(x, en[i]))
      : JSON.stringify(fr) === JSON.stringify(en)
        ? fr
        : { fr, en };
  if (fr && en && typeof fr === 'object' && typeof en === 'object')
    return Object.fromEntries(
      Object.keys(fr).map((k) => [
        k,
        merge((fr as Record<string, Json>)[k], (en as Record<string, Json>)[k]),
      ]),
    );
  return fr === en ? fr : { fr, en };
};
const other = path.join(dir, `.content-${locale === 'fr' ? 'en' : 'fr'}.json`);
if (fs.existsSync(other)) {
  const a = JSON.parse(fs.readFileSync(part, 'utf8'));
  const b = JSON.parse(fs.readFileSync(other, 'utf8'));
  const [fr, en] = locale === 'fr' ? [a, b] : [b, a];
  fs.writeFileSync(
    path.join(dir, 'content.json'),
    JSON.stringify({ data: merge(fr, en) }),
  );
  fs.rmSync(path.join(dir, '.content-fr.json'));
  fs.rmSync(path.join(dir, '.content-en.json'));
}
console.log(`Contenus exportés (${locale}).`);
