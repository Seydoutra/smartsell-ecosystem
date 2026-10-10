'use client';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import type { VerticalId } from '@smartsell/types';
import { verticals } from '@smartsell/content';
import { routingConfig, urlFor } from '@smartsell/routing';
import { PreviewFrame } from './experience';

/*
 * Signature Smartsell : une grammaire de mouvement commune à la maison mère
 * et aux cinq sites. Rideau pixel entre les sites, mosaïque vivante, texte
 * qui s'allume au défilement, onglets à progression et orbite des univers.
 * Tout s'arrête avec la pause, hors écran ou avec prefers-reduced-motion.
 */

const still = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.dataset.motionPaused === 'true';

export type SignatureTone = 'main' | VerticalId;

const palettes: Record<SignatureTone, { from: string; to: string; tile: string }> = {
  main: { from: '#2d103c', to: '#8a4fb0', tile: '255,255,255' },
  agency: { from: '#1d0c27', to: '#7b3ea0', tile: '243,228,51' },
  academy: { from: '#0c0a10', to: '#4a2263', tile: '214,182,229' },
  media: { from: '#0c0a10', to: '#5b2a78', tile: '255,255,255' },
  studio: { from: '#0b0a12', to: '#3a1752', tile: '243,228,51' },
  labs: { from: '#0e0d16', to: '#4c1f6b', tile: '170,140,255' },
};

// Pseudo-aléatoire déterministe : même rendu serveur et client.
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const cells = Array.from({ length: 96 }, (_, i) => i);
const order = (() => {
  const r = seeded(7);
  return cells.map(() => Math.round(r() * 420));
})();

/** Rideau d'arrivée : rendu côté serveur, disparaît en CSS même sans JS. */
export function IntroCurtain({
  name,
  tagline,
  tone = 'main',
}: {
  name: string;
  tagline: string;
  tone?: SignatureTone;
}) {
  return (
    <div className={`sg-curtain sg-tone-${tone}`} aria-hidden="true">
      <div className="sg-curtain-grid">
        {cells.map((i) => (
          <i key={i} style={{ '--d': `${order[i]}ms` } as CSSProperties} />
        ))}
      </div>
      <div className="sg-curtain-copy">
        <span className="sg-mono">SMARTSELL ✳ {tagline}</span>
        <strong>{name}</strong>
        <span className="sg-curtain-line" />
      </div>
    </div>
  );
}

