'use client';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { courses, type Course } from '@smartsell/content/academy';
import { locale, routingConfig, t, urlFor } from '@smartsell/routing';
import { Icon } from '../icons';
import { Img } from '../immersive';
import { platform, checked } from './client';
import { AccountBoundary } from './auth';
import { AccountRequests } from './requests';
import { useLearning, LearningError } from './use-learning';
import { MyAttestations } from './attestations';
import {
  courseProgress,
  learningSummary,
  suggestedCourses,
  matchesCourse,
  type LearningProgress,
} from './learning-model';

const href = (path: string) => urlFor('academy', locale, path, routingConfig);
const lessonHref = (slug: string, index: number) =>
  `${href(`learn/${slug}`)}?lesson=${index + 1}`;
const views = [
  'overview',
  'courses',
  'catalog',
  'attestations',
  'requests',
  'profile',
] as const;
type View = (typeof views)[number];
const menus: {
  id: View;
  label: string;
  icon: ComponentProps<typeof Icon>['name'];
}[] = [
  {
    id: 'overview',
    label: t('Tableau de bord', 'Dashboard'),
    icon: 'dashboard',
  },
  { id: 'courses', label: t('Mes cours', 'My courses'), icon: 'bookmark' },
  {
    id: 'catalog',
    label: t('Explorer les cours', 'Explore courses'),
    icon: 'list',
  },
  { id: 'requests', label: t('Mes échanges', 'My messages'), icon: 'help' },
  {
    id: 'attestations',
    label: t('Mes attestations', 'My attestations'),
    icon: 'verified',
  },
  { id: 'profile', label: t('Mon profil', 'My profile'), icon: 'user' },
];

function CourseCard({
  course,
  progress,
  enrolled = false,
}: {
  course: Course;
  progress: LearningProgress;
  enrolled?: boolean;
}) {
  const state = courseProgress(course, progress);
  return (
    <article className="ss-course-card">
      <a
        className="ss-course-image"
        href={
          enrolled
            ? lessonHref(course.slug, state.next)
            : href(`courses/${course.slug}`)
        }
        tabIndex={-1}
        aria-hidden="true"
      >
        <Img photo={course.photo} width={560} />
        <span>
          {enrolled && state.finished
            ? t('Terminé', 'Completed')
            : course.category}
        </span>
        <b aria-hidden="true">
          <Icon name={state.finished ? 'verified' : 'arrowUpRight'} />
        </b>
      </a>
      <div className="ss-course-copy">
        <p className="ss-course-meta">
          {course.level} <span>·</span> {t('Aperçu gratuit', 'Free preview')}
        </p>
        <h3>
          <a
            href={
              enrolled
                ? lessonHref(course.slug, state.next)
                : href(`courses/${course.slug}`)
            }
          >
            {course.title}
          </a>
        </h3>
        {enrolled ? (
          <>
            <div className="ss-course-progress">
              <span>
                {state.percent}% {t('terminé', 'complete')}
              </span>
              <span>
                {state.done}/{state.total} {t('leçons', 'lessons')}
              </span>
            </div>
            <progress
              value={state.done}
              max={Math.max(1, state.total)}
              aria-label={`${t('Progression', 'Progress')}: ${course.title}`}
            />
            <a
              className="ss-learning-action"
              href={lessonHref(course.slug, state.next)}
            >
              {state.finished
                ? t('Revoir le cours', 'Review course')
                : state.done
                  ? t('Reprendre le cours', 'Resume course')
                  : t('Commencer le cours', 'Start course')}
              <Icon name="arrowRight" />
            </a>
          </>
        ) : (
          <>
            <p className="ss-course-goal">{course.goal}</p>
            <div className="ss-course-progress">
              <span>
                {course.lessons.length}{' '}
                {t('leçons de découverte', 'introductory lessons')}
              </span>
            </div>
            <a
              className="ss-learning-action"
              href={href(`learn/${course.slug}`)}
            >
              {t('Découvrir ce cours', 'Discover this course')}
              <Icon name="arrowRight" />
            </a>
          </>
        )}
      </div>
    </article>
  );
}

