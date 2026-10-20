'use client';
import { useEffect, useState } from 'react';
import { basePath, t } from '@smartsell/routing';
import { platformConfigured } from './client';
import config from './config.json';
const CONSENT = 'smartsell-analytics-consent-v1';
const SESSION = 'smartsell-visit-v1';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export function readConsent(): 'yes' | 'no' | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT) || 'null');
    return value &&
      ['yes', 'no'].includes(value.choice) &&
      Date.now() - value.at < MAX_AGE
      ? value.choice
      : null;
  } catch {
    return null;
  }
}
export async function trackAction(
  event:
    | 'page_view'
    | 'contact_click'
    | 'course_open'
    | 'article_open'
    | 'booking_open',
) {
  if (!platformConfigured || readConsent() !== 'yes') return;
  const path = window.location.pathname.replace(basePath, '');
  if (/\/admin\//.test(path)) return;
  let session: string;
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION) || 'null');
    session =
      saved && Date.now() - saved.at < 30 * 60 * 1000
        ? saved.id
        : crypto.randomUUID();
    sessionStorage.setItem(
      SESSION,
      JSON.stringify({ id: session, at: Date.now() }),
    );
  } catch {
    return;
  }
  // Query strings, fragments and referrers can contain personal information.
  // They are deliberately never transmitted.
  try {
    await fetch(`${config.url}/rest/v1/rpc/ecosystem_track_visit`, {
      method: 'POST',
      headers: {
        apikey: config.publishableKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kind: event, page: path, visit: session }),
      keepalive: true,
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    });
  } catch {
    /* Analytics must never interrupt a user journey. */
  }
}
export function AnalyticsConsent() {
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const c = readConsent();
    setChoice(c);
    setReady(true);
    setOpen(!c);
  }, []);
  useEffect(() => {
    if (!ready || choice !== 'yes') return;
    void trackAction('page_view');
    if (/\/courses\/[^/]+\//.test(window.location.pathname))
      void trackAction('course_open');
    if (/\/(article|articles)\/[^/]+\//.test(window.location.pathname))
      void trackAction('article_open');
    if (/\/booking\//.test(window.location.pathname))
      void trackAction('booking_open');
    const clicked = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest('a');
      if (
        a &&
        /^(https:\/\/(wa.me|api.whatsapp.com)|mailto:|tel:)/.test(a.href)
      )
        void trackAction('contact_click');
    };
    document.addEventListener('click', clicked);
    return () => document.removeEventListener('click', clicked);
  }, [ready, choice]);
  if (
    !platformConfigured ||
    !ready ||
    /\/admin\//.test(window.location.pathname)
  )
    return null;
  function choose(value: 'yes' | 'no') {
    try {
      localStorage.setItem(
        CONSENT,
        JSON.stringify({ choice: value, at: Date.now() }),
      );
      if (value === 'no') sessionStorage.removeItem(SESSION);
    } catch {
      setOpen(false);
      return;
    }
    setChoice(value);
    setOpen(false);
  }
  return (
    <>
      {open && (
        <aside
          className="ss-consent"
          aria-label={t('Choix de confidentialité', 'Privacy choices')}
        >
          <p>
            <strong>
              {t(
                'Nous aider à améliorer Smartsell ?',
                'Help improve Smartsell?',
              )}
            </strong>
          </p>
          <p>
            {t(
              'Avec votre accord, nous mesurons les pages visitées et les clics utiles via Supabase. Identifiant de session aléatoire, sans nom ni contenu saisi. Conservation : 90 jours. Votre compte et vos cours fonctionnent aussi sans cette mesure.',
              'With your consent, we measure visited pages and useful clicks through Supabase. Random session identifier, without names or entered content. Retention: 90 days. Your account and courses also work without analytics.',
            )}
          </p>
          <div>
            <button onClick={() => choose('no')}>
              {t('Refuser', 'Decline')}
            </button>
            <button onClick={() => choose('yes')}>
              {t('Accepter la mesure', 'Allow analytics')}
            </button>
            {choice && (
              <button onClick={() => setOpen(false)}>
                {t('Fermer', 'Close')}
              </button>
            )}
          </div>
        </aside>
      )}
      <button className="ss-privacy" onClick={() => setOpen(true)}>
        {t('Confidentialité', 'Privacy')}
      </button>
    </>
  );
}
