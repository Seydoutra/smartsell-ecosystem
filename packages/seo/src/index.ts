const t = (fr: string, en: string) =>
  process.env.NEXT_PUBLIC_LOCALE === 'en' ? en : fr;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://smartsell-ecosystem.contact-smartsell.chatgpt.site';
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === 'true';
export const title = t(
  'Smartsell — Agence de communication & marketing digital à Conakry',
  'Smartsell — Communication & digital marketing agency in Conakry',
);
export const description = t(
  'Stratégie de marque, réseaux sociaux, publicité digitale, production, web et formation : Smartsell fait parler votre marque, depuis Conakry.',
  'Brand strategy, social media, digital advertising, production, web and training: Smartsell gets your brand talked about, from Conakry.',
);
export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
