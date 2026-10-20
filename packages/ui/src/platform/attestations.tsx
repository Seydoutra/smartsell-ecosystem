'use client';
import { useEffect, useState } from 'react';
import { locale, routingConfig, t, urlFor } from '@smartsell/routing';
import { Brand } from '../brand';
import { Icon } from '../icons';
import { AccountBoundary, useAccount } from './auth';
import { checked, platform } from './client';
import {
  attestationQr,
  attestationReference,
  attestationTitle,
  attestationUrl,
  type Attestation,
} from './attestation-model';
const href = (path: string) => urlFor('academy', locale, path, routingConfig);
const issuedDate = (date: string) =>
  new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(date));

export function MyAttestations() {
  const { user } = useAccount();
  const [records, setRecords] = useState<Attestation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!user) return;
    let active = true;
    setLoading(true);
    setError('');
    const load = async () => {
      await checked(await platform().rpc('ecosystem_claim_attestations'));
      const rows = await checked(
        await platform()
          .from('academy_attestations')
          .select('id,learner_name,course_title,issued_at,revoked_at')
          .eq('user_id', user.id)
          .order('issued_at', { ascending: false }),
      );
      if (active) setRecords((rows || []) as Attestation[]);
    };
    load()
      .catch(() => {
        if (active)
          setError(
            t(
              'Les attestations sont temporairement indisponibles. Réessayez.',
              'Attestations are temporarily unavailable. Try again.',
            ),
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.id, retry]);
  return (
    <section className="ss-attestations">
      <div className="ss-learning-panel">
        <Icon name="verified" />
        <h3>{t('Votre parcours, reconnu.', 'Your learning, recognised.')}</h3>
        <p>
          {t(
            'Une attestation de participation est émise après validation de toutes les leçons requises d’une formation complète, gratuite ou payante, à laquelle vous avez accès. Les aperçus de découverte ne délivrent pas d’attestation.',
            'A participation attestation is issued after all required lessons of an eligible full course, free or paid, are completed. Introductory previews do not award attestations.',
          )}
        </p>
        <p>
          {t(
            'Chaque document possède une référence unique et un QR code pour vérifier son authenticité. Renseignez votre nom complet dans votre profil avant la fin de votre formation.',
            'Each document has a unique reference and a QR code for authenticity checks. Enter your full name in your profile before completing your course.',
          )}
        </p>
        <button
          className="text-button"
          disabled={loading}
          onClick={() => setRetry((n) => n + 1)}
        >
          {t('Actualiser mes attestations', 'Refresh my attestations')}
        </button>
      </div>
      {loading ? (
        <p role="status">
          {t('Lecture de vos attestations…', 'Loading your attestations…')}
        </p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : records.length ? (
        <div className="ss-attestation-list">
          {records.map((record) => (
            <article key={record.id}>
              <Icon name="file" />
              <div>
                <p className="ss-learning-eyebrow">
                  {record.revoked_at
                    ? t('ATTESTATION RÉVOQUÉE', 'REVOKED ATTESTATION')
                    : t(
                        'ATTESTATION DE PARTICIPATION',
                        'PARTICIPATION ATTESTATION',
                      )}
                </p>
                <h3>{attestationTitle(record)}</h3>
                <p>
                  {t('Émise le', 'Issued on')} {issuedDate(record.issued_at)} ·{' '}
                  {record.learner_name}
                </p>
                <small>SSA-{record.id}</small>
              </div>
              <a
                className="ss-learning-primary"
                href={`${href('attestation')}?id=${record.id}`}
              >
                {t('Ouvrir le document', 'Open document')}
                <Icon name="arrowUpRight" />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="ss-learning-empty">
          <Icon name="verified" />
          <h3>
            {t(
              'Votre première attestation vous attend.',
              'Your first attestation awaits.',
            )}
          </h3>
          <p>
            {t(
              'Vous retrouverez ici les attestations de vos formations complètes validées. Les modules de découverte restent des aperçus et ne délivrent pas d’attestation.',
              'Attestations for completed full courses will appear here. Introductory previews do not award attestations.',
            )}
          </p>
          <a className="text-link" href={href('courses')}>
            {t('Voir les formations', 'View courses')} →
          </a>
        </div>
      )}
      <a className="ss-attestation-verify-link" href={href('verify')}>
        {t(
          'Vérifier l’authenticité d’une attestation',
          'Verify an attestation',
        )}{' '}
        ↗
      </a>
    </section>
  );
}

function AttestationPaper({ record, qr }: { record: Attestation; qr: string }) {
  return (
    <article className="ss-attestation-paper">
      <div className="ss-attestation-border" aria-hidden="true" />
      <header>
        <Brand variant="purple" />
        <span>ACADEMY / {t('FORMATION', 'TRAINING')}</span>
      </header>
      <p className="ss-attestation-kicker">
        {t('APPRENDRE. CRÉER. AVANCER.', 'LEARN. CREATE. GROW.')}
      </p>
      <h2>
        {t('Attestation de', 'Attestation of')}
        <br />
        <em>{t('participation', 'participation')}</em>
      </h2>
      <p>
        {t('Smartsell Academy atteste que', 'Smartsell Academy confirms that')}
      </p>
      <h3 className="ss-attestation-name">{record.learner_name}</h3>
      <p>
        {t(
          'a participé à la formation complète et validé le parcours requis',
          'participated in the full training course and completed its required learning pathway',
        )}
      </p>
      <h4>{attestationTitle(record)}</h4>
      <footer>
        <div>
          <p>
            {t('Émise le', 'Issued on')}{' '}
            <strong>{issuedDate(record.issued_at)}</strong>
          </p>
          <strong>SMARTSELL ACADEMY</strong>
          <p>{t('Équipe pédagogique', 'Learning team')}</p>
          <small>
            {t('Référence', 'Reference')} : SSA-{record.id}
          </small>
        </div>
        <div className="ss-attestation-qr">
          <img
            src={qr}
            alt={t(
              'QR code de vérification de cette attestation',
              'QR code to verify this attestation',
            )}
            width={180}
            height={180}
          />
          <span>{t('Scannez pour vérifier', 'Scan to verify')}</span>
          <a href={attestationUrl(record.id)}>
            {t('Vérifier en ligne', 'Verify online')}
          </a>
        </div>
      </footer>
    </article>
  );
}
function DocumentContent() {
  const { user } = useAccount();
  const [record, setRecord] = useState<Attestation | null>(null);
  const [qr, setQr] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!user) return;
    let active = true;
    setLoading(true);
    setError('');
    setRecord(null);
    setQr('');
    const load = async () => {
      const id = attestationReference(
        new URLSearchParams(window.location.search).get('id') || '',
      );
      if (!id) throw new Error('Invalid reference');
      const result = await checked(
        await platform()
          .from('academy_attestations')
          .select('id,learner_name,course_title,issued_at,revoked_at')
          .eq('id', id)
          .eq('user_id', user.id)
          .single(),
      );
      if (!result) throw new Error('Document unavailable');
      const image = await attestationQr(id);
      if (active) {
        setRecord(result as Attestation);
        setQr(image);
      }
    };
    load()
      .catch(() => {
        if (active)
          setError(
            t(
              'Ce document ne peut pas être ouvert. Vérifiez la référence, votre compte ou réessayez.',
              'This document could not be opened. Check the reference and your account, or try again.',
            ),
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.id, retry]);
  return (
    <div className="ss-attestation-document">
      <div className="ss-attestation-tools">
        <a href={`${href('dashboard')}#attestations`}>
          ← {t('Mes attestations', 'My attestations')}
        </a>
        {record && !record.revoked_at && qr ? (
          <button
            className="ss-learning-primary"
            onClick={() => window.print()}
          >
            <Icon name="download" />
            {t('Imprimer / Enregistrer en PDF', 'Print / Save as PDF')}
          </button>
        ) : null}
      </div>
      {loading ? (
        <p role="status">
          {t(
            'Préparation de votre attestation…',
            'Preparing your attestation…',
          )}
        </p>
      ) : error ? (
        <div role="alert">
          <p>{error}</p>
          <button
            className="text-button"
            onClick={() => setRetry((n) => n + 1)}
          >
            {t('Réessayer', 'Try again')}
          </button>
        </div>
      ) : record?.revoked_at ? (
        <div className="ss-learning-empty">
          <h2>
            {t(
              'Cette attestation a été révoquée.',
              'This attestation has been revoked.',
            )}
          </h2>
          <p>
            {t(
              'Contactez Smartsell pour obtenir les informations nécessaires.',
              'Contact Smartsell for more information.',
            )}
          </p>
        </div>
      ) : record && qr ? (
        <AttestationPaper record={record} qr={qr} />
      ) : null}
    </div>
  );
}
export function AttestationDocument() {
  return (
    <AccountBoundary>
      <DocumentContent />
    </AccountBoundary>
  );
}

export function AttestationVerification() {
  const [reference, setReference] = useState('');
  const [record, setRecord] = useState<Attestation | null>(null);
  const [state, setState] = useState<
    'idle' | 'loading' | 'found' | 'missing' | 'error' | 'invalid'
  >('idle');
  const [retry, setRetry] = useState(0);
  const [lookup, setLookup] = useState('');
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      setReference(id);
      setLookup(id);
    }
  }, []);
  useEffect(() => {
    if (!lookup) return;
    const id = attestationReference(lookup);
    if (!id) {
      setState('invalid');
      return;
    }
    let active = true;
    setState('loading');
    setRecord(null);
    const verify = async () => {
      const data = await checked(
        await platform().rpc('ecosystem_verify_attestation', { reference: id }),
      );
      if (active) {
        setRecord(data as Attestation | null);
        setState(data ? 'found' : 'missing');
      }
    };
    verify().catch(() => {
      if (active) setState('error');
    });
    return () => {
      active = false;
    };
  }, [lookup, retry]);
  return (
    <section className="ss-attestation-verification">
      <p className="ss-learning-eyebrow">
        SMARTSELL ACADEMY /{' '}
        {t('REGISTRE DE VÉRIFICATION', 'VERIFICATION REGISTER')}
      </p>
      <h2>
        {t(
          'Un parcours. Une preuve vérifiable.',
          'A learning journey. Verifiable proof.',
        )}
      </h2>
      <p>
        {t(
          'Scannez le QR code du document ou renseignez sa référence. Comparez le nom, la formation et la date avec ceux de l’attestation présentée.',
          'Scan the document QR code or enter its reference. Compare the name, course and date with the presented attestation.',
        )}
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setLookup(reference);
          setRetry((n) => n + 1);
        }}
      >
        <label>
          {t('Référence de l’attestation', 'Attestation reference')}
          <input
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            placeholder="SSA-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            maxLength={40}
            required
            spellCheck={false}
          />
        </label>
        <button className="ss-learning-primary" disabled={state === 'loading'}>
          {state === 'loading'
            ? t('Vérification…', 'Checking…')
            : t('Vérifier le document', 'Verify document')}
        </button>
      </form>
      <div aria-live="polite" aria-atomic="true">
        {state === 'found' && record ? (
          <article
            className={`ss-attestation-result ${record.status === 'revoked' ? 'is-revoked' : 'is-valid'}`}
          >
            <Icon name={record.status === 'revoked' ? 'cross' : 'verified'} />
            <p className="ss-learning-eyebrow">
              {record.status === 'revoked'
                ? t('ATTESTATION RÉVOQUÉE', 'REVOKED ATTESTATION')
                : t('ATTESTATION AUTHENTIQUE', 'AUTHENTIC ATTESTATION')}
            </p>
            <h3>{record.learner_name}</h3>
            <dl>
              <div>
                <dt>{t('Formation', 'Course')}</dt>
                <dd>{attestationTitle(record)}</dd>
              </div>
              <div>
                <dt>{t('Date d’émission', 'Issue date')}</dt>
                <dd>{issuedDate(record.issued_at)}</dd>
              </div>
              <div>
                <dt>{t('Organisme', 'Issuer')}</dt>
                <dd>Smartsell Academy</dd>
              </div>
              <div>
                <dt>{t('Référence', 'Reference')}</dt>
                <dd>SSA-{record.id}</dd>
              </div>
            </dl>
            {record.status === 'revoked' ? (
              <p>
                {t(
                  'Ce document ne constitue plus une attestation valide.',
                  'This document is no longer a valid attestation.',
                )}
              </p>
            ) : (
              <p>
                {t(
                  'Cette référence figure dans le registre des attestations de participation Smartsell.',
                  'This reference is listed in the Smartsell participation attestation register.',
                )}
              </p>
            )}
          </article>
        ) : state === 'missing' ? (
          <div className="ss-learning-empty">
            <h3>{t('Attestation introuvable.', 'Attestation not found.')}</h3>
            <p>
              {t(
                'Cette référence ne correspond à aucun document enregistré.',
                'This reference does not match a registered document.',
              )}
            </p>
          </div>
        ) : state === 'error' ? (
          <p role="alert">
            {t(
              'Le service de vérification est indisponible. Réessayez ; ce message ne permet pas de conclure à l’authenticité du document.',
              'The verification service is unavailable. Try again; this message does not establish document authenticity.',
            )}
          </p>
        ) : state === 'invalid' ? (
          <p role="alert">
            {t(
              'Saisissez la référence complète imprimée sur l’attestation.',
              'Enter the complete reference printed on the attestation.',
            )}
          </p>
        ) : null}
      </div>
    </section>
  );
}
