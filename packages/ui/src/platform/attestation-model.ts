import { locale, routingConfig, urlFor } from '@smartsell/routing';

export type Attestation = {
  id: string;
  learner_name: string;
  course_title: Record<string, string>;
  issued_at: string;
  revoked_at?: string | null;
  status?: 'valid' | 'revoked';
};
export function attestationReference(value: string): string | null {
  const id = value.trim().replace(/^SSA-/i, '');
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id,
  )
    ? id.toLowerCase()
    : null;
}
export function attestationUrl(id: string) {
  const reference = attestationReference(id);
  if (!reference) throw new Error('Invalid attestation reference');
  return `${new URL(urlFor('academy', locale, 'verify', routingConfig), process.env.NEXT_PUBLIC_SITE_URL || 'https://seydoutra.github.io').href}?id=${reference}`;
}
export function attestationTitle(record: Attestation) {
  return (
    record.course_title[locale] ||
    record.course_title.fr ||
    record.course_title.en ||
    'Smartsell Academy'
  );
}
export async function attestationQr(id: string) {
  const QRCode = await import('qrcode');
  return QRCode.toDataURL(attestationUrl(id), {
    width: 400,
    margin: 4,
    errorCorrectionLevel: 'M',
    color: { dark: '#21182eff', light: '#ffffffff' },
  });
}
