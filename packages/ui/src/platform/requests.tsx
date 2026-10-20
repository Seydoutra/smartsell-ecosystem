'use client';
import { useEffect, useState } from 'react';
import { t } from '@smartsell/routing';
import { useAccount } from './auth';
import { platform, checked } from './client';
type Request = {
  id: string;
  segment: string;
  subject: string;
  state: string;
  created_at: string;
};
export function AccountRequests() {
  const { user } = useAccount();
  const [requests, setRequests] = useState<Request[]>([]);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!user) return;
    let active = true;
    platform()
      .from('requests')
      .select('id,segment,subject,state,created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30)
      .then(({ data, error }) => {
        if (!active) return;
        if (error)
          setNotice(
            t(
              'Vos demandes n’ont pas pu être chargées.',
              'Unable to load your requests.',
            ),
          );
        else setRequests(data || []);
      });
    return () => {
      active = false;
    };
  }, [user?.id, retry]);
  return (
    <section>
      <h2>{t('Échanger avec Smartsell', 'Contact Smartsell')}</h2>
      <p>
        {t(
          'Une question sur une formation ou un projet ? Votre demande sera visible par l’équipe dans son dashboard.',
          'A question about a course or project? Your request will appear in the team dashboard.',
        )}
      </p>
      <form
        className="workflow"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!user) return;
          const element = e.currentTarget;
          const data = new FormData(element);
          setBusy(true);
          setNotice('');
          try {
            await checked(
              await platform()
                .from('requests')
                .insert({
                  user_id: user.id,
                  segment: String(data.get('segment')),
                  subject: String(data.get('subject')).trim(),
                  message: String(data.get('message')).trim(),
                }),
            );
            element.reset();
            setRetry((n) => n + 1);
            setNotice(
              t(
                'Votre demande a été reçue par Smartsell.',
                'Smartsell has received your request.',
              ),
            );
          } catch {
            setNotice(
              t(
                'Votre demande n’a pas été envoyée. Réessayez plus tard (10 demandes maximum par jour).',
                'Your request was not sent. Try again later (maximum 10 requests per day).',
              ),
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        <label>
          {t('Univers concerné', 'Relevant universe')}
          <select name="segment" defaultValue="academy">
            <option value="agency">Agency</option>
            <option value="academy">Academy</option>
            <option value="media">Media</option>
            <option value="studio">Studios</option>
          </select>
        </label>
        <label>
          {t('Objet', 'Subject')}
          <input name="subject" required minLength={3} maxLength={200} />
        </label>
        <label>
          {t('Votre message', 'Your message')}
          <textarea
            name="message"
            required
            minLength={5}
            maxLength={4000}
            rows={4}
          />
        </label>
        <button className="site-button" disabled={busy}>
          {busy
            ? t('Envoi…', 'Sending…')
            : t('Envoyer ma demande', 'Send request')}
        </button>
      </form>
      <p role="status">{notice}</p>
      {requests.length > 0 && (
        <>
          <h3>{t('Mes demandes récentes', 'My recent requests')}</h3>
          {requests.map((r) => (
            <article className="compact-card" key={r.id}>
              <p>{r.subject}</p>
              <small>
                {r.segment} ·{' '}
                {r.state === 'new'
                  ? t('Reçue', 'Received')
                  : r.state === 'in_progress'
                    ? t('En cours de traitement', 'In progress')
                    : t('Clôturée', 'Closed')}
              </small>
            </article>
          ))}
        </>
      )}
    </section>
  );
}
