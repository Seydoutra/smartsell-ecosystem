'use client';
import { useEffect, useState } from 'react';
import { courses, type Course } from '@smartsell/content/academy';
import { locale, routingConfig, t, urlFor } from '@smartsell/routing';
import { platform, checked } from './client';
import { AccountBoundary, useAccount } from './auth';
import { AccountRequests } from './requests';
const href = (path: string) => urlFor('academy', locale, path, routingConfig);
type Progress = Record<string, number[]>;
function useLearning() {
  const { user } = useAccount();
  const [progress, setProgress] = useState<Progress>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!user) return;
    let active = true;
    setLoading(true);
    setError('');
    Promise.all([
      platform()
        .from('academy_enrollments')
        .select('course_slug')
        .eq('user_id', user.id),
      platform()
        .from('academy_progress')
        .select('course_slug,lesson_index')
        .eq('user_id', user.id),
    ])
      .then(async ([enrollments, lessons]) => {
        const e = await checked(enrollments);
        const l = await checked(lessons);
        if (!active) return;
        const next: Progress = Object.fromEntries(
          (e || []).map((row) => [row.course_slug, []]),
        );
        for (const row of l || [])
          next[row.course_slug]?.push(row.lesson_index);
        setProgress(next);
      })
      .catch(() => {
        if (active)
          setError(
            t(
              'Impossible de lire votre progression. Réessayez.',
              'Unable to load your progress. Try again.',
            ),
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.id, retry]);
  return {
    user,
    progress,
    loading,
    error,
    reload: () => setRetry((n) => n + 1),
  };
}
function LearningError({ error, retry }: { error: string; retry: () => void }) {
  return error ? (
    <div className="ss-learner-error" role="alert">
      <p>{error}</p>
      <button className="text-button" onClick={retry}>
        {t('Réessayer', 'Try again')}
      </button>
    </div>
  ) : null;
}
function EnrollmentCard({
  course,
  onEnrolled,
}: {
  course: Course;
  onEnrolled?: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return (
    <div className="workflow">
      <p className="micro">SMARTSELL ACADEMY / APERÇU GRATUIT</p>
      <h2>{course.title}</h2>
      <p>
        {t(
          'Ajoutez les trois leçons de découverte à votre espace. Votre inscription et votre progression seront enregistrées sur votre compte. Cet aperçu ne délivre pas de certificat de formation.',
          'Add three introductory lessons to your space. Your enrolment and progress are saved to your account. This preview does not award a training certificate.',
        )}
      </p>
      <button
        className="site-button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError('');
          try {
            await checked(
              await platform().rpc('ecosystem_enroll', { course: course.slug }),
            );
            if (onEnrolled) onEnrolled();
            else window.location.assign(href(`learn/${course.slug}`));
          } catch {
            setError(
              t(
                'L’inscription a échoué. Réessayez.',
                'Enrolment failed. Try again.',
              ),
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy
          ? t('Inscription…', 'Enrolling…')
          : t('Ajouter gratuitement à mon espace', 'Add to my space for free')}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
export function Enrollment({ course }: { course: Course }) {
  return (
    <AccountBoundary>
      <EnrollmentCard course={course} />
    </AccountBoundary>
  );
}
function LearnerSpace({ course }: { course: Course }) {
  const { progress, loading, error, reload } = useLearning();
  const [current, setCurrent] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const completed = progress[course.slug] || [];
  const content = course.lessons[current];
  if (loading)
    return (
      <p role="status">
        {t('Lecture de votre progression…', 'Loading your progress…')}
      </p>
    );
  if (error) return <LearningError error={error} retry={reload} />;
  if (!(course.slug in progress))
    return <EnrollmentCard course={course} onEnrolled={reload} />;
  return (
    <>
      <p className="ss-lesson-state">
        {t(
          'Aperçu gratuit · 3 leçons · progression synchronisée avec votre compte. Les réponses sont vérifiées avant validation.',
          'Free preview · 3 lessons · progress synced to your account. Answers are checked before completion.',
        )}
      </p>
      <div className="learn-layout">
        <aside className="lesson-nav">
          <p className="micro">{t('VOTRE PARCOURS', 'YOUR JOURNEY')}</p>
          <progress
            max={course.lessons.length}
            value={completed.length}
            aria-label={t('Progression du module', 'Course progress')}
          />
          <p>
            {completed.length} / {course.lessons.length}{' '}
            {t('leçons terminées', 'lessons completed')}
          </p>
          {course.lessons.map((lesson, index) => (
            <button
              key={lesson.title}
              aria-current={current === index ? 'step' : undefined}
              onClick={() => {
                setCurrent(index);
                setChoice(null);
                setMessage('');
              }}
            >
              {completed.includes(index)
                ? '✓'
                : String(index + 1).padStart(2, '0')}{' '}
              {lesson.title}
            </button>
          ))}
          <a href={href('dashboard')}>{t('Mon espace', 'My space')} →</a>
        </aside>
        <article className="lesson-body">
          <p className="micro">
            {t('LEÇON', 'LESSON')} {current + 1} / {course.lessons.length}
          </p>
          <h2>{content.title}</h2>
          <p>{content.copy}</p>
          <section className="exercise">
            <h3>{t('À vous de pratiquer', 'Your turn to practise')}</h3>
            <p>{content.exercise}</p>
            <p>
              <small>
                {t(
                  'Réalisez l’exercice dans votre propre document. Aucun texte personnel n’est envoyé par cette page.',
                  'Complete the exercise in your own document. This page does not send any personal notes.',
                )}
              </small>
            </p>
          </section>
          <form
            className="quiz"
            onSubmit={async (e) => {
              e.preventDefault();
              if (choice === null) return;
              setBusy(true);
              setMessage('');
              try {
                const result = await checked(
                  await platform().rpc('ecosystem_complete_lesson', {
                    course: course.slug,
                    lesson: current,
                    choice,
                  }),
                );
                if (result) {
                  setMessage(
                    t(
                      'Bonne réponse. Leçon validée et progression enregistrée.',
                      'Correct. Lesson completed and progress saved.',
                    ),
                  );
                  reload();
                } else
                  setMessage(
                    t(
                      'Relisez la leçon et essayez une autre réponse.',
                      'Review the lesson and try another answer.',
                    ),
                  );
              } catch {
                setMessage(
                  t(
                    'L’enregistrement a échoué. Réessayez : votre leçon n’est pas encore validée.',
                    'Saving failed. Try again: this lesson is not yet completed.',
                  ),
                );
              } finally {
                setBusy(false);
              }
            }}
          >
            <fieldset disabled={busy}>
              <legend>{content.question}</legend>
              {content.options.map((option, index) => (
                <label className="check-line" key={option}>
                  <input
                    type="radio"
                    name="answer"
                    checked={choice === index}
                    onChange={() => setChoice(index)}
                    required
                  />
                  {option}
                </label>
              ))}
            </fieldset>
            <button className="site-button" disabled={busy || choice === null}>
              {busy
                ? t('Vérification…', 'Checking…')
                : t(
                    'Vérifier et valider la leçon',
                    'Check and complete lesson',
                  )}
            </button>
            <p role="status">{message}</p>
          </form>
          {current < course.lessons.length - 1 && (
            <button
              className="text-button"
              onClick={() => {
                setCurrent((n) => n + 1);
                setChoice(null);
                setMessage('');
              }}
            >
              {t('Leçon suivante', 'Next lesson')} →
            </button>
          )}
        </article>
      </div>
    </>
  );
}
export function Learner({ course }: { course: Course }) {
  return (
    <AccountBoundary>
      <LearnerSpace course={course} />
    </AccountBoundary>
  );
}
function LearningDashboard() {
  const { user, progress, loading, error, reload } = useLearning();
  const [name, setName] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!user) return;
    let active = true;
    platform()
      .from('profiles')
      .select('display_name')
      .eq('id', user.id)
      .single()
      .then(({ data, error }) => {
        if (active && !error) setName(data?.display_name || '');
      });
    return () => {
      active = false;
    };
  }, [user?.id]);
  const chosen = courses.filter((c) => c.slug in progress);
  const finished = chosen.filter(
    (c) => progress[c.slug].length === c.lessons.length,
  );
  return (
    <>
      <nav
        className="dashboard-links"
        aria-label={t('Espace apprenant', 'Learner space')}
      >
        <a href={href('dashboard')}>
          {t('Mon tableau de bord', 'My dashboard')}
        </a>
        <a href={href('courses')}>
          {t('Explorer les modules', 'Browse courses')}
        </a>
        <a href={href('corporate')}>
          {t('Formation entreprise', 'Company training')}
        </a>
      </nav>
      <p>
        {t(
          'Les leçons de découverte sont gratuites. Les formations accompagnées se réservent auprès de Smartsell.',
          'Introductory lessons are free. Contact Smartsell to book instructor-led training.',
        )}
      </p>
      <LearningError error={error} retry={reload} />
      {loading ? (
        <p role="status">{t('Chargement…', 'Loading…')}</p>
      ) : (
        !error && (
          <>
            <div className="dashboard-stats">
              <div>
                <strong>{chosen.length}</strong>
                <span>{t('modules inscrits', 'enrolled courses')}</span>
              </div>
              <div>
                <strong>
                  {chosen.reduce(
                    (total, c) => total + progress[c.slug].length,
                    0,
                  )}
                </strong>
                <span>{t('leçons terminées', 'lessons completed')}</span>
              </div>
              <div>
                <strong>{finished.length}</strong>
                <span>{t('aperçus terminés', 'previews completed')}</span>
              </div>
            </div>
            <h2>{t('Votre prochain pas.', 'Your next step.')}</h2>
            {chosen.length === 0 ? (
              <div className="empty-state">
                <p>
                  {t(
                    'Votre espace est prêt. Choisissez votre premier module.',
                    'Your space is ready. Choose your first course.',
                  )}
                </p>
                <a className="site-button" href={href('courses')}>
                  {t('Choisir un module', 'Choose a course')} →
                </a>
              </div>
            ) : (
              <div className="catalog-grid">
                {chosen.map((c) => (
                  <article className="compact-card" key={c.slug}>
                    <p className="micro">{c.category}</p>
                    <h3>{c.title}</h3>
                    <progress
                      max={c.lessons.length}
                      value={progress[c.slug].length}
                      aria-label={c.title}
                    />
                    <p>
                      {progress[c.slug].length} / {c.lessons.length}{' '}
                      {t('leçons terminées', 'lessons completed')}
                    </p>
                    <a className="text-link" href={href(`learn/${c.slug}`)}>
                      {t('Reprendre le module', 'Resume course')} →
                    </a>
                  </article>
                ))}
              </div>
            )}
          </>
        )
      )}
      <AccountRequests />
      <section>
        <h2>{t('Votre profil', 'Your profile')}</h2>
        <form
          className="ss-learner-profile"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!user) return;
            setBusy(true);
            setNotice('');
            try {
              await checked(
                await platform()
                  .from('profiles')
                  .update({ display_name: name.trim() })
                  .eq('id', user.id)
                  .select('id')
                  .single(),
              );
              setNotice(t('Profil enregistré.', 'Profile saved.'));
            } catch {
              setNotice(
                t(
                  'Le profil n’a pas pu être enregistré.',
                  'Unable to save profile.',
                ),
              );
            } finally {
              setBusy(false);
            }
          }}
        >
          <label>
            {t('Votre nom', 'Your name')}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
              autoComplete="name"
            />
          </label>
          <button className="site-button secondary" disabled={busy}>
            {t('Enregistrer mon profil', 'Save profile')}
          </button>
        </form>
        <p role="status">{notice}</p>
      </section>
    </>
  );
}
export function Dashboard() {
  return (
    <AccountBoundary>
      <LearningDashboard />
    </AccountBoundary>
  );
}