function LearningDashboard() {
  const { user, progress, loading, error, reload } = useLearning();
  const [view, setView] = useState<View>('overview');
  const [query, setQuery] = useState('');
  const [track, setTrack] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [profileRetry, setProfileRetry] = useState(0);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousView = useRef<View>('overview');
  useEffect(() => {
    const sync = () => {
      const next = window.location.hash.slice(1);
      if (views.includes(next as View)) setView(next as View);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => {
    if (previousView.current !== view) heading.current?.focus();
    previousView.current = view;
  }, [view]);
  useEffect(() => {
    if (!user) return;
    let active = true;
    setProfileLoading(true);
    setProfileError('');
    Promise.resolve(
      platform()
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single(),
    )
      .then(({ data, error }) => {
        if (!active) return;
        if (error)
          setProfileError(
            t(
              'Votre profil ne peut pas être chargé.',
              'Your profile could not be loaded.',
            ),
          );
        else {
          setName(data?.display_name || '');
          setSavedName(data?.display_name || '');
        }
      })
      .catch(() => {
        if (active)
          setProfileError(
            t(
              'Votre profil ne peut pas être chargé.',
              'Your profile could not be loaded.',
            ),
          );
      })
      .finally(() => {
        if (active) setProfileLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.id, profileRetry]);
  const navigate = (next: View) => {
    setView(next);
    window.location.hash = next;
  };
  const summary = learningSummary(courses, progress);
  const recommendations = suggestedCourses(courses, progress);
  const ongoing = summary.enrolled.filter(
    (course) => !courseProgress(course, progress).finished,
  );
  const resume =
    ongoing.find((course) => courseProgress(course, progress).done > 0) ||
    ongoing[0];
  const resumeState = resume ? courseProgress(resume, progress) : null;
  const selected = summary.enrolled.filter(
    (course) =>
      filter === 'all' ||
      (filter === 'completed') === courseProgress(course, progress).finished,
  );
  const catalog = courses.filter((course) =>
    matchesCourse(course, query, track),
  );
  const initials =
    savedName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'S';
  const firstName = savedName.trim().split(/\s+/)[0];
  const ready = !loading && !error;
  return (
    <div className="ss-learning-app" data-kin-off>
      <aside className="ss-learning-sidebar">
        <div className="ss-learning-person">
          <span aria-hidden="true">{initials}</span>
          <div>
            <strong>{savedName || t('Mon espace', 'My space')}</strong>
            <small>{t('Apprenant Smartsell', 'Smartsell learner')}</small>
          </div>
        </div>
        <p className="ss-learning-eyebrow">
          {t('VOTRE CAMPUS', 'YOUR CAMPUS')}
        </p>
        <nav aria-label={t('Espace apprenant', 'Learner space')}>
          {menus.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={view === item.id ? 'page' : undefined}
              onClick={() => setView(item.id)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.id === 'courses' && ready ? (
                <small>{summary.enrolled.length}</small>
              ) : null}
            </a>
          ))}
        </nav>
        <div className="ss-learning-side-note">
          <Icon name="stars" />
          <strong>{t('Un peu chaque jour.', 'A little, every day.')}</strong>
          <p>
            {t(
              'Une leçon, une idée, un nouveau pas pour vos projets.',
              'One lesson, one idea, one more step for your projects.',
            )}
          </p>
          <a href={href('courses')}>
            {t('Voir le catalogue public', 'View public catalog')} ↗
          </a>
        </div>
      </aside>
      <div className="ss-learning-main">
        <header className="ss-learning-topbar">
          <span>
            {t('MON CAMPUS', 'MY CAMPUS')} <b>/</b>{' '}
            {menus.find((item) => item.id === view)?.label}
          </span>
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              navigate('catalog');
            }}
          >
            <label className="ss-learning-sr" htmlFor="learning-search">
              {t('Rechercher un cours', 'Search courses')}
            </label>
            <input
              id="learning-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('Rechercher un cours…', 'Search courses…')}
            />
            <button aria-label={t('Rechercher', 'Search')}>
              <Icon name="arrowRight" />
            </button>
          </form>
        </header>
        <div className="ss-learning-heading">
          <p className="ss-learning-eyebrow">SMARTSELL ACADEMY</p>
          <h2 ref={heading} tabIndex={-1}>
            {view === 'overview'
              ? `${t('Bonjour', 'Hello')}${firstName ? `, ${firstName}` : ''}.`
              : menus.find((item) => item.id === view)?.label}
          </h2>
          <p>
            {view === 'overview'
              ? t(
                  'Votre prochain déclic commence ici.',
                  'Your next breakthrough starts here.',
                )
              : view === 'courses'
                ? t(
                    'Tous vos cours et votre progression, au même endroit.',
                    'All your courses and progress in one place.',
                  )
                : view === 'catalog'
                  ? t(
                      'Choisissez la compétence qui fera avancer votre projet.',
                      'Choose the skill that moves your project forward.',
                    )
                  : view === 'attestations'
                    ? t(
                        'Vos formations complètes, avec une preuve vérifiable.',
                        'Your full training courses, with verifiable proof.',
                      )
                    : view === 'profile'
                      ? t(
                          'Un espace qui vous ressemble.',
                          'Make this space your own.',
                        )
                      : t(
                          'Retrouvez vos demandes et échangez avec l’équipe.',
                          'Find your requests and contact the team.',
                        )}
          </p>
        </div>
        <LearningError error={error} retry={reload} />
        {loading && (
          <div className="ss-learning-loading" role="status">
            {t(
              'Nous retrouvons votre progression…',
              'Loading your learning progress…',
            )}
          </div>
        )}
        {ready && view === 'overview' && (
          <>
            <section
              className="ss-learning-feature"
              aria-label={t('Votre prochain cours', 'Your next course')}
            >
              <div>
                <span className="ss-learning-feature-tag">
                  {resume
                    ? t('ON CONTINUE ?', 'KEEP GOING?')
                    : t('VOTRE PREMIER PAS', 'YOUR FIRST STEP')}
                </span>
                <h3>
                  {resume?.title ||
                    t(
                      'Les bonnes idées méritent de nouvelles compétences.',
                      'Good ideas deserve new skills.',
                    )}
                </h3>
                <p>
                  {resume && resumeState
                    ? `${t('À suivre', 'Up next')} : ${resume.lessons[resumeState.next]?.title || resume.title}`
                    : t(
                        'Explorez nos cours et ajoutez votre premier parcours de découverte à votre espace.',
                        'Explore our courses and add your first introductory course to your space.',
                      )}
                </p>
                {resume && resumeState ? (
                  <a
                    className="ss-learning-primary"
                    href={lessonHref(resume.slug, resumeState.next)}
                  >
                    {resumeState.done
                      ? t('Reprendre mon cours', 'Resume my course')
                      : t('Commencer mon cours', 'Start my course')}
                    <Icon name="arrowRight" />
                  </a>
                ) : (
                  <button
                    className="ss-learning-primary"
                    onClick={() => navigate('catalog')}
                  >
                    {t('Explorer les cours', 'Explore courses')}
                    <Icon name="arrowRight" />
                  </button>
                )}
              </div>
              <div className="ss-learning-feature-visual">
                {resume ? (
                  <Img photo={resume.photo} width={720} eager />
                ) : (
                  <div className="ss-learning-orbit" aria-hidden="true">
                    <span>✳</span>
                    <b>
                      LEARN.
                      <br />
                      CREATE.
                      <br />
                      GROW.
                    </b>
                  </div>
                )}
                <span className="ss-learning-feature-caption">
                  {t(
                    'À votre rythme. Pour vos projets.',
                    'At your pace. For your projects.',
                  )}
                </span>
              </div>
            </section>
            <section
              className="ss-learning-stats"
              aria-label={t('Votre progression', 'Your progress')}
            >
              <div>
                <Icon name="bookmark" />
                <strong>{summary.enrolled.length}</strong>
                <span>{t('cours ajoutés', 'courses added')}</span>
              </div>
              <div>
                <Icon name="task" />
                <strong>{summary.done}</strong>
                <span>{t('leçons terminées', 'lessons completed')}</span>
              </div>
              <div>
                <Icon name="verified" />
                <strong>{summary.completed}</strong>
                <span>{t('aperçus terminés', 'previews completed')}</span>
              </div>
              <div className="ss-learning-overall">
                <strong>{summary.percent}%</strong>
                <span>
                  {t('de vos leçons terminées', 'of your lessons completed')}
                </span>
                <progress
                  value={summary.done}
                  max={Math.max(1, summary.total)}
                  aria-label={t(
                    'Progression globale des cours ajoutés',
                    'Overall progress of added courses',
                  )}
                />
              </div>
            </section>
            <div className="ss-learning-section-head">
              <div>
                <p className="ss-learning-eyebrow">
                  {t('VOTRE RENDEZ-VOUS', 'YOUR NEXT SESSION')}
                </p>
                <h3>{t('Mes cours en cours', 'My ongoing courses')}</h3>
              </div>
              <button
                onClick={() => {
                  setFilter('all');
                  navigate('courses');
                }}
              >
                {t('Tous mes cours', 'All my courses')}
                <Icon name="arrowRight" />
              </button>
            </div>
            {ongoing.length ? (
              <div className="ss-learning-grid">
                {ongoing.slice(0, 3).map((course) => (
                  <CourseCard
                    key={course.slug}
                    course={course}
                    progress={progress}
                    enrolled
                  />
                ))}
              </div>
            ) : (
              <div className="ss-learning-empty">
                <Icon
                  name={summary.enrolled.length ? 'verified' : 'bookmark'}
                />
                <h3>
                  {summary.enrolled.length
                    ? t(
                        'Tous vos aperçus sont terminés.',
                        'All your previews are complete.',
                      )
                    : t(
                        'Votre parcours vous attend.',
                        'Your learning journey awaits.',
                      )}
                </h3>
                <p>
                  {t(
                    'Choisissez un cours ci-dessous pour découvrir de nouvelles compétences.',
                    'Choose a course below to discover new skills.',
                  )}
                </p>
              </div>
            )}
            {recommendations.length ? (
              <>
                <div className="ss-learning-section-head">
                  <div>
                    <p className="ss-learning-eyebrow">
                      {t('POUR ALLER PLUS LOIN', 'KEEP EXPLORING')}
                    </p>
                    <h3>{t('À découvrir aussi', 'You might also like')}</h3>
                    <p>
                      {summary.enrolled.length
                        ? t(
                            'Des suggestions selon les catégories de vos cours.',
                            'Suggestions based on your course categories.',
                          )
                        : t(
                            'Une sélection pour commencer à apprendre.',
                            'A selection to start your learning journey.',
                          )}
                    </p>
                  </div>
                  <button onClick={() => navigate('catalog')}>
                    {t('Tout explorer', 'Explore all')}
                    <Icon name="arrowRight" />
                  </button>
                </div>
                <div className="ss-learning-grid">
                  {recommendations.slice(0, 3).map((course) => (
                    <CourseCard
                      key={course.slug}
                      course={course}
                      progress={progress}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </>
        )}
        {ready && view === 'courses' && (
          <>
            <div
              className="ss-learning-filters"
              role="group"
              aria-label={t('Filtrer mes cours', 'Filter my courses')}
            >
              {(
                [
                  {
                    id: 'all',
                    label: t('Tous', 'All'),
                    count: summary.enrolled.length,
                  },
                  {
                    id: 'active',
                    label: t('En cours', 'In progress'),
                    count: ongoing.length,
                  },
                  {
                    id: 'completed',
                    label: t('Terminés', 'Completed'),
                    count: summary.completed,
                  },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                  <span>{item.count}</span>
                </button>
              ))}
            </div>
            {selected.length ? (
              <div className="ss-learning-grid">
                {selected.map((course) => (
                  <CourseCard
                    key={course.slug}
                    course={course}
                    progress={progress}
                    enrolled
                  />
                ))}
              </div>
            ) : (
              <div className="ss-learning-empty">
                <Icon name="bookmark" />
                <h3>
                  {t(
                    'Aucun cours dans cette sélection.',
                    'No courses in this selection.',
                  )}
                </h3>
                <p>
                  {t(
                    'Ajoutez un aperçu depuis le catalogue ou choisissez un autre filtre.',
                    'Add a preview from the catalog or choose another filter.',
                  )}
                </p>
                <button
                  className="ss-learning-primary"
                  onClick={() => navigate('catalog')}
                >
                  {t('Trouver mon prochain cours', 'Find my next course')}
                </button>
              </div>
            )}
          </>
        )}
        {ready && view === 'catalog' && (
          <>
            <div className="ss-learning-catalog-tools">
              <label>
                {t('Rechercher', 'Search')}
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t(
                    'Marketing, design, IA…',
                    'Marketing, design, AI…',
                  )}
                />
              </label>
              <label>
                {t('Parcours', 'Track')}
                <select
                  value={track}
                  onChange={(event) => setTrack(event.target.value)}
                >
                  <option value="">
                    {t('Tous les parcours', 'All tracks')}
                  </option>
                  {[...new Set(courses.map((course) => course.track))].map(
                    (value) => (
                      <option key={value}>{value}</option>
                    ),
                  )}
                </select>
              </label>
              <p role="status">
                {catalog.length} {t('cours disponibles', 'courses available')}
              </p>
            </div>
            {catalog.length ? (
              <div className="ss-learning-grid">
                {catalog.map((course) => (
                  <CourseCard
                    key={course.slug}
                    course={course}
                    progress={progress}
                    enrolled={Object.hasOwn(progress, course.slug)}
                  />
                ))}
              </div>
            ) : (
              <div className="ss-learning-empty">
                <h3>
                  {t(
                    'Pas de cours pour cette recherche.',
                    'No courses match your search.',
                  )}
                </h3>
                <button
                  className="ss-learning-primary"
                  onClick={() => {
                    setQuery('');
                    setTrack('');
                  }}
                >
                  {t('Réinitialiser les filtres', 'Clear filters')}
                </button>
              </div>
            )}
          </>
        )}
        {view === 'attestations' && <MyAttestations />}
        {view === 'requests' && (
          <div className="ss-learning-panel">
            <AccountRequests />
          </div>
        )}
        {view === 'profile' && (
          <section className="ss-learning-panel">
            <h3>{t('Mes informations', 'My details')}</h3>
            <p>
              {t(
                'Votre nom personnalise votre accueil. Votre adresse est liée à votre compte confirmé.',
                'Your name personalises your dashboard. Your email belongs to your confirmed account.',
              )}
            </p>
            <p>{user?.email}</p>
            <LearningError
              error={profileError}
              retry={() => setProfileRetry((n) => n + 1)}
            />
            {profileLoading ? (
              <p role="status">
                {t('Chargement du profil…', 'Loading profile…')}
              </p>
            ) : (
              <form
                className="ss-learner-profile"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!user || profileError) return;
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
                    setSavedName(name.trim());
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
                    onChange={(event) => setName(event.target.value)}
                    maxLength={100}
                    required
                    autoComplete="name"
                    disabled={Boolean(profileError) || busy}
                  />
                </label>
                <button
                  className="ss-learning-primary"
                  disabled={busy || Boolean(profileError)}
                >
                  {busy
                    ? t('Enregistrement…', 'Saving…')
                    : t('Enregistrer mon profil', 'Save profile')}
                </button>
              </form>
            )}
            <p role="status">{notice}</p>
          </section>
        )}
        <p className="ss-learning-disclaimer">
          <Icon name="info" />
          {t(
            'Les progressions concernent les leçons de découverte gratuites. Les formations accompagnées et leurs certificats se réservent auprès de Smartsell.',
            'Progress tracks free introductory lessons. Instructor-led training and its certificates are booked with Smartsell.',
          )}
        </p>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <AccountBoundary>
      <LearningDashboard />
    </AccountBoundary>
  );
}
