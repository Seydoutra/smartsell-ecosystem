'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  withBasePath,
  t,
  locale,
  urlFor,
  routingConfig,
} from '@smartsell/routing';
import { platform, checked } from './client';
import { CorrectAnswerCelebration } from './quiz-ui';
import { TeacherVoice } from './guided-lesson';
import {
  initial,
  restore,
  trainingReady,
  type Configuration,
} from './film-game-model';
const still = () => withBasePath('/media/film-course-mariama.png');
const production = [
  'Écrire',
  'Bibles',
  'Découpage',
  'Images-clés',
  'Animation',
  'Son',
  'Montage',
  'Livraison',
];
const montage = [
  'Le lieu',
  'L’héroïne',
  'Le déclencheur',
  'L’hésitation',
  'La décision',
  'Le geste',
  'Le résultat',
  'L’ouverture',
];
const repairs = [
  'Stabiliser le visage',
  'Rétablir le sens du regard',
  'Unifier la lumière',
  'Remplacer la musique sans licence',
  'Préparer le format vertical',
];
const missions = [
  [
    'Le studio s’éveille',
    'Construisez la chaîne qui rend le film possible.',
    'Cliquez les huit étapes dans leur ordre de production. Une erreur vous laisse réessayer.',
  ],
  [
    'Un plan. Une intention.',
    'Transformez une idée trop chargée en plan réalisable.',
    'Gardez une seule action, choisissez le gros plan pour l’émotion et une durée de 4 secondes dans ce défi.',
  ],
  [
    'Le secret de Mariama',
    'Retrouvez l’identité qui doit survivre à chaque plan.',
    'La référence de ce défi : tenue indigo, lumière du matin, machine à coudre. Faites coïncider les trois repères.',
  ],
  [
    'L’autre côté du regard',
    'Déplacez la caméra sans perdre le spectateur.',
    'Les deux caméras doivent rester du même côté de l’axe jaune. Déplacez B et observez le regard.',
  ],
  [
    'Sauvez le cadre',
    'Adaptez votre scène au téléphone.',
    'Passez en 9:16 et centrez la fenêtre pour préserver le visage. Visez une position entre 45 et 55.',
  ],
  [
    'Faites respirer le plan',
    'Donnez de la vie sans faire dériver votre image.',
    'Animez la caméra OU le personnage. Vérifiez ensuite votre image de fin.',
  ],
  [
    'Le film s’entend',
    'Faites émerger la voix du récit.',
    'Voix à 60 ou plus ; musique à 30 ou moins ; ambiance et bruitage à 40 ou moins. Écoutez le mix si vous le souhaitez.',
  ],
  [
    'Une seule lumière',
    'Retrouvez une atmosphère cohérente.',
    'Réglez la chaleur entre 20 et 45 et la lumière entre 90 et 110. Comparez le visage à la référence.',
  ],
  [
    'Prêt pour la sortie',
    'Construisez un pack exploitable et documenté.',
    'Ajoutez master, vertical, sous-titres, licences et archive. Retirez la musique sans licence.',
  ],
  [
    'La salle de montage',
    'Faites exister une histoire par ses raccords.',
    'Assemblez les huit temps de ce montage d’entraînement, du lieu à l’ouverture finale.',
  ],
  [
    'Dernière séance',
    'Réparez le film avant de le montrer.',
    'Traitez les cinq alertes. Chaque réparation rend la scène plus cohérente. Le quiz restera votre épreuve de validation.',
  ],
];
export function FilmMissionMap({
  titles,
  current,
  next,
  completed,
  onSelect,
}: {
  titles: string[];
  current: number;
  next: number;
  completed: number[];
  onSelect: (index: number) => void;
}) {
  return (
    <nav
      className="game-world-map"
      aria-label={t('Carte des missions du film', 'Film mission map')}
    >
      <div className="game-map-heading">
        <span>LE VIRAGE / {t('VOTRE AVENTURE', 'YOUR ADVENTURE')}</span>
        <a href={urlFor('academy', locale, 'dashboard', routingConfig)}>
          {t('Mon espace', 'My space')} ↗
        </a>
      </div>
      <div className="game-map-path">
        {titles.map((title, i) => (
          <button
            key={i}
            disabled={i > next && completed.length < titles.length}
            aria-current={current === i ? 'step' : undefined}
            title={title}
            onClick={() => onSelect(i)}
          >
            <span>
              {completed.includes(i)
                ? '★'
                : i > next && completed.length < titles.length
                  ? '🔒'
                  : String(i + 1).padStart(2, '0')}
            </span>
            <small>{title}</small>
          </button>
        ))}
      </div>
    </nav>
  );
}
export function FilmGame({
  index,
  course,
  userId,
  onQuiz,
  preview = false,
}: {
  index: number;
  course: string;
  userId: string;
  onQuiz: () => void;
  preview?: boolean;
}) {
  const [c, setC] = useState<Configuration>(initial);
  const [stage, setStage] = useState(0);
  const [loaded, setLoaded] = useState(preview);
  const [paused, setPaused] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [burst, setBurst] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const data = missions[index] || missions[0];
  const ready = trainingReady(index, c);
  const set = <K extends keyof Configuration>(
    key: K,
    value: Configuration[K],
  ) => {
    setC((v) => ({ ...v, [key]: value }));
    setMessage('');
  };
  useEffect(() => {
    if (preview) return;
    let active = true;
    platform()
      .from('academy_game_saves')
      .select('stage,configuration')
      .eq('user_id', userId)
      .eq('course_slug', course)
      .eq('lesson_index', index)
      .maybeSingle()
      .then(
        ({ data, error }) => {
          if (!active) return;
          if (error)
            setStatus(
              t(
                'Sauvegarde indisponible. Vous pouvez jouer, puis réessayer.',
                'Save unavailable. You can play, then retry.',
              ),
            );
          else if (data) {
            setC(restore(data.configuration));
            setStage(data.stage > 0 ? 1 : 0);
          }
          setLoaded(true);
        },
        () => {
          if (active) {
            setLoaded(true);
            setStatus(
              'Sauvegarde indisponible. Vous pouvez jouer, puis réessayer.',
            );
          }
        },
      );
    return () => {
      active = false;
    };
  }, [course, index, userId, preview]);
  function stopAudio() {
    if (timer.current) clearTimeout(timer.current);
    void audio.current?.close().catch(() => {});
    audio.current = null;
    if (utterance.current && 'speechSynthesis' in window) {
      utterance.current.onend = null;
      window.speechSynthesis.cancel();
      utterance.current = null;
    }
    setPlaying(false);
  }
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      void audio.current?.close().catch(() => {});
      if (utterance.current && 'speechSynthesis' in window)
        window.speechSynthesis.cancel();
    },
    [],
  );
  async function playMix() {
    if (playing) {
      stopAudio();
      return;
    }
    try {
      const ctx = new AudioContext();
      audio.current = ctx;
      await ctx.resume();
      const mix = ctx.createGain();
      mix.gain.value = 0.17;
      mix.connect(ctx.destination);
      for (const [hz, amount] of [
        [196, c.music],
        [246.94, c.music],
        [293.66, c.music],
        [74, c.ambience],
        [523.25, c.foley],
      ]) {
        const osc = ctx.createOscillator(),
          gain = ctx.createGain();
        osc.type = hz === 74 ? 'triangle' : 'sine';
        osc.frequency.value = hz;
        gain.gain.value = (amount / 100) * (hz === 523.25 ? 0.13 : 0.25);
        osc.connect(gain);
        gain.connect(mix);
        osc.start();
        osc.stop(ctx.currentTime + 7);
      }
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(
          'Le jour se lève. Mariama prend une décision. Son histoire peut commencer.',
        );
        u.lang = 'fr-FR';
        u.volume = c.voice / 100;
        utterance.current = u;
        window.speechSynthesis.speak(u);
      }
      setPlaying(true);
      timer.current = setTimeout(stopAudio, 7300);
    } catch {
      setStatus(
        t(
          'Audio indisponible : les indicateurs visuels restent utilisables.',
          'Audio unavailable: visual meters still work.',
        ),
      );
      stopAudio();
    }
  }
  async function save(nextStage = stage) {
    if (preview) {
      setStatus(
        'Démonstration sans sauvegarde : aucun résultat réel enregistré.',
      );
      return;
    }
    setSaving(true);
    try {
      await checked(
        await platform().rpc('ecosystem_save_training', {
          course,
          lesson: index,
          stage: nextStage,
          configuration: c,
        }),
      );
      setStatus(
        t('Votre entraînement est enregistré.', 'Your training is saved.'),
      );
    } catch {
      setStatus(
        t(
          'Sauvegarde impossible. Gardez cette page ouverte et réessayez.',
          'Unable to save. Keep this page open and retry.',
        ),
      );
    } finally {
      setSaving(false);
    }
  }
  function test() {
    if (ready) {
      setStage(1);
      setBurst((n) => n + 1);
      setMessage(
        t(
          'Mission accomplie. Regardez ce que vos choix ont changé !',
          'Mission complete. See what your choices changed!',
        ),
      );
      void save(1);
    } else
      setMessage(
        t(
          'Observez la scène et les repères du défi. Ajustez vos choix, puis retestez : vous pouvez expérimenter sans limite.',
          'Look at the scene and challenge targets. Adjust and retry: experimentation is unlimited.',
        ),
      );
  }
  const crossed = index === 3 && c.cameraPosition <= 55;
  const unstable =
    (index === 5 && c.camera && c.person) ||
    (index === 10 && !c.repairs.includes(0));
  const zoom = (index === 1 && c.close) || index === 9;
  const imgStyle: CSSProperties = {
    filter:
      index === 7
        ? `sepia(${c.warmth}%) saturate(120%) brightness(${c.exposure}%)`
        : index === 2
          ? `hue-rotate(${c.look === 'indigo' ? 0 : 80}deg) brightness(${c.light === 'morning' ? 1 : 0.45})`
          : undefined,
    transform: crossed ? 'scaleX(-1)' : undefined,
  };
  const slider = (
    label: string,
    key: keyof Configuration,
    min: number,
    max: number,
  ) => (
    <label className="game-slider">
      {label}
      <strong>{String(c[key])}</strong>
      <input
        type="range"
        min={min}
        max={max}
        value={Number(c[key])}
        onChange={(e) => set(key, Number(e.target.value) as never)}
      />
    </label>
  );
  const toggle = (label: string, key: keyof Configuration) => (
    <button
      className="game-toggle"
      aria-pressed={!!c[key]}
      onClick={() => set(key, !c[key] as never)}
    >
      {!!c[key] ? '✓' : '+'} {label}
    </button>
  );
  const order = index === 9 ? montage : production;
  if (!loaded)
    return (
      <p role="status">
        {t('Ouverture de votre plateau…', 'Opening your film set…')}
      </p>
    );
  return (
    <section
      className={`film-game ${paused ? 'is-paused' : ''} ${unstable ? 'is-unstable' : ''}`}
    >
      <CorrectAnswerCelebration event={burst} />
      <div className="game-hud">
        <span>
          <i /> SMARTSELL / PLAYLAB
        </span>
        <span>
          MISSION {String(index + 1).padStart(2, '0')} ·{' '}
          {stage ? '★ 100 XP D’ENTRAÎNEMENT' : '☆ EN EXPLORATION'}
        </span>
        <button
          aria-pressed={paused}
          onClick={() => {
            if (!paused) stopAudio();
            setPaused((v) => !v);
          }}
        >
          {paused
            ? '▶ Relancer les animations'
            : 'Ⅱ Mettre les animations en pause'}
        </button>
      </div>
      <div className="game-title">
        <p>LE VIRAGE / {t('À VOUS LA RÉALISATION', 'YOU ARE THE DIRECTOR')}</p>
        <h3>{data[0]}</h3>
        <span>{data[1]}</span>
      </div>
      <div
        className={`game-scene ${c.camera && index === 5 ? 'has-camera-motion' : ''} ${c.person && index === 5 ? 'has-person-motion' : ''} ${zoom ? 'is-close' : ''}`}
      >
        <img
          className="game-scene-image"
          src={still()}
          alt="Scène fictive : Mariama dans sa cour au lever du jour"
          style={imgStyle}
        />
        <div className="game-grain" aria-hidden="true" />
        <div className="game-light" aria-hidden="true" />
        <span className="game-rec">
          <i /> REC · SCÈNE D’ENTRAÎNEMENT
        </span>
        <span className="game-timecode" aria-hidden="true">
          00:00:<b>04</b>:00
        </span>
        <div className="game-viewfinder" aria-hidden="true" />
        {index === 4 && (
          <div
            className="game-crop"
            style={{
              width: c.ratio === '9:16' ? '31.64%' : '100%',
              left: c.ratio === '9:16' ? `${c.position * 0.6836}%` : '0',
            }}
          >
            <span>{c.ratio}</span>
          </div>
        )}
        {index === 2 && (
          <div className="game-bible-tags">
            <span>
              {c.look === 'indigo' ? 'TENUE INDIGO' : 'TENUE MODIFIÉE'}
            </span>
            <span>{c.light === 'morning' ? 'MATIN' : 'NUIT'}</span>
            <span>
              {c.landmark ? 'MACHINE À COUDRE' : 'BIBLE : REPÈRE NON NOTÉ'}
            </span>
          </div>
        )}
        {index === 3 && (
          <svg
            className="game-camera-board"
            viewBox="0 0 640 260"
            aria-label="Deux caméras et un axe. Placez B du même côté que A."
            role="img"
          >
            <line
              x1="30"
              y1="130"
              x2="610"
              y2="130"
              stroke="#efe638"
              strokeWidth="3"
              strokeDasharray="8 8"
            />
            <circle cx="320" cy="130" r="22" fill="#ad85cc" />
            <text x="307" y="137" fill="#201127">
              M
            </text>
            <g>
              <rect
                x="145"
                y="200"
                width="65"
                height="35"
                rx="8"
                fill="#eee2f4"
              />
              <text x="168" y="224">
                A
              </text>
            </g>
            <g style={{ transform: `translateY(${c.cameraPosition * 1.9}px)` }}>
              <rect
                x="450"
                y="10"
                width="65"
                height="35"
                rx="8"
                fill={crossed ? '#ff9696' : '#efe638'}
              />
              <text x="473" y="34">
                B
              </text>
            </g>
          </svg>
        )}
        {index === 6 && (
          <div className="game-audio-meters">
            {[
              ['Voix', c.voice],
              ['Musique', c.music],
              ['Ambiance', c.ambience],
              ['Bruitage', c.foley],
            ].map(([name, value]) => (
              <div key={name}>
                <span>{name}</span>
                <i style={{ height: `${Number(value) * 0.9 + 5}px` }} />
                <b>{value}%</b>
              </div>
            ))}
          </div>
        )}
        {index === 7 && (
          <img
            className="game-grade-reference"
            src={still()}
            alt="Référence de couleur à comparer"
          />
        )}
        {index === 10 && (
          <div className="game-alerts">
            {repairs.map(
              (r, i) =>
                !c.repairs.includes(i) && (
                  <span key={r}>
                    {
                      [
                        'VISAGE INSTABLE',
                        'REGARD INVERSÉ',
                        'LUMIÈRE INCOHÉRENTE',
                        'DROITS À VÉRIFIER',
                        'FORMAT MANQUANT',
                      ][i]
                    }
                  </span>
                ),
            )}
          </div>
        )}
        <div className="game-scene-caption">
          {index === 0 || index === 9
            ? `${c.order.length}/8 ${index === 0 ? 'étapes assemblées' : 'plans assemblés'}`
            : index === 3
              ? crossed
                ? 'Le regard s’inverse…'
                : 'Le regard reste cohérent'
              : index === 5
                ? c.camera && c.person
                  ? 'Deux mouvements se concurrencent'
                  : c.camera
                    ? 'Travelling de caméra'
                    : c.person
                      ? 'Le personnage entre en mouvement'
                      : 'Le plateau attend votre mouvement'
                : index === 8
                  ? `${c.pack.filter((s) => s !== 'unlicensed').length}/5 éléments du pack`
                  : stage
                    ? 'Votre scène est prête.'
                    : 'Votre plateau réagit à vos choix.'}
        </div>
      </div>
      <div className={`game-coach ${speaking ? 'is-speaking' : ''}`}>
        <img
          src={withBasePath('/media/academy-guide.png')}
          alt="Guide virtuel illustré"
        />
        <div>
          <strong>À vous de jouer.</strong>
          <p>{message || data[2]}</p>
          <TeacherVoice text={message || data[2]} onSpeaking={setSpeaking} />
        </div>
      </div>
      <div className="game-controls">
        {(index === 0 || index === 9) && (
          <>
            <div className="game-film-timeline">
              {Array.from({ length: 8 }, (_, i) => (
                <span className={c.order.length > i ? 'is-filled' : ''} key={i}>
                  {c.order.length > i
                    ? order[c.order[i]]
                    : String(i + 1).padStart(2, '0')}
                </span>
              ))}
            </div>
            <div className="game-token-rack">
              {[3, 0, 6, 1, 7, 4, 2, 5].map((i) => (
                <button
                  disabled={c.order.includes(i)}
                  key={i}
                  onClick={() => {
                    if (i === c.order.length) {
                      set('order', [...c.order, i]);
                      setMessage(
                        t(
                          'Oui. Cette étape prépare la suivante.',
                          'Yes. This stage prepares the next one.',
                        ),
                      );
                    } else
                      setMessage(
                        `Avant « ${order[i]} », il manque « ${order[c.order.length]} ». ${index === 0 ? 'Chaque étape prépare les références nécessaires à la suivante.' : 'L’ordre choisi doit permettre au spectateur de comprendre le changement.'}`,
                      );
                  }}
                >
                  <b>{index === 9 ? '▶' : '◈'}</b>
                  {order[i]}
                </button>
              ))}
            </div>
            <button onClick={() => set('order', [])}>
              ↺ Refaire le montage
            </button>
          </>
        )}
        {index === 1 && (
          <>
            {slider('Actions dans le même plan', 'actions', 1, 3)}
            {slider('Durée du plan (s)', 'duration', 2, 10)}
            {toggle('Gros plan pour l’émotion', 'close')}
            <p>
              Le plateau montre {c.actions} intention{c.actions > 1 ? 's' : ''}{' '}
              pour {c.duration} secondes.{' '}
              {c.actions > 1
                ? 'Simplifiez avant de générer.'
                : 'Une idée lisible.'}
            </p>
          </>
        )}
        {index === 2 && (
          <>
            <div className="game-palette">
              <button
                aria-pressed={c.look === 'indigo'}
                onClick={() => set('look', 'indigo')}
              >
                ● Tenue indigo
              </button>
              <button
                aria-pressed={c.look === 'red'}
                onClick={() => set('look', 'red')}
              >
                ● Tenue modifiée
              </button>
              <button
                aria-pressed={c.light === 'morning'}
                onClick={() => set('light', 'morning')}
              >
                ☀ Matin
              </button>
              <button
                aria-pressed={c.light === 'night'}
                onClick={() => set('light', 'night')}
              >
                ☾ Nuit
              </button>
              {toggle('Garder la machine à coudre', 'landmark')}
            </div>
            <p>
              Comparez ces repères à la référence : ils construisent la
              continuité d’un plan au suivant.
            </p>
          </>
        )}
        {index === 3 &&
          slider('Déplacer la caméra B', 'cameraPosition', 0, 100)}
        {index === 4 && (
          <>
            <div className="game-palette">
              {['16:9', '9:16'].map((r) => (
                <button
                  key={r}
                  aria-pressed={c.ratio === r}
                  onClick={() => set('ratio', r)}
                >
                  {r}
                </button>
              ))}
            </div>
            {slider('Position de la fenêtre', 'position', 0, 100)}
          </>
        )}
        {index === 5 && (
          <>
            <div className="game-palette">
              {toggle('Mouvement de caméra', 'camera')}
              {toggle('Mouvement du personnage', 'person')}
              {toggle('Image de fin contrôlée', 'endChecked')}
            </div>
            <p>
              Les mouvements affichés illustrent votre consigne. Réalisez le
              plan réel dans votre outil de production.
            </p>
          </>
        )}
        {index === 6 && (
          <>
            <div className="game-mixer">
              {slider('Voix', 'voice', 0, 100)}
              {slider('Musique', 'music', 0, 100)}
              {slider('Ambiance', 'ambience', 0, 100)}
              {slider('Bruitage', 'foley', 0, 100)}
            </div>
            <button aria-pressed={playing} onClick={() => void playMix()}>
              {playing ? '■ Arrêter le mix' : '▶ Écouter ce mix (7 s)'}
            </button>
            <small>
              Ambiance et pistes synthétiques de démonstration ; voix de
              synthèse si disponible. Arrêtez puis relancez pour écouter vos
              nouveaux réglages.
            </small>
          </>
        )}
        {index === 7 && (
          <>
            {slider('Chaleur', 'warmth', 0, 100)}
            {slider('Lumière', 'exposure', 50, 160)}
          </>
        )}
        {index === 8 && (
          <div className="game-pack">
            {[
              ['master', 'Master 16:9'],
              ['vertical', 'Version 9:16'],
              ['subtitles', 'Sous-titres'],
              ['licences', 'Licences et autorisations'],
              ['archive', 'Archive du projet'],
              ['unlicensed', 'Musique sans licence'],
            ].map(([key, label]) => (
              <button
                key={key}
                aria-pressed={c.pack.includes(key)}
                onClick={() =>
                  set(
                    'pack',
                    c.pack.includes(key)
                      ? c.pack.filter((s) => s !== key)
                      : [...c.pack, key],
                  )
                }
              >
                <b>{c.pack.includes(key) ? '✓' : '+'}</b>
                {label}
              </button>
            ))}
          </div>
        )}
        {index === 10 && (
          <div className="game-pack">
            {repairs.map((label, i) => (
              <button
                key={label}
                aria-pressed={c.repairs.includes(i)}
                onClick={() =>
                  set(
                    'repairs',
                    c.repairs.includes(i)
                      ? c.repairs.filter((n) => n !== i)
                      : [...c.repairs, i],
                  )
                }
              >
                <b>{c.repairs.includes(i) ? '✓' : '⚒'}</b>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="game-mission-actions">
        <button className="game-launch" onClick={test}>
          {stage ? '↺ Retester ma scène' : '✦ Tester ma scène'}
        </button>
        <button disabled={saving} onClick={() => void save()}>
          {preview
            ? 'Démo : aucune sauvegarde'
            : saving
              ? 'Enregistrement…'
              : 'Enregistrer mon entraînement'}
        </button>
        {stage > 0 && (
          <button className="game-launch" onClick={onQuiz}>
            {preview
              ? 'Créer mon espace gratuit →'
              : 'Passer à l’épreuve du module →'}
          </button>
        )}
      </div>
      <p className="game-save-status" role="status">
        {status}
      </p>
      <p className="game-training-note">
        Ces entraînements préparent votre projet. Le quiz valide le module et
        débloque la suite. Les XP d’entraînement ne remplacent pas cette
        validation.
      </p>
    </section>
  );
}
