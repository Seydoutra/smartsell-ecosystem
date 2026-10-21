import { Icon } from '../icons';
import { AcademyMissionPreview } from '../platform/academy-mission-preview';
import type { VerticalId } from '@smartsell/types';
import {
  agencyServices,
  articles,
  courses,
  packs,
  siteMenus,
  spaces,
  type SitePageData,
} from '@smartsell/content/sites';
import {
  clip,
  photos,
  videos,
  videoUrl,
  type Photo,
  type VideoClip,
} from '@smartsell/content/photos';
import {
  brands,
  clients,
  films,
  products as solutions,
  shoots,
  websites,
  type Film,
} from '@smartsell/content/portfolio';
import { corporateOffers } from '@smartsell/content/academy';
import {
  ClientMarquee,
  ClipTile,
  CourseCarousel,
  ExpertiseBento,
  SiteCard,
  SlideRail,
  SolutionsShowcase,
} from '../showcase';
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
  ParallaxGallery,
  Video,
  ZoomReveal,
} from '../immersive';
import {
  FeaturedFilms,
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
/* AGENCY : studio créatif, violet profond et jaune                     */
/* ------------------------------------------------------------------ */
const expertisePhotos: Photo[] = [
  photos.agencyGlass,
  shoots.fashion[1],
  photos.agencyLogo,
  photos.socialNight,
  photos.phoneShop,
  photos.agencyTablet,
  photos.labsCoder,
  photos.founder,
  photos.cameraClose,
  shoots.fashion[3],
  photos.podcastNeon,
  photos.labsNight,
  shoots.spaces[1],
  photos.meeting,
  photos.agencySticky,
  photos.partners,
];
const expertiseVideo: Record<number, VideoClip> = {
  0: clip('ghost'),
  3: videos.phone,
  5: clip('johndoe'),
  10: clip('aye-sonna'),
};
export const expertiseItems = () =>
  agencyServices.map((s, i) => ({
    href: go('agency', `services/${s.slug}`),
    title: s.title,
    copy: s.copy,
    label: s.items.slice(0, 2).join(' · '),
    photo: expertisePhotos[i % expertisePhotos.length],
    video: expertiseVideo[i],
  }));

function AgencyHome() {
  return (
    <>
      <section className="uv-ag-hero" aria-labelledby="ag-title">
        <Video clip={clip('aye-sonna')} />
        <div className="uv-ag-hero-top">
          <span className="sg-mono">
            {t('Smartsell Agency · Showreel', 'Smartsell Agency · Showreel')}
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
              'Stratégie, identité, digital, photo et vidéo : une équipe créative qui transforme une ambition en marque qu’on reconnaît, qu’on retient et qu’on choisit.',
              'Strategy, identity, digital, photo and video: a creative team that turns an ambition into a brand people recognise, remember and choose.',
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

      <ClientMarquee
        clients={clients}
        title={t(
          'Ils nous ont confié leur image.',
          'They trusted us with their image.',
        )}
      />

      <HorizontalScroll
        eyebrow={t('01 · Identités de marque', '01 · Brand identities')}
        title={t(
          'Six brandbooks, six univers construits de A à Z.',
          'Six brandbooks, six worlds built from A to Z.',
        )}
        items={brands.map((b) => ({
          label: b.sector,
          title: b.name,
          copy: b.summary,
          photo: b.pages[0],
          href: go('agency', `work/${b.slug}`),
          cta: t('Ouvrir le brandbook', 'Open the brandbook'),
        }))}
      />

      <section className="sc-section sc-dark" aria-labelledby="ag-services">
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="sg-mono">
                {t('02 · Expertises', '02 · Expertise')}
              </span>
              <h2 id="ag-services">
                {t(
                  'Tout ce dont votre marque a besoin.',
                  'Everything your brand needs.',
                )}{' '}
                <Highlight>
                  {t('Rien de superflu.', 'Nothing it doesn’t.')}
                </Highlight>
              </h2>
            </div>
            <div>
              <p>
                {t(
                  'Survolez une expertise pour la voir en mouvement, cliquez pour découvrir comment nous travaillons.',
                  'Hover an area of expertise to see it in motion, click to see how we work.',
                )}
              </p>
              <CtaLink href={go('agency', 'services')}>
                {t('Les', 'All')} {agencyServices.length}{' '}
                {t('expertises', 'services')}
              </CtaLink>
            </div>
          </div>
          <ExpertiseBento items={expertiseItems().slice(0, 8)} />
        </div>
      </section>

      <section className="sc-section sc-deep" aria-labelledby="ag-sites">
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="sg-mono">
                {t('03 · Sites web', '03 · Websites')}
              </span>
              <h2 id="ag-sites">
                {t('Des sites qui', 'Websites that')}{' '}
                <Highlight>{t('travaillent.', 'work.')}</Highlight>
              </h2>
            </div>
            <p>
              {t(
                'Sites institutionnels, événements, plateformes et produits : cliquez pour visiter les sites en ligne.',
                'Corporate sites, events, platforms and products: click to visit the live sites.',
              )}
            </p>
          </div>
          <SlideRail label={t('Sites web réalisés', 'Websites we built')}>
            {websites.map((w) => (
              <div className="uv-site-slide" key={w.slug}>
                <SiteCard site={w} />
              </div>
            ))}
          </SlideRail>
        </div>
      </section>

      <section className="sc-section sc-dark" aria-labelledby="ag-films">
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="sg-mono">
                {t('04 · Photo & vidéo', '04 · Photo & video')}
              </span>
              <h2 id="ag-films">
                {t('Des images qui', 'Images that')}{' '}
                <Highlight>
                  {t('arrêtent le défilement.', 'stop the scroll.')}
                </Highlight>
              </h2>
            </div>
            <div>
              <p>
                {t(
                  'Clips, publicités, mode et reportages : passez la souris sur une vidéo pour la lancer.',
                  'Music videos, adverts, fashion and reportage: hover a video to play it.',
                )}
              </p>
              <CtaLink href={go('media', 'videos')}>
                {t('Toutes nos vidéos', 'All our videos')}
              </CtaLink>
            </div>
          </div>
          <div className="sc-clip-grid">
            {films.slice(0, 8).map((f) => (
              <ClipTile
                key={f.slug}
                film={f}
                href={go('media', `video/${f.slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <ParallaxGallery
        columns={[
          [shoots.fashion[0], shoots.sport[0], shoots.fashion[4]],
          [shoots.fashion[7], shoots.spaces[3], shoots.sport[3]],
          [shoots.sport[1], shoots.fashion[9], shoots.fashion[5]],
          [shoots.fashion[2], shoots.sport[4], shoots.fashion[10]],
        ]}
      >
        <span className="sg-mono">
          {t('05 · Nos séances photo', '05 · Our photo shoots')}
        </span>
        <h2>
          {t('Mode, sport, lieux :', 'Fashion, sport, venues:')}{' '}
          <Highlight>{t('on cadre l’émotion.', 'we frame emotion.')}</Highlight>
        </h2>
        <div className="im-actions">
          <CtaLink href={go('agency', 'work')}>
            {t('Voir les séries', 'See the series')}
          </CtaLink>
          <CtaLink href={go('studio', 'shooting')} tone="ghost">
            {t('Réserver un shooting', 'Book a shoot')}
          </CtaLink>
        </div>
      </ParallaxGallery>

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
              {t('Remplir le brief', 'Fill in the brief')}
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
/* ACADEMY : campus lumineux, lilas et violet                          */
/* ------------------------------------------------------------------ */
export function CorporateOffers() {
  return (
    <SlideRail label={t('Offres entreprises', 'Company offers')}>
      {corporateOffers.map((o) => (
        <a key={o.slug} className="uv-offer" href={go('academy', 'corporate')}>
          <Img photo={o.photo} width={800} />
          <div>
            <small>{o.format}</small>
            <h3>{o.title}</h3>
            <p>{o.copy}</p>
            <b>
              {t('Demander ce parcours', 'Request this track')}{' '}
              <Icon name="arrowUpRight" />
            </b>
          </div>
        </a>
      ))}
    </SlideRail>
  );
}

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
              {t('Le digital s’apprend', 'Digital skills come alive')}{' '}
              <em>{t('en passant à l’action.', 'when you take action.')}</em>
            </h1>
            <p>
              {t(
                'Manipulez une scène, faites vos choix, comprenez vos erreurs et recommencez. Ici, chaque étape vous rapproche d’un savoir-faire concret, avec un coach guidé et un espace qui garde votre progression.',
                'Shape a scene, make choices, understand your mistakes and try again. Each step builds a practical skill, with a guided coach and a space that keeps your progress.',
              )}
            </p>
            <div className="im-actions">
              <CtaLink
                href={go('academy', 'courses/court-metrage-ia-complet')}
                tone="dark"
              >
                {t('Commencer gratuitement', 'Start for free')}
              </CtaLink>
              <a className="academy-demo-link" href="#ac-play">
                {t('Essayer une mission', 'Try a mission')} ↓
              </a>
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
              {t('Des missions à jouer', 'Playable missions')}
            </span>
            <span className="uv-ac-badge two">
              <Icon name="task" />{' '}
              {t('Exercices sur vos projets', 'Exercises on your projects')}
            </span>
            <span className="uv-ac-badge three">
              <Icon name="star" />{' '}
              {t('Un coach vous guide', 'A coach guides you')}
            </span>
          </div>
        </div>
      </section>

      <section
        className="academy-play-intro"
        id="ac-play"
        aria-labelledby="ac-play-title"
      >
        <div className="uv-wrap">
          <div className="academy-play-heading">
            <div>
              <span className="uv-pill">
                {t('Touchez. Testez. Comprenez.', 'Touch. Try. Understand.')}
              </span>
              <h2 id="ac-play-title">
                {t('Votre première mission', 'Your first mission')}
                <em>{t(' commence ici.', ' starts here.')}</em>
              </h2>
            </div>
            <p>
              {t(
                'Recadrez une scène pour un écran de téléphone. Vous voyez le résultat de chaque choix, puis votre coach vous explique ce qui fonctionne. Essayez, sans créer de compte.',
                'Reframe a scene for a phone screen. See the result of every choice, then let your coach explain what works. Try it without an account.',
              )}
            </p>
          </div>
          <AcademyMissionPreview />
          <div className="academy-promise-grid">
            {[
              [
                t('On vous explique', 'We explain'),
                t(
                  'Des consignes courtes, des exemples visuels et une lecture audio à activer si vous le souhaitez.',
                  'Short instructions, visual examples and optional read-aloud guidance.',
                ),
              ],
              [
                t('Vous expérimentez', 'You experiment'),
                t(
                  'Un cadrage, un mouvement, une ambiance sonore : les réglages changent la scène sous vos yeux.',
                  'Framing, movement, sound: your adjustments change the scene in front of you.',
                ),
              ],
              [
                t('Vous avancez vraiment', 'You make progress'),
                t(
                  'Les quiz donnent un retour immédiat. Chaque module validé débloque le suivant, à votre rythme.',
                  'Quizzes give immediate feedback. Each passed module unlocks the next, at your pace.',
                ),
              ],
            ].map(([title, body], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="academy-full-course"
        aria-labelledby="ac-featured-title"
      >
        <div className="uv-wrap academy-full-grid">
          <div>
            <span className="uv-pill">
              {t(
                'Formation complète · Accès gratuit · En français',
                'Full course · Free access · In French',
              )}
            </span>
            <h2 id="ac-featured-title">
              {t('Votre idée mérite', 'Your idea deserves')}{' '}
              <em>{t('son premier film.', 'its first film.')}</em>
            </h2>
            <p>
              {t(
                'Faire un court-métrage avec l’IA : 11 modules pour travailler l’écriture, la cohérence des personnages, l’image, le son et la livraison. Un projet fil rouge vous accompagne du premier choix au dernier quiz.',
                'Make a short film with AI: 11 modules covering writing, character consistency, images, sound and delivery. One ongoing project takes you from your first choice to the final quiz.',
              )}
            </p>
            <CtaLink
              href={go('academy', 'courses/court-metrage-ia-complet')}
              tone="dark"
            >
              {t(
                'Découvrir le programme complet',
                'Explore the full programme',
              )}
            </CtaLink>
          </div>
          <div className="academy-course-facts">
            <div>
              <b>11</b>
              <span>
                {t(
                  'modules avec missions et quiz',
                  'modules with missions and quizzes',
                )}
              </span>
            </div>
            <div>
              <b>12 h 30</b>
              <span>
                {t(
                  'de parcours indicatif, à votre rythme',
                  'suggested learning time, at your pace',
                )}
              </span>
            </div>
            <div>
              <b>QR</b>
              <span>
                {t(
                  'Une attestation de participation vérifiable, après validation de tous les modules. Les parcours de découverte ne donnent pas d’attestation.',
                  'A verifiable participation attestation after passing every module. Discovery courses do not award an attestation.',
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="sc-section uv-ac-carousel"
        aria-labelledby="ac-courses"
      >
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="uv-pill">{t('Nos modules', 'Our courses')}</span>
              <h2 id="ac-courses">
                {t('Choisissez votre', 'Pick your')}{' '}
                <em>{t('prochaine compétence.', 'next skill.')}</em>
              </h2>
            </div>
            <p>
              {t(
                'Faites défiler, filtrez par thème et ouvrez un module pour voir son programme.',
                'Scroll, filter by topic and open a course to see its programme.',
              )}
            </p>
          </div>
          <CourseCarousel
            courses={courses}
            hrefs={Object.fromEntries(
              courses.map((c) => [c.slug, go('academy', `courses/${c.slug}`)]),
            )}
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
                  'Un module, un niveau, un objectif clair.',
                  'A course, a level, a clear objective.',
                ),
              ],
              [
                t('Pratiquer', 'Practise'),
                t(
                  'Des exercices sur vos propres contenus.',
                  'Exercises on your own content.',
                ),
              ],
              [
                t('Valider', 'Validate'),
                t(
                  'Des quiz pour vérifier ce que vous avez compris, avant de débloquer la suite.',
                  'Quizzes check your understanding before unlocking the next step.',
                ),
              ],
              [
                t('Progresser', 'Progress'),
                t(
                  'Retrouvez vos cours, votre carnet et vos attestations dans Mon espace.',
                  'Find your courses, workbook and attestations in My space.',
                ),
              ],
            ].map(([a, c], i) => (
              <li key={a} style={{ animationDelay: `${i * 120}ms` }}>
                <b>{i + 1}</b>
                <strong>{a}</strong>
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sc-section uv-ac-b2b" aria-labelledby="ac-b2b">
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="uv-pill">
                {t('Entreprises & institutions', 'Companies & institutions')}
              </span>
              <h2 id="ac-b2b">
                {t('Des parcours pour', 'Tracks for')}{' '}
                <em>{t('vos équipes.', 'your teams.')}</em>
              </h2>
            </div>
            <div>
              <p>
                {t(
                  'Du parcours complet de 77 h au programme institutionnel de 8 semaines : nous adaptons le rythme à vos disponibilités.',
                  'From the full 77-hour track to the 8-week institutional programme: we fit the pace to your availability.',
                )}
              </p>
              <CtaLink href={go('academy', 'corporate')} tone="dark">
                {t('L’offre entreprises', 'The company offer')}
              </CtaLink>
            </div>
          </div>
          <CorporateOffers />
        </div>
      </section>

      <section className="uv-ac-cta">
        <div className="uv-wrap">
          <h2>
            {t('Une idée en tête ?', 'Have an idea?')}{' '}
            <em>{t('Faites-en un savoir-faire.', 'Turn it into a skill.')}</em>
          </h2>
          <div className="im-actions">
            <CtaLink href={go('academy', 'dashboard') + '?auth=signup'}>
              {t('Créer mon espace gratuit', 'Create my free account')}
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
/* MEDIA : plateforme de vidéos et d'articles                          */
/* ------------------------------------------------------------------ */
const mediaCategories = [
  ['tech', 'Tech'],
  ['ai', t('Intelligence artificielle', 'AI')],
  ['business', 'Business'],
  ['marketing', 'Marketing'],
  ['creative', t('Culture créative', 'Creative culture')],
  ['africa', t('Afrique', 'Africa')],
  ['guinea', t('Guinée', 'Guinea')],
  ['interviews', t('Entretiens', 'Interviews')],
];

export function MediaSide({ current = '' }: { current?: string }) {
  return (
    <aside
      className="md2-side"
      aria-label={t('Navigation Media', 'Media navigation')}
    >
      <nav>
        {[
          ['', t('Accueil', 'Home'), 'home'],
          ['videos', t('Nos vidéos', 'Our videos'), 'eye'],
          ['latest', t('Articles', 'Articles'), 'file'],
          ['search', t('Rechercher', 'Search'), 'search'],
          ['newsletter', 'Newsletter', 'bell'],
        ].map(([path, label, icon]) => (
          <a
            key={path}
            href={go('media', path)}
            aria-current={current === path ? 'page' : undefined}
          >
            <Icon name={icon as 'home'} /> {label}
          </a>
        ))}
      </nav>
      <p className="sg-mono">{t('Rubriques', 'Sections')}</p>
      <nav>
        {mediaCategories.map(([path, label]) => (
          <a
            key={path}
            href={go('media', path)}
            aria-current={current === path ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function ArticleCard({ a, i }: { a: (typeof articles)[number]; i: number }) {
  return (
    <a className="md2-article" href={go('media', `article/${a.slug}`)}>
      <figure>
        <Img photo={articlePhoto(i)} width={600} />
      </figure>
      <span className="md2-tag">{a.category}</span>
      <h3>{a.title}</h3>
      <small>
        {a.minutes} {t('min de lecture', 'min read')}
      </small>
    </a>
  );
}

function MediaHome() {
  const featured = films.slice(0, 5).map((f) => {
    const v = videoUrl(f.clip);
    return {
      href: go('media', `video/${f.slug}`),
      title: f.title,
      kind: f.kind,
      copy: t(
        'Une production Smartsell : réalisation, tournage et montage par nos équipes.',
        'A Smartsell production: directed, shot and edited by our teams.',
      ),
      src: v.src,
      poster: v.poster,
    };
  });
  const rows: [string, Film[]][] = [
    [t('Les vidéos les plus récentes', 'Latest videos'), films.slice(0, 9)],
    [
      t('Publicité & mode', 'Advertising & fashion'),
      films.filter((f) => /Pub|Advert|Mode|Fashion/.test(f.kind)),
    ],
    [
      t('Clips, live & teasers', 'Music, live & teasers'),
      films.filter((f) => !/Pub|Advert|Mode|Fashion/.test(f.kind)),
    ],
  ];
  return (
    <div className="md2">
      <MediaSide />
      <div className="md2-main">
        <h1 className="sr-only">Smartsell Media</h1>
        <FeaturedFilms items={featured} />
        {rows.map(([title, list]) => (
          <section key={title} className="md2-row" aria-label={title}>
            <div className="md2-row-head">
              <h2>{title}</h2>
              <a href={go('media', 'videos')}>
                {t('Tout voir', 'See all')} <Icon name="arrowRight" />
              </a>
            </div>
            <SlideRail label={title}>
              {list.map((f) => (
                <ClipTile
                  key={f.slug}
                  film={f}
                  href={go('media', `video/${f.slug}`)}
                  className="md2-clip"
                />
              ))}
            </SlideRail>
          </section>
        ))}
        <section className="md2-row" aria-label={t('Articles', 'Articles')}>
          <div className="md2-row-head">
            <h2>{t('À lire', 'To read')}</h2>
            <a href={go('media', 'latest')}>
              {t('Tous les articles', 'All articles')}{' '}
              <Icon name="arrowRight" />
            </a>
          </div>
          <SlideRail label={t('Articles', 'Articles')}>
            {articles.slice(0, 10).map((a, i) => (
              <ArticleCard key={a.slug} a={a} i={i} />
            ))}
          </SlideRail>
        </section>
        <section className="md2-letter">
          <div>
            <span className="md2-tag">Newsletter</span>
            <h2>
              {t(
                'Nos nouvelles vidéos, chaque semaine.',
                'Our new videos, every week.',
              )}
            </h2>
            <p>
              {t(
                'Productions, coulisses et articles : recevez l’essentiel de Smartsell Media.',
                'Productions, behind the scenes and articles: get the best of Smartsell Media.',
              )}
            </p>
          </div>
          <CtaLink href={go('media', 'newsletter')}>
            {t('Je m’abonne', 'Subscribe')}
          </CtaLink>
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* STUDIOS : podcast & shooting, réservation                           */
/* ------------------------------------------------------------------ */
const spacePhotos: Record<string, Photo> = {
  podcast: photos.podcastNeon,
  photo: photos.studioPink,
  video: photos.videoField,
};
const bookHref = (pack?: string) =>
  go('studio', 'booking') + (pack ? `?pack=${pack}` : '');
const waBook = (text: string) =>
  `https://wa.me/224620619064?text=${encodeURIComponent(text)}`;

export function FormulaCards({ family }: { family: 'podcast' | 'shooting' }) {
  return (
    <div className="uv-formulas">
      {packs
        .filter((p) => p.family === family)
        .map((p) => (
          <article
            key={p.slug}
            className={`uv-formula ${p.best ? 'is-best' : ''}`}
          >
            {p.best && (
              <span className="uv-formula-best">
                <Icon name="star" /> {t('Meilleure option', 'Best option')}
              </span>
            )}
            <h3>{p.title}</h3>
            <p>{p.copy}</p>
            <div className="uv-formula-price">
              <b>{t('Sur devis', 'On quote')}</b>
              <span>
                {t('opérateur et matériel inclus', 'operator & gear included')}
              </span>
            </div>
            <ul>
              {p.includes.map((x) => (
                <li key={x}>
                  <Icon name="check" /> {x}
                </li>
              ))}
            </ul>
            <div className="uv-formula-actions">
              <a className="uv-formula-book" href={bookHref(p.slug)}>
                {t('Réserver', 'Book')} <Icon name="arrowRight" />
              </a>
              <a href={go('studio', `packs/${p.slug}`)}>
                {t('Voir les détails', 'See details')}
              </a>
            </div>
          </article>
        ))}
    </div>
  );
}

export function Backdrops() {
  return (
    <div className="uv-backdrops">
      {[
        ['#f7f2fa', t('Fond blanc', 'White backdrop')],
        ['#12061b', t('Fond noir', 'Black backdrop')],
        ['#c8242f', t('Fond rouge', 'Red backdrop')],
        ['#1f8a4c', t('Fond vert', 'Green backdrop')],
      ].map(([c, l]) => (
        <div key={c}>
          <i style={{ background: c }} />
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

export function ShootingAdvice() {
  return (
    <div className="uv-advice">
      {[
        [
          t('Tenues recommandées', 'Recommended outfits'),
          t(
            'Couleurs unies, pièces bien repassées et deux ou trois tenues de rechange. Évitez les petits motifs qui vibrent à l’image.',
            'Solid colours, well-pressed pieces and two or three spare outfits. Avoid small patterns that flicker on camera.',
          ),
          shoots.fashion[3],
        ],
        [
          t('Maquillage & coiffure', 'Make-up & hair'),
          t(
            'Un maquillage léger et mat suffit sous nos lumières. Coiffure prête à l’arrivée : nous retouchons sur place.',
            'Light, matte make-up is enough under our lights. Arrive with your hair ready: we touch up on site.',
          ),
          shoots.fashion[0],
        ],
        [
          t('Le jour J', 'On the day'),
          t(
            'Arrivez 15 minutes avant, avec vos références et vos accessoires. Le photographe vous guide pour chaque pose.',
            'Arrive 15 minutes early, with your references and accessories. The photographer guides every pose.',
          ),
          shoots.fashion[6],
        ],
      ].map(([title, copy, photo]) => (
        <article key={title as string}>
          <Img photo={photo as Photo} width={700} />
          <div>
            <h3>{title as string}</h3>
            <p>{copy as string}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function StudioBand() {
  return (
    <section className="uv-st-band">
      <div className="uv-wrap">
        <h2>
          {t('Réservez votre séance dès maintenant.', 'Book your session now.')}
        </h2>
        <p>
          {t(
            'Podcast, shooting ou vidéo : choisissez une formule, nous confirmons le créneau sur WhatsApp.',
            'Podcast, shoot or video: pick a package and we confirm the slot on WhatsApp.',
          )}
        </p>
        <div className="im-actions">
          <a
            className="im-cta im-cta-yellow"
            href={waBook(
              t(
                'Bonjour Smartsell Studios, je souhaite réserver une séance.',
                'Hello Smartsell Studios, I would like to book a session.',
              ),
            )}
            target="_blank"
            rel="noopener"
          >
            <span>{t('Réserver par WhatsApp', 'Book on WhatsApp')}</span>
            <i aria-hidden="true">
              <Icon name="arrowUpRight" />
            </i>
          </a>
          <CtaLink href={bookHref()} tone="ghost">
            {t('Réserver maintenant', 'Book now')}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

export function SpaceSlides() {
  return (
    <SlideRail label={t('Nos plateaux', 'Our sets')}>
      {spaces.map((s, i) => (
        <article key={s.slug} className="uv-set">
          {i === 0 ? (
            <Video clip={videos.podcast} />
          ) : (
            <Img
              photo={spacePhotos[s.slug] ?? photos.studioWhite}
              width={1200}
            />
          )}
          <div>
            <small>{s.use}</small>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
            <div className="im-actions">
              <CtaLink
                href={bookHref(i === 0 ? 'podcast-montage' : 'shooting-pro')}
              >
                {t('Réserver ce plateau', 'Book this set')}
              </CtaLink>
              <CtaLink href={go('studio', `spaces/${s.slug}`)} tone="ghost">
                {t('Découvrir', 'Discover')}
              </CtaLink>
            </div>
          </div>
        </article>
      ))}
    </SlideRail>
  );
}

function StudioHome() {
  return (
    <>
      <section className="uv-st2-hero" aria-labelledby="st-title">
        <div className="uv-wrap uv-st2-grid">
          <div>
            <span className="sg-mono">Smartsell Studios · Conakry</span>
            <h1 id="st-title">
              {t('Studio podcast', 'Podcast')} <em>&amp;</em>{' '}
              {t('photo à Conakry.', 'photo studio in Conakry.')}
            </h1>
            <p>
              {t(
                'Des plateaux équipés pour vos podcasts, interviews, shootings et vidéos de marque. Captation multicaméra, opérateur, montage et diffusion : de l’idée à l’épisode en ligne.',
                'Equipped sets for your podcasts, interviews, photo shoots and brand videos. Multi-camera capture, operator, editing and publishing: from idea to episode online.',
              )}
            </p>
            <div className="im-actions">
              <CtaLink href={bookHref()}>
                {t('Réserver une séance', 'Book a session')}
              </CtaLink>
              <CtaLink href={go('studio', 'pricing')} tone="ghost">
                {t('Voir les formules', 'See the packages')}
              </CtaLink>
            </div>
            <div className="uv-st2-chips">
              <span>Conakry</span>
              <span>{t('3 plateaux', '3 sets')}</span>
              <span>{t('Captation multicaméra', 'Multi-camera capture')}</span>
            </div>
          </div>
          <div className="uv-st2-media">
            <Video clip={videos.podcast} />
            <Timecode />
          </div>
        </div>
      </section>

      <section className="sc-section sc-dark" aria-labelledby="st-sets">
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="sg-mono">{t('Nos plateaux', 'Our sets')}</span>
              <h2 id="st-sets">
                {t('L’image du cinéma,', 'Cinema-grade picture,')}{' '}
                <Highlight>
                  {t('le son de la radio.', 'radio-grade sound.')}
                </Highlight>
              </h2>
            </div>
            <p>
              {t(
                'Nos plateaux sont équipés comme des studios de production : caméras, micros broadcast et lumière maîtrisée.',
                'Our sets are equipped like production studios: cameras, broadcast microphones and controlled light.',
              )}
            </p>
          </div>
          <SpaceSlides />
        </div>
      </section>

      <section className="sc-section sc-deep" aria-labelledby="st-seen">
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="sg-mono">
                {t('Créé dans nos studios', 'Made in our studios')}
              </span>
              <h2 id="st-seen">
                {t('Vous nous avez déjà vus', 'You’ve already seen us')}{' '}
                <Highlight>{t('quelque part.', 'somewhere.')}</Highlight>
              </h2>
            </div>
            <CtaLink href={go('media', 'videos')}>
              {t('Toutes les vidéos', 'All videos')}
            </CtaLink>
          </div>
          <SlideRail label={t('Nos productions', 'Our productions')}>
            {films.map((f) => (
              <ClipTile
                key={f.slug}
                film={f}
                href={go('media', `video/${f.slug}`)}
                className="uv-st-clip"
              />
            ))}
          </SlideRail>
        </div>
      </section>

      <section className="sc-section uv-st-light" aria-labelledby="st-podcast">
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="sg-mono">
                {t('Formules podcast', 'Podcast packages')}
              </span>
              <h2 id="st-podcast">
                {t(
                  'Des tarifs clairs, sans surprise.',
                  'Clear pricing, no surprises.',
                )}
              </h2>
            </div>
            <p>
              {t(
                'Trois formules simples, opérateur et matériel toujours inclus. Le détail est confirmé avec vous selon la durée de l’épisode.',
                'Three simple packages, operator and equipment always included. Details are confirmed with you based on episode length.',
              )}
            </p>
          </div>
          <FormulaCards family="podcast" />
        </div>
      </section>

      <section className="sc-section sc-dark" aria-labelledby="st-shoot">
        <div className="sc-wrap">
          <div className="sc-head">
            <div>
              <span className="sg-mono">
                {t('Studio photo', 'Photo studio')}
              </span>
              <h2 id="st-shoot">
                {t('Nos formules', 'Our')}{' '}
                <Highlight>{t('shooting.', 'shoot packages.')}</Highlight>
              </h2>
            </div>
            <div>
              <p>
                {t(
                  'Professionnel, mode ou produits : choisissez la formule qui correspond à votre besoin.',
                  'Professional, fashion or products: pick the package that fits your need.',
                )}
              </p>
              <CtaLink href={go('studio', 'shooting')}>
                {t('Le studio photo', 'The photo studio')}
              </CtaLink>
            </div>
          </div>
          <FormulaCards family="shooting" />
          <h3 className="uv-st-sub">
            {t(
              'Fonds disponibles pour votre shooting',
              'Backdrops available for your shoot',
            )}
          </h3>
          <Backdrops />
        </div>
      </section>

      <StudioBand />
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
              'Quatre produits, une même obsession : l’usage.',
              'Four products, one obsession: real use.',
            )}
          </h2>
          <SolutionsShowcase
            products={solutions}
            allHref={go('labs', 'products')}
          />
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
  cover,
}: {
  id: VerticalId;
  page: SitePageData;
  crumbs: React.ReactNode;
  cover?: Photo;
}) {
  const title = page.title.replace(/\n/g, ' ');
  const photo = cover ?? innerPhoto(id, page.path);
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
