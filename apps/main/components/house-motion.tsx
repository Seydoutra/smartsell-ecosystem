'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  photoUrl,
  videoUrl,
  type Photo,
  type VideoClip,
} from '@smartsell/content/photos';

/*
 * Mouvement de la page d'accueil : la structure reste celle de la V2,
 * ces composants l'animent. Tout s'arrête avec prefers-reduced-motion ou
 * la pause des animations.
 */

const still = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.dataset.motionPaused === 'true';

export type HeroScene = {
  word: string;
  universe: string;
  tone: string;
  photo: Photo;
  clip?: VideoClip;
};

/** Héros : les quatre verbes s'allument tour à tour, l'univers associé apparaît derrière. */
export function HeroMotion({ scenes }: { scenes: HeroScene[] }) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setReady(true);
    const id = window.setInterval(() => {
      if (!still() && !document.hidden)
        setActive((n) => (n + 1) % scenes.length);
    }, 3400);
    return () => clearInterval(id);
  }, [scenes.length]);

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !still()) {
        v.preload = 'auto';
        v.play().catch(() => {});
      } else v.pause();
    });
  }, [active]);

  useEffect(() => {
    const el = stage.current?.closest('.house-hero') as HTMLElement | null;
    if (!el) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty(
          '--hx',
          `${((e.clientX - r.left) / r.width) * 100}%`,
        );
        el.style.setProperty(
          '--hy',
          `${((e.clientY - r.top) / r.height) * 100}%`,
        );
      });
    };
    el.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="hm-stage" ref={stage} aria-hidden="true">
        {scenes.map((s, i) => {
          const v = s.clip ? videoUrl(s.clip) : null;
          return (
            <div
              key={s.word}
              className={`hm-scene hm-${s.tone} ${i === active ? 'is-on' : ''}`}
            >
              {v ? (
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  muted
                  loop
                  playsInline
                  preload={i === 0 ? 'auto' : 'none'}
                  poster={v.poster}
                >
                  <source src={v.src} type="video/mp4" />
                </video>
              ) : (
                <img src={photoUrl(s.photo, 1800)} alt="" />
              )}
            </div>
          );
        })}
        <div className="hm-veil" />
        <div className="house-hero-grid" />
        <div className="hm-glow" />
      </div>
      <p className={`hm-now hm-${scenes[active].tone}`} aria-hidden="true">
        <i />
        <span key={active}>Smartsell {scenes[active].universe}</span>
      </p>
      <h1
        id="house-title"
        className={`hm-words ${ready ? 'is-ready' : ''}`}
        aria-label={scenes.map((s) => s.word).join(' ')}
      >
        {scenes.map((s, i) => (
          <span
            aria-hidden="true"
            key={s.word}
            className={`hm-word hm-${s.tone} ${i === active ? 'is-on' : ''}`}
            style={{ '--w': i } as CSSProperties}
            onPointerEnter={() => setActive(i)}
          >
            <span className="hm-letters">
              {[...s.word].map((ch, j) => (
                <span key={j} style={{ '--l': j } as CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          </span>
        ))}
      </h1>
    </>
  );
}

/** Vidéo d'une carte : se lance quand la carte est survolée ou ciblée. */
export function HoverVideo({ clip }: { clip: VideoClip }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { src, poster } = videoUrl(clip);
  useEffect(() => {
    const v = ref.current;
    const card = v?.closest('a');
    if (!v || !card) return;
    const play = () => {
      if (still()) return;
      v.preload = 'auto';
      v.play().catch(() => {});
    };
    const stop = () => v.pause();
    card.addEventListener('pointerenter', play);
    card.addEventListener('pointerleave', stop);
    card.addEventListener('focus', play);
    card.addEventListener('blur', stop);
    return () => {
      card.removeEventListener('pointerenter', play);
      card.removeEventListener('pointerleave', stop);
      card.removeEventListener('focus', play);
      card.removeEventListener('blur', stop);
    };
  }, []);
  return (
    <video
      ref={ref}
      className="hm-card-video"
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

/** Étoile animée de l'appel final. */
export function Starburst() {
  return (
    <svg className="hm-star" viewBox="-100 -100 200 200" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x="-3"
          y="-96"
          width="6"
          height="78"
          rx="3"
          transform={`rotate(${i * 30})`}
          style={{ '--s': i } as CSSProperties}
        />
      ))}
    </svg>
  );
}

/**
 * Comportements de page : apparitions au défilement, inclinaison des
 * cartes, boutons magnétiques, parallaxe et barre de progression.
 */
export function HouseMotion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('hm-on');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('[data-hm]').forEach((el) => io.observe(el));

    // Inclinaison 3D des cartes univers.
    const cards = [
      ...document.querySelectorAll<HTMLElement>('.house-universe'),
    ];
    const tilt = (e: PointerEvent) => {
      if (still() || e.pointerType !== 'mouse') return;
      const card = e.currentTarget as HTMLElement;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', `${x * 9}deg`);
      card.style.setProperty('--rx', `${-y * 9}deg`);
      card.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--my', `${(y + 0.5) * 100}%`);
    };
    const reset = (e: PointerEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    };
    cards.forEach((c) => {
      c.addEventListener('pointermove', tilt);
      c.addEventListener('pointerleave', reset);
    });

    // Boutons magnétiques.
    const ctas = [
      ...document.querySelectorAll<HTMLElement>('.house-v2 .im-cta'),
    ];
    const pull = (e: PointerEvent) => {
      if (still() || e.pointerType !== 'mouse') return;
      const b = e.currentTarget as HTMLElement;
      const r = b.getBoundingClientRect();
      b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.18}px ${(e.clientY - r.top - r.height / 2) * 0.28}px`;
    };
    const release = (e: PointerEvent) => {
      (e.currentTarget as HTMLElement).style.translate = '';
    };
    ctas.forEach((b) => {
      b.addEventListener('pointermove', pull);
      b.addEventListener('pointerleave', release);
    });

    // Parallaxe des réalisations et progression de lecture.
    const works = [
      ...document.querySelectorAll<HTMLElement>('.house-work > div'),
    ];
    let frame = 0;
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = root.scrollHeight - innerHeight;
        root.style.setProperty(
          '--hm-progress',
          String(max > 0 ? scrollY / max : 0),
        );
        if (still()) return;
        works.forEach((w) => {
          const r = w.getBoundingClientRect();
          const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
          w.style.setProperty(
            '--py',
            `${Math.max(-1, Math.min(1, p)) * -18}px`,
          );
        });
      });
    };
    scroll();
    addEventListener('scroll', scroll, { passive: true });
    addEventListener('resize', scroll);

    return () => {
      root.classList.remove('hm-on');
      io.disconnect();
      cards.forEach((c) => {
        c.removeEventListener('pointermove', tilt);
        c.removeEventListener('pointerleave', reset);
      });
      ctas.forEach((b) => {
        b.removeEventListener('pointermove', pull);
        b.removeEventListener('pointerleave', release);
      });
      removeEventListener('scroll', scroll);
      removeEventListener('resize', scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="hm-progress" aria-hidden="true" />;
}
