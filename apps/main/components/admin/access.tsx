'use client';
import { useEffect, useState, type ReactNode } from 'react';
import {
  AccountBoundary,
  platform,
  platformConfigured,
  useAccount,
} from '@smartsell/ui/platform';
import { t } from '@smartsell/routing';
export function AdminAccess({ children }: { children: ReactNode }) {
  return (
    <AccountBoundary staff>
      <Authorised>{children}</Authorised>
    </AccountBoundary>
  );
}
function Authorised({ children }: { children: ReactNode }) {
  const { user } = useAccount();
  const [state, setState] = useState<'loading' | 'yes' | 'no' | 'error'>(
    'loading',
  );
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!user || !platformConfigured) return;
    let active = true;
    setState('loading');
    platform()
      .from('user_roles')
      .select('segment,role')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (active)
          setState(
            error
              ? 'error'
              : data?.some((r) => r.segment === '*' && r.role === 'admin')
                ? 'yes'
                : 'no',
          );
      });
    return () => {
      active = false;
    };
  }, [user?.id, retry]);
  if (state === 'loading')
    return (
      <p className="adm-loading" role="status">
        {t('Vérification de vos accès…', 'Checking your access…')}
      </p>
    );
  if (state !== 'yes')
    return (
      <section className="ss-account">
        <h2>
          {state === 'error'
            ? t('Connexion interrompue', 'Connection interrupted')
            : t('Accès équipe requis', 'Team access required')}
        </h2>
        <p>
          {state === 'error'
            ? t(
                'Les droits n’ont pas pu être vérifiés.',
                'Unable to verify access.',
              )
            : t(
                'Votre compte n’a pas le rôle administrateur de cet écosystème. Les comptes apprenants n’ouvrent pas l’administration.',
                'Your account does not have the ecosystem administrator role. Learner accounts do not grant administration access.',
              )}
        </p>
        <button className="site-button" onClick={() => setRetry((n) => n + 1)}>
          {t('Réessayer', 'Try again')}
        </button>
      </section>
    );
  return children;
}
