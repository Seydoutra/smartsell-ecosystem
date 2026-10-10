import type { VerticalId } from '@smartsell/types';
import { verticals } from '@smartsell/content';
import {
  agencyServices,
  cases,
  courses,
  articles,
  spaces,
  packs,
  siteMenus,
  type SitePageData,
} from '@smartsell/content/sites';
import {
  assetUrl,
  urlFor,
  routingConfig,
  managementUrl,
} from '@smartsell/routing';
import { Brand } from '../brand';
import { ChangingHeadline, PreviewFrame } from '../experience';
import { MotionLayer } from './motion';
import { MotionText, AgencyRibbon, CampaignVisual } from './visuals';
import { CountUp, PixelMosaic, ScrollLitText } from '../signature';
import { CtaLink, PhotoRail } from '../immersive';
import { photos, type Photo } from '@smartsell/content/photos';
import {
  ArticleSearch,
  Booking,
  Dashboard,
  DemoNote,
  DraftForm,
  Enrollment,
  Gallery,
  Learner,
  Newsletter,
  ShareArticle,
} from './interactions';
const link = (id: VerticalId | 'main', path = '') =>
  urlFor(id, 'fr', path, routingConfig);
const names = {
  agency: 'Agency',
  academy: 'Academy',
  media: 'Media',
  studio: 'Studios',
  labs: 'Labs',
};
function Action({
  id,
  path,
  children,
  secondary = false,
}: {
  id: VerticalId;
  path: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      className={`site-button ${secondary ? 'secondary' : ''}`}
      href={link(id, path)}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
function Header({ id, path }: { id: VerticalId; path: string }) {
  const menu = siteMenus[id];
  return (
    <>
      <a className="site-skip" href="#main">
        Aller au contenu
      </a>
      <div className="ecosystem-bar">
        <div className="site-container">
          <a href={link('main')}>
            LA MAISON SMARTSELL <span aria-hidden="true">↗</span>
          </a>
          <nav aria-label="Les sites Smartsell">
            {verticals.map((v) => (
              <a
                key={v.id}
                href={link(v.id)}
                aria-current={v.id === id ? 'true' : undefined}
              >
                {v.name}
              </a>
            ))}
          </nav>
          <span className="global-location">CONAKRY · GN</span>
        </div>
      </div>
      <header className="site-header">
        <div className="site-container site-header-inner">
          <a
            className="site-identity"
            href={link(id)}
            aria-label={`Smartsell ${names[id]}, accueil`}
          >
            <Brand variant="white" />
            <span>{names[id]}</span>
          </a>
          <nav
            className="desktop-site-menu"
            aria-label={`Navigation ${names[id]}`}
          >
            {menu.map((m) => (
              <a
                key={m.path}
                href={link(id, m.path)}
                aria-current={
                  path === m.path || path.startsWith(m.path + '/')
                    ? 'page'
                    : undefined
                }
              >
                {m.label}
              </a>
            ))}
          </nav>
          <details className="mobile-site-menu">
            <summary>
              Menu <span aria-hidden="true">+</span>
            </summary>
            <nav aria-label={`Menu mobile ${names[id]}`}>
              <a href={link(id)}>Accueil</a>
              {menu.map((m) => (
                <a
                  key={m.path}
                  href={link(id, m.path)}
                  aria-current={path === m.path ? 'page' : undefined}
                >
                  {m.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
function Footer({ id }: { id: VerticalId }) {
  const extras: Record<VerticalId, { label: string; path: string }[]> = {
    agency: [
      { label: 'À propos', path: 'about' },
      { label: 'Rejoindre le collectif', path: 'careers' },
    ],
    academy: [
      { label: 'Ressources', path: 'resources' },
      { label: 'Support', path: 'support' },
    ],
    media: [
      { label: 'Afrique', path: 'africa' },
      { label: 'Guinée', path: 'guinea' },
      { label: 'Opinions', path: 'opinions' },
      { label: 'Entretiens', path: 'interviews' },
      { label: 'Newsletter', path: 'newsletter' },
    ],
    studio: [
      { label: 'Questions fréquentes', path: 'faq' },
      { label: 'Contact', path: 'contact' },
    ],
    labs: [],
  };
  return (
    <footer className="site-footer">
      <div className="site-container footer-upper">
        <div>
          <p className="micro">SMARTSELL {names[id].toUpperCase()}</p>
          <h2>
            La suite commence
            <br />
            <em>avec vous.</em>
          </h2>
          <a
            className="text-link"
            href={link(
              id,
              id === 'academy'
                ? 'courses'
                : id === 'media'
                  ? 'newsletter'
                  : id === 'studio'
                    ? 'booking'
                    : 'contact',
            )}
          >
            Faire le prochain mouvement ↗
          </a>
        </div>
        <nav aria-label="Pages du site">
          {[...siteMenus[id], ...extras[id]].map((m) => (
            <a key={m.path} href={link(id, m.path)}>
              {m.label} ↗
            </a>
          ))}
        </nav>
        <nav aria-label="Continuer dans l’écosystème">
          <span className="micro">UNE MAISON. CINQ SITES.</span>
          {verticals
            .filter((v) => v.id !== id)
            .map((v) => (
              <a key={v.id} href={link(v.id)}>
                {v.name} ↗
              </a>
            ))}
        </nav>
      </div>
      <div className="site-container footer-bottom">
        <a href={link('main')}>
          <Brand variant="white" />
        </a>
        <span>© {new Date().getUTCFullYear()} Smartsell · Conakry</span>
        <a href={link(id, 'privacy')}>Vos données</a>
        <a href="#top">Retour en haut ↑</a>
      </div>
    </footer>
  );
}
function SectionTitle({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="site-section-title" data-reveal>
      <p className="micro">{label}</p>
      <h2>
        <MotionText text={title} />
      </h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}
function HomeHero({ id, page }: { id: VerticalId; page: SitePageData }) {
  const ctas: Record<VerticalId, [string, string, string, string]> = {
    agency: [
      'work',
      'Explorer le portfolio',
      'contact',
      'Parlons de votre projet',
    ],
    academy: [
      'courses',
      'Explorer les modules',
      'dashboard',
      'Ouvrir mon espace démo',
    ],
    media: [
      'latest',
      'Lire les idées',
      'newsletter',
      'Découvrir la newsletter',
    ],
    studio: [
      'spaces',
      'Explorer les espaces',
      'booking',
      'Simuler une session',
    ],
    labs: [
      'products',
      'Découvrir les produits',
      'research',
      'Explorer nos pistes',
    ],
  };
  const c = ctas[id];
  return (
    <section className={`site-hero hero-${id}`}>
      <PixelMosaic tone={id} />
      <div className="sg-hero-veil" aria-hidden="true" />
      <div className="site-container hero-stage">
        <div className="site-hero-copy">
          <p className="micro">
            <span className="signal-dot" /> SMARTSELL {names[id].toUpperCase()}{' '}
            /{' '}
            {id === 'academy'
              ? 'APPRENDRE PAR LA PRATIQUE'
              : id === 'studio'
                ? 'L’ESPACE DES POSSIBLES'
                : id === 'media'
                  ? 'LE REGARD EN MOUVEMENT'
                  : id === 'labs'
                    ? 'BUILD THE NEXT'
                    : 'MAKE THE MOVE'}
          </p>
          <h1>
            <span>{page.title.split('\n')[0]}</span>
            <ChangingHeadline id={id} />
          </h1>
          <p className="hero-lead">{page.intro}</p>
          <div className="site-actions">
            <Action id={id} path={c[0]}>
              {c[1]}
            </Action>
            <Action secondary id={id} path={c[2]}>
              {c[3]}
            </Action>
          </div>
        </div>
        <div className="hero-preview" data-reveal>
          <PreviewFrame id={id} />
        </div>
      </div>
      <div className="site-container hero-foot">
        <span>UNE MAISON. UNE AMBITION.</span>
        <a href="#explore">La suite se découvre ↓</a>
        <span>
          {id === 'agency'
            ? '01'
            : id === 'academy'
              ? '02'
              : id === 'media'
                ? '03'
                : id === 'studio'
                  ? '04'
                  : '05'}{' '}
          / 05
        </span>
      </div>
    </section>
  );
}
const manifestos: Record<
  VerticalId,
  { label: string; text: string; figures: [number, string][] }
> = {
  agency: {
    label: 'MANIFESTE AGENCY',
    text: 'Une marque ne se résume pas à un logo. C’est une direction, une voix et des expériences qui se répondent. Nous relions stratégie, création et technologie pour que chaque point de contact fasse avancer la même ambition.',
    figures: [
      [cases.length, 'Explorations créatives'],
      [agencyServices.length, 'Expertises'],
      [4, 'Étapes de méthode'],
    ],
  },
  academy: {
    label: 'MANIFESTE ACADEMY',
    text: 'Apprendre, c’est faire. Chaque module part d’un objectif clair, passe par des exemples concrets et se termine par un exercice. Les compétences deviennent des réflexes, puis des possibilités.',
    figures: [
      [courses.length, 'Modules'],
      [3, 'Leçons d’aperçu par module'],
      [1, 'Espace de progression'],
    ],
  },
  media: {
    label: 'MANIFESTE MEDIA',
    text: 'Les outils changent, les idées circulent, les histoires comptent. Media observe la technologie, les entreprises et la culture créative pour aider à comprendre ce qui vient, depuis la Guinée et l’Afrique.',
    figures: [
      [articles.length, 'Guides et opinions'],
      [3, 'Grandes rubriques'],
      [1, 'Newsletter'],
    ],
  },
  studio: {
    label: 'MANIFESTE STUDIOS',
    text: 'Une idée mérite un espace pour prendre forme. Image, son, lumière : Studios accompagne les créateurs et les marques de la préparation au rendu, pour que chaque histoire trouve sa présence.',
    figures: [
      [spaces.length, 'Espaces'],
      [packs.length, 'Packs de production'],
      [1, 'Parcours de réservation'],
    ],
  },
  labs: {
    label: 'MANIFESTE LABS',
    text: 'Nous ne faisons pas qu’utiliser la technologie. Nous partons de problèmes réels pour construire des produits utiles aux entreprises et aux créateurs, puis nous les faisons grandir avec leurs usages.',
    figures: [
      [1, 'Produit existant'],
      [1, 'Vision produit'],
      [3, 'Pistes de recherche'],
    ],
  },
};
const rails: Record<VerticalId, { photos: Photo[]; cta: [string, string] }> = {
  agency: {
    photos: [
      photos.teamSofa,
      photos.phonePink,
      photos.portraitWall,
      photos.meeting,
      photos.phoneYellow,
      photos.creator,
      photos.portraitPrint,
    ],
    cta: ['contact', 'Parlons de votre projet'],
  },
  academy: {
    photos: [
      photos.learnerFocus,
      photos.learner,
      photos.teamLaptop,
      photos.learnerDesk,
      photos.portraitPro,
      photos.phoneDesk,
    ],
    cta: ['courses', 'Choisir mon module'],
  },
  media: {
    photos: [
      photos.phoneShop,
      photos.portraitYellow,
      photos.podcastWhite,
      photos.founder,
      photos.portraitTurban,
      photos.partners,
    ],
    cta: ['newsletter', 'Recevoir la newsletter'],
  },
  studio: {
    photos: [
      photos.videoField,
      photos.podcastNeon,
      photos.cameraClose,
      photos.portraitGold,
      photos.videoGimbal,
      photos.podcastLaptop,
      photos.cameraStreet,
    ],
    cta: ['booking', 'Préparer ma session'],
  },
  labs: {
    photos: [
      photos.manager,
      photos.phoneDesk,
      photos.founder,
      photos.meeting,
      photos.learnerFocus,
      photos.partners,
    ],
    cta: ['products', 'Découvrir nos produits'],
  },
};
function SiteManifesto({ id }: { id: VerticalId }) {
  const m = manifestos[id];
  const rail = rails[id];
  return (
    <section className="sg-site-manifesto">
      <div className="site-container">
        <span className="micro">{m.label}</span>
        <ScrollLitText text={m.text} />
        <div className="sg-figures" data-reveal>
          {m.figures.map(([n, label]) => (
            <div key={label}>
              <strong>
                <CountUp value={n} />
              </strong>
              <span className="micro">{label}</span>
            </div>
          ))}
        </div>
        <div className="im-actions sg-site-cta">
          <CtaLink href={link(id, rail.cta[0])}>{rail.cta[1]}</CtaLink>
        </div>
      </div>
      <PhotoRail photos={rail.photos} />
    </section>
  );
}
function CaseCards({ limit = 6 }: { limit?: number }) {
  return (
    <div className="work-grid">
      {cases.slice(0, limit).map((c, i) => (
        <a
          data-reveal
          className={`work-card work-${i}`}
          href={link('agency', `work/${c.slug}`)}
          key={c.slug}
        >
          <div className="work-art" data-motion-visual>
            <span className="concept-label">
              CONCEPT / {c.category.toUpperCase()}
            </span>
            <CampaignVisual index={i} />
            <i />
            <span className="work-art-caption">{c.tagline}</span>
          </div>
          <div className="work-caption">
            <h3>{c.title}</h3>
            <span>{c.category} ↗</span>
          </div>
        </a>
      ))}
    </div>
  );
}
function CourseCards({ limit = 8 }: { limit?: number }) {
  return (
    <div className="catalog-grid">
      {courses.slice(0, limit).map((c, i) => (
        <a
          data-reveal
          className="course-card"
          href={link('academy', `courses/${c.slug}`)}
          key={c.slug}
        >
          <div className={`course-art course-art-${i % 4}`} aria-hidden="true">
            <span>{['↗', '∿', '✳', '◈'][i % 4]}</span>
            <b>0{i + 1}</b>
          </div>
          <div className="course-caption">
            <p className="micro">
              {c.category} · {c.level}
            </p>
            <h3>{c.title}</h3>
            <p>{c.goal}</p>
            <div>
              <span>{c.hours} h · format envisagé</span>
              <span aria-hidden="true">↗</span>
            </div>
            <small>Module de démonstration</small>
          </div>
        </a>
      ))}
    </div>
  );
}
function ProductCards() {
  return (
    <div className="lab-products">
      <a
        data-reveal
        href={link('labs', 'products/management')}
        className="lab-product"
      >
        <p className="micro">01 / PRODUIT EXISTANT</p>
        <div className="product-window" aria-hidden="true">
          <div>
            <i />
            <i />
            <i />
          </div>
          <aside>SM / MANAGEMENT</aside>
          <b>
            Le travail,
            <br />
            réuni.
          </b>
          <span>CLIENTS · PROJETS · PLANNING · FINANCES</span>
        </div>
        <h3>
          Smartsell Management <span>↗</span>
        </h3>
        <p>Un produit pour relier les opérations du quotidien.</p>
      </a>
      <a
        data-reveal
        href={link('labs', 'products/obtura')}
        className="lab-product obtura-card"
      >
        <p className="micro">02 / VISION PRODUIT</p>
        <div className="obtura-window" aria-hidden="true">
          <div className="obtura-orbit" />
          <b>O.</b>
          <span>LE TRAVAIL CRÉATIF, RELIÉ.</span>
        </div>
        <h3>
          Obtura <span>↗</span>
        </h3>
        <p>Un Business OS envisagé pour les créateurs visuels.</p>
      </a>
    </div>
  );
}
function SpaceCards() {
  return (
    <div className="spaces-grid">
      {spaces.map((s, i) => (
        <a
          key={s.slug}
          data-reveal
          href={link('studio', `spaces/${s.slug}`)}
          className="space-card"
        >
          <div className={`space-diagram diagram-${i}`} aria-hidden="true">
            <div />
            <b>{s.symbol}</b>
            <span>ÉTUDE DE PLATEAU / 0{i + 1}</span>
          </div>
          <h3>
            {s.title} <span>↗</span>
          </h3>
          <p>{s.copy}</p>
          <small>{s.use}</small>
        </a>
      ))}
    </div>
  );
}
function HomeBody({ id }: { id: VerticalId }) {
  if (id === 'agency')
    return (
      <>
        <section className="site-section" id="explore">
          <div className="site-container">
            <SectionTitle
              label="01 / EXPLORATIONS CRÉATIVES"
              title="Une direction. Plusieurs expressions."
              copy="Six concepts pour rendre notre démarche visible. Chaque étude expose le contexte, la direction et les livrables envisagés."
            />
            <CaseCards limit={4} />
            <Action secondary id={id} path="work">
              Les six explorations
            </Action>
          </div>
        </section>
        <section className="site-section agency-services">
          <div className="site-container split-layout">
            <SectionTitle
              label="02 / EXPERTISES"
              title="Du sens. De la forme. De l’impact."
              copy="Stratégie, création et technologie se rencontrent dans chaque projet."
            />
            <div className="service-index" data-reveal>
              {agencyServices.slice(0, 6).map((s, i) => (
                <a key={s.slug} href={link(id, `services/${s.slug}`)}>
                  <span>0{i + 1}</span>
                  <h3>
                    <MotionText text={s.title} />
                  </h3>
                  <span>↗</span>
                </a>
              ))}
              <a href={link(id, 'services')}>Toutes les expertises →</a>
            </div>
          </div>
        </section>
        <section className="site-section">
          <div className="site-container">
            <SectionTitle
              label="03 / NOTRE MANIÈRE DE FAIRE"
              title="Une idée ne s’arrête pas au premier écran."
            />
            <div className="process-grid">
              {[
                [
                  'Écouter',
                  'Comprendre le contexte, les personnes et l’objectif.',
                ],
                ['Explorer', 'Proposer une direction et la rendre concrète.'],
                ['Construire', 'Relier la forme aux parcours et aux usages.'],
                ['Transmettre', 'Documenter les choix et préparer la suite.'],
              ].map(([t, c], i) => (
                <article data-reveal key={t}>
                  <span>0{i + 1} /</span>
                  <h3>
                    <MotionText text={t + '.'} />
                  </h3>
                  <p>{c}</p>
                </article>
              ))}
            </div>
            <Action secondary id={id} path="history">
              L’histoire de la maison
            </Action>
          </div>
        </section>
      </>
    );
  if (id === 'academy')
    return (
      <>
        <section id="explore" className="site-section">
          <div className="site-container">
            <SectionTitle
              label="01 / LES MODULES"
              title="Votre curiosité a de l’avenir."
              copy="Choisissez un terrain de pratique, découvrez le projet et essayez trois leçons de démonstration."
            />
            <CourseCards limit={4} />
            <Action secondary id={id} path="courses">
              Explorer les huit modules
            </Action>
          </div>
        </section>
        <section className="academy-manifesto site-section">
          <div className="site-container split-layout">
            <div className="big-asterisk" aria-hidden="true">
              ✳
            </div>
            <div>
              <p className="micro">02 / LE SAVOIR EN ACTION</p>
              <h2>
                Ce que vous apprenez.
                <br />
                <em>Ce que vous en faites.</em>
              </h2>
              <p>
                Un objectif clair, des exemples, un exercice. Le parcours
                transforme une notion en pratique, puis vous invite à revenir
                sur vos choix.
              </p>
              <Action id={id} path="resources">
                Ouvrir la boîte à outils
              </Action>
            </div>
          </div>
        </section>
        <section className="site-section">
          <div className="site-container split-layout">
            <SectionTitle
              label="03 / PROCHAINS FORMATS"
              title="L’apprentissage continue ensemble."
              copy="Ateliers, sessions guidées et parcours d’équipe. Les dates réelles seront annoncées après validation."
            />
            <div className="event-stack">
              {courses.slice(0, 3).map((c, i) => (
                <a href={link(id, `courses/${c.slug}`)} key={c.slug}>
                  <span>0{i + 1}</span>
                  <div>
                    <p className="micro">FORMAT À PROGRAMMER</p>
                    <h3>{c.title}</h3>
                    <p>
                      {c.hours} h · {c.level}
                    </p>
                  </div>
                  <span>↗</span>
                </a>
              ))}
              <Action secondary id={id} path="corporate">
                Construire un parcours d’équipe
              </Action>
            </div>
          </div>
        </section>
      </>
    );
  if (id === 'media') {
    const lead = articles[0];
    return (
      <>
        <section className="site-section media-front" id="explore">
          <div className="site-container">
            <div className="edition-line">
              <span>SMARTSELL MEDIA / ÉDITION DE DÉMONSTRATION</span>
              <span>CONAKRY → LE MONDE</span>
            </div>
            <a
              className="editorial-feature"
              href={link(id, `article/${lead.slug}`)}
            >
              <div className="feature-art" aria-hidden="true">
                <span>
                  FORM
                  <br />
                  FOLLOWS
                  <br />
                  <em>IDEA.</em>
                </span>
                <i />
              </div>
              <div>
                <p className="micro">À LA UNE / {lead.category}</p>
                <h2>{lead.title}</h2>
                <p>{lead.summary}</p>
                <span className="text-link">Lire l’article ↗</span>
              </div>
            </a>
            <SectionTitle
              label="01 / LE FIL"
              title="Des idées à faire circuler."
            />
            <div className="media-home-grid">
              {articles.slice(1, 7).map((a, i) => (
                <a
                  key={a.slug}
                  data-reveal
                  href={link(id, `article/${a.slug}`)}
                >
                  <div
                    className={`article-cover cover-${i % 3}`}
                    aria-hidden="true"
                  >
                    <b>{['↗', '✳', '∿'][i % 3]}</b>
                    <span>{a.number}</span>
                  </div>
                  <p className="micro">
                    {a.category} · {a.minutes} MIN
                  </p>
                  <h3>{a.title}</h3>
                  <p>{a.summary}</p>
                </a>
              ))}
            </div>
            <Action secondary id={id} path="latest">
              Tous les articles
            </Action>
          </div>
        </section>
        <section className="site-section">
          <div className="site-container">
            <Newsletter />
          </div>
        </section>
      </>
    );
  }
  if (id === 'studio')
    return (
      <>
        <section className="site-section" id="explore">
          <div className="site-container">
            <SectionTitle
              label="01 / LES ESPACES"
              title="Pour chaque histoire, un cadre."
              copy="Photo, vidéo, podcast. Explorez trois configurations illustratives et préparez les besoins de votre production."
            />
            <SpaceCards />
          </div>
        </section>
        <section className="studio-manifesto">
          <div className="site-container">
            <p className="micro">02 / L’INTENTION EN PREMIER</p>
            <h2>
              Une lumière.
              <br />
              Un geste.
              <br />
              <em>Une présence.</em>
            </h2>
            <div>
              <p>
                De la première référence au dernier plan, le plateau sert votre
                récit. Nous préparons le format, les besoins et les livrables
                avec vous.
              </p>
              <Action id={id} path="gallery">
                Explorer les directions visuelles
              </Action>
            </div>
          </div>
        </section>
        <section className="site-section">
          <div className="site-container">
            <SectionTitle
              label="03 / COMPOSER SA SESSION"
              title="Votre prochain tournage commence ici."
              copy="Découvrez les packs illustratifs, puis essayez le parcours de réservation sans engagement."
            />
            <div className="pack-strip">
              {packs.slice(0, 3).map((p) => (
                <a key={p.slug} href={link(id, `packs/${p.slug}`)}>
                  <p className="micro">{p.duration} H / FORMAT INDICATIF</p>
                  <h3>{p.title}</h3>
                  <p>{p.copy}</p>
                  <span>Explorer le pack ↗</span>
                </a>
              ))}
            </div>
            <Action id={id} path="booking">
              Simuler une session
            </Action>
          </div>
        </section>
      </>
    );
  return (
    <>
      <section className="site-section" id="explore">
        <div className="site-container">
          <SectionTitle
            label="01 / LES PRODUITS"
            title="Faire avancer le quotidien."
            copy="La technologie prend son sens dans ce qu’elle permet de faire."
          />
          <ProductCards />
        </div>
      </section>
      <section className="site-section labs-method">
        <div className="site-container split-layout">
          <div>
            <p className="micro">02 / LA DÉMARCHE</p>
            <h2>
              Observe.
              <br />
              Build.
              <br />
              <em>Improve.</em>
            </h2>
          </div>
          <div className="research-stack">
            {[
              [
                'Un problème avant un outil.',
                'Observer la réalité du travail et les points de friction.',
              ],
              [
                'Un prototype avant une promesse.',
                'Donner une forme testable à une hypothèse.',
              ],
              [
                'La maîtrise, jusqu’à la suite.',
                'Documenter, valider et transmettre les décisions.',
              ],
            ].map(([t, c], i) => (
              <article data-reveal key={t}>
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{c}</p>
              </article>
            ))}
            <Action secondary id={id} path="research">
              Les pistes de recherche
            </Action>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="site-container lab-invitation">
          <p className="micro">03 / INTELLIGENCE & INTENTION</p>
          <h2>
            L’IA n’est qu’un début.
            <br />
            <em>L’usage fait la différence.</em>
          </h2>
          <p>
            Cartographier une tâche, préparer un prototype et définir les points
            de contrôle humain.
          </p>
          <Action id={id} path="ai">
            Explorer l’approche
          </Action>
        </div>
      </section>
    </>
  );
}
function Content({ id, page }: { id: VerticalId; page: SitePageData }) {
  const course = courses.find((c) => c.slug === page.ref);
  const study = cases.find((c) => c.slug === page.ref);
  const article = articles.find((a) => a.slug === page.ref);
  const pack = packs.find((p) => p.slug === page.ref);
  const space = spaces.find((s) => s.slug === page.ref);
  if (page.kind === 'enroll' && course) return <Enrollment course={course} />;
  if (page.kind === 'learn' && course) return <Learner course={course} />;
  if (page.kind === 'dashboard') return <Dashboard />;
  if (page.kind === 'certificates') return <Dashboard certificates />;
  if (page.kind === 'booking') return <Booking />;
  if (page.kind === 'contact') return <DraftForm site={names[id]} />;
  if (page.kind === 'newsletter') return <Newsletter />;
  if (page.kind === 'gallery') return <Gallery />;
  if (page.kind === 'search' || page.kind === 'articles')
    return <ArticleSearch />;
  if (page.kind === 'category') {
    const mapping: Record<string, string> = {
      tech: 'Tech',
      ai: 'IA',
      startups: 'Startups',
      business: 'Business',
      marketing: 'Marketing',
      creative: 'Création',
      africa: 'Afrique',
      guinea: 'Guinée',
      opinions: 'Opinions',
      interviews: 'Interviews',
    };
    return <ArticleSearch category={mapping[page.ref || '']} />;
  }
  if (page.kind === 'work') return <CaseCards />;
  if (page.kind === 'courses') return <CourseCards />;
  if (page.kind === 'services')
    return (
      <div className="service-catalog">
        {agencyServices.map((s, i) => (
          <a key={s.slug} href={link(id, `services/${s.slug}`)} data-reveal>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h2>{s.title}</h2>
              <p>{s.copy}</p>
            </div>
            <span>↗</span>
          </a>
        ))}
      </div>
    );
  if (page.kind === 'products') return <ProductCards />;
  if (page.kind === 'spaces') return <SpaceCards />;
  if (page.kind === 'packs')
    return (
      <div className="catalog-grid">
        {packs.map((p, i) => (
          <a
            key={p.slug}
            className="compact-card"
            data-reveal
            href={link(id, `packs/${p.slug}`)}
          >
            <p className="micro">
              0{i + 1} / {p.duration} H INDICATIVES
            </p>
            <h2>{p.title}</h2>
            <p>{p.copy}</p>
            <ul>
              {p.includes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="price-note">Sur demande</p>
            <span className="text-link">Voir le périmètre ↗</span>
          </a>
        ))}
      </div>
    );
  if (page.kind === 'course' && course)
    return (
      <>
        <DemoNote>
          Programme illustratif de {course.hours} h. L’aperçu contient trois
          leçons. Aucune session réelle n’est annoncée.
        </DemoNote>
        <div className="course-detail">
          <div>
            <h2>Le projet qui donne un sens au module.</h2>
            <p>{course.project}</p>
            <dl className="facts">
              <div>
                <dt>Niveau</dt>
                <dd>{course.level}</dd>
              </div>
              <div>
                <dt>Catégorie</dt>
                <dd>{course.category}</dd>
              </div>
              <div>
                <dt>Tarif réel</dt>
                <dd>À définir</dd>
              </div>
            </dl>
            <h2>Le programme de l’aperçu</h2>
            {course.lessons.map((l, i) => (
              <details key={l.title} className="curriculum">
                <summary>
                  0{i + 1} / {l.title} <span>+</span>
                </summary>
                <p>{l.copy}</p>
                <p>
                  <strong>Exercice : </strong>
                  {l.exercise}
                </p>
              </details>
            ))}
            <h3>Avant de commencer</h3>
            <p>
              Prévoyez un carnet ou un document pour noter vos idées. Aucun
              outil payant n’est nécessaire pour parcourir cet aperçu.
            </p>
          </div>
          <aside className="course-enroll-panel">
            <span className="course-symbol" aria-hidden="true">
              ✳
            </span>
            <h3>Faites le premier pas.</h3>
            <p>
              Choisissez ce module, essayez les leçons et retrouvez votre
              progression dans votre espace.
            </p>
            <Action id={id} path={`enroll/${course.slug}`}>
              Explorer le parcours démo
            </Action>
            <Action secondary id={id} path="events">
              Les formats à venir
            </Action>
          </aside>
        </div>
      </>
    );
  if (page.kind === 'article' && article)
    return (
      <div className="article-reading">
        <aside>
          <p className="micro">
            {article.category} / {article.minutes} MIN
          </p>
          <a href={link(id, 'authors/redaction')}>Rédaction Smartsell ↗</a>
          <p>10 octobre 2026</p>
          <p className="form-note">
            Exemple éditorial original. Guide ou opinion de démonstration.
          </p>
          <ShareArticle />
        </aside>
        <article>
          <div className="article-intro-art" aria-hidden="true">
            <span>{article.number}</span>
            <b>
              IDEA
              <br />
              IN MOTION.
            </b>
          </div>
          {article.paragraphs.map((text, i) => (
            <section key={text}>
              <h2>{i === 0 ? 'Le point de départ' : 'À mettre en pratique'}</h2>
              <p>{text}</p>
            </section>
          ))}
          <div className="reading-next">
            <p className="micro">POURSUIVRE LA LECTURE</p>
            {articles
              .filter((a) => a.slug !== article.slug)
              .filter((a) => a.category === article.category)
              .slice(0, 2)
              .map((a) => (
                <a href={link(id, `article/${a.slug}`)} key={a.slug}>
                  {a.title} ↗
                </a>
              ))}
            <a href={link('academy', 'courses')}>
              Passer de la lecture à la pratique avec Academy ↗
            </a>
          </div>
        </article>
      </div>
    );
  if (page.kind === 'events')
    return (
      <div className="event-stack">
        {courses.map((c, i) => (
          <a key={c.slug} href={link(id, `courses/${c.slug}`)}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="micro">DATE À ANNONCER / FORMAT ENVISAGÉ</p>
              <h2>{c.title}</h2>
              <p>
                {c.hours} h · {c.level}
              </p>
            </div>
            <span>↗</span>
          </a>
        ))}
      </div>
    );
  if (page.kind === 'faq')
    return (
      <div className="faq-list">
        {[
          [
            'Peut-on réserver réellement sur ce site ?',
            'Le parcours actuel est une démonstration. Il permet de préparer une session sans bloquer de créneau ni transmettre de demande.',
          ],
          [
            'Que faut-il préparer ?',
            'Votre format, le nombre de personnes, vos références et les livrables attendus. Les besoins d’image, de son et de postproduction seront cadrés ensemble.',
          ],
          [
            'Les équipements sont-ils confirmés ?',
            'Les configurations présentées sont illustratives. L’équipe devra confirmer les équipements, les conditions et la disponibilité avant une prestation réelle.',
          ],
          [
            'Comment connaître le tarif ?',
            'Le tarif dépend du périmètre, de la durée, de l’accompagnement et des livrables. Les packs illustrent des points de départ ; le chiffrage réel reste à établir.',
          ],
          [
            'Le montage est-il inclus ?',
            'Chaque production doit préciser les livrables, les versions et la postproduction. Le récapitulatif d’un pack est une proposition à cadrer, pas un contrat.',
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span>+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
        <Action id={id} path="booking">
          Essayer le parcours démo
        </Action>
      </div>
    );
  return (
    <>
      {study && (
        <>
          <p className="concept-disclaimer">
            Étude conceptuelle de démonstration · marque fictive · aucune
            commande client revendiquée.
          </p>
          <div
            className={`case-banner work-${cases.indexOf(study)}`}
            aria-hidden="true"
          >
            <b>{study.mark}</b>
            <span>{study.tagline}</span>
          </div>
        </>
      )}
      {space && (
        <div
          className={`space-diagram space-large diagram-${spaces.indexOf(space)}`}
          aria-hidden="true"
        >
          <div />
          <b>{space.symbol}</b>
          <span>CONFIGURATION ILLUSTRATIVE</span>
        </div>
      )}
      <div className="story-blocks">
        {page.blocks?.map((b, i) => (
          <section data-reveal key={b.title}>
            <span className="block-number">0{i + 1} /</span>
            <div>
              <h2>{b.title}</h2>
              <p>{b.copy}</p>
              {b.items && (
                <ul>
                  {b.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
      {pack && (
        <>
          <DemoNote>
            Périmètre et durée illustratifs. Aucun tarif engagé ni disponibilité
            réelle.
          </DemoNote>
          <Action id={id} path="booking">
            Composer une session démo
          </Action>
        </>
      )}
      {space && (
        <Action id={id} path="booking">
          Préparer une session démo
        </Action>
      )}
      {page.kind === 'management' && (
        <a className="site-button" href={managementUrl}>
          Ouvrir Management, le produit existant ↗
        </a>
      )}
      {page.kind === 'obtura' && (
        <Action id={id} path="contact">
          Partager un besoin de créateur
        </Action>
      )}
      {study && (
        <nav className="case-next" aria-label="Autres explorations">
          {cases
            .filter((c) => c.slug !== study.slug)
            .slice(0, 2)
            .map((c) => (
              <a href={link(id, `work/${c.slug}`)} key={c.slug}>
                Explorer {c.title} ↗
              </a>
            ))}
        </nav>
      )}
      {page.kind === 'story' && page.path !== 'privacy' && (
        <Action
          secondary
          id={id}
          path={id === 'academy' ? 'courses' : 'contact'}
        >
          {id === 'academy' ? 'Choisir un module' : 'Parlons de votre projet'}
        </Action>
      )}
    </>
  );
}
export function SitePage({ id, page }: { id: VerticalId; page: SitePageData }) {
  return (
    <div className={`vertical-site site-${id}`}>
      <Header id={id} path={page.path} />
      <main id="main">
        {page.kind === 'home' ? (
          <>
            <HomeHero id={id} page={page} />
            {id === 'agency' && <AgencyRibbon />}
            <SiteManifesto id={id} />
            <HomeBody id={id} />
          </>
        ) : (
          <>
            <section className="inner-hero">
              <div className="site-container">
                <nav className="breadcrumbs" aria-label="Fil d’Ariane">
                  <a href={link(id)}>{names[id]}</a>
                  <span>/</span>
                  <span>{page.title.replace(/\n/g, ' ')}</span>
                </nav>
                <p className="micro">SMARTSELL {names[id].toUpperCase()}</p>
                <h1 data-reveal>
                  <MotionText text={page.title} />
                </h1>
                <p>{page.intro}</p>
              </div>
            </section>
            <section className="site-section inner-content">
              <div className="site-container">
                <Content id={id} page={page} />
              </div>
            </section>
          </>
        )}
      </main>
      <Footer id={id} />
      <MotionLayer />
    </div>
  );
}
