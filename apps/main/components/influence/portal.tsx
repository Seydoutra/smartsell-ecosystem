'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { AccountBoundary, platform, checked } from '@smartsell/ui/platform';
import { t, withBasePath } from '@smartsell/routing';
import {
  demoData,
  influenceHref as href,
  money,
  number,
  summary,
  type PortalData,
  type Mission,
  type Creator,
} from './model';
type Role = 'client' | 'creator' | 'admin';
const empty: PortalData = {
  campaigns: [],
  missions: [],
  metrics: [],
  costs: [],
  creators: [],
  applications: [],
  owner: false,
};
const status = (s: string) =>
  ({
    requested: t('Brief reçu', 'Brief received'),
    planning: t('Cadrage', 'Planning'),
    active: t('En cours', 'Active'),
    completed: t('Terminée', 'Completed'),
    offered: t('Proposition', 'Proposal'),
    accepted: t('Intérêt confirmé', 'Interest confirmed'),
    in_progress: t('En création', 'In production'),
    submitted: t('À valider', 'For review'),
    approved: t('Validé', 'Approved'),
    changes_requested: t('Ajustements', 'Changes requested'),
    declined: t('Déclinée', 'Declined'),
    draft: t('À préparer', 'Draft'),
    signed: t('Signature référencée', 'Signature recorded'),
    pending: t('En revue', 'Under review'),
    published: t('Publié', 'Published'),
  })[s] || s;
