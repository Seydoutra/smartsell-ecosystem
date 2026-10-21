import { Icon } from '../icons';
import type { VerticalId } from '@smartsell/types';
import { primaryVerticals } from '@smartsell/content';
import {
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
import { AcademyAccess } from '../platform/academy-access';
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
import {
  Backdrops,
  CorporateOffers,
  FormulaCards,
  InnerCta,
  InnerHero,
  MediaSide,
  ShootingAdvice,
  SpaceSlides,
  StudioBand,
  VerticalHome,
  expertiseItems,
} from './universe';
import {
  brands,
  films,
  shootSeries,
  shoots,
  websites,
} from '@smartsell/content/portfolio';
import { corporateSteps } from '@smartsell/content/academy';
import {
  ClipTile,
  CourseCarousel,
  ExpertiseBento,
  FilmPlayer,
  PhotoWall,
  PortfolioTabs,
  SiteCard,
  SlideRail,
  SmartBrief,
} from '../showcase';
import { Img } from '../immersive';
import { photos, type Photo } from '@smartsell/content/photos';
import {
  AttestationDocument,
  AttestationVerification,
} from '../platform/attestations';
import {
  ArticleSearch,
  Booking,
  Dashboard,
  DraftForm,
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
            {primaryVerticals.map((v) => (
              <a
                key={v.id}
                href={link(v.id)}
                aria-current={v.id === id ? 'true' : undefined}
              >
                {v.name}
              </a>
            ))}
          </nav>
          <a className="global-products-link" href={link('main', 'products')}>
            {t('Produits', 'Products')} ↗
          </a>
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
            <Brand variant={id === 'academy' ? 'purple' : 'white'} />
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
            {id === 'academy' && <AcademyAccess />}
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
    academy: [],
    media: [
      { label: t('Afrique', 'Africa'), path: 'africa' },
      { label: t('Guinée', 'Guinea'), path: 'guinea' },
      { label: 'Opinions', path: 'opinions' },
      { label: t('Entretiens', 'Interviews'), path: 'interviews' },
      { label: 'Newsletter', path: 'newsletter' },
    ],
    studio: [
      { label: t('Galerie', 'Gallery'), path: 'gallery' },
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
            {t('UNE MAISON. QUATRE UNIVERS.', 'ONE HOUSE. FOUR UNIVERSES.')}
          </span>
          {primaryVerticals
            .filter((v) => v.id !== id)
            .map((v) => (
              <a key={v.id} href={link(v.id)}>
                {v.name} <Icon name="arrowUpRight" />
              </a>
            ))}
          <a href={link('main', 'products')}>
            {t('Produits', 'Products')} <Icon name="arrowUpRight" />
          </a>
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
const storyPhotos: Record<VerticalId, Photo[]> = {
  agency: [
    photos.agencyGlass,
    shoots.fashion[1],
    photos.agencyDesigner,
    photos.meeting,
    shoots.sport[0],
  ],
  academy: [
    photos.academyRoom,
    photos.learnerFocus,
    photos.academyHome,
    photos.learnerDesk,
  ],
  media: [photos.mediaInterview, photos.mediaReader, photos.mediaPresenter],
  studio: [
    photos.podcastNeon,
    photos.studioPink,
    photos.videoField,
    shoots.spaces[0],
  ],
  labs: [photos.labsCoder, photos.labsNight, photos.founder, photos.manager],
};
function StoryCards({ id, page }: { id: VerticalId; page: SitePageData }) {
  const pool = storyPhotos[id];
  return (
    <div className="uv-story">
      {page.blocks?.map((b, i) => (
        <article
          key={b.title}
          data-reveal
          style={{ '--i': i } as React.CSSProperties}
        >
          <figure>
            <Img
              photo={pool[(i + page.path.length) % pool.length]}
              width={800}
            />
            <span>{String(i + 1).padStart(2, '0')}</span>
          </figure>
          <div>
            <h2>{b.title}</h2>
            <p>{b.copy}</p>
            {b.items && (
              <div className="uv-chips">
                {b.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
function ProductCards() {
  return (
    <div className="sc-site-grid">
      {websites
        .filter((w) =>
          ['management', 'kuma', 'obtura', 'garant'].includes(w.slug),
        )
        .map((w) => (
          <SiteCard key={w.slug} site={w} />
        ))}
    </div>
  );
}
function Content({ id, page }: { id: VerticalId; page: SitePageData }) {
  const course = courses.find((c) => c.slug === page.ref);
  const brand = brands.find((b) => b.slug === page.ref);
  const film = films.find((f) => f.slug === page.ref);
  const article = articles.find((a) => a.slug === page.ref);
  const pack = packs.find((p) => p.slug === page.ref);
  const space = spaces.find((s) => s.slug === page.ref);
  if (page.kind === 'learn' && course) return <Learner course={course} />;
  if (page.kind === 'dashboard') return <Dashboard />;
  if (page.kind === 'attestation-document') return <AttestationDocument />;
  if (page.kind === 'attestation-verify') return <AttestationVerification />;
  if (page.kind === 'booking') return <Booking />;
  if (page.kind === 'contact')
    return id === 'agency' ? <SmartBrief /> : <DraftForm site={names[id]} />;
  if (page.kind === 'newsletter') return <Newsletter />;
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
  if (page.kind === 'work')
    return (
      <>
        <PortfolioTabs
          brands={brands}
          websites={websites}
          photos={[...shoots.fashion, ...shoots.sport, ...shoots.spaces]}
          films={films}
          brandHrefs={Object.fromEntries(
            brands.map((b) => [b.slug, link('agency', `work/${b.slug}`)]),
          )}
          filmHrefs={Object.fromEntries(
            films.map((f) => [f.slug, link('media', `video/${f.slug}`)]),
          )}
        />
        {shootSeries.map((s) => (
          <section key={s.slug} className="uv-series" data-reveal>
            <div className="uv-series-head">
              <p className="micro">{t('Série photo', 'Photo series')}</p>
              <h2>{s.title}</h2>
              <p>{s.copy}</p>
            </div>
            <SlideRail label={s.title}>
              {s.photos.map((ph) => (
                <figure key={ph.id} className={`uv-series-shot ${ph.ratio}`}>
                  <Img photo={ph} width={900} />
                </figure>
              ))}
            </SlideRail>
          </section>
        ))}
      </>
    );
  if (page.kind === 'brand' && brand)
    return (
      <div className="uv-brand">
        <div className="uv-brand-intro">
          <p className="micro">{brand.sector}</p>
          <div className="uv-chips">
            {brand.deliverables.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
        <div className="uv-brand-pages">
          {brand.pages.map((pg, i) => (
            <figure
              key={pg.id}
              data-reveal
              className={i === 0 ? 'is-cover' : ''}
            >
              <Img photo={pg} width={1400} eager={i === 0} />
            </figure>
          ))}
        </div>
        <h2 className="uv-brand-more">
          {t('Autres identités', 'Other identities')}
        </h2>
        <div className="uv-brand-next">
          {brands
            .filter((b) => b.slug !== brand.slug)
            .slice(0, 3)
            .map((b) => (
              <a key={b.slug} href={link(id, `work/${b.slug}`)}>
                <Img photo={b.pages[0]} width={700} />
                <span>
                  {b.name} <Icon name="arrowUpRight" />
                </span>
              </a>
            ))}
        </div>
      </div>
    );
  if (page.kind === 'courses')
    return (
      <CourseCarousel
        courses={courses}
        hrefs={Object.fromEntries(
          courses.map((c) => [c.slug, link('academy', `courses/${c.slug}`)]),
        )}
      />
    );
  if (page.kind === 'corporate')
    return (
      <>
        <CorporateOffers />
        <section className="uv-steps4" data-reveal>
          <h2>
            {t(
              'Comment nous construisons votre parcours',
              'How we build your track',
            )}
          </h2>
          <div>
            {corporateSteps.map(([title, copy], i) => (
              <article key={title}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="uv-corporate-brief">
          <h2>
            {t(
              'Décrivez votre besoin de formation.',
              'Describe your training need.',
            )}
          </h2>
          <SmartBrief preset={['formation']} />
        </section>
      </>
    );
  if (page.kind === 'services')
    return <ExpertiseBento items={expertiseItems()} />;
  if (page.kind === 'products') return <ProductCards />;
  if (page.kind === 'spaces') return <SpaceSlides />;
  if (page.kind === 'videos')
    return (
      <div className="sc-clip-grid">
        {films.map((f) => (
          <ClipTile
            key={f.slug}
            film={f}
            href={link('media', `video/${f.slug}`)}
          />
        ))}
      </div>
    );
  if (page.kind === 'film' && film)
    return (
      <div className="uv-film">
        <FilmPlayer film={film} />
        <div className="uv-film-meta">
          <div>
            <p className="micro">
              {film.kind} · {t('Production Smartsell', 'Smartsell production')}
            </p>
            <h2>{film.title}</h2>
            <p>
              {t(
                'Réalisation, tournage et montage : un extrait de la production signée par nos équipes.',
                'Directing, shooting and editing: an excerpt from a production signed by our teams.',
              )}
            </p>
          </div>
          <div className="im-actions">
            <a className="site-button" href={link('studio', 'booking')}>
              {t('Produire ma vidéo', 'Produce my video')}{' '}
              <Icon name="arrowUpRight" />
            </a>
            <a
              className="site-button secondary"
              href={link('agency', 'contact')}
            >
              {t('Parler à l’agence', 'Talk to the agency')}{' '}
              <Icon name="arrowUpRight" />
            </a>
          </div>
        </div>
        <h2 className="uv-film-more">{t('À voir aussi', 'Watch next')}</h2>
        <SlideRail label={t('À voir aussi', 'Watch next')}>
          {films
            .filter((f) => f.slug !== film.slug)
            .map((f) => (
              <ClipTile
                key={f.slug}
                film={f}
                href={link('media', `video/${f.slug}`)}
                className="md2-clip"
              />
            ))}
        </SlideRail>
      </div>
    );
  if (page.kind === 'podcast')
    return (
      <>
        <SpaceSlides />
        <section className="uv-studio-sec">
          <h2>{t('Nos formules podcast', 'Our podcast packages')}</h2>
          <FormulaCards family="podcast" />
        </section>
        <section className="uv-studio-sec">
          <h2>{t('Enregistré dans nos studios', 'Recorded in our studios')}</h2>
          <SlideRail label={t('Productions', 'Productions')}>
            {films.slice(0, 8).map((f) => (
              <ClipTile
                key={f.slug}
                film={f}
                href={link('media', `video/${f.slug}`)}
                className="uv-st-clip"
              />
            ))}
          </SlideRail>
        </section>
        <StudioBand />
      </>
    );
  if (page.kind === 'shooting')
    return (
      <>
        <section className="uv-studio-sec">
          <h2>{t('Nos formules shooting', 'Our shoot packages')}</h2>
          <FormulaCards family="shooting" />
        </section>
        <section className="uv-studio-sec">
          <h2>
            {t(
              'Fonds disponibles pour votre shooting',
              'Backdrops available for your shoot',
            )}
          </h2>
          <Backdrops />
        </section>
        <section className="uv-studio-sec">
          <h2>
            {t('Conseils tenues & préparation', 'Outfit & preparation tips')}
          </h2>
          <ShootingAdvice />
        </section>
        <section className="uv-studio-sec">
          <h2>{t('Nos dernières séances', 'Our latest sessions')}</h2>
          <PhotoWall photos={shoots.fashion} />
        </section>
        <StudioBand />
      </>
    );
  if (page.kind === 'packs')
    return (
      <>
        <section className="uv-studio-sec">
          <h2>Podcast</h2>
          <FormulaCards family="podcast" />
        </section>
        <section className="uv-studio-sec">
          <h2>Shooting</h2>
          <FormulaCards family="shooting" />
        </section>
      </>
    );
  if (page.kind === 'gallery')
    return (
      <>
        <PhotoWall
          photos={[...shoots.fashion, ...shoots.sport, ...shoots.spaces]}
        />
        <section className="uv-studio-sec">
          <h2>{t('Nos films', 'Our films')}</h2>
          <div className="sc-clip-grid">
            {films.map((f) => (
              <ClipTile
                key={f.slug}
                film={f}
                href={link('media', `video/${f.slug}`)}
              />
            ))}
          </div>
        </section>
      </>
    );
  if (page.kind === 'course' && course)
    return (
      <div className="uv-module">
        <div className="uv-course-facts" data-reveal>
          {[
            [t('Format', 'Format'), course.format],
            [t('Niveau', 'Level'), course.level],
            [t('Parcours', 'Track'), course.track],
            [t('Thème', 'Topic'), course.category],
          ].map(([k, v]) => (
            <div key={k}>
              <small>{k}</small>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
        <section className="uv-course-why" data-reveal>
          <figure>
            <Img photo={course.photo} width={1200} eager />
          </figure>
          <div>
            <p className="micro">
              {t('Pourquoi ce module ?', 'Why this course?')}
            </p>
            <h2>{course.why}</h2>
            <p>
              <strong>{t('Projet final : ', 'Final project: ')}</strong>
              {course.project}
            </p>
            <div className="im-actions">
              <a
                className="site-button"
                href={link('academy', `learn/${course.slug}`)}
              >
                {t('Commencer les leçons', 'Start the lessons')}{' '}
                <Icon name="arrowUpRight" />
              </a>
              <a
                className="site-button secondary"
                href={link('academy', 'corporate')}
              >
                {t('Former mon équipe', 'Train my team')}{' '}
                <Icon name="arrowUpRight" />
              </a>
            </div>
          </div>
        </section>
        <section className="uv-course-program">
          <h2>{t('Le programme', 'The programme')}</h2>
          <SlideRail label={t('Programme du module', 'Course programme')}>
            {course.program.map((item, i) => (
              <article key={item} className="uv-prog-card">
                <b>{String(i + 1).padStart(2, '0')}</b>
                <p>{item}</p>
              </article>
            ))}
          </SlideRail>
        </section>
        <section className="uv-course-out" data-reveal>
          <h2>{t('À l’issue de la formation', 'At the end of the course')}</h2>
          <div className="uv-chips big">
            {course.outcomes.map((o) => (
              <span key={o}>
                <Icon name="check" /> {o}
              </span>
            ))}
          </div>
        </section>
        <section className="uv-course-next">
          <h2>{t('Autres modules', 'Other courses')}</h2>
          <CourseCarousel
            courses={courses.filter((c) => c.slug !== course.slug)}
            hrefs={Object.fromEntries(
              courses.map((c) => [
                c.slug,
                link('academy', `courses/${c.slug}`),
              ]),
            )}
            filters={false}
          />
        </section>
      </div>
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
          <ShareArticle />
        </aside>
        <article>
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
  if (page.kind === 'faq')
    return (
      <div className="faq-list">
        {[
          [
            t('Comment réserver une séance ?', 'How do I book a session?'),
            t(
              'Choisissez une formule et un créneau dans la page Réserver : votre demande part sur notre WhatsApp et l’équipe confirme la disponibilité.',
              'Pick a package and a slot on the Book page: your request goes to our WhatsApp and the team confirms availability.',
            ),
          ],
          [
            t('Que faut-il préparer ?', 'What should I prepare?'),
            t(
              'Votre format, le nombre de personnes, vos références et les livrables attendus. Pour un shooting, prévoyez deux ou trois tenues.',
              'Your format, the number of people, your references and the expected deliverables. For a shoot, bring two or three outfits.',
            ),
          ],
          [
            t('L’opérateur est-il inclus ?', 'Is the operator included?'),
            t(
              'Oui : chaque formule inclut le matériel et un opérateur de studio.',
              'Yes: every package includes the equipment and a studio operator.',
            ),
          ],
          [
            t('Comment connaître le tarif ?', 'How do I get a price?'),
            t(
              'Le tarif dépend de la durée, de la formule et des livrables. Nous vous envoyons un devis dès réception de votre demande.',
              'The price depends on duration, package and deliverables. We send you a quote as soon as we receive your request.',
            ),
          ],
          [
            t('Le montage est-il inclus ?', 'Is editing included?'),
            t(
              'Les formules Podcast + montage et Podcast + montage + Reels incluent le montage, le mixage et l’étalonnage.',
              'The Podcast + editing and Podcast + editing + Reels packages include editing, mixing and colour grading.',
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
          {t('Réserver une séance', 'Book a session')}
        </Action>
      </div>
    );
  return (
    <>
      {space && (
        <figure className="uv-space-cover">
          <Img
            photo={
              (
                {
                  podcast: photos.podcastNeon,
                  photo: photos.studioPink,
                  video: photos.videoField,
                } as Record<string, Photo>
              )[space.slug] ?? photos.studioWhite
            }
            width={1600}
            eager
          />
        </figure>
      )}
      <StoryCards id={id} page={page} />
      {pack && (
        <a
          className="site-button"
          href={`${link(id, 'booking')}?pack=${pack.slug}`}
        >
          {t('Réserver cette formule', 'Book this package')}{' '}
          <Icon name="arrowUpRight" />
        </a>
      )}
      {space && (
        <Action id={id} path="booking">
          {t('Réserver ce plateau', 'Book this set')}
        </Action>
      )}
      {page.kind === 'management' && (
        <a className="site-button" href={managementUrl}>
          {t('Ouvrir Smartsell Management', 'Open Smartsell Management')}{' '}
          <Icon name="arrowUpRight" />
        </a>
      )}
      {page.kind === 'obtura' && (
        <a
          className="site-button"
          href="https://seydoutra.github.io/obtura/#commencer"
        >
          {t('Essayer Obtura', 'Try Obtura')} <Icon name="arrowUpRight" />
        </a>
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
  const course =
    page.kind === 'learn'
      ? courses.find((c) => c.slug === page.ref)
      : undefined;
  if (
    id === 'academy' &&
    [
      'dashboard',
      'learn',
      'attestation-document',
      'attestation-verify',
    ].includes(page.kind || '')
  )
    return (
      <div className="vertical-site site-academy ss-academy-campus">
        <Header id={id} path={page.path} />
        <main id="main" className="ss-academy-workspace">
          {page.kind === 'dashboard' ? (
            <h1 className="ss-learning-sr">
              {t(
                'Espace apprenant Smartsell Academy',
                'Smartsell Academy learner space',
              )}
            </h1>
          ) : page.kind?.startsWith('attestation-') ? (
            <h1 className="ss-learning-sr">{page.title}</h1>
          ) : (
            <header className="ss-learning-lesson-heading">
              <a href={link('academy', 'dashboard')}>
                ← {t('Mon tableau de bord', 'My dashboard')}
              </a>
              <p className="micro">
                SMARTSELL ACADEMY /{' '}
                {course?.full
                  ? t('FORMATION COMPLÈTE', 'FULL COURSE')
                  : t('DÉCOUVERTE', 'INTRODUCTION')}
              </p>
              <h1>{page.title}</h1>
            </header>
          )}
          <Content id={id} page={page} />
        </main>
        <footer className="ss-learning-footer">
          <a href={link('academy')}>Smartsell Academy</a>
          <p>{t('Apprendre. Créer. Avancer.', 'Learn. Create. Grow.')}</p>
          <a href={link('academy', 'privacy')}>
            {t('Vos données', 'Your data')}
          </a>
        </footer>
      </div>
    );
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
              cover={
                brands.find((b) => b.slug === page.ref)?.pages[0] ??
                courses.find((c) => c.slug === page.ref)?.photo ??
                (page.path === 'work' ? shoots.fashion[2] : undefined)
              }
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
              {id === 'media' ? (
                <div className="md2 md2-inner">
                  <MediaSide current={page.ref || page.path} />
                  <div className="md2-main">
                    <Content id={id} page={page} />
                  </div>
                </div>
              ) : (
                <div className="site-container">
                  <Content id={id} page={page} />
                </div>
              )}
            </section>
            {!['learn', 'dashboard', 'booking', 'podcast', 'shooting'].includes(
              page.kind || '',
            ) && <InnerCta id={id} path={page.path} />}
          </>
        )}
      </main>
      <Footer id={id} />
      <MotionLayer />
    </div>
  );
}