/** Script en tête : n'affiche le rideau qu'une fois par site et par session. */
export function IntroScript({ site }: { site: string }) {
  const code = `var d=document.documentElement;d.dataset.sg='1';try{var k='sg-intro-${site}';if(sessionStorage.getItem(k)||sessionStorage.getItem('smartsell-motion-paused')==='true'){d.dataset.intro='skip'}else{sessionStorage.setItem(k,'1')}if(sessionStorage.getItem('sg-leaving')){d.dataset.intro='arrive';sessionStorage.removeItem('sg-leaving')}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

/** Transition sortante : couvre l'écran en pixels avant de changer de site. */
export function SiteTransitions() {
  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        still()
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href]')
          : null;
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, location.href);
      const sameSite = url.origin === location.origin;
      if (!sameSite || url.protocol !== location.protocol) return;
      if (url.pathname === location.pathname && url.hash) return;
      // Seuls les changements de site déclenchent le rideau.
      const site = (path: string) =>
        path.match(/\/fr\/(agency|academy|media|studio|labs)\//)?.[1] ?? 'main';
      if (site(url.pathname) === site(location.pathname)) return;
      event.preventDefault();
      try {
        sessionStorage.setItem('sg-leaving', '1');
      } catch {}
      document.documentElement.dataset.leaving = 'true';
      setTimeout(() => location.assign(url.href), 520);
    };
    const reset = () => document.documentElement.removeAttribute('data-leaving');
    document.addEventListener('click', click);
    window.addEventListener('pageshow', reset);
    return () => {
      document.removeEventListener('click', click);
      window.removeEventListener('pageshow', reset);
    };
  }, []);
  return (
    <div className="sg-exit" aria-hidden="true">
      {cells.map((i) => (
        <i key={i} style={{ '--d': `${order[i] / 2}ms` } as CSSProperties} />
      ))}
    </div>
  );
}

/** Mosaïque de rectangles translucides qui respirent et suivent le pointeur. */
export function PixelMosaic({
  tone = 'main',
  className = '',
}: {
  tone?: SignatureTone;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const palette = palettes[tone];
    const unit = 44;
    let width = 0,
      height = 0,
      frame = 0,
      visible = true,
      pointer = { x: -999, y: -999 },
      tiles: { x: number; y: number; w: number; h: number; p: number; s: number }[] = [];
    const build = () => {
      const box = el.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      el.width = width * ratio;
      el.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const r = seeded(11);
      const count = Math.round((width * height) / 9000);
      tiles = Array.from({ length: count }, () => ({
        x: Math.floor(r() * (width / unit)) * unit,
        y: Math.floor(r() * (height / unit)) * unit,
        w: (1 + Math.floor(r() * 5)) * unit,
        h: (1 + Math.floor(r() * 7)) * unit,
        p: r() * Math.PI * 2,
        s: 0.3 + r() * 0.7,
      }));
    };
    const draw = (t: number) => {
      const g = ctx.createLinearGradient(0, height, width, 0);
      g.addColorStop(0, palette.from);
      g.addColorStop(1, palette.to);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
      for (const tile of tiles) {
        const cx = tile.x + tile.w / 2,
          cy = tile.y + tile.h / 2;
        const near = Math.max(
          0,
          1 - Math.hypot(cx - pointer.x, cy - pointer.y) / 320,
        );
        const a =
          0.025 + (Math.sin(t / 1600 * tile.s + tile.p) + 1) * 0.035 + near * 0.12;
        ctx.fillStyle = `rgba(${palette.tile},${a.toFixed(3)})`;
        ctx.fillRect(tile.x, tile.y, tile.w, tile.h);
      }
    };
    const loop = (t: number) => {
      draw(t);
      if (visible && !still() && !document.hidden)
        frame = requestAnimationFrame(loop);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };
    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    build();
    restart();
    const resize = new ResizeObserver(() => {
      build();
      restart();
    });
    resize.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    io.observe(el);
    const paused = new MutationObserver(restart);
    paused.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion-paused'],
    });
    el.parentElement?.addEventListener('pointermove', move);
    document.addEventListener('visibilitychange', restart);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      io.disconnect();
      paused.disconnect();
      el.parentElement?.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', restart);
    };
  }, [tone]);
  return (
    <canvas
      ref={canvas}
      className={`sg-mosaic ${className}`}
      aria-hidden="true"
    />
  );
}

/** Paragraphe dont les mots s'allument au fil du défilement. */
export function ScrollLitText({
  text,
  as: Tag = 'p',
  className = '',
}: {
  text: string;
  as?: 'p' | 'h2';
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(' ');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>('[data-w]'));
    let frame = 0;
    const update = () => {
      frame = 0;
      if (still()) {
        el.style.setProperty('--lit', '1');
        spans.forEach((s) => s.classList.add('on'));
        return;
      }
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (vh * 0.85 - box.top) / (box.height + vh * 0.45)),
      );
      const lit = Math.round(progress * spans.length);
      spans.forEach((s, i) => s.classList.toggle('on', i < lit));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const paused = new MutationObserver(schedule);
    paused.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion-paused'],
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      paused.disconnect();
    };
  }, [text]);
  return (
    <Tag ref={ref as never} className={`sg-lit ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} data-w>
            {w}{' '}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Mot-clé surligné d'un bloc jaune qui se déploie à l'entrée. */
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="sg-highlight" data-reveal>
      <span>{children}</span>
    </span>
  );
}

