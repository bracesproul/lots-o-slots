import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { getCustomRepository } from 'typeorm';
import { GcpTokenRepository, GcpCredentialsRepository } from '@/repositories';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
export async function loadSavedCredentialsIfExist() {
  try {
    const content = await getCustomRepository(GcpTokenRepository).findRecent();

    if (!content) {
      return null;
    }

    const {
      access_token: client_id,
      expiry_date: client_secret,
      refresh_token,
    } = content;

    const credentialsContent = await getCustomRepository(
      GcpCredentialsRepository
    ).findRecent();

    await fs.writeFile(
      CREDENTIALS_PATH,
      JSON.stringify({
        client_id: credentialsContent?.client_id,
        project_id: credentialsContent?.project_id,
        auth_uri: credentialsContent?.auth_uri,
        token_uri: credentialsContent?.token_uri,
        auth_provider_x509_cert_url:
          credentialsContent?.auth_provider_x509_cert_url,
        client_secret: credentialsContent?.client_secret,
        redirect_uris: credentialsContent?.redirect_uris,
      })
    );

    return google.auth.fromJSON({
      type: 'authorized_user',
      client_id,
      client_secret,
      refresh_token,
    });
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: any) {
  const content = await getCustomRepository(
    GcpCredentialsRepository
  ).findRecent();

  if (!content) {
    throw new Error('No credentials found.');
  }

  const payload = {
    type: 'authorized_user',
    client_id: content.client_id,
    client_secret: content.client_secret,
    refresh_token: client.credentials.refresh_token,
  };

  await getCustomRepository(GcpTokenRepository).create(payload);

  await fs.writeFile(TOKEN_PATH, JSON.stringify(payload));
}

/**
 * Load or request or authorization to call APIs.
 *
 */
export default async function authorize() {
  const client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  const authenticatedClient = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (authenticatedClient.credentials) {
    await saveCredentials(authenticatedClient);
  }
  return authenticatedClient;
}

export function getOAuth2Client() {
  const oauth2Client = new google.auth.OAuth2(
    '14616064911-e54ghnd35smnpale2en2mme5eun60nta.apps.googleusercontent.com',
    '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',
    'http://localhost:8000/oauth2callback'
  );

  return oauth2Client;
}

export function handleAuth() {
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ['https://mail.google.com/'];

  const oauth2Client = getOAuth2Client();

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });

  console.log('url', url);
}
