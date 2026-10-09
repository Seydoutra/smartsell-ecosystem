export type Locale = 'fr' | 'en';
export type VerticalId = 'agency' | 'academy' | 'media' | 'studio' | 'labs';
export interface Vertical {
  id: VerticalId;
  name: string;
  verb: string;
  number: string;
  headline: string;
  description: string;
  focus: readonly string[];
  journey: string;
  theme: 'light' | 'dark' | 'purple';
}
export interface SearchEntry {
  title: string;
  summary: string;
  url: string;
  type: string;
}
