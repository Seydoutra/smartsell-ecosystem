'use client';
import { LangSwitch, ThemeToggle } from './signature';
import { Icon } from './icons';
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { verticals, searchEntries } from '@smartsell/content';
import {
  withBasePath,
  routingConfig,
  urlFor,
  locale,
  t,
} from '@smartsell/routing';
import type { VerticalId } from '@smartsell/types';
import { Brand } from './brand';
function closeOnEscape(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key === 'Escape') {
    event.preventDefault();
    event.currentTarget.close();
  }
}
export function GlobalNavigation({ active }: { active?: VerticalId }) {
  const menu = useRef<HTMLDialogElement>(null),
    search = useRef<HTMLDialogElement>(null),
    disclosure = useRef<HTMLDetailsElement>(null);
  const [query, setQuery] = useState('');
  const normalized = query
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
  const results = searchEntries.filter((entry) =>
    `${entry.title} ${entry.summary}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .includes(normalized),
  );
  return (
    <>
      <a className="skip-link" href="#main">
        {t('Aller au contenu', 'Skip to content')}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="home-link"
            href={withBasePath(`/${locale}/`)}
            aria-label={t('Smartsell, accueil', 'Smartsell, home')}
          >
            <Brand variant="yellow" />
          </a>
          <nav
            className="desktop-universes"
            aria-label={t('Navigation globale', 'Main navigation')}
          >
            {verticals.map((v) => (
              <a
                aria-current={active === v.id ? 'page' : undefined}
                key={v.id}
                href={urlFor(v.id, locale, '', routingConfig)}
              >
                {v.name}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <a
              className="header-quote"
              href={urlFor('agency', locale, 'contact', routingConfig)}
            >
              {t('Demander un devis', 'Get a quote')}{' '}
              <span aria-hidden="true">
                <Icon name="arrowUpRight" />
              </span>
            </a>
            <button
              className="search-trigger"
              type="button"
              aria-haspopup="dialog"
              onClick={() => search.current?.showModal()}
            >
              {t('Rechercher', 'Search')}{' '}
              <span aria-hidden="true">
                <Icon name="search" />
              </span>
            </button>
            <LangSwitch />
            <button
              className="menu-trigger"
              type="button"
              aria-haspopup="dialog"
              onClick={() => menu.current?.showModal()}
            >
              Menu{' '}
              <span aria-hidden="true">
                <Icon name="menu" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div className="local-bar">
        <div className="container local-inner">
          <span>
            {active
              ? `SMARTSELL ${verticals.find((v) => v.id === active)?.name.toUpperCase()}`
              : t(
                  'AGENCE DE COMMUNICATION & MARKETING DIGITAL',
                  'COMMUNICATION & DIGITAL MARKETING AGENCY',
                )}
          </span>
          <details
            ref={disclosure}
            className="ecosystem-disclosure"
            onKeyDown={(event) => {
              if (event.key === 'Escape' && disclosure.current) {
                disclosure.current.open = false;
                disclosure.current.querySelector('summary')?.focus();
              }
            }}
          >
            <summary>
              {t('Tout l’écosystème', 'The whole ecosystem')}{' '}
              <span aria-hidden="true">+</span>
            </summary>
            <nav
              aria-label={t('Explorer les univers', 'Explore the universes')}
              className="mega-menu"
            >
              {verticals.map((v) => (
                <a key={v.id} href={urlFor(v.id, locale, '', routingConfig)}>
                  <small>
                    {v.number} / {v.verb}
                  </small>
                  <strong>{v.name}</strong>
                  <span>
                    {v.journey} <Icon name="arrowUpRight" />
                  </span>
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
      <dialog
        ref={menu}
        className="site-dialog menu-dialog"
        aria-labelledby="menu-title"
        onKeyDown={closeOnEscape}
      >
        <div className="dialog-heading">
          <h2 id="menu-title">
            {t('Explorez l’écosystème.', 'Explore the ecosystem.')}
          </h2>
          <button
            aria-label={t('Fermer le menu', 'Close the menu')}
            onClick={() => menu.current?.close()}
          >
            ×
          </button>
        </div>
        <nav aria-label={t('Navigation mobile', 'Mobile navigation')}>
          <a
            href={withBasePath(`/${locale}/`)}
            onClick={() => menu.current?.close()}
          >
            La maison{' '}
            <span>
              <Icon name="arrowUpRight" />
            </span>
          </a>
          {verticals.map((v) => (
            <a
              key={v.id}
              href={urlFor(v.id, locale, '', routingConfig)}
              onClick={() => menu.current?.close()}
            >
              <span>
                <small>
                  {v.number} / {v.verb}
                </small>
                {v.name}
              </span>
              <span>
                <Icon name="arrowUpRight" />
              </span>
            </a>
          ))}
        </nav>
        <button
          className="button button--primary"
          type="button"
          onClick={() => {
            menu.current?.close();
            search.current?.showModal();
          }}
        >
          Rechercher dans l’écosystème{' '}
          <span aria-hidden="true">
            <Icon name="search" />
          </span>
        </button>
        <p>
          {t(
            'Une maison. Cinq façons d’avancer.',
            'One house. Five ways forward.',
          )}
        </p>
      </dialog>
      <dialog
        ref={search}
        className="site-dialog search-dialog"
        aria-labelledby="search-title"
        onKeyDown={closeOnEscape}
        onClose={() => setQuery('')}
      >
        <div className="dialog-heading">
          <h2 id="search-title">
            {t('Que cherchez-vous ?', 'What are you looking for?')}
          </h2>
          <button
            aria-label={t('Fermer la recherche', 'Close search')}
            onClick={() => search.current?.close()}
          >
            ×
          </button>
        </div>
        <label className="search-label" htmlFor="ecosystem-search">
          {t(
            'Rechercher un site, une page ou un produit',
            'Search for a site, a page or a product',
          )}
        </label>
        <input
          id="ecosystem-search"
          type="search"
          placeholder={t(
            'Essayez « design », « IA » ou « Management »',
            'Try “design”, “AI” or “Management”',
          )}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
          autoComplete="off"
        />
        <p className="search-count" aria-live="polite">
          {results.length} résultat{results.length > 1 ? 's' : ''}
        </p>
        <ul className="search-results">
          {results.map((entry) => (
            <li key={`${entry.url}-${entry.title}`}>
              <a href={entry.url} onClick={() => search.current?.close()}>
                <small>{entry.type}</small>
                <strong>{entry.title}</strong>
                <span>{entry.summary}</span>
              </a>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p>
            {t(
              'Aucun résultat. Essayez un autre mot ou explorez les cinq univers.',
              'No results. Try another word or explore the five universes.',
            )}
          </p>
        )}
      </dialog>
    </>
  );
}
