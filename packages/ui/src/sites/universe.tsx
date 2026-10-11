import { Icon } from '../icons';
import type { VerticalId } from '@smartsell/types';
import {
  agencyServices,
  articles,
  cases,
  courses,
  packs,
  siteMenus,
  spaces,
  type SitePageData,
} from '@smartsell/content/sites';
import { photos, videos, type Photo } from '@smartsell/content/photos';
import {
  managementUrl,
  routingConfig,
  urlFor,
  locale,
  t,
} from '@smartsell/routing';
import { Highlight } from '../signature';
import {
  CtaLink,
  HorizontalScroll,
  Img,
  Marquee,
  PhotoRail,
  Video,
  ZoomReveal,
} from '../immersive';
import { ExpandPanels } from '../home';
import {
  ArticleTabs,
  CourseFinder,
  HoverReveal,
  Timecode,
  TodayLine,
  TypedPrompt,
} from './universe-client';

/*
 * Cinq univers, cinq compositions : Agency (studio créatif), Academy
 * (campus lumineux), Media (journal), Studios (cinéma), Labs (produit tech).
 * Aucun chiffre, client ou témoignage n'est inventé : les contenus viennent
 * du registre des sites.
 */

const go = (id: VerticalId | 'main', path = '') =>
  urlFor(id, locale, path, routingConfig);

const agencyShots: Photo[] = [
  photos.agencyDesigner,
  photos.agencyLogo,
  photos.agencyTablet,
  photos.agencySticky,
  photos.agencyGlass,
  photos.teamSofa,
];
const caseShots: Photo[] = [
  photos.agencyLogo,
  photos.agencyGlass,
  photos.agencyDesigner,
  photos.agencySticky,
  photos.agencyTablet,
  photos.teamSofa,
];
const coursePhotos: Record<string, Photo> = {
  'marketing-digital': photos.academyRoom,
  'community-management': photos.phonePink,
  'design-graphique': photos.agencyDesigner,
  'ui-ux': photos.agencyLogo,
  web: photos.labsCoder,
  'intelligence-artificielle': photos.labsNight,
  'power-bi': photos.academyHome,
  'creation-video': photos.videoGimbal,
};
const articleShots: Photo[] = [
  photos.mediaReader,
  photos.mediaInterview,
  photos.mediaPresenter,
  photos.mediaReporter,
  photos.socialNight,
  photos.agencyGlass,
  photos.labsCoder,
  photos.academyHome,
  photos.podcastWhite,
  photos.phoneShop,
];
const articlePhoto = (i: number) => articleShots[i % articleShots.length];

