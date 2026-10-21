'use client';
import { useEffect, useState } from 'react';
import {
  academyPricing as config,
  coursePrice,
  formatGNF,
} from '@smartsell/content/pricing';
import { locale, t } from '@smartsell/routing';
export function ModulePrice({ slug }: { slug: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  const row = config.courses.find((c) => c.slug === slug);
  const price = coursePrice(config, slug, now ?? Number.NEGATIVE_INFINITY);
  const promotion = !!row && price < row.price;
  return (
    <span className="academy-module-price">
      {promotion && <s>{formatGNF(row.price, locale)}</s>}
      <strong>
        {price === 0 ? t('Gratuit', 'Free') : formatGNF(price, locale)}
      </strong>
      {promotion && <small>{t('Promotion', 'Special offer')}</small>}
    </span>
  );
}
export function CoursePriceNotice({
  slug,
  full,
}: {
  slug: string;
  full?: boolean;
}) {
  return (
    <aside className="academy-price-notice">
      <ModulePrice slug={slug} />
      <p>
        {full
          ? t(
              'Accès gratuit à toute la formation. Votre attestation de participation est incluse après validation du parcours complet.',
              'Free access to the entire course. Your participation attestation is included after completing the full course.',
            )
          : t(
              'Ce module de formation se découvre à votre rythme. Les leçons disponibles sont actuellement gratuites. Les parcours de découverte ne délivrent pas d’attestation.',
              'Explore this training module at your own pace. Available lessons are currently free. Discovery courses do not award attestations.',
            )}
      </p>
    </aside>
  );
}
