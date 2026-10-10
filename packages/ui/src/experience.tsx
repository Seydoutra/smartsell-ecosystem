'use client';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import type { VerticalId } from '@smartsell/types';
import { verticals } from '@smartsell/content';
import { cases, courses, articles, spaces } from '@smartsell/content/sites';
import { routingConfig, urlFor } from '@smartsell/routing';
import { Brand } from './brand';
const href = (id: VerticalId, path = '') =>
  urlFor(id, 'fr', path, routingConfig);
const words: Record<VerticalId, string[]> = {
  agency: ['font le mouvement.', 'trouvent leur voix.', 'ouvrent la voie.'],
  academy: ['le champ.', 'les possibles.', 'la prochaine étape.'],
  media: ['font la suite.', 'ouvrent le débat.', 'changent le regard.'],
  studio: ['une présence.', 'une image.', 'une histoire.'],
  labs: ['se construit.', 's’expérimente.', 'commence ici.'],
};
const mainWords = [
  'créer.',
  'apprendre.',
  'informer.',
  'produire.',
  'innover.',
];
export function ChangingHeadline({ id }: { id?: VerticalId }) {
  const choices = id ? words[id] : mainWords;
  const [text, setText] = useState(choices[0]);
  const element = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout> | undefined;
    let index = 0,
      position = choices[0].length,
      deleting = true,
      visible = true;
    const stopped = () =>
      media.matches ||
      document.hidden ||
      !visible ||
      document.documentElement.dataset.motionPaused === 'true';
    const tick = () => {
      if (stopped()) return;
      if (deleting) {
        position--;
        setText(choices[index].slice(0, Math.max(0, position)));
        if (position <= 0) {
          index = (index + 1) % choices.length;
          deleting = false;
          timer = setTimeout(tick, 180);
        } else timer = setTimeout(tick, 38);
      } else {
        position++;
        setText(choices[index].slice(0, position));
        if (position >= choices[index].length) {
          deleting = true;
          timer = setTimeout(tick, 2600);
        } else timer = setTimeout(tick, 65);
      }
    };
    const sync = () => {
      clearTimeout(timer);
      if (stopped()) {
        setText(choices[index]);
        position = choices[index].length;
        deleting = true;
      } else timer = setTimeout(tick, 2600);
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion-paused'],
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    if (element.current) intersection.observe(element.current);
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      intersection.disconnect();
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [choices]);
  return (
    <span ref={element} className="changing-headline">
      <span className="sr-only">{choices[0]}</span>
      <span aria-hidden="true" className="typed-line">
        {text}
        <i />
      </span>
    </span>
  );
}
const scenes: Record<
  VerticalId,
  {
    labels: string[];
    title: string;
    path: string;
    action: string;
    note: string;
  }