/* ------------------------------------------------------------------ */
/* AGENCY : studio créatif, noir et jaune, typographie géante          */
/* ------------------------------------------------------------------ */
function AgencyHome() {
  return (
    <>
      <section className="uv-ag-hero" aria-labelledby="ag-title">
        <Video clip={videos.team} />
        <div className="uv-ag-hero-top">
          <span className="sg-mono">
            {t(
              'Smartsell Agency · Bande démo 2026',
              'Smartsell Agency · Showreel 2026',
            )}
          </span>
          <span className="sg-mono">
            Conakry <Icon name="arrowRight" /> {t('partout', 'everywhere')}
          </span>
        </div>
        <h1 id="ag-title">
          <span>{t('On donne', 'We give')}</span>
          <span>
            {t('du', 'brands')} <Highlight>{t('relief', 'depth')}</Highlight>
          </span>
          <span>{t('aux marques.', 'and edge.')}</span>
        </h1>
        <div className="uv-ag-hero-foot">
          <p>
            {t(
              'Stratégie, identité, digital et campagnes : une équipe créative qui transforme une ambition en marque qu’on reconnaît, qu’on retient et qu’on choisit.',
              'Strategy, identity, digital and campaigns: a creative team that turns an ambition into a brand people recognise, remember and choose.',
            )}
          </p>
          <div className="im-actions">
            <CtaLink href={go('agency', 'contact')}>
              {t('Démarrer un projet', 'Start a project')}
            </CtaLink>
            <CtaLink href={go('agency', 'work')} tone="ghost">
              {t('Voir le portfolio', 'See the portfolio')}
            </CtaLink>
          </div>
        </div>
      </section>

      <Marquee
        tone="yellow"
        items={[
          t('Stratégie', 'Strategy'),
          t('Identité', 'Identity'),
          'Social media',
          t('Publicité', 'Advertising'),
          t('Sites web', 'Websites'),
          t('Contenus', 'Content'),
          t('Campagnes', 'Campaigns'),
        ]}
      />

      <HorizontalScroll
        eyebrow={t(
          '01 · Explorations sélectionnées',
          '01 · Selected explorations',
        )}
        title={t(
          'Six concepts pour montrer comment on pense une marque.',
          'Six concepts to show how we think about a brand.',
        )}
        items={cases.map((c, i) => ({
          label: `${c.category} · Concept`,
          title: c.title,
          copy: c.tagline,
          photo: caseShots[i % caseShots.length],
          href: go('agency', `work/${c.slug}`),
          cta: t('Voir l’exploration', 'See the exploration'),
        }))}
      />

      <section className="uv-ag-services" aria-labelledby="ag-services">
        <div className="uv-wrap uv-ag-services-head">
          <span className="sg-mono">
            {t('02 · Expertises', '02 · Expertise')}
          </span>
          <h2 id="ag-services">
            {t(
              'Tout ce dont votre marque a besoin.',
              'Everything your brand needs.',
            )}{' '}
            <em>{t('Rien de superflu.', 'Nothing it doesn’t.')}</em>
          </h2>
          <CtaLink href={go('agency', 'services')}>
            {t('Les', 'All')} {agencyServices.length}{' '}
            {t('expertises', 'services')}
          </CtaLink>
        </div>
        <div className="uv-wrap">
          <HoverReveal
            rows={agencyServices.slice(0, 8).map((s, i) => ({
              href: go('agency', `services/${s.slug}`),
              index: String(i + 1).padStart(2, '0'),
              title: s.title,
              copy: s.copy,
              photo: agencyShots[i % agencyShots.length],
            }))}
          />
        </div>
      </section>

      <section className="uv-ag-atelier" aria-labelledby="ag-atelier">
        <div className="uv-wrap uv-ag-atelier-grid">
          <figure className="a">
            <Img photo={photos.agencySticky} width={900} />
          </figure>
          <figure className="b">
            <Img photo={photos.agencyGlass} width={900} />
          </figure>
          <figure className="c">
            <Img photo={photos.agencyDesigner} width={900} />
          </figure>
          <div className="uv-ag-atelier-copy">
            <span className="sg-mono">
              {t('03 · L’atelier', '03 · The studio')}
            </span>
            <h2 id="ag-atelier">
              {t(
                'Écouter. Explorer. Construire. Transmettre.',
                'Listen. Explore. Build. Hand over.',
              )}
            </h2>
            <p>
              {t(
                'Chaque projet commence par une conversation franche et se termine par des outils que vous savez utiliser. Entre les deux : des pistes créatives, des choix argumentés et des livrables soignés.',
                'Every project starts with an honest conversation and ends with tools you know how to use. In between: creative directions, reasoned choices and carefully crafted deliverables.',
              )}
            </p>
            <CtaLink href={go('agency', 'history')} tone="dark">
              {t('Notre manière de faire', 'How we work')}
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="uv-ag-cta">
        <div className="uv-wrap">
          <p className="sg-mono">
            {t('Votre marque, en plus grand', 'Your brand, bigger')}
          </p>
          <h2>
            {t('Parlons de', 'Let’s talk about')} <br />
            <Highlight>{t('votre projet.', 'your project.')}</Highlight>
          </h2>
          <div className="im-actions">
            <CtaLink href={go('agency', 'contact')}>
              {t('Écrire à l’agence', 'Write to the agency')}
            </CtaLink>
            <CtaLink href={go('agency', 'careers')} tone="ghost">
              {t('Rejoindre le collectif', 'Join the collective')}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* ACADEMY : campus lumineux, crème et violet, formes arrondies         */
/* ------------------------------------------------------------------ */
function AcademyHome() {
  return (
    <>
      <section className="uv-ac-hero" aria-labelledby="ac-title">
        <div className="uv-wrap uv-ac-hero-grid">
          <div className="uv-ac-hero-copy">
            <span className="uv-pill">
              <Icon name="stars" />{' '}
              {t(
                'Smartsell Academy · Apprendre en faisant',
                'Smartsell Academy · Learn by doing',
              )}
            </span>
            <h1 id="ac-title">
              {t('Apprenez le digital', 'Learn digital skills')}{' '}
              <em>{t('en le pratiquant.', 'by practising them.')}</em>
            </h1>
            <p>
              {t(
                'Marketing, design, web, IA, data et vidéo : des modules courts, un projet concret et trois leçons à essayer dès aujourd’hui.',
                'Marketing, design, web, AI, data and video: short courses, a real project and three lessons to try today.',
              )}
            </p>
            <div className="im-actions">
              <CtaLink href={go('academy', 'courses')} tone="dark">
                {t('Choisir un module', 'Choose a course')}
              </CtaLink>
              <CtaLink href={go('academy', 'corporate')} tone="ghost">
                {t('Former mon équipe', 'Train my team')}
              </CtaLink>
            </div>
          </div>
          <div className="uv-ac-collage" aria-hidden="true">
            <figure className="a">
              <Img photo={photos.academyRoom} width={900} eager />
            </figure>
            <figure className="b">
              <Img photo={photos.academyHome} width={600} eager />
            </figure>
            <figure className="c">
              <Img photo={photos.learnerFocus} width={600} eager />
            </figure>
            <span className="uv-ac-badge one">
              <Icon name="check" />{' '}
              {t('3 leçons d’aperçu', '3 preview lessons')}
            </span>
            <span className="uv-ac-badge two">
              <Icon name="task" /> {t('Un projet concret', 'A real project')}
            </span>
            <span className="uv-ac-badge three">
              <Icon name="star" />{' '}
              {t('Quiz & progression', 'Quizzes & progress')}
            </span>
          </div>
        </div>
      </section>

      <section className="uv-ac-finder" aria-labelledby="ac-finder">
        <div className="uv-wrap">
          <h2 id="ac-finder" className="sr-only">
            {t('Trouver un module', 'Find a course')}
          </h2>
          <CourseFinder
            items={courses.map((c) => ({
              href: go('academy', `courses/${c.slug}`),
              title: c.title,
              category: c.category,
              level: c.level,
              hours: c.hours,
              goal: c.goal,
              photo: coursePhotos[c.slug] ?? photos.academyRoom,
            }))}
          />
        </div>
      </section>

      <section className="uv-ac-steps" aria-labelledby="ac-steps">
        <div className="uv-wrap">
          <span className="uv-pill">
            {t('Comment ça marche', 'How it works')}
          </span>
          <h2 id="ac-steps">
            {t('Quatre étapes, zéro jargon.', 'Four steps, zero jargon.')}
          </h2>
          <ol>
            {[
              [
                t('Choisir', 'Choose'),
                t(
                  'Un thème, un niveau, un objectif clair.',
                  'A topic, a level, a clear objective.',
                ),
              ],
              [
                t('Essayer', 'Try'),
                t(
                  'Trois leçons d’aperçu avec exercice et quiz.',
                  'Three preview lessons with exercises and quizzes.',
                ),
              ],
              [
                t('Pratiquer', 'Practise'),
                t(
                  'Un projet concret qui donne du sens au module.',
                  'A real project that gives the course meaning.',
                ),
              ],
              [
                t('Progresser', 'Progress'),
                t(
                  'Votre espace garde la trace de vos leçons.',
                  'Your space keeps track of your lessons.',
                ),
              ],
            ].map(([t, c], i) => (
              <li key={t} style={{ animationDelay: `${i * 120}ms` }}>
                <b>{i + 1}</b>
                <strong>{t}</strong>
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="uv-ac-formats" aria-labelledby="ac-formats">
        <div className="uv-wrap uv-ac-formats-grid">
          <a href={go('academy', 'courses')} className="uv-ac-format">
            <Img photo={photos.academyHome} width={900} />
            <div>
              <span className="uv-pill">
                {t('Pour les talents', 'For talents')}
              </span>
              <h3 id="ac-formats">
                {t(
                  'Un métier du digital, pas à pas.',
                  'A digital career, step by step.',
                )}
              </h3>
              <p>
                {t(
                  'Des modules pour démarrer ou se perfectionner, à votre rythme.',
                  'Courses to get started or improve, at your own pace.',
                )}
              </p>
              <b>
                {t('Explorer les modules', 'Explore the courses')}{' '}
                <Icon name="arrowRight" />
              </b>
            </div>
          </a>
          <a href={go('academy', 'corporate')} className="uv-ac-format dark">
            <Img photo={photos.learnerFocus} width={900} />
            <div>
              <span className="uv-pill">
                {t('Pour les équipes', 'For teams')}
              </span>
              <h3>
                {t(
                  'Des formations construites pour vos enjeux.',
                  'Training built around your challenges.',
                )}
              </h3>
              <p>
                {t(
                  'Un programme adapté à vos outils, vos objectifs et vos équipes.',
                  'A programme adapted to your tools, goals and teams.',
                )}
              </p>
              <b>
                {t('Former mon équipe', 'Train my team')}{' '}
                <Icon name="arrowRight" />
              </b>
            </div>
          </a>
        </div>
      </section>

      <section className="uv-ac-faq" aria-labelledby="ac-faq">
        <div className="uv-wrap uv-ac-faq-grid">
          <div>
            <span className="uv-pill">{t('Questions fréquentes', 'FAQ')}</span>
            <h2 id="ac-faq">{t('Avant de commencer.', 'Before you start.')}</h2>
            <CtaLink href={go('academy', 'support')} tone="dark">
              {t('Contacter le support', 'Contact support')}
            </CtaLink>
          </div>
          <div className="uv-ac-faq-list">
            {[
              [
                t(
                  'Faut-il un niveau particulier ?',
                  'Do I need a particular level?',
                ),
                t(
                  'Chaque module indique son niveau. Les modules débutants ne demandent aucun prérequis.',
                  'Each course shows its level. Beginner courses require no prerequisites.',
                ),
              ],
              [
                t('Les leçons sont-elles gratuites ?', 'Are the lessons free?'),
                t(
                  'Les trois leçons d’aperçu de chaque module sont accessibles librement sur ce site de démonstration.',
                  'The three preview lessons of each course are freely available on this demonstration site.',
                ),
              ],
              [
                t('Recevrai-je un certificat ?', 'Will I get a certificate?'),
                t(
                  'Le récapitulatif imprimable indique les leçons suivies ; il n’a pas valeur de certification officielle.',
                  'The printable summary lists the lessons you followed; it is not an official certification.',
                ),
              ],
              [
                t(
                  'Peut-on former toute une équipe ?',
                  'Can we train a whole team?',
                ),
                t(
                  'Oui : la page Entreprises décrit l’accompagnement sur mesure pour les équipes.',
                  'Yes: the Companies page describes tailored support for teams.',
                ),
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="uv-ac-cta">
        <div className="uv-wrap">
          <h2>
            {t('Votre prochaine compétence', 'Your next skill')}{' '}
            <em>{t('commence aujourd’hui.', 'starts today.')}</em>
          </h2>
          <div className="im-actions">
            <CtaLink href={go('academy', 'courses')}>
              {t('Commencer une leçon', 'Start a lesson')}
            </CtaLink>
            <CtaLink href={go('academy', 'dashboard')} tone="ghost">
              {t('Mon espace', 'My space')}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* MEDIA : journal, papier, encre, rouge                               */
/* ------------------------------------------------------------------ */
function MediaHome() {
  const [lead, second, third, ...rest] = articles;
  const href = (slug: string) => go('media', `article/${slug}`);
  return (
    <>
      <section className="uv-md-mast" aria-labelledby="md-title">
        <div className="uv-wrap">
          <div className="uv-md-mast-line">
            <span>{t('Conakry · Guinée', 'Conakry · Guinea')}</span>
            <TodayLine fallback={t('Édition numérique', 'Digital edition')} />
            <span>{t('Édition N°01 · Gratuit', 'Issue No. 01 · Free')}</span>
          </div>
          <h1 id="md-title">Smartsell Media</h1>
          <p className="uv-md-motto">
            {t(
              'Tech, business et culture créative : comprendre ce qui vient.',
              'Tech, business and creative culture: understanding what’s next.',
            )}
          </p>
          <nav aria-label="Rubriques" className="uv-md-rubrics">
            {siteMenus.media.map((m) => (
              <a key={m.path} href={go('media', m.path)}>
                {m.label}
              </a>
            ))}
            <a href={go('media', 'opinions')}>Opinions</a>
            <a href={go('media', 'africa')}>{t('Afrique', 'Africa')}</a>
          </nav>
        </div>
      </section>

      <div className="uv-md-ticker">
        <span className="uv-md-ticker-label">{t('À la une', 'Top story')}</span>
        <Marquee
          tone="light"
          items={articles.slice(0, 8).map((a) => a.title)}
        />
      </div>

      <section className="uv-md-front" aria-label={t('La une', 'Front page')}>
        <div className="uv-wrap uv-md-front-grid">
          <a className="uv-md-lead" href={href(lead.slug)}>
            <figure>
              <Img photo={articlePhoto(0)} width={1400} eager />
            </figure>
            <span className="uv-kicker">{lead.category} · Analyse</span>
            <h2>{lead.title}</h2>
            <p>{lead.summary}</p>
            <span className="uv-md-by">
              {t('Par la rédaction', 'By the newsroom')} · {lead.minutes} min
            </span>
          </a>
          <div className="uv-md-side">
            {[second, third].map((a, i) => (
              <a key={a.slug} href={href(a.slug)}>
                <figure>
                  <Img photo={articlePhoto(i + 1)} width={700} />
                </figure>
                <span className="uv-kicker">{a.category}</span>
                <h3>{a.title}</h3>
              </a>
            ))}
          </div>
          <aside className="uv-md-briefs" aria-label={t('En bref', 'In brief')}>
            <h3>{t('En bref', 'In brief')}</h3>
            {rest.slice(0, 6).map((a, i) => (
              <a key={a.slug} href={href(a.slug)}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <span>
                  <em>{a.category}</em> {a.title}
                </span>
              </a>
            ))}
            <a className="uv-md-all" href={go('media', 'latest')}>
              {t('Tous les articles', 'All articles')}{' '}
              <Icon name="arrowRight" />
            </a>
          </aside>
        </div>
      </section>

      <section
        className="uv-md-quote"
        aria-label={t('Le mot de la rédaction', 'A word from the newsroom')}
      >
        <div className="uv-wrap uv-md-quote-grid">
          <figure>
            <Img photo={photos.mediaPresenter} width={900} />
          </figure>
          <blockquote>
            <p>
              {t(
                '« Les outils changent vite. Notre rôle : les rendre lisibles, utiles et proches de celles et ceux qui entreprennent ici. »',
                '“Tools change fast. Our role: make them readable, useful and close to the people building things here.”',
              )}
            </p>
            <footer>
              {t(
                'La rédaction de Smartsell Media',
                'The Smartsell Media newsroom',
              )}
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="uv-md-sections" aria-labelledby="md-sections">
        <div className="uv-wrap">
          <div className="uv-md-section-head">
            <h2 id="md-sections">{t('Les rubriques', 'Sections')}</h2>
            <a href={go('media', 'search')}>
              {t('Rechercher un article', 'Search for an article')}{' '}
              <Icon name="arrowRight" />
            </a>
          </div>
          <ArticleTabs
            articles={articles.map((a, i) => ({
              href: href(a.slug),
              title: a.title,
              summary: a.summary,
              category: a.category,
              minutes: a.minutes,
              photo: articlePhoto(i),
            }))}
          />
        </div>
      </section>

      <section className="uv-md-gallery" aria-labelledby="md-gallery">
        <div className="uv-wrap uv-md-section-head">
          <h2 id="md-gallery">{t('En images', 'In pictures')}</h2>
          <a href={go('media', 'interviews')}>
            {t('Les entretiens', 'Interviews')} <Icon name="arrowRight" />
          </a>
        </div>
        <PhotoRail
          photos={[
            photos.mediaReporter,
            photos.mediaInterview,
            photos.mediaPresenter,
            photos.mediaReader,
            photos.podcastWhite,
            photos.socialNight,
          ]}
        />
      </section>

      <section className="uv-md-letter" aria-labelledby="md-letter">
        <div className="uv-wrap uv-md-letter-card">
          <span className="uv-kicker">
            {t('La lettre du vendredi', 'The Friday letter')}
          </span>
          <h2 id="md-letter">
            {t(
              'L’essentiel de la semaine, en cinq minutes.',
              'The week’s essentials, in five minutes.',
            )}
          </h2>
          <p>
            {t(
              'Une sélection d’analyses, de guides et d’idées à appliquer, chaque vendredi dans votre boîte mail.',
              'A selection of analyses, guides and ideas to apply, every Friday in your inbox.',
            )}
          </p>
          <CtaLink href={go('media', 'newsletter')} tone="dark">
            {t('Je m’abonne', 'Subscribe')}
          </CtaLink>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* STUDIOS : cinéma, noir profond, lumière ambrée                      */
/* ------------------------------------------------------------------ */
function StudioHome() {
  const strip: Photo[] = [
    photos.studioPink,
    photos.cameraClose,
    photos.podcastNeon,
    photos.studioWhite,
    photos.videoField,
    photos.photographer,
    photos.podcastWhite,
    photos.cameraStreet,
  ];
  return (
    <>
      <section className="uv-st-hero" aria-labelledby="st-title">
        <Video clip={videos.camera} />
        <div className="uv-st-frame" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="uv-st-hud">
          <Timecode />
          <span className="sg-mono">4K · 25 FPS · ISO 800</span>
        </div>
        <div className="uv-st-hero-copy">
          <span className="sg-mono">Smartsell Studios · Conakry</span>
          <h1 id="st-title">
            <span>{t('Lumière.', 'Lights.')}</span>
            <span>{t('Caméra.', 'Camera.')}</span>
            <span>
              <em>{t('Votre histoire.', 'Your story.')}</em>
            </span>
          </h1>
          <p>
            {t(
              'Plateaux photo, vidéo et podcast, équipe technique et accompagnement : de la préparation au rendu final.',
              'Photo, video and podcast sets, a technical crew and support: from preparation to final delivery.',
            )}
          </p>
          <div className="im-actions">
            <CtaLink href={go('studio', 'booking')}>
              {t('Préparer ma session', 'Prepare my session')}
            </CtaLink>
            <CtaLink href={go('studio', 'spaces')} tone="ghost">
              {t('Visiter les plateaux', 'Visit the sets')}
            </CtaLink>
          </div>
        </div>
      </section>

      <div className="uv-st-film" aria-hidden="true">
        <div className="uv-st-film-track">
          {[...strip, ...strip].map((p, i) => (
            <figure key={i}>
              <Img photo={p} width={600} />
            </figure>
          ))}
        </div>
      </div>

      <section className="uv-st-spaces" aria-labelledby="st-spaces">
        <div className="uv-wrap uv-st-head">
          <span className="sg-mono">
            {t('Scène 01 · Les plateaux', 'Scene 01 · The sets')}
          </span>
          <h2 id="st-spaces">
            {t(
              'Trois espaces, une même exigence d’image.',
              'Three spaces, one standard of image.',
            )}
          </h2>
        </div>
        <div className="uv-wrap">
          <ExpandPanels
            panels={spaces.map((s, i) => ({
              kicker: `${s.use}`,
              title: s.title,
              copy: s.copy,
              photo: [photos.studioPink, photos.videoField, photos.podcastNeon][
                i
              ],
              video: [undefined, videos.camera, videos.podcast][i],
              href: go('studio', `spaces/${s.slug}`),
              cta: t('Découvrir le plateau', 'Discover the set'),
            }))}
          />
        </div>
      </section>

      <section className="uv-st-packs" aria-labelledby="st-packs">
        <div className="uv-wrap uv-st-head">
          <span className="sg-mono">
            {t('Scène 02 · Les packs', 'Scene 02 · The packs')}
          </span>
          <h2 id="st-packs">
            {t(
              'Choisissez votre format, on s’occupe du plateau.',
              'Choose your format, we take care of the set.',
            )}
          </h2>
        </div>
        <div className="uv-wrap uv-st-clap-grid">
          {packs.map((p, i) => (
            <a
              key={p.slug}
              href={go('studio', `packs/${p.slug}`)}
              className="uv-clap"
            >
              <div className="uv-clap-top" aria-hidden="true" />
              <div className="uv-clap-body">
                <dl>
                  <div>
                    <dt>{t('Prise', 'Take')}</dt>
                    <dd>{String(i + 1).padStart(2, '0')}</dd>
                  </div>
                  <div>
                    <dt>{t('Durée', 'Duration')}</dt>
                    <dd>{p.duration} h</dd>
                  </div>
                  <div>
                    <dt>{t('Plateau', 'Set')}</dt>
                    <dd>
                      {spaces
                        .find((s) => s.slug === p.space)
                        ?.title.replace('Plateau ', '')
                        .replace('Espace ', '')}
                    </dd>
                  </div>
                </dl>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
                <span>
                  {t('Voir le pack', 'See the pack')} <Icon name="arrowRight" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="uv-st-steps" aria-labelledby="st-steps">
        <div className="uv-wrap">
          <span className="sg-mono">
            {t('Scène 03 · Le déroulé', 'Scene 03 · The flow')}
          </span>
          <h2 id="st-steps">
            {t('De l’idée au fichier final.', 'From idea to final file.')}
          </h2>
          <div className="uv-st-steps-row">
            {[
              [
                '00:00',
                t('Choisir', 'Choose'),
                t(
                  'Le pack, le plateau et la date.',
                  'The pack, the set and the date.',
                ),
              ],
              [
                '00:15',
                t('Préparer', 'Prepare'),
                t(
                  'Brief, conducteur, références.',
                  'Brief, running order, references.',
                ),
              ],
              [
                '01:00',
                t('Tourner', 'Shoot'),
                t(
                  'Lumière, son, cadre : on y va.',
                  'Light, sound, frame: action.',
                ),
              ],
              [
                '02:00',
                t('Recevoir', 'Receive'),
                t(
                  'Sélection, montage selon le pack.',
                  'Selection and editing, depending on the pack.',
                ),
              ],
            ].map(([t, a, b]) => (
              <div key={a}>
                <span className="sg-mono">{t}</span>
                <strong>{a}</strong>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="uv-st-cta">
        <Img photo={photos.studioWhite} width={1800} />
        <div className="uv-wrap">
          <h2>
            {t('Silence.', 'Quiet.')} <em>{t('On tourne.', 'Rolling.')}</em>
          </h2>
          <div className="im-actions">
            <CtaLink href={go('studio', 'booking')}>
              {t('Simuler une réservation', 'Try a booking')}
            </CtaLink>
            <CtaLink href={go('studio', 'faq')} tone="ghost">
              {t('Questions fréquentes', 'FAQ')}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* LABS : produit tech, grille, monospace, menthe et violet            */
/* ------------------------------------------------------------------ */
function LabsHome() {
  return (
    <>
      <section className="uv-lb-hero" aria-labelledby="lb-title">
        <div className="uv-wrap uv-lb-hero-grid">
          <div className="uv-lb-hero-copy">
            <TypedPrompt
              lines={[
                'labs:~$ smartsell build --next',
                t('› problèmes réels détectés', '› real problems detected'),
                t(
                  '› produits utiles en cours',
                  '› useful products in progress',
                ),
              ]}
            />
            <h1 id="lb-title">
              {t('Des outils qui', 'Tools that')}{' '}
              <em>{t('travaillent', 'work')}</em> {t('pour vous.', 'for you.')}
            </h1>
            <p>
              {t(
                'Smartsell Labs conçoit des produits numériques pour les entreprises et les créateurs, à partir de leurs vrais usages.',
                'Smartsell Labs designs digital products for businesses and creators, based on how they really work.',
              )}
            </p>
            <div className="im-actions">
              <CtaLink href={managementUrl}>
                {t('Essayer Management', 'Try Management')}
              </CtaLink>
              <CtaLink href={go('labs', 'products')} tone="ghost">
                {t('Tous les produits', 'All products')}
              </CtaLink>
            </div>
          </div>
          <div className="uv-lb-app" aria-hidden="true">
            <div className="uv-lb-app-bar">
              <i />
              <i />
              <i />
              <span>management.smartsell</span>
            </div>
            <div className="uv-lb-app-body">
              <aside>
                {[
                  t('Tableau de bord', 'Dashboard'),
                  'Clients',
                  t('Projets', 'Projects'),
                  'Planning',
                  'Finances',
                ].map((x, i) => (
                  <span key={x} className={i === 0 ? 'on' : ''}>
                    {x}
                  </span>
                ))}
              </aside>
              <div>
                <div className="uv-lb-kpis">
                  {[
                    t('Clients actifs', 'Active clients'),
                    t('Projets en cours', 'Ongoing projects'),
                    t('Échéances', 'Deadlines'),
                  ].map((k) => (
                    <div key={k}>
                      <small>{k}</small>
                      <b />
                    </div>
                  ))}
                </div>
                <div className="uv-lb-chart">
                  {[40, 62, 48, 75, 58, 82, 70, 90].map((h, i) => (
                    <i key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="uv-lb-rows">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <span className="uv-lb-note">
              {t('Illustration de l’interface', 'Interface illustration')}
            </span>
          </div>
        </div>
      </section>

      <section className="uv-lb-products" aria-labelledby="lb-products">
        <div className="uv-wrap">
          <span className="sg-mono">{t('// produits', '// products')}</span>
          <h2 id="lb-products">
            {t(
              'Deux produits, une même obsession : l’usage.',
              'Two products, one obsession: real use.',
            )}
          </h2>
          <div className="uv-lb-product-grid">
            <a
              href={go('labs', 'products/management')}
              className="uv-lb-product"
            >
              <span className="uv-lb-status live">
                {' '}
                {t('Disponible', 'Available')}
              </span>
              <h3>Smartsell Management</h3>
              <p>
                {t(
                  'Clients, projets, planning et finances réunis pour piloter votre activité sur un seul écran.',
                  'Clients, projects, planning and finances together, to run your business from a single screen.',
                )}
              </p>
              <b>
                {t('Découvrir', 'Discover')} <Icon name="arrowRight" />
              </b>
            </a>
            <a href={go('labs', 'products/obtura')} className="uv-lb-product">
              <span className="uv-lb-status">
                {' '}
                {t('Vision produit', 'Product vision')}
              </span>
              <h3>Obtura</h3>
              <p>
                {t(
                  'Un système de travail envisagé pour les photographes, vidéastes et créateurs visuels.',
                  'A working system envisioned for photographers, videographers and visual creators.',
                )}
              </p>
              <b>
                {t('Lire la vision', 'Read the vision')}{' '}
                <Icon name="arrowRight" />
              </b>
            </a>
          </div>
        </div>
      </section>

      <section className="uv-lb-bento" aria-labelledby="lb-bento">
        <div className="uv-wrap">
          <span className="sg-mono">// management</span>
          <h2 id="lb-bento">
            {t('Ce que Management réunit.', 'What Management brings together.')}
          </h2>
          <div className="uv-lb-bento-grid">
            <div className="big">
              <small>01</small>
              <h3>Clients</h3>
              <p>
                {t(
                  'Un historique clair de chaque relation, du premier contact au suivi.',
                  'A clear history of each relationship, from first contact to follow-up.',
                )}
              </p>
              <div className="uv-lb-mini-list" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div>
              <small>02</small>
              <h3>{t('Projets', 'Projects')}</h3>
              <p>
                {t(
                  'Étapes, responsables et livrables au même endroit.',
                  'Steps, owners and deliverables in one place.',
                )}
              </p>
            </div>
            <div>
              <small>03</small>
              <h3>Planning</h3>
              <p>
                {t(
                  'Les échéances de l’équipe, visibles d’un coup d’œil.',
                  'The team’s deadlines, visible at a glance.',
                )}
              </p>
            </div>
            <div className="wide">
              <small>04</small>
              <h3>Finances</h3>
              <p>
                {t(
                  'Devis, factures et suivi des paiements, sans tableur dispersé.',
                  'Quotes, invoices and payment tracking, without scattered spreadsheets.',
                )}
              </p>
              <div className="uv-lb-chart small" aria-hidden="true">
                {[30, 55, 42, 68, 50, 77].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <figure className="photo">
              <Img photo={photos.labsCoder} width={900} />
            </figure>
          </div>
        </div>
      </section>

      <section className="uv-lb-research" aria-labelledby="lb-research">
        <div className="uv-wrap">
          <span className="sg-mono">{t('// recherche', '// research')}</span>
          <h2 id="lb-research">
            {t('Les pistes que nous explorons.', 'The leads we are exploring.')}
          </h2>
          <div className="uv-lb-term-grid">
            {[
              [
                'ops.petites-equipes',
                t(
                  'Observer ce qui se perd entre contacts, projets et suivi.',
                  'Observe what gets lost between contacts, projects and follow-up.',
                ),
              ],
              [
                'metiers.creation',
                t(
                  'Soutenir la continuité d’une production créative.',
                  'Support the continuity of a creative production.',
                ),
              ],
              [
                'interfaces.assistees',
                t(
                  'Tester des parcours avec validation humaine.',
                  'Test journeys with human validation.',
                ),
              ],
            ].map(([k, v]) => (
              <a key={k} href={go('labs', 'research')} className="uv-lb-term">
                <span className="uv-lb-term-bar">
                  <i />
                  <i />
                  <i />
                </span>
                <code>
                  <span>$ explore {k}</span>
                  <span>› {v}</span>
                  <span className="mint">
                    {t('› statut : piste de travail', '› status: working lead')}
                  </span>
                </code>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ZoomReveal
        photo={photos.labsNight}
        eyebrow="// construit à Conakry"
        title={
          <>
            {t('Votre outil sur mesure,', 'Your custom tool,')}{' '}
            <Highlight>{t('pensé avec vous.', 'designed with you.')}</Highlight>
          </>
        }
        copy={t(
          'Automatisation, tableau de bord, application métier : partagez votre besoin, nous explorons la solution la plus simple qui fonctionne.',
          'Automation, dashboard, business app: share your need and we’ll explore the simplest solution that works.',
        )}
        cta={
          <CtaLink href={go('labs', 'contact')}>
            {t('Parler de mon outil', 'Talk about my tool')}
          </CtaLink>
        }
      />
    </>
  );
}

export function VerticalHome({ id }: { id: VerticalId }) {
  if (id === 'agency') return <AgencyHome />;
  if (id === 'academy') return <AcademyHome />;
  if (id === 'media') return <MediaHome />;
  if (id === 'studio') return <StudioHome />;
  return <LabsHome />;
}

/* ------------------------------------------------------------------ */
/* Pages intérieures                                                   */
/* ------------------------------------------------------------------ */
const innerPhotos: Record<VerticalId, Photo[]> = {
  agency: [
    photos.agencyGlass,
    photos.agencyDesigner,
    photos.agencySticky,
    photos.agencyLogo,
    photos.agencyTablet,
  ],
  academy: [
    photos.academyRoom,
    photos.academyHome,
    photos.learnerFocus,
    photos.learnerDesk,
  ],
  media: [
    photos.mediaReader,
    photos.mediaInterview,
    photos.mediaReporter,
    photos.mediaPresenter,
  ],
  studio: [
    photos.studioPink,
    photos.studioWhite,
    photos.videoField,
    photos.podcastNeon,
  ],
  labs: [photos.labsCoder, photos.labsNight, photos.founder, photos.manager],
};
const hash = (s: string) =>
  [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
export const innerPhoto = (id: VerticalId, path: string) =>
  innerPhotos[id][hash(path) % innerPhotos[id].length];

const labels: Record<VerticalId, string> = {
  agency: 'Smartsell Agency',
  academy: 'Smartsell Academy',
  media: 'Smartsell Media',
  studio: 'Smartsell Studios',
  labs: 'Smartsell Labs',
};

export function InnerHero({
  id,
  page,
  crumbs,
}: {
  id: VerticalId;
  page: SitePageData;
  crumbs: React.ReactNode;
}) {
  const title = page.title.replace(/\n/g, ' ');
  const photo = innerPhoto(id, page.path);
  if (id === 'media')
    return (
      <section className="uv-in uv-in-media">
        <div className="uv-wrap">
          {crumbs}
          <div className="uv-in-media-rule">
            <span>{labels.media}</span>
            <TodayLine fallback={t('Édition numérique', 'Digital edition')} />
          </div>
          <h1>{title}</h1>
          <p className="uv-in-lead">{page.intro}</p>
          <figure>
            <Img photo={photo} width={1600} eager />
          </figure>
        </div>
      </section>
    );
  if (id === 'labs')
    return (
      <section className="uv-in uv-in-labs">
        <div className="uv-wrap uv-in-labs-grid">
          <div>
            {crumbs}
            <code className="uv-in-path">labs:~/{page.path || 'accueil'}$</code>
            <h1>{title}</h1>
            <p className="uv-in-lead">{page.intro}</p>
          </div>
          <figure>
            <Img photo={photo} width={1100} eager />
          </figure>
        </div>
      </section>
    );
  if (id === 'studio')
    return (
      <section className="uv-in uv-in-studio">
        <Img photo={photo} width={1800} eager />
        <div className="uv-st-frame" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="uv-wrap">
          {crumbs}
          <Timecode />
          <h1>{title}</h1>
          <p className="uv-in-lead">{page.intro}</p>
        </div>
      </section>
    );
  if (id === 'academy')
    return (
      <section className="uv-in uv-in-academy">
        <div className="uv-wrap uv-in-academy-grid">
          <div>
            {crumbs}
            <span className="uv-pill">
              <Icon name="stars" /> {labels.academy}
            </span>
            <h1>{title}</h1>
            <p className="uv-in-lead">{page.intro}</p>
          </div>
          <figure>
            <Img photo={photo} width={1000} eager />
          </figure>
        </div>
      </section>
    );
  return (
    <section className="uv-in uv-in-agency">
      <div className="uv-wrap">
        {crumbs}
        <span className="sg-mono">{labels.agency}</span>
        <h1>{title}</h1>
        <div className="uv-in-agency-foot">
          <p className="uv-in-lead">{page.intro}</p>
          <CtaLink href={go('agency', 'contact')}>
            {t('Démarrer un projet', 'Start a project')}
          </CtaLink>
        </div>
      </div>
      <figure className="uv-in-agency-strip">
        <Img photo={photo} width={1800} eager />
      </figure>
    </section>
  );
}

const ctas: Record<
  VerticalId,
  {
    title: string;
    copy: string;
    primary: [string, string];
    secondary: [string, string];
  }
> = {
  agency: {
    title: t(
      'Un projet en tête ? Parlons-en.',
      'Got a project in mind? Let’s talk.',
    ),
    copy: t(
      'Partagez votre ambition : nous revenons avec des pistes concrètes.',
      'Share your ambition: we’ll come back with concrete ideas.',
    ),
    primary: ['contact', t('Démarrer un projet', 'Start a project')],
    secondary: ['work', t('Voir le portfolio', 'See the portfolio')],
  },
  academy: {
    title: t('Prêt à apprendre en pratiquant ?', 'Ready to learn by doing?'),
    copy: t(
      'Choisissez un module et essayez trois leçons dès maintenant.',
      'Choose a course and try three lessons right now.',
    ),
    primary: ['courses', t('Choisir un module', 'Choose a course')],
    secondary: ['corporate', t('Former mon équipe', 'Train my team')],
  },
  media: {
    title: t('L’essentiel, chaque vendredi.', 'The essentials, every Friday.'),
    copy: t(
      'Analyses, guides et idées à appliquer, dans votre boîte mail.',
      'Analyses, guides and ideas to apply, in your inbox.',
    ),
    primary: ['newsletter', t('Je m’abonne', 'Subscribe')],
    secondary: ['latest', t('Toute l’actualité', 'All the latest')],
  },
  studio: {
    title: t('Silence. On tourne ?', 'Quiet on set?'),
    copy: t(
      'Choisissez un pack et préparez votre session en quelques étapes.',
      'Choose a pack and prepare your session in a few steps.',
    ),
    primary: ['booking', t('Préparer ma session', 'Prepare my session')],
    secondary: ['spaces', t('Voir les plateaux', 'See the sets')],
  },
  labs: {
    title: t('Un outil à construire ?', 'A tool to build?'),
    copy: t(
      'Décrivez votre besoin : nous explorons la solution la plus simple.',
      'Describe your need: we explore the simplest solution.',
    ),
    primary: ['contact', t('Parler de mon outil', 'Talk about my tool')],
    secondary: ['products', t('Nos produits', 'Our products')],
  },
};

export function InnerCta({ id, path }: { id: VerticalId; path: string }) {
  const c = ctas[id];
  const photo = innerPhoto(id, path + '-cta');
  return (
    <section className={`uv-cta uv-cta-${id}`}>
      <div className="uv-wrap uv-cta-card">
        <figure>
          <Img photo={photo} width={900} />
        </figure>
        <div>
          <h2>{c.title}</h2>
          <p>{c.copy}</p>
          <div className="im-actions">
            <CtaLink href={go(id, c.primary[0])}>{c.primary[1]}</CtaLink>
            <CtaLink href={go(id, c.secondary[0])} tone="ghost">
              {c.secondary[1]}
            </CtaLink>
          </div>
        </div>
      </div>
      <nav
        className="uv-wrap uv-cta-more"
        aria-label={t('Continuer dans le site', 'Continue on the site')}
      >
        {siteMenus[id].map((m) => (
          <a key={m.path} href={go(id, m.path)}>
            {m.label} <Icon name="arrowUpRight" />
          </a>
        ))}
      </nav>
    </section>
  );
}
