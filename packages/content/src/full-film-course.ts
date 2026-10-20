import type { Course } from './academy';
import { t } from '@smartsell/routing';
import outline from './film-course-outline.json';

// Public outline only. The Word manuscript, full lessons and answer keys remain private.
export const fullFilmCourse: Course = {
  slug: outline.slug,
  full: true,
  enrollment: 'free',
  title: t('Faire un court-métrage avec l’IA', 'Create an AI short film'),
  category: t('Cinéma & IA', 'Cinema & AI'),
  track: t('IA créative', 'Creative AI'),
  level: t(
    'Niveau 2 · bases d’identité visuelle requises',
    'Level 2 · visual identity foundations required',
  ),
  format: t(
    '11 modules · environ 12 h 30 · à votre rythme',
    '11 modules · about 12.5 hours · self paced',
  ),
  goal: t(
    'Du scénario à la livraison : un parcours complet avec 120 questions, des prompts et un projet de court-métrage.',
    'From screenplay to delivery: a complete French-language course with 120 questions, prompts and a short film project.',
  ),
  why: t(
    'Une méthode de production complète pour maîtriser le personnage, les décors, la lumière et le montage.',
    'A complete production method for character, setting, light and editing continuity.',
  ),
  project: t(
    'Réaliser un film de 30 secondes en huit plans et préparer son pack de production pour une relecture par un pair.',
    'Create a 30-second, eight-shot film and prepare its production pack for peer review.',
  ),
  program: outline.titles,
  outcomes: [
    t(
      'Attestation de participation vérifiable par QR code après validation du parcours',
      'QR-verifiable participation attestation after course completion',
    ),
    t(
      'Quiz des modules et examen final : 14/20 minimum',
      'Module quizzes and final exam: at least 14/20',
    ),
    t(
      'Carnet de production personnel synchronisé',
      'Personal synced production notebook',
    ),
    t('Cours et prompts en français', 'French-language lessons and prompts'),
  ],
  photo: {
    id: 'film-course-mariama',
    asset: '/media/film-course-mariama.png',
    alt: t(
      'Illustration IA : Mariama, personnage fictif du film pédagogique Le Virage, dans sa cour à Conakry au petit matin',
      'AI illustration: Mariama, the fictional character in the educational film Le Virage, in her courtyard at dawn',
    ),
    credit: 'Smartsell · illustration générée par IA',
    ratio: 'landscape',
  },
  lessons: outline.titles.map((title) => ({
    title,
    copy: '',
    exercise: '',
    question: '',
    options: [],
    answer: 0,
  })),
};