/** Compteur qui défile une fois visible. */
export function CountUp({ value, pad = 2 }: { value: number; pad?: number }) {
  const [n, setN] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || still()) return;
    setN(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - start) / 1100);
        setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="sg-count">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{String(n).padStart(pad, '0')}</span>
    </span>
  );
}

const ordered: VerticalId[] = ['agency', 'academy', 'media', 'studio', 'labs'];

/** Orbite : la maison mère au centre, les cinq sites gravitent autour. */
export function UniverseOrbit() {
  return (
    <div className="sg-orbit" data-motion-visual>
      <div className="sg-orbit-rings" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="sg-orbit-core">
        <span className="sg-mono">MAISON MÈRE</span>
        <strong>Smartsell</strong>
        <span>Conakry · GN</span>
      </div>
      {ordered.map((id, i) => {
        const v = verticals.find((x) => x.id === id)!;
        return (
          <a
            key={id}
            className={`sg-satellite sg-sat-${i}`}
            href={urlFor(id, 'fr', '', routingConfig)}
          >
            <span className="sg-mono">{v.number}</span>
            <strong>{v.name}</strong>
            <em>{v.verb}</em>
            <span className="sr-only">, site autonome Smartsell {v.name}</span>
          </a>
        );
      })}
    </div>
  );
}

/** Onglets verticaux à progression automatique et carte au contour lumineux. */
export function UniverseTabs() {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [auto, setAuto] = useState(false);
  const uid = useId();
  useEffect(() => {
    const sync = () => setAuto(!still());
    sync();
    const paused = new MutationObserver(sync);
    paused.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion-paused'],
    });
    return () => paused.disconnect();
  }, []);
  const v = verticals[active];
  const key = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = verticals.length;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? (i + 1) % n
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? (i - 1 + n) % n
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? n - 1
              : -1;
    if (next < 0) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };
  return (
    <div
      className={`sg-tabs ${auto && !hold ? 'is-auto' : ''}`}
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div
        className="sg-tablist"
        role="tablist"
        aria-orientation="vertical"
        aria-label="Les cinq sites Smartsell"
      >
        {verticals.map((x, i) => (
          <button
            key={x.id}
            id={`${uid}-tab-${i}`}
            role="tab"
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => key(e, i)}
          >
            <span className="sg-tab-dot" aria-hidden="true" />
            <span className="sg-mono">{x.number}</span>
            {x.name}
            {i === active && (
              <span
                className="sg-tab-progress"
                aria-hidden="true"
                onAnimationEnd={() => setActive((active + 1) % verticals.length)}
              />
            )}
          </button>
        ))}
        <p className="sg-mono sg-tab-count" aria-hidden="true">
          {v.number} / 05
        </p>
      </div>
      <div
        className={`sg-panel sg-panel-${v.id}`}
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        key={v.id}
      >
        <div className="sg-panel-copy">
          <p className="sg-mono">
            SMARTSELL {v.name.toUpperCase()} · SITE AUTONOME
          </p>
          <h3>
            <span>{v.verb}.</span> {v.headline}
          </h3>
          <p>{v.description}</p>
          <ul>
            {v.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <a className="sg-pill-link" href={urlFor(v.id, 'fr', '', routingConfig)}>
            Entrer dans {v.name} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="sg-panel-visual">
          <PreviewFrame id={v.id} />
        </div>
      </div>
    </div>
  );
}

/** Croix lumineuse en quatre quadrants. */
export function CrossGrid({
  items,
}: {
  items: { label: string; title: string; copy: string; href?: string }[];
}) {
  return (
    <div className="sg-cross" data-reveal>
      <span className="sg-cross-glow" aria-hidden="true" />
      {items.map((item) => {
        const body = (
          <>
            <span className="sg-mono">{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            {item.href && <span aria-hidden="true">↗</span>}
          </>
        );
        return item.href ? (
          <a key={item.title} href={item.href}>
            {body}
          </a>
        ) : (
          <div key={item.title}>{body}</div>
        );
      })}
    </div>
  );
}
