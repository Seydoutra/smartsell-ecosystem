'use client';
import { useEffect, useRef, useState } from 'react';

/*
 * Mouvement continu de la marque : titres parcourus en permanence par un
 * reflet jaune ou violet, mots qui se relaient dans les héros et fond
 * numérique animé. Tout s'arrête avec la pause ou prefers-reduced-motion.
 */

const still = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.dataset.motionPaused === 'true';

const luminance = (rgb: string) => {
  const m = rgb.match(/[\d.]+/g);
  if (!m) return 0;
  const [r, g, b] = m.map(Number);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

/**
 * Anime tous les titres h1 et h2 : chaque élément qui porte du texte reçoit
 * sa propre couleur de base et un reflet adapté au fond (jaune sur sombre,
 * violet sur clair). Le texte reste lisible à tout moment.
 */
export function KineticTitles() {
  useEffect(() => {
    let index = 0;
    const mark = (el: HTMLElement) => {
      if (el.dataset.kin || el.closest('[data-kin-off]')) return;
      const style = getComputedStyle(el);
      if (
        style.backgroundClip === 'text' ||
        style.webkitTextFillColor === 'transparent'
      )
        return;
      const color = style.color;
      const light = luminance(color) > 0.55;
      el.style.setProperty('--kin-a', color);
      el.style.setProperty('--kin-b', light ? '#f3e433' : '#692b84');
      el.style.setProperty('--kin-c', light ? '#ffffff' : '#b05ad8');
      el.style.setProperty('--kin-d', `${-(index++ % 7) * 0.9}s`);
      el.dataset.kin = '1';
    };
    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('h1, h2, .kin').forEach((h) => {
        const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
        const parents = new Set<HTMLElement>();
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (node.textContent?.trim() && node.parentElement)
            parents.add(node.parentElement);
        }
        parents.forEach(mark);
      });
    };
    let timer = 0;
    const later = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => scan(document), 120);
    };
    scan(document);
    const observer = new MutationObserver(later);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);
  return null;
}

/** Mots qui se relaient en continu dans un titre. */
export function RotatingWords({
  words,
  interval = 2400,
}: {
  words: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!still() && !document.hidden) setI((n) => (n + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');
  return (
    <span className="kn-rotate">
      <span className="sr-only">{words[0]}</span>
      <span className="kn-rotate-sizer" aria-hidden="true">
        {longest}
      </span>
      {words.map((w, n) => (
        <span
          key={w}
          aria-hidden="true"
          className={`kn-rotate-word ${n === i ? 'is-on' : ''} ${
            n === (i - 1 + words.length) % words.length ? 'is-out' : ''
          }`}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

/**
 * Fond numérique : réseau de points connectés, grille en perspective qui
 * avance et éclats de données, aux couleurs Smartsell.
 */
export function DigitalField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = ref.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    let w = 0,
      h = 0,
      frame = 0,
      visible = true;
    let pointer = { x: -999, y: -999 };
    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      y2: boolean;
    };
    let nodes: Node[] = [];
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const build = () => {
      const box = el.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      w = box.width;
      h = box.height;
      el.width = w * ratio;
      el.height = h * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed = 42;
      const count = Math.min(110, Math.round((w * h) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 0.25,
        vy: (rand() - 0.5) * 0.25,
        r: 1 + rand() * 1.8,
        y2: rand() > 0.82,
      }));
    };
    const draw = (time: number) => {
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#12061b');
      bg.addColorStop(0.55, '#2a0f3c');
      bg.addColorStop(1, '#4a1a66');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      // halo
      const gx = pointer.x > -900 ? pointer.x : w * 0.7;
      const gy = pointer.y > -900 ? pointer.y : h * 0.35;
      const glow = ctx.createRadialGradient(
        gx,
        gy,
        0,
        gx,
        gy,
        Math.max(w, h) * 0.45,
      );
      glow.addColorStop(0, 'rgba(160,80,210,0.32)');
      glow.addColorStop(1, 'rgba(160,80,210,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      // grille en perspective
      const horizon = h * 0.62;
      ctx.strokeStyle = 'rgba(190,140,230,0.16)';
      ctx.lineWidth = 1;
      const shift = (time / 40) % 40;
      for (let i = 0; i < 14; i++) {
        const t = (i * 40 + shift) / 560;
        const y = horizon + (h - horizon) * t * t;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let i = -12; i <= 12; i++) {
        ctx.beginPath();
        ctx.moveTo(w / 2 + i * 24, horizon);
        ctx.lineTo(w / 2 + i * (w / 9), h);
        ctx.stroke();
      }
      // réseau
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(214,170,240,${(0.22 * (1 - d / 130)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const near = Math.max(
          0,
          1 - Math.hypot(n.x - pointer.x, n.y - pointer.y) / 200,
        );
        ctx.fillStyle = n.y2
          ? `rgba(243,228,51,${0.75 + near * 0.25})`
          : `rgba(235,215,250,${0.55 + near * 0.4})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      // impulsions de données
      const pulse = (time / 2200) % 1;
      ctx.fillStyle = 'rgba(243,228,51,0.9)';
      for (let k = 0; k < 4; k++) {
        const p = (pulse + k / 4) % 1;
        const i = (k * 37) % Math.max(1, nodes.length - 1);
        const a = nodes[i],
          b = nodes[(i + 9) % nodes.length];
        if (!a || !b) continue;
        ctx.beginPath();
        ctx.arc(
          a.x + (b.x - a.x) * p,
          a.y + (b.y - a.y) * p,
          1.8,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    };
    const loop = (time: number) => {
      draw(time);
      if (visible && !still() && !document.hidden)
        frame = requestAnimationFrame(loop);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      pointer = { x: e.clientX - box.left, y: e.clientY - box.top };
    };
    build();
    restart();
    const ro = new ResizeObserver(() => {
      build();
      restart();
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
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
      ro.disconnect();
      io.disconnect();
      paused.disconnect();
      el.parentElement?.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', restart);
    };
  }, []);
  return (
    <canvas ref={ref} className={`kn-field ${className}`} aria-hidden="true" />
  );
}
