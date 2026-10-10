/*
 * Photographies d'ambiance sous licence Unsplash (usage libre, attribution
 * conservée ici par courtoisie). Elles illustrent les métiers et les publics de
 * Smartsell ; elles ne représentent ni l'équipe, ni des clients réels.
 */
export interface Photo {
  id: string;
  alt: string;
  credit: string;
  ratio: 'landscape' | 'portrait';
}

const photo = (
  id: string,
  alt: string,
  credit: string,
  ratio: Photo['ratio'] = 'landscape',
): Photo => ({ id, alt, credit, ratio });

export const photos = {
  teamSofa: photo(
    'photo-1655720355810-fcdfd7a742b5',
    'Deux personnes échangent autour d’un projet, assises sur un canapé coloré',
    'Iwaria Inc.',
  ),
  teamLaptop: photo(
    'photo-1655720357872-ce227e4164ba',
    'Une équipe regarde ensemble un écran d’ordinateur portable',
    'Iwaria Inc.',
  ),
  meeting: photo(
    'photo-1573164574572-cb89e39749b4',
    'Une réunion de travail autour d’une grande table avec des ordinateurs',
    'Christina @ wocintechchat.com',
  ),
  phoneYellow: photo(
    'photo-1739271933163-8dcc7c8e8a3e',
    'Une femme sourit en consultant son téléphone',
    'Ninthgrid',
  ),
  phonePink: photo(
    'photo-1680879275304-bbe20f7e28fb',
    'Une femme tient son téléphone devant un fond rose',
    'Ahmed Nasiru',
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
  photographer: photo(
    'photo-1567531708788-4c44105d00ff',
    'Un photographe cadre une prise de vue',
    'Joshua Hanson',
  ),
  cameraClose: photo(
    'photo-1596923322832-ada855ab1a61',
    'Un photographe face à l’objectif, appareil en main',
    'Cinescope Creative',
    'portrait',
  ),
  cameraStreet: photo(
    'photo-1618142134777-233c1c07d32c',
    'Un photographe en extérieur, l’œil dans le viseur',
    'Langa Hlatshwayo',
    'portrait',
  ),
  videoField: photo(
    'photo-1789577798548-4056c5451e1f',
    'Un vidéaste filme avec une caméra professionnelle',
    'Kabelo Collen Molokwe',
  ),
  videoGimbal: photo(
    'photo-1579741189687-371b587a63ea',
    'Un créateur règle sa caméra sur stabilisateur',
    'Miguel Davis',
  ),
  podcastWhite: photo(
    'photo-1581368135153-a506cf13b1e1',
    'Un animateur enregistre un podcast au micro',
    'Kit',
  ),
  podcastLaptop: photo(
    'photo-1593697821094-53ed19153f21',
    'Un créateur enregistre du son devant son ordinateur',
    'Soundtrap',
  ),
  podcastNeon: photo(
    'photo-1668536987155-67811990a4a4',
    'Un studio d’enregistrement éclairé de lumières colorées',
    'Luther Yonel',
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
  portraitPro: photo(
    'photo-1573496527892-904f897eb744',
    'Une professionnelle sourit dans un bureau lumineux',
    'Christina @ wocintechchat.com',
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
  learnerFocus: photo(
    'photo-1716654718430-c7f54c3125c8',
    'Une femme concentrée travaille sur son ordinateur',
    'Makmot Robin',
  ),
  learnerDesk: photo(
    'photo-1675250719891-37d4747c9e3d',
    'Une femme travaille sur son ordinateur portable',
    'Akinyemi Gbadamosi',
  ),
  founder: photo(
    'photo-1614023342667-6f060e9d1e04',
    'Un entrepreneur à lunettes, en chemise noire',
    'Olawale Munna',
  ),
  manager: photo(
    'photo-1764169689207-e23fb66e1fcf',
    'Un dirigeant en polo bleu, bras croisés',
    'Rewired Digital',
    'portrait',
  ),
  partners: photo(
    'photo-1621060344848-262c81b806a2',
    'Deux associés en costume marchent côte à côte',
    'Khalid Boutchich',
    'portrait',
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export function photoUrl(p: Photo, width = 1200): string {
  return `https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=${width}&q=75`;
}

export const photoCredits = [
  ...new Set(Object.values(photos).map((p) => p.credit)),
];
