import { storageClient } from './supabase';
import { SupabaseRawEmailFolderPath, SupabaseBucket } from './types';

type UploadToStorageBucketPayload = {
  path: string | null;
  errorMessage?: string;
  reason?: string;
};

export async function uploadEmailToStorageBucket(
  body: string,
  folderPath: SupabaseRawEmailFolderPath,
  bucket: SupabaseBucket
): Promise<UploadToStorageBucketPayload> {
  const { data, error } = await storageClient
    .from(bucket)
    .upload(folderPath, body);

  if (error) {
    // discord alert
    console.error(error.message);
    return {
      path: null,
      errorMessage: error.message,
      reason: 'Supabase error while uploading email',
    };
  }

  if (!data) {
    // discord alert
    console.warn('No data returned from Supabase while trying to upload email');
    return {
      path: null,
      reason: 'No data returned from Supabase while trying to upload email',
    };
  }

  return {
    path: data.path,
  };
}
