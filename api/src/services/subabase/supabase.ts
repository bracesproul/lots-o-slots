import { StorageClient } from '@supabase/storage-js';

const throwMissingKeyError = () => {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
};

const STORAGE_URL = 'https://zrughjrddupywpmmuolg.supabase.co/storage/v1';
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? throwMissingKeyError();

export const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});
