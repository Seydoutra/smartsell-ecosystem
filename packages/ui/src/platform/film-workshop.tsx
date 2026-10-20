'use client';
import { useState } from 'react';
import { assetUrl, t } from '@smartsell/routing';
const still = () => assetUrl('/media/film-course-mariama.png');
const steps = [
  'Écrire',
  'Bibles',
  'Découpage',
  'Images-clés',
  'Animation',
  'Son',
  'Montage',
  'Livraison',
];

function ProductionOrder({ sound = false }: { sound?: boolean }) {
  const target = sound
    ? ['Ambiance', 'Voix off', 'Musique', 'Bruitage']
    : steps;
  const [order, setOrder] = useState(() => [...target].reverse());
  const [checked, setChecked] = useState(false);
  const valid = order.every((s, i) => s === target[i]);
  return (
    <section className="film-simulator">
      <p className="film-section-label">
        {sound ? 'ATELIER SON / ORDRE DES COUCHES' : 'LA CHAÎNE DE PRODUCTION'}
      </p>
      <h3>
        {t('Remettez chaque étape à sa place.', 'Put the stages in order.')}
      </h3>
      <p>
        {sound
          ? t(
              'Construisez la timeline de travail. Cette maquette représente les pistes, sans lecture audio.',
              'Build the working timeline. This model represents tracks without audio playback.',
            )
          : t(
              'Déplacez les étapes avec les flèches. Chaque étape prépare la suivante.',
              'Move stages with the arrows. Each stage prepares the next.',
            )}
      </p>
      <ol className={sound ? 'film-sound-tracks' : 'film-sort'}>
        {order.map((s, i) => (
          <li key={s}>
            <b>{i + 1}</b>
            <span>{s}</span>
            {sound && <i aria-hidden="true" />}
            <button
              aria-label={`${t('Monter', 'Move up')} ${s}`}
              disabled={i === 0}
              onClick={() => {
                setChecked(false);
                setOrder((items) => {
                  const copy = [...items];
                  [copy[i - 1], copy[i]] = [copy[i], copy[i - 1]];
                  return copy;
                });
              }}
            >
              ↑
            </button>
            <button
              aria-label={`${t('Descendre', 'Move down')} ${s}`}
              disabled={i === order.length - 1}
              onClick={() => {
                setChecked(false);
                setOrder((items) => {
                  const copy = [...items];
                  [copy[i + 1], copy[i]] = [copy[i], copy[i + 1]];
                  return copy;
                });
              }}
            >
              ↓
            </button>
          </li>
        ))}
      </ol>
      <button onClick={() => setChecked(true)}>
        {t('Vérifier mon ordre', 'Check order')}
      </button>
      {checked && (
        <p role="status">
          {valid
            ? t('C’est le bon ordre.', 'Correct order.')
            : `${t('Comparez avec la chaîne du cours', 'Compare with the course sequence')} : ${target.join(' → ')}`}
        </p>
      )}
    </section>
  );
}
function Budget() {
  const [duration, setDuration] = useState(90);
  const [ratio, setRatio] = useState(5);
  const plans = Math.ceil(duration / 4);
  return (
    <section className="film-simulator">
      <p className="film-section-label">LAB / BUDGET DE PRODUCTION</p>
      <h3>
        {t('Avant la première génération.', 'Before the first generation.')}
      </h3>
      <label>
        {t('Durée visée', 'Target duration')} : {duration} s
        <input
          type="range"
          min="15"
          max="180"
          step="5"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </label>
      <label>
        {t('Essais par plan retenu', 'Attempts per retained shot')} : {ratio}
        <input
          type="range"
          min="1"
          max="10"
          value={ratio}
          onChange={(e) => setRatio(Number(e.target.value))}
        />
      </label>
      <div className="film-budget" aria-live="polite">
        <div>
          <strong>{plans}</strong>
          <span>{t('plans estimés à 4 s', 'estimated 4-second shots')}</span>
        </div>
        <div>
          <strong>{plans * ratio}</strong>
          <span>{t('essais pour ces plans', 'attempts for these shots')}</span>
        </div>
      </div>
      <p>
        {t(
          'Simulation pédagogique : arrondi supérieur de durée ÷ 4, multiplié par le nombre d’essais. Les bibles, images-clés, licences et coûts des outils sont à budgéter séparément.',
          'Teaching estimate: duration ÷ 4 rounded up, multiplied by attempts. Reference bibles, keyframes, licences and tool costs are separate.',
        )}
      </p>
    </section>
  );
}
function Framing({ grade = false }: { grade?: boolean }) {
  const [ratio, setRatio] = useState('16:9');
  const [position, setPosition] = useState(50);
  const [temperature, setTemperature] = useState(25);
  const [split, setSplit] = useState(50);
  const width = ratio === '9:16' ? 31.64 : ratio === '1:1' ? 56.25 : 100;
  return (
    <section className="film-simulator">
      <p className="film-section-label">
        {grade ? 'LAB / ÉTALONNAGE' : 'LAB / CADRAGE'}
      </p>
      <h3>
        {grade
          ? t('Unifier la couleur.', 'Unify colour.')
          : t(
              'Un cadre. Plusieurs histoires.',
              'One frame. Different stories.',
            )}
      </h3>
      <p>
        {t(
          'Image illustrative générée par IA pour le personnage fictif Mariama. Manipulez les réglages pour observer leur effet.',
          'AI-generated illustrative still of the fictional character Mariama. Adjust the controls to observe their effects.',
        )}
      </p>
      <div className="film-frame">
        <img
          src={still()}
          alt={t(
            'Mariama assise dans une cour au lever du jour',
            'Mariama sitting in a courtyard at dawn',
          )}
        />
        {grade ? (
          <img
            className="film-graded"
            src={still()}
            alt=""
            style={{
              filter: `sepia(${temperature}%) saturate(${100 + temperature}%) contrast(106%)`,
              clipPath: `inset(0 0 0 ${split}%)`,
            }}
          />
        ) : (
          <div
            className="film-crop"
            style={{
              width: `${width}%`,
              left: `${((100 - width) * position) / 100}%`,
            }}
          >
            <span>{ratio}</span>
          </div>
        )}
      </div>
      {grade ? (
        <>
          <label>
            {t('Chaleur', 'Warmth')} : {temperature}
            <input
              type="range"
              min="0"
              max="70"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
            />
          </label>
          <label>
            {t('Comparaison avant / après', 'Before / after comparison')}
            <input
              type="range"
              min="0"
              max="100"
              value={split}
              onChange={(e) => setSplit(Number(e.target.value))}
            />
          </label>
          <p>
            {t(
              'À gauche : image d’origine. À droite : traitement simulé. Comparez la peau et les ombres ; un filtre seul ne remplace pas un étalonnage plan par plan.',
              'Left: original still. Right: simulated treatment. Compare skin and shadows; one filter does not replace shot-by-shot grading.',
            )}
          </p>
        </>
      ) : (
        <>
          <div className="film-actions">
            {['16:9', '1:1', '9:16'].map((r) => (
              <button
                key={r}
                aria-pressed={ratio === r}
                onClick={() => setRatio(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <label>
            {t('Position de la fenêtre de recadrage', 'Crop window position')}
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
            />
          </label>
          <p aria-live="polite">
            {ratio === '16:9'
              ? t(
                  'Le master conserve le cadre complet.',
                  'The master keeps the full frame.',
                )
              : position < 25 || position > 75
                ? t(
                    'Observez le visage : cette fenêtre décentrée risque de le couper.',
                    'Check the face: this off-centre window may crop it.',
                  )
                : t(
                    'La fenêtre centrale protège le sujet pour cette image.',
                    'The central window preserves the subject in this image.',
                  )}
          </p>
        </>
      )}
    </section>
  );
}
function Axis() {
  const [crossed, setCrossed] = useState(false);
  return (
    <section className="film-simulator">
      <p className="film-section-label">LAB / CONTINUITÉ</p>
      <h3>{t('Le sens de l’écran.', 'Screen direction.')}</h3>
      <svg
        className="film-axis"
        viewBox="0 0 640 260"
        role="img"
        aria-label={t(
          'Schéma vu du dessus : axe personnage et positions de caméra',
          'Top view: character axis and camera positions',
        )}
      >
        <line
          x1="40"
          y1="130"
          x2="600"
          y2="130"
          stroke="#eddc39"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
        <circle cx="320" cy="130" r="26" fill="#ae85cc" />
        <path
          d="M350 130h120l-15 -10m15 10l-15 10"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
        />
        <text x="300" y="137" fill="#21152c" fontSize="15">
          M
        </text>
        <rect x="180" y="190" width="50" height="30" rx="5" fill="#fff" />
        <text x="180" y="244" fill="#fff" fontSize="15">
          Plan A
        </text>
        <rect
          x="420"
          y={crossed ? 30 : 190}
          width="50"
          height="30"
          rx="5"
          fill={crossed ? '#ff9b9b' : '#eddc39'}
        />
        <text x="420" y={crossed ? 20 : 244} fill="#fff" fontSize="15">
          Plan B
        </text>
      </svg>
      <button aria-pressed={crossed} onClick={() => setCrossed((v) => !v)}>
        {crossed
          ? t('Revenir du même côté', 'Return to the same side')
          : t(
              'Faire franchir l’axe à la caméra B',
              'Move camera B across the axis',
            )}
      </button>
      <p role="status">
        {crossed
          ? t(
              'La caméra B franchit l’axe : le sens apparent du regard peut s’inverser entre les plans. Préparez un raccord ou restez du même côté.',
              'Camera B crosses the axis: apparent gaze direction can reverse between shots. Plan a transition or stay on the same side.',
            )
          : t(
              'Les deux caméras restent du même côté : vous conservez le sens apparent du regard.',
              'Both cameras stay on the same side: apparent gaze direction is preserved.',
            )}
      </p>
    </section>
  );
}
function Motion() {
  const [camera, setCamera] = useState(false);
  const [person, setPerson] = useState(false);
  return (
    <section className="film-simulator">
      <p className="film-section-label">LAB / CONSIGNE D’ANIMATION</p>
      <h3>{t('Un mouvement à la fois.', 'One movement at a time.')}</h3>
      <div className="film-frame">
        <img
          src={still()}
          alt={t(
            'Image-clé illustrative avant animation',
            'Illustrative keyframe before animation',
          )}
        />
      </div>
      <div className="film-actions">
        <button aria-pressed={camera} onClick={() => setCamera((v) => !v)}>
          {t('Mouvement de caméra', 'Camera motion')} {camera ? '✓' : '+'}
        </button>
        <button aria-pressed={person} onClick={() => setPerson((v) => !v)}>
          {t('Mouvement du personnage', 'Character motion')}{' '}
          {person ? '✓' : '+'}
        </button>
      </div>
      <p role="status">
        {camera && person
          ? t(
              'Consigne à simplifier : deux mouvements concurrents. Dans la méthode du cours, choisissez la caméra OU le personnage.',
              'Simplify the prompt: two competing motions. In this course method, choose camera OR character.',
            )
          : camera || person
            ? t(
                'Une seule famille de mouvement : consigne plus facile à contrôler. Vérifiez aussi la dernière image.',
                'One family of motion is easier to control. Check the last frame too.',
              )
            : t(
                'Plan fixe : le rythme peut venir du son et du montage.',
                'Static shot: rhythm can come from sound and editing.',
              )}
      </p>
      <p>
        {t(
          'Cet atelier analyse votre consigne ; il ne fabrique pas de vidéo.',
          'This workshop analyses your prompt; it does not generate video.',
        )}
      </p>
    </section>
  );
}
export function FilmWorkshop({
  index,
  checklist = [],
}: {
  index: number;
  checklist?: string[];
}) {
  const [done, setDone] = useState<number[]>([]);
  if (index === 10)
    return (
      <section className="film-simulator">
        <p className="film-section-label">PRÉPARER LA RELECTURE PAR UN PAIR</p>
        <h3>
          {t('Votre checklist de production.', 'Your production checklist.')}
        </h3>
        <p>
          {done.length}/{checklist.length}{' '}
          {t(
            'points examinés. Ces cases servent à votre travail personnel et ne valident pas le quiz.',
            'items reviewed. These boxes support your work and do not complete the quiz.',
          )}
        </p>
        <div className="film-checklist">
          {checklist.map((item, i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={done.includes(i)}
                onChange={(e) =>
                  setDone((v) =>
                    e.target.checked ? [...v, i] : v.filter((n) => n !== i),
                  )
                }
              />
              {item}
            </label>
          ))}
        </div>
      </section>
    );
  if (index === 0 || index === 9)
    return (
      <>
        <Budget />
        <ProductionOrder />
      </>
    );
  if (index === 1) return <ProductionOrder />;
  if (index === 3) return <Axis />;
  if (index === 5) return <Motion />;
  if (index === 6) return <ProductionOrder sound />;
  return <Framing grade={index === 7} />;
}
