import type { Metadata } from 'next';
import {
  locale,
  t,
  withBasePath,
  urlFor,
  routingConfig,
} from '@smartsell/routing';
import { Img, CtaLink } from '@smartsell/ui/immersive';
import { JourneyPicker } from '@smartsell/ui/home';
import { photos } from '@smartsell/content/photos';
import { journeys, method } from '../../../../components/house-content';
export const metadata: Metadata = {
  title: t('À propos de Smartsell', 'About Smartsell'),
  alternates: { canonical: withBasePath(`/${locale}/about/`) },
};
export default function About() {
  return (
    <main id="main" data-kin-off className="house-page">
      <header className="house-page-hero house-wrap">
        <p className="house-label">SMARTSELL / {t('LA MAISON', 'THE HOUSE')}</p>
        <h1>
          {t(
            'Quatre univers.\nUne même ambition.',
            'Four universes.\nOne shared ambition.',
          )}
        </h1>
        <p>
          {t(
            'Penser, créer, diffuser, mesurer. Sous le même toit.',
            'Think, create, distribute, measure. Under one roof.',
          )}
        </p>
      </header>
      <section className="house-about-intro house-wrap">
        <Img photo={photos.teamSofa} />
        <div>
          <h2>
            {t(
              'Les métiers se rencontrent.\nLes projets avancent.',
              'Fields connect.\nProjects move forward.',
            )}
          </h2>
          <p>
            {t(
              'Une marque a besoin d’une direction, un talent de compétences, une histoire d’un espace pour prendre forme. Smartsell réunit agence, formation, média et production créative dans une même maison, depuis Conakry.',
              'A brand needs direction, a talent needs skills, a story needs a place to take shape. From Conakry, Smartsell brings agency, learning, media and creative production together under one roof.',
            )}
          </p>
          <CtaLink
            href={urlFor('agency', locale, 'team', routingConfig)}
            tone="ghost"
          >
            {t('Découvrir le collectif', 'Meet the collective')}
          </CtaLink>
        </div>
      </section>
      <section id="parcours" className="house-wrap house-page-section">
        <p className="house-label">
          {t('VOTRE POINT DE DÉPART', 'YOUR STARTING POINT')}
        </p>
        <h2>
          {t(
            'Dites-nous qui vous êtes.\nOn trace la route.',
            'Tell us who you are.\nWe’ll map the way.',
          )}
        </h2>
        <JourneyPicker journeys={journeys} />
      </section>
      <section id="methode" className="house-wrap house-page-section">
        <p className="house-label">{t('NOTRE MÉTHODE', 'OUR METHOD')}</p>
        <h2>
          {t(
            'Du brief aux résultats,\nen cinq temps.',
            'From brief to results,\nin five steps.',
          )}
        </h2>
        <ol className="house-method">
          {method.map((step, i) => (
            <li key={step.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section id="conviction" className="house-about-conviction">
        <div className="house-wrap">
          <p className="house-label">{t('NOTRE CONVICTION', 'OUR BELIEF')}</p>
          <h2>
            {t(
              'Des marques qui comptent.\nDes histoires qui restent.',
              'Brands that matter.\nStories that stay.',
            )}
          </h2>
          <p>
            {t(
              'On ne fait pas de la communication pour faire joli. On construit des marques qui se reconnaissent au premier regard, des messages qui touchent juste et des campagnes dont on mesure l’effet. Votre ambition mérite mieux qu’un post de temps en temps.',
              'We don’t do communication just to make things look good. We build brands recognized at first sight, messages that connect and campaigns whose impact is measured. Your ambition deserves more than an occasional post.',
            )}
          </p>
          <CtaLink href={withBasePath(`/${locale}/contact/`)}>
            {t('Parlons de votre projet', 'Let’s talk about your project')}
          </CtaLink>
        </div>
      </section>
      <aside className="house-wrap house-page-section">
        <a href={withBasePath(`/${locale}/explore/`)}>
          {t(
            'Explorer tous nos métiers, parcours et réalisations',
            'Explore all our fields, journeys and work',
          )}{' '}
          ↗
        </a>
      </aside>
    </main>
  );
}
