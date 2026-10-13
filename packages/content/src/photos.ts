/*
 * Photographies d'ambiance : Envato Elements (licence « Site web Smartsell »,
 * fichiers optimisés dans apps/main/public/media) et Unsplash (licence libre,
 * attribution conservée par courtoisie). Elles illustrent les métiers et les
 * publics de Smartsell ; elles ne représentent ni l'équipe, ni des clients.
 */
import { withBasePath, t } from '@smartsell/routing';
export interface Photo {
  id: string;
  alt: string;
  credit: string;
  ratio: 'landscape' | 'portrait';
  /** Fichier local optimisé (Envato Elements), servi depuis /media. */
  file?: string;
}

export const local = (
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
    t(
      'Deux créatifs travaillent ensemble sur un projet, penchés sur une table',
      'Two creatives work together on a project, leaning over a table',
    ),
  ),
  teamLaptop: local(
    'team-workspace',
    t(
      'Une équipe collabore dans un espace de travail lumineux',
      'A team collaborates in a bright workspace',
    ),
  ),
  meeting: local(
    'team-table',
    t(
      'Une équipe sourit autour d’une table de travail',
      'A team smiles around a work table',
    ),
  ),
  phoneYellow: local(
    'social-hearts',
    t(
      'Une jeune femme sourit à son téléphone, entourée de réactions',
      'A young woman smiles at her phone, surrounded by reactions',
    ),
  ),
  phonePink: local(
    'social-selfie',
    t(
      'Une jeune femme en pull rouge prend un selfie',
      'A young woman in a red sweater takes a selfie',
    ),
  ),
  phoneShop: photo(
    'photo-1687422808424-4a8e78fa6ae8',
    t(
      'Une commerçante filme sa boutique avec son téléphone',
      'A shop owner films her shop with her phone',
    ),
    'Ali Mkumbwa',
  ),
  phoneDesk: photo(
    'photo-1758876202167-f81c995c3fdc',
    t(
      'Une jeune femme au téléphone à son bureau',
      'A young woman on the phone at her desk',
    ),
    'Vitaly Gariev',
  ),
  photographer: local(
    'prod-street',
    t(
      'Un vidéaste installe sa caméra en pleine rue',
      'A videographer sets up his camera in the street',
    ),
  ),
  cameraClose: local(
    'prod-lens',
    t(
      'Une cadreuse règle l’objectif d’une caméra professionnelle',
      'A camerawoman adjusts the lens of a professional camera',
    ),
  ),
  cameraStreet: photo(
    'photo-1618142134777-233c1c07d32c',
    t(
      'Un photographe en extérieur, l’œil dans le viseur',
      'A photographer outdoors, eye to the viewfinder',
    ),
    'Langa Hlatshwayo',
    'portrait',
  ),
  videoField: local(
    'prod-shoot',
    t(
      'Un tournage vidéo en extérieur, entre l’équipe et les artistes',
      'An outdoor video shoot, between the crew and the artists',
    ),
  ),
  videoGimbal: photo(
    'photo-1579741189687-371b587a63ea',
    t(
      'Un créateur règle sa caméra sur stabilisateur',
      'A creator adjusts his camera on a gimbal',
    ),
    'Miguel Davis',
  ),
  podcastWhite: local(
    'podcast-duo',
    t(
      'Deux animateurs enregistrent un podcast autour d’une table',
      'Two hosts record a podcast around a table',
    ),
  ),
  podcastLaptop: photo(
    'photo-1593697821094-53ed19153f21',
    t(
      'Un créateur enregistre du son devant son ordinateur',
      'A creator records audio in front of his computer',
    ),
    'Soundtrap',
  ),
  podcastNeon: local(
    'podcast-studio',
    t(
      'Une émission enregistrée dans un studio de podcast',
      'A show recorded in a podcast studio',
    ),
  ),
  portraitYellow: photo(
    'photo-1606416132922-22ab37c1231e',
    t(
      'Une femme en veste jaune rit, face à l’objectif',
      'A woman in a yellow jacket laughs, facing the camera',
    ),
    'Tahiti Spears',
  ),
  portraitSmile: photo(
    'photo-1527201987695-67c06571957e',
    t(
      'Portrait d’une femme souriante, foulard rouge',
      'Portrait of a smiling woman with a red headscarf',
    ),
    'Jessica Felicio',
    'portrait',
  ),
  portraitGold: photo(
    'photo-1669040084821-097235fe53ff',
    t(
      'Portrait en studio d’une femme aux boucles d’oreilles dorées',
      'Studio portrait of a woman with gold earrings',
    ),
    'William Boateng',
    'portrait',
  ),
  portraitTurban: photo(
    'photo-1662893965003-31ae7064ae9a',
    t(
      'Portrait d’une femme au turban rouge et au maquillage rose',
      'Portrait of a woman with a red turban and pink make-up',
    ),
    'Eyitayo Adekoya',
    'portrait',
  ),
  portraitPrint: photo(
    'photo-1784160053632-6eddd51bda26',
    t(
      'Une femme souriante dans une robe aux motifs éclatants',
      'A smiling woman in a brightly patterned dress',
    ),
    'McFollis',
    'portrait',
  ),
  portraitWall: photo(
    'photo-1683595350111-51fde6bdbcff',
    t(
      'Un homme pose devant un mur aux motifs colorés',
      'A man poses in front of a colourful patterned wall',
    ),
    'R.D. Smith',
  ),
  portraitPro: local(
    'portrait-woman',
    t(
      'Portrait d’une dirigeante souriante, bras croisés',
      'Portrait of a smiling executive, arms crossed',
    ),
    'portrait',
  ),
  portraitStand: photo(
    'photo-1573497160825-0d94a2724d40',
    t(
      'Une femme debout, souriante, en tenue sombre',
      'A smiling woman standing in dark clothing',
    ),
    'Christina @ wocintechchat.com',
    'portrait',
  ),
  creator: photo(
    'photo-1552493450-2b5ce80ed13f',
    t(
      'Un jeune créateur en casquette pose avec assurance',
      'A young creator in a cap poses confidently',
    ),
    'Joshua Oluwagbemiga',
  ),
  learner: photo(
    'photo-1694175271713-a6e2cc378980',
    t(
      'Un étudiant tient son ordinateur portable',
      'A student holds his laptop',
    ),
    'Seth Ebenezer Tetteh',
    'portrait',
  ),
  learnerFocus: local(
    'academy-teacher',
    t(
      'Un formateur accompagne ses apprenants sur ordinateur',
      'A trainer supports learners on their computers',
    ),
  ),
  learnerDesk: local(
    'academy-class',
    t(
      'Un formateur aide des apprenants en classe',
      'A trainer helps learners in class',
    ),
  ),
  founder: local(
    'founder-desk',
    t(
      'Un entrepreneur travaille à son bureau, dans un atelier aux murs de briques',
      'An entrepreneur works at his desk in a brick-walled studio',
    ),
  ),
  manager: local(
    'portrait-man',
    t(
      'Portrait d’un jeune dirigeant dans un bureau moderne',
      'Portrait of a young executive in a modern office',
    ),
    'portrait',
  ),
  partners: photo(
    'photo-1621060344848-262c81b806a2',
    t(
      'Deux associés en costume marchent côte à côte',
      'Two partners in suits walk side by side',
    ),
    'Khalid Boutchich',
    'portrait',
  ),
  agencyDesigner: local(
    'agency-designer',
    t(
      'Une graphiste dessine sur sa tablette graphique, à son bureau',
      'A graphic designer draws on her tablet at her desk',
    ),
  ),
  agencyLogo: local(
    'agency-logo',
    t(
      'Une designer crée un logo sur son écran et sa tablette',
      'A designer creates a logo on her screen and tablet',
    ),
  ),
  agencyTablet: local(
    'agency-tablet',
    t(
      'Un graphiste travaille sur son ordinateur et sa tablette graphique',
      'A graphic designer works on his computer and drawing tablet',
    ),
  ),
  agencySticky: local(
    'agency-sticky',
    t(
      'Une créative organise ses idées avec des notes adhésives sur une vitre',
      'A creative organises her ideas with sticky notes on a glass wall',
    ),
  ),
  agencyGlass: local(
    'agency-glass',
    t(
      'Une équipe planifie un projet sur un tableau en verre',
      'A team plans a project on a glass board',
    ),
  ),
  mediaReporter: local(
    'media-reporter',
    t(
      'Un journaliste en costume, micro à la main, en reportage en ville',
      'A reporter in a suit, microphone in hand, on assignment in the city',
    ),
    'portrait',
  ),
  mediaInterview: local(
    'media-interview',
    t(
      'Une journaliste interviewe une personne dans la rue',
      'A journalist interviews someone in the street',
    ),
  ),
  mediaPresenter: local(
    'media-presenter',
    t(
      'Une présentatrice souriante parle au micro',
      'A smiling presenter speaks into a microphone',
    ),
  ),
  mediaReader: local(
    'media-reader',
    t(
      'Un homme sourit en lisant sur sa tablette, un café à la main',
      'A man smiles while reading on his tablet, coffee in hand',
    ),
  ),
  studioPink: local(
    'studio-pink',
    t(
      'Une séance photo sur fond rose, entre boîtes à lumière et réflecteurs',
      'A photo shoot on a pink backdrop, between softboxes and reflectors',
    ),
  ),
  studioWhite: local(
    'studio-white',
    t(
      'Une modèle pose dans un studio photo blanc, éclairé par des projecteurs',
      'A model poses in a white photo studio lit by spotlights',
    ),
    'portrait',
  ),
  labsNight: local(
    'labs-night',
    t(
      'Un développeur écrit du code le soir, devant plusieurs écrans',
      'A developer writes code in the evening, in front of several screens',
    ),
  ),
  labsCoder: local(
    'labs-coder',
    t(
      'Un développeur concentré travaille sur plusieurs écrans de code',
      'A focused developer works across several screens of code',
    ),
  ),
  academyRoom: local(
    'academy-room',
    t(
      'Des apprenantes suivent une présentation en salle de formation',
      'Learners follow a presentation in a training room',
    ),
  ),
  academyHome: local(
    'academy-home',
    t(
      'Une apprenante révise chez elle, entre carnet et ordinateur',
      'A learner studies at home, between notebook and laptop',
    ),
  ),
  socialNight: local(
    'social-night',
    t(
      'Une jeune femme sourit en consultant son téléphone, le soir sur un toit',
      'A young woman smiles at her phone on a rooftop in the evening',
    ),
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
export type VideoClip = { readonly src: string; readonly poster: string };
/** Extraits des films réalisés par Smartsell (dossier media/clips). */
export const clip = (name: string): VideoClip => ({
  src: `clips/${name}`,
  poster: `clips/${name}`,
});
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
