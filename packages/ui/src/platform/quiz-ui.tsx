'use client';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { t } from '@smartsell/routing';
import { createPortal } from 'react-dom';

export type AnswerFeedback = {
  correct: boolean;
  answer: number;
  explanation: string;
};
export function AnswerCards({
  question,
  options,
  name,
  value,
  onChange,
  disabled = false,
  feedback,
}: {
  question: ReactNode;
  options: string[];
  name: string;
  value: number | null;
  onChange: (value: number) => void;
  disabled?: boolean;
  feedback?: AnswerFeedback | null;
}) {
  return (
    <fieldset className="academy-answer-set" disabled={disabled}>
      <legend>{question}</legend>
      <div className="academy-answer-grid">
        {options.map((option, index) => {
          const selected = value === index;
          const correct = feedback?.answer === index;
          const wrong = !!feedback && selected && !feedback.correct;
          return (
            <label
              key={index}
              className={`academy-answer ${selected ? 'is-selected' : ''} ${correct ? 'is-correct' : ''} ${wrong ? 'is-incorrect' : ''}`}
            >
              <input
                className="academy-option-input"
                type="radio"
                name={name}
                checked={selected}
                onChange={() => onChange(index)}
                value={index}
                required
              />
              <span className="academy-answer-letter" aria-hidden="true">
                {correct ? '✓' : wrong ? '×' : String.fromCharCode(65 + index)}
              </span>
              <span className="academy-answer-copy">
                {option}
                <small>
                  {correct
                    ? t('Bonne réponse', 'Correct answer')
                    : wrong
                      ? t('À revoir', 'Review this')
                      : selected
                        ? t('Votre choix', 'Your choice')
                        : t('Choisir cette réponse', 'Choose this answer')}
                </small>
              </span>
              <span className="academy-answer-check" aria-hidden="true">
                {selected ? '●' : '○'}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const particles = Array.from({ length: 64 }, (_, i) => {
  const angle = i * 2.399963;
  return {
    '--dx': `${Math.cos(angle) * (24 + (i % 9) * 3)}vw`,
    '--dy': `${Math.sin(angle) * (18 + (i % 7) * 4)}vh`,
    '--fall': `${18 + (i % 4) * 6}vh`,
    '--spin': `${(i % 2 ? 1 : -1) * (180 + (i % 7) * 90)}deg`,
    '--delay': `${(i % 5) * 25}ms`,
    '--duration': `${1200 + (i % 5) * 80}ms`,
    backgroundColor: ['#efe638', '#ab70da', '#faf3ff', '#fb9476', '#7bdbcd'][
      i % 5
    ],
    borderRadius: i % 3 === 0 ? '50%' : '2px',
  } as CSSProperties;
});
// Decorative only. The server-verified feedback supplies the accessible congratulations.
export function CorrectAnswerCelebration({ event }: { event: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!event) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, [event]);
  if (!visible) return null;
  return createPortal(
    <div className="academy-confetti" aria-hidden="true" key={event}>
      {particles.map((style, i) => (
        <i key={i} style={style} />
      ))}
    </div>,
    document.body,
  );
}
