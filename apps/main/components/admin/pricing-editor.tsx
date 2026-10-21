'use client';
import { courses } from '@smartsell/content/academy';
import {
  defaultPricing,
  freeFilmSlugs,
  pricingErrors,
  formatGNF,
  type Pricing,
} from '@smartsell/content/pricing';
import { locale, t } from '@smartsell/routing';
import type { Item } from './model';
export function AcademyPricingEditor({
  item,
  onChange,
}: {
  item: Item;
  onChange: (item: Item) => void;
}) {
  const config = (item.configuration as Pricing) || defaultPricing;
  const update = (mutate: (draft: Pricing) => void) => {
    const draft = structuredClone(config);
    mutate(draft);
    onChange({ ...item, configuration: draft });
  };
  const errors = pricingErrors(config);
  const number = (
    label: string,
    value: number,
    change: (n: number) => void,
    disabled = false,
    max = 100000000,
  ) => (
    <label>
      {label}
      <input
        type="number"
        min="0"
        max={max}
        step="1"
        value={value}
        disabled={disabled}
        onChange={(e) => change(Number(e.target.value))}
      />
    </label>
  );
  return (
    <section className="adm-pricing">
      <p className="adm-crumb">
        Academy / {t('Prix et promotions', 'Prices and promotions')}
      </p>
      <h1>{t('Un prix pour chaque module.', 'A price for each module.')}</h1>
      <p>
        {t(
          'Tous les modules démarrent gratuits. 0 GNF signifie gratuit ; saisissez le montant de votre choix pour préparer une vente à l’unité. Enregistrez dans Supabase, approuvez, puis déployez sur GitHub pour actualiser le site.',
          'All modules start free. 0 GNF means free; enter your chosen amount to prepare individual sales. Save to Supabase, approve, then deploy on GitHub to update the site.',
        )}
      </p>
      <p className="adm-price-note">
        {t(
          'Les paiements et le blocage des accès payants seront connectés lors de la phase commerciale. Changer un prix prépare l’offre ; cela ne déclenche aucun encaissement et ne retire aucun accès existant.',
          'Payments and paid access gates will be connected in the commerce phase. Changing a price prepares the offer; it does not charge anyone or remove existing access.',
        )}
      </p>
      {errors.length > 0 && (
        <div role="alert" className="adm-pricing-errors">
          <b>{t('À corriger avant enregistrement', 'Fix before saving')}</b>
          <ul>
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="adm-price-courses">
        {config.courses.map((row, index) => {
          const locked = freeFilmSlugs.includes(row.slug);
          const c = courses.find((c) => c.slug === row.slug);
          return (
            <article key={row.slug}>
              <header>
                <div>
                  <h2>{c?.title || row.slug}</h2>
                  <small>
                    {c?.full
                      ? t('Formation complète', 'Complete course')
                      : t(
                          'Module · parcours de découverte actuel',
                          'Module · current discovery course',
                        )}
                  </small>
                </div>
                <strong>
                  {row.price === 0
                    ? t('Gratuit', 'Free')
                    : formatGNF(row.price, locale)}
                </strong>
              </header>
              {number(
                t(
                  'Prix du module (GNF) — 0 = gratuit',
                  'Module price (GNF) — 0 = free',
                ),
                row.price,
                (n) =>
                  update((d) => {
                    d.courses[index].price = n;
                    if (n === 0)
                      d.courses[index].promotion = {
                        enabled: false,
                        price: 0,
                        start: '',
                        end: '',
                      };
                  }),
                locked,
              )}
              {locked ? (
                <p>
                  {t(
                    'Gratuité protégée pour le court-métrage IA.',
                    'AI short-film course is protected as free.',
                  )}
                </p>
              ) : (
                <details>
                  <summary>
                    {t('Configurer une promotion', 'Configure a promotion')}
                  </summary>
                  <label className="adm-price-check">
                    <input
                      type="checkbox"
                      disabled={row.price === 0}
                      checked={row.promotion.enabled}
                      onChange={(e) =>
                        update((d) => {
                          d.courses[index].promotion.enabled = e.target.checked;
                        })
                      }
                    />
                    {t(
                      'Activer la promotion sur la période définie',
                      'Enable the promotion for the selected period',
                    )}
                  </label>
                  {number(
                    t('Prix promotionnel (GNF)', 'Promotional price (GNF)'),
                    row.promotion.price,
                    (n) =>
                      update((d) => {
                        d.courses[index].promotion.price = n;
                      }),
                    row.price === 0,
                  )}
                  <div className="adm-promo-dates">
                    {(['start', 'end'] as const).map((key) => (
                      <label key={key}>
                        {key === 'start'
                          ? t(
                              'Début — heure de Conakry (UTC)',
                              'Start — Conakry time (UTC)',
                            )
                          : t(
                              'Fin exclusive — heure de Conakry (UTC)',
                              'Exclusive end — Conakry time (UTC)',
                            )}
                        <input
                          type="datetime-local"
                          step="60"
                          disabled={row.price === 0}
                          value={row.promotion[key].slice(0, 16)}
                          onInput={(e) => {
                            const value = e.currentTarget.value;
                            update((d) => {
                              d.courses[index].promotion[key] = value
                                ? value.slice(0, 16) + ':00Z'
                                : '';
                            });
                          }}
                        />
                      </label>
                    ))}
                  </div>
                  <p>
                    {t(
                      'Un prix promotionnel doit être inférieur au prix normal. La promotion cesse à la date de fin.',
                      'A promotional price must be lower than the regular price. The promotion stops at the end date.',
                    )}
                  </p>
                </details>
              )}
            </article>
          );
        })}
      </div>
      <h2>
        {t(
          'Futur abonnement à toute l’Academy',
          'Future subscription to all of Academy',
        )}
      </h2>
      <p>
        {t(
          'Préparez un prix et une durée pour chaque formule. L’abonnement donnera accès à tous les contenus Academy pendant la période souscrite. Son lancement reste désactivé. Ces formules ne sont pas affichées sur la vitrine.',
          'Prepare a price and duration for each plan. The subscription will grant access to all Academy content for the purchased period. Launch remains disabled. These plans are not shown publicly.',
        )}
      </p>
      <div className="adm-pricing-grid">
        {config.subscription.plans.map((plan, index) => (
          <article key={plan.id}>
            {(['fr', 'en'] as const).map((lang) => (
              <label key={lang}>
                Nom {lang.toUpperCase()}
                <input
                  maxLength={120}
                  value={plan.name[lang]}
                  onChange={(e) =>
                    update((d) => {
                      d.subscription.plans[index].name[lang] = e.target.value;
                    })
                  }
                />
              </label>
            ))}
            {number(
              t('Durée en jours', 'Duration in days'),
              plan.durationDays,
              (n) =>
                update((d) => {
                  d.subscription.plans[index].durationDays = n;
                }),
              false,
              1095,
            )}
            {number(
              t(
                'Prix total de la période (GNF)',
                'Total price for the period (GNF)',
              ),
              plan.price,
              (n) =>
                update((d) => {
                  d.subscription.plans[index].price = n;
                }),
            )}
            <span>
              {t(
                'À venir · tout le catalogue',
                'Coming later · entire catalogue',
              )}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
