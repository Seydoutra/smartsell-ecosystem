import { applyPublished } from './publishing';
import type { VerticalId } from '@smartsell/types';
import type { Block, SitePageData } from './sites.fr';
// English edition of the site registry. Slugs and paths stay identical to
// the French edition so that both languages share the same structure.
import { courses } from './academy';
import { brands, films } from './portfolio';
export { courses };
export const agencyServices = [
  [
    'strategie',
    'Brand strategy',
    'Clarify your audience, your positioning and your value proposition.',
    'Discovery interviews|Audience map|Brand platform',
  ],
  [
    'branding',
    'Identity & branding',
    'Create a visual language people recognise, from first contact to everyday use.',
    'Art direction|Visual identity|Brand guidelines',
  ],
  [
    'marketing',
    'Digital marketing',
    'Connect your channels to an objective and organise how you measure it.',
    'Channel audit|Campaign plan|Tracking framework',
  ],
  [
    'social-media',
    'Social media',
    'Build a coherent editorial presence and a useful conversation.',
    'Editorial line|Calendar|Post formats',
  ],
  [
    'performance',
    'Campaigns & performance',
    'Prepare targeted campaigns, variations and decision criteria.',
    'Campaign brief|Ad creatives|Measurement plan',
  ],
  [
    'web-design',
    'Web design',
    'Give your website a clear layout and a strong identity.',
    'Page architecture|Responsive mock-ups|Prototype',
  ],
  [
    'web-development',
    'Web development',
    'Turn validated journeys into usable pages and features.',
    'Front-end build|Functional testing|Documentation',
  ],
  [
    'applications',
    'Applications',
    'Design a tool shaped around the tasks of your team or your audience.',
    'Functional scoping|Journeys|Testable version',
  ],
  [
    'product-design',
    'Product design',
    'Define a product around a use, then test its assumptions.',
    'Prioritisation|Prototype|Test plan',
  ],
  [
    'ui-ux',
    'UI & UX',
    'Make every step clear and bring consistency to your interfaces.',
    'Needs research|Journeys|Components',
  ],
  [
    'video',
    'Film & video',
    'Tell an idea with intention, rhythm and images.',
    'Synopsis|Shoot preparation|Editing',
  ],
  [
    'photographie',
    'Photography',
    'Compose a series of images for a brand, a product or a story.',
    'Moodboard|Shot list|Selection',
  ],
  [
    'contenus',
    'Content creation',
    'Organise ideas and adapt them to the right media.',
    'Editorial angle|Copy|Format kit',
  ],
  [
    'ia-automatisation',
    'AI & automation',
    'Identify repetitive tasks and design a journey with human control.',
    'Process map|Prototype|Validation rules',
  ],
  [
    'crm',
    'CRM & operations',
    'Connect contact tracking to your teams’ daily work.',
    'Process map|Tracking structure|Support',
  ],
  [
    'croissance',
    'Business growth',
    'Align your offer, your communication and your sales journey.',
    'Diagnosis|Priorities|Action plan',
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
    category: 'Identity',
    tagline: 'A bookshop that opens the field.',
    challenge:
      'A fictional independent bookshop wants to connect its reading, its workshops and its events.',
    direction:
      'A modular grid, a deep purple and reading cues create an identity that moves from poster to screen.',
    deliverables: [
      'Brand platform',
      'Typographic system',
      'Posters & launch page',
    ],
    mark: 'K',
  },
  {
    slug: 'noura',
    title: 'Noura',
    category: 'Web',
    tagline: 'The gesture before the words.',
    challenge:
      'A fictional craft brand needs to explain its know-how and present its collections.',
    direction:
      'A journey focused on materials, gestures and details, with a clear page for every object.',
    deliverables: ['Site architecture', 'Art direction', 'Mobile prototype'],
    mark: 'n.',
  },
  {
    slug: 'axis',
    title: 'Axis',
    category: 'Product',
    tagline: 'The collective, in motion.',
    challenge:
      'A fictional sports collective wants its workshops to be easy to understand and to join.',
    direction:
      'A simple calendar, one page per activity and a selection journey that avoids repeating information.',
    deliverables: ['Booking journey', 'Design system', 'Interactive prototype'],
    mark: '',
  },
  {
    slug: 'sillage',
    title: 'Sillage',
    category: 'Campaign',
    tagline: 'A story that carries on.',
    challenge:
      'A fictional cultural event needs a campaign that gives every discipline its place.',
    direction:
      'A shared signature and graphic variations for each discipline create a campaign that can be adapted.',
    deliverables: ['Campaign concept', 'Posters', 'Social media kit'],
    mark: 'S/',
  },
  {
    slug: 'forma',
    title: 'Forma',
    category: 'Image',
    tagline: 'Let the material speak.',
    challenge:
      'A fictional furniture workshop wants to present its pieces with a coherent series of images.',
    direction:
      'A production plan combines wide views, textures and making details. Here the gallery illustrates this direction with graphic compositions.',
    deliverables: ['Moodboard', 'Shot plan', 'Catalogue direction'],
    mark: 'F',
  },
  {
    slug: 'relay',
    title: 'Relay',
    category: 'Automation',
    tagline: 'Less friction. More follow-through.',
    challenge:
      'A small fictional team copies its contact requests into several tools.',
    direction:
      'A prototype connects the request, its sorting and the preparation of a reply. A human validates every message.',
    deliverables: ['Workflow map', 'Prototype', 'Handover documentation'],
    mark: 'R',
  },
];
export const articles = [
  [
    'une-marque-est-un-systeme',
    'Design',
    'A brand is a system, not a poster.',
    'An identity draws its strength from details you meet again and again.',
    'A poster can catch the eye. An identity also has to work on a quote, on a phone screen and in a message. Start by listing those situations before choosing a form.',
    'Define a few rules for type, colour and space. Test them on very different media. If every adaptation means reinventing everything, the system deserves to be simplified.',
  ],
  [
    'brief-qui-ouvre',
    'Marketing',
    'The brief that opens possibilities.',
    'Ask the right questions before requesting a creative piece.',
    'A useful brief explains the audience, the problem and the action you hope for. The list of formats comes later. Saying “we want a video” describes a medium; saying why the audience should watch it gives a direction.',
    'Separate fixed constraints from ideas to explore. Note the missing information and the person who will validate the choices. This small effort makes every exchange more precise.',
  ],
  [
    'ia-premier-brouillon',
    'AI',
    'AI and the first draft.',
    'Speed up the start while keeping your judgement.',
    'A first draft can help you compare angles or spot what you want to avoid. For this work, use information you are allowed to share and ask for several proposals under the same constraints.',
    'Reread each proposal against the brief. Check the facts before keeping a phrase. The quality of the result also depends on the work of selecting and revising.',
  ],
  [
    'site-mobile',
    'Tech',
    'Design the mobile journey first.',
    'See what matters when space is limited.',
    'On a phone, a page quickly reveals its priorities. The title must help people understand the subject, the links must help them find what comes next and the forms must let them move on without hesitation.',
    'Sketch the journey in a single column. Then widen the layout for desktop. Check both versions by following a complete task rather than only looking at the first screen.',
  ],
  [
    'apprendre-par-projet',
    'Creative',
    'Learn through a real project.',
    'Turn a course into an exercise you can discuss.',
    'A project gives you a reason to use what you learn. A workshop can aim for a poster, an editorial calendar or a prototype rather than a series of tools to discover.',
    'Keep the project small enough to finish. Make a first version, ask for precise feedback and improve one point. Documenting that change helps you understand your progress.',
  ],
  [
    'podcast-preparation',
    'Creative',
    'A podcast starts before the microphone.',
    'Intention and preparation matter as much as the set.',
    'Write the central question of the episode. Prepare a few follow-ups and the information that needs checking. A running order keeps a direction while leaving room for conversation.',
    'Plan what comes next too: title, summary, clip and visual. One episode can feed several formats if those uses are anticipated from the recording.',
  ],
  [
    'petite-entreprise-outils',
    'Business',
    'Choosing a tool for a small team.',
    'Start from the real work, then compare features.',
    'List the tasks that cost time and the information the team shares. A tool should solve an identifiable problem. A long list of features does not tell you whether colleagues will use it.',
    'Test an everyday case with the people involved. Check data migration, responsibilities and documentation. A gradual rollout lets you observe the difficulties.',
  ],
  [
    'conakry-angle-editorial',
    'Guinea',
    'Conakry as an editorial starting point.',
    'A place can be an angle without becoming a label.',
    'Telling a project from Conakry means describing the people, the uses and the contexts that make it concrete. A place can shed light on a story, but it does not replace the facts.',
    'An editorial approach starts with questions and sources. This page is an example of an editorial line; it does not present completed reporting or verified news.',
  ],
  [
    'entreprendre-petit',
    'Startups',
    'Start small to learn fast.',
    'Give an idea a form you can test.',
    'An idea becomes easier to discuss once it takes the form of a journey or a prototype. Choose a precise situation and a person who could use the solution.',
    'Decide what you want to learn before the test. The questions, hesitations and mistakes you observe are often more useful than general enthusiasm.',
  ],
  [
    'campagne-question',
    'Marketing',
    'One campaign. One clear question.',
    'Link measurement to a decision.',
    'Before launching a campaign, write down the decision you want to inform. Do two messages answer the same need? Does a channel reach the audience you have in mind?',
    'Measurement must stay tied to that question. Note the period, the conditions and the limits. A single figure rarely explains why someone acts.',
  ],
  [
    'design-et-contrainte',
    'Design',
    'Constraint as creative material.',
    'Work with a format, a budget and a context.',
    'A constraint can guide a choice. A poster must be read from a distance; a mobile medium must keep clear landmarks; an identity must be easy to reproduce.',
    'Tell apart what limits the use from what only limits your first idea. Exploring several compositions within the same frame can open unexpected solutions.',
  ],
  [
    'donnees-avant-graphiques',
    'Tech',
    'Data before charts.',
    'Understand what one row represents.',
    'Before creating a dashboard, describe the units, the period and the available columns. An amount without a currency or a date without context can lead to a misleading reading.',
    'Document missing values and categories. This preparation makes charts easier to explain and decisions easier to discuss.',
  ],
  [
    'portrait-questions',
    'Interviews',
    'Prepare an interview that leaves room for a voice.',
    'A question guide for creators.',
    'An open question invites the person to describe a gesture, a decision or a difficulty. “How did you make that choice?” can open more than asking for a general opinion.',
    'This text is an interview guide, not an interview that took place. Prepare follow-ups, check quotes and tell the person in which formats their words will be used.',
  ],
  [
    'afrique-contextes',
    'Africa',
    'Talk about contexts, in the plural.',
    'Give stories the precision they deserve.',
    'A project takes shape in a city, a team and a particular use. Describing those elements avoids reducing different situations to a single narrative.',
    'For each story, ask where the facts were observed and who can explain them. That precision gives the story reach without making it say more than it knows.',
  ],
  [
    'portfolio-demarche',
    'Creative',
    'A portfolio can show the process.',
    'Explain the choices as much as the result.',
    'A final image does not always tell the original problem. Present the context, the constraints and the decisions that shaped your work.',
    'Clearly separate commissioned work from personal concepts. A concept can demonstrate a skill; it is stronger when described for what it is.',
  ],
  [
    'automatisation-humaine',
    'AI',
    'Automation and the checkpoint.',
    'Decide where a person must step in.',
    'Map the steps of a repetitive task. Spot the information you need and the situations that call for judgement. Automation can prepare work before handing it over.',
    'Define the person in charge, the validation point and how to correct an error. A useful system must also make its limits visible.',
  ],
  [
    'calendrier-realiste',
    'Business',
    'A schedule that leaves room.',
    'Plan the work without erasing the unexpected.',
    'A useful schedule includes approvals and conversations, not only production. Note who decides and what information is expected at each step.',
    'Plan time for revisions. A deliverable that arrives too late to be discussed can shift the rest of the project. The schedule is also a tool for conversation.',
  ],
  [
    'transmettre-outil',
    'Tech',
    'Hand over a tool, hand over its mastery.',
    'Documentation is part of the delivery.',
    'A tool must be understandable by the people who will use it and make it evolve. Documentation can start with a few daily tasks and examples of corrections.',
    'Add the people in charge, the known limits and the configuration decisions. A demonstration followed by practice helps check understanding.',
  ],
  [
    'mouvement-utile',
    'Opinions',
    'Motion must serve an idea.',
    'A good animation also knows how to step back.',
    'A transition can connect two states or draw attention to a change. If everything moves at once, reading loses its landmarks.',
    'Choose one main movement and keep interactions short. Planning a reduced-motion version is part of designing the experience, not a late fix.',
  ],
  [
    'creer-ensemble',
    'Opinions',
    'Creating together needs a shared language.',
    'Clarify the words before multiplying deliverables.',
    'The word “modern” can mean a typeface, a journey or a mood. Ask for examples and explain what each choice should allow the visitor to do.',
    'A shared vocabulary makes feedback more useful. Talk about readability, hierarchy, rhythm and expected action rather than only asking whether a page looks good.',
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
    title: 'Podcast studio',
    copy: 'A hushed set for your shows, interviews and videocasts, filmed with multiple cameras.',
    equipment: [
      'Broadcast microphones',
      '3-camera capture',
      'Studio lighting',
      'Headphone monitoring',
    ],
    use: 'Podcast · Interview · Videocast',
    symbol: '',
  },
  {
    slug: 'photo',
    title: 'Photo studio',
    copy: 'A studio equipped for portraits, fashion and products, with interchangeable backdrops.',
    equipment: [
      'White, black, red and green backdrops',
      'Flashes and softboxes',
      'Product table',
      'Make-up corner',
    ],
    use: 'Portrait · Fashion · Product',
    symbol: '',
  },
  {
    slug: 'video',
    title: 'Video set',
    copy: 'A flexible set for talking heads, brand films and short-form content.',
    equipment: [
      'Shooting frame',
      'Continuous lighting',
      'Video monitoring',
      'Teleprompter',
    ],
    use: 'Corporate · Creative · Reels',
    symbol: '',
  },
];
export const packs = [
  {
    slug: 'podcast-brut',
    family: 'podcast',
    title: 'Raw podcast',
    space: 'podcast',
    duration: 1,
    best: false,
    copy: 'Raw recording, files ready to edit.',
    includes: [
      'Fully equipped studio',
      'Studio operator',
      'Multi-camera capture (3 cameras)',
    ],
    deliverable: 'The raw audio and video files of your episode.',
  },
  {
    slug: 'podcast-montage',
    family: 'podcast',
    title: 'Podcast + editing',
    space: 'podcast',
    duration: 1,
    best: true,
    copy: 'Our most popular option: your episode edited and ready to publish.',
    includes: [
      'Everything in raw podcast',
      'Episode editing',
      'Audio mixing',
      'Colour grading',
    ],
    deliverable: 'A final edited episode, in video and audio.',
  },
  {
    slug: 'podcast-reels',
    family: 'podcast',
    title: 'Podcast + editing + Reels',
    space: 'podcast',
    duration: 1,
    best: false,
    copy: 'The edited episode and vertical clips for social media.',
    includes: [
      'Everything in podcast + editing',
      'Edited vertical Reels',
      'Promo teaser',
      'Dynamic captions',
    ],
    deliverable: 'The final episode and a series of ready-to-post Reels.',
  },
  {
    slug: 'shooting-pro',
    family: 'shooting',
    title: 'Professional shoot',
    space: 'photo',
    duration: 1,
    best: false,
    copy: 'A professional photo session for one person: portrait, CV, profile, social media.',
    includes: [
      'Retouched photos',
      'Posing coaching with the photographer',
      'White, black, red or green backdrop',
      'A Reel video of the session',
    ],
    deliverable: 'A selection of retouched portraits, ready to publish.',
  },
  {
    slug: 'shooting-mode',
    family: 'shooting',
    title: 'Fashion shoot',
    space: 'photo',
    duration: 2,
    best: true,
    copy: 'A full session with several outfit changes.',
    includes: [
      'Several outfits',
      'Stylist coaching included',
      'Multiple backdrops',
      'Pro retouched photos',
      'Reel video of the session',
    ],
    deliverable: 'A retouched fashion series and its behind-the-scenes video.',
  },
  {
    slug: 'shooting-produits',
    family: 'shooting',
    title: 'Product shoot',
    space: 'photo',
    duration: 2,
    best: false,
    copy: 'Packshot photos for e-commerce, catalogues and social media.',
    includes: [
      'Professional packshots',
      'Optimal studio lighting',
      'White or custom backdrop',
      'Retouching included',
      'E-commerce formats',
    ],
    deliverable:
      'Retouched product visuals; quote based on the number of products.',
  },
];
export const siteMenus: Record<VerticalId, { label: string; path: string }[]> =
  {
    agency: [
      { label: 'Portfolio', path: 'work' },
      { label: 'Expertise', path: 'services' },
      { label: 'Story', path: 'history' },
      { label: 'Collective', path: 'team' },
      { label: 'Contact', path: 'contact' },
    ],
    academy: [
      { label: 'Courses', path: 'courses' },
      { label: 'Companies', path: 'corporate' },
      { label: 'My space', path: 'dashboard' },
    ],
    media: [
      { label: 'Videos', path: 'videos' },
      { label: 'Articles', path: 'latest' },
      { label: 'Tech & AI', path: 'tech' },
      { label: 'Business', path: 'business' },
      { label: 'Search', path: 'search' },
    ],
    studio: [
      { label: 'Podcast', path: 'podcast' },
      { label: 'Shooting', path: 'shooting' },
      { label: 'Sets', path: 'spaces' },
      { label: 'Packages', path: 'pricing' },
      { label: 'Book', path: 'booking' },
    ],
    labs: [
      { label: 'Products', path: 'products' },
      { label: 'Research', path: 'research' },
      { label: 'AI & automation', path: 'ai' },
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
      'Your data, your choices.',
      'What the site keeps, and what you choose to send us.',
      'story',
      [
        {
          title: 'On your device',
          copy: 'Academy only keeps your courses and completed lessons in your browser; you can clear them from My space. Your choice to pause animations is kept for the browsing session.',
        },
        {
          title: 'Brief and bookings',
          copy: 'The smart brief and Studios booking store nothing on the site: they open WhatsApp with your message ready, and you decide whether to send it.',
        },
        {
          title: 'Hosting & reading',
          copy: 'The site is hosted on GitHub Pages. Smartsell adds no analytics or advertising tool. Your browser loads the site’s resources from that host.',
        },
      ],
    ),
  ];
  if (id === 'agency')
    return [
      p(
        '',
        'Brands that\nmake the move.',
        'Strategy, identity and digital experiences. From Conakry, we give shape to ambitions.',
        'home',
      ),
      p(
        'services',
        'One idea. Every dimension.',
        'From the first question to the last interaction.',
        'services',
      ),
      ...agencyServices.map((s) =>
        p(`services/${s.slug}`, s.title, s.copy, 'story', [
          {
            title: 'What we prepare',
            copy: 'Support built around your context, your audience and your objective.',
            items: s.items,
          },
          {
            title: 'How we work',
            copy: 'Frame the need, explore a direction, build a testable version, then hand over. Scope and approvals are defined together.',
          },
        ]),
      ),
      p(
        'work',
        'The work speaks.',
        'Brand identities, websites, photo shoots and films: a selection of projects made by Smartsell.',
        'work',
      ),
      ...brands.map((b) =>
        p(`work/${b.slug}`, b.name, b.summary, 'brand', [], b.slug),
      ),
      p(
        'history',
        'One house. One continuity.',
        'Smartsell connects the steps that too often stay apart.',
        'story',
        [
          {
            title: 'The intention',
            copy: 'A brand needs a direction, a talent needs skills, a story needs a space to take shape and a team needs tools to move forward.',
          },
          {
            title: 'From Conakry',
            copy: 'Our starting point is Guinea. We design experiences rooted in real uses, able to open conversations beyond the first project.',
          },
          {
            title: 'Five universes',
            copy: 'Agency creates. Academy teaches. Media opens the conversation. Studios gives shape. Labs builds tools. Each site has its own journey; the house connects the skills.',
          },
        ],
      ),
      p(
        'team',
        'Crafts in conversation.',
        'Here the collective is described through its skills. Named profiles will be presented once approved.',
        'story',
        [
          {
            title: 'Strategy & relationships',
            copy: 'Ask the questions, listen to the context, connect decisions to the project’s ambition.',
          },
          {
            title: 'Design & product',
            copy: 'Compose identities and journeys. Make form and use speak to each other.',
          },
          {
            title: 'Development & systems',
            copy: 'Make experiences usable and document how they work.',
          },
          {
            title: 'Image & content',
            copy: 'Prepare the story, organise production and bring consistency to formats.',
          },
        ],
      ),
      p(
        'about',
        'The agency, within the ecosystem.',
        'A partner for creation, strategy and product.',
        'story',
        [
          {
            title: 'Create a direction',
            copy: 'We see a brand as a set of experiences: what you see, what you understand and what you can do.',
          },
          {
            title: 'Go all the way to use',
            copy: 'A project is built in stages, with explicit decisions and a real handover.',
          },
        ],
      ),
      p(
        'careers',
        'Join the conversation.',
        'Introduce your practice, your point of view and the kind of project that interests you.',
        'contact',
      ),
      p(
        'contact',
        'Let’s talk about your next move.',
        'Fill in our smart brief: six steps, and your answers go straight to our WhatsApp.',
        'contact',
      ),
      ...common,
    ];
  if (id === 'academy')
    return [
      p(
        '',
        'Knowledge opens\nthe field.',
        'Hands-on training in digital marketing, design, video and AI.',
        'home',
      ),
      p(
        'courses',
        'Our training courses.',
        'Thirteen hands-on courses, from foundation to expert: strategy, writing, design, social media, video, AI and creative AI.',
        'courses',
      ),
      ...courses.flatMap((c) => [
        p(`courses/${c.slug}`, c.title, c.goal, 'course', [], c.slug),
        p(
          `learn/${c.slug}`,
          c.title,
          'Three practical lessons with quizzes. Your progress shows up in My space.',
          'learn',
          [],
          c.slug,
        ),
      ]),
      p(
        'corporate',
        'Train your teams.',
        'Training tracks for companies, institutions and administrations, built around your tools and your goals.',
        'corporate',
      ),
      p(
        'dashboard',
        'My space.',
        'Find your courses, completed lessons and progress.',
        'dashboard',
      ),
      ...common,
    ];
  if (id === 'media')
    return [
      p(
        '',
        'Smartsell Media.',
        'Videos, reports and ideas: Smartsell’s content platform.',
        'home',
      ),
      p(
        'videos',
        'Our videos.',
        'Music videos, brand films, adverts and fashion: productions signed Smartsell.',
        'videos',
      ),
      ...films.map((f) =>
        p(`video/${f.slug}`, f.title, f.kind, 'film', [], f.slug),
      ),
      p(
        'latest',
        'Articles.',
        'Guides, analyses and opinions on tech, business and creative culture.',
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
            'Artificial intelligence',
            'Startups',
            'Business',
            'Marketing',
            'Creative culture',
            'Africa',
            'Guinea',
            'Opinions',
            'Interviews',
          ][i],
          'Pointers, methods and angles to explore.',
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
        'Find an idea.',
        'Search titles, sections and introductions.',
        'search',
      ),
      p(
        'authors/redaction',
        'The Smartsell newsroom.',
        'Articles written by the Smartsell Media editorial team.',
        'articles',
      ),
      p(
        'newsletter',
        'What’s next, in your inbox.',
        'Get our new videos and articles.',
        'newsletter',
      ),
      ...common,
    ];
  if (id === 'studio')
    return [
      p(
        '',
        'Podcast & photo studio\nin Conakry.',
        'Equipped sets for your podcasts, interviews, photo shoots and brand videos.',
        'home',
      ),
      p(
        'podcast',
        'Podcast studio in Conakry.',
        'An equipped set, multi-camera capture and an operator: come with the idea, leave with the episode.',
        'podcast',
      ),
      p(
        'shooting',
        'Photo studio in Conakry.',
        'Professional shoots in our equipped studio. Three packages: professional, fashion or products.',
        'shooting',
      ),
      p(
        'spaces',
        'Our sets.',
        'Three production spaces, equipped and supported by our technical team.',
        'spaces',
      ),
      ...spaces.map((s) =>
        p(
          `spaces/${s.slug}`,
          s.title,
          s.copy,
          'space',
          [
            { title: 'Equipment', copy: s.use, items: s.equipment },
            {
              title: 'Prepare your session',
              copy: 'Tell us the format, the number of people, the duration and your post-production needs. Our team confirms availability and supports you through to delivery.',
            },
          ],
          s.slug,
        ),
      ),
      p(
        'pricing',
        'Clear packages, no surprises.',
        'Operator and equipment always included. Prices on request, depending on duration and deliverables.',
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
              title: 'Included in the package',
              copy: s.deliverable,
              items: s.includes,
            },
          ],
          s.slug,
        ),
      ),
      p(
        'booking',
        'Book a session.',
        'Pick your package, date and time slot: your request goes straight to our WhatsApp.',
        'booking',
      ),
      p(
        'gallery',
        'Light. Frame. Texture.',
        'Images and films made by our teams.',
        'gallery',
      ),
      p(
        'faq',
        'Before you step into the studio.',
        'Pointers to prepare your session.',
        'faq',
      ),
      p(
        'contact',
        'Let’s talk about your production.',
        'Describe your project: we’ll come back with a proposal.',
        'contact',
      ),
      ...common,
    ];
  return [
    p(
      '',
      'What’s next\nis being built.',
      'Real problems. Useful products. The digital lab of the Smartsell house.',
      'home',
    ),
    p(
      'products',
      'Tools that move work forward.',
      'One existing product and one vision for creators. Two approaches, each clearly labelled.',
      'products',
    ),
    p(
      'products/management',
      'Smartsell Management.',
      'Clients, projects, planning and finances: discover the existing product.',
      'management',
      [
        {
          title: 'Bring operations together',
          copy: 'The Management product has its own website and its own way of working. The link leads to that application.',
        },
        {
          title: 'Continue to the product',
          copy: 'Access to the product, its accounts and its data remain managed within Management.',
        },
      ],
    ),
    p(
      'products/obtura',
      'Obtura. Creative work, connected.',
      'Product vision: a Business OS for photographers, videographers and visual creators.',
      'obtura',
      [
        {
          title: 'An intention',
          copy: 'Connect the steps of a creative project, from first contact to delivery.',
        },
        {
          title: 'Questions to explore',
          copy: 'How do you follow a request? Prepare a production? Find the information you need at each step?',
        },
        {
          title: 'Project status',
          copy: 'The vision is presented here. No launch, price or available feature is announced in this version.',
        },
      ],
    ),
    p(
      'research',
      'Explore to build better.',
      'Three areas of experimentation, presented as working leads.',
      'story',
      [
        {
          title: 'Operations of small teams',
          copy: 'Observe the hand-offs between contacts, projects and follow-up to identify the information that gets lost.',
        },
        {
          title: 'Creative professions',
          copy: 'Explore the steps of a production and the tools that could support their continuity.',
        },
        {
          title: 'Assisted interfaces',
          copy: 'Test drafts and journeys with human validation. No research results or benchmarks are claimed here.',
        },
      ],
    ),
    p(
      'ai',
      'Automate with intention.',
      'Start from a task. Define the limits. Keep control.',
      'story',
      [
        {
          title: 'Map',
          copy: 'Identify the trigger, the useful information and the person in charge.',
        },
        {
          title: 'Prototype',
          copy: 'Test a journey on approved examples before connecting it to real operations.',
        },
        {
          title: 'Validate & hand over',
          copy: 'Make human control explicit, plan for corrections and document how it works.',
        },
      ],
    ),
    p(
      'contact',
      'What problem do you want to solve?',
      'Prepare a message about a product, an experiment or a conversation.',
      'contact',
    ),
    ...common,
  ];
}

applyPublished(agencyServices, 'agency', 'services');
applyPublished(articles, 'media', 'articles');
applyPublished(spaces, 'studio', 'spaces');
applyPublished(packs, 'studio', 'packs');
