import type { Metadata } from 'next';
import {
  locale,
  t,
  withBasePath,
  urlFor,
  routingConfig,
} from '@smartsell/routing';
import { products } from '@smartsell/content/portfolio';
import { Img, CtaLink } from '@smartsell/ui/immersive';
export const metadata: Metadata = {
  title: t('Produits Smartsell', 'Smartsell products'),
  description: t(
    'Découvrez Management, Kuma, Obtura et Garant, les produits numériques de Smartsell Labs.',
    'Discover Management, Kuma, Obtura and Garant, the digital products from Smartsell Labs.',
  ),
  alternates: { canonical: withBasePath(`/${locale}/products/`) },
};
export default function Products() {
  return (
    <main id="main" data-kin-off className="house-page">
      <header className="house-page-hero house-wrap">
        <p className="house-label">
          SMARTSELL LABS / {t('PRODUITS', 'PRODUCTS')}
        </p>
        <h1>
          {t(
            'Des outils utiles.\nDes problèmes réels.',
            'Useful tools.\nReal problems.',
          )}
        </h1>
        <p>
          {t(
            'Les produits numériques de la maison Smartsell. Chacun garde son espace, ses fonctionnalités et son propre parcours.',
            'The digital products from the Smartsell house. Each keeps its own space, features and journey.',
          )}
        </p>
      </header>
      <div className="house-wrap house-product-grid">
        {products.map((p) => (
          <article key={p.slug} className="house-product">
            <div>
              <Img photo={p.shots[0]} width={900} />
            </div>
            <p className="house-label">{p.status}</p>
            <h2>{p.name}</h2>
            <h3>{p.tagline}</h3>
            <p>{p.pitch}</p>
            <CtaLink href={p.url}>{p.cta}</CtaLink>
          </article>
        ))}
      </div>
      <aside className="house-wrap house-page-section">
        <p>
          {t(
            'Labs continue d’explorer la recherche, l’IA et l’automatisation.',
            'Labs continues to explore research, AI and automation.',
          )}
        </p>
        <a href={urlFor('labs', locale, '', routingConfig)}>
          {t('Explorer Smartsell Labs', 'Explore Smartsell Labs')} ↗
        </a>
      </aside>
    </main>
  );
}
