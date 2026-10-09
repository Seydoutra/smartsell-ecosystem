export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://smartsell-ecosystem.contact-smartsell.chatgpt.site';
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === 'true';
export const title = 'Smartsell — Un écosystème. Cinq façons d’avancer.';
export const description =
  'Créer, apprendre, comprendre, produire, innover. Découvrez Smartsell, un écosystème digital et créatif depuis Conakry, en Guinée.';
export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
