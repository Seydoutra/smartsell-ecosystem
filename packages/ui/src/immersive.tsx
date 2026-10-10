'use client';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { photoUrl, type Photo } from '@smartsell/content/photos';

/*
 * Blocs immersifs : photos qui défilent, zoom au scroll, défilement
 * horizontal, carrousel, cartes empilées et galerie en parallaxe.
 * Chaque effet retombe sur une mise en page statique et lisible quand le
 * mouvement est en pause ou réduit.
 */

const still = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.dataset.motionPaused === 'true';

/** Avancement d'un élément dans la fenêtre, exposé en CSS via --p (0 → 1). */
function useScrollProgress<T extends HTMLElement>(
  mode: 'sticky' | 'through' = 'sticky',
  onProgress?: (p: number, el: T) => void,
) {
  const ref = useRef<T>(null);
  const callback = useRef(onProgress);
  callback.current = onProgress;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const frozen = still();
      el.classList.toggle('is-still', frozen);
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = frozen
        ? 1
        : mode === 'sticky'
          ? -box.top / Math.max(1, box.height - vh)
          : (vh - box.top) / (vh + box.height);
      const p = Math.min(1, Math.max(0, raw));
      el.style.setProperty('--p', p.toFixed(4));
      callback.current?.(p, el);
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
  }, [mode]);
  return ref;
}

