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
          <span className="sg-mono">Smartsell Agency · Bande démo 2026</span>
          <span className="sg-mono">
            Conakry <Icon name="arrowRight" /> partout
          </span>
        </div>
        <h1 id="ag-title">
          <span>On donne</span>
          <span>
            du <Highlight>relief</Highlight>
          </span>
          <span>aux marques.</span>
        </h1>
        <div className="uv-ag-hero-foot">
          <p>
            Stratégie, identité, digital et campagnes : une équipe créative qui
            transforme une ambition en marque qu’on reconnaît, qu’on retient et
            qu’on choisit.
          </p>
          <div className="im-actions">
            <CtaLink href={go('agency', 'contact')}>Démarrer un projet</CtaLink>
            <CtaLink href={go('agency', 'work')} tone="ghost">
              Voir le portfolio
            </CtaLink>
          </div>
        </div>
      </section>

      <Marquee
        tone="yellow"
        items={[
          'Stratégie',
          'Identité',
          'Social media',
          'Publicité',
          'Sites web',
          'Contenus',
          'Campagnes',
        ]}
      />

      <HorizontalScroll
        eyebrow="01 · Explorations sélectionnées"
        title="Six concepts pour montrer comment on pense une marque."
        items={cases.map((c, i) => ({
          label: `${c.category} · Concept`,
          title: c.title,
          copy: c.tagline,
          photo: caseShots[i % caseShots.length],
          href: go('agency', `work/${c.slug}`),
          cta: 'Voir l’exploration',
        }))}
      />

      <section className="uv-ag-services" aria-labelledby="ag-services">
        <div className="uv-wrap uv-ag-services-head">
          <span className="sg-mono">02 · Expertises</span>
          <h2 id="ag-services">
            Tout ce dont votre marque a besoin. <em>Rien de superflu.</em>
          </h2>
          <CtaLink href={go('agency', 'services')}>
            Les {agencyServices.length} expertises
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
            <span className="sg-mono">03 · L’atelier</span>
            <h2 id="ag-atelier">Écouter. Explorer. Construire. Transmettre.</h2>
            <p>
              Chaque projet commence par une conversation franche et se termine
              par des outils que vous savez utiliser. Entre les deux : des
              pistes créatives, des choix argumentés et des livrables soignés.
            </p>
            <CtaLink href={go('agency', 'history')} tone="dark">
              Notre manière de faire
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="uv-ag-cta">
        <div className="uv-wrap">
          <p className="sg-mono">Votre marque, en plus grand</p>
          <h2>
            Parlons de <br />
            <Highlight>votre projet.</Highlight>
          </h2>
          <div className="im-actions">
            <CtaLink href={go('agency', 'contact')}>Écrire à l’agence</CtaLink>
            <CtaLink href={go('agency', 'careers')} tone="ghost">
              Rejoindre le collectif
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
              <Icon name="stars" /> Smartsell Academy · Apprendre en faisant
            </span>
            <h1 id="ac-title">
              Apprenez le digital <em>en le pratiquant.</em>
            </h1>
            <p>
              Marketing, design, web, IA, data et vidéo : des modules courts, un
              projet concret et trois leçons à essayer dès aujourd’hui.
            </p>
            <div className="im-actions">
              <CtaLink href={go('academy', 'courses')} tone="dark">
                Choisir un module
              </CtaLink>
              <CtaLink href={go('academy', 'corporate')} tone="ghost">
                Former mon équipe
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
              <Icon name="check" /> 3 leçons d’aperçu
            </span>
            <span className="uv-ac-badge two">
              <Icon name="task" /> Un projet concret
            </span>
            <span className="uv-ac-badge three">
              <Icon name="star" /> Quiz & progression
            </span>
          </div>
        </div>
      </section>

      <section className="uv-ac-finder" aria-labelledby="ac-finder">
        <div className="uv-wrap">
          <h2 id="ac-finder" className="sr-only">
            Trouver un module
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
          <span className="uv-pill">Comment ça marche</span>
          <h2 id="ac-steps">Quatre étapes, zéro jargon.</h2>
          <ol>
            {[
              ['Choisir', 'Un thème, un niveau, un objectif clair.'],
              ['Essayer', 'Trois leçons d’aperçu avec exercice et quiz.'],
              ['Pratiquer', 'Un projet concret qui donne du sens au module.'],
              ['Progresser', 'Votre espace garde la trace de vos leçons.'],
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
              <span className="uv-pill">Pour les talents</span>
              <h3 id="ac-formats">Un métier du digital, pas à pas.</h3>
              <p>
                Des modules pour démarrer ou se perfectionner, à votre rythme.
              </p>
              <b>
                Explorer les modules <Icon name="arrowRight" />
              </b>
            </div>
          </a>
          <a href={go('academy', 'corporate')} className="uv-ac-format dark">
            <Img photo={photos.learnerFocus} width={900} />
            <div>
              <span className="uv-pill">Pour les équipes</span>
              <h3>Des formations construites pour vos enjeux.</h3>
              <p>
                Un programme adapté à vos outils, vos objectifs et vos équipes.
              </p>
              <b>
                Former mon équipe <Icon name="arrowRight" />
              </b>
            </div>
          </a>
        </div>
      </section>

      <section className="uv-ac-faq" aria-labelledby="ac-faq">
        <div className="uv-wrap uv-ac-faq-grid">
          <div>
            <span className="uv-pill">Questions fréquentes</span>
            <h2 id="ac-faq">Avant de commencer.</h2>
            <CtaLink href={go('academy', 'support')} tone="dark">
              Contacter le support
            </CtaLink>
          </div>
          <div className="uv-ac-faq-list">
            {[
              [
                'Faut-il un niveau particulier ?',
                'Chaque module indique son niveau. Les modules débutants ne demandent aucun prérequis.',
              ],
              [
                'Les leçons sont-elles gratuites ?',
                'Les trois leçons d’aperçu de chaque module sont accessibles librement sur ce site de démonstration.',
              ],
              [
                'Recevrai-je un certificat ?',
                'Le récapitulatif imprimable indique les leçons suivies ; il n’a pas valeur de certification officielle.',
              ],
              [
                'Peut-on former toute une équipe ?',
                'Oui : la page Entreprises décrit l’accompagnement sur mesure pour les équipes.',
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
            Votre prochaine compétence <em>commence aujourd’hui.</em>
          </h2>
          <div className="im-actions">
            <CtaLink href={go('academy', 'courses')}>
              Commencer une leçon
            </CtaLink>
            <CtaLink href={go('academy', 'dashboard')} tone="ghost">
              Mon espace
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
            <span>Conakry · Guinée</span>
            <TodayLine fallback="Édition numérique" />
            <span>Édition N°01 · Gratuit</span>
          </div>
          <h1 id="md-title">Smartsell Media</h1>
          <p className="uv-md-motto">
            Tech, business et culture créative : comprendre ce qui vient.
          </p>
          <nav aria-label="Rubriques" className="uv-md-rubrics">
            {siteMenus.media.map((m) => (
              <a key={m.path} href={go('media', m.path)}>
                {m.label}
              </a>
            ))}
            <a href={go('media', 'opinions')}>Opinions</a>
            <a href={go('media', 'africa')}>Afrique</a>
          </nav>
        </div>
      </section>

      <div className="uv-md-ticker">
        <span className="uv-md-ticker-label">À la une</span>
        <Marquee
          tone="light"
          items={articles.slice(0, 8).map((a) => a.title)}
        />
      </div>

      <section className="uv-md-front" aria-label="La une">
        <div className="uv-wrap uv-md-front-grid">
          <a className="uv-md-lead" href={href(lead.slug)}>
            <figure>
              <Img photo={articlePhoto(0)} width={1400} eager />
            </figure>
            <span className="uv-kicker">{lead.category} · Analyse</span>
            <h2>{lead.title}</h2>
            <p>{lead.summary}</p>
            <span className="uv-md-by">
              Par la rédaction · {lead.minutes} min
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
          <aside className="uv-md-briefs" aria-label="En bref">
            <h3>En bref</h3>
            {rest.slice(0, 6).map((a, i) => (
              <a key={a.slug} href={href(a.slug)}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <span>
                  <em>{a.category}</em> {a.title}
                </span>
              </a>
            ))}
            <a className="uv-md-all" href={go('media', 'latest')}>
              Tous les articles <Icon name="arrowRight" />
            </a>
          </aside>
        </div>
      </section>

      <section className="uv-md-quote" aria-label="Le mot de la rédaction">
        <div className="uv-wrap uv-md-quote-grid">
          <figure>
            <Img photo={photos.mediaPresenter} width={900} />
          </figure>
          <blockquote>
            <p>
              « Les outils changent vite. Notre rôle : les rendre lisibles,
              utiles et proches de celles et ceux qui entreprennent ici. »
            </p>
            <footer>La rédaction de Smartsell Media</footer>
          </blockquote>
        </div>
      </section>

      <section className="uv-md-sections" aria-labelledby="md-sections">
        <div className="uv-wrap">
          <div className="uv-md-section-head">
            <h2 id="md-sections">Les rubriques</h2>
            <a href={go('media', 'search')}>
              Rechercher un article <Icon name="arrowRight" />
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
          <h2 id="md-gallery">En images</h2>
          <a href={go('media', 'interviews')}>
            Les entretiens <Icon name="arrowRight" />
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
          <span className="uv-kicker">La lettre du vendredi</span>
          <h2 id="md-letter">L’essentiel de la semaine, en cinq minutes.</h2>
          <p>
            Une sélection d’analyses, de guides et d’idées à appliquer, chaque
            vendredi dans votre boîte mail.
          </p>
          <CtaLink href={go('media', 'newsletter')} tone="dark">
            Je m’abonne
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
            <span>Lumière.</span>
            <span>Caméra.</span>
            <span>
              <em>Votre histoire.</em>
            </span>
          </h1>
          <p>
            Plateaux photo, vidéo et podcast, équipe technique et accompagnement
            : de la préparation au rendu final.
          </p>
          <div className="im-actions">
            <CtaLink href={go('studio', 'booking')}>
              Préparer ma session
            </CtaLink>
            <CtaLink href={go('studio', 'spaces')} tone="ghost">
              Visiter les plateaux
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
          <span className="sg-mono">Scène 01 · Les plateaux</span>
          <h2 id="st-spaces">Trois espaces, une même exigence d’image.</h2>
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
              cta: 'Découvrir le plateau',
            }))}
          />
        </div>
      </section>

      <section className="uv-st-packs" aria-labelledby="st-packs">
        <div className="uv-wrap uv-st-head">
          <span className="sg-mono">Scène 02 · Les packs</span>
          <h2 id="st-packs">
            Choisissez votre format, on s’occupe du plateau.
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
                    <dt>Prise</dt>
                    <dd>{String(i + 1).padStart(2, '0')}</dd>
                  </div>
                  <div>
                    <dt>Durée</dt>
                    <dd>{p.duration} h</dd>
                  </div>
                  <div>
                    <dt>Plateau</dt>
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
                  Voir le pack <Icon name="arrowRight" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="uv-st-steps" aria-labelledby="st-steps">
        <div className="uv-wrap">
          <span className="sg-mono">Scène 03 · Le déroulé</span>
          <h2 id="st-steps">De l’idée au fichier final.</h2>
          <div className="uv-st-steps-row">
            {[
              ['00:00', 'Choisir', 'Le pack, le plateau et la date.'],
              ['00:15', 'Préparer', 'Brief, conducteur, références.'],
              ['01:00', 'Tourner', 'Lumière, son, cadre : on y va.'],
              ['02:00', 'Recevoir', 'Sélection, montage selon le pack.'],
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
            Silence. <em>On tourne.</em>
          </h2>
          <div className="im-actions">
            <CtaLink href={go('studio', 'booking')}>
              Simuler une réservation
            </CtaLink>
            <CtaLink href={go('studio', 'faq')} tone="ghost">
              Questions fréquentes
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
                '› problèmes réels détectés',
                '› produits utiles en cours',
              ]}
            />
            <h1 id="lb-title">
              Des outils qui <em>travaillent</em> pour vous.
            </h1>
            <p>
              Smartsell Labs conçoit des produits numériques pour les
              entreprises et les créateurs, à partir de leurs vrais usages.
            </p>
            <div className="im-actions">
              <CtaLink href={managementUrl}>Essayer Management</CtaLink>
              <CtaLink href={go('labs', 'products')} tone="ghost">
                Tous les produits
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
                  'Tableau de bord',
                  'Clients',
                  'Projets',
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
                  {['Clients actifs', 'Projets en cours', 'Échéances'].map(
                    (k) => (
                      <div key={k}>
                        <small>{k}</small>
                        <b />
                      </div>
                    ),
                  )}
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
            <span className="uv-lb-note">Illustration de l’interface</span>
          </div>
        </div>
      </section>

      <section className="uv-lb-products" aria-labelledby="lb-products">
        <div className="uv-wrap">
          <span className="sg-mono">// produits</span>
          <h2 id="lb-products">Deux produits, une même obsession : l’usage.</h2>
          <div className="uv-lb-product-grid">
            <a
              href={go('labs', 'products/management')}
              className="uv-lb-product"
            >
              <span className="uv-lb-status live"> Disponible</span>
              <h3>Smartsell Management</h3>
              <p>
                Clients, projets, planning et finances réunis pour piloter votre
                activité sur un seul écran.
              </p>
              <b>
                Découvrir <Icon name="arrowRight" />
              </b>
            </a>
            <a href={go('labs', 'products/obtura')} className="uv-lb-product">
              <span className="uv-lb-status"> Vision produit</span>
              <h3>Obtura</h3>
              <p>
                Un système de travail envisagé pour les photographes, vidéastes
                et créateurs visuels.
              </p>
              <b>
                Lire la vision <Icon name="arrowRight" />
              </b>
            </a>
          </div>
        </div>
      </section>

      <section className="uv-lb-bento" aria-labelledby="lb-bento">
        <div className="uv-wrap">
          <span className="sg-mono">// management</span>
          <h2 id="lb-bento">Ce que Management réunit.</h2>
          <div className="uv-lb-bento-grid">
            <div className="big">
              <small>01</small>
              <h3>Clients</h3>
              <p>
                Un historique clair de chaque relation, du premier contact au
                suivi.
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
              <h3>Projets</h3>
              <p>Étapes, responsables et livrables au même endroit.</p>
            </div>
            <div>
              <small>03</small>
              <h3>Planning</h3>
              <p>Les échéances de l’équipe, visibles d’un coup d’œil.</p>
            </div>
            <div className="wide">
              <small>04</small>
              <h3>Finances</h3>
              <p>
                Devis, factures et suivi des paiements, sans tableur dispersé.
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
          <span className="sg-mono">// recherche</span>
          <h2 id="lb-research">Les pistes que nous explorons.</h2>
          <div className="uv-lb-term-grid">
            {[
              [
                'ops.petites-equipes',
                'Observer ce qui se perd entre contacts, projets et suivi.',
              ],
              [
                'metiers.creation',
                'Soutenir la continuité d’une production créative.',
              ],
              [
                'interfaces.assistees',
                'Tester des parcours avec validation humaine.',
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
                  <span className="mint">› statut : piste de travail</span>
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
            Votre outil sur mesure, <Highlight>pensé avec vous.</Highlight>
          </>
        }
        copy="Automatisation, tableau de bord, application métier : partagez votre besoin, nous explorons la solution la plus simple qui fonctionne."
        cta={
          <CtaLink href={go('labs', 'contact')}>Parler de mon outil</CtaLink>
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
            <TodayLine fallback="Édition numérique" />
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
          <CtaLink href={go('agency', 'contact')}>Démarrer un projet</CtaLink>
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
    title: 'Un projet en tête ? Parlons-en.',
    copy: 'Partagez votre ambition : nous revenons avec des pistes concrètes.',
    primary: ['contact', 'Démarrer un projet'],
    secondary: ['work', 'Voir le portfolio'],
  },
  academy: {
    title: 'Prêt à apprendre en pratiquant ?',
    copy: 'Choisissez un module et essayez trois leçons dès maintenant.',
    primary: ['courses', 'Choisir un module'],
    secondary: ['corporate', 'Former mon équipe'],
  },
  media: {
    title: 'L’essentiel, chaque vendredi.',
    copy: 'Analyses, guides et idées à appliquer, dans votre boîte mail.',
    primary: ['newsletter', 'Je m’abonne'],
    secondary: ['latest', 'Toute l’actualité'],
  },
  studio: {
    title: 'Silence. On tourne ?',
    copy: 'Choisissez un pack et préparez votre session en quelques étapes.',
    primary: ['booking', 'Préparer ma session'],
    secondary: ['spaces', 'Voir les plateaux'],
  },
  labs: {
    title: 'Un outil à construire ?',
    copy: 'Décrivez votre besoin : nous explorons la solution la plus simple.',
    primary: ['contact', 'Parler de mon outil'],
    secondary: ['products', 'Nos produits'],
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
      <nav className="uv-wrap uv-cta-more" aria-label="Continuer dans le site">
        {siteMenus[id].map((m) => (
          <a key={m.path} href={go(id, m.path)}>
            {m.label} <Icon name="arrowUpRight" />
          </a>
        ))}
      </nav>
    </section>
  );
}
