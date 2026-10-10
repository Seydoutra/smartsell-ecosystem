export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://smartsell-ecosystem.contact-smartsell.chatgpt.site';
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === 'true';
export const title =
  'Smartsell — Agence de communication & marketing digital à Conakry';
export const description =
  'Stratégie de marque, réseaux sociaux, publicité digitale, production, web et formation : Smartsell fait parler votre marque, depuis Conakry.';
export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
