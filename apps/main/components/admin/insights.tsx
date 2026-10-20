'use client';
import { useEffect, useState } from 'react';
import { platform, checked } from '@smartsell/ui/platform';
import { t } from '@smartsell/routing';
type Segment = {
  segment: string;
  page_views: number;
  sessions: number;
  contact_clicks: number;
  requests: number;
  collections: number;
};
type Stats = {
  segments: Segment[];
  enrollments: number;
  learners: number;
  lessons_completed: number;
  days: { day: string; views: number }[];
  journeys: {
    session_id: string;
    started_at: string;
    steps: { path: string; event: string; at: string }[];
  }[];
};
type Request = {
  id: string;
  segment: string;
  subject: string;
  message: string;
  state: string;
  created_at: string;
};
type Activity = {
  id: number;
  action: string;
  resource: string;
  actor_id: string;
  segment: string;
  created_at: string;
};
const names: Record<string, string> = {
  agency: 'Agency',
  academy: 'Academy',
  media: 'Media',
  studio: 'Studios',
  labs: 'Produits',
  main: 'Smartsell',
};
const eventNames: Record<string, string> = {
  page_view: 'Page consultée',
  contact_click: 'Clic de contact',
  course_open: 'Module consulté',
  article_open: 'Article consulté',
  booking_open: 'Réservation consultée',
  enrollment_created: 'Inscription au module',
  lesson_completed: 'Leçon terminée',
  content_saved: 'Contenu enregistré',
};
const date = (iso: string) =>
  new Date(iso).toLocaleString('fr-GN', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Africa/Conakry',
  });