export function Img({
  photo,
  width = 1200,
  className = '',
  eager = false,
}: {
  photo: Photo;
  width?: number;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      className={`im-img ${className}`}
      src={photoUrl(photo, width)}
      srcSet={[0.5, 1, 1.6]
        .map(
          (k) =>
            `${photoUrl(photo, Math.round(width * k))} ${Math.round(width * k)}w`,
        )
        .join(', ')}
      sizes={`(max-width: 700px) 100vw, ${width}px`}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

export function CtaLink({
  href,
  children,
  tone = 'yellow',
}: {
  href: string;
  children: ReactNode;
  tone?: 'yellow' | 'white' | 'ghost' | 'dark';
}) {
  return (
    <a className={`im-cta im-cta-${tone}`} href={href}>
      <span>{children}</span>
      <i aria-hidden="true">↗</i>
    </a>
  );
}

/** Colonnes de photos qui défilent en continu vers le haut ou le bas. */
export function PhotoColumns({ columns }: { columns: Photo[][] }) {
  return (
    <div className="im-columns" aria-hidden="true">
      {columns.map((col, i) => (
        <div
          key={i}
          className={`im-column ${i % 2 ? 'down' : 'up'}`}
          style={{ '--speed': `${38 + i * 9}s` } as CSSProperties}
        >
          {[...col, ...col].map((p, j) => (
            <figure key={j}>
              <Img photo={p} width={520} eager />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Bandeau typographique qui défile de gauche à droite. */
export function Marquee({
  items,
  reverse = false,
  tone = 'dark',
}: {
  items: string[];
  reverse?: boolean;
  tone?: 'dark' | 'yellow' | 'light';
}) {
  return (
    <div
      className={`im-marquee im-marquee-${tone} ${reverse ? 'reverse' : ''}`}
    >
      <p className="sr-only">{items.join(', ')}</p>
      <div className="im-marquee-track" aria-hidden="true">
        {[0, 1].map((k) => (
          <span key={k}>
            {items.map((item) => (
              <span key={item}>
                {item} <b>✳</b>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Une image qui part d'une petite fenêtre et se dézoome jusqu'au plein écran. */
export function ZoomReveal({
  photo,
  eyebrow,
  title,
  copy,
  cta,
}: {
  photo: Photo;
  eyebrow: string;
  title: ReactNode;
  copy: string;
  cta: ReactNode;
}) {
  const ref = useScrollProgress<HTMLElement>('sticky');
  return (
    <section ref={ref} className="im-zoom">
      <div className="im-zoom-stage">
        <div className="im-zoom-frame">
          <Img photo={photo} width={1800} />
        </div>
        <div className="im-zoom-copy">
          <p className="sg-mono">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{copy}</p>
          {cta}
        </div>
      </div>
    </section>
  );
}

export interface HorizontalItem {
  label: string;
  title: string;
  copy: string;
  photo: Photo;
  href: string;
  cta: string;
}

/** Le défilement vertical fait glisser une rangée de cartes vers la gauche. */
export function HorizontalScroll({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: ReactNode;
  items: HorizontalItem[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const ref = useScrollProgress<HTMLElement>('sticky', (p, el) => {
    const t = track.current;
    if (!t) return;
    const distance = Math.max(0, t.scrollWidth - el.clientWidth);
    el.style.setProperty('--distance', `${distance}px`);
  });
  useEffect(() => {
    const el = ref.current;
    const t = track.current;
    if (!el || !t) return;
    const size = () => {
      const distance = Math.max(0, t.scrollWidth - el.clientWidth);
      el.style.setProperty('--distance', `${distance}px`);
      el.style.setProperty('--run', `${distance + window.innerHeight}px`);
    };
    size();
    const observer = new ResizeObserver(size);
    observer.observe(t);
    return () => observer.disconnect();
  }, [ref]);
  return (
    <section ref={ref} className="im-hscroll">
      <div className="im-hscroll-stage">
        <div className="im-hscroll-head">
          <p className="sg-mono">{eyebrow}</p>
          <h2>{title}</h2>
          <span className="im-hscroll-hint" aria-hidden="true">
            Faites défiler →
          </span>
        </div>
        <div className="im-hscroll-track" ref={track}>
          {items.map((item) => (
            <article className="im-hcard" key={item.title}>
              <div className="im-hcard-media">
                <Img photo={item.photo} width={760} />
              </div>
              <div className="im-hcard-body">
                <span className="sg-mono">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <CtaLink href={item.href} tone="white">
                  {item.cta}
                </CtaLink>
              </div>
            </article>
          ))}
        </div>
        <div className="im-hscroll-bar" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}

export interface Slide {
  id: string;
  kicker: string;
  name: string;
  pitch: string;
  photo: Photo;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}

/** Grand carrousel plein cadre, glissable, avec lecture automatique. */
export function Carousel({
  slides,
  label,
}: {
  slides: Slide[];
  label: string;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const go = (i: number) => {
    const el = rail.current;
    const n = slides.length;
    const target = el?.children[((i % n) + n) % n] as HTMLElement | undefined;
    if (!el || !target) return;
    el.scrollTo({
      left: target.offsetLeft - (el.clientWidth - target.clientWidth) / 2,
      behavior: still() ? 'auto' : 'smooth',
    });
  };
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            'is-active',
            entry.intersectionRatio > 0.6,
          );
          if (entry.intersectionRatio > 0.6)
            setActive(Array.from(el.children).indexOf(entry.target));
        }),
      { root: el, threshold: [0, 0.6, 1] },
    );
    Array.from(el.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (hold) return;
    let visible = false;
    const el = rail.current;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (el) io.observe(el);
    const timer = setInterval(() => {
      if (visible && !still() && !document.hidden) go(active + 1);
    }, 6000);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  });
  return (
    <div
      className="im-carousel"
      role="region"
      aria-roledescription="carrousel"
      aria-label={label}
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="im-carousel-rail" ref={rail}>
        {slides.map((s, i) => (
          <article
            key={s.id}
            className={`im-slide im-slide-${s.id}`}
            aria-roledescription="diapositive"
            aria-label={`${i + 1} sur ${slides.length} : ${s.name}`}
          >
            <Img photo={s.photo} width={1500} />
            <div className="im-slide-copy">
              <span className="sg-mono">{s.kicker}</span>
              <h3>{s.name}</h3>
              <p>{s.pitch}</p>
              <div className="im-actions">
                <CtaLink href={s.primary.href}>{s.primary.label}</CtaLink>
                <CtaLink href={s.secondary.href} tone="ghost">
                  {s.secondary.label}
                </CtaLink>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="im-carousel-controls">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Diapositive précédente"
        >
          ←
        </button>
        <div className="im-dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Aller à ${s.name}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <span>{s.name}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Diapositive suivante"
        >
          →
        </button>
      </div>
    </div>
  );
}

export interface StackStep {
  title: string;
  copy: string;
  photo: Photo;
}

/** Cartes qui s'empilent et reculent pendant le défilement. */
export function StackCards({ steps }: { steps: StackStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const cards = Array.from(list.children) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      const frozen = still();
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        let depth = 0;
        if (!frozen && next) {
          const a = card.getBoundingClientRect();
          const b = next.getBoundingClientRect();
          depth = Math.min(1, Math.max(0, 1 - (b.top - a.top) / a.height));
        }
        card.style.setProperty('--depth', depth.toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return (
    <ol className="im-stack" ref={ref}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          style={{ '--i': i } as CSSProperties}
          className="im-stack-card"
        >
          <div className="im-stack-copy">
            <span className="im-stack-num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
          </div>
          <div className="im-stack-media">
            <Img photo={s.photo} width={900} />
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Colonnes de portraits qui glissent à des vitesses différentes. */
export function ParallaxGallery({
  columns,
  children,
}: {
  columns: Photo[][];
  children: ReactNode;
}) {
  const ref = useScrollProgress<HTMLElement>('through');
  return (
    <section ref={ref} className="im-parallax">
      <div className="im-parallax-grid" aria-hidden="true">
        {columns.map((col, i) => (
          <div
            key={i}
            className="im-parallax-col"
            style={{ '--speed': [-1, 0.6, -0.4, 1][i % 4] } as CSSProperties}
          >
            {col.map((p) => (
              <figure key={p.id}>
                <Img photo={p} width={560} />
              </figure>
            ))}
          </div>
        ))}
      </div>
      <div className="im-parallax-copy">{children}</div>
    </section>
  );
}

/** Bandeau de photos horizontal, utilisé sur les sites verticaux. */
export function PhotoRail({ photos }: { photos: Photo[] }) {
  return (
    <div className="im-rail" aria-hidden="true">
      <div className="im-rail-track">
        {[...photos, ...photos].map((p, i) => (
          <figure key={i}>
            <Img photo={p} width={640} />
          </figure>
        ))}
      </div>
    </div>
  );
}

/** Bouton d'action flottant qui apparaît après le premier écran. */
export function FloatingCta({ href, label }: { href: string; label: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const update = () => {
      const nearEnd =
        window.innerHeight + window.scrollY >
        document.documentElement.scrollHeight - window.innerHeight * 0.9;
      setShown(window.scrollY > window.innerHeight * 0.8 && !nearEnd);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <a
      className={`im-floating ${shown ? 'is-shown' : ''}`}
      href={href}
      tabIndex={shown ? undefined : -1}
      aria-hidden={shown ? undefined : true}
    >
      <span className="im-floating-dot" aria-hidden="true" />
      {label}
      <i aria-hidden="true">↗</i>
    </a>
  );
}
