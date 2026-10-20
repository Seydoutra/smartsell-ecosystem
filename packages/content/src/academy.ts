import { applyPublished } from './publishing';
/*
 * Catalogue Smartsell Academy : formations réellement dispensées, tirées du
 * catalogue Marketing Digital & Croissance 2025/2026, du programme
 * Infographie & Canva, de l'intensif Création de contenu & IA et des
 * parcours IA créative du pôle production multimédia.
 */
import { t } from '@smartsell/routing';
import { photos, type Photo } from './photos';

export type Lesson = {
  title: string;
  copy: string;
  exercise: string;
  question: string;
  options: string[];
  answer: number;
};
export type Course = {
  slug: string;
  title: string;
  category: string;
  track: string;
  level: string;
  /** Volume horaire quand il est fixé par le programme. */
  hours?: number;
  format: string;
  goal: string;
  why: string;
  project: string;
  program: string[];
  outcomes: string[];
  photo: Photo;
  lessons: Lesson[];
};

const lesson = (
  title: string,
  copy: string,
  exercise: string,
  question: string,
  options: string[],
  answer = 0,
): Lesson => ({ title, copy, exercise, question, options, answer });

const certificate = [
  t('Certificat Smartsell', 'Smartsell certificate'),
  t('Supports PDF : cours + exercices', 'PDF materials: lessons + exercises'),
  t('Suivi de 30 jours après la formation', '30-day follow-up after training'),
];

const tracks = {
  catalogue: t('Marketing digital & croissance', 'Digital marketing & growth'),
  design: t('Infographie & Canva', 'Graphic design & Canva'),
  intensive: t('Création de contenu & IA', 'Content creation & AI'),
  creative: t('IA créative', 'Creative AI'),
};
const levels = {
  base: t('Fondamental', 'Foundation'),
  ops: t('Opérationnel', 'Operational'),
  adv: t('Avancé', 'Advanced'),
  expert: t('Expert', 'Expert'),
  all: t('Tous niveaux', 'All levels'),
};

