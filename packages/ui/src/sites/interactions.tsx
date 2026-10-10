'use client';
import { Icon } from '../icons';
import { readBrief } from '../home';
import { useEffect, useRef, useState } from 'react';
import type { VerticalId } from '@smartsell/types';
import {
  courses,
  articles,
  packs,
  spaces,
  type Course,
} from '@smartsell/content/sites';
import { urlFor, routingConfig, locale, t } from '@smartsell/routing';
const href = (id: VerticalId, path = '') =>
  urlFor(id, locale, path, routingConfig);
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
        t(
          'Le navigateur ne peut pas enregistrer cette progression. Elle reste disponible jusqu’à la fermeture de la page.',
          'Your browser cannot save this progress. It stays available until you close the page.',
        ),
      );
  };
  return { progress, loaded, save, warning };
}
export function DemoNote({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="demo-note">
      <span aria-hidden="true">◇</span>
      <div>
        <strong>
          {t('Parcours de démonstration', 'Demonstration journey')}
        </strong>
        <p>
          {children ||
            t(
              'Explorez librement. Aucun compte, paiement ou engagement réel n’est créé.',
              'Explore freely. No real account, payment or commitment is created.',
            )}
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
        {t(
          'Ce module est un aperçu pédagogique. Votre choix est enregistré uniquement sur cet appareil.',
          'This course is a learning preview. Your choice is saved only on this device.',
        )}
      </DemoNote>
      <h2>{course.title}</h2>
      <dl className="facts">
        <div>
          <dt>{t('Niveau', 'Level')}</dt>
          <dd>{course.level}</dd>
        </div>
        <div>
          <dt>{t('Format envisagé', 'Planned format')}</dt>
          <dd>{course.hours} heures</dd>
        </div>
        <div>
          <dt>{t('Aperçu ici', 'Preview here')}</dt>
          <dd>{t('3 leçons guidées', '3 guided lessons')}</dd>
        </div>
      </dl>
      {done ? (
        <div role="status">
          <h3>
            {t(
              'Votre module de démonstration est prêt.',
              'Your demonstration course is ready.',
            )}
          </h3>
          <p>
            {t(
              'Aucune inscription réelle n’a été envoyée.',
              'No real enrolment has been sent.',
            )}
          </p>
          <a
            className="site-button"
            href={href('academy', `learn/${course.slug}`)}
          >
            {t('Commencer le module', 'Start the course')}{' '}
            <Icon name="arrowUpRight" />
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
            {t('Votre intention', 'Your intention')}
            <select required defaultValue="">
              <option value="" disabled>
                {t('Choisir une intention', 'Choose an intention')}
              </option>
              <option>
                {t(
                  'Découvrir une nouvelle pratique',
                  'Discover a new practice',
                )}
              </option>
              <option>
                {t('Développer mon projet', 'Develop my project')}
              </option>
              <option>
                {t('Explorer pour mon équipe', 'Explore for my team')}
              </option>
            </select>
          </label>
          <label className="check-line">
            <input type="checkbox" required />{' '}
            {t(
              'J’ai compris qu’il s’agit d’un parcours de démonstration.',
              'I understand this is a demonstration journey.',
            )}
          </label>
          <button disabled={!loaded} className="site-button" type="submit">
            {t('Ajouter à mon espace démo', 'Add to my demo space')}{' '}
            <Icon name="arrowUpRight" />
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
        {t(
          'Leçons, quiz et progression sur cet appareil. Cet aperçu ne remplace pas le module complet annoncé.',
          'Lessons, quizzes and progress on this device. This preview does not replace the announced full course.',
        )}
      </DemoNote>
      <div className="learn-layout">
        <aside className="lesson-nav">
          <p className="micro">{t('VOTRE PARCOURS', 'YOUR JOURNEY')}</p>
          <progress
            max={3}
            value={completed.length}
            aria-label={t('Progression du module', 'Course progress')}
          />
          <p>{completed.length} / 3 leçons terminées</p>
          {course.lessons.map((l, i) => (
            <button
              key={l.title}
              aria-current={i === current ? 'step' : undefined}
              onClick={() => select(i)}
            >
              <span>{completed.includes(i) ? '' : `0${i + 1}`}</span>
              {l.title}
            </button>
          ))}
          <a href={href('academy', 'dashboard')}>
            {t('Mon espace', 'My space')} <Icon name="arrowUpRight" />
          </a>
        </aside>
        <article className="lesson-body" aria-labelledby="lesson-title">
          <p className="micro">LEÇON 0{current + 1} / 03</p>
          <h2 id="lesson-title">{content.title}</h2>
          <p>{content.copy}</p>
          <section className="exercise">
            <h3>{t('À vous de pratiquer', 'Your turn to practise')}</h3>
            <p>{content.exercise}</p>
            <label>
              {t('Vos notes de pratique', 'Your practice notes')}
              <textarea
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                rows={4}
                placeholder={t(
                  'Notez votre première proposition…',
                  'Write down your first proposal…',
                )}
              />
            </label>
            <small>
              {t(
                'Notes temporaires : elles ne sont ni envoyées ni enregistrées.',
                'Temporary notes: they are neither sent nor saved.',
              )}
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
                  ? t(
                      'Bonne réponse. Vous pouvez valider cette leçon.',
                      'Correct. You can complete this lesson.',
                    )
                  : t(
                      'Reprenez le repère dans le texte et essayez à nouveau.',
                      'Look back at the hint in the text and try again.',
                    ),
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
              {t('Vérifier ma réponse', 'Check my answer')}
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
                t(
                  'Leçon terminée. Votre progression a été mise à jour.',
                  'Lesson complete. Your progress has been updated.',
                ),
              );
            }}
          >
            {t('Valider la leçon', 'Complete the lesson')} <Icon name="check" />
          </button>
          {current < 2 && (
            <button className="text-button" onClick={() => select(current + 1)}>
              {t('Leçon suivante', 'Next lesson')} <Icon name="arrowRight" />
            </button>
          )}
          {completed.length === 3 && (
            <a className="text-button" href={href('academy', 'certificates')}>
              {t('Voir mon récapitulatif', 'See my summary')}{' '}
              <Icon name="arrowRight" />
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
        {t(
          'Vous utilisez un espace local de démonstration. Aucun compte réel n’est ouvert.',
          'You are using a local demonstration space. No real account is opened.',
        )}
      </DemoNote>
      <nav
        className="dashboard-links"
        aria-label={t('Espace apprenant', 'Learner space')}
      >
        <a href={href('academy', 'dashboard')}>
          {t('Tableau de bord', 'Dashboard')}
        </a>
        <a href={href('academy', 'my-courses')}>
          {t('Mes modules', 'My courses')}
        </a>
        <a href={href('academy', 'certificates')}>
          {t('Récapitulatifs', 'Summaries')}
        </a>
        <a href={href('academy', 'resources')}>
          {t('Ressources', 'Resources')}
        </a>
        <a href={href('academy', 'support')}>Support</a>
      </nav>
      {!loaded ? (
        <p role="status">
          {t('Lecture de votre progression…', 'Reading your progress…')}
        </p>
      ) : certificates ? (
        <>
          <h2>{t('Vos parcours terminés', 'Your completed courses')}</h2>
          {finished.length === 0 ? (
            <p>
              {t(
                'Terminez les trois leçons d’un module pour afficher son récapitulatif.',
                'Complete the three lessons of a course to display its summary.',
              )}
            </p>
          ) : (
            finished.map((c) => (
              <article className="certificate" key={c.slug}>
                <p className="micro">
                  {t(
                    'SMARTSELL ACADEMY / DÉMONSTRATION',
                    'SMARTSELL ACADEMY / DEMONSTRATION',
                  )}
                </p>
                <h3>{c.title}</h3>
                <p>
                  {t(
                    'Trois leçons validées sur cet appareil.',
                    'Three lessons completed on this device.',
                  )}
                </p>
                <strong>
                  {t(
                    'Récapitulatif pédagogique, sans valeur de certification officielle.',
                    'Learning summary, with no value as an official certification.',
                  )}
                </strong>
                <button className="text-button" onClick={() => window.print()}>
                  {t('Imprimer le récapitulatif', 'Print the summary')}
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
              <span>{t('modules choisis', 'courses chosen')}</span>
            </div>
            <div>
              <strong>
                {chosen.reduce((n, c) => n + progress[c.slug].length, 0)}
              </strong>
              <span>{t('leçons terminées', 'lessons completed')}</span>
            </div>
            <div>
              <strong>{finished.length}</strong>
              <span>{t('parcours terminés', 'courses completed')}</span>
            </div>
          </div>
          <h2>{t('Reprendre votre mouvement', 'Pick up your momentum')}</h2>
          {chosen.length === 0 ? (
            <div className="empty-state">
              <p>
                {t(
                  'Votre espace attend sa première exploration.',
                  'Your space is waiting for its first exploration.',
                )}
              </p>
              <a href={href('academy', 'courses')} className="site-button">
                {t('Choisir un module', 'Choose a course')}{' '}
                <Icon name="arrowUpRight" />
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
                    {t('Reprendre', 'Resume')} <Icon name="arrowRight" />
                  </a>
                </article>
              ))}
            </div>
          )}
        </>
      )}
      {chosen.length > 0 && (
        <button className="text-button" onClick={() => save({})}>
          {t(
            'Effacer ma progression de démonstration',
            'Clear my demo progress',
          )}
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
          {t('Rechercher un article', 'Search for an article')}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              'Design, outils, création…',
              'Design, tools, creativity…',
            )}
          />
        </label>
        <label>
          {t('Rubrique', 'Section')}
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
            <span aria-hidden="true">
              <Icon name="arrowUpRight" />
            </span>
          </a>
        ))}
      </div>
      {result.length === 0 && (
        <p>
          {t(
            'Aucun article ne correspond. Essayez un autre terme ou une autre rubrique.',
            'No article matches. Try another term or another section.',
          )}
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
            setStatus(t('Lien copié.', 'Link copied.'));
          } catch {
            setStatus(
              t(
                'Copiez l’adresse de cette page depuis votre navigateur.',
                'Copy this page’s address from your browser.',
              ),
            );
          }
        }}
      >
        {t('Copier le lien', 'Copy the link')} <Icon name="arrowUpRight" />
      </button>
      <span role="status">{status}</span>
    </div>
  );
}
export function DraftForm({ site }: { site: string }) {
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const [brief, setBrief] = useState('');
  useEffect(() => setBrief(readBrief()), []);
  return (
    <div className="workflow">
      <p className="form-note">
        {t(
          'Ce formulaire prépare un brouillon. Il ne transmet aucune demande.',
          'This form prepares a draft. It sends no request.',
        )}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          setDraft(
            t(
              `Bonjour Smartsell ${site},\n\nJe suis ${f.get('name')} (${f.get('company') || 'projet personnel'}).\nMon adresse de réponse : ${f.get('email')}\nMon besoin : ${f.get('need')}\nÉchéance : ${f.get('date') || 'à discuter'}\nBudget envisagé : ${f.get('budget') || 'à discuter'}\n\n${f.get('message')}`,
              `Hello Smartsell ${site},\n\nI am ${f.get('name')} (${f.get('company') || 'personal project'}).\nReply to: ${f.get('email')}\nMy need: ${f.get('need')}\nDeadline: ${f.get('date') || 'to discuss'}\nPlanned budget: ${f.get('budget') || 'to discuss'}\n\n${f.get('message')}`,
            ),
          );
          setStatus(
            t(
              'Votre brouillon est prêt. Vous pouvez le copier ; aucune demande n’a été envoyée.',
              'Your draft is ready. You can copy it; no request has been sent.',
            ),
          );
        }}
      >
        <div className="form-grid">
          <label>
            {t('Votre nom', 'Your name')}
            <input name="name" required autoComplete="name" maxLength={100} />
          </label>
          <label>
            {t('Votre email', 'Your email')}
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={200}
            />
          </label>
          <label>
            {t('Entreprise ou projet', 'Company or project')}
            <input name="company" autoComplete="organization" maxLength={160} />
          </label>
          <label>
            {t('Votre besoin', 'Your need')}
            <input
              key={brief}
              name="need"
              required
              maxLength={200}
              defaultValue={brief}
            />
          </label>
          <label>
            {t('Échéance souhaitée', 'Desired deadline')}
            <input name="date" type="date" />
          </label>
          <label>
            {t('Budget envisagé, en GNF', 'Planned budget, in GNF')}
            <input name="budget" placeholder="Facultatif" maxLength={100} />
          </label>
        </div>
        <label>
          {t('Parlez-nous du projet', 'Tell us about the project')}
          <textarea name="message" required rows={5} maxLength={4000} />
        </label>
        <button className="site-button" type="submit">
          {t('Préparer mon message', 'Prepare my message')}{' '}
          <Icon name="arrowUpRight" />
        </button>
      </form>
      <p role="status">{status}</p>
      {draft && (
        <div className="draft">
          <label>
            {t('Votre message', 'Your message')}
            <textarea value={draft} readOnly rows={9} />
          </label>
          <button
            className="site-button secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(draft);
                setStatus(
                  t(
                    'Brouillon copié. Vous choisissez son destinataire et son envoi.',
                    'Draft copied. You choose who receives it and how it is sent.',
                  ),
                );
              } catch {
                setStatus(
                  t(
                    'Sélectionnez le texte du brouillon pour le copier.',
                    'Select the draft text to copy it.',
                  ),
                );
              }
            }}
          >
            {t('Copier le brouillon', 'Copy the draft')}
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
      <p className="micro">
        {t('LES NOUVELLES DE LA MAISON', 'NEWS FROM THE HOUSE')}
      </p>
      <h2>{t('Garder une idée d’avance.', 'Stay one idea ahead.')}</h2>
      <p>
        {t(
          'Un aperçu de notre futur parcours d’abonnement. Aucun email n’est envoyé ni enregistré.',
          'A preview of our future subscription journey. No email is sent or saved.',
        )}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
          setDone(true);
        }}
      >
        <label>
          {t('Votre adresse email', 'Your email address')}
          <input type="email" required placeholder="vous@exemple.com" />
        </label>
        <button type="submit" className="site-button">
          {t('Tester l’abonnement', 'Try subscribing')}{' '}
          <Icon name="arrowUpRight" />
        </button>
      </form>
      {done && (
        <p role="status">
          {t(
            'Simulation terminée. Vous n’êtes pas inscrit à une newsletter réelle.',
            'Simulation complete. You are not subscribed to a real newsletter.',
          )}
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
        {t(
          'Calendrier et packs illustratifs. Aucun paiement, aucune disponibilité réelle, aucune réservation auprès de Studios.',
          'Illustrative calendar and packs. No payment, no real availability, no booking with Studios.',
        )}
      </DemoNote>
      <ol className="booking-steps">
        {[
          t('Le projet', 'The project'),
          t('La session', 'The session'),
          t('Le récapitulatif', 'The summary'),
        ].map((text, i) => (
          <li key={text} aria-current={step === i + 1 ? 'step' : undefined}>
            <span>0{i + 1}</span>
            {text}
          </li>
        ))}
      </ol>
      <h2 tabIndex={-1} ref={heading}>
        {step === 1
          ? t('Quel sera votre format ?', 'What will your format be?')
          : step === 2
            ? t('Composer votre session.', 'Put together your session.')
            : t('Tout est dans le cadre.', 'Everything is in frame.')}
      </h2>
      {reference ? (
        <div role="status">
          <h3>Simulation terminée : {reference}</h3>
          <p>
            {t(
              'Aucun créneau n’a été réservé. Le récapitulatif sans coordonnées est conservé sur cet appareil.',
              'No slot has been booked. The summary, without contact details, is kept on this device.',
            )}
          </p>
          <p>
            {chosen.title} ·{' '}
            {new Date(date + 'T00:00:00Z').toLocaleDateString('fr-GN', {
              timeZone: 'Africa/Conakry',
            })}{' '}
            · {time} · {duration} h
          </p>
          <p>
            {addons.length
              ? addons.join(' · ')
              : t('Sans option supplémentaire', 'No extra option')}
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
            {t(
              'Effacer cette simulation et recommencer',
              'Clear this simulation and start again',
            )}
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
            <legend>
              {t(
                'Choisissez un pack de démonstration',
                'Choose a demonstration pack',
              )}
            </legend>
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
            {t('Composer la session', 'Put the session together')}{' '}
            <Icon name="arrowRight" />
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
              {t('Date de simulation', 'Simulation date')}
              <input
                type="date"
                required
                min={minimum}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label>
              {t('Heure, Conakry', 'Time, Conakry')}
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
              {t('Durée indicative', 'Indicative duration')}
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
              {t('Votre nom, pour l’aperçu', 'Your name, for the preview')}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
            </label>
            <label>
              {t('Email, pour l’aperçu', 'Email, for the preview')}
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
            <legend>
              {t(
                'Options à discuter, sans tarif ajouté',
                'Options to discuss, at no added price',
              )}
            </legend>
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
            {t(
              'Vos coordonnées ne sont ni transmises ni enregistrées.',
              'Your details are neither sent nor saved.',
            )}
          </p>
          <button className="text-button" type="button" onClick={() => go(1)}>
            <Icon name="arrowLeft" /> {t('Revenir au pack', 'Back to the pack')}
          </button>
          <button className="site-button" type="submit">
            {t('Voir le récapitulatif', 'See the summary')}{' '}
            <Icon name="arrowRight" />
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
                t(
                  'Ce navigateur ne permet pas de conserver le récapitulatif.',
                  'This browser cannot keep the summary.',
                ),
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
              <dt>{t('Espace envisagé', 'Planned space')}</dt>
              <dd>{spaces.find((s) => s.slug === chosen.space)?.title}</dd>
            </div>
            <div>
              <dt>{t('Session simulée', 'Simulated session')}</dt>
              <dd>
                {date} · {time} · {duration} h · Africa/Conakry
              </dd>
            </div>
            <div>
              <dt>Options</dt>
              <dd>{addons.join(' · ') || 'Aucune'}</dd>
            </div>
            <div>
              <dt>
                {t('Coordonnées dans l’aperçu', 'Details in the preview')}
              </dt>
              <dd>
                {name} · {email}
              </dd>
            </div>
            <div>
              <dt>{t('Tarif', 'Price')}</dt>
              <dd>
                {t(
                  'Sur demande. Aucun montant facturé.',
                  'On request. Nothing is charged.',
                )}
              </dd>
            </div>
          </dl>
          <label className="check-line">
            <input type="checkbox" required />{' '}
            {t(
              'Je comprends qu’aucun créneau réel ne sera réservé.',
              'I understand that no real slot will be booked.',
            )}
          </label>
          <button className="text-button" type="button" onClick={() => go(2)}>
            <Icon name="arrowLeft" />{' '}
            {t('Modifier la session', 'Edit the session')}
          </button>
          <button className="site-button" type="submit">
            {t('Terminer la simulation', 'Finish the simulation')}{' '}
            <Icon name="check" />
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
    t('Le portrait', 'The portrait'),
    t('La conversation', 'The conversation'),
    t('Le produit', 'The product'),
    t('Le mouvement', 'The movement'),
    t('La matière', 'The material'),
    t('Le cadre', 'The frame'),
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
            aria-label={`${t('Agrandir l’étude', 'Enlarge the study')} : ${n}`}
          >
            <span className={`gallery-art art-${i}`} aria-hidden="true">
              <i />
              <b>
                <Icon
                  name={
                    (
                      [
                        'eye',
                        'microphone',
                        'file',
                        'dashboard',
                        'star',
                        'puzzle',
                      ] as const
                    )[i]
                  }
                />
              </b>
            </span>
            <span>
              {n} <small>{t('Étude graphique', 'Graphic study')}</small>
            </span>
          </button>
        ))}
      </div>
      <dialog className="gallery-dialog" ref={dialog}>
        <button onClick={() => dialog.current?.close()} className="text-button">
          {t('Fermer ×', 'Close')}
        </button>
        <h2>{names[selected]}</h2>
        <div className={`gallery-art art-${selected}`} aria-hidden="true">
          <i />
          <b>
            <Icon
              name={
                (
                  [
                    'eye',
                    'microphone',
                    'file',
                    'dashboard',
                    'star',
                    'puzzle',
                  ] as const
                )[selected]
              }
            />
          </b>
        </div>
        <p>
          {t(
            'Composition illustrative. Aucune photographie des locaux ou d’un client.',
            'Illustrative composition. No photograph of the premises or of a client.',
          )}
        </p>
      </dialog>
    </>
  );
}
