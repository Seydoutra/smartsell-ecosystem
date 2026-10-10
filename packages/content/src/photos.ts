/*
 * Photographies d'ambiance : Envato Elements (licence « Site web Smartsell »,
 * fichiers optimisés dans apps/main/public/media) et Unsplash (licence libre,
 * attribution conservée par courtoisie). Elles illustrent les métiers et les
 * publics de Smartsell ; elles ne représentent ni l'équipe, ni des clients.
 */
import { withBasePath } from '@smartsell/routing';
export interface Photo {
  id: string;
  alt: string;
  credit: string;
  ratio: 'landscape' | 'portrait';
  /** Fichier local optimisé (Envato Elements), servi depuis /media. */
  file?: string;
}

const local = (
  file: string,
  alt: string,
  ratio: Photo['ratio'] = 'landscape',
): Photo => ({ id: file, alt, credit: 'Envato Elements', ratio, file });
const photo = (
  id: string,
  alt: string,
  credit: string,
  ratio: Photo['ratio'] = 'landscape',
): Photo => ({ id, alt, credit, ratio });

export const photos = {
  teamSofa: local(
    'team-blueprint',
    'Deux créatifs travaillent ensemble sur un projet, penchés sur une table',
  ),
  teamLaptop: local(
    'team-workspace',
    'Une équipe collabore dans un espace de travail lumineux',
  ),
  meeting: local(
    'team-table',
    'Une équipe sourit autour d’une table de travail',
  ),
  phoneYellow: local(
    'social-hearts',
    'Une jeune femme sourit à son téléphone, entourée de réactions',
  ),
  phonePink: local(
    'social-selfie',
    'Une jeune femme en pull rouge prend un selfie',
  ),
  phoneShop: photo(
    'photo-1687422808424-4a8e78fa6ae8',
    'Une commerçante filme sa boutique avec son téléphone',
    'Ali Mkumbwa',
  ),
  phoneDesk: photo(
    'photo-1758876202167-f81c995c3fdc',
    'Une jeune femme au téléphone à son bureau',
    'Vitaly Gariev',
  ),
  photographer: local(
    'prod-street',
    'Un vidéaste installe sa caméra en pleine rue',
  ),
  cameraClose: local(
    'prod-lens',
    'Une cadreuse règle l’objectif d’une caméra professionnelle',
  ),
  cameraStreet: photo(
    'photo-1618142134777-233c1c07d32c',
    'Un photographe en extérieur, l’œil dans le viseur',
    'Langa Hlatshwayo',
    'portrait',
  ),
  videoField: local(
    'prod-shoot',
    'Un tournage vidéo en extérieur, entre l’équipe et les artistes',
  ),
  videoGimbal: photo(
    'photo-1579741189687-371b587a63ea',
    'Un créateur règle sa caméra sur stabilisateur',
    'Miguel Davis',
  ),
  podcastWhite: local(
    'podcast-duo',
    'Deux animateurs enregistrent un podcast autour d’une table',
  ),
  podcastLaptop: photo(
    'photo-1593697821094-53ed19153f21',
    'Un créateur enregistre du son devant son ordinateur',
    'Soundtrap',
  ),
  podcastNeon: local(
    'podcast-studio',
    'Une émission enregistrée dans un studio de podcast',
  ),
  portraitYellow: photo(
    'photo-1606416132922-22ab37c1231e',
    'Une femme en veste jaune rit, face à l’objectif',
    'Tahiti Spears',
  ),
  portraitSmile: photo(
    'photo-1527201987695-67c06571957e',
    'Portrait d’une femme souriante, foulard rouge',
    'Jessica Felicio',
    'portrait',
  ),
  portraitGold: photo(
    'photo-1669040084821-097235fe53ff',
    'Portrait en studio d’une femme aux boucles d’oreilles dorées',
    'William Boateng',
    'portrait',
  ),
  portraitTurban: photo(
    'photo-1662893965003-31ae7064ae9a',
    'Portrait d’une femme au turban rouge et au maquillage rose',
    'Eyitayo Adekoya',
    'portrait',
  ),
  portraitPrint: photo(
    'photo-1784160053632-6eddd51bda26',
    'Une femme souriante dans une robe aux motifs éclatants',
    'McFollis',
    'portrait',
  ),
  portraitWall: photo(
    'photo-1683595350111-51fde6bdbcff',
    'Un homme pose devant un mur aux motifs colorés',
    'R.D. Smith',
  ),
  portraitPro: local(
    'portrait-woman',
    'Portrait d’une dirigeante souriante, bras croisés',
    'portrait',
  ),
  portraitStand: photo(
    'photo-1573497160825-0d94a2724d40',
    'Une femme debout, souriante, en tenue sombre',
    'Christina @ wocintechchat.com',
    'portrait',
  ),
  creator: photo(
    'photo-1552493450-2b5ce80ed13f',
    'Un jeune créateur en casquette pose avec assurance',
    'Joshua Oluwagbemiga',
  ),
  learner: photo(
    'photo-1694175271713-a6e2cc378980',
    'Un étudiant tient son ordinateur portable',
    'Seth Ebenezer Tetteh',
    'portrait',
  ),
  learnerFocus: local(
    'academy-teacher',
    'Un formateur accompagne ses apprenants sur ordinateur',
  ),
  learnerDesk: local(
    'academy-class',
    'Un formateur aide des apprenants en classe',
  ),
  founder: local(
    'founder-desk',
    'Un entrepreneur travaille à son bureau, dans un atelier aux murs de briques',
  ),
  manager: local(
    'portrait-man',
    'Portrait d’un jeune dirigeant dans un bureau moderne',
    'portrait',
  ),
  partners: photo(
    'photo-1621060344848-262c81b806a2',
    'Deux associés en costume marchent côte à côte',
    'Khalid Boutchich',
    'portrait',
  ),
  socialNight: local(
    'social-night',
    'Une jeune femme sourit en consultant son téléphone, le soir sur un toit',
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export function photoUrl(p: Photo, width = 1200): string {
  if (p.file)
    return withBasePath(`/media/${p.file}${width <= 900 ? '-sm' : ''}.jpg`);
  return `https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=${width}&q=75`;
}

/** Vidéos d'ambiance (Envato Elements), 540p, muettes et en boucle. */
export const videos = {
  team: { src: 'video-team', poster: 'team-workspace' },
  camera: { src: 'video-camera', poster: 'prod-lens' },
  podcast: { src: 'video-podcast', poster: 'podcast-studio' },
  phone: { src: 'video-phone', poster: 'social-hearts' },
} as const;
export type VideoClip = (typeof videos)[keyof typeof videos];
export function videoUrl(v: VideoClip) {
  return {
    src: withBasePath(`/media/${v.src}.mp4`),
    poster: withBasePath(`/media/${v.poster}-sm.jpg`),
  };
}

export const photoCredits = [
  ...new Set(
    Object.values(photos)
      .filter((p) => !p.file)
      .map((p) => p.credit),
  ),
];
