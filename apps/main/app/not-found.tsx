import { Icon } from '@smartsell/ui/icons';
import { withBasePath, locale, t } from '@smartsell/routing';
export default function NotFound() {
  return (
    <main id="main" className="container section">
      <p className="eyebrow">SMARTSELL / 404</p>
      <h1>
        {t('Cette page', 'This page')}
        <br />
        {t('n’est pas ici.', 'isn’t here.')}
      </h1>
      <p style={{ marginTop: 24 }}>
        {t(
          'Retrouvez les cinq univers de Smartsell depuis la maison.',
          'Find the five Smartsell universes from the house.',
        )}
      </p>
      <a
        className="button button--primary"
        style={{ marginTop: 32 }}
        href={withBasePath(`/${locale}/`)}
      >
        {t('Revenir à l’accueil', 'Back to home')} <Icon name="arrowUpRight" />
      </a>
    </main>
  );
}