export function InfluencePortal({ role }: { role: Role }) {
  const [demo, setDemo] = useState(false),
    [ready, setReady] = useState(false);
  useEffect(() => {
    setDemo(new URLSearchParams(location.search).get('demo') === '1');
    setReady(true);
  }, []);
  if (!ready)
    return (
      <p className="inf-section" role="status">
        {t('Ouverture de votre espace…', 'Opening workspace…')}
      </p>
    );
  return (
    <>
      {demo ? (
        <Workspace role={role} demo />
      ) : (
        <div className="inf-account-gate">
          <AccountBoundary context="influence">
            <Workspace role={role} />
          </AccountBoundary>
          <div className="inf-demo-access">
            <p>
              {t(
                'Découvrir le fonctionnement avant de se connecter',
                'Explore before signing in',
              )}
            </p>
            <a
              className="inf-button inf-secondary"
              href={href(role === 'client' ? 'dashboard' : role) + '?demo=1'}
            >
              {t('Explorer la démonstration', 'Explore the demo')} ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
function Workspace({ role, demo = false }: { role: Role; demo?: boolean }) {
  const [data, setData] = useState<PortalData>(() =>
      demo ? demoData() : empty,
    ),
    [loading, setLoading] = useState(!demo),
    [error, setError] = useState(''),
    [notice, setNotice] = useState(''),
    [busy, setBusy] = useState(false),
    [tab, setTab] = useState('overview'),
    [campaign, setCampaign] = useState('');
  async function load() {
    if (demo) return;
    setLoading(true);
    setError('');
    try {
      const d = await checked(await platform().rpc('influence_workspace'));
      setData({ ...empty, ...d });
    } catch {
      setError(
        t(
          'Les données Influence sont indisponibles. Réessayez ou contactez Smartsell. La démonstration reste indépendante de vos données.',
          'Influence data is unavailable. Retry or contact Smartsell. The demo is separate from your data.',
        ),
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, [demo]);
  async function command(
    operation: string,
    target: string | null,
    payload: Record<string, unknown>,
    revision: number | null = null,
  ) {
    if (busy) return;
    setBusy(true);
    setNotice('');
    setError('');
    try {
      if (demo) {
        setData((prev) => {
          const d = structuredClone(prev);
          if (operation === 'record_metric') {
            d.metrics.push({
              id: crypto.randomUUID(),
              mission_id: target!,
              captured_at: new Date().toISOString(),
              views: Number(payload.views),
              likes: Number(payload.likes),
              comments: Number(payload.comments),
              shares: Number(payload.shares),
              clicks: Number(payload.clicks),
              evidence_url: String(payload.evidence_url),
              source: 'Simulation',
            });
          } else if (operation === 'record_cost') {
            d.costs.push({
              id: crypto.randomUUID(),
              campaign_id: target!,
              mission_id: String(payload.mission_id) || null,
              amount_gnf: Number(payload.amount_gnf),
              kind: String(payload.kind),
              reference: String(payload.reference),
              recorded_at: new Date().toISOString(),
            });
          } else if (operation === 'mission_action') {
            const m = d.missions.find((x) => x.id === target);
            if (m) {
              m.state = String(payload.state);
              if (payload.content_url)
                m.content_url = String(payload.content_url);
              if (payload.feedback) m.feedback = String(payload.feedback);
              m.revision++;
            }
          } else if (operation === 'configure_campaign') {
            const c = d.campaigns.find((x) => x.id === target);
            if (c) c.state = String(payload.state);
          } else if (operation === 'configure_mission') {
            const m = d.missions.find((x) => x.id === target);
            if (m) {
              m.contract_text = String(payload.contract_text);
              m.contract_reference = String(payload.contract_reference);
              m.contract_status = String(payload.contract_status);
              m.contract_version++;
              m.revision++;
            }
          } else if (operation === 'assign_creator') {
            d.missions.push({
              id: crypto.randomUUID(),
              campaign_id: target!,
              creator_id: String(payload.creator_id),
              title: String(payload.title),
              objective: String(payload.objective),
              deadline: String(payload.deadline),
              fee_gnf: Number(payload.fee_gnf),
              state: 'offered',
              contract_text: '',
              contract_version: 1,
              contract_status: 'draft',
              contract_reference: '',
              content_url: '',
              feedback: '',
              revision: 1,
            });
          }
          return d;
        });
        setNotice(
          t(
            'Modification simulée dans cette démonstration uniquement.',
            'Change simulated in this demo only.',
          ),
        );
      } else {
        await checked(
          await platform().rpc('influence_command', {
            operation,
            target,
            payload,
            expected_revision: revision,
          }),
        );
        await load();
        setNotice(t('Modification enregistrée.', 'Change saved.'));
      }
    } catch (e) {
      setError(
        t(
          'Enregistrement refusé ou impossible. Rechargez les données pour vérifier vos droits et la dernière version.',
          'Save refused or unavailable. Reload data to check your access and the latest version.',
        ) +
          (e instanceof Error && /Conflict/.test(e.message)
            ? t(
                ' La mission a été modifiée entre-temps.',
                ' The mission changed in the meantime.',
              )
            : ''),
      );
    } finally {
      setBusy(false);
    }
  }
  const roleData =
    role === 'creator' && demo
      ? {
          ...data,
          missions: data.missions.filter((m) => m.creator_id === 'demo-a'),
          metrics: data.metrics.filter(
            (m) =>
              data.missions.find((a) => a.id === m.mission_id)?.creator_id ===
              'demo-a',
          ),
          costs: data.costs.filter(
            (c) =>
              data.missions.find((a) => a.id === c.mission_id)?.creator_id ===
              'demo-a',
          ),
        }
      : data;
  const missions = roleData.missions.filter(
      (m) => !campaign || m.campaign_id === campaign,
    ),
    metrics = roleData.metrics.filter((m) =>
      missions.some((x) => x.id === m.mission_id),
    ),
    costs = roleData.costs.filter(
      (c) =>
        (!campaign || c.campaign_id === campaign) &&
        (role !== 'creator' || missions.some((m) => m.id === c.mission_id)),
    ),
    filtered = { ...roleData, missions, metrics, costs };
  const stats = summary(filtered);
  const visibleCampaigns = roleData.campaigns.filter(
    (c) => !campaign || c.id === campaign,
  );
  const budget = visibleCampaigns.reduce((s, c) => s + c.budget_gnf, 0);
  const tabs = [
    ['overview', t('Vue d’ensemble', 'Overview')],
    [
      'missions',
      role === 'creator'
        ? t('Mes missions', 'My missions')
        : t('Missions et contenus', 'Missions and content'),
    ],
    ['contracts', t('Contrats', 'Contracts')],
    ['report', t('Reporting', 'Reporting')],
    [
      'finance',
      role === 'creator'
        ? t('Mes revenus', 'My earnings')
        : t('Budget et dépenses', 'Budget and spending'),
    ],
    ...(role === 'admin'
      ? [
          [
            'creators',
            t('Répertoire et candidatures', 'Directory and applications'),
          ],
        ]
      : []),
  ];
  function csv() {
    const records = [
      [
        'Mission',
        'Créateur',
        'Statut',
        'Honoraires GNF',
        'Vues déclarées',
        'Interactions',
        'Dernier relevé',
      ],
      ...missions.map((m) => {
        const v = metrics
          .filter((x) => x.mission_id === m.id)
          .sort(
            (a, b) => Date.parse(b.captured_at) - Date.parse(a.captured_at),
          )[0];
        return [
          m.title,
          data.creators.find((c) => c.id === m.creator_id)?.name ||
            m.creator_id,
          status(m.state),
          m.fee_gnf,
          v?.views ?? '',
          v ? v.likes + v.comments + v.shares : '',
          v?.captured_at ?? '',
        ];
      }),
    ];
    const text =
      '\ufeff' +
      records
        .map((r) =>
          r
            .map((v) => {
              let s = String(v);
              if (/^[=+@\-\t\r]/.test(s)) s = "'" + s;
              return '"' + s.replaceAll('"', '""') + '"';
            })
            .join(';'),
        )
        .join('\r\n');
    const u = URL.createObjectURL(
      new Blob([text], { type: 'text/csv;charset=utf-8' }),
    );
    const a = document.createElement('a');
    a.href = u;
    a.download = `smartsell-influence-${demo ? 'demo-' : ''}report.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
  }
  if (role === 'admin' && !loading && !data.owner && !demo)
    return (
      <div className="inf-empty">
        <h1>{t('Accès réservé à Smartsell', 'Smartsell access only')}</h1>
        <p>
          {t(
            'Ce compte ne possède pas les droits de pilotage Influence.',
            'This account has no Influence operations access.',
          )}
        </p>
        <a href={href('dashboard')}>
          {t('Ouvrir mon espace entreprise', 'Open brand workspace')}
        </a>
      </div>
    );
  return (
    <div className="inf-workspace" aria-busy={busy}>
      <aside className="inf-sidebar">
        <p className="inf-eyebrow">
          {role === 'creator'
            ? t('ESPACE CRÉATEUR', 'CREATOR WORKSPACE')
            : role === 'admin'
              ? 'SMARTSELL OPS'
              : t('ESPACE ENTREPRISE', 'BRAND WORKSPACE')}
        </p>
        <div className="inf-workspace-title">
          influence<span>●</span>
        </div>
        <nav aria-label={t('Rubriques du dashboard', 'Dashboard sections')}>
          {tabs.map(([id, label], i) => (
            <button
              key={id}
              className={tab === id ? 'is-on' : ''}
              aria-current={tab === id ? 'page' : undefined}
              onClick={() => setTab(id)}
            >
              <span>{['◈', '▧', '▤', '⌁', '◉', '✦'][i]}</span>
              {label}
            </button>
          ))}
        </nav>
        <div className="inf-sidebar-bottom">
          <a href={href('campaigns/new')}>
            {t('Nouvelle campagne', 'New campaign')} ↗
          </a>
          <a href={href('creator') + (demo ? '?demo=1' : '')}>
            {t('Espace créateur', 'Creator workspace')} ↗
          </a>
          <a href={href('dashboard') + (demo ? '?demo=1' : '')}>
            {t('Espace entreprise', 'Brand workspace')} ↗
          </a>
          {data.owner && (
            <a href={href('admin') + (demo ? '?demo=1' : '')}>
              {t('Pilotage Smartsell', 'Smartsell operations')} ↗
            </a>
          )}
          <a href={href()}>{t('Retour à Influence', 'Back to Influence')} ↗</a>
        </div>
      </aside>
      <div className="inf-workspace-main">
        {demo && (
          <div className="inf-demo-banner">
            <b>{t('DÉMONSTRATION INTERACTIVE', 'INTERACTIVE DEMO')}</b>
            <span>
              {t(
                'Marque, profils, résultats et paiements fictifs. Aucune donnée réelle modifiée.',
                'Fictional brand, profiles, results and payments. No real data changed.',
              )}
            </span>
            <a href={href(role === 'client' ? 'dashboard' : role)}>
              {t('Quitter la démo', 'Leave demo')}
            </a>
          </div>
        )}
        <div className="inf-workspace-top">
          <span>
            SMARTSELL / INFLUENCE / {tabs.find((x) => x[0] === tab)?.[1]}
          </span>
          <button
            onClick={() => (demo ? setData(demoData()) : void load())}
            disabled={busy || loading}
          >
            {demo
              ? t('Réinitialiser la démo', 'Reset demo')
              : t('Actualiser', 'Refresh')}{' '}
            ↻
          </button>
        </div>
        <header className="inf-dashboard-heading">
          <div>
            <p className="inf-eyebrow">
              {t(
                'LES BONNES ACTIONS AU BON MOMENT',
                'THE RIGHT ACTIONS AT THE RIGHT TIME',
              )}
            </p>
            <h1>
              {role === 'creator'
                ? t(
                    'Votre créativité, en action.',
                    'Your creativity, in action.',
                  )
                : role === 'admin'
                  ? t('Le centre des collaborations.', 'The collaboration hub.')
                  : t(
                      'Votre campagne, en perspective.',
                      'Your campaign, in focus.',
                    )}
            </h1>
            <p>
              {t(
                'Les objectifs, les engagements et les résultats restent reliés.',
                'Objectives, commitments and results stay connected.',
              )}
            </p>
          </div>
          <label>
            {t('Campagne', 'Campaign')}
            <select
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
            >
              <option value="">
                {t('Toutes les campagnes', 'All campaigns')}
              </option>
              {data.campaigns.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
        </header>
        {loading && (
          <p role="status">
            {t('Lecture de vos données…', 'Loading your data…')}
          </p>
        )}
        {error && (
          <p className="inf-error" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="inf-notice" role="status">
            {notice}
          </p>
        )}
        {(tab === 'overview' || tab === 'report') && (
          <>
            <div className="inf-kpi-grid">
              <Kpi
                label={t('Vues déclarées', 'Declared views')}
                value={number(stats.views)}
                detail={t(
                  'Dernier relevé de chaque mission',
                  'Latest snapshot per mission',
                )}
              />
              <Kpi
                label={t('Interactions', 'Interactions')}
                value={number(stats.interactions)}
                detail={t(
                  'Likes + commentaires + partages',
                  'Likes + comments + shares',
                )}
              />
              <Kpi
                label={t('Honoraires prévus', 'Planned creator fees')}
                value={money(stats.planned)}
                detail={t(
                  'Montants convenus des missions',
                  'Agreed mission fees',
                )}
              />
              <Kpi
                label={
                  role === 'creator'
                    ? t('Paiements enregistrés', 'Recorded payments')
                    : t('Dépenses enregistrées', 'Recorded expenses')
                }
                value={money(role === 'creator' ? stats.paid : stats.spent)}
                detail={t(
                  'Écritures documentées par Smartsell',
                  'Entries documented by Smartsell',
                )}
              />
            </div>
            <div className="inf-report-grid">
              <section className="inf-panel">
                <div className="inf-panel-heading">
                  <h2>
                    {t('Les contenus qui font écho', 'Content that resonates')}
                  </h2>
                  <span>{t('Vues par mission', 'Views per mission')}</span>
                </div>
                {missions.length ? (
                  missions.map((m) => {
                    const v = metrics
                      .filter((x) => x.mission_id === m.id)
                      .sort(
                        (a, b) =>
                          Date.parse(b.captured_at) - Date.parse(a.captured_at),
                      )[0];
                    const max = Math.max(1, ...metrics.map((x) => x.views));
                    return (
                      <div className="inf-performance-row" key={m.id}>
                        <span>{m.title}</span>
                        <div>
                          <i
                            style={{
                              width: v ? `${(v.views / max) * 100}%` : '0%',
                            }}
                          />
                        </div>
                        <b>{number(v?.views ?? null)}</b>
                      </div>
                    );
                  })
                ) : (
                  <p>
                    {t(
                      'Vos performances apparaîtront après les premiers relevés.',
                      'Performance appears after the first reports.',
                    )}
                  </p>
                )}
                <p className="inf-fine">
                  {t(
                    'Données déclaratives avec preuve. Les vues ne sont pas une audience unique dédupliquée.',
                    'Declared data with evidence. Views are not a deduplicated unique audience.',
                  )}
                </p>
              </section>
              <section className="inf-panel inf-priorities">
                <p className="inf-eyebrow">
                  {t('À FAIRE AVANCER', 'NEXT ACTIONS')}
                </p>
                <h2>
                  {
                    missions.filter((m) =>
                      [
                        'submitted',
                        'changes_requested',
                        'offered',
                        'accepted',
                        'in_progress',
                      ].includes(m.state),
                    ).length
                  }{' '}
                  {t('missions à suivre', 'missions to follow')}
                </h2>
                <p>
                  {t(
                    'Vérifiez les validations, les échéances et les conditions avant diffusion.',
                    'Review approvals, deadlines and terms before publishing.',
                  )}
                </p>
                <button
                  className="inf-button"
                  onClick={() => setTab('missions')}
                >
                  {t('Voir les missions', 'View missions')} ↗
                </button>
              </section>
            </div>
          </>
        )}
        {tab === 'overview' && (
          <section className="inf-panel">
            <div className="inf-panel-heading">
              <h2>{t('Vos campagnes', 'Your campaigns')}</h2>
              <a href={href('campaigns/new')}>
                {t('Préparer un brief', 'Prepare a brief')} ↗
              </a>
            </div>
            {visibleCampaigns.length ? (
              visibleCampaigns.map((c) => (
                <article className="inf-campaign-row" key={c.id}>
                  <div>
                    <span className="inf-badge">{status(c.state)}</span>
                    <h3>{c.title}</h3>
                    <p>
                      {c.brand} · {c.objective}
                    </p>
                    <p>
                      {c.start_date} → {c.end_date}
                    </p>
                    <details>
                      <summary>{t('Lire le brief', 'Read brief')}</summary>
                      <p>{c.brief}</p>
                    </details>
                  </div>
                  {role !== 'creator' && <b>{money(c.budget_gnf)}</b>}
                  {role === 'admin' && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        void command('configure_campaign', c.id, {
                          state: new FormData(e.currentTarget).get('state'),
                        });
                      }}
                    >
                      <select name="state" defaultValue={c.state}>
                        {['requested', 'planning', 'active', 'completed'].map(
                          (x) => (
                            <option value={x} key={x}>
                              {status(x)}
                            </option>
                          ),
                        )}
                      </select>
                      <button className="inf-button" disabled={busy}>
                        {t('Mettre à jour', 'Update')}
                      </button>
                    </form>
                  )}
                </article>
              ))
            ) : (
              <Empty
                text={t(
                  'Votre première campagne commence par un brief.',
                  'Your first campaign starts with a brief.',
                )}
                path="campaigns/new"
              />
            )}
          </section>
        )}
        {tab === 'missions' && (
          <>
            <section className="inf-panel">
              <h2>{t('De l’idée au contenu', 'From idea to content')}</h2>
              <div className="inf-mission-grid">
                {missions.map((m) => (
                  <article className="inf-mission" key={m.id}>
                    <div className="inf-panel-heading">
                      <span className="inf-badge">{status(m.state)}</span>
                      <small>{m.deadline}</small>
                    </div>
                    <h3>{m.title}</h3>
                    <p>
                      {data.creators.find((c) => c.id === m.creator_id)?.name ||
                        t('Créateur attribué', 'Assigned creator')}
                    </p>
                    <p>{m.objective}</p>
                    <b>{money(m.fee_gnf)}</b>
                    {m.content_url && (
                      <a href={m.content_url} target="_blank" rel="noreferrer">
                        {t('Voir le contenu', 'View content')} ↗
                      </a>
                    )}
                    {m.feedback && <p className="inf-feedback">{m.feedback}</p>}
                    {role === 'creator' && m.state === 'offered' && (
                      <div className="inf-actions">
                        <button
                          disabled={busy}
                          className="inf-button"
                          onClick={() =>
                            void command(
                              'mission_action',
                              m.id,
                              { state: 'accepted' },
                              m.revision,
                            )
                          }
                        >
                          {t('Confirmer mon intérêt', 'Confirm interest')}
                        </button>
                        <button
                          disabled={busy}
                          className="inf-text-link"
                          onClick={() =>
                            void command(
                              'mission_action',
                              m.id,
                              { state: 'declined' },
                              m.revision,
                            )
                          }
                        >
                          {t('Décliner', 'Decline')}
                        </button>
                      </div>
                    )}
                    {role === 'creator' &&
                      ['accepted', 'in_progress', 'changes_requested'].includes(
                        m.state,
                      ) && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            void command(
                              'mission_action',
                              m.id,
                              {
                                state: 'submitted',
                                content_url: new FormData(e.currentTarget).get(
                                  'content_url',
                                ),
                              },
                              m.revision,
                            );
                          }}
                        >
                          <label>
                            {t(
                              'Lien du livrable à valider',
                              'Deliverable URL for review',
                            )}
                            <input
                              required
                              type="url"
                              pattern="https://.*"
                              maxLength={1000}
                              name="content_url"
                              placeholder="https://…"
                              defaultValue={m.content_url}
                            />
                          </label>
                          <button disabled={busy} className="inf-button">
                            {t('Soumettre le contenu', 'Submit content')}
                          </button>
                        </form>
                      )}
                    {role !== 'creator' && m.state === 'submitted' && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const f = new FormData(e.currentTarget);
                          void command(
                            'mission_action',
                            m.id,
                            {
                              state:
                                role === 'admin'
                                  ? f.get('state')
                                  : 'changes_requested',
                              feedback: f.get('feedback'),
                            },
                            m.revision,
                          );
                        }}
                      >
                        <label>
                          {t('Retour sur le contenu', 'Content feedback')}
                          <textarea
                            required
                            minLength={5}
                            maxLength={2000}
                            name="feedback"
                            rows={2}
                          />
                        </label>
                        {role === 'admin' && (
                          <select name="state">
                            <option value="approved">
                              {t('Valider', 'Approve')}
                            </option>
                            <option value="changes_requested">
                              {t('Demander des ajustements', 'Request changes')}
                            </option>
                          </select>
                        )}
                        <button className="inf-button" disabled={busy}>
                          {t('Enregistrer le retour', 'Save feedback')}
                        </button>
                      </form>
                    )}
                  </article>
                ))}
              </div>
              {missions.length === 0 && (
                <Empty
                  text={t(
                    'Aucune mission attribuée pour le moment.',
                    'No assigned missions yet.',
                  )}
                />
              )}
            </section>
            {role === 'admin' && visibleCampaigns.length > 0 && (
              <section className="inf-panel">
                <h2>{t('Attribuer une mission', 'Assign a mission')}</h2>
                <DataForm
                  busy={busy}
                  onSubmit={(f) =>
                    command(
                      'assign_creator',
                      String(f.get('campaign_id')),
                      Object.fromEntries(f),
                    )
                  }
                >
                  <label>
                    {t('Campagne', 'Campaign')}
                    <select required name="campaign_id">
                      {visibleCampaigns.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('Créateur', 'Creator')}
                    <select required name="creator_id">
                      {data.creators.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Field
                    name="title"
                    label={t(
                      'Mission et livrables',
                      'Mission and deliverables',
                    )}
                  />
                  <Field
                    name="objective"
                    label={t('Objectif mesurable', 'Measurable objective')}
                  />
                  <Field
                    name="deadline"
                    type="date"
                    label={t('Échéance', 'Deadline')}
                  />
                  <Field
                    name="fee_gnf"
                    type="number"
                    label={t(
                      'Honoraires convenus en GNF',
                      'Agreed fees in GNF',
                    )}
                  />
                </DataForm>
              </section>
            )}
          </>
        )}
        {tab === 'contracts' && (
          <section className="inf-panel">
            <h2>{t('Des engagements documentés', 'Documented commitments')}</h2>
            <p>
              {t(
                'Le suivi référence les documents traités hors plateforme. Confirmer son intérêt pour une mission ne signe aucun contrat.',
                'Tracking references documents handled outside the platform. Confirming mission interest does not sign a contract.',
              )}
            </p>
            {missions.map((m) => (
              <article className="inf-contract" key={m.id}>
                <div className="inf-panel-heading">
                  <h3>{m.title}</h3>
                  <span className="inf-badge">
                    {status(m.contract_status)} · V{m.contract_version}
                  </span>
                </div>
                <p>
                  {t('Honoraires', 'Fees')} : {money(m.fee_gnf)} ·{' '}
                  {t('Échéance', 'Deadline')} : {m.deadline}
                </p>
                <p className="inf-prewrap">
                  {m.contract_text ||
                    t(
                      'Les conditions détaillées sont en préparation.',
                      'Detailed terms are being prepared.',
                    )}
                </p>
                {m.contract_reference && (
                  <p>
                    {t('Référence', 'Reference')} : {m.contract_reference}
                  </p>
                )}
                {role === 'admin' && m.contract_status !== 'signed' && (
                  <DataForm
                    busy={busy}
                    onSubmit={(f) =>
                      command(
                        'configure_mission',
                        m.id,
                        Object.fromEntries(f),
                        m.revision,
                      )
                    }
                  >
                    <label>
                      {t(
                        'Conditions et droits du contenu',
                        'Terms and usage rights',
                      )}
                      <textarea
                        required
                        name="contract_text"
                        minLength={30}
                        maxLength={12000}
                        defaultValue={m.contract_text}
                      />
                    </label>
                    <Field
                      name="contract_reference"
                      label={t('Référence du document', 'Document reference')}
                    />
                    <label>
                      {t('État du document', 'Document status')}
                      <select name="contract_status">
                        <option value="draft">
                          {t('En préparation', 'Draft')}
                        </option>
                        <option value="signed">
                          {t(
                            'Contrat signé hors plateforme',
                            'Signed outside the platform',
                          )}
                        </option>
                      </select>
                    </label>
                  </DataForm>
                )}
              </article>
            ))}
            {missions.length === 0 && (
              <Empty
                text={t(
                  'Les contrats apparaissent avec vos missions.',
                  'Contracts appear with your missions.',
                )}
              />
            )}
            <button
              className="inf-button inf-secondary inf-print-action"
              onClick={() => window.print()}
            >
              {t('Imprimer les conditions', 'Print terms')}
            </button>
          </section>
        )}
        {tab === 'report' && (
          <section className="inf-panel">
            <div className="inf-panel-heading">
              <h2>{t('Votre lecture stratégique', 'Your strategic review')}</h2>
              <div className="inf-actions">
                <button className="inf-button inf-secondary" onClick={csv}>
                  {t('Exporter le CSV', 'Export CSV')}
                </button>
                <button
                  className="inf-button inf-print-action"
                  onClick={() => window.print()}
                >
                  {t('Imprimer le bilan', 'Print report')}
                </button>
              </div>
            </div>
            <p>
              {t('Couverture des relevés', 'Reporting coverage')} :{' '}
              {stats.measured} / {missions.length} {t('missions', 'missions')}.
            </p>
            <p>
              {stats.views === null
                ? t(
                    'Aucun résultat sourcé disponible. Collectez les premières preuves avant de conclure.',
                    'No sourced results are available. Collect evidence before drawing conclusions.',
                  )
                : t(
                    'Comparez les formats à objectif comparable, puis demandez une nouvelle mesure avant de réallouer le budget. Les vues seules ne prouvent pas une vente.',
                    'Compare formats with similar objectives, then request a new measurement before reallocating budget. Views alone do not prove a sale.',
                  )}
            </p>
            <p>
              {t(
                'Interactions rapportées aux vues',
                'Interactions divided by views',
              )}{' '}
              :{' '}
              {stats.engagement === null
                ? '—'
                : stats.engagement.toFixed(2) + ' %'}
              .{' '}
              {t(
                'Ce ratio ne représente pas le taux d’engagement sur les abonnés.',
                'This is not a follower-based engagement rate.',
              )}
            </p>
            <ul className="inf-review-actions">
              {stats.measured < missions.length && (
                <li>
                  {t('À compléter :', 'Complete next:')}{' '}
                  {missions.length - stats.measured}{' '}
                  {t(
                    'mission(s) sans relevé. Demandez une preuve datée avant de conclure sur leur impact.',
                    'mission(s) without a snapshot. Request dated evidence before assessing impact.',
                  )}
                </li>
              )}
              <li>
                {t('Validation éditoriale :', 'Editorial review:')}{' '}
                {missions.filter((m) => m.state === 'submitted').length}{' '}
                {t(
                  'contenu(s) attendent un retour. Priorisez leur revue avant la diffusion.',
                  'content item(s) awaiting feedback. Prioritise review before publishing.',
                )}
              </li>
              {role !== 'creator' && budget > 0 && (
                <li>
                  {t('Lecture budgétaire :', 'Budget review:')}{' '}
                  {((stats.spent / budget) * 100).toFixed(1)} %{' '}
                  {t(
                    'du budget envisagé est enregistré en dépenses. Rapprochez les références avec vos justificatifs ; ce ratio ne mesure pas le retour sur investissement.',
                    'of estimated budget is recorded as spending. Reconcile references with receipts; this ratio does not measure return on investment.',
                  )}
                </li>
              )}
            </ul>
            <div className="inf-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>{t('Mission', 'Mission')}</th>
                    <th>{t('Date du relevé', 'Snapshot date')}</th>
                    <th>{t('Vues', 'Views')}</th>
                    <th>{t('Clics', 'Clicks')}</th>
                    <th>{t('Source et preuve', 'Source and evidence')}</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((m) => (
                    <tr key={m.id}>
                      <td>
                        {missions.find((x) => x.id === m.mission_id)?.title}
                      </td>
                      <td>
                        {new Date(m.captured_at).toLocaleDateString(
                          localeForDate(),
                        )}
                      </td>
                      <td>{number(m.views)}</td>
                      <td>{m.clicks}</td>
                      <td>
                        {m.source}
                        {m.evidence_url && (
                          <a
                            href={m.evidence_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {' '}
                            ↗ {t('Preuve', 'Evidence')}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {role === 'creator' &&
              missions.some((m) =>
                ['submitted', 'approved'].includes(m.state),
              ) && (
                <>
                  <h3>
                    {t(
                      'Ajouter un relevé cumulatif',
                      'Add a cumulative snapshot',
                    )}
                  </h3>
                  <p>
                    {t(
                      'Utilisez les compteurs cumulés de la publication à la date du relevé. Le bilan retient le dernier relevé par mission, sans additionner les versions.',
                      'Use cumulative publication counters at the snapshot date. Reports use the latest snapshot per mission without adding versions.',
                    )}
                  </p>
                  <DataForm
                    busy={busy}
                    onSubmit={(f) =>
                      command(
                        'record_metric',
                        String(f.get('mission_id')),
                        Object.fromEntries(f),
                      )
                    }
                  >
                    <label>
                      Mission
                      <select name="mission_id">
                        {missions
                          .filter((m) =>
                            ['submitted', 'approved'].includes(m.state),
                          )
                          .map((m) => (
                            <option value={m.id} key={m.id}>
                              {m.title}
                            </option>
                          ))}
                      </select>
                    </label>
                    {['views', 'likes', 'comments', 'shares', 'clicks'].map(
                      (n, i) => (
                        <Field
                          key={n}
                          name={n}
                          type="number"
                          label={
                            [
                              t('Vues', 'Views'),
                              'Likes',
                              t('Commentaires', 'Comments'),
                              t('Partages', 'Shares'),
                              t('Clics', 'Clicks'),
                            ][i]
                          }
                        />
                      ),
                    )}
                    <Field
                      name="evidence_url"
                      type="url"
                      label={t(
                        'Lien de preuve accessible aux parties',
                        'Evidence link accessible to participants',
                      )}
                    />
                  </DataForm>
                </>
              )}
          </section>
        )}
        {tab === 'finance' && (
          <section className="inf-panel">
            <h2>
              {role === 'creator'
                ? t('Vos revenus, clairement.', 'Your earnings, clearly.')
                : t(
                    'Le budget, sans angle mort.',
                    'A clear view of your budget.',
                  )}
            </h2>
            <div className="inf-kpi-grid">
              <Kpi
                label={
                  role === 'creator'
                    ? t('Honoraires prévus', 'Planned fees')
                    : t('Budget envisagé', 'Estimated budget')
                }
                value={money(role === 'creator' ? stats.planned : budget)}
              />
              <Kpi
                label={t('Paiements créateurs', 'Creator payments')}
                value={money(stats.paid)}
              />
              <Kpi
                label={
                  role === 'creator'
                    ? t('Solde indicatif', 'Indicative balance')
                    : t('Dépenses enregistrées', 'Recorded expenses')
                }
                value={money(
                  role === 'creator'
                    ? Math.max(0, stats.planned - stats.paid)
                    : stats.spent,
                )}
              />
            </div>
            <p className="inf-fine">
              {t(
                'Le solde est un indicateur de suivi, soumis aux conditions contractuelles. Aucun virement ni portefeuille électronique n’est exécuté ici.',
                'The balance is a tracking indicator subject to contract terms. No transfer or electronic wallet is executed here.',
              )}
            </p>
            <div className="inf-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>{t('Date', 'Date')}</th>
                    <th>{t('Nature', 'Type')}</th>
                    <th>{t('Référence', 'Reference')}</th>
                    <th>{t('Montant', 'Amount')}</th>
                  </tr>
                </thead>
                <tbody>
                  {costs.map((c) => (
                    <tr key={c.id}>
                      <td>
                        {new Date(c.recorded_at).toLocaleDateString(
                          localeForDate(),
                        )}
                      </td>
                      <td>
                        {{
                          creator_payment: t(
                            'Rémunération créateur',
                            'Creator payment',
                          ),
                          production: t('Production', 'Production'),
                          media: t('Diffusion média', 'Media spending'),
                          other: t('Autre dépense', 'Other expense'),
                        }[c.kind] || c.kind}
                      </td>
                      <td>{c.reference}</td>
                      <td>{money(c.amount_gnf)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {role === 'admin' && visibleCampaigns.length > 0 && (
              <>
                <h3>
                  {t(
                    'Enregistrer une dépense constatée',
                    'Record an observed expense',
                  )}
                </h3>
                <DataForm
                  busy={busy}
                  onSubmit={(f) =>
                    command(
                      'record_cost',
                      String(f.get('campaign_id')),
                      Object.fromEntries(f),
                    )
                  }
                >
                  <label>
                    Campagne
                    <select name="campaign_id">
                      {visibleCampaigns.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Mission
                    <select name="mission_id">
                      <option value="">
                        {t('Dépense de campagne', 'Campaign expense')}
                      </option>
                      {missions.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('Nature', 'Type')}
                    <select name="kind">
                      {['creator_payment', 'production', 'media', 'other'].map(
                        (x) => (
                          <option key={x}>{x}</option>
                        ),
                      )}
                    </select>
                  </label>
                  <Field
                    type="number"
                    name="amount_gnf"
                    label={t('Montant en GNF', 'Amount in GNF')}
                  />
                  <Field
                    name="reference"
                    label={t('Référence du justificatif', 'Evidence reference')}
                  />
                </DataForm>
              </>
            )}
          </section>
        )}
        {tab === 'creators' && role === 'admin' && (
          <section className="inf-panel">
            <h2>
              {t('Candidatures et publication', 'Applications and publication')}
            </h2>
            <p>
              {t(
                'Vérifiez le compte social et le consentement avant de publier. Aucun profil n’est automatiquement approuvé à l’inscription.',
                'Review the social account and consent before publishing. Signing up never approves a profile automatically.',
              )}
            </p>
            {data.applications.map((c: Creator) => (
              <article className="inf-contract" key={c.id}>
                <h3>{c.name}</h3>
                <p>
                  {c.category} · {c.location} · {c.network}
                </p>
                <p>{c.bio}</p>
                {c.social_url && (
                  <a href={c.social_url} target="_blank" rel="noreferrer">
                    {t('Vérifier le compte social', 'Check social account')} ↗
                  </a>
                )}
                <DataForm
                  busy={busy}
                  onSubmit={(f) =>
                    command('review_creator', c.id, {
                      ...Object.fromEntries(f),
                      publish: f.get('publish') === 'yes',
                    })
                  }
                >
                  <label>
                    {t(
                      'Audience documentée facultative',
                      'Optional documented audience',
                    )}
                    <input type="number" name="followers" min={0} step={1} />
                  </label>
                  <label>
                    {t('Décision de publication', 'Publication decision')}
                    <select name="publish">
                      <option value="no">
                        {t(
                          'Conserver privé ou retirer',
                          'Keep private or unpublish',
                        )}
                      </option>
                      <option value="yes">
                        {t(
                          'Publier le profil vérifié',
                          'Publish reviewed profile',
                        )}
                      </option>
                    </select>
                  </label>
                </DataForm>
              </article>
            ))}
            {data.applications.length === 0 && (
              <Empty
                text={t(
                  'Aucune candidature à examiner.',
                  'No applications to review.',
                )}
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
}
function localeForDate() {
  return typeof document !== 'undefined' &&
    document.documentElement.lang === 'en'
    ? 'en-GB'
    : 'fr-FR';
}
function Kpi({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="inf-kpi">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </div>
  );
}
function Empty({ text, path }: { text: string; path?: string }) {
  return (
    <div className="inf-empty">
      <p>{text}</p>
      {path && (
        <a className="inf-button" href={href(path)}>
          {t('Créer une campagne', 'Create a campaign')} ↗
        </a>
      )}
    </div>
  );
}
function Field({
  name,
  label,
  type = 'text',
}: {
  name: string;
  label: string;
  type?: string;
}) {
  return (
    <label>
      {label}
      <input
        required
        name={name}
        type={type}
        min={type === 'number' ? 0 : undefined}
        max={type === 'number' ? 100000000000 : undefined}
        step={type === 'number' ? 1 : undefined}
        maxLength={type === 'url' ? 1000 : 250}
        pattern={type === 'url' ? 'https://.*' : undefined}
      />
    </label>
  );
}
function DataForm({
  children,
  onSubmit,
  busy,
}: {
  children: React.ReactNode;
  onSubmit: (f: FormData) => Promise<void>;
  busy: boolean;
}) {
  return (
    <form
      className="inf-data-form"
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit(new FormData(e.currentTarget));
      }}
    >
      {children}
      <button className="inf-button" disabled={busy}>
        {busy ? t('Enregistrement…', 'Saving…') : t('Enregistrer', 'Save')}
      </button>
    </form>
  );
}
