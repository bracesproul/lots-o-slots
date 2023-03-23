import { StorageClient } from '@supabase/storage-js';
import { createClient } from '@supabase/supabase-js';

const throwMissingKeyError = (key: string) => {
  throw new Error(`Missing ${key} environment variable`);
};

const PROJECT_URL =
  process.env.SUPABASE_PROJECT_URL ??
  throwMissingKeyError('SUPABASE_PROJECT_URL');
const STORAGE_URL = PROJECT_URL + '/storage/v1';
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  throwMissingKeyError('SUPABASE_SERVICE_ROLE_KEY');
const ANNON_KEY =
  process.env.SUPABASE_ANNON_KEY ?? throwMissingKeyError('SUPABASE_ANNON_KEY');

export const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});

export const supabaseClient = createClient(PROJECT_URL, ANNON_KEY);
export const supabaseAdminClient = createClient(PROJECT_URL, SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