export const courses: Course[] = [
  {
    slug: 'communication-digitale',
    title: t(
      'Communication digitale — Stratégie de contenu',
      'Digital communication — Content strategy',
    ),
    category: t('Stratégie', 'Strategy'),
    track: tracks.catalogue,
    level: levels.base,
    hours: 14,
    format: t('2 jours · 14 h', '2 days · 14 h'),
    goal: t(
      'Définir une stratégie de contenu cohérente et construire un calendrier éditorial opérationnel.',
      'Define a coherent content strategy and build a working editorial calendar.',
    ),
    why: t(
      'Avant de créer quoi que ce soit, il faut comprendre pourquoi, pour qui et comment communiquer.',
      'Before creating anything, you need to understand why, for whom and how to communicate.',
    ),
    project: t(
      'Construire le calendrier éditorial de votre entreprise.',
      'Build your company’s editorial calendar.',
    ),
    program: [
      t(
        'Principes de la communication institutionnelle digitale',
        'Principles of institutional digital communication',
      ),
      t(
        'Identifier sa cible et définir ses objectifs',
        'Identify your audience and set your objectives',
      ),
      t(
        'Créer un calendrier éditorial mensuel',
        'Create a monthly editorial calendar',
      ),
      t(
        'Rédiger des posts engageants adaptés au public guinéen',
        'Write engaging posts for a Guinean audience',
      ),
      t(
        'Comprendre les algorithmes : Facebook, Instagram, TikTok',
        'Understand the algorithms: Facebook, Instagram, TikTok',
      ),
      t(
        'Adapter le ton et le message à chaque plateforme',
        'Adapt tone and message to each platform',
      ),
    ],
    outcomes: certificate,
    photo: photos.academyRoom,
    lessons: [
      lesson(
        t('Pour qui, pourquoi ?', 'For whom, and why?'),
        t(
          'Une stratégie commence par une cible précise et un objectif mesurable. Une clinique qui veut des rendez-vous ne communique pas comme une boutique qui veut des visites : le public, le ton et le canal changent.',
          'A strategy starts with a precise audience and a measurable objective. A clinic that wants appointments does not communicate like a shop that wants visits: audience, tone and channel all change.',
        ),
        t(
          'Écrivez votre cible principale et l’action que vous attendez d’elle ce mois-ci.',
          'Write down your main audience and the action you expect from it this month.',
        ),
        t(
          'Par quoi commence une stratégie de contenu ?',
          'What does a content strategy start with?',
        ),
        [
          t('Une cible et un objectif', 'An audience and an objective'),
          t('Un nouveau logo', 'A new logo'),
          t('Publier tous les jours', 'Posting every day'),
        ],
      ),
      lesson(
        t('Le calendrier éditorial', 'The editorial calendar'),
        t(
          'Le calendrier relie chaque publication à un thème, un format, une date et un responsable. Il évite l’improvisation et garde une présence régulière, même pendant les semaines chargées.',
          'The calendar links each post to a theme, a format, a date and an owner. It prevents improvisation and keeps a steady presence, even during busy weeks.',
        ),
        t(
          'Planifiez quatre semaines : un thème par semaine et trois formats différents.',
          'Plan four weeks: one theme per week and three different formats.',
        ),
        t(
          'Que doit préciser chaque ligne du calendrier ?',
          'What should each calendar line specify?',
        ),
        [
          t(
            'Thème, format, date et responsable',
            'Theme, format, date and owner',
          ),
          t('Seulement la date', 'Only the date'),
          t('Le nombre de likes espéré', 'The number of likes hoped for'),
        ],
      ),
      lesson(
        t('Chaque réseau a sa langue', 'Every network has its language'),
        t(
          'Facebook favorise la conversation, Instagram l’image soignée, TikTok le rythme et l’authenticité. Le même message se décline : on adapte la durée, le visuel et l’accroche à chaque algorithme.',
          'Facebook favours conversation, Instagram polished visuals, TikTok pace and authenticity. The same message gets adapted: length, visual and hook change with each algorithm.',
        ),
        t(
          'Déclinez une même annonce pour Facebook, Instagram et TikTok.',
          'Adapt one announcement for Facebook, Instagram and TikTok.',
        ),
        t(
          'Que faut-il adapter d’un réseau à l’autre ?',
          'What must change from one network to another?',
        ),
        [
          t('Le format, l’accroche et la durée', 'Format, hook and length'),
          t('Rien, on copie-colle', 'Nothing, just copy and paste'),
          t('Uniquement la couleur', 'Only the colour'),
        ],
      ),
    ],
  },
  {
    slug: 'redaction-web',
    title: t(
      'Rédaction institutionnelle pour le web',
      'Institutional writing for the web',
    ),
    category: t('Rédaction', 'Writing'),
    track: tracks.catalogue,
    level: levels.base,
    hours: 7,
    format: t('1 jour · 7 h', '1 day · 7 h'),
    goal: t(
      'Produire des textes clairs, lisibles et efficaces pour le web et les réseaux sociaux.',
      'Produce clear, readable and effective copy for the web and social media.',
    ),
    why: t(
      'Savoir écrire pour le web est la compétence de base avant tout outil de création.',
      'Writing for the web is the core skill before any creative tool.',
    ),
    project: t(
      'Rédiger trois contenus web pour votre organisation.',
      'Write three web pieces for your organisation.',
    ),
    program: [
      t(
        'Lisibilité, hiérarchie et référencement naturel',
        'Readability, hierarchy and SEO',
      ),
      t(
        'Structurer un article, un communiqué, un post',
        'Structure an article, a press release, a post',
      ),
      t(
        'Titres accrocheurs et appels à l’action',
        'Catchy headlines and calls to action',
      ),
      t(
        'Écrire pour un réseau social ou pour un site',
        'Writing for social media vs. a website',
      ),
      t(
        'Adapter son style au secteur : santé, éducation, BTP…',
        'Adapt your style to the sector: health, education, construction…',
      ),
    ],
    outcomes: certificate,
    photo: photos.academyHome,
    lessons: [
      lesson(
        t('L’essentiel en premier', 'Lead with what matters'),
        t(
          'Sur écran, on lit en diagonale. Le message principal se place dans le titre et la première phrase ; les détails suivent, en paragraphes courts et intertitres.',
          'On screen, people skim. The main message goes in the headline and first sentence; details follow in short paragraphs and subheadings.',
        ),
        t(
          'Réécrivez un texte existant en mettant l’information clé en premier.',
          'Rewrite an existing text with the key information first.',
        ),
        t(
          'Où placer l’information principale ?',
          'Where does the main information go?',
        ),
        [
          t(
            'Dans le titre et la première phrase',
            'In the headline and first sentence',
          ),
          t('À la fin, en conclusion', 'At the end, as a conclusion'),
          t('Dans une note de bas de page', 'In a footnote'),
        ],
      ),
      lesson(
        t('Des titres qui donnent envie', 'Headlines that pull readers in'),
        t(
          'Un bon titre promet un bénéfice concret et reste honnête. Il annonce ce que le lecteur va apprendre ou obtenir, sans effet trompeur.',
          'A good headline promises a concrete benefit and stays honest. It tells readers what they will learn or get, without misleading tricks.',
        ),
        t(
          'Proposez cinq titres pour une même actualité.',
          'Draft five headlines for the same news item.',
        ),
        t(
          'Qu’est-ce qui rend un titre efficace ?',
          'What makes a headline effective?',
        ),
        [
          t('Un bénéfice clair et honnête', 'A clear, honest benefit'),
          t('Le plus de mots possible', 'As many words as possible'),
          t('Un suspense sans rapport', 'Unrelated suspense'),
        ],
      ),
      lesson(
        t('Toujours finir par une action', 'Always end with an action'),
        t(
          'Chaque contenu guide vers une étape suivante : appeler, réserver, s’inscrire, écrire sur WhatsApp. Un appel à l’action unique et précis convertit mieux que plusieurs choix.',
          'Every piece leads to a next step: call, book, sign up, message on WhatsApp. One precise call to action converts better than several choices.',
        ),
        t(
          'Ajoutez un appel à l’action précis à vos trois contenus.',
          'Add one precise call to action to your three pieces.',
        ),
        t(
          'Combien d’appels à l’action par contenu ?',
          'How many calls to action per piece?',
        ),
        [
          t('Un seul, précis', 'One, precise'),
          t('Le plus possible', 'As many as possible'),
          t('Aucun', 'None'),
        ],
      ),
    ],
  },
  {
    slug: 'canva-pro',
    title: t(
      'Canva Pro — Visuels professionnels',
      'Canva Pro — Professional visuals',
    ),
    category: 'Design',
    track: tracks.catalogue,
    level: levels.ops,
    hours: 14,
    format: t('2 jours · 14 h', '2 days · 14 h'),
    goal: t(
      'Créer des visuels professionnels pour tous les supports digitaux, sans formation en design.',
      'Create professional visuals for every digital channel, with no design background.',
    ),
    why: t(
      'Une fois la stratégie posée et les textes maîtrisés, on passe à la création visuelle.',
      'Once the strategy is set and the copy is mastered, it is time for visuals.',
    ),
    project: t(
      'Produire 5 visuels prêts à publier.',
      'Produce 5 ready-to-publish visuals.',
    ),
    program: [
      t(
        'Prise en main de l’interface Canva Pro',
        'Getting started with Canva Pro',
      ),
      t('Couleurs, typographie, espacement', 'Colour, typography, spacing'),
      t(
        'Posts, stories, bannières et couvertures',
        'Posts, stories, banners and covers',
      ),
      t('Infographies simples et percutantes', 'Simple, striking infographics'),
      t('Templates et kit de marque', 'Templates and brand kit'),
      t(
        'Un kit visuel complet pour votre organisation',
        'A complete visual kit for your organisation',
      ),
    ],
    outcomes: certificate,
    photo: photos.agencyDesigner,
    lessons: [
      lesson(
        t('La hiérarchie visuelle', 'Visual hierarchy'),
        t(
          'Un visuel professionnel se lit dans l’ordre : titre, sous-titre, contenu, appel à l’action. La taille, le contraste et l’espace guident l’œil.',
          'A professional visual reads in order: headline, subheading, content, call to action. Size, contrast and space guide the eye.',
        ),
        t(
          'Créez un visuel promo en respectant cet ordre de lecture.',
          'Create a promo visual that follows this reading order.',
        ),
        t('Qu’est-ce qui guide l’œil ?', 'What guides the eye?'),
        [
          t('Taille, contraste et espace', 'Size, contrast and space'),
          t('Le nombre de couleurs', 'The number of colours'),
          t('Les effets 3D', '3D effects'),
        ],
      ),
      lesson(
        t('Le kit de marque', 'The brand kit'),
        t(
          'Logo, palette et polices enregistrés dans Canva garantissent la cohérence : toute l’équipe crée avec les mêmes éléments.',
          'Logo, palette and fonts saved in Canva guarantee consistency: the whole team creates with the same elements.',
        ),
        t(
          'Configurez le kit de marque de votre organisation.',
          'Set up your organisation’s brand kit.',
        ),
        t('À quoi sert le kit de marque ?', 'What is the brand kit for?'),
        [
          t('À rester cohérent', 'Staying consistent'),
          t('À changer de style chaque jour', 'Changing style every day'),
          t('À éviter les templates', 'Avoiding templates'),
        ],
      ),
      lesson(
        t('Les bons formats', 'The right formats'),
        t(
          'Un post carré, une story verticale, une bannière horizontale : chaque emplacement a son format. Créer au bon format évite les recadrages qui coupent le message.',
          'A square post, a vertical story, a horizontal banner: each placement has its format. Designing at the right size avoids crops that cut the message.',
        ),
        t(
          'Déclinez un visuel en post, story et bannière.',
          'Adapt one visual into a post, a story and a banner.',
        ),
        t('Pourquoi créer au bon format ?', 'Why design at the right size?'),
        [
          t('Pour éviter de couper le message', 'To avoid cutting the message'),
          t('Pour alourdir le fichier', 'To make the file heavier'),
          t('Ce n’est pas utile', 'It does not matter'),
        ],
      ),
    ],
  },
  {
    slug: 'meta-business-suite',
    title: t(
      'Meta Business Suite — Pages officielles',
      'Meta Business Suite — Official pages',
    ),
    category: t('Réseaux sociaux', 'Social media'),
    track: tracks.catalogue,
    level: levels.ops,
    hours: 14,
    format: t('2 jours · 14 h', '2 days · 14 h'),
    goal: t(
      'Gérer et animer une présence professionnelle sur Facebook et Instagram de A à Z.',
      'Run and grow a professional presence on Facebook and Instagram from A to Z.',
    ),
    why: t(
      'Facebook et Instagram dominent en Guinée : les maîtriser est indispensable.',
      'Facebook and Instagram dominate in Guinea: mastering them is essential.',
    ),
    project: t(
      'Optimiser et animer votre page pendant une semaine simulée.',
      'Optimise and run your page for a simulated week.',
    ),
    program: [
      t(
        'Configurer les pages Facebook et Instagram Business',
        'Set up Facebook and Instagram Business pages',
      ),
      t(
        'Planifier et publier depuis Meta Business Suite',
        'Schedule and publish from Meta Business Suite',
      ),
      t(
        'Messages, commentaires et boîte de réception',
        'Messages, comments and inbox',
      ),
      t(
        'Reach, engagement, abonnés : lire les statistiques',
        'Reach, engagement, followers: reading the stats',
      ),
      t('Interpréter les insights pour ajuster', 'Use insights to adjust'),
      t(
        'Modération et gestion de communauté',
        'Moderation and community management',
      ),
    ],
    outcomes: certificate,
    photo: photos.phonePink,
    lessons: [
      lesson(
        t('Une page qui inspire confiance', 'A page people trust'),
        t(
          'Photo de profil, couverture, description, coordonnées et bouton d’action : une page complète rassure avant même la première publication.',
          'Profile picture, cover, description, contact details and action button: a complete page reassures before the first post.',
        ),
        t(
          'Faites l’audit de votre page avec ces cinq éléments.',
          'Audit your page against these five elements.',
        ),
        t('Qu’est-ce qui rassure un visiteur ?', 'What reassures a visitor?'),
        [
          t('Une page complète et à jour', 'A complete, up-to-date page'),
          t('Beaucoup de publicités', 'Lots of ads'),
          t('Aucune information', 'No information'),
        ],
      ),
      lesson(
        t('Planifier pour tenir le rythme', 'Schedule to keep the pace'),
        t(
          'La planification dans Meta Business Suite permet de préparer la semaine en une séance et de publier aux heures où votre audience est connectée.',
          'Scheduling in Meta Business Suite lets you prepare the week in one sitting and publish when your audience is online.',
        ),
        t(
          'Programmez trois publications aux bons horaires.',
          'Schedule three posts at the right times.',
        ),
        t(
          'Quel est l’intérêt de la planification ?',
          'What is scheduling for?',
        ),
        [
          t(
            'Publier régulièrement au bon moment',
            'Publishing regularly at the right time',
          ),
          t('Publier moins souvent', 'Publishing less often'),
          t('Éviter de lire les statistiques', 'Avoiding the stats'),
        ],
      ),
      lesson(
        t('Lire les statistiques', 'Reading the numbers'),
        t(
          'La portée mesure combien de personnes ont vu un contenu, l’engagement combien ont réagi. On compare les formats pour garder ce qui fonctionne.',
          'Reach measures how many people saw a piece of content, engagement how many reacted. Compare formats and keep what works.',
        ),
        t(
          'Comparez vos trois derniers posts et notez la leçon à retenir.',
          'Compare your last three posts and note the lesson.',
        ),
        t('Que mesure la portée ?', 'What does reach measure?'),
        [
          t(
            'Le nombre de personnes qui ont vu le contenu',
            'How many people saw the content',
          ),
          t('Le nombre de ventes', 'The number of sales'),
          t('Le nombre de pages', 'The number of pages'),
        ],
      ),
    ],
  },
  {
    slug: 'montage-video',
    title: t(
      'Montage vidéo simple — Initiation',
      'Simple video editing — Introduction',
    ),
    category: t('Vidéo', 'Video'),
    track: tracks.catalogue,
    level: levels.ops,
    hours: 14,
    format: t('2 jours · 14 h', '2 days · 14 h'),
    goal: t(
      'Produire des vidéos courtes et percutantes pour les réseaux sociaux, sans matériel professionnel.',
      'Produce short, punchy videos for social media without professional gear.',
    ),
    why: t(
      'La vidéo est le format le plus consommé sur les réseaux : savoir en produire est essentiel.',
      'Video is the most watched format on social media: knowing how to make it is essential.',
    ),
    project: t(
      'Monter une vidéo de présentation de 60 secondes.',
      'Edit a 60-second presentation video.',
    ),
    program: [
      t('CapCut sur mobile et ordinateur', 'CapCut on mobile and desktop'),
      t('Couper, assembler, transitions', 'Cutting, assembling, transitions'),
      t(
        'Textes animés et sous-titres automatiques',
        'Animated text and auto captions',
      ),
      t(
        'Musique, voix off et réglages audio',
        'Music, voice-over and audio settings',
      ),
      t(
        'Formats Reels, TikTok, Stories, Shorts',
        'Reels, TikTok, Stories, Shorts formats',
      ),
      t(
        'Tournage mobile : cadrage, lumière, son',
        'Mobile shooting: framing, light, sound',
      ),
    ],
    outcomes: certificate,
    photo: photos.videoGimbal,
    lessons: [
      lesson(
        t('Accrocher en 3 secondes', 'Hook in 3 seconds'),
        t(
          'Sur les réseaux, la décision de regarder se prend tout de suite. On ouvre sur l’image la plus forte ou la question qui intrigue, puis on développe.',
          'On social media, people decide to watch right away. Open with the strongest image or an intriguing question, then develop.',
        ),
        t(
          'Choisissez le plan d’ouverture de votre vidéo de 60 secondes.',
          'Pick the opening shot of your 60-second video.',
        ),
        t('Quand se joue l’attention ?', 'When is attention won?'),
        [
          t('Dans les premières secondes', 'In the first seconds'),
          t('À la fin de la vidéo', 'At the end of the video'),
          t('Au générique', 'In the credits'),
        ],
      ),
      lesson(
        t('Cadrer et éclairer au téléphone', 'Framing and lighting on a phone'),
        t(
          'Face à une fenêtre, téléphone stable, objectif nettoyé, son proche de la bouche : quatre gestes qui changent tout, sans matériel coûteux.',
          'Facing a window, steady phone, clean lens, sound close to the mouth: four habits that change everything without costly gear.',
        ),
        t(
          'Tournez le même plan avec et sans ces quatre gestes.',
          'Shoot the same take with and without these four habits.',
        ),
        t(
          'Quelle est la meilleure source de lumière gratuite ?',
          'What is the best free light source?',
        ),
        [
          t('Une fenêtre face à soi', 'A window in front of you'),
          t('Une lampe derrière soi', 'A lamp behind you'),
          t('L’obscurité', 'Darkness'),
        ],
      ),
      lesson(
        t('Sous-titrer pour être vu', 'Caption to be watched'),
        t(
          'Beaucoup regardent sans le son. Les sous-titres automatiques de CapCut, relus et corrigés, rendent la vidéo compréhensible partout.',
          'Many people watch with the sound off. CapCut’s auto captions, checked and corrected, make the video understandable anywhere.',
        ),
        t(
          'Ajoutez et corrigez les sous-titres de votre montage.',
          'Add and correct the captions of your edit.',
        ),
        t('Pourquoi sous-titrer ?', 'Why add captions?'),
        [
          t('Beaucoup regardent sans le son', 'Many watch with the sound off'),
          t('Pour cacher l’image', 'To hide the image'),
          t('Ce n’est jamais utile', 'It is never useful'),
        ],
      ),
    ],
  },
  {
    slug: 'ia-marketing',
    title: t(
      'Intelligence artificielle appliquée au marketing',
      'AI applied to marketing',
    ),
    category: t('IA', 'AI'),
    track: tracks.catalogue,
    level: levels.adv,
    hours: 14,
    format: t('2 jours · 14 h', '2 days · 14 h'),
    goal: t(
      'Intégrer les outils d’IA dans sa routine marketing pour gagner du temps et améliorer la qualité.',
      'Bring AI tools into your marketing routine to save time and raise quality.',
    ),
    why: t(
      'L’IA transforme le marketing digital : savoir l’utiliser est un avantage concurrentiel immédiat.',
      'AI is transforming digital marketing: using it well is an immediate competitive edge.',
    ),
    project: t(
      'Produire une semaine de contenu complet avec l’IA.',
      'Produce a full week of content with AI.',
    ),
    program: [
      t(
        'L’IA générative : ce qu’elle est, ce qu’elle n’est pas',
        'Generative AI: what it is and is not',
      ),
      t(
        'Claude, ChatGPT, Midjourney, ElevenLabs…',
        'Claude, ChatGPT, Midjourney, ElevenLabs…',
      ),
      t(
        'Textes : posts, articles, scripts, réponses',
        'Text: posts, articles, scripts, replies',
      ),
      t('Images et visuels générés', 'Generated images and visuals'),
      t(
        'Automatiser rapports et calendriers',
        'Automating reports and calendars',
      ),
      t('Analyser concurrence et cible', 'Analysing competitors and audience'),
      t('Éthique et limites', 'Ethics and limits'),
    ],
    outcomes: certificate,
    photo: photos.labsNight,
    lessons: [
      lesson(
        t('Un assistant, pas un pilote', 'An assistant, not a pilot'),
        t(
          'L’IA propose des brouillons rapides ; l’humain choisit, vérifie et signe. Les faits, les chiffres et le ton de marque restent sous votre contrôle.',
          'AI drafts quickly; humans choose, check and sign off. Facts, figures and brand tone stay under your control.',
        ),
        t(
          'Faites rédiger un post par l’IA puis corrigez-le à votre ton.',
          'Have AI draft a post, then rewrite it in your tone.',
        ),
        t(
          'Qui valide un contenu produit avec l’IA ?',
          'Who approves AI-assisted content?',
        ),
        [
          t('Une personne de l’équipe', 'A person on the team'),
          t('L’outil lui-même', 'The tool itself'),
          t('Personne', 'Nobody'),
        ],
      ),
      lesson(
        t('Choisir le bon outil', 'Picking the right tool'),
        t(
          'Un outil pour le texte, un pour l’image, un pour la voix : chaque besoin a son outil. On commence par la tâche, pas par l’outil à la mode.',
          'One tool for text, one for images, one for voice: each need has its tool. Start from the task, not the trendy tool.',
        ),
        t(
          'Associez trois tâches de votre semaine à un outil adapté.',
          'Match three tasks of your week to a suitable tool.',
        ),
        t('Par quoi commencer ?', 'Where should you start?'),
        [
          t('Par la tâche à accomplir', 'With the task at hand'),
          t('Par l’outil le plus cher', 'With the most expensive tool'),
          t('Par une tendance', 'With a trend'),
        ],
      ),
      lesson(
        t('Les limites à connaître', 'Limits to know'),
        t(
          'L’IA peut inventer des faits, reproduire des biais ou exposer des données. On ne lui confie jamais d’informations confidentielles et on vérifie toute affirmation.',
          'AI can invent facts, reproduce bias or expose data. Never give it confidential information, and verify every claim.',
        ),
        t(
          'Listez trois règles d’usage de l’IA pour votre équipe.',
          'List three AI usage rules for your team.',
        ),
        t(
          'Que faire d’une information produite par l’IA ?',
          'What should you do with AI-generated information?',
        ),
        [
          t('La vérifier', 'Verify it'),
          t('La publier telle quelle', 'Publish it as is'),
          t('L’ignorer toujours', 'Always ignore it'),
        ],
      ),
    ],
  },
  {
    slug: 'prompt-engineering',
    title: t(
      'Prompt engineering — Parler à l’IA',
      'Prompt engineering — Talking to AI',
    ),
    category: t('IA', 'AI'),
    track: tracks.catalogue,
    level: levels.adv,
    hours: 7,
    format: t('1 jour · 7 h', '1 day · 7 h'),
    goal: t(
      'Formuler des instructions précises pour obtenir des résultats IA de haute qualité.',
      'Write precise instructions to get high-quality AI results.',
    ),
    why: t(
      'Un bon prompt change tout : c’est la compétence clé pour exploiter l’IA.',
      'A good prompt changes everything: it is the key skill to get the most from AI.',
    ),
    project: t(
      'Construire 10 prompts métier pour votre secteur.',
      'Build 10 business prompts for your sector.',
    ),
    program: [
      t(
        'Comment fonctionne un modèle de langage, sans jargon',
        'How a language model works, without jargon',
      ),
      t(
        'Les 5 composantes : rôle, contexte, tâche, format, contraintes',
        'The 5 parts: role, context, task, format, constraints',
      ),
      t(
        'Chain-of-thought, few-shot, personas, multi-étapes',
        'Chain-of-thought, few-shot, personas, multi-step',
      ),
      t('Prompts pour le contenu marketing', 'Prompts for marketing content'),
      t(
        'Prompts pour l’analyse et la recherche',
        'Prompts for analysis and research',
      ),
      t(
        'Une bibliothèque de prompts réutilisables',
        'A library of reusable prompts',
      ),
    ],
    outcomes: certificate,
    photo: photos.labsCoder,
    lessons: [
      lesson(
        t('Les cinq composantes', 'The five parts'),
        t(
          'Rôle, contexte, tâche, format et contraintes : un prompt complet laisse peu de place au hasard. « Tu es community manager d’une clinique à Conakry… » donne déjà un cadre.',
          'Role, context, task, format and constraints: a complete prompt leaves little to chance. “You are the community manager of a clinic in Conakry…” already sets a frame.',
        ),
        t(
          'Réécrivez une demande vague avec les cinq composantes.',
          'Rewrite a vague request using the five parts.',
        ),
        t(
          'Quelle composante précise la forme du résultat ?',
          'Which part sets the shape of the result?',
        ),
        [
          t('Le format', 'The format'),
          t('Le rôle', 'The role'),
          t('Le contexte', 'The context'),
        ],
      ),
      lesson(
        t('Montrer des exemples', 'Show examples'),
        t(
          'La technique few-shot consiste à donner deux ou trois exemples de ce que l’on attend. L’IA reprend le ton, la longueur et la structure.',
          'The few-shot technique gives two or three examples of what you expect. The AI picks up tone, length and structure.',
        ),
        t(
          'Ajoutez deux exemples de posts réussis à votre prompt.',
          'Add two examples of successful posts to your prompt.',
        ),
        t('À quoi servent les exemples ?', 'What are examples for?'),
        [
          t(
            'À montrer le ton et la structure attendus',
            'Showing the expected tone and structure',
          ),
          t('À rallonger le prompt', 'Making the prompt longer'),
          t('À rien', 'Nothing'),
        ],
      ),
      lesson(
        t('Une bibliothèque d’équipe', 'A team library'),
        t(
          'Les prompts qui fonctionnent se rangent et se partagent : nom, usage, prompt, exemple de résultat. L’équipe gagne du temps et garde une qualité constante.',
          'Prompts that work get stored and shared: name, use, prompt, sample result. The team saves time and keeps quality consistent.',
        ),
        t(
          'Rangez vos trois meilleurs prompts dans une fiche partagée.',
          'Store your three best prompts in a shared sheet.',
        ),
        t('Pourquoi une bibliothèque de prompts ?', 'Why a prompt library?'),
        [
          t('Pour une qualité constante', 'For consistent quality'),
          t('Pour les garder secrets', 'To keep them secret'),
          t('Pour changer d’outil', 'To change tools'),
        ],
      ),
    ],
  },
  {
    slug: 'gestion-de-crise',
    title: t(
      'Communication en période sensible — Gestion de crise',
      'Communicating in sensitive times — Crisis management',
    ),
    category: t('Stratégie', 'Strategy'),
    track: tracks.catalogue,
    level: levels.expert,
    hours: 7,
    format: t('1 jour · 7 h', '1 day · 7 h'),
    goal: t(
      'Réagir vite, juste et efficacement face à une crise sur les réseaux sociaux.',
      'React quickly, accurately and effectively to a social media crisis.',
    ),
    why: t(
      'Une crise mal gérée peut détruire en quelques heures ce qui a été construit en années.',
      'A badly handled crisis can destroy in hours what took years to build.',
    ),
    project: t(
      'Simulation de crise en temps réel.',
      'Real-time crisis simulation.',
    ),
    program: [
      t(
        'Rumeur, bad buzz, commentaires viraux : repérer la crise',
        'Rumour, backlash, viral comments: spotting a crisis',
      ),
      t(
        'Les réflexes : ne pas réagir à chaud, qui parle, que dire',
        'Reflexes: don’t react in the heat, who speaks, what to say',
      ),
      t(
        'Rédiger un message de crise : ton et timing',
        'Writing a crisis message: tone and timing',
      ),
      t(
        'Communiqué, post officiel, message de direction',
        'Statement, official post, leadership message',
      ),
      t(
        'Veille et monitoring avec des outils accessibles',
        'Monitoring with accessible tools',
      ),
      t(
        'Fake news et commentaires négatifs',
        'Fake news and negative comments',
      ),
      t(
        'Études de crises réelles sur les réseaux guinéens',
        'Real crisis cases on Guinean networks',
      ),
    ],
    outcomes: certificate,
    photo: photos.mediaPresenter,
    lessons: [
      lesson(
        t('Ne pas réagir à chaud', 'Don’t react in the heat'),
        t(
          'Le premier réflexe est de vérifier les faits et de désigner une seule voix. Une réponse précipitée nourrit souvent la crise au lieu de l’éteindre.',
          'The first reflex is to check the facts and name a single spokesperson. A rushed reply often feeds the crisis instead of calming it.',
        ),
        t(
          'Écrivez la procédure en trois étapes de votre organisation.',
          'Write your organisation’s three-step procedure.',
        ),
        t('Quel est le premier réflexe ?', 'What is the first reflex?'),
        [
          t(
            'Vérifier les faits et désigner un porte-parole',
            'Check the facts and name a spokesperson',
          ),
          t('Supprimer tous les commentaires', 'Delete every comment'),
          t('Répondre à chacun immédiatement', 'Reply to everyone immediately'),
        ],
      ),
      lesson(
        t('Le message de crise', 'The crisis message'),
        t(
          'Reconnaître, expliquer ce qui est fait, indiquer quand on reviendra vers le public : un message court, humain et factuel rassure.',
          'Acknowledge, explain what is being done, say when you will report back: a short, human, factual message reassures.',
        ),
        t(
          'Rédigez un post officiel en réponse à une rumeur.',
          'Draft an official post responding to a rumour.',
        ),
        t('Qu’est-ce qui rassure le public ?', 'What reassures the public?'),
        [
          t(
            'Un message court, humain et factuel',
            'A short, human, factual message',
          ),
          t('Le silence total', 'Total silence'),
          t('Un message agressif', 'An aggressive message'),
        ],
      ),
      lesson(
        t('Surveiller pour anticiper', 'Monitor to anticipate'),
        t(
          'Une veille simple — alertes, mots-clés, mentions — permet de repérer un sujet sensible avant qu’il ne devienne viral.',
          'Simple monitoring — alerts, keywords, mentions — spots a sensitive topic before it goes viral.',
        ),
        t(
          'Listez dix mots-clés à surveiller pour votre organisation.',
          'List ten keywords to monitor for your organisation.',
        ),
        t('À quoi sert la veille ?', 'What is monitoring for?'),
        [
          t(
            'À repérer un sujet avant qu’il explose',
            'Spotting a topic before it blows up',
          ),
          t('À publier plus', 'Publishing more'),
          t('À rien en période calme', 'Nothing in quiet times'),
        ],
      ),
    ],
  },
  {
    slug: 'infographie-canva',
    title: t(
      'Infographie & Canva — Du fondamental au niveau agence',
      'Graphic design & Canva — From basics to agency level',
    ),
    category: 'Design',
    track: tracks.design,
    level: levels.all,
    format: t('8 modules · 4 semaines', '8 modules · 4 weeks'),
    goal: t(
      'Comprendre les règles du design, maîtriser Canva et l’IA, puis produire comme une agence.',
      'Understand design rules, master Canva and AI, then produce like an agency.',
    ),
    why: t(
      'Un designer n’est pas quelqu’un qui « fait joli » : il résout un problème visuel pour une cible.',
      'A designer does not just “make it pretty”: they solve a visual problem for an audience.',
    ),
    project: t(
      'Un pack de 12 visuels pour une entreprise et un mini portfolio validé.',
      'A 12-visual pack for a company and an approved mini portfolio.',
    ),
    program: [
      t(
        'Les règles fondamentales de l’infographie',
        'The fundamental rules of graphic design',
      ),
      t(
        'Couleurs, typographies & cohérence de marque',
        'Colour, type & brand consistency',
      ),
      t('Canva de A à Z', 'Canva from A to Z'),
      t(
        'Canva pour Facebook, Instagram et WhatsApp',
        'Canva for Facebook, Instagram and WhatsApp',
      ),
      t('L’IA pour créer plus vite', 'AI to create faster'),
      t(
        'L’IA dans Canva : Magic Write, Magic Design',
        'AI in Canva: Magic Write, Magic Design',
      ),
      t('Création de contenu en série', 'Batch content creation'),
      t('Mini portfolio & validation finale', 'Mini portfolio & final review'),
    ],
    outcomes: [
      t('Un mini style guide de marque', 'A mini brand style guide'),
      t(
        'Une mini campagne : affiche, story, post, statut',
        'A mini campaign: poster, story, post, status',
      ),
      t('Un portfolio exporté proprement', 'A cleanly exported portfolio'),
    ],
    photo: photos.agencyTablet,
    lessons: [
      lesson(
        t('La mentalité du designer', 'The designer’s mindset'),
        t(
          'Observer, simplifier, structurer, rester cohérent : ces quatre piliers guident chaque visuel. On travaille pour une cible, pas pour ses goûts personnels.',
          'Observe, simplify, structure, stay consistent: these four pillars guide every visual. You design for an audience, not for your own taste.',
        ),
        t(
          'Créez 2 visuels avant/après sur un même thème.',
          'Create 2 before/after visuals on one theme.',
        ),
        t(
          'Pour qui travaille le designer ?',
          'Who does the designer work for?',
        ),
        [
          t('Pour une cible', 'For an audience'),
          t('Pour lui-même', 'For themselves'),
          t('Pour les autres designers', 'For other designers'),
        ],
      ),
      lesson(
        t('Pas d’arc-en-ciel', 'No rainbows'),
        t(
          'Une palette courte, deux polices maximum et une structure répétée : la cohérence est le secret des marques fortes et l’erreur la plus fréquente sur les pages locales.',
          'A short palette, two fonts at most and a repeated structure: consistency is the secret of strong brands and the most common mistake on local pages.',
        ),
        t(
          'Créez un mini style guide : palette, polices, mise en page.',
          'Create a mini style guide: palette, fonts, layout.',
        ),
        t('Combien de polices au maximum ?', 'How many fonts at most?'),
        [
          t('Deux', 'Two'),
          t('Cinq', 'Five'),
          t('Autant qu’on veut', 'As many as you like'),
        ],
      ),
      lesson(
        t('Produire en série', 'Producing in batches'),
        t(
          'Thème, texte, design, déclinaisons : la méthode batch permet de produire vite sans perdre en qualité, et de travailler sereinement avec les retours du client.',
          'Theme, copy, design, variations: the batch method lets you produce fast without losing quality, and handle client feedback calmly.',
        ),
        t(
          'Déclinez une série de 6 visuels à partir d’un modèle.',
          'Create a series of 6 visuals from one template.',
        ),
        t(
          'Quel est l’ordre de la méthode batch ?',
          'What is the batch method order?',
        ),
        [
          t(
            'Thème, texte, design, déclinaisons',
            'Theme, copy, design, variations',
          ),
          t('Design, puis on verra', 'Design, then we’ll see'),
          t('Déclinaisons d’abord', 'Variations first'),
        ],
      ),
    ],
  },
  {
    slug: 'creation-contenu-ia',
    title: t(
      'Création de contenu & IA — Intensif',
      'Content creation & AI — Intensive',
    ),
    category: t('Vidéo', 'Video'),
    track: tracks.intensive,
    level: levels.all,
    hours: 12,
    format: t('3 semaines · 6 séances de 2 h', '3 weeks · 6 sessions of 2 h'),
    goal: t(
      'Transformer son smartphone en studio de production et lancer son activité de créateur.',
      'Turn your smartphone into a production studio and launch your creator business.',
    ),
    why: t(
      'Domptez l’IA : passez de créateur de contenu à professionnel rentable en trois semaines.',
      'Tame AI: go from content creator to profitable professional in three weeks.',
    ),
    project: t(
      'Un plan de communication complet pour un client : calendrier, visuels, vidéos et stratégie IA.',
      'A complete communication plan for a client: calendar, visuals, videos and AI strategy.',
    ),
    program: [
      t(
        'Semaine 1 · Visuels avec Canva et l’IA',
        'Week 1 · Visuals with Canva and AI',
      ),
      t(
        'Semaine 2 · Montage mobile avec CapCut et l’IA',
        'Week 2 · Mobile editing with CapCut and AI',
      ),
      t(
        'Semaine 3 · Marketing digital et lancement en freelance',
        'Week 3 · Digital marketing and going freelance',
      ),
      t(
        'Bonus · Ebook IA & création de contenu',
        'Bonus · AI & content creation ebook',
      ),
    ],
    outcomes: [
      t('Un portfolio de 5 visuels', 'A portfolio of 5 visuals'),
      t('Un spot publicitaire de 30 secondes', 'A 30-second ad spot'),
      t(
        'Votre offre de services et votre brandbook personnel',
        'Your service offer and personal brandbook',
      ),
    ],
    photo: photos.socialNight,
    lessons: [
      lesson(
        t('Visuels chocs avec l’IA', 'Striking visuals with AI'),
        t(
          'Canva et ses outils IA génèrent images, arrière-plans et pistes de logo. On garde la main sur la composition, les couleurs et la typographie.',
          'Canva and its AI tools generate images, backgrounds and logo ideas. You stay in charge of composition, colour and type.',
        ),
        t(
          'Créez 3 posts Facebook et 2 posts LinkedIn.',
          'Create 3 Facebook posts and 2 LinkedIn posts.',
        ),
        t(
          'Qui décide de la composition finale ?',
          'Who decides the final composition?',
        ),
        [t('Vous', 'You'), t('L’IA', 'The AI'), t('Le hasard', 'Chance')],
      ),
      lesson(
        t('Vidéos virales et rentables', 'Viral, profitable videos'),
        t(
          'Storytelling court, transitions, sous-titres automatiques et effets IA de CapCut : on produit des Reels et TikTok percutants depuis son téléphone.',
          'Short storytelling, transitions, auto captions and CapCut’s AI effects: produce punchy Reels and TikToks from your phone.',
        ),
        t(
          'Réalisez un spot de 30 secondes pour une entreprise fictive.',
          'Make a 30-second spot for a fictional company.',
        ),
        t(
          'Quel outil sert au montage mobile ?',
          'Which tool is used for mobile editing?',
        ),
        [
          t('CapCut', 'CapCut'),
          t('Un tableur', 'A spreadsheet'),
          t('Un traitement de texte', 'A word processor'),
        ],
      ),
      lesson(
        t('Se lancer en freelance', 'Going freelance'),
        t(
          'Profil LinkedIn optimisé, offre de services claire, prix justifié et brandbook personnel : on se présente comme un professionnel.',
          'An optimised LinkedIn profile, a clear service offer, a justified price and a personal brandbook: present yourself as a professional.',
        ),
        t(
          'Rédigez votre offre de services et fixez vos prix.',
          'Write your service offer and set your prices.',
        ),
        t(
          'Que faut-il pour se présenter en pro ?',
          'What do you need to present yourself as a pro?',
        ),
        [
          t(
            'Une offre claire et un profil soigné',
            'A clear offer and a polished profile',
          ),
          t('Des prix cachés', 'Hidden prices'),
          t('Aucune présentation', 'No introduction'),
        ],
      ),
    ],
  },
  {
    slug: 'motion-design-claude',
    title: t('Motion design avec Claude', 'Motion design with Claude'),
    category: t('IA créative', 'Creative AI'),
    track: tracks.creative,
    level: t('Niveau 3', 'Level 3'),
    format: t('7 parties · 7 prompts maîtres', '7 parts · 7 master prompts'),
    goal: t(
      'Briefer et produire des vidéos SaaS, corporate et cinématiques, du brief au rendu image par image.',
      'Brief and produce SaaS, corporate and cinematic videos, from brief to frame-by-frame render.',
    ),
    why: t(
      'Votre valeur se déplace : elle n’est plus dans le geste sur la timeline, mais dans le brief.',
      'Your value moves: it is no longer in the timeline gesture, but in the brief.',
    ),
    project: t(
      'Un film SaaS de 40 secondes traité de bout en bout.',
      'A 40-second SaaS film produced end to end.',
    ),
    program: [
      t(
        'La chaîne : brief, scène programmée, rendu, son, assemblage',
        'The pipeline: brief, coded scene, render, sound, assembly',
      ),
      t('Quatre lexiques pour briefer', 'Four vocabularies to brief'),
      t(
        'Le brief complet et le protocole de captures',
        'The full brief and the screenshot protocol',
      ),
      t(
        'Structure d’une vidéo SaaS de 40 secondes',
        'Structure of a 40-second SaaS video',
      ),
      t(
        'Trois styles de montage et les rushes',
        'Three editing styles and the rushes',
      ),
      t('Sound design seconde par seconde', 'Sound design second by second'),
      t(
        'Corriger, livrer, éviter les dix pièges',
        'Fix, deliver, avoid the ten pitfalls',
      ),
    ],
    outcomes: [
      t('Les 7 prompts maîtres', 'The 7 master prompts'),
      t('Une checklist de production', 'A production checklist'),
      t('Un exercice de validation', 'A validation exercise'),
    ],
    photo: photos.cameraClose,
    lessons: [
      lesson(
        t('Un atelier de rendu', 'A rendering workshop'),
        t(
          'Claude ne déplace pas des calques : il programme une scène où chaque élément est une fonction du temps, puis la rend image par image. Ce qui n’est pas décrit n’existe pas.',
          'Claude does not move layers: it codes a scene where every element is a function of time, then renders it frame by frame. What is not described does not exist.',
        ),
        t(
          'Décrivez une scène de 5 secondes avec ses positions et opacités.',
          'Describe a 5-second scene with its positions and opacities.',
        ),
        t('Où se décide la vidéo ?', 'Where is the video decided?'),
        [
          t('Dans le brief', 'In the brief'),
          t('À la souris', 'With the mouse'),
          t('Au hasard', 'At random'),
        ],
      ),
      lesson(
        t('Le découpage temporel', 'The time breakdown'),
        t(
          'Une vidéo SaaS de 40 secondes se découpe en scènes avec leurs secondes : accroche, problème, produit, preuve, appel à l’action. À 30 images par seconde, cela fait 1 200 images.',
          'A 40-second SaaS video breaks into timed scenes: hook, problem, product, proof, call to action. At 30 frames per second, that is 1,200 frames.',
        ),
        t(
          'Découpez votre film en scènes avec leurs secondes.',
          'Break your film into timed scenes.',
        ),
        t(
          'Combien d’images pour 40 s à 30 i/s ?',
          'How many frames for 40 s at 30 fps?',
        ),
        [t('1 200', '1,200'), t('400', '400'), t('30', '30')],
      ),
      lesson(
        t('La bande son écrite', 'The written soundtrack'),
        t(
          'Whoosh, impacts, nappes : chaque effet est fabriqué et placé à une seconde précise. La bande son s’écrit au même titre que l’image.',
          'Whooshes, impacts, pads: each effect is made and placed at a precise second. The soundtrack is written just like the image.',
        ),
        t(
          'Placez cinq effets sonores sur votre découpage.',
          'Place five sound effects on your breakdown.',
        ),
        t('Comment naît la bande son ?', 'How is the soundtrack made?'),
        [
          t('Elle est écrite et synthétisée', 'It is written and synthesised'),
          t('Elle est téléchargée au hasard', 'It is downloaded at random'),
          t('Elle est facultative', 'It is optional'),
        ],
      ),
    ],
  },
  {
    slug: 'garder-le-meme-visage',
    title: t('Garder le même visage', 'Keeping the same face'),
    category: t('IA créative', 'Creative AI'),
    track: tracks.creative,
    level: levels.adv,
    format: t(
      '7 modules · prompts de référence',
      '7 modules · reference prompts',
    ),
    goal: t(
      'Générer images, vidéos et signatures d’un sujet réel sans jamais déformer son visage.',
      'Generate images, videos and signatures of a real person without ever distorting their face.',
    ),
    why: t(
      'Un visage ne se décrit pas, il se montre : moins l’outil voit, plus il invente.',
      'A face is not described, it is shown: the less the tool sees, the more it invents.',
    ),
    project: t(
      'Une image fidèle, son clip court et la signature visuelle d’un sujet réel.',
      'A faithful image, its short clip and the visual signature of a real subject.',
    ),
    program: [
      t('La carte visuelle du sujet', 'The subject’s visual map'),
      t(
        'Ranger la carte pour toute l’équipe',
        'Organising the map for the whole team',
      ),
      t('Le prompt en six blocs', 'The six-block prompt'),
      t(
        'Replacer le sujet dans un nouvel environnement',
        'Placing the subject in a new environment',
      ),
      t('La grille des huit points', 'The eight-point grid'),
      t('De l’image à la vidéo', 'From image to video'),
      t('La signature visuelle du sujet', 'The subject’s visual signature'),
    ],
    outcomes: [
      t(
        'Une méthode de contrôle géométrique',
        'A geometric quality-control method',
      ),
      t('Des prompts de référence', 'Reference prompts'),
      t('Une pièce de communication signée', 'A signed communication piece'),
    ],
    photo: photos.portraitGold,
    lessons: [
      lesson(
        t('Pourquoi un visage se déforme', 'Why a face gets distorted'),
        t(
          'L’outil reconstruit un visage plausible : une seule photo, une photo floue ou une description en mots, et il invente un visage moyen, plus jeune et plus lisse.',
          'The tool rebuilds a plausible face: one photo, a blurry photo or a verbal description, and it invents an average, younger, smoother face.',
        ),
        t(
          'Constituez une carte visuelle de 10 vues d’un même sujet.',
          'Build a 10-view visual map of one subject.',
        ),
        t('Comment éviter qu’il invente ?', 'How do you stop it inventing?'),
        [
          t(
            'Lui montrer plusieurs vues du sujet',
            'Show it several views of the subject',
          ),
          t(
            'Décrire le visage avec des adjectifs',
            'Describe the face with adjectives',
          ),
          t('Utiliser une seule photo', 'Use a single photo'),
        ],
      ),
      lesson(
        t('Les distances avant la peau', 'Distances before skin'),
        t(
          'On reconnaît une personne d’abord aux distances entre ses traits, puis à son asymétrie et à ses signes particuliers. Nos contrôles sont géométriques, jamais esthétiques.',
          'We recognise someone first by the distances between features, then by asymmetry and distinctive marks. Our checks are geometric, never aesthetic.',
        ),
        t(
          'Contrôlez une image générée avec la grille des huit points.',
          'Check a generated image with the eight-point grid.',
        ),
        t('Qu’est-ce qui compte le plus ?', 'What matters most?'),
        [
          t('Les distances entre les traits', 'The distances between features'),
          t('La couleur de peau', 'Skin colour'),
          t('Le maquillage', 'Make-up'),
        ],
      ),
      lesson(
        t('Un changement à la fois', 'One change at a time'),
        t(
          'Décor, tenue, lumière, époque : on change un seul élément coûteux à la fois pour préserver le visage, puis on anime l’image en clip court.',
          'Setting, outfit, light, era: change one costly element at a time to preserve the face, then animate the image into a short clip.',
        ),
        t(
          'Replacez votre sujet dans un nouveau décor sans toucher au visage.',
          'Place your subject in a new setting without touching the face.',
        ),
        t(
          'Combien de changements coûteux à la fois ?',
          'How many costly changes at once?',
        ),
        [
          t('Un seul', 'Just one'),
          t('Tous', 'All of them'),
          t('Trois', 'Three'),
        ],
      ),
    ],
  },
  {
    slug: 'court-metrage-ia',
    title: t('Faire un court-métrage avec l’IA', 'Making a short film with AI'),
    category: t('IA créative', 'Creative AI'),
    track: tracks.creative,
    level: t('Niveau 2', 'Level 2'),
    format: t(
      '8 étapes · un film de 85 s en exemple',
      '8 steps · an 85-second example film',
    ),
    goal: t(
      'Mener un court-métrage de l’écriture à la copie finale, avec des personnages dont on maîtrise le visage.',
      'Take a short film from script to final cut, with characters whose faces stay consistent.',
    ),
    why: t(
      'Un court-métrage IA se gagne avant la génération : on sait tenir un visage quatre secondes, alors on écrit des plans de quatre secondes.',
      'An AI short film is won before generation: we can hold a face for four seconds, so we write four-second shots.',
    ),
    project: t(
      '« Le Virage », un film de 85 secondes traité en exemple.',
      '“Le Virage”, an 85-second film used as the worked example.',
    ),
    program: [
      t('Écrire pour l’IA', 'Writing for AI'),
      t('Les bibles personnages et décors', 'Character and set bibles'),
      t(
        'Le découpage et le cahier de continuité',
        'Shot list and continuity log',
      ),
      t('Les images-clés', 'Key frames'),
      t('L’animation plan par plan', 'Shot-by-shot animation'),
      t('Le son', 'Sound'),
      t('Montage et étalonnage', 'Editing and grading'),
      t('Livrer et protéger', 'Delivering and protecting'),
    ],
    outcomes: [
      t('Un pack film archivé', 'An archived film pack'),
      t('Les prompts de chaque étape', 'The prompts for each step'),
      t('Les droits sur voix et visages', 'Rights over voices and faces'),
    ],
    photo: photos.podcastNeon,
    lessons: [
      lesson(
        t('Écrire en plans de 4 secondes', 'Writing in 4-second shots'),
        t(
          'Un plan, une action, une idée. Les émotions en gros plan, l’action en plan large, et des ellipses pour ce qui coûte cher. 90 secondes, c’est 20 à 25 plans.',
          'One shot, one action, one idea. Emotions in close-up, action in wide shots, ellipses for what is costly. 90 seconds is 20 to 25 shots.',
        ),
        t(
          'Découpez une scène d’une minute en plans de 4 secondes.',
          'Break a one-minute scene into 4-second shots.',
        ),
        t(
          'Combien de plans pour 90 secondes ?',
          'How many shots for 90 seconds?',
        ),
        [t('20 à 25', '20 to 25'), t('3', '3'), t('200', '200')],
      ),
      lesson(
        t('Les quatre continuités', 'The four continuities'),
        t(
          'Personnage, décor, lumière et sens de l’écran doivent tenir d’un plan à l’autre. Les bibles et le cahier de continuité les verrouillent avant la génération.',
          'Character, set, light and screen direction must hold from shot to shot. Bibles and the continuity log lock them in before generation.',
        ),
        t(
          'Rédigez la bible d’un personnage et d’un décor.',
          'Write a character bible and a set bible.',
        ),
        t(
          'Quand verrouille-t-on la continuité ?',
          'When is continuity locked?',
        ),
        [
          t('Avant la génération', 'Before generation'),
          t('Au montage seulement', 'Only in the edit'),
          t('Jamais', 'Never'),
        ],
      ),
      lesson(
        t('Le budget de génération', 'The generation budget'),
        t(
          'Un quart du temps en préparation, la moitié en génération, un quart en finition. Comptez 4 à 6 générations par plan retenu, davantage en gros plan.',
          'A quarter of the time in preparation, half in generation, a quarter in finishing. Count 4 to 6 generations per shot kept, more for close-ups.',
        ),
        t(
          'Estimez le budget de génération de votre film.',
          'Estimate your film’s generation budget.',
        ),
        t(
          'Combien de générations par plan retenu ?',
          'How many generations per shot kept?',
        ),
        [t('4 à 6', '4 to 6'), t('1', '1'), t('50', '50')],
      ),
    ],
  },
];

