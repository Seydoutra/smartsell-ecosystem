'use client';
import {
  pricingItem,
  pricingErrors,
  normalizePricing,
} from '@smartsell/content/pricing';
import { AcademyPricingEditor } from './pricing-editor';
import { useEffect, useMemo, useState } from 'react';
import { t } from '@smartsell/routing';
import { Icon } from '@smartsell/ui/icons';
import { AdminAccess } from './access';
import { Insights } from './insights';
import { CourseAccess } from './course-access';
import { publicationErrors } from './model';
import { platform, platformConfigured, checked } from '@smartsell/ui/platform';
import { modules, type Collection, type Field, type Module } from './schema';

/*
 * Administration : contenus Supabase, sauvegarde avec contrôle de version,
 * approbation de la publication et statistiques. La vitrine statique est
 * reconstruite par GitHub Pages à partir des collections approuvées.
 */

type Bi = { fr: unknown; en: unknown };
type Item = Record<string, unknown>;
type Data = Record<string, Record<string, Item[]>>;
type LogEntry = { at: string; text: string };

const DRAFT = 'smartsell-admin-draft-v1';
const LOG = 'smartsell-admin-log-v1';

const isBi = (v: unknown): v is Bi =>
  !!v && typeof v === 'object' && !Array.isArray(v) && 'fr' in v && 'en' in v;

function normalize(field: Field, value: unknown): unknown {
  if (field.type === 'academy-pricing') return normalizePricing(value);
  if (field.type === 'group') {
    const list = Array.isArray(value) ? value : [];
    return list.map((row) =>
      Object.fromEntries(
        (field.fields || []).map((f) => [
          f.key,
          normalize(f, (row as Item)[f.key]),
        ]),
      ),
    );
  }
  const empty =
    field.type === 'list' || field.type === 'images'
      ? []
      : field.type === 'bool'
        ? false
        : '';
  if (field.i18n)
    return isBi(value) ? value : { fr: value ?? empty, en: value ?? empty };
  if (isBi(value)) return value.fr;
  return value ?? empty;
}

const blank = (c: Collection): Item =>
  Object.fromEntries(c.fields.map((f) => [f.key, normalize(f, undefined)]));

const text = (v: unknown, lang: 'fr' | 'en' = 'fr'): string => {
  const x = isBi(v) ? v[lang] : v;
  if (Array.isArray(x)) return x.join(' · ');
  return x == null ? '' : String(x);
};

