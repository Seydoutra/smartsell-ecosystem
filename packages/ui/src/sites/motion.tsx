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
    const visualSelector =
      '[data-motion-visual], .experience-frame, .course-art, .space-diagram, .feature-art, .obtura-window, .product-window, .learning-board, .studio-lettering, .agency-ribbon';
    const visualObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle(
            'is-motion-visible',
            entry.isIntersecting,
          ),
        );
      },
      { rootMargin: '40px 0px' },
    );
    const observeVisuals = (root: Element | Document) => {
      if (root instanceof Element && root.matches(visualSelector))
        visualObserver.observe(root);
      root
        .querySelectorAll(visualSelector)
        .forEach((el) => visualObserver.observe(el));
    };
    observeVisuals(document);
    const additions = new MutationObserver((records) =>
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) observeVisuals(node);
        }),
      ),
    );
    additions.observe(document.body, { childList: true, subtree: true });
    let frame = 0;
    let activeVisual: HTMLElement | null = null;
    const resetVisual = () => {
      activeVisual?.style.removeProperty('--visual-x');
      activeVisual?.style.removeProperty('--visual-y');
      activeVisual = null;
    };
    const move = (event: PointerEvent) => {
      if (
        media.matches ||
        document.documentElement.dataset.motionPaused === 'true' ||
        event.pointerType !== 'mouse'
      )
        return;
      cancelAnimationFrame(frame);
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>('[data-motion-visual]')
          : null;
      frame = requestAnimationFrame(() => {
        if (activeVisual !== target) resetVisual();
        if (target) {
          activeVisual = target;
          const box = target.getBoundingClientRect();
          target.style.setProperty(
            '--visual-x',
            `${((event.clientX - box.left) / box.width - 0.5) * 14}px`,
          );
          target.style.setProperty(
            '--visual-y',
            `${((event.clientY - box.top) / box.height - 0.5) * 14}px`,
          );
        }
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
      visualObserver.disconnect();
      additions.disconnect();
      resetVisual();
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
