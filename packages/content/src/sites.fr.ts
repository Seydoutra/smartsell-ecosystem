import { applyPublished } from './publishing';
import type { VerticalId } from '@smartsell/types';
export type Block = { title: string; copy: string; items?: string[] };
export type SitePageData = {
  path: string;
  title: string;
  intro: string;
  kind?: string;
  ref?: string;
  blocks?: Block[];
};
export type { Course } from './academy';
import { courses } from './academy';
import { brands, films } from './portfolio';
export { courses };
export const agencyServices = [
  [
    'strategie',
    'Stratégie de marque',
    'Clarifier votre public, votre positionnement et votre proposition de valeur.',
    'Entretiens de cadrage|Carte des publics|Plateforme de marque',
  ],
  [
    'branding',
    'Identité & branding',
    'Créer un langage visuel que l’on reconnaît, du premier contact au quotidien.',
    'Direction artistique|Identité visuelle|Guide de marque',
  ],
  [
    'marketing',
    'Marketing digital',
    'Relier les canaux à un objectif et organiser la mesure.',
    'Audit des canaux|Plan de campagne|Cadre de suivi',
  ],
  [
    'social-media',
    'Social media',
    'Construire une présence éditoriale cohérente et une conversation utile.',
    'Ligne éditoriale|Calendrier|Formats de publication',
  ],
  [
    'performance',
    'Campagnes & performance',
    'Préparer des campagnes ciblées, des variantes et des critères de décision.',
    'Brief de campagne|Créations publicitaires|Plan de mesure',
  ],
  [
    'web-design',
    'Web design',
    'Donner à votre site une composition claire et une identité forte.',
    'Architecture de pages|Maquettes responsive|Prototype',
  ],
  [
    'web-development',
    'Développement web',
    'Transformer les parcours validés en pages et fonctionnalités utilisables.',
    'Intégration|Recette fonctionnelle|Documentation',
  ],
  [
    'applications',
    'Applications',
    'Concevoir un outil adapté aux tâches de votre équipe ou de votre public.',
    'Cadrage fonctionnel|Parcours|Version testable',
  ],
  [
    'product-design',
    'Product design',
    'Définir un produit autour d’un usage, puis vérifier ses hypothèses.',
    'Priorisation|Prototype|Plan de tests',
  ],
  [
    'ui-ux',
    'UI & UX',
    'Rendre chaque étape compréhensible et donner de la cohérence aux interfaces.',
    'Recherche de besoins|Parcours|Composants',
  ],
  [
    'video',
    'Film & vidéo',
    'Raconter une idée avec une intention, un rythme et des images.',
    'Synopsis|Préparation du tournage|Montage',
  ],
  [
    'photographie',
    'Photographie',
    'Composer une série d’images pour une marque, un produit ou une histoire.',
    'Moodboard|Liste de prises de vue|Sélection',
  ],
  [
    'contenus',
    'Création de contenus',
    'Organiser les idées et les décliner pour les bons supports.',
    'Angle éditorial|Textes|Kit de formats',
  ],
  [
    'ia-automatisation',
    'IA & automatisation',
    'Identifier les tâches répétitives et concevoir un parcours avec contrôle humain.',
    'Cartographie|Prototype|Règles de validation',
  ],
  [
    'crm',
    'CRM & opérations',
    'Relier le suivi des contacts au travail quotidien des équipes.',
    'Carte du processus|Structure de suivi|Accompagnement',
  ],
  [
    'croissance',
    'Business growth',
    'Aligner l’offre, la communication et le parcours commercial.',
    'Diagnostic|Priorités|Plan d’action',
  ],
].map(([slug, title, copy, items]) => ({
  slug,
  title,
  copy,
  items: items.split('|'),
}));
export const cases = [
  {
    slug: 'kalo',
    title: 'Kalo',
    category: 'Identité',
    tagline: 'Une librairie qui ouvre le champ.',
    challenge:
      'Une librairie indépendante fictive souhaite relier ses lectures, ses ateliers et ses rencontres.',
    direction:
      'Une grille modulaire, un violet profond et des repères de lecture composent une identité qui passe de l’affiche à l’écran.',
    deliverables: [
      'Plateforme de marque',
      'Système typographique',
      'Affiches & page de lancement',
    ],
    mark: 'K',
  },
  {
    slug: 'noura',
    title: 'Noura',
    category: 'Web',
    tagline: 'Le geste avant le discours.',
    challenge:
      'Une marque artisanale fictive a besoin d’expliquer son savoir-faire et de présenter ses collections.',
    direction:
      'Un parcours centré sur les matières, les gestes et les détails, avec une fiche claire pour chaque objet.',
    deliverables: [
      'Architecture du site',
      'Direction artistique',
      'Prototype mobile',
    ],
    mark: 'n.',
  },
  {
    slug: 'axis',
    title: 'Axis',
    category: 'Produit',
    tagline: 'Le collectif, en mouvement.',
    challenge:
      'Un collectif sportif fictif veut rendre ses ateliers faciles à comprendre et à rejoindre.',
    direction:
      'Un calendrier simple, des fiches par activité et un parcours de sélection qui évite les informations répétées.',
    deliverables: [
      'Parcours de réservation',
      'Design system',
      'Prototype interactif',
    ],
    mark: '',
  },
  {
    slug: 'sillage',
    title: 'Sillage',
    category: 'Campagne',
    tagline: 'Une histoire qui se prolonge.',
    challenge:
      'Un événement culturel fictif cherche une campagne qui donne une place aux différentes disciplines.',
    direction:
      'Une signature commune et des variations graphiques par discipline composent une campagne déclinable.',
    deliverables: ['Concept de campagne', 'Affichage', 'Kit social media'],
    mark: 'S/',
  },
  {
    slug: 'forma',
    title: 'Forma',
    category: 'Image',
    tagline: 'Faire parler la matière.',
    challenge:
      'Un atelier de mobilier fictif veut présenter ses objets avec une série d’images cohérente.',
    direction:
      'Un plan de production associe vues d’ensemble, textures et détails de fabrication. La galerie illustre ici cette direction avec des compositions graphiques.',
    deliverables: [
      'Moodboard',
      'Plan de prises de vue',
      'Direction du catalogue',
    ],
    mark: 'F',
  },
  {
    slug: 'relay',
    title: 'Relay',
    category: 'Automatisation',
    tagline: 'Moins de friction. Plus de suite.',
    challenge:
      'Une petite équipe fictive recopie ses demandes de contact dans plusieurs outils.',
    direction:
      'Un prototype relie la demande, le classement et la préparation d’une réponse. Une validation humaine précède chaque message.',
    deliverables: [
      'Carte du workflow',
      'Prototype',
      'Documentation de reprise',
    ],
    mark: 'R',
  },
];
export const articles = [
  [
    'une-marque-est-un-systeme',
    'Design',
    'Une marque est un système, pas une affiche.',
    'Une identité prend sa force dans les détails que l’on retrouve.',
    'Une affiche peut attirer le regard. Une identité doit aussi fonctionner dans un devis, sur un écran de téléphone et dans un message. Commencez par lister ces situations avant de choisir une forme.',
    'Définissez quelques règles de typographie, de couleur et d’espace. Testez-les sur des supports très différents. Si chaque déclinaison exige de tout réinventer, le système mérite d’être simplifié.',
  ],
  [
    'brief-qui-ouvre',
    'Marketing',
    'Le brief qui ouvre des possibilités.',
    'Poser les bonnes questions avant de demander une création.',
    'Un brief utile explique le public, le problème et l’action souhaitée. La liste des formats vient ensuite. Dire « nous voulons une vidéo » décrit un support ; dire pourquoi le public doit la regarder donne une direction.',
    'Séparez les contraintes fixes des pistes à explorer. Notez aussi les informations manquantes et la personne qui validera les choix. Ce petit travail rend les échanges plus précis.',
  ],
  [
    'ia-premier-brouillon',
    'IA',
    'L’IA et le premier brouillon.',
    'Accélérer un départ tout en gardant son jugement.',
    'Un premier brouillon peut servir à comparer des angles ou à repérer ce que l’on veut éviter. Pour ce travail, utilisez des informations autorisées et demandez plusieurs propositions sous les mêmes contraintes.',
    'Relisez chaque proposition face au brief. Vérifiez les faits avant de retenir une formule. La qualité du résultat dépend aussi du travail de sélection et de révision.',
  ],
  [
    'site-mobile',
    'Tech',
    'Dessiner d’abord le parcours mobile.',
    'Voir ce qui compte quand l’espace est limité.',
    'Sur un téléphone, une page expose vite ses priorités. Le titre doit aider à comprendre le sujet, les liens à trouver la suite et les formulaires à avancer sans hésiter.',
    'Esquissez le parcours dans une seule colonne. Élargissez ensuite la composition sur ordinateur. Vérifiez les deux versions en suivant une tâche complète plutôt qu’en regardant seulement le premier écran.',
  ],
  [
    'apprendre-par-projet',
    'Création',
    'Apprendre par un projet concret.',
    'Transformer un cours en exercice que l’on peut discuter.',
    'Un projet donne une raison d’utiliser ce que l’on apprend. Un atelier peut viser une affiche, un calendrier éditorial ou un prototype plutôt qu’une succession d’outils à découvrir.',
    'Gardez le projet assez petit pour aller au bout. Faites une première version, demandez un retour précis et améliorez un point. Documenter ce changement aide à comprendre son progrès.',
  ],
  [
    'podcast-preparation',
    'Création',
    'Un podcast commence avant le micro.',
    'L’intention et la préparation comptent autant que le plateau.',
    'Écrivez la question centrale de l’épisode. Préparez quelques relances et les informations qui demandent une vérification. Un conducteur aide à garder une direction tout en laissant place à la conversation.',
    'Prévoyez aussi la suite : titre, résumé, extrait et visuel. Un épisode peut nourrir plusieurs formats si ces usages sont anticipés dès le tournage.',
  ],
  [
    'petite-entreprise-outils',
    'Business',
    'Choisir un outil pour une petite équipe.',
    'Partir du travail réel, puis comparer les fonctions.',
    'Listez les tâches qui coûtent du temps et les informations que l’équipe partage. Un outil doit résoudre un problème identifiable. Une longue liste de fonctions ne dit pas si les collègues l’utiliseront.',
    'Testez un cas quotidien avec les personnes concernées. Vérifiez la reprise des données, les responsabilités et la documentation. Une adoption progressive permet d’observer les difficultés.',
  ],
  [
    'conakry-angle-editorial',
    'Guinée',
    'Conakry comme point de départ éditorial.',
    'Un territoire peut être un angle, sans devenir une étiquette.',
    'Raconter un projet depuis Conakry, c’est décrire les personnes, les usages et les contextes qui le rendent concret. Un lieu peut éclairer une histoire, mais ne remplace pas les faits.',
    'Une démarche éditoriale commence par des questions et des sources. Cette page est un exemple de ligne éditoriale ; elle ne présente pas un reportage réalisé ni une actualité vérifiée.',
  ],
  [
    'entreprendre-petit',
    'Startups',
    'Commencer petit pour apprendre vite.',
    'Donner une forme testable à une idée.',
    'Une idée devient plus facile à discuter lorsqu’elle prend la forme d’un parcours ou d’un prototype. Choisissez une situation précise et une personne qui pourrait utiliser la solution.',
    'Fixez ce que vous voulez apprendre avant le test. Les questions, les hésitations et les erreurs observées sont souvent plus utiles qu’une réaction générale enthousiaste.',
  ],
  [
    'campagne-question',
    'Marketing',
    'Une campagne. Une question claire.',
    'Relier la mesure à une décision.',
    'Avant de lancer une campagne, écrivez la décision que vous voulez éclairer. Deux messages répondent-ils au même besoin ? Un canal permet-il de rejoindre le public envisagé ?',
    'La mesure doit rester liée à cette question. Notez la période, les conditions et les limites. Un chiffre isolé explique rarement pourquoi une personne agit.',
  ],
  [
    'design-et-contrainte',
    'Design',
    'La contrainte comme matière créative.',
    'Composer avec un format, un budget et un contexte.',
    'Une contrainte peut orienter un choix. Une affiche doit être lue à distance ; un support mobile doit garder des repères ; une identité doit pouvoir être reproduite simplement.',
    'Distinguez ce qui limite l’usage de ce qui limite seulement votre première idée. Explorer plusieurs compositions à l’intérieur du même cadre peut ouvrir des solutions inattendues.',
  ],
  [
    'donnees-avant-graphiques',
    'Tech',
    'Les données avant les graphiques.',
    'Comprendre ce que représente une ligne.',
    'Avant de créer un tableau de bord, décrivez les unités, la période et les colonnes disponibles. Un montant sans devise ou une date sans contexte peut produire une lecture trompeuse.',
    'Documentez les valeurs manquantes et les catégories. Cette préparation rend les graphiques plus faciles à expliquer et les décisions plus faciles à discuter.',
  ],
  [
    'portrait-questions',
    'Interviews',
    'Préparer un entretien qui laisse une voix.',
    'Un guide de questions pour les créateurs.',
    'Une question ouverte invite la personne à décrire un geste, une décision ou une difficulté. « Comment avez-vous fait ce choix ? » peut ouvrir davantage qu’une demande d’avis général.',
    'Ce texte est un guide d’entretien, pas une interview réalisée. Préparez des relances, vérifiez les citations et précisez à votre interlocuteur les formats dans lesquels sa parole sera utilisée.',
  ],
  [
    'afrique-contextes',
    'Afrique',
    'Parler de contextes, au pluriel.',
    'Donner aux histoires la précision qu’elles méritent.',
    'Un projet prend forme dans une ville, une équipe et un usage particulier. Décrire ces éléments évite de réduire des situations différentes à un récit unique.',
    'Pour chaque histoire, demandez où les faits ont été observés et quelles personnes peuvent les expliquer. Cette précision donne de la portée au récit sans lui faire dire plus qu’il ne sait.',
  ],
  [
    'portfolio-demarche',
    'Création',
    'Un portfolio peut montrer la démarche.',
    'Expliquer les choix autant que le résultat.',
    'Une image finale ne raconte pas toujours le problème de départ. Présentez le contexte, les contraintes et les décisions qui ont orienté votre travail.',
    'Distinguez clairement les commandes réalisées et les concepts personnels. Un concept peut démontrer une capacité ; il gagne à être décrit pour ce qu’il est.',
  ],
  [
    'automatisation-humaine',
    'IA',
    'L’automatisation et le point de contrôle.',
    'Décider où une personne doit intervenir.',
    'Cartographiez les étapes d’une tâche répétitive. Repérez les informations nécessaires et les situations qui demandent un jugement. Une automatisation peut préparer un travail avant de le transmettre.',
    'Définissez la personne responsable, le point de validation et la manière de corriger une erreur. Un système utile doit aussi rendre ses limites visibles.',
  ],
  [
    'calendrier-realiste',
    'Business',
    'Un calendrier qui laisse de la place.',
    'Préparer le travail sans effacer les imprévus.',
    'Un planning utile inclut les validations et les échanges, pas seulement la production. Notez qui décide et quelles informations sont attendues à chaque étape.',
    'Prévoyez les moments de reprise. Un livrable qui arrive trop tard pour être discuté peut déplacer toute la suite du projet. Le calendrier est aussi un outil de conversation.',
  ],
  [
    'transmettre-outil',
    'Tech',
    'Transmettre un outil, transmettre sa maîtrise.',
    'La documentation fait partie de la livraison.',
    'Un outil doit pouvoir être compris par les personnes qui l’utiliseront et le feront évoluer. La documentation peut commencer par quelques tâches quotidiennes et des exemples de correction.',
    'Ajoutez les contacts responsables, les limites connues et les décisions de configuration. Une démonstration suivie d’une pratique aide à vérifier la compréhension.',
  ],
  [
    'mouvement-utile',
    'Opinions',
    'Le mouvement doit servir une idée.',
    'Une animation réussie sait aussi s’effacer.',
    'Une transition peut relier deux états ou attirer l’attention sur un changement. Si tout bouge en même temps, la lecture perd ses repères.',
    'Choisissez un mouvement principal et gardez les interactions courtes. Prévoir une version à mouvement réduit fait partie du dessin de l’expérience, pas d’une correction tardive.',
  ],
  [
    'creer-ensemble',
    'Opinions',
    'Créer ensemble demande un langage commun.',
    'Clarifier les mots avant de multiplier les livrables.',
    'Le mot « moderne » peut désigner une typographie, un parcours ou une ambiance. Demandez des exemples et expliquez ce que chaque choix doit permettre au visiteur.',
    'Un vocabulaire partagé rend les retours plus utiles. Parlez de lisibilité, de hiérarchie, de rythme et d’action attendue plutôt que de demander seulement si une page plaît.',
  ],
].map(([slug, category, title, summary, first, second], i) => ({
  slug,
  category,
  title,
  summary,
  paragraphs: [first, second],
  date: '2026-10-10',
  minutes: 2,
  number: String(i + 1).padStart(2, '0'),
}));
export const spaces = [
  {
    slug: 'podcast',
    title: 'Studio podcast',
    copy: 'Un plateau feutré pour vos émissions, interviews et vidéocasts, filmés en multicaméra.',
    equipment: [
      'Micros broadcast',
      'Captation 3 caméras',
      'Éclairage studio',
      'Retour casque',
    ],
    use: 'Podcast · Interview · Vidéocast',
    symbol: '',
  },
  {
    slug: 'photo',
    title: 'Studio photo',
    copy: 'Un studio équipé pour les portraits, la mode et les produits, avec fonds interchangeables.',
    equipment: [
      'Fonds blanc, noir, rouge et vert',
      'Flashs et boîtes à lumière',
      'Table produit',
      'Coin maquillage',
    ],
    use: 'Portrait · Mode · Produit',
    symbol: '',
  },
  {
    slug: 'video',
    title: 'Plateau vidéo',
    copy: 'Un cadre modulable pour les prises de parole, les films de marque et les contenus courts.',
    equipment: [
      'Cadre de tournage',
      'Éclairage continu',
      'Retour image',
      'Prompteur',
    ],
    use: 'Corporate · Création · Reels',
    symbol: '',
  },
];
export const packs = [
  {
    slug: 'podcast-brut',
    family: 'podcast',
    title: 'Podcast brut',
    space: 'podcast',
    duration: 1,
    best: false,
    copy: 'Enregistrement brut, fichiers prêts à monter.',
    includes: [
      'Studio entièrement équipé',
      'Opérateur de studio',
      'Captation multicaméra (3 caméras)',
    ],
    deliverable: 'Les fichiers audio et vidéo bruts de votre épisode.',
  },
  {
    slug: 'podcast-montage',
    family: 'podcast',
    title: 'Podcast + montage',
    space: 'podcast',
    duration: 1,
    best: true,
    copy: 'La formule la plus demandée : votre épisode monté, prêt à publier.',
    includes: [
      'Tout le podcast brut',
      'Montage de l’épisode',
      'Mixage audio',
      'Étalonnage colorimétrique',
    ],
    deliverable: 'Un épisode final monté, en version vidéo et audio.',
  },
  {
    slug: 'podcast-reels',
    family: 'podcast',
    title: 'Podcast + montage + Reels',
    space: 'podcast',
    duration: 1,
    best: false,
    copy: 'L’épisode monté et ses extraits verticaux pour les réseaux sociaux.',
    includes: [
      'Tout le podcast + montage',
      'Reels verticaux montés',
      'Teaser promotionnel',
      'Sous-titres dynamiques',
    ],
    deliverable: 'L’épisode final et une série de Reels prêts à publier.',
  },
  {
    slug: 'shooting-pro',
    family: 'shooting',
    title: 'Shooting professionnel',
    space: 'photo',
    duration: 1,
    best: false,
    copy: 'Une séance photo professionnelle pour une personne : portrait, CV, profil, réseaux.',
    includes: [
      'Photos retouchées',
      'Coaching pose avec le photographe',
      'Fonds blanc, noir, rouge ou vert',
      'Une vidéo Reel de la séance',
    ],
    deliverable: 'Une sélection de portraits retouchés, prêts à publier.',
  },
  {
    slug: 'shooting-mode',
    family: 'shooting',
    title: 'Shooting mode',
    space: 'photo',
    duration: 2,
    best: true,
    copy: 'Une séance complète avec plusieurs changements de tenue.',
    includes: [
      'Plusieurs tenues',
      'Coaching styliste inclus',
      'Fonds multiples',
      'Photos retouchées pro',
      'Vidéo Reel de la séance',
    ],
    deliverable: 'Une série mode retouchée et sa vidéo des coulisses.',
  },
  {
    slug: 'shooting-produits',
    family: 'shooting',
    title: 'Shooting produits',
    space: 'photo',
    duration: 2,
    best: false,
    copy: 'Photos packshot pour e-commerce, catalogues et réseaux sociaux.',
    includes: [
      'Photos packshot professionnelles',
      'Éclairage studio optimal',
      'Fond blanc ou personnalisé',
      'Retouches incluses',
      'Formats adaptés e-commerce',
    ],
    deliverable:
      'Des visuels produits retouchés ; devis selon le nombre de produits.',
  },
];
export const siteMenus: Record<VerticalId, { label: string; path: string }[]> =
  {
    agency: [
      { label: 'Portfolio', path: 'work' },
      { label: 'Expertises', path: 'services' },
      { label: 'Histoire', path: 'history' },
      { label: 'Collectif', path: 'team' },
      { label: 'Contact', path: 'contact' },
    ],
    academy: [
      { label: 'Modules', path: 'courses' },
      { label: 'Entreprises', path: 'corporate' },
      { label: 'Mon espace', path: 'dashboard' },
    ],
    media: [
      { label: 'Vidéos', path: 'videos' },
      { label: 'Articles', path: 'latest' },
      { label: 'Tech & IA', path: 'tech' },
      { label: 'Business', path: 'business' },
      { label: 'Rechercher', path: 'search' },
    ],
    studio: [
      { label: 'Podcast', path: 'podcast' },
      { label: 'Shooting', path: 'shooting' },
      { label: 'Plateaux', path: 'spaces' },
      { label: 'Formules', path: 'pricing' },
      { label: 'Réserver', path: 'booking' },
    ],
    labs: [
      { label: 'Produits', path: 'products' },
      { label: 'Recherche', path: 'research' },
      { label: 'IA & automatisation', path: 'ai' },
      { label: 'Contact', path: 'contact' },
    ],
  };
