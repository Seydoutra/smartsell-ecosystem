'use client';
import { useEffect, useState } from 'react';
export function MotionLayer() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => {
      let saved = false;
      try {
        saved = sessionStorage.getItem('smartsell-motion-paused') === 'true';
      } catch {}
      setPaused(media.matches || saved);
    };
    preference();
    media.addEventListener('change', preference);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll('[data-reveal]')
      .forEach((el) => observer.observe(el));
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (
        media.matches ||
        document.documentElement.dataset.motionPaused === 'true' ||
        event.pointerType !== 'mouse'
      )
        return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>('.site-hero, .hero');
        if (!el) return;
        const box = el.getBoundingClientRect();
        if (event.clientY > box.bottom || event.clientY < box.top) return;
        el.style.setProperty(
          '--pointer-x',
          `${((event.clientX - box.left) / box.width) * 100}%`,
        );
        el.style.setProperty(
          '--pointer-y',
          `${((event.clientY - box.top) / box.height) * 100}%`,
        );
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      media.removeEventListener('change', preference);
      document.documentElement.removeAttribute('data-motion-paused');
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motionPaused = String(paused);
  }, [paused]);
  return (
    <button
      className="motion-switch"
      onClick={() => {
        const next = !paused;
        try {
          sessionStorage.setItem('smartsell-motion-paused', String(next));
        } catch {}
        setPaused(next);
      }}
      aria-pressed={paused}
      aria-label={
        paused ? 'Activer les animations' : 'Mettre les animations en pause'
      }
    >
      <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span> Mouvement :{' '}
      {paused ? 'en pause' : 'actif'}
    </button>
  );
}
