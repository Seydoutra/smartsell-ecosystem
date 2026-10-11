import { Icon } from '../icons';
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
  locale,
  t,
} from '@smartsell/routing';
import { Brand } from '../brand';
import { ChangingHeadline, PreviewFrame } from '../experience';
import { MotionLayer } from './motion';
import { MotionText, AgencyRibbon, CampaignVisual } from './visuals';
import {
  CountUp,
  LangSwitch,
  PixelMosaic,
  ScrollLitText,
  ThemeToggle,
} from '../signature';
import { CtaLink, PhotoRail } from '../immersive';
import { InnerCta, InnerHero, VerticalHome } from './universe';
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
  urlFor(id, locale, path, routingConfig);
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
      <span aria-hidden="true">
        <Icon name="arrowUpRight" />
      </span>
    </a>
  );
}
function Header({ id, path }: { id: VerticalId; path: string }) {
  const menu = siteMenus[id];
  return (
    <>
      <a className="site-skip" href="#main">
        {t('Aller au contenu', 'Skip to content')}
      </a>
      <div className="ecosystem-bar">
        <div className="site-container">
          <a href={link('main')}>
            {t('LA MAISON SMARTSELL', 'THE SMARTSELL HOUSE')}{' '}
            <span aria-hidden="true">
              <Icon name="arrowUpRight" />
            </span>
          </a>
          <nav aria-label={t('Les sites Smartsell', 'The Smartsell sites')}>
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
            aria-label={`Smartsell ${names[id]}, ${t('accueil', 'home')}`}
          >
            <Brand variant="white" />
            <span>{names[id]}</span>
          </a>
          <nav
            className="desktop-site-menu"
            aria-label={`${t('Navigation', 'Navigation')} ${names[id]}`}
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
          <div className="site-header-tools">
            <LangSwitch />
            <ThemeToggle />
          </div>
          <details className="mobile-site-menu">
            <summary>
              Menu <span aria-hidden="true">+</span>
            </summary>
            <nav aria-label={`${t('Menu mobile', 'Mobile menu')} ${names[id]}`}>
              <a href={link(id)}>{t('Accueil', 'Home')}</a>
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
      { label: t('À propos', 'About'), path: 'about' },
      {
        label: t('Rejoindre le collectif', 'Join the collective'),
        path: 'careers',
      },
    ],
    academy: [
      { label: t('Ressources', 'Resources'), path: 'resources' },
      { label: 'Support', path: 'support' },
    ],
    media: [
      { label: t('Afrique', 'Africa'), path: 'africa' },
      { label: t('Guinée', 'Guinea'), path: 'guinea' },
      { label: 'Opinions', path: 'opinions' },
      { label: t('Entretiens', 'Interviews'), path: 'interviews' },
      { label: 'Newsletter', path: 'newsletter' },
    ],
    studio: [
      { label: t('Questions fréquentes', 'FAQ'), path: 'faq' },
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
            {t('La suite commence', 'What’s next starts')}
            <br />
            <em>{t('avec vous.', 'with you.')}</em>
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
            {t('Faire le prochain mouvement', 'Make the next move')}{' '}
            <Icon name="arrowUpRight" />
          </a>
        </div>
        <nav aria-label={t('Pages du site', 'Site pages')}>
          {[...siteMenus[id], ...extras[id]].map((m) => (
            <a key={m.path} href={link(id, m.path)}>
              {m.label} <Icon name="arrowUpRight" />
            </a>
          ))}
        </nav>
        <nav
          aria-label={t(
            'Continuer dans l’écosystème',
            'Continue in the ecosystem',
          )}
        >
          <span className="micro">
            {t('UNE MAISON. CINQ SITES.', 'ONE HOUSE. FIVE SITES.')}
          </span>
          {verticals
            .filter((v) => v.id !== id)
            .map((v) => (
              <a key={v.id} href={link(v.id)}>
                {v.name} <Icon name="arrowUpRight" />
              </a>
            ))}
        </nav>
      </div>
      <div className="site-container footer-bottom">
        <a href={link('main')}>
          <Brand variant="white" />
        </a>
        <span>© {new Date().getUTCFullYear()} Smartsell · Conakry</span>
        <a href={link(id, 'privacy')}>{t('Vos données', 'Your data')}</a>
        <a href="#top">
          {t('Retour en haut', 'Back to top')} <Icon name="arrowUp" />
        </a>
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
            <span>
              {c.category} <Icon name="arrowUpRight" />
            </span>
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
            <span>
              <Icon
                name={
                  (['arrowUpRight', 'microphone', 'stars', 'puzzle'] as const)[
                    i % 4
                  ]
                }
              />
            </span>
            <b>0{i + 1}</b>
          </div>
          <div className="course-caption">
            <p className="micro">
              {c.category} · {c.level}
            </p>
            <h3>{c.title}</h3>
            <p>{c.goal}</p>
            <div>
              <span>
                {c.hours} {t('h · format envisagé', 'h · planned format')}
              </span>
              <span aria-hidden="true">
                <Icon name="arrowUpRight" />
              </span>
            </div>
            <small>
              {t('Module de démonstration', 'Demonstration course')}
            </small>
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
        <p className="micro">
          {t('01 / PRODUIT EXISTANT', '01 / EXISTING PRODUCT')}
        </p>
        <div className="product-window" aria-hidden="true">
          <div>
            <i />
            <i />
            <i />
          </div>
          <aside>SM / MANAGEMENT</aside>
          <b>
            {t('Le travail,', 'Work,')}
            <br />
            {t('réuni.', 'together.')}
          </b>
          <span>
            {t(
              'CLIENTS · PROJETS · PLANNING · FINANCES',
              'CLIENTS · PROJECTS · PLANNING · FINANCES',
            )}
          </span>
        </div>
        <h3>
          Smartsell Management{' '}
          <span>
            <Icon name="arrowUpRight" />
          </span>
        </h3>
        <p>
          {t(
            'Un produit pour relier les opérations du quotidien.',
            'A product that connects everyday operations.',
          )}
        </p>
      </a>
      <a
        data-reveal
        href={link('labs', 'products/obtura')}
        className="lab-product obtura-card"
      >
        <p className="micro">
          {t('02 / VISION PRODUIT', '02 / PRODUCT VISION')}
        </p>
        <div className="obtura-window" aria-hidden="true">
          <div className="obtura-orbit" />
          <b>O.</b>
          <span>
            {t('LE TRAVAIL CRÉATIF, RELIÉ.', 'CREATIVE WORK, CONNECTED.')}
          </span>
        </div>
        <h3>
          Obtura{' '}
          <span>
            <Icon name="arrowUpRight" />
          </span>
        </h3>
        <p>
          {t(
            'Un Business OS envisagé pour les créateurs visuels.',
            'A Business OS envisioned for visual creators.',
          )}
        </p>
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
            <b>
              <Icon
                name={(['eye', 'dashboard', 'microphone'] as const)[i % 3]}
              />
            </b>
            <span>
              {t('ÉTUDE DE PLATEAU', 'SET STUDY')} / 0{i + 1}
            </span>
          </div>
          <h3>
            {s.title}{' '}
            <span>
              <Icon name="arrowUpRight" />
            </span>
          </h3>
          <p>{s.copy}</p>
          <small>{s.use}</small>
        </a>
      ))}
    </div>
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
      ai: t('IA', 'AI'),
      startups: 'Startups',
      business: 'Business',
      marketing: 'Marketing',
      creative: t('Création', 'Creative'),
      africa: t('Afrique', 'Africa'),
      guinea: t('Guinée', 'Guinea'),
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
            <span>
              <Icon name="arrowUpRight" />
            </span>
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
              0{i + 1} / {p.duration} {t('H INDICATIVES', 'H INDICATIVE')}
            </p>
            <h2>{p.title}</h2>
            <p>{p.copy}</p>
            <ul>
              {p.includes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="price-note">{t('Sur demande', 'On request')}</p>
            <span className="text-link">
              {t('Voir le périmètre', 'See the scope')}{' '}
              <Icon name="arrowUpRight" />
            </span>
          </a>
        ))}
      </div>
    );
  if (page.kind === 'course' && course)
    return (
      <>
        <DemoNote>
          {t(
            `Programme illustratif de ${course.hours} h. L’aperçu contient trois leçons. Aucune session réelle n’est annoncée.`,
            `Illustrative ${course.hours}-hour programme. The preview contains three lessons. No real session is announced.`,
          )}
        </DemoNote>
        <div className="course-detail">
          <div>
            <h2>
              {t(
                'Le projet qui donne un sens au module.',
                'The project that gives the course its meaning.',
              )}
            </h2>
            <p>{course.project}</p>
            <dl className="facts">
              <div>
                <dt>{t('Niveau', 'Level')}</dt>
                <dd>{course.level}</dd>
              </div>
              <div>
                <dt>{t('Catégorie', 'Category')}</dt>
                <dd>{course.category}</dd>
              </div>
              <div>
                <dt>{t('Tarif réel', 'Actual price')}</dt>
                <dd>{t('À définir', 'To be defined')}</dd>
              </div>
            </dl>
            <h2>{t('Le programme de l’aperçu', 'The preview programme')}</h2>
            {course.lessons.map((l, i) => (
              <details key={l.title} className="curriculum">
                <summary>
                  0{i + 1} / {l.title} <span>+</span>
                </summary>
                <p>{l.copy}</p>
                <p>
                  <strong>{t('Exercice :', 'Exercise:')} </strong>
                  {l.exercise}
                </p>
              </details>
            ))}
            <h3>{t('Avant de commencer', 'Before you start')}</h3>
            <p>
              {t(
                'Prévoyez un carnet ou un document pour noter vos idées. Aucun outil payant n’est nécessaire pour parcourir cet aperçu.',
                'Keep a notebook or a document to write down your ideas. No paid tool is needed to go through this preview.',
              )}
            </p>
          </div>
          <aside className="course-enroll-panel">
            <span className="course-symbol" aria-hidden="true">
              <Icon name="stars" />
            </span>
            <h3>{t('Faites le premier pas.', 'Take the first step.')}</h3>
            <p>
              {t(
                'Choisissez ce module, essayez les leçons et retrouvez votre progression dans votre espace.',
                'Choose this course, try the lessons and find your progress in your space.',
              )}
            </p>
            <Action id={id} path={`enroll/${course.slug}`}>
              {t('Explorer le parcours démo', 'Explore the demo journey')}
            </Action>
            <Action secondary id={id} path="events">
              {t('Les formats à venir', 'Upcoming formats')}
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
          <a href={link(id, 'authors/redaction')}>
            {t('Rédaction Smartsell', 'Smartsell newsroom')}{' '}
            <Icon name="arrowUpRight" />
          </a>
          <p>{t('10 octobre 2026', '10 October 2026')}</p>
          <p className="form-note">
            {t(
              'Exemple éditorial original. Guide ou opinion de démonstration.',
              'Original editorial example. Demonstration guide or opinion.',
            )}
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
              <h2>
                {i === 0
                  ? t('Le point de départ', 'The starting point')
                  : t('À mettre en pratique', 'Putting it into practice')}
              </h2>
              <p>{text}</p>
            </section>
          ))}
          <div className="reading-next">
            <p className="micro">
              {t('POURSUIVRE LA LECTURE', 'KEEP READING')}
            </p>
            {articles
              .filter((a) => a.slug !== article.slug)
              .filter((a) => a.category === article.category)
              .slice(0, 2)
              .map((a) => (
                <a href={link(id, `article/${a.slug}`)} key={a.slug}>
                  {a.title} <Icon name="arrowUpRight" />
                </a>
              ))}
            <a href={link('academy', 'courses')}>
              {t(
                'Passer de la lecture à la pratique avec Academy',
                'Move from reading to practice with Academy',
              )}{' '}
              <Icon name="arrowUpRight" />
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
              <p className="micro">
                {t(
                  'DATE À ANNONCER / FORMAT ENVISAGÉ',
                  'DATE TO BE ANNOUNCED / PLANNED FORMAT',
                )}
              </p>
              <h2>{c.title}</h2>
              <p>
                {c.hours} h · {c.level}
              </p>
            </div>
            <span>
              <Icon name="arrowUpRight" />
            </span>
          </a>
        ))}
      </div>
    );
  if (page.kind === 'faq')
    return (
      <div className="faq-list">
        {[
          [
            t(
              'Peut-on réserver réellement sur ce site ?',
              'Can I really book on this site?',
            ),
            t(
              'Le parcours actuel est une démonstration. Il permet de préparer une session sans bloquer de créneau ni transmettre de demande.',
              'The current journey is a demonstration. It lets you prepare a session without holding a slot or sending a request.',
            ),
          ],
          [
            t('Que faut-il préparer ?', 'What should I prepare?'),
            t(
              'Votre format, le nombre de personnes, vos références et les livrables attendus. Les besoins d’image, de son et de postproduction seront cadrés ensemble.',
              'Your format, the number of people, your references and the expected deliverables. Image, sound and post-production needs will be scoped together.',
            ),
          ],
          [
            t(
              'Les équipements sont-ils confirmés ?',
              'Is the equipment confirmed?',
            ),
            t(
              'Les configurations présentées sont illustratives. L’équipe devra confirmer les équipements, les conditions et la disponibilité avant une prestation réelle.',
              'The setups shown are illustrative. The team will confirm equipment, conditions and availability before any real service.',
            ),
          ],
          [
            t('Comment connaître le tarif ?', 'How do I get a price?'),
            t(
              'Le tarif dépend du périmètre, de la durée, de l’accompagnement et des livrables. Les packs illustrent des points de départ ; le chiffrage réel reste à établir.',
              'The price depends on scope, duration, support and deliverables. The packs illustrate starting points; the actual quote remains to be established.',
            ),
          ],
          [
            t('Le montage est-il inclus ?', 'Is editing included?'),
            t(
              'Chaque production doit préciser les livrables, les versions et la postproduction. Le récapitulatif d’un pack est une proposition à cadrer, pas un contrat.',
              'Each production must specify deliverables, versions and post-production. A pack summary is a proposal to scope, not a contract.',
            ),
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
          {t('Essayer le parcours démo', 'Try the demo journey')}
        </Action>
      </div>
    );
  return (
    <>
      {study && (
        <>
          <p className="concept-disclaimer">
            {t(
              'Étude conceptuelle de démonstration · marque fictive · aucune commande client revendiquée.',
              'Demonstration concept study · fictional brand · no client commission claimed.',
            )}
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
          <b>
            <Icon
              name={
                (['eye', 'dashboard', 'microphone'] as const)[
                  spaces.indexOf(space) % 3
                ]
              }
            />
          </b>
          <span>{t('CONFIGURATION ILLUSTRATIVE', 'ILLUSTRATIVE SETUP')}</span>
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
            {t(
              'Périmètre et durée illustratifs. Aucun tarif engagé ni disponibilité réelle.',
              'Illustrative scope and duration. No committed price or real availability.',
            )}
          </DemoNote>
          <Action id={id} path="booking">
            {t('Composer une session démo', 'Put together a demo session')}
          </Action>
        </>
      )}
      {space && (
        <Action id={id} path="booking">
          {t('Préparer une session démo', 'Prepare a demo session')}
        </Action>
      )}
      {page.kind === 'management' && (
        <a className="site-button" href={managementUrl}>
          {t(
            'Ouvrir Management, le produit existant',
            'Open Management, the existing product',
          )}{' '}
          <Icon name="arrowUpRight" />
        </a>
      )}
      {page.kind === 'obtura' && (
        <Action id={id} path="contact">
          {t('Partager un besoin de créateur', 'Share a creator’s need')}
        </Action>
      )}
      {study && (
        <nav
          className="case-next"
          aria-label={t('Autres explorations', 'Other explorations')}
        >
          {cases
            .filter((c) => c.slug !== study.slug)
            .slice(0, 2)
            .map((c) => (
              <a href={link(id, `work/${c.slug}`)} key={c.slug}>
                {t('Explorer', 'Explore')} {c.title}{' '}
                <Icon name="arrowUpRight" />
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
          {id === 'academy'
            ? t('Choisir un module', 'Choose a course')
            : t('Parlons de votre projet', 'Let’s talk about your project')}
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
          <VerticalHome id={id} />
        ) : (
          <>
            <InnerHero
              id={id}
              page={page}
              crumbs={
                <nav
                  className="breadcrumbs"
                  aria-label={t('Fil d’Ariane', 'Breadcrumb')}
                >
                  <a href={link(id)}>{names[id]}</a>
                  <span>/</span>
                  <span>{page.title.replace(/\n/g, ' ')}</span>
                </nav>
              }
            />
            <section
              className={`site-section inner-content uv-body uv-body-${id}`}
            >
              <div className="site-container">
                <Content id={id} page={page} />
              </div>
            </section>
            {![
              'enroll',
              'learn',
              'dashboard',
              'certificates',
              'booking',
            ].includes(page.kind || '') && (
              <InnerCta id={id} path={page.path} />
            )}
          </>
        )}
      </main>
      <Footer id={id} />
      <MotionLayer />
    </div>
  );
}
