'use client';
import { useEffect, useRef, useState } from 'react';
import type { Course } from '@smartsell/content/academy';
import { assetUrl, locale, routingConfig, t, urlFor } from '@smartsell/routing';
import { checked, platform } from './client';
import { useLearning, LearningError } from './use-learning';
import { courseProgress, resumeLesson } from './learning-model';
import { FilmWorkshop } from './film-workshop';
import { productionChecklist } from './film-model';
import { GuidedLesson } from './guided-lesson';

type Block = {
  type: string;
  text?: string;
  title?: string;
  level?: number;
  rows?: string[][];
};
type Question = {
  number: number;
  group: string;
  text: string;
  options: string[];
};
type Module = {
  title: string;
  blocks: Block[];
  intro: Block[];
  questions: Question[];
  passScore: number;
};
type Result = {
  score: number;
  total: number;
  passed: boolean;
  feedback: { correct: boolean; answer: number; explanation: string }[];
};
const href = (path: string) => urlFor('academy', locale, path, routingConfig);

function Prompt({ block }: { block: Block }) {
  const [value, setValue] = useState(block.text || '');
  const [message, setMessage] = useState('');
  return (
    <details className="film-prompt">
      <summary>{block.title}</summary>
      <p>
        {t(
          'Personnalisez les éléments entre crochets, puis copiez votre consigne dans votre outil.',
          'Customise the bracketed fields, then copy the prompt into your tool.',
        )}
      </p>
      <label>
        {t('Votre prompt', 'Your prompt')}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          maxLength={20000}
        />
      </label>
      <div className="film-actions">
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value);
              setMessage(t('Prompt copié.', 'Prompt copied.'));
            } catch {
              setMessage(
                t(
                  'Sélectionnez le texte pour le copier.',
                  'Select the text to copy it.',
                ),
              );
            }
          }}
        >
          {t('Copier le prompt', 'Copy prompt')}
        </button>
        <button type="button" onClick={() => setValue(block.text || '')}>
          {t('Réinitialiser', 'Reset')}
        </button>
      </div>
      <p role="status">{message}</p>
    </details>
  );
}
export function FilmLessonBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === 'heading' ? (
          <h3 key={i}>{block.text}</h3>
        ) : block.type === 'table' ? (
          <div
            className="film-table"
            key={i}
            tabIndex={0}
            role="region"
            aria-label={t('Tableau du cours', 'Course table')}
          >
            <table>
              <thead>
                <tr>
                  {block.rows?.[0]?.map((cell, c) => (
                    <th key={c} scope="col">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows?.slice(1).map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : block.type === 'prompt' ? (
          <Prompt key={i} block={block} />
        ) : block.type === 'callout' ? (
          <section key={i} className="film-callout">
            <h4>{block.title}</h4>
            <p>{block.text}</p>
          </section>
        ) : (
          <p key={i}>{block.text}</p>
        ),
      )}
    </>
  );
}
function ModuleQuiz({
  module,
  course,
  index,
  onPassed,
}: {
  module: Module;
  course: string;
  index: number;
  onPassed: () => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    module.questions.map(() => null),
  );
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [cursor, setCursor] = useState(0);
  const question = module.questions[cursor];
  const complete = answers.filter((a) => a !== null).length;
  const feedback = result?.feedback[cursor];
  return (
    <section className="film-quiz">
      <div className="film-section-label">
        {index === 10 ? 'EXAMEN FINAL' : 'QUIZ DU MODULE'} /{' '}
        {module.questions.length} QUESTIONS
      </div>
      <h3>{t('À vous de jouer.', 'Your turn.')}</h3>
      <p>
        {t(
          'Les corrigés apparaissent après l’envoi de toutes vos réponses. Vous pouvez recommencer.',
          'Explanations appear after submitting all answers. You can retry.',
        )}{' '}
        {index === 10 ? '14/20 minimum.' : '10/10 pour valider ce module.'}
      </p>
      <div
        className="film-question-map"
        aria-label={t('Questions du quiz', 'Quiz questions')}
      >
        {module.questions.map((q, i) => (
          <button
            key={q.number}
            aria-current={cursor === i ? 'step' : undefined}
            aria-label={`${t('Question', 'Question')} ${i + 1}${answers[i] !== null ? t(', réponse renseignée', ', answered') : ''}`}
            className={
              result?.feedback[i]?.correct
                ? 'is-correct'
                : answers[i] !== null
                  ? 'is-answered'
                  : ''
            }
            onClick={() => setCursor(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (complete !== answers.length || busy) return;
          setBusy(true);
          setError('');
          try {
            const response = await checked(
              await platform().rpc('ecosystem_submit_course_quiz', {
                course,
                lesson: index,
                answers,
              }),
            );
            setResult(response as Result);
            if (response.passed) onPassed();
          } catch {
            setError(
              t(
                'Envoi impossible. Vérifiez que les modules précédents sont validés, puis réessayez. Votre progression n’a pas été modifiée.',
                'Unable to submit. Complete previous modules, then try again. Your progress has not changed.',
              ),
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        <fieldset disabled={busy || !!result}>
          <legend>
            <small>
              {question.group} · {cursor + 1}/{module.questions.length}
            </small>
            {question.text}
          </legend>
          {question.options.map((option, i) => (
            <label
              className={`film-answer ${answers[cursor] === i ? 'is-selected' : ''}`}
              key={i}
            >
              <input
                type="radio"
                name={`q${cursor}`}
                checked={answers[cursor] === i}
                onChange={() =>
                  setAnswers((current) =>
                    current.map((a, j) => (j === cursor ? i : a)),
                  )
                }
              />
              <span>{String.fromCharCode(65 + i)}</span>
              {option}
            </label>
          ))}
        </fieldset>
        {feedback && (
          <div className="film-feedback">
            <strong>
              {feedback.correct
                ? t('Bonne réponse.', 'Correct.')
                : `${t('Réponse attendue', 'Expected answer')} : ${String.fromCharCode(65 + feedback.answer)}`}
            </strong>
            <p>{feedback.explanation}</p>
          </div>
        )}
        <div className="film-actions">
          <button
            type="button"
            disabled={cursor === 0}
            onClick={() => setCursor((n) => n - 1)}
          >
            ← {t('Précédente', 'Previous')}
          </button>
          {cursor < module.questions.length - 1 && (
            <button type="button" onClick={() => setCursor((n) => n + 1)}>
              {t('Suivante', 'Next')} →
            </button>
          )}
          <button disabled={busy || !!result || complete !== answers.length}>
            {busy
              ? t('Vérification…', 'Checking…')
              : `${t('Envoyer mes réponses', 'Submit answers')} (${complete}/${answers.length})`}
          </button>
        </div>
        {error && <p role="alert">{error}</p>}
      </form>
      {result && (
        <div className="film-quiz-result" role="status">
          <h4>
            {result.score}/{result.total} ·{' '}
            {result.passed
              ? t('Module validé', 'Module completed')
              : t('Encore un effort', 'Try again')}
          </h4>
          <p>
            {result.passed
              ? t(
                  'Votre progression est enregistrée sur votre compte.',
                  'Your progress is saved to your account.',
                )
              : t(
                  'Parcourez les corrigés, relisez la leçon et recommencez.',
                  'Review the explanations and lesson, then retry.',
                )}
          </p>
          <button
            onClick={() => {
              setResult(null);
              setAnswers(module.questions.map(() => null));
              setCursor(0);
            }}
          >
            {t('Repasser le quiz', 'Retry quiz')}
          </button>
        </div>
      )}
    </section>
  );
}
export function FullCourseLearner({ course }: { course: Course }) {
  const { user, progress, loading, error, reload } = useLearning();
  const [current, setCurrent] = useState(0);
  const [tab, setTab] = useState('lesson');
  const [guidePositions, setGuidePositions] = useState<Record<number, number>>(
    {},
  );
  const [module, setModule] = useState<Module | null>(null);
  const [contentError, setContentError] = useState('');
  const [retry, setRetry] = useState(0);
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [entering, setEntering] = useState(false);
  const initialized = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const enrolled = Object.hasOwn(progress, course.slug);
  useEffect(() => {
    if (!loading && !error && enrolled && !initialized.current) {
      initialized.current = true;
      setCurrent(
        resumeLesson(
          course,
          progress,
          new URLSearchParams(window.location.search).get('lesson'),
        ),
      );
    }
  }, [loading, error, enrolled, course, progress]);
  useEffect(() => {
    if (!user || !enrolled) return;
    let active = true;
    setModule(null);
    setContentError('');
    setNotice('');
    setNotes('');
    setSavedNotes('');
    Promise.all([
      platform().rpc('ecosystem_read_course_module', {
        course: course.slug,
        lesson: current,
      }),
      platform()
        .from('academy_workbooks')
        .select('notes')
        .eq('user_id', user.id)
        .eq('course_slug', course.slug)
        .eq('lesson_index', current)
        .maybeSingle(),
    ])
      .then(async ([content, workbook]) => {
        const data = await checked(content);
        const notebook = await checked(workbook);
        if (active) {
          setModule(data as Module);
          setNotes(notebook?.notes || '');
          setSavedNotes(notebook?.notes || '');
        }
      })
      .catch(() => {
        if (active)
          setContentError(
            t(
              'Ce module ne peut pas être ouvert. Vérifiez votre accès à la formation ou réessayez.',
              'Unable to open this module. Check your course access or try again.',
            ),
          );
      });
    return () => {
      active = false;
    };
  }, [user?.id, enrolled, course.slug, current, retry]);
  useEffect(() => {
    if (notes === savedNotes) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [notes, savedNotes]);
  const state = courseProgress(course, progress);
  const go = (index: number) => {
    if (saving || (!state.finished && index > state.next)) return;
    if (
      notes !== savedNotes &&
      !window.confirm(
        t(
          'Votre carnet contient des modifications non enregistrées. Quitter ce module ?',
          'Your notebook has unsaved changes. Leave this module?',
        ),
      )
    )
      return;
    setCurrent(index);
    setTab('lesson');
    window.history.replaceState(null, '', `?lesson=${index + 1}`);
    heading.current?.focus();
  };
  if (loading && !enrolled)
    return (
      <p role="status">
        {t('Ouverture de votre espace…', 'Opening your space…')}
      </p>
    );
  if (error) return <LearningError error={error} retry={reload} />;
  if (!enrolled)
    return (
      <section className="film-access">
        <img
          src={assetUrl('/media/film-course-mariama.png')}
          alt={course.photo.alt}
        />
        <div>
          <p className="film-section-label">FORMATION COMPLÈTE / NIVEAU 2</p>
          <h2>{course.title}</h2>
          <p>
            11 modules · 120 questions ·{' '}
            {t('cours en français', 'lessons in French')}
          </p>
          <p>
            {t(
              'Cette formation complète est gratuite. Ajoutez-la à votre compte confirmé pour retrouver vos modules et votre progression. Les bases du niveau 1 sur l’identité visuelle sont requises.',
              'This complete course is free. Add it to your confirmed account to track your modules and progress. Level 1 visual identity foundations are required.',
            )}
          </p>
          <div className="film-actions">
            <button
              disabled={entering}
              onClick={async () => {
                setEntering(true);
                setNotice('');
                try {
                  await checked(
                    await platform().rpc('ecosystem_enroll', {
                      course: course.slug,
                    }),
                  );
                  reload();
                } catch {
                  setNotice(
                    t(
                      'L’accès n’a pas pu être activé. Vérifiez que votre adresse e-mail est confirmée, puis réessayez.',
                      'Access could not be activated. Check that your email is confirmed, then try again.',
                    ),
                  );
                } finally {
                  setEntering(false);
                }
              }}
            >
              {t('Commencer gratuitement', 'Start for free')}
            </button>
            <a href={`${href('dashboard')}#requests`}>
              {t('Demander un accès', 'Request access')} ↗
            </a>
          </div>
          <p role="status">{notice}</p>
        </div>
      </section>
    );
  return (
    <div className="film-campus" data-kin-off>
      <header className="film-masthead">
        <div>
          <p className="film-section-label">SMARTSELL ACADEMY / CINÉMA & IA</p>
          <h2>{course.title}</h2>
          <p>
            {t('Votre film commence ici.', 'Your film starts here.')}{' '}
            <span>11 modules · 120 questions · FR</span>
          </p>
        </div>
        <div className="film-progress">
          <strong>{state.percent}%</strong>
          <progress
            value={state.done}
            max={11}
            aria-label={t('Progression de la formation', 'Course progress')}
          />
          <span>
            {state.done}/11 {t('modules validés', 'modules completed')}
          </span>
        </div>
      </header>
      <div className="film-layout">
        <aside className="film-outline">
          <a href={href('dashboard')}>← {t('Mon espace', 'My space')}</a>
          <p className="film-section-label">LE PARCOURS</p>
          {course.lessons.map((lesson, i) => (
            <button
              key={i}
              aria-current={current === i ? 'step' : undefined}
              disabled={!state.finished && i > state.next}
              title={
                !state.finished && i > state.next
                  ? t(
                      'Terminez le module précédent pour ouvrir celui-ci.',
                      'Complete the previous module to unlock this one.',
                    )
                  : undefined
              }
              onClick={() => go(i)}
            >
              <span>
                {!state.finished && i > state.next
                  ? '🔒'
                  : progress[course.slug]?.includes(i)
                    ? '✓'
                    : String(i + 1).padStart(2, '0')}
              </span>
              {lesson.title}
            </button>
          ))}
          <a href={`${href('dashboard')}#attestations`}>
            {t('Mes attestations', 'My attestations')} ↗
          </a>
        </aside>
        <main className="film-main">
          <div className="film-module-heading">
            <p className="film-section-label">
              MODULE {String(current + 1).padStart(2, '0')} / 11
            </p>
            <h2 ref={heading} tabIndex={-1}>
              {course.lessons[current].title}
            </h2>
          </div>
          <nav
            className="film-tabs"
            aria-label={t('Sections du module', 'Module sections')}
          >
            {[
              ['lesson', t('Avec votre guide', 'With your guide')],
              ['workshop', t('Expérimenter', 'Experiment')],
              ['quiz', 'Quiz'],
              ['resources', t('Carnet & ressources', 'Notebook & resources')],
            ].map(([id, label]) => (
              <button
                key={id}
                aria-current={tab === id ? 'page' : undefined}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </nav>
          {contentError ? (
            <LearningError
              error={contentError}
              retry={() => setRetry((n) => n + 1)}
            />
          ) : !module ? (
            <p role="status">{t('Chargement du module…', 'Loading module…')}</p>
          ) : (
            <div key={current} className="film-content">
              {tab === 'lesson' ? (
                <GuidedLesson
                  key={current}
                  course={course.slug}
                  index={current}
                  initialPosition={guidePositions[current] || 0}
                  onPosition={(position) =>
                    setGuidePositions((previous) => ({
                      ...previous,
                      [current]: position,
                    }))
                  }
                  blocks={module.blocks}
                  questions={module.questions}
                  renderMaterial={(blocks) => (
                    <FilmLessonBlocks blocks={blocks} />
                  )}
                  workshop={
                    <FilmWorkshop
                      index={current}
                      checklist={
                        current === 10 ? productionChecklist(module.blocks) : []
                      }
                    />
                  }
                  onQuiz={() => setTab('quiz')}
                />
              ) : tab === 'workshop' ? (
                <>
                  <FilmWorkshop
                    key={current}
                    index={current}
                    checklist={
                      current === 10 ? productionChecklist(module.blocks) : []
                    }
                  />
                  <section className="film-reading">
                    <h3>{t('Prompts du module', 'Module prompts')}</h3>
                    {module.blocks
                      .filter((b) => b.type === 'prompt')
                      .map((block, i) => (
                        <Prompt block={block} key={i} />
                      ))}
                    <p>
                      {t(
                        'Réalisez aussi les exercices du module dans votre outil de production. Ces simulations ne génèrent ni images ni vidéos supplémentaires et ne valident pas votre projet.',
                        'Complete the module exercises in your production tool too. These simulations do not generate additional images or videos, or assess your project.',
                      )}
                    </p>
                  </section>
                  <button className="film-next" onClick={() => setTab('quiz')}>
                    {t('Tester mes connaissances', 'Test my knowledge')} →
                  </button>
                </>
              ) : tab === 'quiz' ? (
                <ModuleQuiz
                  module={module}
                  course={course.slug}
                  index={current}
                  onPassed={reload}
                />
              ) : (
                <section className="film-reading">
                  <h3>
                    {t('Mon carnet de production', 'My production notebook')}
                  </h3>
                  <p>
                    {t(
                      'Consignez vos intentions, votre découpage, les liens de vos livrables et les retours de votre pair. Enregistrement privé sur votre compte ; les liens ne sont pas ouverts automatiquement.',
                      'Keep your intention, shot list, deliverable links and peer feedback here. Saved privately to your account; links are not opened automatically.',
                    )}
                  </p>
                  <label>
                    {t('Notes de ce module', 'Module notes')}
                    <textarea
                      rows={14}
                      maxLength={20000}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </label>
                  <div className="film-actions">
                    <button
                      disabled={saving || notes === savedNotes}
                      onClick={async () => {
                        if (!user) return;
                        setSaving(true);
                        setNotice('');
                        try {
                          await checked(
                            await platform().from('academy_workbooks').upsert({
                              user_id: user.id,
                              course_slug: course.slug,
                              lesson_index: current,
                              notes,
                              updated_at: new Date().toISOString(),
                            }),
                          );
                          setSavedNotes(notes);
                          setNotice(t('Carnet enregistré.', 'Notebook saved.'));
                        } catch {
                          setNotice(
                            t(
                              'Enregistrement impossible. Conservez vos notes avant de quitter.',
                              'Unable to save. Keep a copy before leaving.',
                            ),
                          );
                        } finally {
                          setSaving(false);
                        }
                      }}
                    >
                      {saving
                        ? t('Enregistrement…', 'Saving…')
                        : t('Enregistrer mon carnet', 'Save notebook')}
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([notes], {
                          type: 'text/plain;charset=utf-8',
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `smartsell-module-${current + 1}.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                    >
                      {t('Exporter mes notes', 'Export notes')}
                    </button>
                  </div>
                  <p role="status">{notice}</p>
                  <p className="film-editor-note">
                    {t(
                      'Repères du parcours : les durées de plans et restrictions de mise en scène sont des choix pédagogiques prudents. Testez les capacités de votre outil et de sa version. Les règles sur les visages, voix et usages sont celles de ce parcours Smartsell.',
                      'Course guidance: shot lengths and staging limits are conservative workshop choices. Test the capabilities of your tool and version. Face, voice and usage rules belong to this Smartsell course.',
                    )}
                  </p>
                  <details>
                    <summary>
                      {t(
                        'Support complet de ce module',
                        'Full module reference',
                      )}
                    </summary>
                    <FilmLessonBlocks blocks={module.blocks} />
                  </details>
                  <details>
                    <summary>
                      {t(
                        'Introduction et dictionnaire du cours',
                        'Course introduction and glossary',
                      )}
                    </summary>
                    <FilmLessonBlocks blocks={module.intro} />
                  </details>
                </section>
              )}
              {state.finished ? (
                <section className="film-completion">
                  <h3>
                    {t(
                      'Parcours de connaissances validé.',
                      'Knowledge pathway completed.',
                    )}
                  </h3>
                  <p>
                    {t(
                      'Faites relire votre film et son pack par un pair, comme demandé dans le projet final. L’attestation de participation ne remplace pas cette appréciation pratique.',
                      'Have a peer review your film and production pack as required by the final project. The participation attestation does not replace that practical review.',
                    )}
                  </p>
                  <a href={`${href('dashboard')}#attestations`}>
                    {t('Retrouver mon attestation', 'View my attestation')} ↗
                  </a>
                </section>
              ) : (
                current < 10 && (
                  <button
                    className="film-next"
                    disabled={!progress[course.slug]?.includes(current)}
                    onClick={() => go(current + 1)}
                  >
                    {progress[course.slug]?.includes(current)
                      ? t('Module suivant', 'Next module')
                      : t(
                          'Validez le quiz pour débloquer la suite',
                          'Pass the quiz to unlock the next module',
                        )}{' '}
                    →
                  </button>
                )
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