applyPublished(courses, 'academy', 'courses');

export const courseCategories = [...new Set(courses.map((c) => c.category))];

/** Offres entreprises : parcours issus du catalogue, adaptables. */
export const corporateOffers = [
  {
    slug: 'parcours-complet',
    title: t(
      'Parcours complet marketing digital',
      'Full digital marketing track',
    ),
    format: t('8 modules · 11 jours · 77 h', '8 modules · 11 days · 77 h'),
    copy: t(
      'Du fondamental à l’expert : stratégie, rédaction, Canva, Meta, vidéo, IA, prompts et gestion de crise.',
      'From foundation to expert: strategy, writing, Canva, Meta, video, AI, prompts and crisis management.',
    ),
    photo: photos.academyRoom,
  },
  {
    slug: 'parcours-institutionnel',
    title: t(
      'Parcours communication institutionnelle',
      'Institutional communication track',
    ),
    format: t(
      '8 semaines · 3 jours par semaine · 64 h',
      '8 weeks · 3 days a week · 64 h',
    ),
    copy: t(
      'Conçu pour les cadres d’administrations et d’institutions : séances de 1 à 3 h, évaluation finale et remise des certificats.',
      'Designed for managers in administrations and institutions: 1- to 3-hour sessions, a final assessment and certificates.',
    ),
    photo: photos.learnerFocus,
  },
  {
    slug: 'intensif-equipe',
    title: t(
      'Intensif création de contenu & IA',
      'Content creation & AI intensive',
    ),
    format: t('3 semaines · 6 séances de 2 h', '3 weeks · 6 sessions of 2 h'),
    copy: t(
      'Pour les équipes marketing et communication : visuels, vidéo mobile, plan de contenu et usage encadré de l’IA.',
      'For marketing and communication teams: visuals, mobile video, content planning and supervised AI use.',
    ),
    photo: photos.learnerDesk,
  },
  {
    slug: 'sur-mesure',
    title: t('Formation sur mesure', 'Tailored training'),
    format: t('Présentiel, en ligne ou hybride', 'In person, online or hybrid'),
    copy: t(
      'Nous composons le programme à partir de vos outils, de votre niveau et des résultats attendus.',
      'We build the programme around your tools, your level and the results you expect.',
    ),
    photo: photos.meeting,
  },
];

export const corporateSteps = [
  [
    t('Diagnostic', 'Diagnosis'),
    t(
      'Niveau actuel, outils utilisés, public à former et résultats attendus.',
      'Current level, tools in use, people to train and expected results.',
    ),
  ],
  [
    t('Programme', 'Programme'),
    t(
      'Modules choisis, planning adapté à vos disponibilités, volume horaire par séance.',
      'Chosen modules, a schedule fitted to your availability, hours per session.',
    ),
  ],
  [
    t('Formation', 'Training'),
    t(
      'Cours pratiques, exercices sur vos propres contenus, supports PDF.',
      'Hands-on sessions, exercises on your own content, PDF materials.',
    ),
  ],
  [
    t('Évaluation & suivi', 'Assessment & follow-up'),
    t(
      'Projets finaux, certificats Smartsell et 30 jours de suivi.',
      'Final projects, Smartsell certificates and 30 days of follow-up.',
    ),
  ],
];

applyPublished(corporateOffers, 'academy', 'offers');
