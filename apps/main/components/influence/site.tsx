'use client';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Brand } from '@smartsell/ui';
import { Icon } from '@smartsell/ui/icons';
import {
  AccountBoundary,
  platform,
  checked,
  useAccount,
} from '@smartsell/ui/platform';
import { locale, otherLocale, withBasePath, t } from '@smartsell/routing';
import { InfluencePortal } from './portal';
import {
  categories,
  demoCreators,
  influenceHref as href,
  money,
  number,
  type Creator,
} from './model';

export function InfluenceButton({
  children,
  path = '',
  secondary = false,
}: {
  children: ReactNode;
  path?: string;
  secondary?: boolean;
}) {
  return (
    <a
      className={`inf-button ${secondary ? 'inf-secondary' : ''}`}
      href={href(path)}
    >
      {children}
      <Icon name="arrowUpRight" />
    </a>
  );
}
function Picture({
  src,
  alt = '',
  className = '',
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      className={className}
      src={withBasePath(src)}
      alt={alt}
      loading="lazy"
    />
  );
}
export function InfluenceSite({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const portal = ['dashboard', 'creator', 'admin'].includes(path);
  const menus = [
    ['creators', t('Les créateurs', 'Creators')],
    ['method', t('Notre méthode', 'Our approach')],
    ['join', t('Devenir créateur', 'Join as a creator')],
  ];
  return (
    <>
      <a className="inf-skip" href="#main">
        {t('Aller au contenu', 'Skip to content')}
      </a>
      <div className="inf-house">
        <a href={withBasePath(`/${locale}/`)}>
          ← {t('La maison Smartsell', 'The Smartsell house')}
        </a>
        <span>
          CONAKRY ·{' '}
          {t('CRÉATION SANS FRONTIÈRES', 'CREATIVITY WITHOUT BORDERS')}
        </span>
        <a href={withBasePath(`/${locale}/admin/`)}>
          {t('Équipe Smartsell', 'Smartsell team')} ↗
        </a>
      </div>
      <header className="inf-header">
        <a className="inf-brand" href={href()}>
          <Brand />
          <span>
            Influence<span className="inf-brand-dot">●</span>
          </span>
        </a>
        <nav aria-label={t('Navigation Influence', 'Influence navigation')}>
          {menus.map(([p, n]) => (
            <a
              key={p}
              href={href(p)}
              aria-current={path === p ? 'page' : undefined}
            >
              {n}
            </a>
          ))}
        </nav>
        <div className="inf-header-actions">
          <a
            href={withBasePath(
              `/${otherLocale}/influence/${path ? path + '/' : ''}`,
            )}
            lang={otherLocale}
          >
            {otherLocale.toUpperCase()}
          </a>
          <a href={href('dashboard')}>{t('Connexion', 'Sign in')}</a>
          <a className="inf-button" href={href('campaigns/new')}>
            {t('Créer une campagne', 'Create a campaign')} ↗
          </a>
          <button
            className="inf-menu-button"
            aria-expanded={open}
            aria-controls="inf-mobile"
            onClick={() => setOpen(!open)}
          >
            {open ? '×' : '☰'}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </header>
      {open && (
        <nav
          id="inf-mobile"
          className="inf-mobile"
          aria-label={t('Menu mobile', 'Mobile menu')}
        >
          {menus.map(([p, n]) => (
            <a key={p} href={href(p)}>
              {n}
            </a>
          ))}
          <a href={href('dashboard')}>
            {t('Espace entreprise', 'Brand workspace')}
          </a>
          <a href={href('creator')}>
            {t('Espace créateur', 'Creator workspace')}
          </a>
        </nav>
      )}
      <main id="main">
        {path === '' ? (
          <Home />
        ) : path === 'creators' ? (
          <Directory />
        ) : path === 'campaigns/new' ? (
          <Brief />
        ) : path === 'join' ? (
          <Join />
        ) : path === 'method' ? (
          <Method />
        ) : path === 'privacy' ? (
          <Privacy />
        ) : (
          <InfluencePortal
            role={
              path === 'creator'
                ? 'creator'
                : path === 'admin'
                  ? 'admin'
                  : 'client'
            }
          />
        )}
      </main>
      {!portal && (
        <footer className="inf-footer">
          <div>
            <Brand variant="white" />
            <p>
              {t(
                'Des voix singulières. Une direction commune.',
                'Distinctive voices. A shared direction.',
              )}
            </p>
          </div>
          <div>
            <b>Influence</b>
            {menus.map(([p, n]) => (
              <a key={p} href={href(p)}>
                {n}
              </a>
            ))}
          </div>
          <div>
            <b>{t('Vos espaces', 'Your spaces')}</b>
            <a href={href('dashboard')}>{t('Entreprises', 'Brands')}</a>
            <a href={href('creator')}>{t('Créateurs', 'Creators')}</a>
            <a href={href('admin')}>
              {t('Pilotage Smartsell', 'Smartsell operations')}
            </a>
          </div>
          <div>
            <b>Smartsell</b>
            <a href={withBasePath(`/${locale}/contact/`)}>Contact</a>
            <a href={href('privacy')}>
              {t('Données et transparence', 'Data and transparency')}
            </a>
            <small>© {new Date().getFullYear()} Smartsell</small>
          </div>
        </footer>
      )}
    </>
  );
}
function Home() {
  return (
    <>
      <section className="inf-hero">
        <div className="inf-orbit inf-orbit-one" aria-hidden="true" />
        <div className="inf-orbit inf-orbit-two" aria-hidden="true" />
        <div className="inf-hero-copy">
          <p className="inf-eyebrow">
            <span /> SMARTSELL INFLUENCE
          </p>
          <h1>
            {t('Les bonnes voix.', 'The right voices.')}
            <br />
            <em>{t('Le vrai impact.', 'Real impact.')}</em>
          </h1>
          <p className="inf-lead">
            {t(
              'Votre marque a une histoire. Créons les rencontres qui lui donnent de l’écho.',
              'Your brand has a story. Let’s bring it together with the voices that make it resonate.',
            )}
          </p>
          <div className="inf-actions">
            <InfluenceButton path="campaigns/new">
              {t('Lancer mon projet', 'Start my project')}
            </InfluenceButton>
            <InfluenceButton secondary path="creators">
              {t('Rencontrer les créateurs', 'Meet the creators')}
            </InfluenceButton>
          </div>
          <div className="inf-hero-note">
            <div className="inf-avatar-stack">
              {['social-selfie', 'portrait-man', 'social-hearts'].map((x) => (
                <Picture key={x} src={`/media/${x}-sm.jpg`} />
              ))}
            </div>
            <span>
              {t(
                'Pensé pour les marques. Construit avec les créateurs.',
                'Made for brands. Built with creators.',
              )}
            </span>
          </div>
        </div>
        <div className="inf-hero-stage">
          <div className="inf-stage-halo" />
          <div className="inf-main-photo">
            <Picture
              src="/media/social-selfie.jpg"
              alt={t(
                'Créatrice réalisant un contenu au smartphone, photo d’illustration',
                'Creator producing smartphone content, illustrative photograph',
              )}
            />
            <span className="inf-photo-caption">
              {t('L’authenticité se crée.', 'Authenticity is created.')}
            </span>
            <div className="inf-photo-play" aria-hidden="true">
              ✦
            </div>
          </div>
          <div className="inf-float inf-match">
            <span className="inf-float-icon">✦</span>
            <div>
              <b>{t('La bonne rencontre', 'The right match')}</b>
              <small>
                {t(
                  'Marque × créateur × communauté',
                  'Brand × creator × community',
                )}
              </small>
            </div>
          </div>
          <div className="inf-float inf-live">
            <span className="inf-status-dot" />
            <span>
              {t('Chaque étape, sous contrôle', 'Every step, under control')}
            </span>
            <div className="inf-mini-bars" aria-hidden="true">
              {[30, 48, 38, 70, 53, 90, 78].map((n, i) => (
                <i
                  key={i}
                  style={{ height: n + '%', animationDelay: i * 0.15 + 's' }}
                />
              ))}
            </div>
            <small>{t('Du brief au bilan.', 'From brief to report.')}</small>
          </div>
          <div className="inf-sticker">
            CREATE
            <br />
            CONNECT
            <br />
            <em>INFLUENCE.</em>
          </div>
        </div>
      </section>
      <div
        className="inf-marquee"
        aria-label={t('Les formats de campagne', 'Campaign formats')}
      >
        <div>
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i} aria-hidden={i === 1 ? 'true' : undefined}>
              UGC <i>✦</i> REELS <i>✦</i> STORYTELLING <i>✦</i> AMBASSADEURS{' '}
              <i>✦</i> TIKTOK <i>✦</i> ACTIVATIONS <i>✦</i> YOUTUBE <i>✦</i>
            </span>
          ))}
        </div>
      </div>
      <section className="inf-section">
        <div className="inf-section-heading">
          <div>
            <p className="inf-eyebrow">
              01 / {t('LA RENCONTRE', 'THE CONNECTION')}
            </p>
            <h2>
              {t('L’influence commence', 'Influence starts')}
              <br />
              {t('par une affinité.', 'with a connection.')}
            </h2>
          </div>
          <p>
            {t(
              'Une communauté ne se résume pas à un compteur. Nous croisons univers créatif, audience, formats et objectifs pour préparer une collaboration cohérente.',
              'A community is more than a follower count. We bring together creative identity, audience, formats and objectives to shape a relevant collaboration.',
            )}
          </p>
        </div>
        <DemoDirectory />
        <div className="inf-centered">
          <InfluenceButton path="creators" secondary>
            {t('Explorer le répertoire', 'Explore the directory')}
          </InfluenceButton>
        </div>
      </section>
      <section className="inf-dark inf-section">
        <div className="inf-section-heading">
          <div>
            <p className="inf-eyebrow">
              02 / {t('LE PILOTAGE', 'THE WORKSPACE')}
            </p>
            <h2>
              {t('La créativité devant.', 'Creativity up front.')}
              <br />
              <em>{t('La rigueur derrière.', 'Rigour behind it.')}</em>
            </h2>
          </div>
          <p>
            {t(
              'Un brief clair, des engagements documentés, des contenus validés et des résultats lisibles. Chaque collaboration garde son fil.',
              'A clear brief, documented commitments, approved content and readable results. Every collaboration stays on track.',
            )}
          </p>
        </div>
        <WorkspacePreview />
        <div className="inf-workflow-grid">
          {[
            [
              t('Cadrer', 'Define'),
              t(
                'Objectifs, budget, calendrier et sélection des profils.',
                'Objectives, budget, timeline and creator shortlist.',
              ),
            ],
            [
              t('Collaborer', 'Collaborate'),
              t(
                'Missions, livrables, retours et suivi du contrat.',
                'Missions, deliverables, feedback and contract tracking.',
              ),
            ],
            [
              t('Mesurer', 'Measure'),
              t(
                'Résultats sourcés, dépenses enregistrées et recommandations.',
                'Sourced results, recorded expenses and recommendations.',
              ),
            ],
          ].map(([a, b], i) => (
            <article key={a}>
              <span>0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="inf-section inf-dual">
        <div className="inf-dual-image">
          <Picture
            src="/influence/creator-recording.jpg"
            alt={t(
              'Présentation de contenu dans un studio, illustration',
              'Content presentation in a studio, illustration',
            )}
          />
          <span>
            YOUR VOICE.
            <br />
            YOUR NEXT MOVE.
          </span>
        </div>
        <div>
          <p className="inf-eyebrow">
            03 / {t('LES CRÉATEURS', 'THE CREATORS')}
          </p>
          <h2>
            {t('Votre talent mérite', 'Your talent deserves')}
            <br />
            <em>{t('un cadre à sa hauteur.', 'the right support.')}</em>
          </h2>
          <p>
            {t(
              'Retrouvez vos missions, leurs objectifs, les échéances et les retours de la marque dans un même espace. Suivez vos résultats déclarés et distinguez vos honoraires prévus des paiements enregistrés.',
              'Find your missions, objectives, deadlines and brand feedback in one place. Track declared results and separate planned fees from recorded payments.',
            )}
          </p>
          <ul>
            <li>
              {t(
                'Un brief précis pour créer librement',
                'A precise brief with room to create',
              )}
            </li>
            <li>
              {t(
                'Des livrables et des validations traçables',
                'Traceable deliverables and approvals',
              )}
            </li>
            <li>
              {t(
                'Une vision claire de vos revenus',
                'A clear view of your earnings',
              )}
            </li>
          </ul>
          <InfluenceButton path="join">
            {t('Rejoindre les créateurs', 'Join the creators')}
          </InfluenceButton>
        </div>
      </section>
      <section className="inf-section inf-faq">
        <p className="inf-eyebrow">
          {t('LES RÉPONSES UTILES', 'USEFUL ANSWERS')}
        </p>
        <h2>{t('Avant de se lancer.', 'Before we start.')}</h2>
        {[
          [
            t(
              'Comment choisissez-vous les créateurs ?',
              'How are creators selected?',
            ),
            t(
              'La sélection part de votre objectif, des formats souhaités et de l’audience recherchée. Les profils publiés passent une revue Smartsell ; leur disponibilité et leurs conditions sont confirmées avant engagement.',
              'Selection starts with your objective, formats and audience. Published profiles undergo a Smartsell review; availability and terms are confirmed before commitment.',
            ),
          ],
          [
            t(
              'Les statistiques sont-elles automatiques ?',
              'Are statistics automatic?',
            ),
            t(
              'La première version suit les relevés datés accompagnés de preuves fournis pour chaque mission. Ils sont identifiés comme déclaratifs. Une connexion OAuth aux réseaux sociaux demande une intégration et les autorisations du créateur.',
              'This version tracks dated, evidence-backed reports for each mission, labelled as declared data. Social network OAuth connections require an integration and creator permission.',
            ),
          ],
          [
            t(
              'Comment sont suivis les contrats et les paiements ?',
              'How are contracts and payments tracked?',
            ),
            t(
              'Les termes, versions, références de contrat et échéances sont visibles dans la mission. Les paiements sont des écritures enregistrées par Smartsell, avec référence. Aucun paiement ni signature électronique n’est exécuté par ce site.',
              'Terms, versions, contract references and deadlines appear in each mission. Smartsell records payments with references. This site does not execute payments or electronic signatures.',
            ),
          ],
        ].map(([a, b]) => (
          <details key={a}>
            <summary>
              {a}
              <span>+</span>
            </summary>
            <p>{b}</p>
          </details>
        ))}
      </section>
      <section className="inf-final">
        <p className="inf-eyebrow">
          {t('LA PROCHAINE HISTOIRE EST LA VÔTRE', 'YOUR STORY IS NEXT')}
        </p>
        <h2>
          {t('Faisons résonner', 'Let’s amplify')}
          <br />
          <em>{t('votre marque.', 'your brand.')}</em>
        </h2>
        <InfluenceButton path="campaigns/new">
          {t('Parlons de votre campagne', 'Let’s plan your campaign')}
        </InfluenceButton>
      </section>
    </>
  );
}
function DemoDirectory() {
  return (
    <>
      <p className="inf-disclosure">
        {t(
          'Aperçu illustratif · profils et audiences fictifs · photos de modèles',
          'Illustrative preview · fictional profiles and audiences · stock model photographs',
        )}
      </p>
      <div className="inf-creator-grid">
        {demoCreators.map((c, i) => (
          <CreatorCard key={c.id} creator={c} demo index={i} />
        ))}
      </div>
    </>
  );
}
function CreatorCard({
  creator: c,
  demo = false,
  index = 0,
  selected,
  onSelect,
}: {
  creator: Creator;
  demo?: boolean;
  index?: number;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <article className={`inf-creator-card inf-creator-${index % 4}`}>
      <div className="inf-creator-photo">
        <Picture
          src={c.avatar || '/influence/creator-placeholder.svg'}
          alt={
            demo
              ? t(
                  'Photo d’illustration du profil fictif',
                  'Stock photograph for a fictional profile',
                )
              : c.name
          }
        />
        <span className="inf-network">{c.network}</span>
        <span className="inf-creator-index">0{index + 1}</span>
      </div>
      <div className="inf-creator-body">
        <div>
          <h3>{c.name}</h3>
          <span>↗</span>
        </div>
        <p>
          {c.category} · {c.location}
        </p>
        <div className="inf-creator-meta">
          <span>
            {c.followers === null
              ? t('Audience à documenter', 'Audience to document')
              : `${number(c.followers)} ${t('abonnés', 'followers')}`}
          </span>
          <span>{demo ? 'DEMO' : t('Profil revu', 'Reviewed')}</span>
        </div>
        <p className="inf-bio">{c.bio}</p>
        {onSelect ? (
          <button
            className={`inf-button ${selected ? 'inf-secondary' : ''}`}
            onClick={onSelect}
          >
            {selected
              ? t('Retirer de ma sélection', 'Remove from shortlist')
              : t('Sélectionner ce profil', 'Shortlist creator')}
          </button>
        ) : (
          <a
            className="inf-text-link"
            href={href('creators') + (demo ? '?demo=1' : '')}
          >
            {t('Découvrir le profil', 'Explore profile')} ↗
          </a>
        )}
      </div>
    </article>
  );
}
function useDirectory() {
  const [creators, setCreators] = useState<Creator[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    platform()
      .from('influence_directory')
      .select('*')
      .order('name')
      .then(({ data, error }) => {
        if (!active) return;
        setCreators((data || []) as Creator[]);
        setError(
          error
            ? t(
                'Le répertoire est en cours d’ouverture. Les profils de démonstration restent consultables.',
                'The directory is being prepared. Demo profiles are available.',
              )
            : '',
        );
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  return { creators, loading, error };
}
export function Directory() {
  const { creators, loading, error } = useDirectory();
  const [demo, setDemo] = useState(false),
    [query, setQuery] = useState(''),
    [category, setCategory] = useState(''),
    [network, setNetwork] = useState(''),
    [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    setDemo(new URLSearchParams(location.search).get('demo') === '1');
    try {
      setSelected(
        JSON.parse(
          sessionStorage.getItem('smartsell-influence-shortlist') || '[]',
        ),
      );
    } catch {}
  }, []);
  const source = demo ? demoCreators : creators;
  const results = source.filter(
    (c) =>
      `${c.name} ${c.location} ${c.bio}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (!category || c.category === category) &&
      (!network || c.network === network),
  );
  function select(id: string) {
    const next = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];
    setSelected(next);
    try {
      sessionStorage.setItem(
        'smartsell-influence-shortlist',
        JSON.stringify(next),
      );
    } catch {}
  }
  return (
    <section className="inf-section inf-directory">
      <p className="inf-eyebrow">{t('LE RÉPERTOIRE', 'THE DIRECTORY')}</p>
      <h1>
        {t('Une voix pour', 'A voice for')}
        <br />
        <em>{t('chaque histoire.', 'every story.')}</em>
      </h1>
      <p className="inf-lead">
        {t(
          'Explorez les univers, composez votre sélection et préparez votre campagne avec Smartsell.',
          'Explore creative worlds, build your shortlist and plan your campaign with Smartsell.',
        )}
      </p>
      <div className="inf-filter">
        <label>
          {t('Rechercher', 'Search')}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Nom, ville, univers…', 'Name, city, topic…')}
          />
        </label>
        <label>
          {t('Univers', 'Category')}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">{t('Tous les univers', 'All categories')}</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          {t('Réseau', 'Network')}
          <select value={network} onChange={(e) => setNetwork(e.target.value)}>
            <option value="">{t('Tous les réseaux', 'All networks')}</option>
            {['Instagram', 'TikTok', 'YouTube', 'Facebook'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="inf-directory-mode">
        <label>
          <input
            type="checkbox"
            checked={demo}
            onChange={(e) => {
              setDemo(e.target.checked);
              setSelected([]);
              sessionStorage.removeItem('smartsell-influence-shortlist');
            }}
          />
          {t('Explorer les profils de démonstration', 'Explore demo profiles')}
        </label>
        <span aria-live="polite">
          {results.length} {t('profils', 'profiles')}
        </span>
      </div>
      {demo && (
        <p className="inf-disclosure">
          {t(
            'Profils fictifs et photos de modèles. Aucune audience réelle ni disponibilité commerciale n’est revendiquée.',
            'Fictional profiles and stock photographs. No real audience or commercial availability is claimed.',
          )}
        </p>
      )}
      {!demo && loading && (
        <p role="status">
          {t('Chargement des créateurs…', 'Loading creators…')}
        </p>
      )}
      {!demo && error && <p role="status">{error}</p>}
      <div className="inf-creator-grid">
        {results.map((c, i) => (
          <CreatorCard
            key={c.id}
            creator={c}
            index={i}
            demo={demo}
            selected={selected.includes(c.id)}
            onSelect={() => select(c.id)}
          />
        ))}
      </div>
      {!loading && results.length === 0 && (
        <div className="inf-empty">
          <h2>
            {t(
              'Le prochain profil se prépare.',
              'The next profile is on its way.',
            )}
          </h2>
          <p>
            {t(
              'Ajustez vos filtres ou préparez un brief. Smartsell pourra proposer une sélection adaptée.',
              'Adjust your filters or prepare a brief. Smartsell can suggest a tailored shortlist.',
            )}
          </p>
        </div>
      )}
      <div className="inf-shortlist">
        <span>
          <b>{selected.length}</b>{' '}
          {t('profils sélectionnés', 'shortlisted creators')}
        </span>
        <a
          className="inf-button"
          href={href('campaigns/new') + (demo ? '?demo=1' : '')}
        >
          {t('Construire mon brief', 'Build my brief')} ↗
        </a>
      </div>
    </section>
  );
}
function WorkspacePreview() {
  const [role, setRole] = useState<'client' | 'creator'>('client');
  return (
    <div className="inf-preview">
      <div className="inf-preview-tabs">
        <button
          aria-pressed={role === 'client'}
          onClick={() => setRole('client')}
        >
          {t('Vue entreprise', 'Brand view')}
        </button>
        <button
          aria-pressed={role === 'creator'}
          onClick={() => setRole('creator')}
        >
          {t('Vue créateur', 'Creator view')}
        </button>
        <small>{t('APERÇU DE DÉMONSTRATION', 'DEMO PREVIEW')}</small>
      </div>
      <div className="inf-preview-window">
        <aside>
          <b>
            influence<span>●</span>
          </b>
          <span className="is-active">◈ {t('Vue d’ensemble', 'Overview')}</span>
          <span>▧ {t('Campagnes', 'Campaigns')}</span>
          <span>✦ {t('Créateurs', 'Creators')}</span>
          <span>⌁ {t('Reporting', 'Reporting')}</span>
        </aside>
        <div>
          <p className="inf-eyebrow">
            {role === 'client' ? 'MAISON KALO · DEMO' : 'STUDIO AWA · DEMO'}
          </p>
          <h3>
            {role === 'client'
              ? t('Votre campagne prend vie.', 'Your campaign comes to life.')
              : t(
                  'À vous de créer la suite.',
                  'Your next creation starts here.',
                )}
          </h3>
          <div className="inf-preview-stats">
            <div>
              <small>
                {role === 'client'
                  ? t('Vues déclarées', 'Declared views')
                  : t('Missions', 'Missions')}
              </small>
              <b>{role === 'client' ? '110 K' : '02'}</b>
            </div>
            <div>
              <small>
                {role === 'client'
                  ? t('Interactions', 'Interactions')
                  : t('Honoraires prévus', 'Planned fees')}
              </small>
              <b>{role === 'client' ? '5 630' : '3 M GNF'}</b>
            </div>
            <div>
              <small>{t('Livrables suivis', 'Tracked deliverables')}</small>
              <b>03</b>
            </div>
          </div>
          <div className="inf-preview-chart">
            <div>
              <span>
                {t('L’écho de vos contenus', 'Your content performance')}
              </span>
              <small>{t('Données simulées', 'Simulated data')}</small>
            </div>
            <svg
              viewBox="0 0 600 130"
              role="img"
              aria-label={t(
                'Courbe illustrative des vues',
                'Illustrative views chart',
              )}
            >
              <defs>
                <linearGradient id="inf-area" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#7929a0" stopOpacity=".3" />
                  <stop offset="1" stopColor="#7929a0" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 112 Q40 115 70 92 T140 96 T220 54 T300 74 T380 32 T460 48 T600 8 L600 130 L0 130Z"
                fill="url(#inf-area)"
              />
              <path
                d="M0 112 Q40 115 70 92 T140 96 T220 54 T300 74 T380 32 T460 48 T600 8"
                fill="none"
                stroke="#7929a0"
                strokeWidth="3"
              />
            </svg>
          </div>
          <a
            className="inf-text-link"
            href={href(role === 'client' ? 'dashboard' : 'creator') + '?demo=1'}
          >
            {t('Explorer cet espace', 'Explore workspace')} ↗
          </a>
        </div>
      </div>
    </div>
  );
}
function Brief() {
  const { user } = useAccount();
  const [step, setStep] = useState(0),
    [draft, setDraft] = useState({
      title: '',
      brand: '',
      objective: 'Notoriété',
      brief: '',
      budget_gnf: '',
      start_date: '',
      end_date: '',
    }),
    [demo, setDemo] = useState(false),
    [selected, setSelected] = useState<string[]>([]),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(''),
    [done, setDone] = useState(false);
  const { creators } = useDirectory();
  useEffect(() => {
    setDemo(new URLSearchParams(location.search).get('demo') === '1');
    try {
      const saved = sessionStorage.getItem('smartsell-influence-brief');
      if (saved) setDraft(JSON.parse(saved));
      setSelected(
        JSON.parse(
          sessionStorage.getItem('smartsell-influence-shortlist') || '[]',
        ),
      );
    } catch {}
  }, []);
  function update(key: string, value: string) {
    const next = { ...draft, [key]: value };
    setDraft(next);
    try {
      sessionStorage.setItem('smartsell-influence-brief', JSON.stringify(next));
    } catch {}
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');
    if (step === 1) {
      const form = new FormData(e.currentTarget);
      const next = {
        ...draft,
        budget_gnf: String(form.get('budget_gnf') || ''),
        start_date: String(form.get('start_date') || ''),
        end_date: String(form.get('end_date') || ''),
      };
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(next.start_date) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(next.end_date) ||
        next.start_date > next.end_date
      ) {
        setMessage(
          t(
            'Vérifiez les dates : la fin doit suivre le début de campagne.',
            'Check the dates: end date must follow the campaign start.',
          ),
        );
        return;
      }
      setDraft(next);
      try {
        sessionStorage.setItem(
          'smartsell-influence-brief',
          JSON.stringify(next),
        );
      } catch {}
      setStep(2);
      return;
    }
    if (draft.start_date > draft.end_date) {
      setMessage(
        t(
          'La fin doit suivre le début de campagne.',
          'End date must follow the start date.',
        ),
      );
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    if (!demo && !user) {
      setMessage(
        t(
          'Connectez-vous ci-dessous pour transmettre votre brief.',
          'Sign in below to submit your brief.',
        ),
      );
      return;
    }
    setBusy(true);
    try {
      if (!demo)
        await checked(
          await platform().rpc('influence_command', {
            operation: 'create_campaign',
            target: null,
            payload: {
              ...draft,
              budget_gnf: Number(draft.budget_gnf),
              creators: selected.filter((x) => !x.startsWith('demo-')),
            },
            expected_revision: null,
          }),
        );
      setDone(true);
      if (!demo) {
        sessionStorage.removeItem('smartsell-influence-brief');
        sessionStorage.removeItem('smartsell-influence-shortlist');
      }
    } catch {
      setMessage(
        t(
          'La demande n’a pas été envoyée. Vérifiez votre connexion ; votre brouillon reste dans cette session.',
          'Your request was not sent. Check your connection; the draft remains in this session.',
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="inf-section inf-brief">
      <p className="inf-eyebrow">
        {demo ? 'DEMO' : t('VOTRE PROCHAINE CAMPAGNE', 'YOUR NEXT CAMPAIGN')}
      </p>
      <h1>
        {t('Une idée.', 'An idea.')}
        <br />
        <em>{t('Donnons-lui une voix.', 'Let’s give it a voice.')}</em>
      </h1>
      {done ? (
        <div className="inf-success" role="status">
          <span>✓</span>
          <h2>
            {demo
              ? t(
                  'Votre brief de démonstration est prêt.',
                  'Your demo brief is ready.',
                )
              : t(
                  'Votre demande est enregistrée.',
                  'Your request has been saved.',
                )}
          </h2>
          <p>
            {demo
              ? t(
                  'Aucune demande réelle n’a été envoyée.',
                  'No real request was sent.',
                )
              : t(
                  'Smartsell pourra cadrer la sélection, les conditions et le calendrier avec vous. Aucun engagement financier n’est créé par ce brief.',
                  'Smartsell can review the shortlist, terms and timeline with you. This brief creates no financial commitment.',
                )}
          </p>
          <InfluenceButton path={'dashboard' + (demo ? '?demo=1' : '')}>
            {t('Voir mon espace', 'Open workspace')}
          </InfluenceButton>
        </div>
      ) : (
        <div className="inf-brief-grid">
          <aside>
            <p>
              {t(
                'Trois étapes pour poser les bonnes bases.',
                'Three steps to lay the groundwork.',
              )}
            </p>
            {[
              t('Votre ambition', 'Your ambition'),
              t('Le cadre', 'The framework'),
              t('Votre sélection', 'Your shortlist'),
            ].map((n, i) => (
              <div className={step === i ? 'is-active' : ''} key={n}>
                <span>{i + 1}</span>
                {n}
              </div>
            ))}
            <small>
              {t(
                'Brouillon conservé uniquement dans cette session du navigateur. Aucun budget n’est débité.',
                'Draft saved only in this browser session. No budget is charged.',
              )}
            </small>
          </aside>
          <form onSubmit={submit}>
            {step === 0 ? (
              <>
                <label>
                  {t('Entreprise ou marque', 'Company or brand')}
                  <input
                    required
                    maxLength={120}
                    value={draft.brand}
                    onChange={(e) => update('brand', e.target.value)}
                  />
                </label>
                <label>
                  {t('Nom de la campagne', 'Campaign name')}
                  <input
                    required
                    maxLength={160}
                    value={draft.title}
                    onChange={(e) => update('title', e.target.value)}
                  />
                </label>
                <label>
                  {t('Objectif principal', 'Main objective')}
                  <select
                    value={draft.objective}
                    onChange={(e) => update('objective', e.target.value)}
                  >
                    {[
                      'Notoriété',
                      'Découverte produit',
                      'Engagement',
                      'Trafic',
                      'Conversion',
                    ].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <label>
                  {t(
                    'Le public, le message et le résultat attendu',
                    'Audience, message and expected outcome',
                  )}
                  <textarea
                    required
                    minLength={30}
                    maxLength={6000}
                    rows={5}
                    value={draft.brief}
                    onChange={(e) => update('brief', e.target.value)}
                  />
                </label>
              </>
            ) : step === 1 ? (
              <>
                <label>
                  {t('Budget envisagé en GNF', 'Estimated budget in GNF')}
                  <input
                    type="number"
                    name="budget_gnf"
                    required
                    min={0}
                    step={1}
                    max={100000000000}
                    value={draft.budget_gnf}
                    onChange={(e) => update('budget_gnf', e.target.value)}
                  />
                </label>
                <p>
                  {t(
                    'Un montant indicatif pour préparer une proposition. Il ne constitue pas un devis accepté.',
                    'An indicative amount to prepare a proposal, not an accepted quote.',
                  )}
                </p>
                <label>
                  {t('Début souhaité', 'Preferred start')}
                  <input
                    type="date"
                    name="start_date"
                    required
                    value={draft.start_date}
                    onChange={(e) => update('start_date', e.target.value)}
                  />
                </label>
                <label>
                  {t('Fin souhaitée', 'Preferred end')}
                  <input
                    type="date"
                    name="end_date"
                    required
                    min={draft.start_date}
                    value={draft.end_date}
                    onChange={(e) => update('end_date', e.target.value)}
                  />
                </label>
              </>
            ) : (
              <>
                <h2>
                  {t(
                    'Les profils qui vous inspirent',
                    'Creators who inspire you',
                  )}
                </h2>
                {(demo ? demoCreators : creators).map((c) => (
                  <label key={c.id} className="inf-check">
                    <input
                      type="checkbox"
                      checked={selected.includes(c.id)}
                      onChange={(e) =>
                        setSelected(
                          e.target.checked
                            ? [...selected, c.id]
                            : selected.filter((x) => x !== c.id),
                        )
                      }
                    />
                    <span>
                      <b>{c.name}</b>
                      <small>
                        {c.category} · {c.network}
                      </small>
                    </span>
                  </label>
                ))}
                {creators.length === 0 && !demo && (
                  <p>
                    {t(
                      'Vous pouvez transmettre votre brief sans sélectionner de profil. Smartsell proposera des créateurs après cadrage.',
                      'You can submit without selecting a profile. Smartsell will suggest creators after reviewing the brief.',
                    )}
                  </p>
                )}
                <div className="inf-brief-summary">
                  <b>
                    {draft.brand} · {draft.title}
                  </b>
                  <p>
                    {draft.objective} · {money(Number(draft.budget_gnf))}
                  </p>
                  <p>
                    {draft.start_date} → {draft.end_date}
                  </p>
                </div>
                <label className="inf-check">
                  <input type="checkbox" required />
                  <span>
                    {t(
                      'J’accepte que Smartsell utilise ces informations pour traiter ma demande.',
                      'I agree that Smartsell may use this information to process my request.',
                    )}{' '}
                    <a href={href('privacy')}>{t('Détails', 'Details')}</a>
                  </span>
                </label>
              </>
            )}
            <div className="inf-actions">
              {step > 0 && (
                <button
                  type="button"
                  className="inf-button inf-secondary"
                  onClick={() => setStep(step - 1)}
                >
                  {t('Précédent', 'Back')}
                </button>
              )}
              <button disabled={busy} className="inf-button">
                {busy
                  ? t('Envoi…', 'Sending…')
                  : step < 2
                    ? t('Continuer', 'Continue')
                    : demo
                      ? t('Tester mon brief', 'Test brief')
                      : t('Transmettre mon brief', 'Submit brief')}{' '}
                ↗
              </button>
            </div>
            <p role="status">{message}</p>
            {step === 2 && !user && !demo && (
              <AccountBoundary context="influence">
                <p>
                  {t(
                    'Votre compte est connecté. Vous pouvez transmettre le brief.',
                    'You are signed in. You can submit the brief.',
                  )}
                </p>
              </AccountBoundary>
            )}
          </form>
        </div>
      )}
    </section>
  );
}
function Join() {
  return (
    <section className="inf-section inf-join">
      <div>
        <p className="inf-eyebrow">
          {t('CRÉATEURS ET CRÉATRICES', 'CREATORS')}
        </p>
        <h1>
          {t('Votre voix compte.', 'Your voice matters.')}
          <br />
          <em>{t('Faisons équipe.', 'Let’s team up.')}</em>
        </h1>
        <p className="inf-lead">
          {t(
            'Présentez votre univers. Smartsell examine votre candidature avant toute publication dans le répertoire.',
            'Introduce your creative world. Smartsell reviews your application before any directory publication.',
          )}
        </p>
        <Picture
          src="/media/social-hearts.jpg"
          alt={t(
            'Création de contenu, photo d’illustration',
            'Content creation, illustrative photograph',
          )}
        />
      </div>
      <AccountBoundary context="influence">
        <ApplicationForm />
      </AccountBoundary>
    </section>
  );
}
function ApplicationForm() {
  const [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false);
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await checked(
        await platform().rpc('influence_command', {
          operation: 'apply_creator',
          target: null,
          payload: Object.fromEntries(f),
          expected_revision: null,
        }),
      );
      setMessage(
        t(
          'Candidature enregistrée. Elle reste privée jusqu’à validation par Smartsell.',
          'Application saved. It remains private until Smartsell approves it.',
        ),
      );
    } catch {
      setMessage(
        t(
          'Candidature non envoyée. Réessayez après vérification de votre connexion.',
          'Application not sent. Check your connection and try again.',
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="inf-form" onSubmit={send}>
      <h2>{t('Votre profil créateur', 'Your creator profile')}</h2>
      {[
        ['name', t('Nom public', 'Public name')],
        ['location', t('Ville et pays', 'City and country')],
        [
          'social_url',
          t('Lien du compte principal', 'Main social account URL'),
        ],
      ].map(([key, label]) => (
        <label key={key}>
          {label}
          <input
            required
            name={key}
            type={key === 'social_url' ? 'url' : 'text'}
            maxLength={key === 'social_url' ? 500 : 120}
            pattern={key === 'social_url' ? 'https://.*' : undefined}
          />
        </label>
      ))}
      <label>
        {t('Univers', 'Category')}
        <select name="category">
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label>
        {t('Réseau principal', 'Main network')}
        <select name="network">
          {['Instagram', 'TikTok', 'YouTube', 'Facebook'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label>
        {t('Votre univers et vos formats', 'Your style and formats')}
        <textarea
          name="bio"
          required
          minLength={30}
          maxLength={2000}
          rows={5}
        />
      </label>
      <label className="inf-check">
        <input required type="checkbox" name="consent" value="yes" />
        <span>
          {t(
            'J’autorise la revue de ma candidature et la publication du profil après validation.',
            'I consent to application review and profile publication after approval.',
          )}{' '}
          <a href={href('privacy')}>{t('Données utilisées', 'Data use')}</a>
        </span>
      </label>
      <button disabled={busy} className="inf-button">
        {busy
          ? t('Enregistrement…', 'Saving…')
          : t('Envoyer ma candidature', 'Submit application')}
      </button>
      <p role="status">{message}</p>
    </form>
  );
}
function Method() {
  return (
    <section className="inf-section inf-method">
      <p className="inf-eyebrow">
        {t('LA MÉTHODE SMARTSELL', 'THE SMARTSELL APPROACH')}
      </p>
      <h1>
        {t('Un cadre clair.', 'A clear framework.')}
        <br />
        <em>{t('Des idées qui vivent.', 'Ideas that come alive.')}</em>
      </h1>
      {[
        [
          t('Le brief et les objectifs', 'Brief and objectives'),
          t(
            'Définir le public, le message, le budget et les indicateurs attendus. La demande reste sans engagement jusqu’à validation des conditions.',
            'Define the audience, message, budget and expected indicators. A request creates no commitment until terms are approved.',
          ),
        ],
        [
          t('La sélection et les engagements', 'Selection and commitments'),
          t(
            'Vérifier l’affinité des profils, documenter les honoraires, les livrables, les droits d’utilisation et les échéances dans chaque mission. Le contrat signé est référencé par Smartsell.',
            'Review creator fit, document fees, deliverables, usage rights and deadlines in each mission. Smartsell records the signed contract reference.',
          ),
        ],
        [
          t('La création et les validations', 'Creation and approvals'),
          t(
            'Les créateurs transmettent les liens de contenu. Smartsell centralise les retours et la validation éditoriale. Les partenariats commerciaux doivent être identifiables.',
            'Creators submit content links. Smartsell coordinates feedback and editorial approval. Commercial partnerships must be identifiable.',
          ),
        ],
        [
          t('La diffusion et le reporting', 'Distribution and reporting'),
          t(
            'Les relevés sont datés et reliés à une preuve. Le bilan distingue vues, interactions, clics, honoraires prévus et dépenses enregistrées. Il inclut les enseignements et les prochaines actions.',
            'Reports are dated and linked to evidence. The review separates views, interactions, clicks, planned fees and recorded spending, with lessons and next actions.',
          ),
        ],
      ].map(([a, b], i) => (
        <article key={a}>
          <span>0{i + 1}</span>
          <div>
            <h2>{a}</h2>
            <p>{b}</p>
          </div>
        </article>
      ))}
      <InfluenceButton path="campaigns/new">
        {t('Préparer une campagne', 'Plan a campaign')}
      </InfluenceButton>
    </section>
  );
}
function Privacy() {
  return (
    <section className="inf-section inf-legal">
      <h1>{t('Données et transparence', 'Data and transparency')}</h1>
      <p>
        {t(
          'Smartsell utilise les informations de profil et les briefs pour examiner les candidatures, préparer les collaborations et suivre les campagnes. Les campagnes, honoraires et documents ne sont pas publics.',
          'Smartsell uses profile details and briefs to review applications, prepare collaborations and track campaigns. Campaigns, fees and documents are not public.',
        )}
      </p>
      <h2>{t('Les accès', 'Access')}</h2>
      <p>
        {t(
          'L’entreprise consulte ses propres campagnes. Un créateur consulte les missions qui lui sont attribuées. Le propriétaire Smartsell supervise ces opérations. La modification de l’URL ne donne aucun droit supplémentaire.',
          'Brands access their own campaigns. Creators access assigned missions. The Smartsell owner supervises operations. Changing a URL grants no additional access.',
        )}
      </p>
      <h2>{t('Les réseaux sociaux', 'Social networks')}</h2>
      <p>
        {t(
          'Aucun mot de passe de réseau social n’est demandé. Les statistiques de cette version sont déclarées avec un lien de preuve et une date. Les vues ne représentent pas une audience unique dédupliquée.',
          'No social network passwords are requested. Statistics in this version are declared with dated evidence. Views do not represent a deduplicated unique audience.',
        )}
      </p>
      <h2>{t('Vos demandes', 'Your requests')}</h2>
      <p>
        {t(
          'Pour demander une correction, un retrait de profil ou des précisions sur la conservation de vos données, contactez Smartsell. Les justificatifs contractuels ou financiers peuvent nécessiter un traitement distinct.',
          'Contact Smartsell to request a correction, profile removal or information about data retention. Contractual or financial evidence may require separate handling.',
        )}
      </p>
      <a className="inf-button" href={withBasePath(`/${locale}/contact/`)}>
        {t('Contacter Smartsell', 'Contact Smartsell')} ↗
      </a>
    </section>
  );
}