export function Insights() {
  const today = new Date().toISOString().slice(0, 10);
  const [start, setStart] = useState(
    new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10),
  );
  const [end, setEnd] = useState(today);
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [reload, setReload] = useState(0);
  const [updating, setUpdating] = useState('');
  useEffect(() => {
    let active = true;
    setBusy(true);
    setError('');
    setStats(null);
    const since = new Date(start + 'T00:00:00Z');
    const until = new Date(end + 'T00:00:00Z');
    until.setUTCDate(until.getUTCDate() + 1);
    if (
      !Number.isFinite(+since) ||
      !Number.isFinite(+until) ||
      +until <= +since ||
      +until - +since > 367 * 86400000
    ) {
      setError(
        t(
          'Choisissez une période valide, de 366 jours maximum.',
          'Choose a valid period of at most 366 days.',
        ),
      );
      setBusy(false);
      return;
    }
    Promise.all([
      platform().rpc('ecosystem_statistics', {
        since: since.toISOString(),
        until_at: until.toISOString(),
      }),
      platform()
        .from('requests')
        .select('id,segment,subject,message,state,created_at')
        .gte('created_at', since.toISOString())
        .lt('created_at', until.toISOString())
        .order('created_at', { ascending: false })
        .limit(100),
      platform()
        .from('activity_log')
        .select('id,action,resource,actor_id,segment,created_at')
        .gte('created_at', since.toISOString())
        .lt('created_at', until.toISOString())
        .order('created_at', { ascending: false })
        .limit(100),
    ])
      .then(async ([s, r, a]) => {
        const sd = await checked(s);
        const rd = await checked(r);
        const ad = await checked(a);
        if (active) {
          setStats(sd as Stats);
          setRequests(rd || []);
          setActivity(ad || []);
        }
      })
      .catch(() => {
        if (active)
          setError(
            t(
              'Les indicateurs n’ont pas pu être chargés. Réessayez.',
              'Unable to load indicators. Try again.',
            ),
          );
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => {
      active = false;
    };
  }, [start, end, reload]);
  return (
    <section className="adm-insights">
      <header className="adm-insights-head">
        <div>
          <p className="adm-kicker">SMARTSELL / PILOTAGE</p>
          <h2>
            {t(
              'Les signaux de votre écosystème.',
              'Your ecosystem at a glance.',
            )}
          </h2>
          <p>
            {t(
              'Données Supabase · heure de Conakry · les chiffres suivent la période choisie.',
              'Supabase data · Conakry time · figures reflect the selected period.',
            )}
          </p>
        </div>
        <div className="adm-period">
          <label>
            {t('Du', 'From')}
            <input
              type="date"
              value={start}
              max={end}
              onChange={(e) => setStart(e.target.value)}
            />
          </label>
          <label>
            {t('Au', 'To')}
            <input
              type="date"
              value={end}
              min={start}
              max={today}
              onChange={(e) => setEnd(e.target.value)}
            />
          </label>
          <button disabled={busy} onClick={() => setReload((n) => n + 1)}>
            {t('Actualiser', 'Refresh')}
          </button>
        </div>
      </header>
      <nav
        className="adm-insights-tabs"
        aria-label={t('Indicateurs', 'Insights')}
      >
        {[
          ['overview', t('Vue d’ensemble', 'Overview')],
          ['journeys', t('Parcours des visiteurs', 'Visitor journeys')],
          ['requests', t('Demandes reçues', 'Received requests')],
          ['activity', t('Activité et apprentissage', 'Activity and learning')],
        ].map(([key, label]) => (
          <button
            key={key}
            className={tab === key ? 'is-on' : ''}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </nav>
      {busy && (
        <p role="status">{t('Lecture des données…', 'Loading data…')}</p>
      )}
      {error && (
        <p role="alert">
          {error}{' '}
          <button onClick={() => setReload((n) => n + 1)}>
            {t('Réessayer', 'Try again')}
          </button>
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
      {!busy && !error && stats && (
        <>
          {tab === 'overview' && (
            <>
              <div className="adm-metrics">
                {stats.segments.map((s) => (
                  <article key={s.segment}>
                    <p className="adm-kicker">{names[s.segment]}</p>
                    <strong>{s.page_views}</strong>
                    <span>
                      {t('pages vues consenties', 'consented page views')}
                    </span>
                    <dl>
                      <div>
                        <dt>{t('Sessions observées', 'Observed sessions')}</dt>
                        <dd>{s.sessions}</dd>
                      </div>
                      <div>
                        <dt>{t('Clics de contact', 'Contact clicks')}</dt>
                        <dd>{s.contact_clicks}</dd>
                      </div>
                      <div>
                        <dt>{t('Demandes reçues', 'Received requests')}</dt>
                        <dd>{s.requests}</dd>
                      </div>
                      <div>
                        <dt>
                          {t('Collections administrées', 'Managed collections')}
                        </dt>
                        <dd>{s.collections}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
              <div className="adm-academy-metrics">
                <h3>Academy / {t('apprentissage réel', 'real learning')}</h3>
                <div>
                  <p>
                    <strong>{stats.learners}</strong>
                    {t(
                      'apprenants inscrits sur la période',
                      'learners enrolled in period',
                    )}
                  </p>
                  <p>
                    <strong>{stats.enrollments}</strong>
                    {t('inscriptions aux modules', 'course enrolments')}
                  </p>
                  <p>
                    <strong>{stats.lessons_completed}</strong>
                    {t('leçons validées', 'completed lessons')}
                  </p>
                </div>
              </div>
              <div className="adm-chart">
                <h3>{t('Pages vues par jour', 'Daily page views')}</h3>
                {stats.days.length === 0 ? (
                  <p>
                    {t(
                      'Aucune visite consentie enregistrée sur cette période.',
                      'No consented visit recorded in this period.',
                    )}
                  </p>
                ) : (
                  <div className="adm-bars">
                    {stats.days.map((d) => (
                      <div
                        key={d.day}
                        title={`${d.day.slice(0, 10)} · ${d.views}`}
                      >
                        <span>{d.views}</span>
                        <i
                          style={{
                            height: `${Math.max(3, (120 * d.views) / Math.max(...stats.days.map((x) => x.views)))}px`,
                          }}
                        />
                        <small>{d.day.slice(5, 10)}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="adm-measure-note">
                {t(
                  'La navigation est mesurée uniquement après consentement, depuis l’activation. Sessions approximatives, sans identification nominative. Un clic WhatsApp n’est pas une demande reçue. Aucun revenu ni taux de vente n’est déduit de ces visites.',
                  'Navigation is measured only after consent, from activation onwards. Approximate sessions, without named identification. A WhatsApp click is not a received request. No revenue or sales conversion is inferred from visits.',
                )}
              </p>
            </>
          )}
          {tab === 'journeys' && (
            <>
              <h3>
                {t(
                  'Les 30 sessions observées les plus récentes',
                  '30 most recent observed sessions',
                )}
              </h3>
              <p>
                {t(
                  'Parcours pseudonymes des visiteurs ayant accepté la mesure. Aucune saisie ni enregistrement d’écran.',
                  'Pseudonymous journeys from visitors who allowed analytics. No entered text or screen recording.',
                )}
              </p>
              {stats.journeys.length === 0 ? (
                <p>
                  {t(
                    'Aucun parcours disponible pour cette période.',
                    'No journey available for this period.',
                  )}
                </p>
              ) : (
                stats.journeys.map((j) => (
                  <details className="adm-journey" key={j.session_id}>
                    <summary>
                      {t('Session', 'Session')} {j.session_id.slice(0, 8)} ·{' '}
                      {date(j.started_at)} · {j.steps.length}{' '}
                      {t('étapes', 'steps')}
                    </summary>
                    <ol>
                      {j.steps.map((s, i) => (
                        <li key={i}>
                          <time>{date(s.at)}</time>
                          <span>{eventNames[s.event] || s.event}</span>
                          <code>{s.path}</code>
                        </li>
                      ))}
                    </ol>
                  </details>
                ))
              )}
            </>
          )}
          {tab === 'requests' && (
            <>
              <h3>
                {t(
                  'Les 100 dernières demandes de la période',
                  '100 latest requests in this period',
                )}
              </h3>
              {requests.length === 0 ? (
                <p>
                  {t(
                    'Aucune demande reçue sur cette période. Les clics vers WhatsApp figurent séparément dans les statistiques.',
                    'No request received in this period. WhatsApp clicks appear separately in analytics.',
                  )}
                </p>
              ) : (
                requests.map((r) => (
                  <article className="adm-request" key={r.id}>
                    <p className="adm-kicker">
                      {names[r.segment]} / {date(r.created_at)}
                    </p>
                    <h4>{r.subject}</h4>
                    <p>{r.message}</p>
                    <label>
                      {t('État', 'Status')}
                      <select
                        disabled={updating === r.id}
                        value={r.state}
                        onChange={async (e) => {
                          const state = e.target.value;
                          setUpdating(r.id);
                          setNotice('');
                          try {
                            await checked(
                              await platform()
                                .from('requests')
                                .update({ state })
                                .eq('id', r.id)
                                .select('id')
                                .single(),
                            );
                            setRequests((rows) =>
                              rows.map((x) =>
                                x.id === r.id ? { ...x, state } : x,
                              ),
                            );
                            setNotice(
                              t('Demande mise à jour.', 'Request updated.'),
                            );
                          } catch {
                            setNotice(
                              t(
                                'Mise à jour impossible. Vos droits ne permettent peut-être pas cette action.',
                                'Unable to update. Your permissions may not allow this action.',
                              ),
                            );
                          } finally {
                            setUpdating('');
                          }
                        }}
                      >
                        <option value="new">{t('Nouvelle', 'New')}</option>
                        <option value="in_progress">
                          {t('En cours', 'In progress')}
                        </option>
                        <option value="closed">
                          {t('Clôturée', 'Closed')}
                        </option>
                      </select>
                    </label>
                  </article>
                ))
              )}
            </>
          )}
          {tab === 'activity' && (
            <>
              <h3>
                {t(
                  'Les 100 dernières actions authentifiées',
                  '100 latest authenticated actions',
                )}
              </h3>
              <p>
                {t(
                  'Inscriptions, leçons terminées et modifications de contenus : ces actions proviennent des commandes enregistrées par le serveur.',
                  'Enrolments, completed lessons and content changes: these actions come from commands recorded by the server.',
                )}
              </p>
              {activity.length === 0 ? (
                <p>
                  {t(
                    'Aucune activité sur cette période.',
                    'No activity in this period.',
                  )}
                </p>
              ) : (
                <div className="adm-activity-list">
                  {activity.map((a) => (
                    <article key={a.id}>
                      <time>{date(a.created_at)}</time>
                      <strong>
                        {names[a.segment]} · {eventNames[a.action] || a.action}
                      </strong>
                      <span>{a.resource}</span>
                      <small>
                        {t('Compte', 'Account')}{' '}
                        {a.actor_id?.slice(0, 8) || '—'}
                      </small>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
