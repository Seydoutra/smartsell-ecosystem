'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { withBasePath, t } from '@smartsell/routing';
import { checked, platform } from './client';
import { teachingMoments, type TeachingBlock } from './teaching-model';

type Question = { number: number; text: string; options: string[] };
type Feedback = { correct: boolean; answer: number; explanation: string };
function TeacherVoice({
  text,
  onSpeaking,
}: {
  text: string;
  onSpeaking: (value: boolean) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState('');
  const [rate, setRate] = useState(1);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  useEffect(() => {
    setPlaying(false);
    setMessage('');
    onSpeaking(false);
    return () => {
      if ('speechSynthesis' in window) {
        if (utterance.current) {
          utterance.current.onend = null;
          utterance.current.onerror = null;
        }
        window.speechSynthesis.cancel();
      }
    };
  }, [text, onSpeaking]);
  const stop = () => {
    if (utterance.current) {
      utterance.current.onend = null;
      utterance.current.onerror = null;
    }
    window.speechSynthesis.cancel();
    setPlaying(false);
    onSpeaking(false);
  };
  return (
    <div className="teacher-voice">
      <button
        onClick={() => {
          if (!('speechSynthesis' in window)) {
            setMessage(
              t(
                'Lecture audio indisponible sur ce navigateur.',
                'Audio reading is unavailable in this browser.',
              ),
            );
            return;
          }
          if (playing) {
            stop();
            return;
          }
          window.speechSynthesis.cancel();
          const speech = new SpeechSynthesisUtterance(text);
          speech.lang = 'fr-FR';
          speech.rate = rate;
          const french = window.speechSynthesis
            .getVoices()
            .find((v) => v.lang.toLowerCase().startsWith('fr'));
          if (french) speech.voice = french;
          speech.onend = () => {
            setPlaying(false);
            onSpeaking(false);
          };
          speech.onerror = () => {
            setPlaying(false);
            onSpeaking(false);
            setMessage(
              t(
                'La voix n’est pas disponible. Vous pouvez poursuivre à l’écran.',
                'The voice is unavailable. You can continue on screen.',
              ),
            );
          };
          utterance.current = speech;
          setPlaying(true);
          onSpeaking(true);
          window.speechSynthesis.speak(speech);
        }}
      >
        {playing
          ? t('Arrêter la voix', 'Stop voice')
          : t('Écouter l’explication', 'Listen to the explanation')}
      </button>
      <label>
        {t('Vitesse', 'Speed')}
        <select
          value={rate}
          onChange={(e) => {
            if (playing) stop();
            setRate(Number(e.target.value));
          }}
        >
          <option value="1">1×</option>
          <option value="1.15">1,15×</option>
          <option value="1.3">1,3×</option>
        </select>
      </label>
      <p role="status">{message}</p>
    </div>
  );
}
export function GuidedLesson({
  course,
  index,
  blocks,
  questions,
  renderMaterial,
  workshop,
  onQuiz,
  preview = false,
  initialPosition = 0,
  onPosition,
}: {
  course: string;
  index: number;
  blocks: TeachingBlock[];
  questions: Question[];
  renderMaterial: (blocks: TeachingBlock[]) => ReactNode;
  workshop: ReactNode;
  onQuiz: () => void;
  preview?: boolean;
  initialPosition?: number;
  onPosition?: (position: number) => void;
}) {
  const moments = teachingMoments(blocks, questions.length);
  const [current, setCurrent] = useState(
    Math.min(Math.max(0, initialPosition), moments.length - 1),
  );
  const [speaking, setSpeaking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [simpler, setSimpler] = useState(false);
  const [choice, setChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const title = useRef<HTMLHeadingElement>(null);
  const moment = moments[current];
  const question =
    moment.question !== undefined ? questions[moment.question] : null;
  const summary = moment.speech.match(/^[^.!?]+[.!?]?/)?.[0] || moment.speech;
  const analogy = moment.analogy;
  const go = (next: number) => {
    setCurrent(next);
    onPosition?.(next);
    setExpanded(false);
    setSimpler(false);
    setChoice(null);
    setFeedback(null);
    setError('');
    title.current?.focus();
  };
  return (
    <section className="guided-class">
      <div className={`teacher-presence ${speaking ? 'is-speaking' : ''}`}>
        <div className="teacher-portrait">
          <img
            src={withBasePath('/media/academy-guide.png')}
            alt={t(
              'Avatar illustré du guide pédagogique virtuel Smartsell',
              'Illustrated avatar of the Smartsell virtual learning guide',
            )}
          />
          <span className="teacher-wave" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <strong>{t('Votre guide Smartsell', 'Your Smartsell guide')}</strong>
        <small>
          {t(
            'Guide virtuel · illustration IA · voix de synthèse à la demande',
            'Virtual guide · AI illustration · optional synthetic voice',
          )}
        </small>
        <TeacherVoice
          text={
            simpler
              ? analogy || summary
              : feedback
                ? feedback.explanation
                : question
                  ? `${moment.speech} ${question.text} ${question.options.map((option, i) => `${String.fromCharCode(65 + i)}. ${option}`).join(' ')}`
                  : moment.speech
          }
          onSpeaking={setSpeaking}
        />
        <div className="teacher-pace">
          <span>
            {t('Séquence', 'Sequence')} {current + 1}/{moments.length}
          </span>
          <progress
            value={current + 1}
            max={moments.length}
            aria-label={t(
              'Avancement de cette séquence guidée',
              'Guided sequence position',
            )}
          />
          <small>
            {t(
              'Le quiz final du module enregistre votre validation.',
              'The module quiz records your completion.',
            )}
          </small>
        </div>
      </div>
      <div className="teacher-stage">
        <p className="film-section-label">
          {moment.kind === 'question'
            ? t('À VOUS DE RÉPONDRE', 'YOUR TURN TO ANSWER')
            : moment.kind === 'example'
              ? t('REGARDONS ENSEMBLE', 'LET’S LOOK TOGETHER')
              : t('ON AVANCE ENSEMBLE', 'LET’S LEARN TOGETHER')}
        </p>
        <h3 ref={title} tabIndex={-1}>
          {moment.title}
        </h3>
        <div className="teacher-dialogue" key={`${current}-${simpler}`}>
          <p>{simpler ? analogy || summary : moment.speech}</p>
        </div>
        {moment.kind === 'explain' && (
          <div className="teacher-learner-controls">
            <button
              aria-pressed={simpler}
              onClick={() => setSimpler((v) => !v)}
            >
              {simpler
                ? t('Revenir à l’idée', 'Back to the concept')
                : analogy
                  ? t('Expliquez-moi autrement', 'Explain it another way')
                  : t('Résumer l’idée', 'Summarise the idea')}
            </button>
            <button
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {moment.example
                ? t('Montrer un exemple', 'Show an example')
                : t('Passer à la manipulation', 'Try it hands-on')}
            </button>
          </div>
        )}
        {expanded && (
          <div className="teacher-demonstration">
            {moment.example ? renderMaterial([moment.example]) : workshop}
          </div>
        )}
        {moment.material && (
          <div className="teacher-demonstration">
            {renderMaterial([moment.material])}
          </div>
        )}
        {moment.kind === 'practice' && workshop}
        {question && (
          <form
            className="teacher-question"
            onSubmit={async (e) => {
              e.preventDefault();
              if (choice === null || busy || preview) return;
              setBusy(true);
              setError('');
              try {
                setFeedback(
                  (await checked(
                    await platform().rpc('ecosystem_answer_course_question', {
                      course,
                      lesson: index,
                      question: moment.question,
                      choice,
                    }),
                  )) as Feedback,
                );
              } catch {
                setError(
                  t(
                    'Votre réponse n’a pas pu être vérifiée. Réessayez.',
                    'Unable to check your answer. Try again.',
                  ),
                );
              } finally {
                setBusy(false);
              }
            }}
          >
            <fieldset disabled={busy}>
              <legend>{question.text}</legend>
              {question.options.map((option, i) => (
                <label
                  className={`film-answer ${choice === i ? 'is-selected' : ''}`}
                  key={i}
                >
                  <input
                    type="radio"
                    name={`practice-${current}`}
                    checked={choice === i}
                    onChange={() => {
                      setChoice(i);
                      setFeedback(null);
                    }}
                  />
                  <span>{String.fromCharCode(65 + i)}</span>
                  {option}
                </label>
              ))}
            </fieldset>
            <button disabled={busy || choice === null || preview}>
              {busy
                ? t('Je vérifie…', 'Checking…')
                : t('Vérifier mon raisonnement', 'Check my reasoning')}
            </button>
            {preview && (
              <p>
                {t(
                  'Aperçu local : réponse vérifiable uniquement avec votre compte.',
                  'Local preview: answers require your account.',
                )}
              </p>
            )}
            {error && <p role="alert">{error}</p>}
            {feedback && (
              <div className="teacher-feedback" role="status">
                <strong>
                  {feedback.correct
                    ? t('Oui, c’est cela.', 'Yes, that’s right.')
                    : t(
                        'Regardons le raisonnement.',
                        'Let’s review the reasoning.',
                      )}
                </strong>
                <p>{feedback.explanation}</p>
                {!feedback.correct && (
                  <small>
                    {t(
                      'Modifiez votre réponse et réessayez avant de continuer.',
                      'Change your answer and retry before continuing.',
                    )}
                  </small>
                )}
              </div>
            )}
          </form>
        )}
        <div className="teacher-navigation">
          <button
            disabled={current === 0 || busy}
            onClick={() => go(current - 1)}
          >
            ← {t('Reprendre', 'Back')}
          </button>
          {current < moments.length - 1 ? (
            <button
              className="teacher-continue"
              disabled={busy || (!!question && !feedback?.correct)}
              onClick={() => go(current + 1)}
            >
              {question
                ? t('J’ai compris, on continue', 'I understand, continue')
                : t('Continuons ensemble', 'Let’s continue')}{' '}
              →
            </button>
          ) : (
            <button className="teacher-continue" onClick={onQuiz}>
              {t('Passer au quiz de validation', 'Open the completion quiz')} →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
