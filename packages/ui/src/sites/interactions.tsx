'use client';
import { useEffect, useRef, useState } from 'react';
import type { VerticalId } from '@smartsell/types';
import {
  courses,
  articles,
  packs,
  spaces,
  type Course,
} from '@smartsell/content/sites';
import { urlFor, routingConfig } from '@smartsell/routing';
const href = (id: VerticalId, path = '') =>
  urlFor(id, 'fr', path, routingConfig);
import {
  parseProgress,
  parseBooking,
  sessionError,
  bookingOptions,
  type Progress,
} from './demo-state';
const key = 'smartsell-academy-demo-v1';
function readProgress(): Progress {
  try {
    return parseProgress(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}
function writeProgress(data: Progress): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
function useProgress() {
  const [progress, setProgress] = useState<Progress>({});
  const [loaded, setLoaded] = useState(false);
  const [warning, setWarning] = useState('');
  useEffect(() => {
    setProgress(readProgress());
    setLoaded(true);
  }, []);
  const save = (data: Progress) => {
    setProgress(data);
    if (!writeProgress(data))
      setWarning(
        'Le navigateur ne peut pas enregistrer cette progression. Elle reste disponible jusqu’à la fermeture de la page.',
      );
  };
  return { progress, loaded, save, warning };
}
export function DemoNote({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="demo-note">
      <span aria-hidden="true">◇</span>
      <div>
        <strong>Parcours de démonstration</strong>
        <p>
          {children ||
            'Explorez librement. Aucun compte, paiement ou engagement réel n’est créé.'}
        </p>
      </div>
    </aside>
  );
}
export function Enrollment({ course }: { course: Course }) {
  const { progress, loaded, save, warning } = useProgress();
  const [done, setDone] = useState(false);
  return (
    <div className="workflow">
      <DemoNote>
        Ce module est un aperçu pédagogique. Votre choix est enregistré
        uniquement sur cet appareil.
      </DemoNote>
      <h2>{course.title}</h2>
      <dl className="facts">
        <div>
          <dt>Niveau</dt>
          <dd>{course.level}</dd>
        </div>
        <div>
          <dt>Format envisagé</dt>
          <dd>{course.hours} heures</dd>
        </div>
        <div>
          <dt>Aperçu ici</dt>
          <dd>3 leçons guidées</dd>
        </div>
      </dl>
      {done ? (
        <div role="status">
          <h3>Votre module de démonstration est prêt.</h3>
          <p>Aucune inscription réelle n’a été envoyée.</p>
          <a
            className="site-button"
            href={href('academy', `learn/${course.slug}`)}
          >
            Commencer le module ↗
          </a>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save({ ...progress, [course.slug]: progress[course.slug] || [] });
            setDone(true);
          }}
        >
          <label>
            Votre intention
            <select required defaultValue="">
              <option value="" disabled>
                Choisir une intention
              </option>
              <option>Découvrir une nouvelle pratique</option>
              <option>Développer mon projet</option>
              <option>Explorer pour mon équipe</option>
            </select>
          </label>
          <label className="check-line">
            <input type="checkbox" required /> J’ai compris qu’il s’agit d’un
            parcours de démonstration.
          </label>
          <button disabled={!loaded} className="site-button" type="submit">
            Ajouter à mon espace démo ↗
          </button>
        </form>
      )}
      {warning && <p role="status">{warning}</p>}
    </div>
  );
}
export function Learner({ course }: { course: Course }) {
  const { progress, loaded, save, warning } = useProgress();
  const [current, setCurrent] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [passed, setPassed] = useState(false);
  const [exercise, setExercise] = useState('');
  const content = course.lessons[current];
  const completed = progress[course.slug] || [];
  const select = (index: number) => {
    setCurrent(index);
    setChoice(null);
    setFeedback('');
    setPassed(false);
    setExercise('');
  };
  return (
    <>
      <DemoNote>
        Leçons, quiz et progression sur cet appareil. Cet aperçu ne remplace pas
        le module complet annoncé.
      </DemoNote>
      <div className="learn-layout">
        <aside className="lesson-nav">
          <p className="micro">VOTRE PARCOURS</p>
          <progress
            max={3}
            value={completed.length}
            aria-label="Progression du module"
          />
          <p>{completed.length} / 3 leçons terminées</p>
          {course.lessons.map((l, i) => (
            <button
              key={l.title}
              aria-current={i === current ? 'step' : undefined}
              onClick={() => select(i)}
            >
              <span>{completed.includes(i) ? '✓' : `0${i + 1}`}</span>
              {l.title}
            </button>
          ))}
          <a href={href('academy', 'dashboard')}>Mon espace ↗</a>
        </aside>
        <article className="lesson-body" aria-labelledby="lesson-title">
          <p className="micro">LEÇON 0{current + 1} / 03</p>
          <h2 id="lesson-title">{content.title}</h2>
          <p>{content.copy}</p>
          <section className="exercise">
            <h3>À vous de pratiquer</h3>
            <p>{content.exercise}</p>
            <label>
              Vos notes de pratique
              <textarea
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                rows={4}
                placeholder="Notez votre première proposition…"
              />
            </label>
            <small>
              Notes temporaires : elles ne sont ni envoyées ni enregistrées.
            </small>
          </section>
          <form
            className="quiz"
            onSubmit={(e) => {
              e.preventDefault();
              const correct = choice === content.answer;
              setPassed(correct);
              setFeedback(
                correct
                  ? 'Bonne réponse. Vous pouvez valider cette leçon.'
                  : 'Reprenez le repère dans le texte et essayez à nouveau.',
              );
            }}
          >
            <fieldset>
              <legend>{content.question}</legend>
              {content.options.map((option, i) => (
                <label key={option} className="check-line">
                  <input
                    type="radio"
                    name="answer"
                    checked={choice === i}
                    onChange={() => {
                      setChoice(i);
                      setPassed(false);
                      setFeedback('');
                    }}
                    required
                  />
                  {option}
                </label>
              ))}
            </fieldset>
            <button className="site-button secondary" type="submit">
              Vérifier ma réponse
            </button>
            <p role="status">{feedback}</p>
          </form>
          <button
            className="site-button"
            disabled={!passed || !loaded}
            onClick={() => {
              save({
                ...progress,
                [course.slug]: [...new Set([...completed, current])],
              });
              setFeedback(
                'Leçon terminée. Votre progression a été mise à jour.',
              );
            }}
          >
            Valider la leçon ✓
          </button>
          {current < 2 && (
            <button className="text-button" onClick={() => select(current + 1)}>
              Leçon suivante →
            </button>
          )}
          {completed.length === 3 && (
            <a className="text-button" href={href('academy', 'certificates')}>
              Voir mon récapitulatif →
            </a>
          )}
          {warning && <p role="status">{warning}</p>}
        </article>
      </div>
    </>
  );
}
export function Dashboard({
  certificates = false,
}: {
  certificates?: boolean;
}) {
  const { progress, loaded, save, warning } = useProgress();
  const chosen = courses.filter((c) => c.slug in progress);
  const finished = chosen.filter((c) => progress[c.slug].length === 3);
  return (
    <>
      <DemoNote>
        Vous utilisez un espace local de démonstration. Aucun compte réel n’est
        ouvert.
      </DemoNote>
      <nav className="dashboard-links" aria-label="Espace apprenant">
        <a href={href('academy', 'dashboard')}>Tableau de bord</a>
        <a href={href('academy', 'my-courses')}>Mes modules</a>
        <a href={href('academy', 'certificates')}>Récapitulatifs</a>
        <a href={href('academy', 'resources')}>Ressources</a>
        <a href={href('academy', 'support')}>Support</a>
      </nav>
      {!loaded ? (
        <p role="status">Lecture de votre progression…</p>
      ) : certificates ? (
        <>
          <h2>Vos parcours terminés</h2>
          {finished.length === 0 ? (
            <p>
              Terminez les trois leçons d’un module pour afficher son
              récapitulatif.
            </p>
          ) : (
            finished.map((c) => (
              <article className="certificate" key={c.slug}>
                <p className="micro">SMARTSELL ACADEMY / DÉMONSTRATION</p>
                <h3>{c.title}</h3>
                <p>Trois leçons validées sur cet appareil.</p>
                <strong>
                  Récapitulatif pédagogique, sans valeur de certification
                  officielle.
                </strong>
                <button className="text-button" onClick={() => window.print()}>
                  Imprimer le récapitulatif
                </button>
              </article>
            ))
          )}
        </>
      ) : (
        <>
          <div className="dashboard-stats">
            <div>
              <strong>{chosen.length}</strong>
              <span>modules choisis</span>
            </div>
            <div>
              <strong>
                {chosen.reduce((n, c) => n + progress[c.slug].length, 0)}
              </strong>
              <span>leçons terminées</span>
            </div>
            <div>
              <strong>{finished.length}</strong>
              <span>parcours terminés</span>
            </div>
          </div>
          <h2>Reprendre votre mouvement</h2>
          {chosen.length === 0 ? (
            <div className="empty-state">
              <p>Votre espace attend sa première exploration.</p>
              <a href={href('academy', 'courses')} className="site-button">
                Choisir un module ↗
              </a>
            </div>
          ) : (
            <div className="catalog-grid">
              {chosen.map((c) => (
                <article className="compact-card" key={c.slug}>
                  <p className="micro">{c.category}</p>
                  <h3>{c.title}</h3>
                  <progress
                    max={3}
                    value={progress[c.slug].length}
                    aria-label={`Progression : ${c.title}`}
                  />
                  <p>{progress[c.slug].length} / 3 leçons terminées</p>
                  <a
                    className="text-link"
                    href={href('academy', `learn/${c.slug}`)}
                  >
                    Reprendre →
                  </a>
                </article>
              ))}
            </div>
          )}
        </>
      )}
      {chosen.length > 0 && (
        <button className="text-button" onClick={() => save({})}>
          Effacer ma progression de démonstration
        </button>
      )}
      {warning && <p role="status">{warning}</p>}
    </>
  );
}
const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
export function ArticleSearch({ category }: { category?: string }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(category || 'Toutes');
  const categories = ['Toutes', ...new Set(articles.map((a) => a.category))];
  const result = articles.filter(
    (a) =>
      (selected === 'Toutes' || a.category === selected) &&
      fold(`${a.title} ${a.summary} ${a.category}`).includes(fold(query)),
  );
  return (
    <>
      <div className="search-tools">
        <label>
          Rechercher un article
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Design, outils, création…"
          />
        </label>
        <label>
          Rubrique
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <p role="status">
        {result.length} article{result.length > 1 ? 's' : ''} de démonstration
      </p>
      <div className="article-list">
        {result.map((a) => (
          <a
            key={a.slug}
            className="article-row"
            href={href('media', `article/${a.slug}`)}
          >
            <span className="article-index">{a.number}</span>
            <div>
              <p className="micro">
                {a.category} · {a.minutes} MIN
              </p>
              <h2>{a.title}</h2>
              <p>{a.summary}</p>
            </div>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      {result.length === 0 && (
        <p>
          Aucun article ne correspond. Essayez un autre terme ou une autre
          rubrique.
        </p>
      )}
    </>
  );
}
export function ShareArticle() {
  const [status, setStatus] = useState('');
  return (
    <div>
      <button
        className="text-button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setStatus('Lien copié.');
          } catch {
            setStatus(
              'Copiez l’adresse de cette page depuis votre navigateur.',
            );
          }
        }}
      >
        Copier le lien ↗
      </button>
      <span role="status">{status}</span>
    </div>
  );
}
export function DraftForm({ site }: { site: string }) {
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  return (
    <div className="workflow">
      <p className="form-note">
        Ce formulaire prépare un brouillon. Il ne transmet aucune demande.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          setDraft(
            `Bonjour Smartsell ${site},\n\nJe suis ${f.get('name')} (${f.get('company') || 'projet personnel'}).\nMon adresse de réponse : ${f.get('email')}\nMon besoin : ${f.get('need')}\nÉchéance : ${f.get('date') || 'à discuter'}\nBudget envisagé : ${f.get('budget') || 'à discuter'}\n\n${f.get('message')}`,
          );
          setStatus(
            'Votre brouillon est prêt. Vous pouvez le copier ; aucune demande n’a été envoyée.',
          );
        }}
      >
        <div className="form-grid">
          <label>
            Votre nom
            <input name="name" required autoComplete="name" maxLength={100} />
          </label>
          <label>
            Votre email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={200}
            />
          </label>
          <label>
            Entreprise ou projet
            <input name="company" autoComplete="organization" maxLength={160} />
          </label>
          <label>
            Votre besoin
            <input name="need" required maxLength={200} />
          </label>
          <label>
            Échéance souhaitée
            <input name="date" type="date" />
          </label>
          <label>
            Budget envisagé, en GNF
            <input name="budget" placeholder="Facultatif" maxLength={100} />
          </label>
        </div>
        <label>
          Parlez-nous du projet
          <textarea name="message" required rows={5} maxLength={4000} />
        </label>
        <button className="site-button" type="submit">
          Préparer mon message ↗
        </button>
      </form>
      <p role="status">{status}</p>
      {draft && (
        <div className="draft">
          <label>
            Votre message
            <textarea value={draft} readOnly rows={9} />
          </label>
          <button
            className="site-button secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(draft);
                setStatus(
                  'Brouillon copié. Vous choisissez son destinataire et son envoi.',
                );
              } catch {
                setStatus('Sélectionnez le texte du brouillon pour le copier.');
              }
            }}
          >
            Copier le brouillon
          </button>
        </div>
      )}
    </div>
  );
}
export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <div className="newsletter-box">
      <p className="micro">LES NOUVELLES DE LA MAISON</p>
      <h2>Garder une idée d’avance.</h2>
      <p>
        Un aperçu de notre futur parcours d’abonnement. Aucun email n’est envoyé
        ni enregistré.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
          setDone(true);
        }}
      >
        <label>
          Votre adresse email
          <input type="email" required placeholder="vous@exemple.com" />
        </label>
        <button type="submit" className="site-button">
          Tester l’abonnement ↗
        </button>
      </form>
      {done && (
        <p role="status">
          Simulation terminée. Vous n’êtes pas inscrit à une newsletter réelle.
        </p>
      )}
    </div>
  );
}
const bookingKey = 'smartsell-studio-demo-v1';
export function Booking() {
  const [step, setStep] = useState(1);
  const [pack, setPack] = useState(packs[0].slug);
  const chosen = packs.find((p) => p.slug === pack)!;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [duration, setDuration] = useState(2);
  const [addons, setAddons] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [minimum, setMinimum] = useState('');
  const [storageWarning, setStorageWarning] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => setMinimum(new Date().toISOString().slice(0, 10)), []);
  useEffect(() => {
    if (step > 1) heading.current?.focus();
  }, [step]);
  const optionList = bookingOptions;
  useEffect(() => {
    try {
      const saved = parseBooking(localStorage.getItem(bookingKey) || 'null');
      if (saved) {
        setPack(saved.pack);
        setDate(saved.date);
        setTime(saved.time);
        setDuration(saved.duration);
        setAddons(saved.addons);
        setReference(saved.reference);
        setStep(3);
      }
    } catch {}
  }, []);
  const go = (n: number) => {
    setError('');
    setStep(n);
  };
  return (
    <div className="workflow booking-workflow">
      <DemoNote>
        Calendrier et packs illustratifs. Aucun paiement, aucune disponibilité
        réelle, aucune réservation auprès de Studios.
      </DemoNote>
      <ol className="booking-steps">
        {['Le projet', 'La session', 'Le récapitulatif'].map((text, i) => (
          <li key={text} aria-current={step === i + 1 ? 'step' : undefined}>
            <span>0{i + 1}</span>
            {text}
          </li>
        ))}
      </ol>
      <h2 tabIndex={-1} ref={heading}>
        {step === 1
          ? 'Quel sera votre format ?'
          : step === 2
            ? 'Composer votre session.'
            : 'Tout est dans le cadre.'}
      </h2>
      {reference ? (
        <div role="status">
          <h3>Simulation terminée : {reference}</h3>
          <p>
            Aucun créneau n’a été réservé. Le récapitulatif sans coordonnées est
            conservé sur cet appareil.
          </p>
          <p>
            {chosen.title} ·{' '}
            {new Date(date + 'T00:00:00Z').toLocaleDateString('fr-GN', {
              timeZone: 'Africa/Conakry',
            })}{' '}
            · {time} · {duration} h
          </p>
          <p>
            {addons.length ? addons.join(' · ') : 'Sans option supplémentaire'}
          </p>
          <button
            className="site-button secondary"
            onClick={() => {
              try {
                localStorage.removeItem(bookingKey);
              } catch {}
              setReference('');
              go(1);
            }}
          >
            Effacer cette simulation et recommencer
          </button>
        </div>
      ) : step === 1 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDuration(Math.max(duration, chosen.duration));
            go(2);
          }}
        >
          <fieldset>
            <legend>Choisissez un pack de démonstration</legend>
            <div className="pack-options">
              {packs.map((p) => (
                <label
                  className={pack === p.slug ? 'selected' : ''}
                  key={p.slug}
                >
                  <input
                    type="radio"
                    name="pack"
                    checked={pack === p.slug}
                    onChange={() => setPack(p.slug)}
                  />
                  <strong>{p.title}</strong>
                  <span>
                    {p.duration} h ·{' '}
                    {spaces.find((s) => s.slug === p.space)?.title}
                  </span>
                  <small>{p.copy}</small>
                </label>
              ))}
            </div>
          </fieldset>
          <button className="site-button" type="submit">
            Composer la session →
          </button>
        </form>
      ) : step === 2 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const today = new Date().toISOString().slice(0, 10);
            const problem = sessionError(date, time, duration, today);
            if (problem) {
              setError(problem);
              return;
            }
            go(3);
          }}
        >
          <p>{chosen.title} · tarif sur demande après cadrage.</p>
          <div className="form-grid">
            <label>
              Date de simulation
              <input
                type="date"
                required
                min={minimum}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label>
              Heure, Conakry
              <select value={time} onChange={(e) => setTime(e.target.value)}>
                {Array.from(
                  { length: 8 },
                  (_, i) => `${String(9 + i).padStart(2, '0')}:00`,
                ).map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Durée indicative
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                {[2, 3, 4, 5, 6]
                  .filter((n) => n >= chosen.duration)
                  .map((n) => (
                    <option key={n} value={n}>
                      {n} h
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Votre nom, pour l’aperçu
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
            </label>
            <label>
              Email, pour l’aperçu
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={200}
              />
            </label>
          </div>
          <fieldset>
            <legend>Options à discuter, sans tarif ajouté</legend>
            {optionList.map((o) => (
              <label className="check-line" key={o}>
                <input
                  type="checkbox"
                  checked={addons.includes(o)}
                  onChange={(e) =>
                    setAddons(
                      e.target.checked
                        ? [...addons, o]
                        : addons.filter((v) => v !== o),
                    )
                  }
                />
                {o}
              </label>
            ))}
          </fieldset>
          <p className="form-note">
            Vos coordonnées ne sont ni transmises ni enregistrées.
          </p>
          <button className="text-button" type="button" onClick={() => go(1)}>
            ← Revenir au pack
          </button>
          <button className="site-button" type="submit">
            Voir le récapitulatif →
          </button>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const ref = 'DEMO-' + Date.now().toString(36).toUpperCase();
            try {
              localStorage.setItem(
                bookingKey,
                JSON.stringify({
                  reference: ref,
                  pack,
                  date,
                  time,
                  duration,
                  addons,
                }),
              );
            } catch {
              setStorageWarning(
                'Ce navigateur ne permet pas de conserver le récapitulatif.',
              );
            }
            setReference(ref);
          }}
        >
          <dl className="booking-summary">
            <div>
              <dt>Pack</dt>
              <dd>{chosen.title}</dd>
            </div>
            <div>
              <dt>Espace envisagé</dt>
              <dd>{spaces.find((s) => s.slug === chosen.space)?.title}</dd>
            </div>
            <div>
              <dt>Session simulée</dt>
              <dd>
                {date} · {time} · {duration} h · Africa/Conakry
              </dd>
            </div>
            <div>
              <dt>Options</dt>
              <dd>{addons.join(' · ') || 'Aucune'}</dd>
            </div>
            <div>
              <dt>Coordonnées dans l’aperçu</dt>
              <dd>
                {name} · {email}
              </dd>
            </div>
            <div>
              <dt>Tarif</dt>
              <dd>Sur demande. Aucun montant facturé.</dd>
            </div>
          </dl>
          <label className="check-line">
            <input type="checkbox" required /> Je comprends qu’aucun créneau
            réel ne sera réservé.
          </label>
          <button className="text-button" type="button" onClick={() => go(2)}>
            ← Modifier la session
          </button>
          <button className="site-button" type="submit">
            Terminer la simulation ✓
          </button>
        </form>
      )}
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      {storageWarning && <p role="status">{storageWarning}</p>}
    </div>
  );
}
export function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const names = [
    'Le portrait',
    'La conversation',
    'Le produit',
    'Le mouvement',
    'La matière',
    'Le cadre',
  ];
  return (
    <>
      <div className="gallery-grid">
        {names.map((n, i) => (
          <button
            key={n}
            onClick={() => {
              setSelected(i);
              dialog.current?.showModal();
            }}
            aria-label={`Agrandir l’étude : ${n}`}
          >
            <span className={`gallery-art art-${i}`} aria-hidden="true">
              <i />
              <b>{['◐', '∿', '□', '↗', '◒', '▣'][i]}</b>
            </span>
            <span>
              {n} <small>Étude graphique</small>
            </span>
          </button>
        ))}
      </div>
      <dialog className="gallery-dialog" ref={dialog}>
        <button onClick={() => dialog.current?.close()} className="text-button">
          Fermer ×
        </button>
        <h2>{names[selected]}</h2>
        <div className={`gallery-art art-${selected}`} aria-hidden="true">
          <i />
          <b>{['◐', '∿', '□', '↗', '◒', '▣'][selected]}</b>
        </div>
        <p>
          Composition illustrative. Aucune photographie des locaux ou d’un
          client.
        </p>
      </dialog>
    </>
  );
}
