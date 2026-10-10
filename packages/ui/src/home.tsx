'use client';
import { t } from '@smartsell/routing';
import { Icon } from './icons';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import type { Photo, VideoClip } from '@smartsell/content/photos';
import { CtaLink, Img, Video } from './immersive';

/*
 * Blocs interactifs de la page d'accueil : parcours par profil, rails
 * glissants, panneaux extensibles et composition d'un brief.
 */

export interface JourneyStep {
  title: string;
  copy: string;
  href: string;
  site: string;
}
export interface Journey {
  id: string;
  label: string;
  headline: string;
  photo: Photo;
  steps: JourneyStep[];
  cta: { href: string; label: string };
}

/** « Je suis… » : un parcours en trois étapes à travers les sites. */
export function JourneyPicker({ journeys }: { journeys: Journey[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const j = journeys[active];
  const key = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = journeys.length;
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? (i + 1) % n
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? (i - 1 + n) % n
          : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`${uid}-${next}`)?.focus();
  };
  return (
    <div className="hm-journey">
      <div
        className="hm-journey-tabs"
        role="tablist"
        aria-label={t('Votre profil', 'Your profile')}
      >
        <span className="hm-journey-prefix" aria-hidden="true">
          {t('Je suis', 'I am')}
        </span>
        {journeys.map((x, i) => (
          <button
            key={x.id}
            id={`${uid}-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => key(e, i)}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div
        className="hm-journey-panel"
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-${active}`}
        key={j.id}
      >
        <div className="hm-journey-media">
          <Img photo={j.photo} width={900} />
          <p>{j.headline}</p>
        </div>
        <ol className="hm-journey-steps">
          {j.steps.map((s, i) => (
            <li key={s.title} style={{ animationDelay: `${i * 90}ms` }}>
              <a href={s.href}>
                <span className="hm-step-num">0{i + 1}</span>
                <span className="hm-step-body">
                  <span className="sg-mono">{s.site}</span>
                  <strong>{s.title}</strong>
                  <span>{s.copy}</span>
                </span>
                <span className="hm-step-arrow" aria-hidden="true">
                  <Icon name="arrowUpRight" />
                </span>
              </a>
            </li>
          ))}
          <li className="hm-journey-cta">
            <CtaLink href={j.cta.href}>{j.cta.label}</CtaLink>
          </li>
        </ol>
      </div>
    </div>
  );
}

/** Rail horizontal glissable avec flèches et barre d'avancement. */
export function Rail({
  label,
  children,
  tone = 'light',
}: {
  label: string;
  children: ReactNode;
  tone?: 'light' | 'dark';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setProgress(
        el.scrollWidth > el.clientWidth
          ? el.scrollLeft / (el.scrollWidth - el.clientWidth)
          : 1,
      );
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  const move = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };
  return (
    <div className={`hm-rail hm-rail-${tone}`} role="region" aria-label={label}>
      <div className="hm-rail-track" ref={ref}>
        {children}
      </div>
      <div className="hm-rail-foot">
        <div className="hm-rail-bar" aria-hidden="true">
          <i style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
        </div>
        <div className="hm-rail-arrows">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={t('Précédent', 'Previous')}
          >
            <Icon name="arrowLeft" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={t('Suivant', 'Next')}
          >
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>
    </div>
  );
}

export interface Panel {
  title: string;
  kicker: string;
  copy: string;
  photo: Photo;
  video?: VideoClip;
  href: string;
  cta: string;
}

/** Panneaux côte à côte : celui survolé ou choisi s'agrandit. */
export function ExpandPanels({ panels }: { panels: Panel[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="hm-panels">
      {panels.map((p, i) => (
        <article
          key={p.title}
          className={`hm-panel ${i === open ? 'is-open' : ''}`}
          onPointerEnter={() => setOpen(i)}
          onFocus={() => setOpen(i)}
        >
          {p.video ? (
            <Video clip={p.video} />
          ) : (
            <Img photo={p.photo} width={900} />
          )}
          <div className="hm-panel-copy">
            <span className="sg-mono">{p.kicker}</span>
            <h3>{p.title}</h3>
            <div className="hm-panel-more">
              <p>{p.copy}</p>
              <CtaLink href={p.href} tone="white">
                {p.cta}
              </CtaLink>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

const briefKey = 'smartsell-brief-v1';

/** Composer un brief : besoins, objectif et échéance, repris par le contact. */
export function BriefBuilder({
  needs,
  contactHref,
}: {
  needs: string[];
  contactHref: string;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [goal, setGoal] = useState(
    t('Gagner en visibilité', 'Get more visibility'),
  );
  const [when, setWhen] = useState(t('Dans le mois', 'Within the month'));
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(briefKey) || 'null');
      if (saved && Array.isArray(saved.needs)) {
        setPicked(
          saved.needs.filter((n: unknown) => needs.includes(n as string)),
        );
        if (typeof saved.goal === 'string') setGoal(saved.goal);
        if (typeof saved.when === 'string') setWhen(saved.when);
      }
    } catch {}
  }, [needs]);
  useEffect(() => {
    try {
      sessionStorage.setItem(
        briefKey,
        JSON.stringify({ needs: picked, goal, when }),
      );
    } catch {}
  }, [picked, goal, when]);
  const toggle = (n: string) =>
    setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const goals = [
    t('Gagner en visibilité', 'Get more visibility'),
    t('Vendre davantage', 'Sell more'),
    t('Lancer une marque', 'Launch a brand'),
    t('Former une équipe', 'Train a team'),
  ];
  const times = [
    t('Au plus vite', 'As soon as possible'),
    t('Dans le mois', 'Within the month'),
    t('Ce trimestre', 'This quarter'),
    t('Je me renseigne', 'Just exploring'),
  ];
  return (
    <div className="hm-brief">
      <div className="hm-brief-form">
        <fieldset>
          <legend>
            {t('1. De quoi avez-vous besoin ?', '1. What do you need?')}
          </legend>
          <div className="hm-chips">
            {needs.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={picked.includes(n)}
                onClick={() => toggle(n)}
              >
                {picked.includes(n) ? '' : '+ '}
                {n}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            {t('2. Votre objectif principal', '2. Your main objective')}
          </legend>
          <div className="hm-chips">
            {goals.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={goal === g}
                onClick={() => setGoal(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>{t('3. Votre calendrier', '3. Your timeline')}</legend>
          <div className="hm-chips">
            {times.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={when === t}
                onClick={() => setWhen(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <aside className="hm-brief-card" aria-live="polite">
        <span className="sg-mono">{t('Votre brief', 'Your brief')}</span>
        <strong className="hm-brief-count">
          {String(picked.length).padStart(2, '0')}
          <small>
            {picked.length > 1 ? t('besoins', 'needs') : t('besoin', 'need')}
          </small>
        </strong>
        <ul>
          {picked.length ? (
            picked.map((n) => <li key={n}>{n}</li>)
          ) : (
            <li className="hm-brief-empty">
              {t(
                'Choisissez un ou plusieurs besoins.',
                'Choose one or more needs.',
              )}
            </li>
          )}
        </ul>
        <p>
          {t('Objectif :', 'Objective:')} <b>{goal}</b>
          <br />
          {t('Calendrier :', 'Timeline:')} <b>{when}</b>
        </p>
        <CtaLink href={contactHref}>
          {t('Finaliser mon brief', 'Finish my brief')}
        </CtaLink>
        <small className="hm-brief-note">
          {t(
            'Votre sélection est reprise dans le formulaire de contact. Rien n’est envoyé sans votre accord.',
            'Your selection is carried over to the contact form. Nothing is sent without your consent.',
          )}
        </small>
      </aside>
    </div>
  );
}

/** Lecture du brief composé sur la page d'accueil (pour le contact). */
export function readBrief(): string {
  try {
    const saved = JSON.parse(sessionStorage.getItem(briefKey) || 'null');
    if (!saved || !Array.isArray(saved.needs) || !saved.needs.length) return '';
    return `${saved.needs.join(', ')} — ${t('objectif', 'objective')} : ${saved.goal} — ${t('calendrier', 'timeline')} : ${saved.when}`.slice(
      0,
      200,
    );
  } catch {
    return '';
  }
}
