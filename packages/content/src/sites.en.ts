import type { VerticalId } from '@smartsell/types';
import type { Block, Course, SitePageData } from './sites.fr';
// English edition of the site registry. Slugs and paths stay identical to
// the French edition so that both languages share the same structure.
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
    title: 'Build your digital strategy',
    category: 'Marketing',
    level: 'Beginner',
    hours: 12,
    goal: 'Move from a scattered presence to a coherent communication plan.',
    project: 'A campaign plan for the launch of a neighbourhood shop.',
    lessons: [
      lesson(
        'Choose an objective',
        'A campaign starts with an expected action: being discovered, getting an appointment or bringing a customer back. For our shop, we choose an in-store visit. That choice guides the message and the channel.',
        'Write one sentence: “We want [audience] to [action] before [deadline].”',
        'Which objective is the most precise?',
        ['Get visits to the shop', 'Be everywhere', 'Have a beautiful brand'],
      ),
      lesson(
        'Connect message and channel',
        'A useful message answers a question from the audience. The shop explains its opening hours and product availability. A calendar organises how often the message returns without posting the same thing every day.',
        'Prepare three posts: discovery, explanation and invitation.',
        'What must an invitation contain?',
        ['A clear action', 'Every service the brand offers', 'Only a logo'],
      ),
      lesson(
        'Read and adjust',
        'Impressions tell you about exposure, reactions tell part of the interest and visits tell you about action. Link each indicator to your objective before changing the campaign.',
        'Create a table with objective, indicator, result and next decision.',
        'Why track an indicator?',
        ['To make a decision', 'To fill in a report', 'To guarantee a result'],
      ),
    ],
  },
  {
    slug: 'community-management',
    title: 'Grow a community',
    category: 'Communication',
    level: 'Beginner',
    hours: 10,
    goal: 'Define an editorial line, organise conversations and moderate with care.',
    project: 'An editorial week for a cultural collective.',
    lessons: [
      lesson(
        'Listen before posting',
        'A community grows around shared interests. Collect your audience’s questions and tell useful information, conversation and promotion apart.',
        'Sort six questions from your audience into three themes.',
        'Where should you start?',
        ['The audience’s needs', 'The number of posts', 'The size of the logo'],
      ),
      lesson(
        'Build a calendar',
        'Link each post to a theme, an intention, a format and a person in charge. Keep time to reply rather than only filling the calendar.',
        'Prepare five posts and two moments for replies.',
        'What should you plan after posting?',
        ['The conversation', 'Another ad straight away', 'No follow-up'],
      ),
      lesson(
        'Reply with judgement',
        'A critical comment deserves a factual answer. Never post personal information. If the situation needs individual attention, offer a private exchange with the right person.',
        'Write a reply to a request for information and to a criticism.',
        'Which reflex protects the conversation?',
        [
          'A calm and relevant reply',
          'Revealing the customer’s data',
          'Deleting every criticism',
        ],
      ),
    ],
  },
  {
    slug: 'design-graphique',
    title: 'Give shape to an identity',
    category: 'Design',
    level: 'Beginner',
    hours: 16,
    goal: 'Compose a visual language that works across many media.',
    project: 'A mini identity for an independent bookshop.',
    lessons: [
      lesson(
        'Create hierarchy',
        'Size, contrast and space guide reading. On a bookshop poster, the title announces the subject, the date sets the appointment and the contact gives the next step.',
        'Compose a poster with three levels of reading.',
        'What is hierarchy for?',
        ['Understanding', 'Filling space', 'Adding more fonts'],
      ),
      lesson(
        'Build a system',
        'An identity can combine two typefaces, a few colours and a grid. Simple rules make every medium coherent without making them identical.',
        'Define a palette, two text styles and one margin rule.',
        'What is a visual system?',
        ['Reusable rules', 'A single poster', 'An effect copied everywhere'],
      ),
      lesson(
        'Adapt and check',
        'A visual must stay readable in context. Check your poster small, on a phone and in greyscale to spot the elements that disappear.',
        'Adapt your poster into a square post and a banner.',
        'What should you check before delivery?',
        [
          'Readability at real sizes',
          'Only the colours',
          'Only the source file',
        ],
      ),
    ],
  },
  {
    slug: 'ui-ux',
    title: 'Design a useful experience',
    category: 'Product',
    level: 'Intermediate',
    hours: 18,
    goal: 'Move from a user need to a journey prototype.',
    project: 'A prototype for signing up to a workshop.',
    lessons: [
      lesson(
        'Frame the need',
        'Describe the person, their context and the action to complete. A learner wants to know the content, the level and the schedule before choosing a workshop.',
        'Write the journey before, during and after sign-up.',
        'What does a need describe?',
        ['An intention in a context', 'A button colour', 'A page style'],
      ),
      lesson(
        'Structure the journey',
        'Each screen should help people move forward or fix a mistake. A form asks only for what is needed, explains errors and lets people go back without losing their choices.',
        'Sketch three screens: choice, details and summary.',
        'What should happen when there is an error?',
        ['Explain how to fix it', 'Clear the form', 'Hide the button'],
      ),
      lesson(
        'Test a hypothesis',
        'A test observes what someone does when facing a task. Give a neutral instruction, then note the hesitations. Fix the blockers before decorative details.',
        'Have your prototype tested and write down three observations.',
        'What does this test measure?',
        [
          'How well the journey is understood',
          'The designer’s taste',
          'How popular the brand is',
        ],
      ),
    ],
  },
  {
    slug: 'web',
    title: 'Build your first web page',
    category: 'Web',
    level: 'Beginner',
    hours: 20,
    goal: 'Understand the structure of a page and build a responsive presentation.',
    project: 'A presentation page for a personal project.',
    lessons: [
      lesson(
        'Structure the content',
        'A page has a main title, sections and links that announce where they lead. Before coding, write the content and order the information around the visitor’s needs.',
        'Write a title, an introduction and three sections.',
        'Which element gives the main subject?',
        ['The main title', 'A border', 'The background colour'],
      ),
      lesson(
        'Compose for mobile',
        'A layout has to adapt to the available width. On a phone, stack the columns, keep text readable and check that links stay easy to reach.',
        'Sketch the phone and desktop versions of your page.',
        'What should mobile avoid?',
        ['Horizontal overflow', 'Vertical reading', 'Visible links'],
      ),
      lesson(
        'Check the journey',
        'Follow every link and every button. Check the title, the content, the images and keyboard navigation. A finished page is a page whose journey works.',
        'Write a checklist and go through it.',
        'What do you test before publishing?',
        ['The real journey', 'Only the first screen', 'Only the colours'],
      ),
    ],
  },
  {
    slug: 'intelligence-artificielle',
    title: 'Use AI with perspective',
    category: 'AI & data',
    level: 'Beginner',
    hours: 8,
    goal: 'Use an assistant to prepare, compare and revise your work.',
    project:
      'A brief and three message variations for a fictional association.',
    lessons: [
      lesson(
        'Give context',
        'An assistant can produce a plausible answer without having your facts. State the objective, the audience and the information you are allowed to share. Ask it to point out what is missing.',
        'Write a request that includes objective, context and constraints.',
        'Which context should you use?',
        [
          'Information you are allowed to share',
          'Every customer file',
          'An instruction without an objective',
        ],
      ),
      lesson(
        'Compare proposals',
        'Asking for several proposals helps you see the possible choices. Compare them with defined criteria: clarity, tone, relevance and respect for the brief.',
        'Compare three versions of a message with the same criteria.',
        'Who chooses the final proposal?',
        ['The person in charge', 'Always the assistant', 'The longest text'],
      ),
      lesson(
        'Check before sharing',
        'Reread names, dates and claims. Separate what comes from the brief from what needs checking. A draft produced by an assistant is still work to revise.',
        'Mark the claims to verify and rewrite the final message.',
        'What status should the first answer have?',
        ['A draft to review', 'Evidence', 'An automatic publication'],
      ),
    ],
  },
  {
    slug: 'power-bi',
    title: 'Think through a dashboard',
    category: 'AI & data',
    level: 'Intermediate',
    hours: 14,
    goal: 'Prepare the questions and the data of a dashboard to build in Power BI.',
    project: 'Sales tracking for a fictional shop, with no personal data.',
    lessons: [
      lesson(
        'Start from a question',
        'A dashboard answers a management question. Before choosing a chart, ask what the person needs to understand: sales trends, product mix or progress towards a goal.',
        'Write three questions and link one indicator to each.',
        'Where should you start?',
        ['The decision to inform', 'Your favourite chart', 'The colours'],
      ),
      lesson(
        'Describe the data',
        'Say what one row represents: a sale, a product or a day. Document the columns, the units and the missing values before any comparison.',
        'Draw a table of five fictional sales with date, product and amount.',
        'Why document a unit?',
        [
          'To interpret the figure',
          'To decorate the table',
          'To increase the data',
        ],
      ),
      lesson(
        'Present a reading',
        'A chart needs a title, a period and units. Explain what is observed and what remains unknown. The layout should make comparison easy.',
        'Sketch a dashboard with three indicators and a context note.',
        'What must an amount specify?',
        ['Its currency and its period', 'Only its size', 'A visual effect'],
      ),
    ],
  },
  {
    slug: 'creation-video',
    title: 'Tell a story on video',
    category: 'Creative',
    level: 'Beginner',
    hours: 12,
    goal: 'Prepare a short shoot and organise the edit.',
    project: 'A 45-second presentation video for a fictional workshop.',
    lessons: [
      lesson(
        'Write the intention',
        'Decide what viewers should remember and feel. A short format benefits from one central idea. The opening sets the subject, the middle shows and the ending opens an action.',
        'Write a five-sentence synopsis for your workshop.',
        'How many central ideas should you choose here?',
        ['One strong idea', 'Every possible idea', 'None'],
      ),
      lesson(
        'Prepare the shots',
        'A shot list connects image and information. Plan a wide shot, a gesture, a detail and someone speaking. Check the permissions needed for people and places.',
        'Compose a list of six shots with their intention.',
        'What does a shot list prepare?',
        [
          'The images you need',
          'The number of followers',
          'Only the publication',
        ],
      ),
      lesson(
        'Edit for clarity',
        'Assemble the shots according to your story. Sound must stay clear and subtitles readable. Watch the edit once without sound to check what the images say.',
        'Describe your edit order and write the subtitles.',
        'What do you check without sound?',
        ['Visual understanding', 'The music', 'The volume'],
      ),
    ],
  },
];
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
    slug: 'photo',
    title: 'Photo set',
    copy: 'A space designed for portraits, products and brand series.',
    equipment: ['Interchangeable backdrops', 'Lighting area', 'Shooting table'],
    use: 'Portrait · Product · Editorial',
    symbol: '',
  },
  {
    slug: 'video',
    title: 'Video set',
    copy: 'A modular frame for talks, interviews and brand formats.',
    equipment: ['Shooting frame', 'Lighting area', 'Monitoring'],
    use: 'Interview · Corporate · Creative',
    symbol: '',
  },
  {
    slug: 'podcast',
    title: 'Podcast room',
    copy: 'A set proposal for recorded conversations and audio formats.',
    equipment: [
      'Conversation table',
      'Microphone area',
      'Headphone monitoring',
    ],
    use: 'Conversation · Audio · Video',
    symbol: '',
  },
];
export const packs = [
  {
    slug: 'photo',
    title: 'Photo Session',
    space: 'photo',
    duration: 2,
    copy: 'Build a series of portraits or product shots.',
    includes: ['Brief preparation', 'Photo shoot', 'Guided selection'],
    deliverable: 'A selection to be defined with the brief.',
  },
  {
    slug: 'podcast',
    title: 'Podcast',
    space: 'podcast',
    duration: 2,
    copy: 'Give your conversation a shape.',
    includes: ['Running order', 'Audio setup', 'Recording'],
    deliverable: 'A raw episode; editing to be agreed.',
  },
  {
    slug: 'creator',
    title: 'Creator Session',
    space: 'video',
    duration: 3,
    copy: 'Produce several short formats in a single session.',
    includes: ['Format list', 'Set preparation', 'Batch shooting'],
    deliverable: 'Takes to adapt to your editorial plan.',
  },
  {
    slug: 'interview',
    title: 'Corporate Interview',
    space: 'video',
    duration: 2,
    copy: 'Prepare a clear and polished talk.',
    includes: ['Interview guide', 'Image and sound setup', 'Filming session'],
    deliverable: 'One interview; final length to be agreed.',
  },
  {
    slug: 'product',
    title: 'Product Story',
    space: 'photo',
    duration: 3,
    copy: 'Bring materials, use and details to the foreground.',
    includes: ['Moodboard', 'Shot plan', 'Product session'],
    deliverable: 'A series of product views to be defined.',
  },
  {
    slug: 'production',
    title: 'Full production',
    space: 'video',
    duration: 4,
    copy: 'Connect preparation, the set and post-production.',
    includes: ['Synopsis', 'Shoot organisation', 'Edit plan'],
    deliverable: 'A film and its variations, to be scoped.',
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
      { label: 'Sessions', path: 'events' },
      { label: 'Companies', path: 'corporate' },
      { label: 'Instructors', path: 'instructors' },
      { label: 'My space', path: 'dashboard' },
    ],
    media: [
      { label: 'Latest', path: 'latest' },
      { label: 'Tech & AI', path: 'tech' },
      { label: 'Business', path: 'business' },
      { label: 'Creative', path: 'creative' },
      { label: 'Search', path: 'search' },
    ],
    studio: [
      { label: 'Spaces', path: 'spaces' },
      { label: 'Services', path: 'services' },
      { label: 'Packs', path: 'pricing' },
      { label: 'Gallery', path: 'gallery' },
      { label: 'Try a booking', path: 'booking' },
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
      'This demonstration version creates no account and no transaction.',
      'story',
      [
        {
          title: 'On your device',
          copy: 'Academy only keeps the courses you chose and the lessons you finished in your browser. Studios keeps the simulated summary, without personal details. You can clear these items in the related journeys. Your choice to pause animations is kept for the browsing session.',
        },
        {
          title: 'Demonstration forms',
          copy: 'The fields are not sent to Smartsell. Contact drafts can be copied; you choose yourself how to send them.',
        },
        {
          title: 'Hosting & reading',
          copy: 'The site is hosted on GitHub Pages. Smartsell adds no analytics or advertising tool in this version. Your browser loads the site’s resources from that host.',
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
        'The work takes shape.',
        'Six creative explorations to discover our approach. Demonstration concepts, with no client commissions or results claimed.',
        'work',
      ),
      ...cases.map((c) =>
        p(
          `work/${c.slug}`,
          c.title,
          c.tagline,
          'case',
          [
            { title: 'The starting point', copy: c.challenge },
            { title: 'The direction', copy: c.direction },
            {
              title: 'The planned deliverables',
              copy: 'This exploration illustrates a working proposal.',
              items: c.deliverables,
            },
          ],
          c.slug,
        ),
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
        'Prepare a brief. You can copy the message and choose how to send it to us.',
        'contact',
      ),
      ...common,
    ];
  if (id === 'academy')
    return [
      p(
        '',
        'Knowledge opens\nthe field.',
        'Skills to practise. Projects to grow. Your next step starts here.',
        'home',
      ),
      p(
        'courses',
        'Your next playground.',
        'Eight demonstration courses, with objectives, exercises and progress saved on your device.',
        'courses',
      ),
      ...courses.flatMap((c) => [
        p(`courses/${c.slug}`, c.title, c.goal, 'course', [], c.slug),
        p(
          `enroll/${c.slug}`,
          'Take the first step.',
          `Explore the “${c.title}” course as a demonstration. No real enrolment, no payment.`,
          'enroll',
          [],
          c.slug,
        ),
        p(
          `learn/${c.slug}`,
          c.title,
          'Three lessons and a guided project. Your progress stays on this device.',
          'learn',
          [],
          c.slug,
        ),
      ]),
      p(
        'events',
        'Upcoming sessions.',
        'Examples of formats to schedule. Real dates and sign-ups will be announced once approved.',
        'events',
      ),
      p(
        'corporate',
        'Grow skills together.',
        'Build a learning path from your team’s real work situations.',
        'story',
        [
          {
            title: 'Diagnosis',
            copy: 'Identify the tasks, the current practices and the skills to develop.',
          },
          {
            title: 'Workshop',
            copy: 'Choose a shared project, practise the methods, then discuss the choices.',
          },
          {
            title: 'Handover',
            copy: 'Plan follow-up exercises and landmarks to keep the work going.',
          },
        ],
      ),
      p(
        'instructors',
        'Practices worth passing on.',
        'Instructors will be introduced once approved. Discover the planned areas of expertise.',
        'story',
        [
          {
            title: 'Marketing & communication',
            copy: 'Strategy, editorial line and reading campaign results.',
          },
          {
            title: 'Design & product',
            copy: 'Composition, identity systems and journey design.',
          },
          {
            title: 'Web, AI & data',
            copy: 'Hands-on tools, framing questions and checking results.',
          },
          {
            title: 'Image & video',
            copy: 'Intention, set preparation and story building.',
          },
        ],
      ),
      p(
        'dashboard',
        'Your space to move forward.',
        'Demonstration on this device: find the courses you chose and your progress.',
        'dashboard',
      ),
      p(
        'my-courses',
        'My courses.',
        'Pick up where you left off.',
        'dashboard',
      ),
      p(
        'resources',
        'The toolbox.',
        'Templates to copy to frame, practise and review.',
        'story',
        [
          {
            title: 'The one-page brief',
            copy: 'Audience · problem · objective · expected action · constraints · approval.',
          },
          {
            title: 'The practice journal',
            copy: 'What I tried · what I observed · what I will change · what I want to check.',
          },
          {
            title: 'The feedback grid',
            copy: 'Understanding · readability · consistency · next action · point to revisit.',
          },
        ],
      ),
      p(
        'certificates',
        'Demonstration certificates.',
        'Once a course is completed, a progress summary becomes available. It is not an official certification.',
        'certificates',
      ),
      p(
        'support',
        'Need a pointer?',
        'Prepare your question about the content, the level or the course.',
        'contact',
      ),
      ...common,
    ];
  if (id === 'media')
    return [
      p(
        '',
        'Ideas that\nshape what’s next.',
        'Tech, business and creative culture. A view from Conakry, open to what is possible.',
        'home',
      ),
      p(
        'latest',
        'The stream of ideas.',
        'Twenty original editorial examples to explore our line. Demonstration guides and opinions; no real news or interviews claimed.',
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
          'Landmarks, methods and angles to explore. Demonstration articles.',
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
        'Collective byline of the editorial examples in this version.',
        'articles',
      ),
      p(
        'newsletter',
        'What’s next, in your inbox.',
        'Discover the subscription journey. This simulation sends no address.',
        'newsletter',
      ),
      ...common,
    ];
  if (id === 'studio')
    return [
      p(
        '',
        'The idea becomes\na presence.',
        'Image, sound, motion. A production universe for brands, creators and their stories.',
        'home',
      ),
      p(
        'spaces',
        'A frame for every intention.',
        'Three set proposals. Illustrative configurations, to be confirmed before any real booking.',
        'spaces',
      ),
      ...spaces.map((s) =>
        p(
          `spaces/${s.slug}`,
          s.title,
          s.copy,
          'space',
          [
            { title: 'The planned setup', copy: s.use, items: s.equipment },
            {
              title: 'Prepare your session',
              copy: 'Specify the format, the number of people, the duration and your post-production needs. Equipment and availability will be confirmed by the team before any service.',
            },
          ],
          s.slug,
        ),
      ),
      p(
        'services',
        'From the brief to the last frame.',
        'Photo, video, podcast, interviews, creator content and brand production.',
        'story',
        [
          {
            title: 'Photo & products',
            copy: 'Prepare references, build the light and organise the shots.',
          },
          {
            title: 'Video & interviews',
            copy: 'Frame the story, prepare the questions and organise the shoot.',
          },
          {
            title: 'Podcast & conversations',
            copy: 'Build a running order, plan the setup and define the final format.',
          },
          {
            title: 'Corporate & live',
            copy: 'Scope the setup, the speakers and the technical conditions before quoting.',
          },
          {
            title: 'Creators & training',
            copy: 'Put together a production session or a workshop suited to your practice.',
          },
        ],
      ),
      p(
        'pricing',
        'Choose your starting point.',
        'Six illustrative packs. Demonstration durations and scopes; prices on request after scoping.',
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
              title: 'In this proposal',
              copy: `Indicative duration: ${s.duration} h. The final scope will be agreed with you.`,
              items: s.includes,
            },
            { title: 'After the session', copy: s.deliverable },
          ],
          s.slug,
        ),
      ),
      p(
        'booking',
        'Prepare your session.',
        'Simulate a booking journey, from choosing a pack to the summary. No slot is actually reserved.',
        'booking',
      ),
      p(
        'gallery',
        'Light. Frame. Material.',
        'Graphic set studies and production directions. These compositions are not photographs of the premises.',
        'gallery',
      ),
      p(
        'faq',
        'Before stepping on set.',
        'Landmarks to prepare your project.',
        'faq',
      ),
      p(
        'contact',
        'Give us the first shot.',
        'Prepare a production brief and choose how to send it.',
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
