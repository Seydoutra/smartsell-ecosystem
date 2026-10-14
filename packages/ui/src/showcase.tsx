'use client';
import { t } from '@smartsell/routing';
import { Icon } from './icons';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  photoUrl,
  videoUrl,
  type Photo,
  type VideoClip,
} from '@smartsell/content/photos';
import type {
  Brand,
  Film,
  Product,
  Website,
} from '@smartsell/content/portfolio';
import type { Course } from '@smartsell/content/academy';
import { CtaLink, Img } from './immersive';

/*
 * Vitrines Smartsell : clients, solutions, portfolio, expertises, modules et
 * brief intelligent. Toutes les animations s'arrêtent avec la pause.
 */

const still = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.dataset.motionPaused === 'true';

export const WHATSAPP = '224620619064';

/* ------------------------------------------------------------------ */
/* Clients qui défilent                                                */
/* ------------------------------------------------------------------ */
export function ClientMarquee({
  clients,
  title,
}: {
  clients: string[];
  title: ReactNode;
}) {
  const row = (reverse: boolean) => (
    <div
      className={`sc-clients-row ${reverse ? 'is-reverse' : ''}`}
      aria-hidden="true"
    >
      <div className="sc-clients-track">
        {[...clients, ...clients].map((c, i) => (
          <span key={i}>
            <i />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <section className="sc-clients" aria-labelledby="clients-title">
      <div className="sc-wrap sc-clients-head">
        <span className="sg-mono">
          {t('Ils nous font confiance', 'They trust us')}
        </span>
        <h2 id="clients-title">{title}</h2>
      </div>
      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      {row(false)}
      {row(true)}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Solutions : onglets, captures qui défilent, avantages par cible      */
/* ------------------------------------------------------------------ */
export function SolutionsShowcase({
  products,
  allHref,
}: {
  products: Product[];
  allHref: string;
}) {
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);
  const p = products[active];
  useEffect(() => {
    setShot(0);
    const id = window.setInterval(() => {
      if (!still() && !document.hidden)
        setShot((n) => (n + 1) % p.shots.length);
    }, 3200);
    return () => clearInterval(id);
  }, [active, p.shots.length]);
  return (
    <div className="sc-sol">
      <div
        className="sc-sol-tabs"
        role="tablist"
        aria-label={t('Nos solutions', 'Our solutions')}
      >
        {products.map((x, i) => (
          <button
            key={x.slug}
            type="button"
            role="tab"
            id={`sol-tab-${x.slug}`}
            aria-selected={i === active}
            aria-controls="sol-panel"
            onClick={() => setActive(i)}
          >
            <small>{String(i + 1).padStart(2, '0')}</small>
            <strong>{x.name}</strong>
            <span>{x.status}</span>
          </button>
        ))}
      </div>
      <div
        className="sc-sol-panel"
        role="tabpanel"
        id="sol-panel"
        aria-labelledby={`sol-tab-${p.slug}`}
        key={p.slug}
      >
        <a
          className="sc-sol-screen"
          href={p.url}
          target="_blank"
          rel="noopener"
        >
          <div className="sc-sol-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>
              {p.url.replace(/^https?:\/\//, '').replace(/[#?].*$/, '')}
            </span>
          </div>
          <div className="sc-sol-shots">
            {p.shots.map((s, i) => (
              <img
                key={s.id}
                src={photoUrl(s, 1800)}
                alt={i === shot ? s.alt : ''}
                className={i === shot ? 'is-on' : ''}
                loading="lazy"
              />
            ))}
          </div>
          <div className="sc-sol-dots" aria-hidden="true">
            {p.shots.map((s, i) => (
              <i key={s.id} className={i === shot ? 'is-on' : ''} />
            ))}
          </div>
        </a>
        <div className="sc-sol-copy">
          <h3>{p.tagline}</h3>
          <p>{p.pitch}</p>
          <div className="sc-sol-aud">
            {p.audiences.map((a) => (
              <div key={a.who}>
                <strong>{a.who}</strong>
                <span>{a.gain}</span>
              </div>
            ))}
          </div>
          <div className="im-actions">
            <a
              className="im-cta im-cta-yellow"
              href={p.url}
              target="_blank"
              rel="noopener"
            >
              <span>{p.cta}</span>
              <i aria-hidden="true">
                <Icon name="arrowUpRight" />
              </i>
            </a>
            <CtaLink href={allHref} tone="ghost">
              {t('Tous nos produits', 'All our products')}
            </CtaLink>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tuile vidéo : lecture au survol, plein écran au clic                 */
/* ------------------------------------------------------------------ */
export function ClipTile({
  film,
  href,
  className = '',
}: {
  film: Film;
  href?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const { src, poster } = videoUrl(film.clip);
  const play = () => {
    const v = ref.current;
    if (!v || still()) return;
    v.preload = 'auto';
    v.play().catch(() => {});
  };
  const stop = () => ref.current?.pause();
  const body = (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className="sc-clip-play" aria-hidden="true">
        <Icon name="arrowRight" />
      </span>
      <span className="sc-clip-meta">
        <small>{film.kind}</small>
        <strong>{film.title}</strong>
      </span>
    </>
  );
  const props = {
    className: `sc-clip ${film.vertical ? 'is-vertical' : ''} ${className}`,
    onPointerEnter: play,
    onPointerLeave: stop,
    onFocus: play,
    onBlur: stop,
  };
  return href ? (
    <a href={href} {...props}>
      {body}
    </a>
  ) : (
    <div tabIndex={0} {...props}>
      {body}
    </div>
  );
}

/** Lecteur : vidéo en boucle qui démarre seule à l'écran. */
export function FilmPlayer({ film }: { film: Film }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { src, poster } = videoUrl(film.clip);
  useEffect(() => {
    const v = ref.current;
    if (v && !still()) v.play().catch(() => {});
  }, []);
  return (
    <div className={`sc-player ${film.vertical ? 'is-vertical' : ''}`}>
      <video ref={ref} muted loop playsInline controls poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio : identités, sites, photo et vidéo                         */
/* ------------------------------------------------------------------ */
export function BrandCard({ brand, href }: { brand: Brand; href: string }) {
  const [page, setPage] = useState(0);
  const [awake, setAwake] = useState(false);
  const timer = useRef(0);
  const start = () => {
    if (still()) return;
    setAwake(true);
    clearInterval(timer.current);
    timer.current = window.setInterval(
      () => setPage((n) => (n + 1) % brand.pages.length),
      900,
    );
  };
  const stop = () => {
    clearInterval(timer.current);
    setPage(0);
  };
  useEffect(() => () => clearInterval(timer.current), []);
  return (
    <a
      className="sc-brand"
      href={href}
      onPointerEnter={start}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <div className="sc-brand-pages">
        {(awake ? brand.pages : brand.pages.slice(0, 1)).map((pg, i) => (
          <img
            key={pg.id}
            src={photoUrl(pg, 900)}
            alt={i === 0 ? pg.alt : ''}
            className={i === page ? 'is-on' : ''}
            loading="lazy"
          />
        ))}
      </div>
      <div className="sc-brand-meta">
        <small>{brand.sector}</small>
        <strong>{brand.name}</strong>
        <span>
          {t('Voir le brandbook', 'See the brandbook')}{' '}
          <Icon name="arrowUpRight" />
        </span>
      </div>
    </a>
  );
}

export function SiteCard({ site }: { site: Website }) {
  return (
    <a className="sc-site" href={site.url} target="_blank" rel="noopener">
      <div className="sc-site-bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="sc-site-shot">
        <Img photo={site.shot} width={900} />
      </div>
      <div className="sc-site-meta">
        <small>{site.sector}</small>
        <strong>{site.name}</strong>
        <span>
          {t('Visiter le site', 'Visit the site')} <Icon name="arrowUpRight" />
        </span>
      </div>
    </a>
  );
}

export function PhotoWall({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight')
        setOpen((n) => ((n ?? 0) + 1) % photos.length);
      if (e.key === 'ArrowLeft')
        setOpen((n) => ((n ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open, photos.length]);
  return (
    <>
      <div className="sc-wall">
        {photos.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={`sc-wall-item ${p.ratio}`}
            onClick={() => setOpen(i)}
            aria-label={`${t('Agrandir', 'Enlarge')} : ${p.alt}`}
            style={{ '--i': i } as CSSProperties}
          >
            <Img photo={p} width={700} />
          </button>
        ))}
      </div>
      {open !== null && (
        <div
          className="sc-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
          onClick={() => setOpen(null)}
        >
          <img src={photoUrl(photos[open], 1800)} alt={photos[open].alt} />
          <button
            type="button"
            aria-label={t('Fermer', 'Close')}
            onClick={() => setOpen(null)}
          >
            <Icon name="cross" />
          </button>
        </div>
      )}
    </>
  );
}

export function PortfolioTabs({
  brands,
  websites,
  photos,
  films,
  brandHrefs,
  filmHrefs = {},
}: {
  brands: Brand[];
  websites: Website[];
  photos: Photo[];
  films: Film[];
  brandHrefs: Record<string, string>;
  filmHrefs?: Record<string, string>;
}) {
  const tabs = [
    t('Identités de marque', 'Brand identities'),
    t('Sites web', 'Websites'),
    t('Photographie', 'Photography'),
    t('Vidéo', 'Video'),
  ];
  const [tab, setTab] = useState(0);
  return (
    <div className="sc-port">
      <div className="sc-port-tabs" role="tablist" aria-label="Portfolio">
        {tabs.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={tab === i}
            onClick={() => setTab(i)}
          >
            {label}
            <small>
              {[brands.length, websites.length, photos.length, films.length][i]}
            </small>
          </button>
        ))}
      </div>
      <div className="sc-port-panel" role="tabpanel" key={tab}>
        {tab === 0 && (
          <div className="sc-brand-grid">
            {brands.map((b) => (
              <BrandCard key={b.slug} brand={b} href={brandHrefs[b.slug]} />
            ))}
          </div>
        )}
        {tab === 1 && (
          <div className="sc-site-grid">
            {websites.map((s) => (
              <SiteCard key={s.slug} site={s} />
            ))}
          </div>
        )}
        {tab === 2 && <PhotoWall photos={photos} />}
        {tab === 3 && (
          <div className="sc-clip-grid">
            {films.map((f) => (
              <ClipTile key={f.slug} film={f} href={filmHrefs[f.slug]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Expertises en mosaïque immersive                                     */
/* ------------------------------------------------------------------ */
export interface BentoItem {
  href: string;
  title: string;
  copy: string;
  label: string;
  photo: Photo;
  video?: VideoClip;
}

export function ExpertiseBento({ items }: { items: BentoItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-in');
        }),
      { threshold: 0.15 },
    );
    el.querySelectorAll('.sc-bento-tile').forEach((x) => io.observe(x));
    return () => io.disconnect();
  }, []);
  return (
    <div className="sc-bento" ref={ref}>
      {items.map((it, i) => (
        <BentoTile key={it.href} item={it} index={i} />
      ))}
    </div>
  );
}

function BentoTile({ item, index }: { item: BentoItem; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const play = () => {
    if (!ref.current || still()) return;
    ref.current.preload = 'auto';
    ref.current.play().catch(() => {});
  };
  const stop = () => ref.current?.pause();
  const v = item.video ? videoUrl(item.video) : null;
  return (
    <a
      href={item.href}
      className={`sc-bento-tile t${index % 8}`}
      style={{ '--i': index } as CSSProperties}
      onPointerEnter={play}
      onPointerLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <Img photo={item.photo} width={900} />
      {v && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster={v.poster}
          aria-hidden="true"
        >
          <source src={v.src} type="video/mp4" />
        </video>
      )}
      <span className="sc-bento-num">{String(index + 1).padStart(2, '0')}</span>
      <div className="sc-bento-copy">
        <small>{item.label}</small>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
        <span className="sc-bento-go">
          {t('Découvrir', 'Discover')} <Icon name="arrowUpRight" />
        </span>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Modules Academy en carrousel                                         */
/* ------------------------------------------------------------------ */
export function CourseCarousel({
  courses,
  hrefs,
  filters = true,
}: {
  courses: Course[];
  hrefs: Record<string, string>;
  filters?: boolean;
}) {
  const all = t('Tous', 'All');
  const cats = [all, ...new Set(courses.map((c) => c.category))];
  const [cat, setCat] = useState(all);
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const shown =
    cat === all ? courses : courses.filter((c) => c.category === cat);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    setIndex(0);
    const update = () => {
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      setIndex(Math.round(el.scrollLeft / (card.offsetWidth + 24)));
    };
    el.addEventListener('scroll', update, { passive: true });
    return () => el.removeEventListener('scroll', update);
  }, [cat]);
  const go = (dir: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({
      left: dir * (card.offsetWidth + 24),
      behavior: still() ? 'auto' : 'smooth',
    });
  };
  return (
    <div className="sc-courses">
      {filters && (
        <div
          className="sc-courses-filter"
          role="group"
          aria-label={t('Filtrer par thème', 'Filter by topic')}
        >
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={c === cat}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="sc-courses-track" ref={track}>
        {shown.map((c, i) => (
          <a
            key={c.slug}
            href={hrefs[c.slug]}
            className={`sc-course ${i === index ? 'is-current' : ''}`}
          >
            <Img photo={c.photo} width={900} />
            <div className="sc-course-top">
              <span>{c.category}</span>
              <span>{c.level}</span>
            </div>
            <div className="sc-course-body">
              <small>{c.track}</small>
              <h3>{c.title}</h3>
              <p>{c.goal}</p>
              <div className="sc-course-foot">
                <span>{c.format}</span>
                <b>
                  {t('Voir le module', 'See the course')}{' '}
                  <Icon name="arrowUpRight" />
                </b>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="sc-courses-nav">
        <span className="sg-mono" aria-live="polite">
          {String(Math.min(index + 1, shown.length)).padStart(2, '0')} /{' '}
          {String(shown.length).padStart(2, '0')}
        </span>
        <div className="sc-courses-bar" aria-hidden="true">
          <i
            style={{
              width: `${((index + 1) / Math.max(1, shown.length)) * 100}%`,
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t('Précédent', 'Previous')}
        >
          <Icon name="arrowLeft" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t('Suivant', 'Next')}
        >
          <Icon name="arrowRight" />
        </button>
      </div>
    </div>
  );
}

/** Rail de cartes générique, glissable, avec flèches. */
export function SlideRail({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) =>
    ref.current?.scrollBy({
      left: dir * ref.current.clientWidth * 0.8,
      behavior: still() ? 'auto' : 'smooth',
    });
  return (
    <div className="sc-rail" role="region" aria-label={label}>
      <div className="sc-rail-arrows">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t('Précédent', 'Previous')}
        >
          <Icon name="arrowLeft" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t('Suivant', 'Next')}
        >
          <Icon name="arrowRight" />
        </button>
      </div>
      <div className="sc-rail-track" ref={ref}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Brief intelligent : 6 étapes, questions adaptées, envoi WhatsApp      */
/* ------------------------------------------------------------------ */
type Q = [
  string,
  'text' | 'textarea' | 'select' | 'checkboxes',
  string | string[],
  boolean?,
];

const SERVICES: { id: string; label: string; hint: string; q: Q[] }[] = [
  {
    id: 'logo',
    label: 'Logo',
    hint: t('Création ou refonte', 'New or redesign'),
    q: [
      [
        t('Nom exact à afficher sur le logo', 'Exact name on the logo'),
        'text',
        t('Ex : Smartsell Group', 'E.g. Smartsell Group'),
        true,
      ],
      [
        t('Slogan à intégrer', 'Tagline to include'),
        'text',
        t('Laissez vide si aucun slogan', 'Leave empty if none'),
      ],
      [
        t('Type de logo souhaité', 'Logo type'),
        'select',
        [
          t('Symbole + texte', 'Symbol + text'),
          t('Texte uniquement', 'Text only'),
          t('Symbole uniquement', 'Symbol only'),
          t('Badge / emblème', 'Badge / emblem'),
          t('Je veux être conseillé', 'I’d like advice'),
        ],
      ],
      [
        t('Personnalité du logo', 'Logo personality'),
        'textarea',
        t(
          'Ex : premium, accessible, institutionnel, jeune…',
          'E.g. premium, accessible, institutional, young…',
        ),
      ],
      [
        t('Supports d’utilisation', 'Where it will be used'),
        'checkboxes',
        [
          t('Réseaux sociaux', 'Social media'),
          t('Site web', 'Website'),
          t('Documents officiels', 'Official documents'),
          'Packaging',
          t('Signalétique', 'Signage'),
          'Goodies',
          t('Uniformes', 'Uniforms'),
        ],
      ],
    ],
  },
  {
    id: 'brandbook',
    label: 'Brandbook',
    hint: t('Charte graphique complète', 'Full brand guidelines'),
    q: [
      [
        t('Avez-vous déjà un logo ?', 'Do you already have a logo?'),
        'select',
        [
          t('Non', 'No'),
          t('Oui mais à améliorer', 'Yes, but to improve'),
          t('Oui et validé', 'Yes, approved'),
        ],
      ],
      [
        t('Éléments à inclure', 'Elements to include'),
        'checkboxes',
        [
          t('Palette couleurs', 'Colour palette'),
          t('Typographies', 'Typography'),
          t('Logo et variantes', 'Logo and variants'),
          t('Règles d’utilisation', 'Usage rules'),
          t('Templates réseaux sociaux', 'Social media templates'),
          t('Papeterie', 'Stationery'),
          t('Signalétique', 'Signage'),
          'Goodies',
        ],
      ],
      [
        t('Ton de communication', 'Tone of voice'),
        'select',
        [
          t('Institutionnel', 'Institutional'),
          'Premium',
          t('Accessible', 'Accessible'),
          t('Jeune et dynamique', 'Young and dynamic'),
          t('Inspirant', 'Inspiring'),
          t('Commercial', 'Commercial'),
          t('Éducatif', 'Educational'),
        ],
      ],
      [
        t(
          'Interdits visuels ou couleurs à éviter',
          'Visual no-gos or colours to avoid',
        ),
        'textarea',
        t(
          'Ce que vous ne voulez surtout pas voir',
          'What you definitely don’t want to see',
        ),
      ],
    ],
  },
  {
    id: 'site',
    label: t('Site web', 'Website'),
    hint: t(
      'Vitrine, landing page, catalogue',
      'Showcase, landing page, catalogue',
    ),
    q: [
      [
        t('Type de site', 'Type of site'),
        'select',
        [
          'Landing page',
          t('Site vitrine', 'Showcase site'),
          t('Site catalogue', 'Catalogue site'),
          t('Site événementiel', 'Event site'),
          t('Blog / média', 'Blog / media'),
          'E-commerce',
          t('Je veux être conseillé', 'I’d like advice'),
        ],
      ],
      [
        t('Pages nécessaires', 'Pages needed'),
        'checkboxes',
        [
          t('Accueil', 'Home'),
          t('À propos', 'About'),
          'Services',
          t('Réalisations', 'Portfolio'),
          t('Galerie', 'Gallery'),
          'Blog',
          t('Boutique', 'Shop'),
          'FAQ',
          'Contact',
          t('Réservation', 'Booking'),
        ],
      ],
      [
        t('Objectif principal', 'Main goal'),
        'select',
        [
          t('Recevoir des demandes', 'Receive enquiries'),
          t('Présenter l’entreprise', 'Present the company'),
          t('Vendre', 'Sell'),
          t('Promouvoir un événement', 'Promote an event'),
          t('Recruter', 'Recruit'),
          t('Informer', 'Inform'),
        ],
      ],
      [
        t('Fonctionnalités attendues', 'Expected features'),
        'checkboxes',
        [
          t('Formulaire contact', 'Contact form'),
          t('WhatsApp direct', 'Direct WhatsApp'),
          t('Catalogue', 'Catalogue'),
          t('Paiement', 'Payment'),
          t('Réservation', 'Booking'),
          'Newsletter',
          'Google Maps',
          t('Multilingue', 'Multilingual'),
        ],
      ],
      [
        t('Avez-vous déjà un domaine ?', 'Do you have a domain?'),
        'text',
        t('Ex : monentreprise.com', 'E.g. mycompany.com'),
      ],
    ],
  },
  {
    id: 'video',
    label: t('Vidéo institutionnelle', 'Corporate video'),
    hint: t('Film de marque ou présentation', 'Brand film or presentation'),
    q: [
      [
        t('Objectif de la vidéo', 'Video goal'),
        'select',
        [
          t('Présenter l’entreprise', 'Present the company'),
          t('Lancer un produit', 'Launch a product'),
          t('Rassurer des partenaires', 'Reassure partners'),
          t('Recruter', 'Recruit'),
          t('Couvrir un événement', 'Cover an event'),
          t('Pitch investisseurs', 'Investor pitch'),
        ],
      ],
      [
        t('Durée souhaitée', 'Length'),
        'select',
        [
          t('30 secondes', '30 seconds'),
          t('1 minute', '1 minute'),
          t('2 à 3 minutes', '2 to 3 minutes'),
          t('5 minutes', '5 minutes'),
          t('À définir', 'To be defined'),
        ],
      ],
      [
        t('Format final', 'Final format'),
        'checkboxes',
        [
          t('Horizontal 16:9', 'Horizontal 16:9'),
          t('Vertical Reels/TikTok', 'Vertical Reels/TikTok'),
          t('Carré réseaux sociaux', 'Square for social'),
          t('Version courte', 'Short version'),
          t('Version longue', 'Long version'),
        ],
      ],
      [
        t('Lieux de tournage', 'Shooting locations'),
        'textarea',
        t(
          'Bureaux, terrain, boutique, événement…',
          'Offices, site, shop, event…',
        ),
      ],
    ],
  },
  {
    id: 'shooting',
    label: t('Shooting photo', 'Photo shoot'),
    hint: t('Équipe, produits, événement', 'Team, products, event'),
    q: [
      [
        t('Type de shooting', 'Type of shoot'),
        'checkboxes',
        [
          t('Portraits équipe', 'Team portraits'),
          t('Produits', 'Products'),
          t('Locaux', 'Premises'),
          t('Événement', 'Event'),
          'Lifestyle',
          t('Mode', 'Fashion'),
          t('Culinaire', 'Food'),
          t('Institutionnel', 'Institutional'),
        ],
      ],
      [
        t('Nombre de photos finales', 'Number of final photos'),
        'select',
        [
          t('10 à 20', '10 to 20'),
          t('20 à 50', '20 to 50'),
          t('50 à 100', '50 to 100'),
          t('Plus de 100', 'More than 100'),
          t('À définir', 'To be defined'),
        ],
      ],
      [
        t('Lieu du shooting', 'Shoot location'),
        'text',
        t(
          'Adresse, ville ou studio Smartsell',
          'Address, city or Smartsell studio',
        ),
      ],
      [
        t('Besoin maquillage/stylisme/décor ?', 'Need make-up/styling/set?'),
        'select',
        [t('Oui', 'Yes'), t('Non', 'No'), t('À conseiller', 'Advise me')],
      ],
    ],
  },
  {
    id: 'cm',
    label: 'Community management',
    hint: t('Animation réseaux sociaux', 'Social media management'),
    q: [
      [
        t('Réseaux à gérer', 'Networks to manage'),
        'checkboxes',
        [
          'Facebook',
          'Instagram',
          'LinkedIn',
          'TikTok',
          'X/Twitter',
          'YouTube',
          'WhatsApp Business',
        ],
      ],
      [
        t('Objectif prioritaire', 'Main goal'),
        'select',
        [
          t('Notoriété', 'Awareness'),
          t('Ventes', 'Sales'),
          t('Engagement', 'Engagement'),
          t('Lancement', 'Launch'),
          t('Recrutement', 'Recruitment'),
          t('Gestion d’image', 'Reputation'),
        ],
      ],
      [
        t('Fréquence souhaitée', 'Frequency'),
        'select',
        [
          t('2 posts/semaine', '2 posts/week'),
          t('3 posts/semaine', '3 posts/week'),
          t('5 posts/semaine', '5 posts/week'),
          t('Tous les jours', 'Every day'),
          t('À conseiller', 'Advise me'),
        ],
      ],
      [
        t('Comptes actuels', 'Current accounts'),
        'textarea',
        t(
          'Liens des pages Facebook, Instagram, LinkedIn…',
          'Links to Facebook, Instagram, LinkedIn pages…',
        ),
      ],
    ],
  },
  {
    id: 'goodies',
    label: t('Goodies événement', 'Event merchandise'),
    hint: t('Supports imprimés et objets', 'Printed items and objects'),
    q: [
      [
        t('Nom et date de l’événement', 'Event name and date'),
        'text',
        t('Ex : Salon de l’Habitat, 12 octobre', 'E.g. Home Fair, 12 October'),
      ],
      [
        t('Goodies souhaités', 'Items wanted'),
        'checkboxes',
        [
          'T-shirts',
          'Polos',
          t('Casquettes', 'Caps'),
          'Badges',
          'Flyers',
          t('Kakémonos', 'Roll-ups'),
          t('Sacs', 'Bags'),
          t('Stylos', 'Pens'),
          t('Carnets', 'Notebooks'),
          'Stickers',
        ],
      ],
      [
        t('Quantités estimées', 'Estimated quantities'),
        'textarea',
        t('Ex : 100 t-shirts, 500 flyers…', 'E.g. 100 T-shirts, 500 flyers…'),
      ],
    ],
  },
  {
    id: 'digital',
    label: t('Accompagnement digital', 'Digital support'),
    hint: t('Stratégie et suivi', 'Strategy and follow-up'),
    q: [
      [
        t('Besoin principal', 'Main need'),
        'checkboxes',
        [
          t('Stratégie digitale', 'Digital strategy'),
          t('Audit communication', 'Communication audit'),
          t('Plan de contenu', 'Content plan'),
          t('Campagnes ads', 'Ad campaigns'),
          t('Tunnel WhatsApp', 'WhatsApp funnel'),
          t('Reporting mensuel', 'Monthly reporting'),
        ],
      ],
      [
        t('Situation actuelle', 'Current situation'),
        'select',
        [
          t('Nous commençons de zéro', 'Starting from scratch'),
          t('Nous avons déjà des pages', 'We already have pages'),
          t('Nous communiquons sans stratégie', 'We post without a strategy'),
          t('Nous voulons accélérer', 'We want to speed up'),
        ],
      ],
      [
        t('Durée d’accompagnement', 'Support duration'),
        'select',
        [
          t('1 mois', '1 month'),
          t('3 mois', '3 months'),
          t('6 mois', '6 months'),
          t('12 mois', '12 months'),
          t('À définir', 'To be defined'),
        ],
      ],
    ],
  },
  {
    id: 'formation',
    label: t('Formation', 'Training'),
    hint: t('Équipe, outils, réseaux sociaux', 'Team, tools, social media'),
    q: [
      [
        t('Thème de formation', 'Training topic'),
        'checkboxes',
        [
          'Community management',
          t('Création de contenu', 'Content creation'),
          'Canva / design',
          t('Publicité Meta', 'Meta ads'),
          'WhatsApp Business',
          t('Stratégie digitale', 'Digital strategy'),
          t('IA & prompts', 'AI & prompts'),
          t('Montage vidéo', 'Video editing'),
        ],
      ],
      [
        t('Nombre de participants', 'Number of participants'),
        'select',
        [
          t('1 à 5', '1 to 5'),
          t('6 à 15', '6 to 15'),
          t('16 à 30', '16 to 30'),
          t('Plus de 30', 'More than 30'),
          t('À définir', 'To be defined'),
        ],
      ],
      [
        t('Format préféré', 'Preferred format'),
        'select',
        [
          t('Présentiel', 'In person'),
          t('En ligne', 'Online'),
          t('Hybride', 'Hybrid'),
          t('Atelier pratique', 'Workshop'),
          t('Coaching individuel', 'One-to-one coaching'),
        ],
      ],
      [
        t('Niveau actuel', 'Current level'),
        'select',
        [
          t('Débutant', 'Beginner'),
          t('Intermédiaire', 'Intermediate'),
          t('Avancé', 'Advanced'),
          t('Mixte', 'Mixed'),
        ],
      ],
    ],
  },
];

const STEPS = [
  [
    t('Identité', 'Identity'),
    t('Qui êtes-vous ?', 'Who are you?'),
    t(
      'Les bases pour comprendre votre structure et votre interlocuteur.',
      'The basics about your organisation and your contact person.',
    ),
  ],
  [
    'Services',
    t('Que voulez-vous produire ?', 'What do you want to produce?'),
    t(
      'Sélectionnez vos besoins : le formulaire s’adapte à votre choix.',
      'Pick your needs: the form adapts to your choice.',
    ),
  ],
  [
    t('Univers', 'Brand world'),
    t('Votre univers de marque', 'Your brand world'),
    t(
      'Ces réponses nous aident à créer une direction artistique juste.',
      'These answers help us shape the right art direction.',
    ),
  ],
  [
    t('Cadre', 'Scope'),
    t('Cadre du projet', 'Project scope'),
    t(
      'Budget, délais, priorités et niveau d’urgence.',
      'Budget, deadlines, priorities and urgency.',
    ),
  ],
  [
    t('Questions', 'Questions'),
    t('Questions intelligentes', 'Smart questions'),
    t(
      'Cette étape change selon les services choisis.',
      'This step changes with the services you chose.',
    ),
  ],
  [
    t('Envoi', 'Send'),
    t('Derniers signaux', 'Final details'),
    t(
      'Ce qui peut nous aider à vous répondre vite et précisément.',
      'Anything that helps us reply quickly and precisely.',
    ),
  ],
];

function Field({ q, name }: { q: Q; name: string }) {
  const [label, type, config, required] = q;
  if (type === 'textarea')
    return (
      <label className="sb-field full">
        <span>{label}</span>
        <textarea
          name={name}
          required={required}
          placeholder={config as string}
          rows={3}
        />
      </label>
    );
  if (type === 'select')
    return (
      <label className="sb-field">
        <span>{label}</span>
        <select name={name} required={required} defaultValue="">
          <option value="">{t('Choisir', 'Choose')}</option>
          {(config as string[]).map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
    );
  if (type === 'checkboxes')
    return (
      <fieldset className="sb-field full">
        <legend>{label}</legend>
        <div className="sb-pills">
          {(config as string[]).map((o) => (
            <label key={o} className="sb-pill">
              <input type="checkbox" name={name} value={o} />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  return (
    <label className="sb-field">
      <span>{label}</span>
      <input
        name={name}
        type="text"
        required={required}
        placeholder={config as string}
      />
    </label>
  );
}

export function SmartBrief({ preset = [] }: { preset?: string[] }) {
  const form = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<string[]>(preset);
  const [toast, setToast] = useState('');
  const pct = Math.round(((step + 1) / STEPS.length) * 100);
  const say = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(''), 3200);
  };
  const validate = () => {
    const box = form.current?.querySelector<HTMLElement>(
      `[data-step="${step}"]`,
    );
    const fields = box
      ? Array.from(
          box.querySelectorAll<HTMLInputElement>('input, select, textarea'),
        )
      : [];
    const bad = fields.find((f) => !f.checkValidity());
    if (bad) {
      bad.reportValidity();
      return false;
    }
    if (step === 1 && chosen.length === 0) {
      say(
        t(
          'Sélectionnez au moins un service pour activer le parcours intelligent.',
          'Select at least one service to unlock the smart questions.',
        ),
      );
      return false;
    }
    return true;
  };
  const send = () => {
    if (!form.current || !validate()) return;
    const data = new FormData(form.current);
    const grouped: Record<string, string[]> = {};
    data.forEach((v, k) => {
      const value = String(v).trim();
      if (!value || k === 'Services') return;
      (grouped[k] ||= []).push(value);
    });
    const lines = [
      t('Nouveau brief prospect Smartsell', 'New Smartsell project brief'),
      '',
      t(
        'Bonjour Smartsell, voici mes réponses pour préparer mon projet :',
        'Hello Smartsell, here are my answers to prepare my project:',
      ),
      '',
      `• ${t('Services demandés', 'Services requested')} : ${chosen.map((id) => SERVICES.find((s) => s.id === id)?.label).join(', ')}`,
      ...Object.entries(grouped).map(([k, v]) => `• ${k} : ${v.join(', ')}`),
      '',
      t(
        'Merci de me recontacter pour la suite.',
        'Please get back to me for the next steps.',
      ),
    ];
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener',
    );
  };
  const next = () => {
    if (!validate()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    form.current?.scrollIntoView({
      block: 'start',
      behavior: still() ? 'auto' : 'smooth',
    });
  };
  const services = SERVICES.filter((s) => chosen.includes(s.id));
  return (
    <div className="sb">
      <aside className="sb-side">
        <span className="sg-mono">Mission brief</span>
        <h3>
          {t('Préparons votre', 'Let’s prepare your')}{' '}
          <em>{t('décollage créatif.', 'creative lift-off.')}</em>
        </h3>
        <p>
          {t(
            'Un formulaire rapide pour nous transmettre l’essentiel avant de produire votre identité, vos contenus et votre communication digitale.',
            'A quick form to share the essentials before we produce your identity, content and digital communication.',
          )}
        </p>
        <div className="sb-stats">
          <div>
            <b>{String(step + 1).padStart(2, '0')}</b>
            <span>{t('étape active', 'current step')}</span>
          </div>
          <div>
            <b>{chosen.length}</b>
            <span>{t('services choisis', 'services chosen')}</span>
          </div>
        </div>
        <p className="sb-wa">
          <i aria-hidden="true" />
          {t(
            'Réception WhatsApp : vos réponses arrivent directement au +224 620 619 064.',
            'WhatsApp delivery: your answers go straight to +224 620 619 064.',
          )}
        </p>
      </aside>
      <form
        ref={form}
        className="sb-form"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        noValidate
      >
        <div className="sb-progress">
          <span>
            {t('Progression', 'Progress')} {pct}%
          </span>
          <span>{STEPS[step][0]}</span>
          <div aria-hidden="true">
            <i style={{ width: `${pct}%` }} />
          </div>
        </div>
        <ol className="sb-steps" aria-label={t('Étapes', 'Steps')}>
          {STEPS.map((s, i) => (
            <li
              key={s[0]}
              className={i === step ? 'is-on' : i < step ? 'is-done' : ''}
            >
              <span>{String(i + 1).padStart(2, '0')}</span> {s[0]}
            </li>
          ))}
        </ol>
        {STEPS.map((s, i) => (
          <fieldset
            key={s[0]}
            data-step={i}
            className="sb-step"
            hidden={i !== step}
          >
            <legend>
              <b>{String(i + 1).padStart(2, '0')}</b> {s[1]}
            </legend>
            <p className="sb-hint">{s[2]}</p>
            {i === 0 && (
              <div className="sb-grid">
                <Field
                  q={[
                    t(
                      'Nom de l’entreprise ou organisation',
                      'Company or organisation',
                    ),
                    'text',
                    t('Ex : Nova Events Guinée', 'E.g. Nova Events Guinea'),
                    true,
                  ]}
                  name={t('Entreprise', 'Company')}
                />
                <Field
                  q={[
                    t('Secteur d’activité', 'Sector'),
                    'text',
                    t(
                      'Ex : événementiel, immobilier, santé…',
                      'E.g. events, real estate, health…',
                    ),
                    true,
                  ]}
                  name={t('Secteur', 'Sector')}
                />
                <Field
                  q={[
                    t('Votre nom', 'Your name'),
                    'text',
                    t('Votre nom complet', 'Your full name'),
                    true,
                  ]}
                  name={t('Nom', 'Name')}
                />
                <Field
                  q={[
                    t('Votre fonction', 'Your role'),
                    'text',
                    t(
                      'Ex : fondateur, responsable communication',
                      'E.g. founder, communication lead',
                    ),
                  ]}
                  name={t('Fonction', 'Role')}
                />
                <Field
                  q={[
                    'WhatsApp',
                    'text',
                    t('Ex : 620 00 00 00', 'E.g. 620 00 00 00'),
                    true,
                  ]}
                  name="WhatsApp"
                />
                <Field
                  q={['Email', 'text', 'contact@entreprise.com']}
                  name="Email"
                />
              </div>
            )}
            {i === 1 && (
              <div className="sb-services">
                {SERVICES.map((sv) => (
                  <label key={sv.id} className="sb-service">
                    <input
                      type="checkbox"
                      name="Services"
                      value={sv.id}
                      checked={chosen.includes(sv.id)}
                      onChange={(e) =>
                        setChosen((c) =>
                          e.target.checked
                            ? [...c, sv.id]
                            : c.filter((x) => x !== sv.id),
                        )
                      }
                    />
                    <span>
                      <strong>{sv.label}</strong>
                      <small>{sv.hint}</small>
                    </span>
                  </label>
                ))}
              </div>
            )}
            {i === 2 && (
              <div className="sb-grid">
                <Field
                  q={[
                    t(
                      'Décrivez votre activité en quelques lignes',
                      'Describe your business in a few lines',
                    ),
                    'textarea',
                    '',
                  ]}
                  name={t('Activité', 'Business')}
                />
                <Field
                  q={[
                    t(
                      'Quel message voulez-vous faire passer ?',
                      'What message do you want to convey?',
                    ),
                    'textarea',
                    '',
                  ]}
                  name={t('Message', 'Message')}
                />
                <Field
                  q={[
                    t('Style souhaité', 'Desired style'),
                    'select',
                    [
                      t('Moderne et premium', 'Modern and premium'),
                      t('Minimaliste', 'Minimalist'),
                      'Corporate',
                      t('Jeune et dynamique', 'Young and dynamic'),
                      t('Luxueux', 'Luxurious'),
                      t('Traditionnel revisité', 'Revisited traditional'),
                      t('Futuriste', 'Futuristic'),
                    ],
                  ]}
                  name={t('Style', 'Style')}
                />
                <Field
                  q={[t('Couleurs préférées', 'Preferred colours'), 'text', '']}
                  name={t('Couleurs', 'Colours')}
                />
                <Field
                  q={[
                    t(
                      'Marques ou références que vous aimez',
                      'Brands or references you like',
                    ),
                    'textarea',
                    '',
                  ]}
                  name={t('Références', 'References')}
                />
              </div>
            )}
            {i === 3 && (
              <div className="sb-grid">
                <Field
                  q={[
                    t('Date souhaitée de livraison', 'Desired delivery date'),
                    'text',
                    t('Ex : fin novembre', 'E.g. end of November'),
                  ]}
                  name={t('Livraison', 'Delivery')}
                />
                <Field
                  q={[
                    t('Budget estimatif', 'Estimated budget'),
                    'select',
                    [
                      t('À définir ensemble', 'To be defined together'),
                      t('Moins de 5M GNF', 'Under 5M GNF'),
                      t('5M à 15M GNF', '5M to 15M GNF'),
                      t('15M à 40M GNF', '15M to 40M GNF'),
                      t('Plus de 40M GNF', 'Over 40M GNF'),
                    ],
                  ]}
                  name="Budget"
                />
                <Field
                  q={[
                    t('Niveau d’urgence', 'Urgency'),
                    'select',
                    [
                      t('Normal', 'Normal'),
                      t('Urgent', 'Urgent'),
                      t('Très urgent', 'Very urgent'),
                      t('À planifier tranquillement', 'No rush'),
                    ],
                  ]}
                  name={t('Urgence', 'Urgency')}
                />
                <Field
                  q={[t('Décideur final', 'Final decision-maker'), 'text', '']}
                  name={t('Décideur', 'Decision-maker')}
                />
                <Field
                  q={[
                    t('Objectif business principal', 'Main business goal'),
                    'textarea',
                    '',
                  ]}
                  name={t('Objectif', 'Goal')}
                />
              </div>
            )}
            {i === 4 &&
              (services.length === 0 ? (
                <div className="sb-empty">
                  <strong>
                    {t('Aucun service sélectionné', 'No service selected')}
                  </strong>
                  <p>
                    {t(
                      'Revenez à l’étape Services pour activer les questions intelligentes.',
                      'Go back to the Services step to unlock the smart questions.',
                    )}
                  </p>
                </div>
              ) : (
                services.map((sv, n) => (
                  <article key={sv.id} className="sb-panel">
                    <header>
                      <span>{String(n + 1).padStart(2, '0')}</span>
                      <div>
                        <h4>{sv.label}</h4>
                        <p>
                          {sv.q.length}{' '}
                          {t(
                            'questions de prise de besoin',
                            'scoping questions',
                          )}
                        </p>
                      </div>
                    </header>
                    <div className="sb-grid">
                      {sv.q.map((q) => (
                        <Field
                          key={q[0]}
                          q={q}
                          name={`${sv.label} - ${q[0]}`}
                        />
                      ))}
                    </div>
                  </article>
                ))
              ))}
            {i === 5 && (
              <div className="sb-grid">
                <Field
                  q={[
                    t('Liens utiles', 'Useful links'),
                    'textarea',
                    t('Site, pages, Drive…', 'Website, pages, Drive…'),
                  ]}
                  name={t('Liens', 'Links')}
                />
                <Field
                  q={[
                    t(
                      'Autres informations importantes',
                      'Anything else important',
                    ),
                    'textarea',
                    '',
                  ]}
                  name={t('Autres informations', 'Other information')}
                />
                <Field
                  q={[
                    t('Autorisation de contact', 'Contact permission'),
                    'select',
                    [
                      t('Oui, par WhatsApp', 'Yes, by WhatsApp'),
                      t('Oui, par appel', 'Yes, by phone'),
                      t('Oui, par email', 'Yes, by email'),
                    ],
                    true,
                  ]}
                  name={t('Contact', 'Contact')}
                />
                <div className="sb-launch full">
                  <strong>
                    {t(
                      'Transmission finale WhatsApp',
                      'Final WhatsApp delivery',
                    )}
                  </strong>
                  <p>
                    {t(
                      'En cliquant sur Envoyer, WhatsApp s’ouvre avec toutes vos réponses déjà préparées.',
                      'Clicking Send opens WhatsApp with all your answers ready to go.',
                    )}
                  </p>
                </div>
              </div>
            )}
          </fieldset>
        ))}
        <div className="sb-actions">
          <button
            type="button"
            className="sb-back"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            <Icon name="arrowLeft" /> {t('Retour', 'Back')}
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" className="sb-next" onClick={next}>
              {t('Continuer', 'Continue')} <Icon name="arrowRight" />
            </button>
          ) : (
            <button type="submit" className="sb-next">
              {t('Envoyer sur WhatsApp', 'Send on WhatsApp')}{' '}
              <Icon name="arrowUpRight" />
            </button>
          )}
        </div>
        <p className="sb-toast" role="status">
          {toast}
        </p>
      </form>
    </div>
  );
}
