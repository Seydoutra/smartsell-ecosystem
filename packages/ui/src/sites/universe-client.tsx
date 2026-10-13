'use client';
import { t } from '@smartsell/routing';
import { Icon } from '../icons';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { photoUrl, type Photo } from '@smartsell/content/photos';
import { Img } from '../immersive';

/* Composants interactifs propres à chaque univers vertical. */

const still = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.dataset.motionPaused === 'true';

export interface RevealRow {
  href: string;
  index: string;
  title: string;
  copy: string;
  photo: Photo;
}

/** Agency : liste d'expertises dont l'image suit le pointeur. */
export function HoverReveal({ rows }: { rows: RevealRow[] }) {
  const [active, setActive] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    const f = float.current;
    if (!el || !f) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        f.style.setProperty('--x', `${e.clientX - r.left}px`);
        f.style.setProperty('--y', `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="uv-reveal" ref={box} onPointerLeave={() => setActive(-1)}>
      {rows.map((r, i) => (
        <a
          key={r.href}
          href={r.href}
          className={i === active ? 'is-active' : ''}
          onPointerEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onBlur={() => setActive(-1)}
        >
          <span className="uv-reveal-index">{r.index}</span>
          <span className="uv-reveal-title">{r.title}</span>
          <span className="uv-reveal-copy">{r.copy}</span>
          <span className="uv-reveal-arrow" aria-hidden="true">
            <Icon name="arrowUpRight" />
          </span>
        </a>
      ))}
      <div
        className={`uv-reveal-float ${active >= 0 ? 'is-on' : ''}`}
        ref={float}
        aria-hidden="true"
      >
        {rows.map((r, i) => (
          <img
            key={r.href}
            src={photoUrl(r.photo, 900)}
            alt=""
            className={i === active ? 'is-current' : ''}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export interface FinderItem {
  href: string;
  title: string;
  category: string;
  level: string;
  hours: number;
  goal: string;
  photo: Photo;
}

/** Academy : trouver un module par thème. */
export function CourseFinder({ items }: { items: FinderItem[] }) {
  const cats = [t('Tous', 'All'), ...new Set(items.map((i) => i.category))];
  const [cat, setCat] = useState(t('Tous', 'All'));
  const shown =
    cat === t('Tous', 'All') ? items : items.filter((i) => i.category === cat);
  return (
    <div className="uv-finder">
      <div
        className="uv-finder-bar"
        role="group"
        aria-label={t('Filtrer par thème', 'Filter by topic')}
      >
        <span aria-hidden="true">
          <Icon name="search" />
        </span>
        <p>{t('Que voulez-vous apprendre ?', 'What do you want to learn?')}</p>
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
      <p className="sr-only" aria-live="polite">
        {shown.length} {t('module(s) affiché(s)', 'course(s) shown')}
      </p>
      <div className="uv-finder-grid">
        {shown.map((c) => (
          <a key={c.href} href={c.href} className="uv-course">
            <div className="uv-course-media">
              <Img photo={c.photo} width={600} />
              <span>{c.category}</span>
            </div>
            <div className="uv-course-body">
              <h3>{c.title}</h3>
              <p>{c.goal}</p>
              <div>
                <span>{c.level}</span>
                <span>
                  {c.hours} {t('h envisagées', 'h planned')}
                </span>
                <b aria-hidden="true">
                  <Icon name="arrowRight" />
                </b>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export interface TabArticle {
  href: string;
  title: string;
  summary: string;
  category: string;
  minutes: number;
  photo: Photo;
}

/** Media : rubriques en onglets. */
export function ArticleTabs({ articles }: { articles: TabArticle[] }) {
  const cats = [...new Set(articles.map((a) => a.category))];
  const [cat, setCat] = useState(cats[0]);
  const uid = useId();
  const shown = articles.filter((a) => a.category === cat).slice(0, 3);
  return (
    <div className="uv-tabs">
      <div
        className="uv-tabs-list"
        role="tablist"
        aria-label={t('Rubriques', 'Sections')}
      >
        {cats.map((c, i) => (
          <button
            key={c}
            id={`${uid}-${i}`}
            role="tab"
            type="button"
            aria-selected={c === cat}
            aria-controls={`${uid}-panel`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div
        className="uv-tabs-panel"
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-${cats.indexOf(cat)}`}
        key={cat}
      >
        {shown.map((a, i) => (
          <a key={a.href} href={a.href} className={i === 0 ? 'is-lead' : ''}>
            <figure>
              <Img photo={a.photo} width={i === 0 ? 1100 : 600} />
            </figure>
            <span className="uv-kicker">
              {a.category} · {a.minutes} {t('min de lecture', 'min read')}
            </span>
            <h3>{a.title}</h3>
            <p>{a.summary}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

/** Media : date du jour en français, dans l'en-tête du journal. */
export function TodayLine({ fallback }: { fallback: string }) {
  const [text, setText] = useState(fallback);
  useEffect(() => {
    setText(
      new Intl.DateTimeFormat(t('fr-FR', 'en-GB'), {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    );
  }, []);
  return <span>{text}</span>;
}

/** Studios : timecode qui défile comme sur un moniteur. */
export function Timecode() {
  const [t, setT] = useState('00:00:00:00');
  useEffect(() => {
    if (still()) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const ms = now - start;
      const f = Math.floor((ms / 40) % 25);
      const s = Math.floor(ms / 1000);
      const pad = (n: number) => String(n).padStart(2, '0');
      setT(`00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(f)}`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <span className="uv-timecode" aria-hidden="true">
      <i /> REC {t}
    </span>
  );
}

/** Labs : invite de terminal qui s'écrit seule. */
export function TypedPrompt({ lines }: { lines: string[] }) {
  const [shown, setShown] = useState<string[]>(lines);
  useEffect(() => {
    if (still()) return;
    let li = 0,
      ci = 0,
      timer: ReturnType<typeof setTimeout>;
    setShown(['']);
    const step = () => {
      const line = lines[li];
      ci++;
      setShown((prev) => {
        const next = [...prev];
        next[li] = line.slice(0, ci);
        return next;
      });
      if (ci >= line.length) {
        li++;
        ci = 0;
        if (li >= lines.length) return;
        setShown((prev) => [...prev, '']);
        timer = setTimeout(step, 420);
      } else timer = setTimeout(step, 28);
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [lines]);
  return (
    <pre className="uv-terminal" aria-label={lines.join(' ')}>
      {shown.map((l, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties}>
          {l}
          {i === shown.length - 1 && <i aria-hidden="true" />}
          {'\n'}
        </span>
      ))}
    </pre>
  );
}

/** Media : vidéo à la une qui change seule, façon plateforme de streaming. */
export function FeaturedFilms({
  items,
}: {
  items: {
    href: string;
    title: string;
    kind: string;
    copy: string;
    src: string;
    poster: string;
  }[];
}) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!still() && !document.hidden) setI((n) => (n + 1) % items.length);
    }, 9000);
    return () => clearInterval(id);
  }, [items.length]);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.load();
    if (!still()) v.play().catch(() => {});
  }, [i]);
  const f = items[i];
  return (
    <div className="md2-feature">
      <a className="md2-feature-media" href={f.href}>
        <video
          ref={ref}
          muted
          loop
          playsInline
          poster={f.poster}
          aria-hidden="true"
        >
          <source src={f.src} type="video/mp4" />
        </video>
        <span className="md2-play" aria-hidden="true">
          <Icon name="arrowRight" />
        </span>
      </a>
      <div className="md2-feature-copy" key={f.href}>
        <span className="md2-tag">{f.kind}</span>
        <h2>{f.title}</h2>
        <p>{f.copy}</p>
        <a className="md2-watch" href={f.href}>
          {t('Regarder', 'Watch')} <Icon name="arrowRight" />
        </a>
      </div>
      <div className="md2-feature-nav">
        <button
          type="button"
          aria-label={t('Vidéo précédente', 'Previous video')}
          onClick={() => setI((n) => (n - 1 + items.length) % items.length)}
        >
          <Icon name="arrowLeft" />
        </button>
        <button
          type="button"
          aria-label={t('Vidéo suivante', 'Next video')}
          onClick={() => setI((n) => (n + 1) % items.length)}
        >
          <Icon name="arrowRight" />
        </button>
        <span className="sg-mono">
          {String(i + 1).padStart(2, '0')} /{' '}
          {String(items.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
