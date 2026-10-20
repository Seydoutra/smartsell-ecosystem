'use client';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import config from './config.json';

// Only the public project URL and publishable key belong in this file.
export const platformConfigured = Boolean(config.url && config.publishableKey);
let client: SupabaseClient | undefined;
export function platform() {
  if (!platformConfigured)
    throw new Error('La connexion Smartsell est en préparation.');
  client ??= createClient(config.url, config.publishableKey, {
    auth: {
      storageKey: 'smartsell-ecosystem-auth',
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  });
  return client;
}
export async function checked<T>(result: {
  data: T;
  error: { message: string } | null;
}) {
  if (result.error) throw new Error(result.error.message);
  return result.data;
}
