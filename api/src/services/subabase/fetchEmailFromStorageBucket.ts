import { storageClient } from './supabase';
import { SupabaseBucket, SupabaseRawEmailFolderPath } from './types';

export async function fetchEmailFromStorageBucket(
  supabaseFilePath: string,
  localFilePath: string
) {
  const { data, error } = await storageClient
    .from('avatars')
    .download('folder/avatar1.png');

  if (error) {
    // discord alert
    console.error(error.message);
  }

  return data;
}

const EXPIRES_IN = 86400; // 24 hours

type SignedUrlPayload = {
  url: string | null;
  errorMessage?: string;
  reason?: string;
};

export async function getSignedUrlForFile(
  folder: SupabaseRawEmailFolderPath,
  file: string,
  bucket: SupabaseBucket
): Promise<SignedUrlPayload> {
  const { data, error } = await storageClient
    .from(bucket)
    .createSignedUrl(`${folder}/${file}`, EXPIRES_IN);

  if (error) {
    // discord alert
    console.error(error.message);
    return {
      url: null,
      errorMessage: error.message,
      reason: 'Supabase error while creating signed url',
    };
  }

  if (!data) {
    // discord alert
    console.warn('No data returned from Supabase');
    return {
      url: null,
      reason: 'Returned data is null',
    };
  }

  return {
    url: data.signedUrl,
  };
}
