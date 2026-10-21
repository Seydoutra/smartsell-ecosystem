'use client';
import { useRef, useState } from 'react';
import { t } from '@smartsell/routing';
import { checked, platform } from './client';
import {
  AnswerCards,
  CorrectAnswerCelebration,
  type AnswerFeedback,
} from './quiz-ui';
type QuizModule = {
  questions: {
    number: number;
    group: string;
    text: string;
    options: string[];
  }[];
  passScore: number;
};
type Result = {
  score: number;
  total: number;
  passed: boolean;
  feedback: AnswerFeedback[];
};
export function ModuleQuiz({
  module,
  course,
  index,
  onPassed,
}: {
  module: QuizModule;
  course: string;
  index: number;
  onPassed: () => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    module.questions.map(() => null),
  );
  const [corrections, setCorrections] = useState<(AnswerFeedback | null)[]>(
    () => module.questions.map(() => null),
  );
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [cursor, setCursor] = useState(0);
  const [celebration, setCelebration] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const question = module.questions[cursor];
  const completed = corrections.filter(Boolean).length;
  const feedback = result?.feedback[cursor] || corrections[cursor];
  const go = (next: number) => {
    setCursor(next);
    setError('');
    heading.current?.focus();
  };
  async function checkAnswer() {
    if (answers[cursor] === null || busy || feedback) return;
    setBusy(true);
    setError('');
    try {
      const response = (await checked(
        await platform().rpc('ecosystem_answer_course_question', {
          course,
          lesson: index,
          question: cursor,
          choice: answers[cursor],
        }),
      )) as AnswerFeedback;
      setCorrections((current) =>
        current.map((answer, i) => (i === cursor ? response : answer)),
      );
      if (response.correct) setCelebration((n) => n + 1);
    } catch {
      setError(
        t(
          'La vérification a échoué. Votre réponse est conservée : réessayez.',
          'Unable to check. Your selected answer is kept: try again.',
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  async function finish() {
    if (busy || result || completed !== answers.length) return;
    setBusy(true);
    setError('');
    try {
      const response = (await checked(
        await platform().rpc('ecosystem_submit_course_quiz', {
          course,
          lesson: index,
          answers,
        }),
      )) as Result;
      setResult(response);
      if (response.passed) {
        setCelebration((n) => n + 1);
        onPassed();
      }
    } catch {
      setError(
        t(
          'L’enregistrement a échoué. Vos réponses restent disponibles : réessayez. Le module n’est pas encore validé.',
          'Saving failed. Your answers are kept: retry. The module is not yet completed.',
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="film-quiz academy-quiz-experience">
      <CorrectAnswerCelebration event={celebration} />
      <p className="film-section-label">
        {index === 10
          ? t('EXAMEN FINAL', 'FINAL ASSESSMENT')
          : t('QUIZ DU MODULE', 'MODULE QUIZ')}
      </p>
      <h3 ref={heading} tabIndex={-1}>
        {t('Un défi à la fois.', 'One challenge at a time.')}
      </h3>
      <p className="academy-quiz-intro">
        {t(
          'Choisissez une carte, puis validez votre réponse. Découvrez la correction avant de passer à la question suivante.',
          'Choose a card, then confirm your answer. Read the feedback before moving on.',
        )}{' '}
        {module.passScore}/{module.questions.length}{' '}
        {t('pour valider le module.', 'to complete the module.')}
      </p>
      <div className="academy-quiz-progress">
        <span>
          {t('Question', 'Question')} {cursor + 1}/{module.questions.length}
        </span>
        <span>
          {completed}/{module.questions.length}{' '}
          {t('réponses vérifiées', 'answers checked')}
        </span>
        <progress
          value={completed}
          max={module.questions.length}
          aria-label={t('Réponses vérifiées', 'Checked answers')}
        />
      </div>
      <nav
        className="academy-quiz-steps"
        aria-label={t('Questions du quiz', 'Quiz questions')}
      >
        {module.questions.map((q, i) => (
          <button
            key={q.number}
            type="button"
            disabled={busy || (i > completed && !corrections[i])}
            aria-current={cursor === i ? 'step' : undefined}
            aria-label={`${t('Question', 'Question')} ${i + 1}${corrections[i] ? (corrections[i]?.correct ? t(', bonne réponse', ', correct') : t(', à revoir', ', review')) : ''}`}
            className={
              corrections[i]
                ? corrections[i]?.correct
                  ? 'is-correct'
                  : 'is-incorrect'
                : ''
            }
            onClick={() => go(i)}
          >
            {corrections[i]?.correct ? '✓' : i + 1}
          </button>
        ))}
      </nav>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void checkAnswer();
        }}
      >
        <AnswerCards
          question={
            <>
              <small className="academy-question-group">{question.group}</small>
              {question.text}
            </>
          }
          options={question.options}
          name={`module-${index}-question-${cursor}`}
          value={answers[cursor]}
          disabled={busy || !!feedback || !!result}
          feedback={feedback}
          onChange={(value) =>
            setAnswers((current) =>
              current.map((answer, i) => (i === cursor ? value : answer)),
            )
          }
        />
        {feedback && (
          <div
            className={`academy-quiz-feedback ${feedback.correct ? 'is-correct' : 'is-incorrect'}`}
            role="status"
          >
            <strong>
              {feedback.correct
                ? t(
                    'Bravo, c’est la bonne réponse !',
                    'Well done, that’s correct!',
                  )
                : t(
                    'On apprend aussi en se trompant.',
                    'Mistakes help us learn.',
                  )}
            </strong>
            <p>{feedback.explanation}</p>
            {!feedback.correct && (
              <small>
                {t(
                  'Cette réponse compte dans votre tentative. Vous pourrez recommencer le quiz après le bilan.',
                  'This answer counts in this attempt. You can retry the quiz after the results.',
                )}
              </small>
            )}
          </div>
        )}
        <div className="academy-quiz-actions">
          <button
            type="button"
            disabled={busy || cursor === 0}
            onClick={() => go(cursor - 1)}
          >
            ← {t('Revoir', 'Review')}
          </button>
          {!feedback && !result && (
            <button
              className="academy-quiz-primary"
              disabled={busy || answers[cursor] === null}
            >
              {busy
                ? t('Je vérifie…', 'Checking…')
                : t('C’est ma réponse', 'Confirm my answer')}{' '}
              →
            </button>
          )}
          {feedback && cursor < module.questions.length - 1 && (
            <button
              type="button"
              className="academy-quiz-primary"
              disabled={busy}
              onClick={() => go(cursor + 1)}
            >
              {t('Question suivante', 'Next question')} →
            </button>
          )}
          {completed === answers.length && !result && (
            <button
              type="button"
              className="academy-quiz-primary"
              disabled={busy}
              onClick={() => void finish()}
            >
              {busy
                ? t('Enregistrement…', 'Saving…')
                : t(
                    'Terminer et enregistrer mon quiz',
                    'Finish and save my quiz',
                  )}{' '}
              →
            </button>
          )}
        </div>
        {error && <p role="alert">{error}</p>}
      </form>
      {result && (
        <div className="film-quiz-result" role="status">
          <h4>
            {result.score}/{result.total} ·{' '}
            {result.passed
              ? t('Module validé', 'Module completed')
              : t('Encore un effort', 'Keep going')}
          </h4>
          <p>
            {result.passed
              ? t(
                  index === 10
                    ? 'Votre progression est enregistrée. Retrouvez votre bilan dans votre espace.'
                    : 'Votre progression est enregistrée. Le module suivant est disponible.',
                  index === 10
                    ? 'Your progress is saved. Find your results in your space.'
                    : 'Your progress is saved. The next module is available.',
                )
              : t(
                  'Reprenez les explications qui vous ont posé problème, puis tentez à nouveau votre chance.',
                  'Review the explanations you found difficult, then try again.',
                )}
          </p>
          <button
            onClick={() => {
              setResult(null);
              setAnswers(module.questions.map(() => null));
              setCorrections(module.questions.map(() => null));
              go(0);
            }}
          >
            {t('Repasser le quiz', 'Retry quiz')} →
          </button>
        </div>
      )}
    </section>
  );
}
