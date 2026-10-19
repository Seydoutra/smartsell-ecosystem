import { Icon } from './icons';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { primaryVerticals } from '@smartsell/content';
import {
  urlFor,
  withBasePath,
  routingConfig,
  locale,
  t,
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
    <footer className="house-footer">
      <div className="container house-footer-grid">
        <div>
          <a
            href={withBasePath(`/${locale}/`)}
            aria-label={t('Smartsell, accueil', 'Smartsell, home')}
          >
            <Brand variant="white" />
          </a>
          <p>
            {t('Une maison. Quatre univers.', 'One house. Four universes.')}
          </p>
          <small>{t('Conakry, Guinée.', 'Conakry, Guinea.')}</small>
        </div>
        <nav
          aria-label={t(
            'Univers dans le pied de page',
            'Universes in the footer',
          )}
        >
          <p>{t('LES UNIVERS', 'THE UNIVERSES')}</p>
          {primaryVerticals.map((v) => (
            <a key={v.id} href={urlFor(v.id, locale, '', routingConfig)}>
              {v.name} ↗
            </a>
          ))}
        </nav>
        <nav aria-label={t('La maison', 'The house')}>
          <p>SMARTSELL</p>
          <a href={withBasePath(`/${locale}/about/`)}>
            {t('À propos', 'About')}
          </a>
          <a href={withBasePath(`/${locale}/contact/`)}>Contact</a>
          <a href={withBasePath(`/${locale}/products/`)}>
            {t('Produits', 'Products')} ↗
          </a>
          <a href={urlFor('agency', locale, 'careers', routingConfig)}>
            {t('Rejoindre le collectif', 'Join the collective')}
          </a>
        </nav>
      </div>
      <div className="container house-footer-bottom">
        <span>© {new Date().getUTCFullYear()} Smartsell</span>
        <nav aria-label={t('Liens complémentaires', 'Additional links')}>
          <a href={withBasePath(`/${locale}/explore/`)}>
            {t('Explorer en détail', 'Explore in detail')}
          </a>
          <a href={urlFor('agency', locale, 'privacy', routingConfig)}>
            {t('Confidentialité', 'Privacy')}
          </a>
          <a href={withBasePath(`/${locale}/explore/#credits`)}>
            {t('Crédits', 'Credits')}
          </a>
          <a href="#top">{t('Retour en haut', 'Back to top')} ↑</a>
        </nav>
      </div>
    </footer>
  );
}
