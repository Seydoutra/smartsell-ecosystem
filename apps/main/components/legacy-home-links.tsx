'use client';
import { useEffect } from 'react';
import {
  locale,
  withBasePath,
  urlFor,
  routingConfig,
} from '@smartsell/routing';
/** Keep previously shared homepage hashes useful after moving detailed sections. */
const legacyIds = [
  'services',
  'solutions',
  'produits',
  'portfolio',
  'methode',
  'manifeste',
  'vision',
  'brief',
  'parcours',
  'apercus',
];
export function LegacyHomeLinks() {
  useEffect(() => {
    const destinations: Record<string, string> = {
      services: urlFor('agency', locale, 'services', routingConfig),
      solutions: withBasePath(`/${locale}/products/`),
      produits: withBasePath(`/${locale}/products/`),
      portfolio: urlFor('agency', locale, 'work', routingConfig),
      methode: withBasePath(`/${locale}/about/#methode`),
      manifeste: withBasePath(`/${locale}/about/#conviction`),
      vision: withBasePath(`/${locale}/about/`),
      brief: withBasePath(`/${locale}/contact/#brief`),
      parcours: withBasePath(`/${locale}/explore/#parcours`),
      apercus: withBasePath(`/${locale}/explore/`),
    };
    const resolve = () => {
      const target = destinations[window.location.hash.slice(1)];
      if (target) window.location.replace(target);
    };
    resolve();
    window.addEventListener('hashchange', resolve);
    return () => window.removeEventListener('hashchange', resolve);
  }, []);
  return (
    <div hidden aria-hidden="true">
      {legacyIds.map((id) => (
        <span id={id} key={id} />
      ))}
    </div>
  );
}
