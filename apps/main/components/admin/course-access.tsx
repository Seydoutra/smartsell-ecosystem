'use client';
import { useState } from 'react';
import { courses } from '@smartsell/content/academy';
import { platform, checked } from '@smartsell/ui/platform';
import { t } from '@smartsell/routing';
export function CourseAccess() {
  const full = courses.filter((c) => c.full);
  const [course, setCourse] = useState(full[0]?.slug || '');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  if (!full.length) return null;
  return (
    <section className="adm-course-access">
      <h2>
        {t(
          'Academy · accès aux formations complètes',
          'Academy · full course access',
        )}
      </h2>
      <p>
        {t(
          'Accordez l’accès à un apprenant dont le compte est déjà confirmé. Cette action n’enregistre aucun paiement et ne valide aucune leçon.',
          'Grant access to a learner with a confirmed account. This action does not record a payment or complete lessons.',
        )}
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setNotice('');
          try {
            await checked(
              await platform().rpc('ecosystem_grant_course_access', {
                course,
                learner_email: email.trim(),
              }),
            );
            setNotice(
              t(
                'Accès accordé. L’apprenant peut retrouver la formation dans son espace.',
                'Access granted. The learner can find the course in their space.',
              ),
            );
            setEmail('');
          } catch {
            setNotice(
              t(
                'Accès non accordé. Vérifiez que le cours est installé et que le compte apprenant est confirmé.',
                'Access was not granted. Check that the course is installed and the learner account is confirmed.',
              ),
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        <label>
          {t('Formation', 'Course')}
          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            {full.map((c) => (
              <option value={c.slug} key={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t(
            'E-mail du compte apprenant confirmé',
            'Confirmed learner account email',
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={254}
            autoComplete="off"
            required
          />
        </label>
        <button disabled={busy}>
          {busy
            ? t('Enregistrement…', 'Saving…')
            : t('Accorder l’accès intégral', 'Grant full access')}
        </button>
      </form>
      <p role="status">{notice}</p>
    </section>
  );
}
