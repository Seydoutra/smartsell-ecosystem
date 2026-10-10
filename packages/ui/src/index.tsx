import { Icon } from './icons';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { verticals } from '@smartsell/content';
import {
  urlFor,
  withBasePath,
  routingConfig,
  locale,
} from '@smartsell/routing';
export { GlobalNavigation } from './navigation';
export { Brand } from './brand';
import { Brand } from './brand';
import { MotionText } from './sites/visuals';
export function ButtonLink({
  children,
  tone = 'primary',
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  tone?: 'primary' | 'secondary' | 'text';
}) {
  return (
    <a className={`button button--${tone} ${className}`} {...props}>
      {children}
      <span aria-hidden="true">
        <Icon name="arrowUpRight" />
      </span>
    </a>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  description,
  inverse = false,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
  inverse?: boolean;
}) {
  return (
    <div
      className={`section-heading ${inverse ? 'section-heading--inverse' : ''}`}
      data-reveal
    >
      <p className="eyebrow">
        <span>{number}</span> / {label}
      </p>
      <div>
        <h2>
          <MotionText text={title} />
        </h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href={withBasePath(`/${locale}/`)} aria-label="Smartsell, accueil">
            <Brand variant="white" />
          </a>
          <p>
            Avec vous,
            <br />
            de bout en bout.
          </p>
          <span>
            Conakry, Guinée.
            <br />
            Agence de communication & marketing digital.
          </span>
        </div>
        <nav aria-label="Univers dans le pied de page">
          <p className="eyebrow">L’écosystème</p>
          {verticals.map((v) => (
            <a key={v.id} href={urlFor(v.id, locale, '', routingConfig)}>
              {v.name}
              <span aria-hidden="true">
                <Icon name="arrowUpRight" />
              </span>
            </a>
          ))}
        </nav>
        <nav aria-label="La maison">
          <p className="eyebrow">La maison</p>
          <a href={withBasePath(`/${locale}/#services`)}>Nos expertises</a>
          <a href={withBasePath(`/${locale}/#methode`)}>Notre méthode</a>
          <a href={withBasePath(`/${locale}/#manifeste`)}>Notre conviction</a>
          <a href={withBasePath(`/${locale}/#ecosystem`)}>Nos cinq univers</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getUTCFullYear()} Smartsell</span>
        <span>Créer. Apprendre. Comprendre. Produire. Innover.</span>
        <a href="#top">
          Retour en haut <Icon name="arrowUp" />
        </a>
      </div>
    </footer>
  );
}