function AdminEditor({ base, siteHref }: { base: string; siteHref: string }) {
  const [source, setSource] = useState<Data | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [view, setView] = useState<{
    module?: Module['id'];
    collection?: string;
  }>({});
  const [editing, setEditing] = useState<{ index: number; item: Item } | null>(
    null,
  );
  const [confirm, setConfirm] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [revisions, setRevisions] = useState<Record<string, number>>({});
  const [cloudBusy, setCloudBusy] = useState(false);
  const [pricingBackendReady, setPricingBackendReady] =
    useState(!platformConfigured);
  const [cloudNotice, setCloudNotice] = useState('');
  const contentUrl = `${base}/admin/content.json`;

  const imageUrl = (ref: string, small = true) => {
    if (ref.startsWith('blob:') || ref.startsWith('https://')) return ref;
    if (ref.startsWith('unsplash:'))
      return `https://images.unsplash.com/${ref.slice(9)}?auto=format&fit=crop&w=${small ? 400 : 1200}&q=70`;
    const file = ref.replace(/^local:/, '');
    return `${base}/media/${file}${small ? '-sm' : ''}.jpg`;
  };
  const videoUrl = (src: string) =>
    src.startsWith('blob:') || src.startsWith('https://')
      ? src
      : `${base}/media/${src}.mp4`;

  useEffect(() => {
    const controller = new AbortController();
    setError('');
    fetch(contentUrl, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`Content request failed: ${r.status}`);
        return r.json();
      })
      .then(async (json: { data: Data }) => {
        if (controller.signal.aborted) return;
        const clean: Data = {};
        for (const m of modules) {
          clean[m.id] = {};
          for (const c of m.collections)
            clean[m.id][c.id] = (
              json.data[m.id]?.[c.id] ||
              (m.id === 'academy' && c.id === 'pricing' ? [pricingItem] : [])
            ).map((item) =>
              Object.fromEntries(
                c.fields.map((f) => [f.key, normalize(f, item[f.key])]),
              ),
            );
        }
        if (platformConfigured) {
          const rows = await checked(
            await platform()
              .from('content_collections')
              .select('segment,collection,items,revision'),
          );
          if (controller.signal.aborted) return;
          if (!rows?.length) throw new Error('No content has been initialised');
          const nextRevisions: Record<string, number> = {};
          for (const row of rows) {
            if (clean[row.segment]?.[row.collection])
              clean[row.segment][row.collection] =
                row.segment === 'academy' && row.collection === 'pricing'
                  ? (row.items as Item[]).map((item) => ({
                      ...item,
                      configuration: normalizePricing(item.configuration),
                    }))
                  : (row.items as Item[]);
            nextRevisions[`${row.segment}/${row.collection}`] = row.revision;
          }
          const priceRow = rows.find(
            (row) => row.segment === 'academy' && row.collection === 'pricing',
          );
          const ready =
            (
              priceRow?.items as
                | { configuration?: { version?: number } }[]
                | undefined
            )?.[0]?.configuration?.version === 2;
          setPricingBackendReady(ready);
          if (!ready)
            setCloudNotice(
              t(
                'La mise à jour des prix par module doit encore être appliquée dans Supabase. Tous les modules restent gratuits ; les changements de prix ne peuvent pas encore être enregistrés.',
                'The module pricing migration still needs to be applied in Supabase. All modules remain free; price changes cannot yet be saved.',
              ),
            );
          setRevisions(nextRevisions);
          setSource(clean);
          setData(structuredClone(clean));
          setLog([]);
        } else {
          setSource(clean);
          try {
            const draft = localStorage.getItem(DRAFT);
            setData(draft ? JSON.parse(draft) : clean);
            setLog(JSON.parse(localStorage.getItem(LOG) || '[]'));
          } catch {
            setData(clean);
          }
        }
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setError(
          t(
            'Impossible de lire les contenus du site.',
            'Could not read the site content.',
          ),
        );
      });
    return () => controller.abort();
  }, [contentUrl, loadAttempt]);

  const save = (next: Data, entry: string) => {
    setData(next);
    const nextLog = [
      { at: new Date().toISOString(), text: entry },
      ...log,
    ].slice(0, 40);
    setLog(nextLog);
    if (platformConfigured) return;
    try {
      localStorage.setItem(DRAFT, JSON.stringify(next));
      localStorage.setItem(LOG, JSON.stringify(nextLog));
    } catch {}
  };

  const media = useMemo(() => {
    const images = new Set<string>();
    const clips = new Set<string>();
    if (source)
      for (const m of modules)
        for (const c of m.collections)
          for (const item of source[m.id][c.id])
            for (const f of c.fields) {
              const v = item[f.key];
              if (f.type === 'image' && typeof v === 'string' && v)
                images.add(v);
              if (f.type === 'images' && Array.isArray(v))
                v.forEach((x) => images.add(String(x)));
              if (f.type === 'video' && typeof v === 'string' && v)
                clips.add(v);
            }
    return { images: [...images], clips: [...clips] };
  }, [source]);

  if (error)
    return (
      <main id="main" className="adm-error" data-kin-off>
        <section className="adm-error-panel" aria-labelledby="admin-load-error">
          <p className="adm-error-kicker">SMARTSELL / ADMINISTRATION</p>
          <h1 id="admin-load-error">
            {t(
              'L’administration n’a pas pu se charger.',
              'The admin could not load.',
            )}
          </h1>
          <p role="alert">{error}</p>
          <p>
            {t(
              'Vous pouvez réessayer ou revenir au site.',
              'You can try again or return to the site.',
            )}
          </p>
          <div className="adm-error-actions">
            <button
              type="button"
              onClick={() => setLoadAttempt((attempt) => attempt + 1)}
            >
              {t('Réessayer', 'Try again')}
            </button>
            <a href={siteHref}>{t('Retour au site', 'Back to the site')}</a>
          </div>
        </section>
      </main>
    );
  if (!data || !source)
    return (
      <main
        id="main"
        className="adm-loading"
        aria-busy="true"
        data-admin-content-url={contentUrl}
      >
        {t('Chargement de l’administration…', 'Loading the admin…')}
      </main>
    );

  const module = modules.find((m) => m.id === view.module);
  const collection = module?.collections.find((c) => c.id === view.collection);
  const items = module && collection ? data[module.id][collection.id] : [];
  const changed = JSON.stringify(data) !== JSON.stringify(source);

  const setItems = (list: Item[], entry: string) => {
    if (!module || !collection) return;
    save(
      { ...data, [module.id]: { ...data[module.id], [collection.id]: list } },
      entry,
    );
  };

  const saveCloud = async () => {
    if (!platformConfigured || !data || !source) return;
    if (
      !pricingBackendReady &&
      JSON.stringify(data.academy.pricing) !==
        JSON.stringify(source.academy.pricing)
    ) {
      setCloudNotice(
        t(
          'La mise à jour Supabase des prix par module est nécessaire avant cet enregistrement.',
          'The Supabase module pricing migration is required before saving these changes.',
        ),
      );
      return;
    }
    const priceErrors = pricingErrors(data.academy.pricing[0]?.configuration);
    if (priceErrors.length) {
      setCloudNotice(priceErrors.join(' '));
      return;
    }
    setCloudBusy(true);
    setCloudNotice('');
    const saved = structuredClone(source);
    const nextRevisions = { ...revisions };
    let count = 0;
    try {
      for (const m of modules)
        for (const c of m.collections) {
          if (
            JSON.stringify(data[m.id][c.id]) ===
            JSON.stringify(source[m.id][c.id])
          )
            continue;
          const key = `${m.id}/${c.id}`;
          const revision = await checked(
            await platform().rpc('ecosystem_save_collection', {
              scope: m.id,
              name: c.id,
              content: data[m.id][c.id],
              expected_revision: nextRevisions[key],
            }),
          );
          nextRevisions[key] = Number(revision);
          saved[m.id][c.id] = structuredClone(data[m.id][c.id]);
          count++;
        }
      setCloudNotice(
        t(
          `${count} collection(s) enregistrée(s) dans Supabase.`,
          `${count} collection(s) saved in Supabase.`,
        ),
      );
    } catch {
      setCloudNotice(
        t(
          `Enregistrement interrompu après ${count} collection(s). Un autre membre a peut-être modifié le contenu. Exportez votre travail avant de recharger.`,
          `Save interrupted after ${count} collection(s). Another member may have changed the content. Export your work before reloading.`,
        ),
      );
    } finally {
      setSource(saved);
      setRevisions(nextRevisions);
      setCloudBusy(false);
    }
  };

  const preparePublication = async () => {
    const errors = publicationErrors(data);
    if (errors.length) {
      setCloudNotice(errors.slice(0, 5).join(' · '));
      return;
    }
    if (
      !window.confirm(
        t(
          'Approuver les contenus enregistrés dans Supabase pour le prochain déploiement du site ?',
          'Approve saved Supabase content for the next site deployment?',
        ),
      )
    )
      return;
    setCloudBusy(true);
    setCloudNotice('');
    try {
      await checked(await platform().rpc('ecosystem_publish_content'));
      setCloudNotice(
        t(
          'Publication approuvée. Lancez ensuite le déploiement dans GitHub Actions pour mettre le site à jour.',
          'Publication approved. Run the GitHub Actions deployment to update the public site.',
        ),
      );
    } catch {
      setCloudNotice(
        t(
          'La publication n’a pas pu être préparée. Réessayez.',
          'Unable to prepare publication. Try again.',
        ),
      );
    } finally {
      setCloudBusy(false);
    }
  };
  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ data }, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'smartsell-contenus.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const filtered = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) =>
      collection
        ? `${text(item[collection.titleKey])} ${text(item[collection.titleKey], 'en')} ${text(item.slug)}`
            .toLowerCase()
            .includes(query.toLowerCase())
        : true,
    );

  const thumb = (item: Item) => {
    if (!collection) return null;
    if (collection.videoKey) {
      const v = String(item[collection.videoKey] || '');
      return v ? (
        <img
          src={v.startsWith('blob:') ? '' : `${base}/media/${v}-sm.jpg`}
          alt=""
        />
      ) : null;
    }
    if (!collection.imageKey) return null;
    const v = item[collection.imageKey];
    const ref = Array.isArray(v) ? v[0] : v;
    return ref ? <img src={imageUrl(String(ref))} alt="" /> : null;
  };

  return (
    <div className={`adm ${cloudBusy ? 'adm-saving' : ''}`} data-kin-off="">
      <aside className="adm-side">
        <a className="adm-logo" href={siteHref}>
          <img src={`${base}/brand/icon-yellow.png`} alt="" />
          <span>
            Smartsell <b>Admin</b>
          </span>
        </a>
        <button
          type="button"
          className={!module ? 'is-on' : ''}
          onClick={() => {
            setView({});
            setQuery('');
          }}
        >
          <Icon name="dashboard" /> {t('Tableau de bord', 'Dashboard')}
        </button>
        {modules.map((m) => (
          <div
            key={m.id}
            className={`adm-mod ${view.module === m.id ? 'is-open' : ''}`}
          >
            <p>
              <i className={`adm-dot adm-${m.id}`} /> {m.name}
            </p>
            {m.collections.map((c) => (
              <button
                key={c.id}
                type="button"
                className={
                  view.module === m.id && view.collection === c.id
                    ? 'is-on'
                    : ''
                }
                onClick={() => {
                  setView({ module: m.id, collection: c.id });
                  setQuery('');
                }}
              >
                {c.label}
                <small>{data[m.id][c.id].length}</small>
              </button>
            ))}
          </div>
        ))}
        <a className="adm-site" href={siteHref}>
          {t('Voir le site', 'View the site')} <Icon name="arrowUpRight" />
        </a>
      </aside>

      <main className="adm-main" aria-busy={cloudBusy}>
        <div className="adm-banner" role="note">
          <Icon name="info" />
          <span>
            {t(
              'Les modifications se préparent ici, puis s’enregistrent dans Supabase. Enregistrer et mettre en ligne le site sont deux étapes distinctes.',
              'Prepare changes here, then save them to Supabase. Saving and deploying the public site are separate steps.',
            )}
          </span>
          <div>
            {platformConfigured && (
              <button
                type="button"
                disabled={!changed || cloudBusy}
                onClick={saveCloud}
              >
                {cloudBusy
                  ? t('Enregistrement…', 'Saving…')
                  : t('Enregistrer dans Supabase', 'Save to Supabase')}
              </button>
            )}
            {platformConfigured && (
              <button
                type="button"
                disabled={changed || cloudBusy}
                onClick={preparePublication}
              >
                {t('Approuver la publication', 'Approve publication')}
              </button>
            )}
            {platformConfigured && (
              <a
                href="https://github.com/Seydoutra/smartsell-ecosystem/actions/workflows/pages.yml"
                target="_blank"
                rel="noreferrer"
              >
                {t('Déployer sur GitHub', 'Deploy on GitHub')} ↗
              </a>
            )}
            <button type="button" onClick={exportJson}>
              <Icon name="download" /> {t('Exporter (JSON)', 'Export (JSON)')}
            </button>
            <button
              type="button"
              disabled={!changed || cloudBusy}
              onClick={() => {
                if (
                  window.confirm(
                    t(
                      'Annuler toutes les modifications ?',
                      'Discard all changes?',
                    ),
                  )
                ) {
                  try {
                    localStorage.removeItem(DRAFT);
                  } catch {}
                  save(
                    source,
                    t('Modifications annulées', 'Changes discarded'),
                  );
                }
              }}
            >
              <Icon name="sync" /> {t('Réinitialiser', 'Reset')}
            </button>
          </div>
        </div>

        {cloudNotice && (
          <p className="adm-cloud-notice" role="status">
            {cloudNotice}
          </p>
        )}
        {!module || !collection ? (
          <section className="adm-dash">
            {platformConfigured && (
              <>
                <Insights />
                <CourseAccess />
              </>
            )}
            <h1>{t('Tableau de bord', 'Dashboard')}</h1>
            <p className="adm-lead">
              {t(
                'Quatre univers et les produits en complément. Choisissez une collection pour gérer vos contenus.',
                'Four universes, with products alongside. Pick a collection to manage your content.',
              )}
            </p>
            <div className="adm-cards">
              {modules.map((m) => (
                <article key={m.id} className={`adm-card adm-card-${m.id}`}>
                  <header>
                    <h2>{m.name}</h2>
                    <span>{m.tagline}</span>
                  </header>
                  {m.collections.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() =>
                        setView({ module: m.id, collection: c.id })
                      }
                    >
                      <span>{c.label}</span>
                      <b>{data[m.id][c.id].length}</b>
                    </button>
                  ))}
                </article>
              ))}
            </div>
            <h2 className="adm-h2">
              {t('Dernières modifications', 'Latest changes')}
            </h2>
            {log.length === 0 ? (
              <p className="adm-empty">
                {t('Aucune modification pour le moment.', 'No changes yet.')}
              </p>
            ) : (
              <ul className="adm-log">
                {log.map((l) => (
                  <li key={l.at + l.text}>
                    <time>
                      {new Date(l.at).toLocaleString(t('fr-FR', 'en-GB'))}
                    </time>{' '}
                    {l.text}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : module.id === 'academy' && collection.id === 'pricing' ? (
          <AcademyPricingEditor
            item={items[0] || pricingItem}
            onChange={(item) =>
              setItems(
                [item],
                t(
                  'Prix et promotions modifiés',
                  'Prices and promotions updated',
                ),
              )
            }
          />
        ) : (
          <section className="adm-list">
            <header className="adm-list-head">
              <div>
                <p className="adm-crumb">
                  {module.name} / {collection.label}
                </p>
                <h1>
                  {collection.label} <small>{items.length}</small>
                </h1>
              </div>
              <div className="adm-tools">
                <label className="adm-search">
                  <Icon name="search" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('Rechercher…', 'Search…')}
                    aria-label={t('Rechercher', 'Search')}
                  />
                </label>
                <button
                  type="button"
                  className="adm-primary"
                  onClick={() =>
                    setEditing({ index: -1, item: blank(collection) })
                  }
                >
                  <Icon name="plus" /> {t('Ajouter', 'Add')}{' '}
                  {collection.singular}
                </button>
              </div>
            </header>
            <div className="adm-rows">
              {filtered.map(({ item, index }) => (
                <article key={index} className="adm-row">
                  <div className="adm-thumb">
                    {thumb(item) || <Icon name="file" />}
                  </div>
                  <div className="adm-row-text">
                    <strong>
                      {text(item[collection.titleKey]) ||
                        t('(sans titre)', '(untitled)')}
                    </strong>
                    {isBi(item[collection.titleKey]) && (
                      <span className="adm-en">
                        EN · {text(item[collection.titleKey], 'en')}
                      </span>
                    )}
                    {collection.subKey && (
                      <span>{text(item[collection.subKey]).slice(0, 120)}</span>
                    )}
                  </div>
                  <div className="adm-actions">
                    <button
                      type="button"
                      aria-label={t('Monter', 'Move up')}
                      disabled={index === 0}
                      onClick={() => {
                        const list = [...items];
                        [list[index - 1], list[index]] = [
                          list[index],
                          list[index - 1],
                        ];
                        setItems(
                          list,
                          `${collection.label} : ${t('ordre modifié', 'order changed')}`,
                        );
                      }}
                    >
                      <Icon name="arrowUp" />
                    </button>
                    <button
                      type="button"
                      aria-label={t('Descendre', 'Move down')}
                      disabled={index === items.length - 1}
                      onClick={() => {
                        const list = [...items];
                        [list[index + 1], list[index]] = [
                          list[index],
                          list[index + 1],
                        ];
                        setItems(
                          list,
                          `${collection.label} : ${t('ordre modifié', 'order changed')}`,
                        );
                      }}
                    >
                      <Icon name="arrowDown" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditing({ index, item: structuredClone(item) })
                      }
                    >
                      {t('Modifier', 'Edit')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const copy = structuredClone(item);
                        if (typeof copy.slug === 'string')
                          copy.slug = `${copy.slug}-copie`;
                        const list = [...items];
                        list.splice(index + 1, 0, copy);
                        setItems(
                          list,
                          `${collection.label} : ${t('duplication de', 'duplicated')} « ${text(item[collection.titleKey])} »`,
                        );
                      }}
                    >
                      {t('Dupliquer', 'Duplicate')}
                    </button>
                    <button
                      type="button"
                      className="adm-danger"
                      onClick={() => setConfirm(index)}
                    >
                      {t('Supprimer', 'Delete')}
                    </button>
                  </div>
                </article>
              ))}
              {filtered.length === 0 && (
                <p className="adm-empty">
                  {t('Aucun résultat.', 'No results.')}
                </p>
              )}
            </div>
          </section>
        )}
      </main>

      {confirm !== null && collection && (
        <div className="adm-modal" role="dialog" aria-modal="true">
          <div className="adm-dialog">
            <h2>{t('Supprimer ce contenu ?', 'Delete this content?')}</h2>
            <p>« {text(items[confirm]?.[collection.titleKey])} »</p>
            <div>
              <button type="button" onClick={() => setConfirm(null)}>
                {t('Annuler', 'Cancel')}
              </button>
              <button
                type="button"
                className="adm-danger"
                onClick={() => {
                  const gone = items[confirm];
                  setItems(
                    items.filter((_, i) => i !== confirm),
                    `${collection.label} : ${t('suppression de', 'deleted')} « ${text(gone?.[collection.titleKey])} »`,
                  );
                  setConfirm(null);
                }}
              >
                {t('Supprimer', 'Delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      {editing && collection && (
        <Editor
          collection={collection}
          item={editing.item}
          isNew={editing.index < 0}
          media={media}
          imageUrl={imageUrl}
          videoUrl={videoUrl}
          onCancel={() => setEditing(null)}
          onSave={(item) => {
            const list = [...items];
            if (editing.index < 0) list.unshift(item);
            else list[editing.index] = item;
            setItems(
              list,
              `${collection.label} : ${editing.index < 0 ? t('ajout de', 'added') : t('modification de', 'edited')} « ${text(item[collection.titleKey])} »`,
            );
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function Editor({
  collection,
  item,
  isNew,
  media,
  imageUrl,
  videoUrl,
  onCancel,
  onSave,
}: {
  collection: Collection;
  item: Item;
  isNew: boolean;
  media: { images: string[]; clips: string[] };
  imageUrl: (ref: string, small?: boolean) => string;
  videoUrl: (src: string) => string;
  onCancel: () => void;
  onSave: (item: Item) => void;
}) {
  const [draft, setDraft] = useState<Item>(item);
  const [picker, setPicker] = useState<{
    key: string;
    multiple: boolean;
  } | null>(null);
  const set = (key: string, value: unknown) =>
    setDraft((d) => ({ ...d, [key]: value }));
  return (
    <div
      className="adm-modal"
      role="dialog"
      aria-modal="true"
      aria-label={collection.label}
    >
      <form
        className="adm-editor"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(draft);
        }}
      >
        <header>
          <h2>
            {isNew ? t('Ajouter', 'Add') : t('Modifier', 'Edit')}{' '}
            {collection.singular}
          </h2>
          <button
            type="button"
            aria-label={t('Fermer', 'Close')}
            onClick={onCancel}
          >
            <Icon name="cross" />
          </button>
        </header>
        <div className="adm-fields">
          {collection.fields.map((f) => (
            <FieldEditor
              key={f.key}
              field={f}
              value={draft[f.key]}
              onChange={(v) => set(f.key, v)}
              onPick={(multiple) => setPicker({ key: f.key, multiple })}
              imageUrl={imageUrl}
              videoUrl={videoUrl}
            />
          ))}
        </div>
        <footer>
          <button type="button" onClick={onCancel}>
            {t('Annuler', 'Cancel')}
          </button>
          <button type="submit" className="adm-primary">
            <Icon name="check" /> {t('Enregistrer', 'Save')}
          </button>
        </footer>
      </form>
      {picker && (
        <MediaPicker
          kind={
            collection.fields.find((f) => f.key === picker.key)?.type ===
            'video'
              ? 'video'
              : 'image'
          }
          media={media}
          imageUrl={imageUrl}
          base={videoUrl('').replace(/\/media\/\.mp4$/, '')}
          onClose={() => setPicker(null)}
          onPick={(ref) => {
            const current = draft[picker.key];
            set(
              picker.key,
              picker.multiple
                ? [...(Array.isArray(current) ? current : []), ref]
                : ref,
            );
            setPicker(null);
          }}
        />
      )}
    </div>
  );
}

function FieldEditor({
  field,
  value,
  onChange,
  onPick,
  imageUrl,
  videoUrl,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  onPick: (multiple: boolean) => void;
  imageUrl: (ref: string, small?: boolean) => string;
  videoUrl: (src: string) => string;
}) {
  const single = (v: unknown, change: (x: unknown) => void, lang?: string) => {
    const id = `${field.key}-${lang || 'x'}`;
    if (field.type === 'textarea')
      return (
        <textarea
          id={id}
          rows={4}
          value={String(v ?? '')}
          onChange={(e) => change(e.target.value)}
        />
      );
    if (field.type === 'list') {
      const list = Array.isArray(v) ? (v as string[]) : [];
      return (
        <div className="adm-listfield">
          {list.map((x, i) => (
            <div key={i}>
              {field.long ? (
                <textarea
                  rows={3}
                  value={x}
                  onChange={(e) =>
                    change(list.map((y, j) => (j === i ? e.target.value : y)))
                  }
                />
              ) : (
                <input
                  value={x}
                  onChange={(e) =>
                    change(list.map((y, j) => (j === i ? e.target.value : y)))
                  }
                />
              )}
              <button
                type="button"
                aria-label={t('Retirer', 'Remove')}
                onClick={() => change(list.filter((_, j) => j !== i))}
              >
                <Icon name="minus" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="adm-add"
            onClick={() => change([...list, ''])}
          >
            <Icon name="plus" /> {t('Ajouter une ligne', 'Add a line')}
          </button>
        </div>
      );
    }
    return (
      <input
        id={id}
        type={
          field.type === 'number'
            ? 'number'
            : field.type === 'url'
              ? 'url'
              : 'text'
        }
        value={String(v ?? '')}
        onChange={(e) =>
          change(
            field.type === 'number'
              ? e.target.value === ''
                ? ''
                : Number(e.target.value)
              : e.target.value,
          )
        }
      />
    );
  };

  if (field.type === 'group') {
    const rows = Array.isArray(value) ? (value as Item[]) : [];
    return (
      <fieldset className="adm-field adm-group">
        <legend>{field.label}</legend>
        {rows.map((row, i) => (
          <div key={i} className="adm-group-row">
            <div className="adm-group-head">
              <b>{String(i + 1).padStart(2, '0')}</b>
              <button
                type="button"
                className="adm-danger"
                onClick={() => onChange(rows.filter((_, j) => j !== i))}
              >
                {t('Retirer', 'Remove')}
              </button>
            </div>
            {(field.fields || []).map((sub) => (
              <FieldEditor
                key={sub.key}
                field={sub}
                value={row[sub.key]}
                onChange={(v) =>
                  onChange(
                    rows.map((r, j) => (j === i ? { ...r, [sub.key]: v } : r)),
                  )
                }
                onPick={() => {}}
                imageUrl={imageUrl}
                videoUrl={videoUrl}
              />
            ))}
          </div>
        ))}
        <button
          type="button"
          className="adm-add"
          onClick={() =>
            onChange([
              ...rows,
              Object.fromEntries(
                (field.fields || []).map((f) => [
                  f.key,
                  normalize(f, undefined),
                ]),
              ),
            ])
          }
        >
          <Icon name="plus" /> {t('Ajouter', 'Add')}
        </button>
      </fieldset>
    );
  }

  if (field.type === 'bool')
    return (
      <label className="adm-field adm-check">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
        {field.label}
      </label>
    );

  if (field.type === 'select')
    return (
      <label className="adm-field">
        <span>{field.label}</span>
        <select
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
        >
          {(field.options || []).map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
    );

  if (field.type === 'image' || field.type === 'images') {
    const list =
      field.type === 'images'
        ? Array.isArray(value)
          ? (value as string[])
          : []
        : value
          ? [String(value)]
          : [];
    return (
      <div className="adm-field">
        <span>{field.label}</span>
        <div className="adm-images">
          {list.map((ref, i) => (
            <figure key={ref + i}>
              <img src={imageUrl(ref)} alt="" />
              <button
                type="button"
                aria-label={t('Retirer l’image', 'Remove image')}
                onClick={() =>
                  onChange(
                    field.type === 'images'
                      ? list.filter((_, j) => j !== i)
                      : '',
                  )
                }
              >
                <Icon name="cross" />
              </button>
            </figure>
          ))}
          <button
            type="button"
            className="adm-pick"
            onClick={() => onPick(field.type === 'images')}
          >
            <Icon name="plus" />{' '}
            {field.type === 'images' || !list.length
              ? t('Ajouter', 'Add')
              : t('Remplacer', 'Replace')}
          </button>
        </div>
      </div>
    );
  }

  if (field.type === 'video')
    return (
      <div className="adm-field">
        <span>{field.label}</span>
        <div className="adm-images">
          {value ? (
            <figure className="adm-video">
              <video
                src={videoUrl(String(value))}
                muted
                loop
                autoPlay
                playsInline
              />
            </figure>
          ) : null}
          <button
            type="button"
            className="adm-pick"
            onClick={() => onPick(false)}
          >
            <Icon name="plus" />{' '}
            {value ? t('Remplacer', 'Replace') : t('Ajouter', 'Add')}
          </button>
        </div>
      </div>
    );

  if (field.i18n) {
    const v = isBi(value) ? value : { fr: value, en: value };
    return (
      <div className="adm-field adm-bi">
        <span>{field.label}</span>
        <div>
          <label>
            <em>FR</em>
            {single(v.fr, (x) => onChange({ ...v, fr: x }), 'fr')}
          </label>
          <label>
            <em>EN</em>
            {single(v.en, (x) => onChange({ ...v, en: x }), 'en')}
          </label>
        </div>
      </div>
    );
  }
  return (
    <label className="adm-field">
      <span>{field.label}</span>
      {single(value, onChange)}
      {field.hint && <small>{field.hint}</small>}
    </label>
  );
}

function MediaPicker({
  kind,
  media,
  imageUrl,
  base,
  onClose,
  onPick,
}: {
  kind: 'image' | 'video';
  media: { images: string[]; clips: string[] };
  imageUrl: (ref: string, small?: boolean) => string;
  base: string;
  onClose: () => void;
  onPick: (ref: string) => void;
}) {
  const list = kind === 'image' ? media.images : media.clips;
  return (
    <div className="adm-modal adm-modal-top" role="dialog" aria-modal="true">
      <div className="adm-picker">
        <header>
          <h2>
            {kind === 'image'
              ? t('Médiathèque · images', 'Media library · images')
              : t('Médiathèque · vidéos', 'Media library · videos')}
          </h2>
          <button
            type="button"
            aria-label={t('Fermer', 'Close')}
            onClick={onClose}
          >
            <Icon name="cross" />
          </button>
        </header>
        {platformConfigured ? (
          <form
            className="adm-upload"
            onSubmit={(e) => {
              e.preventDefault();
              const url = String(
                new FormData(e.currentTarget).get('mediaUrl'),
              ).trim();
              try {
                const parsed = new URL(url);
                if (
                  parsed.protocol !== 'https:' ||
                  parsed.username ||
                  parsed.password
                )
                  return;
                onPick(parsed.href);
              } catch {
                /* Native URL input reports malformed values. */
              }
            }}
          >
            <label>
              {t('Lien HTTPS du média', 'HTTPS media link')}
              <input
                name="mediaUrl"
                type="url"
                pattern="https://.*"
                required
                placeholder="https://…"
              />
            </label>
            <p>
              {t(
                'Utilisez un média déjà hébergé ou choisissez dans la bibliothèque. L’envoi de nouveaux fichiers dans le stockage sera connecté séparément.',
                'Use an already hosted asset or choose from the library. Uploads to storage will be connected separately.',
              )}
            </p>
            <button type="submit">
              {t('Utiliser ce média', 'Use this asset')}
            </button>
          </form>
        ) : (
          <label className="adm-upload">
            <Icon name="download" />
            <span>
              {t(
                'Importer un fichier depuis l’ordinateur',
                'Upload a file from your computer',
              )}
              <small>
                {t(
                  'Aperçu local : le fichier sera envoyé au stockage une fois branché.',
                  'Local preview: the file will be sent to storage once connected.',
                )}
              </small>
            </span>
            <input
              type="file"
              accept={kind === 'image' ? 'image/*' : 'video/mp4'}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onPick(URL.createObjectURL(f));
              }}
            />
          </label>
        )}
        <div className="adm-library">
          {list.map((ref) => (
            <button key={ref} type="button" onClick={() => onPick(ref)}>
              {kind === 'image' ? (
                <img src={imageUrl(ref)} alt="" loading="lazy" />
              ) : (
                <img
                  src={`${base}/media/${ref}-sm.jpg`}
                  alt=""
                  loading="lazy"
                />
              )}
              <span>
                {ref
                  .replace(/^(local|unsplash):/, '')
                  .split('/')
                  .pop()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminApp(props: { base: string; siteHref: string }) {
  return (
    <div data-admin-content-url={`${props.base}/admin/content.json`}>
      <AdminAccess>
        <AdminEditor {...props} />
      </AdminAccess>
    </div>
  );
}
