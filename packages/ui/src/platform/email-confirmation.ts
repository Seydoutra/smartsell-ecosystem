import type { SupabaseClient } from '@supabase/supabase-js';

export type ConfirmationAuth = Pick<
  SupabaseClient['auth'],
  'verifyOtp' | 'resend'
>;
export const CONFIRMATION_TTL = 600_000;
const KEY = 'smartsell-pending-email-confirmation-v1';
type Store = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export function rememberConfirmation(
  store: Store,
  email: string,
  now = Date.now(),
) {
  try {
    store.setItem(
      KEY,
      JSON.stringify({
        email: email.trim(),
        expires: now + CONFIRMATION_TTL,
        resendAfter: now + 60_000,
      }),
    );
  } catch {
    /* Confirmation still works when browser storage is unavailable. */
  }
}
export function forgetConfirmation(store: Store) {
  try {
    store.removeItem(KEY);
  } catch {
    /* Browser storage is optional. */
  }
}
export function pendingConfirmation(
  store: Store,
  now = Date.now(),
): { email: string; resendAfter: number } | null {
  try {
    const value = JSON.parse(store.getItem(KEY) || 'null');
    if (
      value &&
      typeof value.email === 'string' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) &&
      value.email.length <= 254 &&
      Number.isFinite(value.expires) &&
      value.expires > now &&
      value.expires <= now + CONFIRMATION_TTL &&
      Number.isFinite(value.resendAfter) &&
      value.resendAfter <= now + 60_000
    )
      return { email: value.email, resendAfter: value.resendAfter };
  } catch {
    /* Ignore corrupt or inaccessible browser storage. */
  }
  forgetConfirmation(store);
  return null;
}
export async function confirmEmail(
  auth: ConfirmationAuth,
  email: string,
  token: string,
) {
  if (!/^[0-9]{6}$/.test(token)) throw new Error('invalid_confirmation_code');
  const { data, error } = await auth.verifyOtp({
    email: email.trim(),
    token,
    type: 'email',
  });
  if (error) throw error;
  if (!data.session) throw new Error('confirmation_session_missing');
}
export async function resendConfirmation(
  auth: ConfirmationAuth,
  email: string,
) {
  const { error } = await auth.resend({ type: 'signup', email: email.trim() });
  if (error) throw error;
}
