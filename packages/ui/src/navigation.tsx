'use client';
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { verticals, searchEntries } from '@smartsell/content';
import { withBasePath, routingConfig, urlFor } from '@smartsell/routing';
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
        Aller au contenu
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="home-link"
            href={withBasePath('/fr/')}
            aria-label="Smartsell, accueil"
          >
            <Brand variant="yellow" />
          </a>
          <nav className="desktop-universes" aria-label="Navigation globale">
            {verticals.map((v) => (
              <a
                aria-current={active === v.id ? 'page' : undefined}
                key={v.id}
                href={urlFor(v.id, 'fr', '', routingConfig)}
              >
                {v.name}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a
              className="header-quote"
              href={urlFor('agency', 'fr', 'contact', routingConfig)}
            >
              Demander un devis <span aria-hidden="true">↗</span>
            </a>
            <button
              className="search-trigger"
              type="button"
              aria-haspopup="dialog"
              onClick={() => search.current?.showModal()}
            >
              Rechercher <span aria-hidden="true">⌕</span>
            </button>
            <span className="language" aria-label="Langue : français">
              FR
            </span>
            <button
              className="menu-trigger"
              type="button"
              aria-haspopup="dialog"
              onClick={() => menu.current?.showModal()}
            >
              Menu <span aria-hidden="true">☰</span>
            </button>
          </div>
        </div>
      </header>
      <div className="local-bar">
        <div className="container local-inner">
          <span>
            {active
              ? `SMARTSELL ${verticals.find((v) => v.id === active)?.name.toUpperCase()}`
              : 'AGENCE DE COMMUNICATION & MARKETING DIGITAL'}
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
              Tout l’écosystème <span aria-hidden="true">+</span>
            </summary>
            <nav aria-label="Explorer les univers" className="mega-menu">
              {verticals.map((v) => (
                <a key={v.id} href={urlFor(v.id, 'fr', '', routingConfig)}>
                  <small>
                    {v.number} / {v.verb}
                  </small>
                  <strong>{v.name}</strong>
                  <span>{v.journey} ↗</span>
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
          <h2 id="menu-title">Explorez l’écosystème.</h2>
          <button
            aria-label="Fermer le menu"
            onClick={() => menu.current?.close()}
          >
            ×
          </button>
        </div>
        <nav aria-label="Navigation mobile">
          <a href={withBasePath('/fr/')} onClick={() => menu.current?.close()}>
            La maison <span>↗</span>
          </a>
          {verticals.map((v) => (
            <a
              key={v.id}
              href={urlFor(v.id, 'fr', '', routingConfig)}
              onClick={() => menu.current?.close()}
            >
              <span>
                <small>
                  {v.number} / {v.verb}
                </small>
                {v.name}
              </span>
              <span>↗</span>
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
          Rechercher dans l’écosystème <span aria-hidden="true">⌕</span>
        </button>
        <p>Une maison. Cinq façons d’avancer.</p>
      </dialog>
      <dialog
        ref={search}
        className="site-dialog search-dialog"
        aria-labelledby="search-title"
        onKeyDown={closeOnEscape}
        onClose={() => setQuery('')}
      >
        <div className="dialog-heading">
          <h2 id="search-title">Que cherchez-vous ?</h2>
          <button
            aria-label="Fermer la recherche"
            onClick={() => search.current?.close()}
          >
            ×
          </button>
        </div>
        <label className="search-label" htmlFor="ecosystem-search">
          Rechercher un site, une page ou un produit
        </label>
        <input
          id="ecosystem-search"
          type="search"
          placeholder="Essayez « design », « IA » ou « Management »"
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
            Aucun résultat. Essayez un autre mot ou explorez les cinq univers.
          </p>
        )}
      </dialog>
    </>
  );
}
