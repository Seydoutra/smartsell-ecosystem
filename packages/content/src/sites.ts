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
export type Course = {
  slug: string;
  title: string;
  category: string;
  level: string;
  hours: number;
  goal: string;
  project: string;
  lessons: {
    title: string;
    copy: string;
    exercise: string;
    question: string;
    options: string[];
    answer: number;
  }[];
};
const lesson = (
  title: string,
  copy: string,
  exercise: string,
  question: string,
  options: string[],
  answer = 0,
) => ({ title, copy, exercise, question, options, answer });
export const courses: Course[] = [
  {
    slug: 'marketing-digital',
    title: 'Construire sa stratégie digitale',
    category: 'Marketing',
    level: 'Débutant',
    hours: 12,
    goal: 'Passer d’une présence dispersée à un plan de communication cohérent.',
    project:
      'Un plan de campagne pour le lancement d’une boutique de quartier.',
    lessons: [
      lesson(
        'Choisir un objectif',
        'Une campagne commence par une action attendue : être découvert, obtenir un rendez-vous ou faire revenir un client. Pour notre boutique, nous choisissons une visite en magasin. Ce choix guide le message et le canal.',
        'Écrivez une phrase : « Nous voulons que [public] réalise [action] avant [échéance]. »',
        'Quel objectif est le plus précis ?',
        [
          'Obtenir des visites en boutique',
          'Être partout',
          'Avoir une belle marque',
        ],
      ),
      lesson(
        'Relier message et canal',
        'Un message utile répond à une question du public. La boutique explique ses horaires et la disponibilité de ses produits. Un calendrier organise la répétition du message sans publier la même chose chaque jour.',
        'Préparez trois publications : découverte, explication et invitation.',
        'Que doit contenir une invitation ?',
        [
          'Une action claire',
          'Tous les services de la marque',
          'Seulement un logo',
        ],
      ),
      lesson(
        'Lire et ajuster',
        'Les impressions racontent l’exposition, les réactions racontent une partie de l’intérêt et les visites racontent l’action. Reliez chaque indicateur à votre objectif avant de changer de campagne.',
        'Créez un tableau avec objectif, indicateur, résultat et prochaine décision.',
        'Pourquoi suivre un indicateur ?',
        [
          'Pour prendre une décision',
          'Pour remplir un rapport',
          'Pour garantir un résultat',
        ],
      ),
    ],
  },
  {
    slug: 'community-management',
    title: 'Animer une communauté',
    category: 'Communication',
    level: 'Débutant',
    hours: 10,
    goal: 'Définir une ligne éditoriale, organiser les échanges et modérer avec soin.',
    project: 'Une semaine éditoriale pour un collectif culturel.',
    lessons: [
      lesson(
        'Écouter avant de publier',
        'Une communauté se construit autour d’intérêts partagés. Recueillez les questions du public et distinguez information utile, conversation et promotion.',
        'Classez six questions de votre public en trois thèmes.',
        'Par quoi commencer ?',
        [
          'Les besoins du public',
          'Le nombre de publications',
          'La taille du logo',
        ],
      ),
      lesson(
        'Composer un calendrier',
        'Associez chaque publication à un thème, une intention, un format et une personne responsable. Prévoyez du temps pour répondre plutôt que de remplir uniquement le calendrier.',
        'Préparez cinq publications et deux moments de réponse.',
        'Que faut-il prévoir après publication ?',
        ['Les échanges', 'Une autre publicité immédiate', 'Aucun suivi'],
      ),
      lesson(
        'Répondre avec discernement',
        'Un commentaire critique mérite une réponse factuelle. Évitez de publier des informations personnelles. Si la situation demande un examen individuel, proposez un échange privé avec la personne compétente.',
        'Rédigez une réponse à une demande de renseignement et à une critique.',
        'Quel réflexe protège la conversation ?',
        [
          'Une réponse calme et pertinente',
          'Révéler les données du client',
          'Supprimer toute critique',
        ],
      ),
    ],
  },
  {
    slug: 'design-graphique',
    title: 'Donner forme à une identité',
    category: 'Design',
    level: 'Débutant',
    hours: 16,
    goal: 'Composer un langage visuel utilisable sur plusieurs supports.',
    project: 'Une mini-identité pour une librairie indépendante.',
    lessons: [
      lesson(
        'Hiérarchiser une composition',
        'La taille, le contraste et l’espace orientent la lecture. Sur une affiche de librairie, le titre annonce le sujet, la date précise le rendez-vous et le contact donne la suite.',
        'Composez une affiche en trois niveaux de lecture.',
        'Que sert la hiérarchie ?',
        ['La compréhension', 'Le remplissage', 'La multiplication des polices'],
      ),
      lesson(
        'Créer un système',
        'Une identité peut associer deux familles de caractères, quelques couleurs et une grille. Des règles simples rendent les supports cohérents sans les rendre identiques.',
        'Définissez une palette, deux styles de texte et une règle de marge.',
        'Qu’est-ce qu’un système visuel ?',
        [
          'Des règles réutilisables',
          'Une affiche unique',
          'Un effet à reproduire partout',
        ],
      ),
      lesson(
        'Décliner et vérifier',
        'Un visuel doit rester lisible dans son contexte. Vérifiez votre affiche à taille réduite, sur téléphone et en niveaux de gris pour repérer les éléments qui disparaissent.',
        'Déclinez votre affiche en publication carrée et bannière.',
        'Que vérifier avant la livraison ?',
        [
          'La lisibilité aux tailles réelles',
          'Seulement les couleurs',
          'Uniquement le fichier source',
        ],
      ),
    ],
  },
  {
    slug: 'ui-ux',
    title: 'Designer une expérience utile',
    category: 'Produit',
    level: 'Intermédiaire',
    hours: 18,
    goal: 'Passer d’un besoin utilisateur à un prototype de parcours.',
    project: 'Le prototype d’une inscription à un atelier.',
    lessons: [
      lesson(
        'Formuler le besoin',
        'Décrivez la personne, son contexte et l’action à accomplir. Un apprenant veut connaître le contenu, le niveau et l’horaire avant de choisir un atelier.',
        'Écrivez le parcours avant, pendant et après l’inscription.',
        'Que décrit un besoin ?',
        [
          'Une intention dans un contexte',
          'Une couleur de bouton',
          'Un style de page',
        ],
      ),
      lesson(
        'Structurer le parcours',
        'Chaque écran doit aider à avancer ou à corriger. Un formulaire demande les informations nécessaires, explique les erreurs et permet de revenir sans perdre ses choix.',
        'Dessinez trois écrans : choix, coordonnées et récapitulatif.',
        'Que faire en cas d’erreur ?',
        [
          'Expliquer comment la corriger',
          'Effacer le formulaire',
          'Masquer le bouton',
        ],
      ),
      lesson(
        'Tester une hypothèse',
        'Un test observe ce que fait une personne devant une tâche. Donnez une consigne neutre, puis notez les hésitations. Modifiez les points bloquants avant les détails décoratifs.',
        'Faites tester votre prototype et notez trois observations.',
        'Que mesure ce test ?',
        [
          'La compréhension du parcours',
          'Les goûts du designer',
          'La popularité de la marque',
        ],
      ),
    ],
  },
  {
    slug: 'web',
    title: 'Créer sa première page web',
    category: 'Web',
    level: 'Débutant',
    hours: 20,
    goal: 'Comprendre la structure d’une page et construire une présentation responsive.',
    project: 'Une page de présentation pour un projet personnel.',
    lessons: [
      lesson(
        'Structurer le contenu',
        'Une page a un titre principal, des sections et des liens qui annoncent leur destination. Avant de coder, rédigez le contenu et ordonnez les informations selon les besoins du visiteur.',
        'Rédigez un titre, une introduction et trois sections.',
        'Quel élément donne le sujet principal ?',
        ['Le titre principal', 'Une bordure', 'La couleur du fond'],
      ),
      lesson(
        'Composer pour le mobile',
        'Une composition doit s’adapter à la largeur disponible. Sur téléphone, empilez les colonnes, conservez des textes lisibles et vérifiez que les liens restent faciles à atteindre.',
        'Dessinez les versions téléphone et ordinateur de votre page.',
        'Que doit éviter le mobile ?',
        [
          'Un débordement horizontal',
          'Une lecture verticale',
          'Des liens visibles',
        ],
      ),
      lesson(
        'Vérifier le parcours',
        'Suivez chaque lien et chaque bouton. Vérifiez le titre, le contenu, les images et la navigation au clavier. Une page terminée est une page dont le parcours fonctionne.',
        'Rédigez une liste de vérifications et effectuez-les.',
        'Que teste-t-on avant publication ?',
        [
          'Le parcours réel',
          'Seulement le premier écran',
          'Uniquement les couleurs',
        ],
      ),
    ],
  },
  {
    slug: 'intelligence-artificielle',
    title: 'Pratiquer l’IA avec recul',
    category: 'IA & data',
    level: 'Débutant',
    hours: 8,
    goal: 'Utiliser un assistant pour préparer, comparer et réviser un travail.',
    project:
      'Un brief et trois variantes de message pour une association fictive.',
    lessons: [
      lesson(
        'Donner du contexte',
        'Un assistant peut produire une réponse plausible sans disposer de vos faits. Précisez l’objectif, le public et les informations autorisées. Demandez-lui de signaler ce qui manque.',
        'Rédigez une demande contenant objectif, contexte et contraintes.',
        'Quel contexte utiliser ?',
        [
          'Des informations autorisées',
          'Tous les dossiers clients',
          'Une consigne sans objectif',
        ],
      ),
      lesson(
        'Comparer des propositions',
        'Demander plusieurs propositions aide à voir les choix possibles. Comparez-les avec des critères définis : clarté, ton, pertinence et respect du brief.',
        'Comparez trois versions d’un message avec les mêmes critères.',
        'Qui choisit la proposition finale ?',
        [
          'La personne responsable',
          'Toujours l’assistant',
          'Le texte le plus long',
        ],
      ),
      lesson(
        'Vérifier avant diffusion',
        'Relisez les noms, dates et affirmations. Séparez ce qui vient du brief de ce qui doit être vérifié. Un brouillon produit par un assistant reste un travail à réviser.',
        'Marquez les affirmations à vérifier et réécrivez le message final.',
        'Quel statut donner à la première réponse ?',
        [
          'Un brouillon à examiner',
          'Une preuve',
          'Une publication automatique',
        ],
      ),
    ],
  },
  {
    slug: 'power-bi',
    title: 'Penser un tableau de bord',
    category: 'IA & data',
    level: 'Intermédiaire',
    hours: 14,
    goal: 'Préparer les questions et les données d’un tableau de bord à construire dans Power BI.',
    project:
      'Le suivi de ventes d’une boutique fictive, sans données personnelles.',
    lessons: [
      lesson(
        'Partir d’une question',
        'Un tableau de bord répond à une question de gestion. Avant de choisir un graphique, demandez ce que la personne doit comprendre : évolution des ventes, répartition des produits ou suivi d’un objectif.',
        'Écrivez trois questions et associez un indicateur à chacune.',
        'Par quoi commencer ?',
        ['La décision à éclairer', 'Le graphique préféré', 'Les couleurs'],
      ),
      lesson(
        'Décrire les données',
        'Précisez ce qu’une ligne représente : une vente, un produit ou une journée. Documentez les colonnes, les unités et les valeurs manquantes avant toute comparaison.',
        'Dessinez une table de cinq ventes fictives avec date, produit et montant.',
        'Pourquoi documenter une unité ?',
        [
          'Pour interpréter le chiffre',
          'Pour décorer la table',
          'Pour augmenter les données',
        ],
      ),
      lesson(
        'Présenter une lecture',
        'Un graphique a besoin d’un titre, d’une période et d’unités. Expliquez ce qui est observé et ce qui reste inconnu. La mise en page doit faciliter la comparaison.',
        'Esquissez un tableau de bord avec trois indicateurs et une note de contexte.',
        'Que doit préciser un montant ?',
        ['Sa devise et sa période', 'Seulement sa taille', 'Un effet visuel'],
      ),
    ],
  },
  {
    slug: 'creation-video',
    title: 'Raconter en vidéo',
    category: 'Création',
    level: 'Débutant',
    hours: 12,
    goal: 'Préparer un tournage court et organiser son montage.',
    project: 'Une vidéo de présentation de 45 secondes pour un atelier fictif.',
    lessons: [
      lesson(
        'Écrire l’intention',
        'Décidez ce que le spectateur doit retenir et ressentir. Un format court gagne à avoir une idée centrale. Une introduction pose le sujet, le développement montre et la fin ouvre une action.',
        'Écrivez un synopsis de cinq phrases pour votre atelier.',
        'Combien d’idées centrales choisir ici ?',
        ['Une idée forte', 'Toutes les idées possibles', 'Aucune'],
      ),
      lesson(
        'Préparer les plans',
        'Une liste de plans relie image et information. Prévoyez une vue d’ensemble, un geste, un détail et une parole. Vérifiez les autorisations nécessaires pour les personnes et les lieux.',
        'Composez une liste de six plans avec leur intention.',
        'Que prépare une liste de plans ?',
        [
          'Les images nécessaires',
          'Le nombre d’abonnés',
          'La publication seule',
        ],
      ),
      lesson(
        'Monter pour comprendre',
        'Assemblez les plans selon votre histoire. Le son doit rester compréhensible et les sous-titres lisibles. Regardez une fois le montage sans son pour vérifier le sens des images.',
        'Décrivez votre ordre de montage et rédigez les sous-titres.',
        'Que vérifier sans son ?',
        ['La compréhension visuelle', 'La musique', 'Le volume'],
      ),
    ],
  },
];
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
    mark: '↗',
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
    mark: 'R↗',
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
    slug: 'photo',
    title: 'Plateau photo',
    copy: 'Un espace pensé pour les portraits, les produits et les séries de marque.',
    equipment: [
      'Fonds interchangeables',
      'Zone lumière',
      'Table de prise de vue',
    ],
    use: 'Portrait · Produit · Éditorial',
    symbol: '◐',
  },
  {
    slug: 'video',
    title: 'Plateau vidéo',
    copy: 'Un cadre modulable pour les prises de parole, les interviews et les formats de marque.',
    equipment: ['Cadre de tournage', 'Zone éclairage', 'Retour image'],
    use: 'Interview · Corporate · Création',
    symbol: '▣',
  },
  {
    slug: 'podcast',
    title: 'Espace podcast',
    copy: 'Une proposition de plateau pour les conversations enregistrées et les formats audio.',
    equipment: ['Table de conversation', 'Zone micros', 'Retour casque'],
    use: 'Conversation · Audio · Vidéo',
    symbol: '∿',
  },
];
export const packs = [
  {
    slug: 'photo',
    title: 'Session Photo',
    space: 'photo',
    duration: 2,
    copy: 'Construire une série de portraits ou de produits.',
    includes: [
      'Préparation du brief',
      'Session de prise de vue',
      'Sélection accompagnée',
    ],
    deliverable: 'Une sélection à définir avec le brief.',
  },
  {
    slug: 'podcast',
    title: 'Podcast',
    space: 'podcast',
    duration: 2,
    copy: 'Donner une forme à votre conversation.',
    includes: [
      'Préparation du conducteur',
      'Installation audio',
      'Enregistrement',
    ],
    deliverable: 'Un épisode brut ; montage à préciser.',
  },
  {
    slug: 'creator',
    title: 'Creator Session',
    space: 'video',
    duration: 3,
    copy: 'Produire plusieurs formats courts dans une même session.',
    includes: [
      'Liste des formats',
      'Préparation du cadre',
      'Tournage en série',
    ],
    deliverable: 'Des prises à décliner selon le plan éditorial.',
  },
  {
    slug: 'interview',
    title: 'Interview Corporate',
    space: 'video',
    duration: 2,
    copy: 'Préparer une prise de parole claire et soignée.',
    includes: [
      'Guide d’entretien',
      'Cadre image et son',
      'Session de tournage',
    ],
    deliverable: 'Une interview ; durée finale à cadrer.',
  },
  {
    slug: 'product',
    title: 'Product Story',
    space: 'photo',
    duration: 3,
    copy: 'Mettre la matière, l’usage et les détails au premier plan.',
    includes: ['Moodboard', 'Plan de prises de vue', 'Session produit'],
    deliverable: 'Une série de vues produit à définir.',
  },
  {
    slug: 'production',
    title: 'Production complète',
    space: 'video',
    duration: 4,
    copy: 'Relier la préparation, le plateau et la postproduction.',
    includes: ['Synopsis', 'Organisation du tournage', 'Plan de montage'],
    deliverable: 'Un film et ses déclinaisons à cadrer.',
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
      { label: 'Sessions', path: 'events' },
      { label: 'Entreprises', path: 'corporate' },
      { label: 'Intervenants', path: 'instructors' },
      { label: 'Mon espace', path: 'dashboard' },
    ],
    media: [
      { label: 'À la une', path: 'latest' },
      { label: 'Tech & IA', path: 'tech' },
      { label: 'Business', path: 'business' },
      { label: 'Création', path: 'creative' },
      { label: 'Rechercher', path: 'search' },
    ],
    studio: [
      { label: 'Espaces', path: 'spaces' },
      { label: 'Services', path: 'services' },
      { label: 'Packs', path: 'pricing' },
      { label: 'Galerie', path: 'gallery' },
      { label: 'Simuler une réservation', path: 'booking' },
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
      'Cette version de démonstration ne crée ni compte ni transaction.',
      'story',
      [
        {
          title: 'Sur votre appareil',
          copy: 'Academy conserve uniquement les modules choisis et les leçons terminées dans votre navigateur. Studios conserve le récapitulatif simulé, sans coordonnées personnelles. Vous pouvez effacer ces éléments dans les parcours concernés. Le choix de pause des animations est conservé pour la session de navigation.',
        },
        {
          title: 'Formulaires de démonstration',
          copy: 'Les champs ne sont pas transmis à Smartsell. Les brouillons de contact peuvent être copiés ; vous choisissez vous-même comment les envoyer.',
        },
        {
          title: 'Hébergement & lecture',
          copy: 'Le site est hébergé sur GitHub Pages. Aucun outil de mesure ou de publicité n’est ajouté par Smartsell dans cette version. Le navigateur charge les ressources du site depuis cet hébergement.',
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
        'Le travail prend forme.',
        'Six explorations créatives pour découvrir notre approche. Concepts de démonstration, sans commandes ni résultats clients revendiqués.',
        'work',
      ),
      ...cases.map((c) =>
        p(
          `work/${c.slug}`,
          c.title,
          c.tagline,
          'case',
          [
            { title: 'Le point de départ', copy: c.challenge },
            { title: 'La direction', copy: c.direction },
            {
              title: 'Les livrables envisagés',
              copy: 'Cette exploration illustre une proposition de travail.',
              items: c.deliverables,
            },
          ],
          c.slug,
        ),
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
        'Préparez un brief. Vous pourrez copier le message et choisir comment nous le transmettre.',
        'contact',
      ),
      ...common,
    ];
  if (id === 'academy')
    return [
      p(
        '',
        'Le savoir ouvre\nle champ.',
        'Des compétences à pratiquer. Des projets à faire grandir. Votre prochaine étape commence ici.',
        'home',
      ),
      p(
        'courses',
        'Votre prochain terrain de jeu.',
        'Huit modules de démonstration, avec objectifs, exercices et progression locale.',
        'courses',
      ),
      ...courses.flatMap((c) => [
        p(`courses/${c.slug}`, c.title, c.goal, 'course', [], c.slug),
        p(
          `enroll/${c.slug}`,
          'Faire le premier pas.',
          `Explorer le module « ${c.title} » en démonstration. Aucune inscription réelle, aucun paiement.`,
          'enroll',
          [],
          c.slug,
        ),
        p(
          `learn/${c.slug}`,
          c.title,
          'Trois leçons et un projet guidé. Votre progression reste sur cet appareil.',
          'learn',
          [],
          c.slug,
        ),
      ]),
      p(
        'events',
        'Les prochains rendez-vous.',
        'Exemples de formats à programmer. Les dates et inscriptions réelles seront annoncées après validation.',
        'events',
      ),
      p(
        'corporate',
        'Faire grandir les compétences ensemble.',
        'Construire un parcours à partir des situations de travail de votre équipe.',
        'story',
        [
          {
            title: 'Diagnostic',
            copy: 'Identifier les tâches, les pratiques actuelles et les compétences à développer.',
          },
          {
            title: 'Atelier',
            copy: 'Choisir un projet commun, pratiquer les méthodes puis discuter les choix.',
          },
          {
            title: 'Transmission',
            copy: 'Prévoir des exercices de reprise et des repères pour poursuivre le travail.',
          },
        ],
      ),
      p(
        'instructors',
        'Des pratiques à transmettre.',
        'Les intervenants seront présentés après validation. Découvrez les expertises prévues.',
        'story',
        [
          {
            title: 'Marketing & communication',
            copy: 'Stratégie, ligne éditoriale et lecture des campagnes.',
          },
          {
            title: 'Design & produit',
            copy: 'Composition, systèmes d’identité et conception de parcours.',
          },
          {
            title: 'Web, IA & data',
            copy: 'Pratique des outils, formulation des questions et vérification des résultats.',
          },
          {
            title: 'Image & vidéo',
            copy: 'Intention, préparation du plateau et construction du récit.',
          },
        ],
      ),
      p(
        'dashboard',
        'Votre espace pour avancer.',
        'Démonstration sur cet appareil : retrouvez les modules choisis et votre progression.',
        'dashboard',
      ),
      p(
        'my-courses',
        'Mes modules.',
        'Reprendre là où vous en êtes.',
        'dashboard',
      ),
      p(
        'resources',
        'La boîte à outils.',
        'Des canevas à copier pour cadrer, pratiquer et réviser.',
        'story',
        [
          {
            title: 'Le brief en une page',
            copy: 'Public · problème · objectif · action attendue · contraintes · validation.',
          },
          {
            title: 'Le journal de pratique',
            copy: 'Ce que j’ai essayé · ce que j’ai observé · ce que je modifierai · ce que je veux vérifier.',
          },
          {
            title: 'La grille de retour',
            copy: 'Compréhension · lisibilité · cohérence · action suivante · point à reprendre.',
          },
        ],
      ),
      p(
        'certificates',
        'Attestations de démonstration.',
        'Une fois un parcours terminé, un récapitulatif de progression devient disponible. Il ne constitue pas une certification officielle.',
        'certificates',
      ),
      p(
        'support',
        'Besoin d’un repère ?',
        'Préparez votre question sur le contenu, le niveau ou le parcours.',
        'contact',
      ),
      ...common,
    ];
  if (id === 'media')
    return [
      p(
        '',
        'Les idées qui\nfont la suite.',
        'Tech, business et culture créative. Un regard depuis Conakry, ouvert sur les possibles.',
        'home',
      ),
      p(
        'latest',
        'Le fil des idées.',
        'Vingt exemples éditoriaux originaux pour explorer notre ligne. Guides et opinions de démonstration ; aucune actualité ni interview réelle revendiquée.',
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
          'Des repères, des méthodes et des angles à explorer. Articles de démonstration.',
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
        'Signature collective des exemples éditoriaux de cette version.',
        'articles',
      ),
      p(
        'newsletter',
        'La suite dans votre boîte mail.',
        'Découvrez le parcours d’abonnement. Cette simulation ne transmet aucune adresse.',
        'newsletter',
      ),
      ...common,
    ];
  if (id === 'studio')
    return [
      p(
        '',
        'L’idée devient\nune présence.',
        'Image, son, mouvement. Un univers de production pour les marques, les créateurs et leurs histoires.',
        'home',
      ),
      p(
        'spaces',
        'Un cadre pour chaque intention.',
        'Trois propositions de plateau. Configurations illustratives, à valider avant toute réservation réelle.',
        'spaces',
      ),
      ...spaces.map((s) =>
        p(
          `spaces/${s.slug}`,
          s.title,
          s.copy,
          'space',
          [
            { title: 'Le cadre envisagé', copy: s.use, items: s.equipment },
            {
              title: 'Préparer votre session',
              copy: 'Précisez le format, le nombre de personnes, la durée et les besoins de postproduction. Les équipements et la disponibilité seront confirmés par l’équipe avant toute prestation.',
            },
          ],
          s.slug,
        ),
      ),
      p(
        'services',
        'Du brief à la dernière image.',
        'Photo, vidéo, podcast, interview, contenus créateurs et production de marque.',
        'story',
        [
          {
            title: 'Photo & produits',
            copy: 'Préparer les références, construire la lumière et organiser les prises de vue.',
          },
          {
            title: 'Vidéo & interviews',
            copy: 'Cadrer le récit, préparer les questions et organiser le tournage.',
          },
          {
            title: 'Podcast & conversations',
            copy: 'Construire un conducteur, prévoir l’installation et définir le format final.',
          },
          {
            title: 'Corporate & live',
            copy: 'Cadrer le dispositif, les intervenants et les conditions techniques avant chiffrage.',
          },
          {
            title: 'Créateurs & formation',
            copy: 'Composer une session de production ou un atelier adapté à votre pratique.',
          },
        ],
      ),
      p(
        'pricing',
        'Choisir son point de départ.',
        'Six packs illustratifs. Durées et périmètres de démonstration ; tarifs sur demande après cadrage.',
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
              title: 'Dans cette proposition',
              copy: `Durée indicative : ${s.duration} h. Le périmètre final sera validé avec vous.`,
              items: s.includes,
            },
            { title: 'La suite de la session', copy: s.deliverable },
          ],
          s.slug,
        ),
      ),
      p(
        'booking',
        'Préparer votre session.',
        'Simulez un parcours de réservation, du choix du pack au récapitulatif. Aucun créneau n’est réellement réservé.',
        'booking',
      ),
      p(
        'gallery',
        'Lumière. Cadre. Matière.',
        'Études graphiques de plateau et directions de production. Ces compositions ne sont pas des photographies des locaux.',
        'gallery',
      ),
      p(
        'faq',
        'Avant d’entrer en plateau.',
        'Les repères pour préparer votre projet.',
        'faq',
      ),
      p(
        'contact',
        'Donnez-nous le premier plan.',
        'Préparez un brief de production et choisissez comment le transmettre.',
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
