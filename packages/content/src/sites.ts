import { locale } from '@smartsell/routing';
import * as fr from './sites.fr';
import * as en from './sites.en';
// Le registre des sites existe en français et en anglais ; le build choisit.
const source = locale === 'en' ? en : fr;
export type { Block, Course, SitePageData } from './sites.fr';
export const courses = source.courses;
export const agencyServices = source.agencyServices;
export const cases = source.cases;
export const articles = source.articles;
export const spaces = source.spaces;
export const packs = source.packs;
export const siteMenus = source.siteMenus;
export const getSitePages = source.getSitePages;
