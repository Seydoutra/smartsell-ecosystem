'use client';
import { useEffect, useRef, useState } from 'react';
import type { Course } from '@smartsell/content/academy';
import { locale, routingConfig, t, urlFor } from '@smartsell/routing';
import { platform, checked } from './client';
import { AccountBoundary } from './auth';
import { useLearning, LearningError } from './use-learning';
import { courseProgress, resumeLesson } from './learning-model';
import { FullCourseLearner } from './full-course';
import { AnswerCards, CorrectAnswerCelebration } from './quiz-ui';
export { Dashboard } from './learning-dashboard';
const href = (path: string) => urlFor('academy', locale, path, routingConfig);
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
  const [answerState, setAnswerState] = useState<boolean | null>(null);
  const [celebration, setCelebration] = useState(0);
  const completed = progress[course.slug] || [];
  const content = course.lessons[current];
  const initialized = useRef('');
  useEffect(() => {
    if (
      loading ||
      error ||
      !(course.slug in progress) ||
      initialized.current === course.slug
    )
      return;
    setCurrent(
      resumeLesson(
        course,
        progress,
        new URLSearchParams(window.location.search).get('lesson'),
      ),
    );
    initialized.current = course.slug;
  }, [loading, error, course, progress]);
  const state = courseProgress(course, progress);
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
      <CorrectAnswerCelebration event={celebration} />
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
            value={state.done}
            aria-label={t('Progression du module', 'Course progress')}
          />
          <p>
            {state.done} / {course.lessons.length}{' '}
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
                setAnswerState(null);
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
                setAnswerState(!!result);
                if (result) {
                  setCelebration((n) => n + 1);
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
            <AnswerCards
              question={content.question}
              options={content.options}
              name={`preview-${current}`}
              value={choice}
              disabled={busy || answerState === true}
              feedback={
                answerState === true && choice !== null
                  ? { correct: true, answer: choice, explanation: '' }
                  : null
              }
              onChange={(value) => {
                setChoice(value);
                setAnswerState(null);
                setMessage('');
              }}
            />
            <button
              className="site-button"
              disabled={busy || choice === null || answerState === true}
            >
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
                setAnswerState(null);
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
      {course.full ? (
        <FullCourseLearner course={course} />
      ) : (
        <LearnerSpace course={course} />
      )}
    </AccountBoundary>
  );
}