> = {
  agency: {
    labels: ['Identité', 'Digital', 'Méthode'],
    title: 'De l’intention à une marque cohérente.',
    path: 'work',
    action: 'Explorer les concepts',
    note: 'Concepts créatifs illustratifs · aucune référence client revendiquée',
  },
  academy: {
    labels: ['Modules', 'Pratique', 'Parcours'],
    title: 'Une compétence se construit en pratiquant.',
    path: 'courses',
    action: 'Choisir un module',
    note: 'Parcours de démonstration · progression conservée sur cet appareil',
  },
  media: {
    labels: ['À la une', 'Rubriques', 'Lecture'],
    title: 'Les idées prennent le temps de s’expliquer.',
    path: 'latest',
    action: 'Ouvrir le journal',
    note: 'Une sélection de guides et de regards Smartsell',
  },
  studio: {
    labels: ['Image', 'Son', 'Session'],
    title: 'Un cadre pour chaque histoire.',
    path: 'spaces',
    action: 'Explorer les espaces',
    note: 'Espaces illustratifs · les réservations restent des simulations',
  },
  labs: {
    labels: ['Management', 'Obtura', 'Recherche'],
    title: 'Construire des outils ancrés dans les usages.',
    path: 'products',
    action: 'Découvrir les produits',
    note: 'Management : produit existant · Obtura : vision produit',
  },
};
function moveTab(
  event: KeyboardEvent<HTMLButtonElement>,
  current: number,
  count: number,
  set: (value: number) => void,
) {
  const next =
    event.key === 'ArrowRight'
      ? (current + 1) % count
      : event.key === 'ArrowLeft'
        ? (current + count - 1) % count
        : event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? count - 1
            : null;
  if (next === null) return;
  event.preventDefault();
  set(next);
  const buttons =
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
  buttons?.[next]?.focus();
}
function Scene({ id, active }: { id: VerticalId; active: number }) {
  if (id === 'agency')
    return (
      <div className="scene-agency">
        <div className={`scene-brand brand-scene-${active}`}>
          <small>ÉTUDE CRÉATIVE / {active === 1 ? 'NOURA' : 'KALO'}</small>
          <strong>{active === 1 ? 'noura.' : 'Kalo.'}</strong>
          <p>
            {active === 1
              ? 'Le geste avant le discours.'
              : 'Une librairie qui ouvre le champ.'}
          </p>
          <div className="scene-swatch">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="scene-side">
          <p className="scene-eyebrow">
            {scenes.agency.labels[active]} / STUDIO DE MARQUE
          </p>
          <h3>
            {
              [
                'Le sens avant la forme.',
                'Du premier écran au dernier clic.',
                'La bonne direction, ensemble.',
              ][active]
            }
          </h3>
          {(active === 2
            ? [
                'Écouter le contexte',
                'Explorer les possibles',
                'Construire le système',
                'Transmettre les choix',
              ]
            : active === 1
              ? [
                  'Architecture des pages',
                  'Parcours sur mobile',
                  'Prototype et composants',
                ]
              : cases[0].deliverables
          ).map((item, i) => (
            <div className="scene-row" key={item}>
              <span>0{i + 1}</span>
              <b>{item}</b>
              <i>↗</i>
            </div>
          ))}
          <a
            href={href(
              'agency',
              active === 1
                ? 'work/noura'
                : active === 2
                  ? 'history'
                  : 'work/kalo',
            )}
          >
            Voir l’exploration ↗
          </a>
        </div>
      </div>
    );
  if (id === 'academy')
    return (
      <div className="scene-academy">
        <div className="scene-lesson">
          <small>MODULE DÉMO / MARKETING DIGITAL</small>
          <span className="lesson-symbol">✳</span>
          <h3>
            {active === 1
              ? 'Choisir un objectif.'
              : active === 2
                ? 'Votre prochain pas.'
                : 'Construire sa stratégie digitale.'}
          </h3>
          <p>
            {active === 1 ? courses[0].lessons[0].exercise : courses[0].goal}
          </p>
          <a
            href={href(
              'academy',
              active === 2 ? 'dashboard' : 'courses/marketing-digital',
            )}
          >
            {active === 2 ? 'Ouvrir mon espace démo' : 'Découvrir ce module'} ↗
          </a>
        </div>
        <div className="scene-side">
          <p className="scene-eyebrow">APPRENDRE / PRATIQUER / COMPRENDRE</p>
          <h3>
            {active === 0
              ? 'Des compétences pour faire.'
              : active === 1
                ? 'Un apprentissage concret.'
                : 'Gardez le fil de votre progression.'}
          </h3>
          {(active === 0
            ? courses.slice(0, 3).map((c) => c.title)
            : active === 1
              ? [
                  'Une leçon à explorer',
                  'Un exercice à réaliser',
                  'Un quiz pour se situer',
                ]
              : [
                  'Choisir son module',
                  'Reprendre sa leçon',
                  'Relire son récapitulatif',
                ]
          ).map((t, i) => (
            <div className="scene-row" key={t}>
              <span>0{i + 1}</span>
              <b>{t}</b>
              <i>↗</i>
            </div>
          ))}
          <span className="scene-note">
            Pas de compte réel ni de certification officielle dans cette
            démonstration.
          </span>
        </div>
      </div>
    );
  if (id === 'media')
    return (
      <div className="scene-media">
        <div className="scene-cover">
          <small>SMARTSELL MEDIA / LE REGARD EN MOUVEMENT</small>
          <span>
            LE
            <br />
            PROCHAIN
            <br />
            <em>REGARD.</em>
          </span>
          <div>
            <b>{articles[active].category}</b>
            <p>{articles[active].title}</p>
          </div>
        </div>
        <div className="scene-side">
          <p className="scene-eyebrow">À LIRE / À PENSER / À PARTAGER</p>
          <h3>
            {active === 1
              ? 'Croiser les perspectives.'
              : 'Une question change le regard.'}
          </h3>
          {articles.slice(active, active + 3).map((a) => (
            <a
              className="scene-story"
              href={href('media', 'article/' + a.slug)}
              key={a.slug}
            >
              <small>{a.category}</small>
              <b>{a.title}</b>
              <i>↗</i>
            </a>
          ))}
        </div>
      </div>
    );
  if (id === 'studio')
    return (
      <div className="scene-studio">
        <div className="scene-camera">
          <div className="camera-label">
            <span>PLATEAU / {active === 1 ? 'SON' : 'IMAGE'}</span>
            <span>◎ APERÇU</span>
          </div>
          {active === 1 ? (
            <div className="scene-wave" aria-hidden="true">
              {[
                20, 40, 70, 50, 90, 65, 100, 45, 80, 55, 95, 70, 40, 60, 30,
              ].map((height, i) => (
                <i style={{ height: height + '%' }} key={i} />
              ))}
            </div>
          ) : (
            <div className="scene-lens" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          )}
          <div className="camera-bottom">
            <b>
              {active === 1
                ? 'La voix prend sa place.'
                : 'Donner forme à votre idée.'}
            </b>
            <small>CONCEPT DE PLATEAU / CONAKRY</small>
          </div>
        </div>
        <div className="scene-side">
          <p className="scene-eyebrow">PRÉPARER / CRÉER / PRODUIRE</p>
          <h3>
            {active === 2
              ? 'Une session, étape par étape.'
              : spaces[active === 1 ? 2 : 0].title}
          </h3>
          {(active === 2
            ? [
                'Choisir son pack',
                'Composer sa session',
                'Vérifier le récapitulatif',
              ]
            : spaces[active === 1 ? 2 : 0].equipment
          ).map((t, i) => (
            <div className="scene-row" key={t}>
              <span>0{i + 1}</span>
              <b>{t}</b>
              <i>↗</i>
            </div>
          ))}
          <a
            href={href(
              'studio',
              active === 2
                ? 'booking'
                : active === 1
                  ? 'spaces/podcast'
                  : 'spaces/photo',
            )}
          >
            {active === 2 ? 'Simuler une réservation' : 'Explorer ce plateau'}{' '}
            ↗
          </a>
        </div>
      </div>
    );
  return (
    <div className="scene-labs">
      <div className="scene-product">
        <small>
          {active === 1
            ? 'OBTURA / VISION PRODUIT'
            : active === 2
              ? 'SMARTSELL LABS / RECHERCHE'
              : 'SMARTSELL MANAGEMENT / APERÇU ILLUSTRATIF'}
        </small>
        <h3>
          {active === 1
            ? 'Le travail créatif, relié.'
            : active === 2
              ? 'Observer. Construire. Transmettre.'
              : 'Tout le travail, au même endroit.'}
        </h3>
        <div className="scene-product-stats">
          {(active === 1
            ? ['Clients', 'Production', 'Livraison']
            : active === 2
              ? ['Usages', 'Prototypes', 'Retours']
              : ['Clients', 'Projets', 'Finances']
          ).map((t, i) => (
            <div key={t}>
              <span>{t}</span>
              <b>{['◈', '↗', '∿'][i]}</b>
            </div>
          ))}
        </div>
        <div className="scene-flow">
          <span>Comprendre</span>
          <i>→</i>
          <span>Relier</span>
          <i>→</i>
          <span>Avancer</span>
        </div>
      </div>
      <div className="scene-side">
        <p className="scene-eyebrow">DES PROBLÈMES RÉELS / DES OUTILS UTILES</p>
        <h3>
          {active === 1
            ? 'Une vision pour les créateurs.'
            : active === 2
              ? 'Partir du terrain.'
              : 'Smartsell Management.'}
        </h3>
        <p>
          {active === 1
            ? 'Un Business OS envisagé pour les photographes, vidéastes et créateurs visuels.'
            : active === 2
              ? 'Explorer les usages, formuler une piste et préparer une expérimentation.'
              : 'Le produit existant relie clients, projets, planning et finances.'}
        </p>
        <a
          href={href(
            'labs',
            active === 1
              ? 'products/obtura'
              : active === 2
                ? 'research'
                : 'products/management',
          )}
        >
          {active === 2 ? 'Explorer nos pistes' : 'Découvrir le produit'} ↗
        </a>
        <span className="scene-note">
          {active === 1
            ? 'Vision produit : aucune disponibilité commerciale annoncée.'
            : 'Une présentation des usages, sans données d’entreprise réelles.'}
        </span>
      </div>
    </div>
  );
}
export function PreviewFrame({ id }: { id: VerticalId }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const scene = scenes[id];
  return (
    <div className={'experience-frame experience-' + id}>
      <div className="experience-top">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>Smartsell / {verticals.find((v) => v.id === id)?.name}</span>
        <span className="experience-status">
          <i /> APERÇU
        </span>
      </div>
      <div className="experience-body">
        <aside>
          <Brand variant="white" />
          <span className="scene-eyebrow">
            L’UNIVERS {verticals.find((v) => v.id === id)?.name.toUpperCase()}
          </span>
          <div
            role="tablist"
            aria-label="Choisir un aperçu"
            className="scene-tabs"
          >
            {scene.labels.map((label, i) => (
              <button
                key={label}
                id={uid + '-tab-' + i}
                role="tab"
                aria-selected={active === i}
                aria-controls={uid + '-panel'}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(event) =>
                  moveTab(event, i, scene.labels.length, setActive)
                }
              >
                <span aria-hidden="true">0{i + 1}</span>
                {label}
              </button>
            ))}
          </div>
          <a className="scene-home" href={href(id)}>
            Explorer ce site ↗
          </a>
        </aside>
        <div
          className="experience-content"
          role="tabpanel"
          id={uid + '-panel'}
          aria-labelledby={uid + '-tab-' + active}
          tabIndex={0}
        >
          <Scene key={active} id={id} active={active} />
        </div>
      </div>
      <div className="experience-bottom">
        <p>{scene.note}</p>
        <span>0{active + 1} / 03</span>
      </div>
    </div>
  );
}
export function EcosystemCinema() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const id = verticals[active].id;
  return (
    <section
      className="ecosystem-cinema"
      aria-labelledby={uid + '-title'}
      id="apercus"
    >
      <div className="container">
        <div className="cinema-heading">
          <p className="eyebrow">CINQ SITES. UNE MÊME ÉNERGIE.</p>
          <h2 id={uid + '-title'}>
            Entrez dans
            <br />
            <em>le mouvement.</em>
          </h2>
          <p>
            Une marque à construire, une compétence à développer, une idée à
            partager. Explorez les cinq façons d’avancer avec Smartsell.
          </p>
        </div>
        <div
          className="cinema-tabs"
          role="tablist"
          aria-label="Choisir un univers Smartsell"
        >
          {verticals.map((v, i) => (
            <button
              key={v.id}
              role="tab"
              id={uid + '-tab-' + i}
              aria-selected={active === i}
              aria-controls={uid + '-panel'}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) =>
                moveTab(event, i, verticals.length, setActive)
              }
            >
              <span>{v.number}</span> {v.name}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={uid + '-panel'}
          aria-labelledby={uid + '-tab-' + active}
          tabIndex={0}
        >
          <PreviewFrame key={id} id={id} />
        </div>
        <div className="cinema-caption">
          <p>{verticals[active].description}</p>
          <a href={href(id)}>Entrer dans {verticals[active].name} ↗</a>
        </div>
      </div>
    </section>
  );
}
