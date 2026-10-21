'use client';
import { locale, routingConfig, t, urlFor } from '@smartsell/routing';
import { useAccount } from './auth';

export function AcademyAccess() {
  const { user } = useAccount();
  const dashboard = urlFor('academy', locale, 'dashboard', routingConfig);
  return (
    <nav
      className="academy-account-links"
      aria-label={t('Compte apprenant', 'Learner account')}
    >
      {user ? (
        <a className="academy-signup" href={dashboard}>
          {t('Mon compte', 'My account')} ↗
        </a>
      ) : (
        <>
          <a href={dashboard + '?auth=login'}>{t('Connexion', 'Sign in')}</a>
          <a className="academy-signup" href={dashboard + '?auth=signup'}>
            {t('S’inscrire', 'Sign up')}
          </a>
        </>
      )}
    </nav>
  );
}