const p = (
  path: string,
  title: string,
  intro: string,
  kind = 'story',
  blocks: Block[] = [],
  ref?: string,
): SitePageData => ({ path, title, intro, kind, blocks, ref });
export function getSitePages(id: VerticalId): SitePageData[] {
  const common = [
    p(
      'privacy',
      'Vos données, vos choix.',
      'Ce que le site garde, et ce que vous choisissez de nous envoyer.',
      'story',
      [
        {
          title: 'Sur votre appareil',
          copy: 'Academy conserve uniquement vos modules et vos leçons terminées dans votre navigateur ; vous pouvez les effacer depuis Mon espace. Le choix de pause des animations est conservé pour la session de navigation.',
        },
        {
          title: 'Brief et réservations',
          copy: 'Le brief intelligent et la réservation Studios ne stockent rien sur le site : ils ouvrent WhatsApp avec votre message prêt, et c’est vous qui décidez de l’envoyer.',
        },
        {
          title: 'Hébergement & lecture',
          copy: 'Le site est hébergé sur GitHub Pages. Aucun outil de mesure ou de publicité n’est ajouté par Smartsell. Le navigateur charge les ressources du site depuis cet hébergement.',
        },
      ],
    ),
  ];
  if (id === 'agency')
    return [
      p(
        '',
        'Des marques qui\nfont le mouvement.',
        'Stratégie, identité et expériences digitales. Depuis Conakry, nous donnons une forme aux ambitions.',
        'home',
      ),
      p(
        'services',
        'Une idée. Toutes ses dimensions.',
        'De la première question à la dernière interaction.',
        'services',
      ),
      ...agencyServices.map((s) =>
        p(`services/${s.slug}`, s.title, s.copy, 'story', [
          {
            title: 'Ce que nous préparons',
            copy: 'Un accompagnement construit autour de votre contexte, de votre public et de votre objectif.',
            items: s.items,
          },
          {
            title: 'Notre manière de faire',
            copy: 'Cadrer le besoin, explorer une direction, réaliser une version testable puis transmettre. Le périmètre et les validations sont définis ensemble.',
          },
        ]),
      ),
      p(
        'work',
        'Le travail parle.',
        'Identités de marque, sites web, séances photo et films : une sélection de projets réalisés par Smartsell.',
        'work',
      ),
      ...brands.map((b) =>
        p(`work/${b.slug}`, b.name, b.summary, 'brand', [], b.slug),
      ),
      p(
        'history',
        'Une maison. Une continuité.',
        'Smartsell relie les étapes qui restent trop souvent séparées.',
        'story',
        [
          {
            title: 'L’intention',
            copy: 'Une marque a besoin d’une direction, un talent de compétences, une histoire d’un espace pour prendre forme et une équipe d’outils pour avancer.',
          },
          {
            title: 'Depuis Conakry',
            copy: 'Notre point de départ est la Guinée. Nous pensons des expériences ancrées dans les usages, capables d’ouvrir des échanges au-delà du premier projet.',
          },
          {
            title: 'Cinq univers',
            copy: 'Agency crée. Academy transmet. Media ouvre la conversation. Studios donne forme. Labs construit des outils. Chaque site a son propre parcours ; la maison relie les compétences.',
          },
        ],
      ),
      p(
        'team',
        'Des métiers qui dialoguent.',
        'Le collectif se raconte ici par ses compétences. Les profils nominatifs seront présentés après validation.',
        'story',
        [
          {
            title: 'Stratégie & relation',
            copy: 'Poser les questions, écouter le contexte, relier les décisions à l’ambition du projet.',
          },
          {
            title: 'Design & produit',
            copy: 'Composer des identités et des parcours. Faire dialoguer la forme avec les usages.',
          },
          {
            title: 'Développement & systèmes',
            copy: 'Rendre les expériences utilisables et documenter leur fonctionnement.',
          },
          {
            title: 'Image & contenus',
            copy: 'Préparer le récit, organiser la production et donner de la cohérence aux formats.',
          },
        ],
      ),
      p(
        'about',
        'L’agence, dans l’écosystème.',
        'Un partenaire de création, de stratégie et de produit.',
        'story',
        [
          {
            title: 'Créer une direction',
            copy: 'Nous pensons une marque comme un ensemble d’expériences : ce que l’on voit, ce que l’on comprend et ce que l’on peut faire.',
          },
          {
            title: 'Aller jusqu’à l’usage',
            copy: 'Un projet se construit par étapes, avec des décisions explicites et un travail de transmission.',
          },
        ],
      ),
      p(
        'careers',
        'Rejoindre la conversation.',
        'Présentez votre pratique, votre regard et le type de projet qui vous intéresse.',
        'contact',
      ),
      p(
        'contact',
        'Parlons de votre prochain mouvement.',
        'Remplissez notre brief intelligent : six étapes, et vos réponses arrivent directement sur notre WhatsApp.',
        'contact',
      ),
      ...common,
    ];
  if (id === 'academy')
    return [
      p(
        '',
        'Le savoir ouvre\nle champ.',
        'Des formations pratiques en marketing digital, design, vidéo et IA.',
        'home',
      ),
      p(
        'courses',
        'Nos modules de formation.',
        'Des formations pratiques, du fondamental à l’expert : stratégie, rédaction, design, réseaux sociaux, vidéo, IA et IA créative.',
        'courses',
      ),
      ...courses.flatMap((c) => [
        p(`courses/${c.slug}`, c.title, c.goal, 'course', [], c.slug),
        p(
          `learn/${c.slug}`,
          c.title,
          c.full
            ? 'Onze modules, 120 questions et un atelier de production. Cours en français.'
            : 'Trois leçons pratiques avec quiz. Votre progression s’affiche dans Mon espace.',
          'learn',
          [],
          c.slug,
        ),
      ]),
      p(
        'corporate',
        'Former vos équipes.',
        'Des parcours de formation pour les entreprises, les institutions et les administrations, construits à partir de vos outils et de vos objectifs.',
        'corporate',
      ),
      p(
        'dashboard',
        'Mon espace.',
        'Retrouvez vos modules, vos leçons terminées et votre progression.',
        'dashboard',
      ),
      p(
        'attestation',
        'Mon attestation de participation.',
        'Votre document Smartsell Academy et son QR code de vérification.',
        'attestation-document',
      ),
      p(
        'verify',
        'Vérifier une attestation.',
        'Consultez le registre officiel des attestations de participation Smartsell Academy.',
        'attestation-verify',
      ),
      ...common,
    ];
  if (id === 'media')
    return [
      p(
        '',
        'Smartsell Media.',
        'Vidéos, reportages et idées : la plateforme de contenus de Smartsell.',
        'home',
      ),
      p(
        'videos',
        'Nos vidéos.',
        'Clips, films de marque, publicités et mode : les productions signées Smartsell.',
        'videos',
      ),
      ...films.map((f) =>
        p(`video/${f.slug}`, f.title, f.kind, 'film', [], f.slug),
      ),
      p(
        'latest',
        'Les articles.',
        'Guides, analyses et opinions sur la tech, le business et la culture créative.',
        'articles',
      ),
      ...[
        'tech',
        'ai',
        'startups',
        'business',
        'marketing',
        'creative',
        'africa',
        'guinea',
        'opinions',
        'interviews',
      ].map((path, i) =>
        p(
          path,
          [
            'Tech',
            'Intelligence artificielle',
            'Startups',
            'Business',
            'Marketing',
            'Culture créative',
            'Afrique',
            'Guinée',
            'Opinions',
            'Entretiens',
          ][i],
          'Des repères, des méthodes et des angles à explorer.',
          'category',
          [],
          path,
        ),
      ),
      ...articles.map((a) =>
        p(`article/${a.slug}`, a.title, a.summary, 'article', [], a.slug),
      ),
      p(
        'search',
        'Trouver une idée.',
        'Rechercher dans les titres, les rubriques et les introductions.',
        'search',
      ),
      p(
        'authors/redaction',
        'La rédaction Smartsell.',
        'Les articles signés par l’équipe éditoriale de Smartsell Media.',
        'articles',
      ),
      p(
        'newsletter',
        'La suite dans votre boîte mail.',
        'Recevez nos nouvelles vidéos et nos articles.',
        'newsletter',
      ),
      ...common,
    ];
  if (id === 'studio')
    return [
      p(
        '',
        'Studio podcast & photo\nà Conakry.',
        'Des plateaux équipés pour vos podcasts, interviews, shootings et vidéos de marque.',
        'home',
      ),
      p(
        'podcast',
        'Studio podcast à Conakry.',
        'Un plateau équipé, une captation multicaméra et un opérateur : venez avec l’idée, repartez avec l’épisode.',
        'podcast',
      ),
      p(
        'shooting',
        'Studio photo à Conakry.',
        'Shooting professionnel dans notre studio équipé. Trois formules : professionnel, mode ou produits.',
        'shooting',
      ),
      p(
        'spaces',
        'Nos plateaux.',
        'Trois espaces de production, équipés et accompagnés par notre équipe technique.',
        'spaces',
      ),
      ...spaces.map((s) =>
        p(
          `spaces/${s.slug}`,
          s.title,
          s.copy,
          'space',
          [
            { title: 'Équipement', copy: s.use, items: s.equipment },
            {
              title: 'Préparer votre séance',
              copy: 'Précisez le format, le nombre de personnes, la durée et les besoins de postproduction. Notre équipe confirme la disponibilité et vous accompagne jusqu’au rendu.',
            },
          ],
          s.slug,
        ),
      ),
      p(
        'pricing',
        'Des formules claires, sans surprise.',
        'Opérateur et matériel toujours inclus. Tarifs communiqués sur demande, selon la durée et les livrables.',
        'packs',
      ),
      ...packs.map((s) =>
        p(
          `packs/${s.slug}`,
          s.title,
          s.copy,
          'pack',
          [
            {
              title: 'Inclus dans la formule',
              copy: s.deliverable,
              items: s.includes,
            },
          ],
          s.slug,
        ),
      ),
      p(
        'booking',
        'Réserver une séance.',
        'Choisissez votre formule, votre date et votre créneau : votre demande part directement sur notre WhatsApp.',
        'booking',
      ),
      p(
        'gallery',
        'Lumière. Cadre. Matière.',
        'Des images et des films réalisés par nos équipes.',
        'gallery',
      ),
      p(
        'faq',
        'Avant d’entrer en studio.',
        'Les repères pour préparer votre séance.',
        'faq',
      ),
      p(
        'contact',
        'Parlons de votre production.',
        'Décrivez votre projet : nous revenons vers vous avec une proposition.',
        'contact',
      ),
      ...common,
    ];
  return [
    p(
      '',
      'La suite\nse construit.',
      'Des problèmes réels. Des produits utiles. Le laboratoire numérique de la maison Smartsell.',
      'home',
    ),
    p(
      'products',
      'Des outils pour faire avancer le travail.',
      'Un produit existant et une vision pour les créateurs. Deux démarches, deux statuts clairement indiqués.',
      'products',
    ),
    p(
      'products/management',
      'Smartsell Management.',
      'Clients, projets, planning et finances : découvrir le produit existant.',
      'management',
      [
        {
          title: 'Réunir les opérations',
          copy: 'Le produit Management dispose de son propre site et de son propre fonctionnement. Le lien mène à cette application.',
        },
        {
          title: 'Continuer vers le produit',
          copy: 'L’accès au produit, ses comptes et ses données restent gérés dans Management.',
        },
      ],
    ),
    p(
      'products/obtura',
      'Obtura. Le travail créatif, relié.',
      'Vision produit : un Business OS pour les photographes, vidéastes et créateurs visuels.',
      'obtura',
      [
        {
          title: 'Une intention',
          copy: 'Relier les étapes d’un projet créatif, de la prise de contact à la livraison.',
        },
        {
          title: 'Les questions à explorer',
          copy: 'Comment suivre une demande ? Préparer une production ? Retrouver les informations nécessaires à chaque étape ?',
        },
        {
          title: 'Statut du projet',
          copy: 'La vision est présentée ici. Aucun lancement, tarif ni fonctionnalité disponible n’est annoncé dans cette version.',
        },
      ],
    ),
    p(
      'research',
      'Explorer pour mieux construire.',
      'Trois axes d’expérimentation, présentés comme pistes de travail.',
      'story',
      [
        {
          title: 'Les opérations des petites équipes',
          copy: 'Observer les passages entre contacts, projets et suivi afin d’identifier les informations qui se perdent.',
        },
        {
          title: 'Les métiers de la création',
          copy: 'Explorer les étapes d’une production et les outils qui pourraient soutenir leur continuité.',
        },
        {
          title: 'Les interfaces avec assistance',
          copy: 'Tester des brouillons et des parcours avec validation humaine. Aucun résultat de recherche ni benchmark n’est revendiqué ici.',
        },
      ],
    ),
    p(
      'ai',
      'Automatiser avec une intention.',
      'Partir d’une tâche. Définir les limites. Garder la maîtrise.',
      'story',
      [
        {
          title: 'Cartographier',
          copy: 'Identifier le déclencheur, les informations utiles et la personne responsable.',
        },
        {
          title: 'Prototyper',
          copy: 'Tester un parcours sur des exemples autorisés avant de le connecter à des opérations réelles.',
        },
        {
          title: 'Valider & transmettre',
          copy: 'Rendre le contrôle humain explicite, prévoir la correction et documenter le fonctionnement.',
        },
      ],
    ),
    p(
      'contact',
      'Quel problème voulez-vous résoudre ?',
      'Préparez un message pour un produit, une expérimentation ou un échange.',
      'contact',
    ),
    ...common,
  ];
}

applyPublished(agencyServices, 'agency', 'services');
applyPublished(articles, 'media', 'articles');
applyPublished(spaces, 'studio', 'spaces');
applyPublished(packs, 'studio', 'packs');
