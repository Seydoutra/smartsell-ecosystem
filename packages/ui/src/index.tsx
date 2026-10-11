import { Icon } from './icons';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { verticals } from '@smartsell/content';
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
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a
            href={withBasePath(`/${locale}/`)}
            aria-label={t('Smartsell, accueil', 'Smartsell, home')}
          >
            <Brand variant="white" />
          </a>
          <p>
            {t('Avec vous,', 'With you,')}
            <br />
            {t('de bout en bout.', 'from start to finish.')}
          </p>
          <span>
            {t('Conakry, Guinée.', 'Conakry, Guinea.')}
            <br />
            {t(
              'Agence de communication & marketing digital.',
              'Communication & digital marketing agency.',
            )}
          </span>
        </div>
        <nav
          aria-label={t(
            'Univers dans le pied de page',
            'Universes in the footer',
          )}
        >
          <p className="eyebrow">{t('L’écosystème', 'The ecosystem')}</p>
          {verticals.map((v) => (
            <a key={v.id} href={urlFor(v.id, locale, '', routingConfig)}>
              {v.name}
              <span aria-hidden="true">
                <Icon name="arrowUpRight" />
              </span>
            </a>
          ))}
        </nav>
        <nav aria-label={t('La maison', 'The house')}>
          <p className="eyebrow">{t('La maison', 'The house')}</p>
          <a href={withBasePath(`/${locale}/#services`)}>
            {t('Nos expertises', 'Our expertise')}
          </a>
          <a href={withBasePath(`/${locale}/#methode`)}>
            {t('Notre méthode', 'Our method')}
          </a>
          <a href={withBasePath(`/${locale}/#manifeste`)}>
            {t('Notre conviction', 'Our conviction')}
          </a>
          <a href={withBasePath(`/${locale}/#ecosystem`)}>
            {t('Nos cinq univers', 'Our five universes')}
          </a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getUTCFullYear()} Smartsell</span>
        <span>
          {t(
            'Créer. Apprendre. Comprendre. Produire. Innover.',
            'Create. Learn. Understand. Produce. Innovate.',
          )}
        </span>
        <a href="#top">
          {t('Retour en haut', 'Back to top')} <Icon name="arrowUp" />
        </a>
      </div>
    </footer>
  );
}
