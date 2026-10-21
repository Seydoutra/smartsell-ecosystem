'use client';
import { lazy, Suspense, useState } from 'react';
import {
  locale,
  routingConfig,
  t,
  urlFor,
  withBasePath,
} from '@smartsell/routing';
const Game = lazy(() =>
  import('./film-game').then((m) => ({ default: m.FilmGame })),
);

export function AcademyMissionPreview() {
  const [started, setStarted] = useState(false);
  const signup =
    urlFor('academy', locale, 'dashboard', routingConfig) + '?auth=signup';
  return (
    <div className="academy-mission-preview">
      {started ? (
        <Suspense
          fallback={
            <p role="status">
              {t('Préparation du plateau…', 'Preparing the scene…')}
            </p>
          }
        >
          <Game
            index={4}
            course="court-metrage-ia-complet"
            userId=""
            preview
            onQuiz={() => window.location.assign(signup)}
          />
        </Suspense>
      ) : (
        <div className="academy-demo-cover">
          <img
            src={withBasePath('/media/film-course-mariama.png')}
            alt={t(
              'Scène de fiction : Mariama dans son atelier de couture',
              'Fictional scene: Mariama in her sewing workshop',
            )}
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div>
            <span>
              {t(
                'MISSION DÉCOUVERTE · 1 MINUTE',
                'DISCOVERY MISSION · 1 MINUTE',
              )}
            </span>
            <h3>{t('À vous de cadrer.', 'You frame the scene.')}</h3>
            <p>
              {t(
                'Un écran, une héroïne et le bon point de vue. Trouvez le cadrage qui raconte son histoire.',
                'One screen, one heroine and the right viewpoint. Find the framing that tells her story.',
              )}
            </p>
            <button type="button" onClick={() => setStarted(true)}>
              {t('Jouer la mission', 'Play the mission')} →
            </button>
            <small>
              {t(
                'Sans compte · Aucune progression enregistrée · Mission en français',
                'No account · No progress saved · Mission in French',
              )}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
