import test from 'node:test';
import assert from 'node:assert/strict';
import {
  confirmEmail,
  resendConfirmation,
  pendingConfirmation,
  rememberConfirmation,
  forgetConfirmation,
  type ConfirmationAuth,
} from '../packages/ui/src/platform/email-confirmation';

test('Email confirmation requires six digits and a server-issued session; leading zeros survive', async () => {
  let calls = 0;
  const auth = {
    verifyOtp: async (request: unknown) => {
      calls++;
      assert.deepEqual(request, {
        email: 'student@example.com',
        token: '012345',
        type: 'email',
      });
      return { data: { session: { user: { id: 'verified' } } }, error: null };
    },
  } as unknown as ConfirmationAuth;
  for (const token of ['12345', '1234567', '12x456', '', '１２３４５６'])
    await assert.rejects(confirmEmail(auth, 'student@example.com', token));
  assert.equal(calls, 0, 'invalid input must not call Auth');
  await confirmEmail(auth, ' student@example.com ', '012345');
  assert.equal(calls, 1);
  const expired = {
    verifyOtp: async () => ({
      data: { session: null },
      error: new Error('expired'),
    }),
  } as unknown as ConfirmationAuth;
  await assert.rejects(
    confirmEmail(expired, 'student@example.com', '123456'),
    /expired/,
  );
  const missingSession = {
    verifyOtp: async () => ({ data: { session: null }, error: null }),
  } as unknown as ConfirmationAuth;
  await assert.rejects(
    confirmEmail(missingSession, 'student@example.com', '123456'),
    /session_missing/,
  );
});
test('Resending confirms the existing signup and propagates server rate limits', async () => {
  const auth = {
    resend: async (request: unknown) => {
      assert.deepEqual(request, {
        type: 'signup',
        email: 'student@example.com',
      });
      return { error: new Error('rate_limit') };
    },
  } as unknown as ConfirmationAuth;
  await assert.rejects(
    resendConfirmation(auth, ' student@example.com '),
    /rate_limit/,
  );
});
test('Pending confirmation resumes briefly without persisting passwords, codes, or proof of verification', () => {
  const values = new Map<string, string>();
  const store = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  };
  rememberConfirmation(store, 'student@example.com', 1000);
  assert.deepEqual(pendingConfirmation(store, 2000), {
    email: 'student@example.com',
    resendAfter: 61000,
  });
  assert.deepEqual(Object.keys(JSON.parse([...values.values()][0])).sort(), [
    'email',
    'expires',
    'resendAfter',
  ]);
  assert.equal(pendingConfirmation(store, 601000), null);
  assert.equal(values.size, 0);
  rememberConfirmation(store, 'student@example.com', 1000);
  forgetConfirmation(store);
  assert.equal(pendingConfirmation(store, 2000), null);
  const unavailable = {
    getItem() {
      throw new Error('blocked');
    },
    setItem() {
      throw new Error('blocked');
    },
    removeItem() {
      throw new Error('blocked');
    },
  };
  assert.doesNotThrow(() =>
    rememberConfirmation(unavailable, 'student@example.com'),
  );
  assert.equal(pendingConfirmation(unavailable), null);
});
