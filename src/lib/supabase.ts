import { createClient } from '@supabase/supabase-js';

// The public site remains viewable before the live Supabase project is configured.
const configuredUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const configuredAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(configuredUrl && configuredAnonKey);

const url = configuredUrl ?? 'https://preview.supabase.invalid';
const anonKey = configuredAnonKey ?? 'preview-anon-key';

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
