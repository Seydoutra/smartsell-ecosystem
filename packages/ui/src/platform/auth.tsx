'use client';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { t } from '@smartsell/routing';
import { platform, platformConfigured } from './client';

export function useAccount() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!platformConfigured) {
      setLoading(false);
      return;
    }
    let active = true;
    const client = platform();
    client.auth
      .getSession()
      .then(({ data, error }) => {
        if (active) {
          setUser(data.session?.user ?? null);
          setError(error?.message || '');
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError(
            t(
              'Connexion indisponible. Réessayez.',
              'Connection unavailable. Try again.',
            ),
          );
          setLoading(false);
        }
      });
    const { data } = client.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);
  return { user, loading, error };
}

export function AccountForm({ staff = false }: { staff?: boolean }) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    const values = new FormData(event.currentTarget);
    const email = String(values.get('email')).trim();
    const password = String(values.get('password') || '');
    const redirectTo = window.location.origin + window.location.pathname;
    try {
      const auth = platform().auth;
      if (mode === 'signup') {
        const { error } = await auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectTo,
            data: { display_name: String(values.get('name')).trim() },
          },
        });
        if (error) throw error;
        setMessage(
          t(
            'Consultez votre e-mail pour confirmer votre compte, puis revenez vous connecter.',
            'Check your email to confirm your account, then sign in.',
          ),
        );
      } else if (mode === 'forgot') {
        const { error } = await auth.resetPasswordForEmail(email, {
          redirectTo,
        });
        if (error) throw error;
        setMessage(
          t(
            'Si ce compte existe, un lien de récupération vous sera envoyé.',
            'If this account exists, a recovery link will be sent.',
          ),
        );
      } else {
        const { error } = await auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch {
      setError(
        t(
          'Connexion impossible. Vérifiez vos informations, votre confirmation e-mail ou réessayez plus tard.',
          'Unable to connect. Check your details and email confirmation, or try again later.',
        ),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      className="ss-account"
      aria-labelledby="account-title"
      data-kin-off
    >
      <p className="micro">SMARTSELL / {staff ? 'ÉQUIPE' : 'ACADEMY'}</p>
      <h2 id="account-title">
        {mode === 'signup'
          ? t(
              'Votre prochain chapitre commence ici.',
              'Your next chapter starts here.',
            )
          : mode === 'forgot'
            ? t('Retrouver votre compte', 'Recover your account')
            : staff
              ? t('Votre espace de pilotage.', 'Your control room.')
              : t(
                  'Retrouvez votre espace apprenant.',
                  'Your learner space awaits.',
                )}
      </h2>
      <p>
        {staff
          ? t(
              'Accès réservé aux membres autorisés de l’équipe.',
              'Access restricted to authorised team members.',
            )
          : t(
              'Un compte personnel pour retrouver vos modules et votre progression sur tous vos appareils.',
              'One personal account for your courses and progress on all your devices.',
            )}
      </p>
      {!platformConfigured ? (
        <p role="status">
          {t(
            'L’activation de la connexion est en cours. Vos contenus restent accessibles sur le site.',
            'Account connection is being activated. Site content remains available.',
          )}
        </p>
      ) : (
        <form onSubmit={submit}>
          {mode === 'signup' && (
            <label>
              {t('Votre nom', 'Your name')}
              <input name="name" autoComplete="name" maxLength={100} required />
            </label>
          )}
          <label>
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>
          {mode !== 'forgot' && (
            <label>
              {t('Mot de passe', 'Password')}
              <input
                name="password"
                type="password"
                minLength={12}
                maxLength={128}
                autoComplete={
                  mode === 'signup' ? 'new-password' : 'current-password'
                }
                required
              />
            </label>
          )}
          {mode === 'signup' && (
            <label className="check-line">
              <input type="checkbox" required />
              {t(
                'J’accepte la création de mon compte et le stockage de ma progression. Les statistiques de navigation sont facultatives.',
                'I agree to account creation and progress storage. Navigation analytics are optional.',
              )}
            </label>
          )}
          <button className="site-button" disabled={busy}>
            {busy
              ? t('Connexion…', 'Connecting…')
              : mode === 'signup'
                ? t('Créer mon compte', 'Create my account')
                : mode === 'forgot'
                  ? t('Envoyer le lien', 'Send link')
                  : t('Se connecter', 'Sign in')}
          </button>
        </form>
      )}
      <div className="ss-account-actions">
        {!staff && (
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signup' ? 'login' : 'signup');
              setError('');
              setMessage('');
            }}
          >
            {mode === 'signup'
              ? t('J’ai déjà un compte', 'I already have an account')
              : t('Créer un compte', 'Create an account')}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'forgot' ? 'login' : 'forgot');
            setError('');
            setMessage('');
          }}
        >
          {mode === 'forgot'
            ? t('Retour à la connexion', 'Back to sign in')
            : t('Mot de passe oublié ?', 'Forgot password?')}
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
    </section>
  );
}

export function AccountBoundary({
  children,
  staff = false,
}: {
  children: ReactNode;
  staff?: boolean;
}) {
  const { user, loading, error } = useAccount();
  const [recovery, setRecovery] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    if (!platformConfigured) return;
    const { data } = platform().auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  if (loading)
    return (
      <p role="status">
        {t('Ouverture de votre espace…', 'Opening your space…')}
      </p>
    );
  if (!user)
    return (
      <>
        <AccountForm staff={staff} />
        {error && <p role="alert">{error}</p>}
      </>
    );
  if (recovery)
    return (
      <form
        className="ss-account"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const password = String(form.get('password'));
          if (password !== String(form.get('confirm'))) {
            setNotice(
              t(
                'Les mots de passe ne correspondent pas.',
                'Passwords do not match.',
              ),
            );
            return;
          }
          const { error } = await platform().auth.updateUser({ password });
          if (error)
            setNotice(
              t(
                'La modification a échoué. Réessayez.',
                'Update failed. Try again.',
              ),
            );
          else {
            setRecovery(false);
            setNotice('');
          }
        }}
      >
        <h2>{t('Nouveau mot de passe', 'New password')}</h2>
        <label>
          {t('Mot de passe', 'Password')}
          <input
            name="password"
            type="password"
            minLength={12}
            maxLength={128}
            autoComplete="new-password"
            required
          />
        </label>
        <label>
          {t('Confirmer', 'Confirm')}
          <input
            name="confirm"
            type="password"
            minLength={12}
            maxLength={128}
            autoComplete="new-password"
            required
          />
        </label>
        <button className="site-button">{t('Enregistrer', 'Save')}</button>
        <p role="status">{notice}</p>
      </form>
    );
  return (
    <>
      <div className="ss-account-bar">
        <span>{user.email}</span>
        <button
          type="button"
          onClick={async () => {
            const { error } = await platform().auth.signOut();
            if (error)
              setNotice(
                t(
                  'Déconnexion impossible. Réessayez.',
                  'Unable to sign out. Try again.',
                ),
              );
          }}
        >
          {t('Se déconnecter', 'Sign out')}
        </button>
        {notice && <p role="alert">{notice}</p>}
      </div>
      {children}
    </>
  );
}
