import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { getCustomRepository } from 'typeorm';
import { GcpTokenRepository, GcpCredentialsRepository } from '@/repositories';
import { config as setupEnv } from 'dotenv-flow';
import postgresConnection from '@/config/typeorm';
import { ConnectionManager } from 'typeorm';

setupEnv({ silent: true });

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

    const { refresh_token } = content;

    await fs.writeFile(
      CREDENTIALS_PATH,
      JSON.stringify({
        client_id: process.env.CLIENT_ID,
        project_id: process.env.PROJECT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uris: [process.env.REDIRECT_URIS],
      })
    );

    return google.auth.fromJSON({
      type: 'authorized_user',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token,
    });
  } catch (err) {
    throw new Error('Error loading saved credentials', { cause: err });
  }
}

// /**
//  * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
async function saveCredentials(client: any) {
  const content = await getCustomRepository(
    GcpCredentialsRepository
  ).findRecent();

  if (!content) {
    throw new Error('No credentials found.');
  }

  const payload = {
    token_type: 'authorized_user',
    refresh_token: client.credentials.refresh_token,
    access_token: client.credentials.access_token,
    expiry_date:
      client.credentials.expiry_date?.toString() ??
      (Date.now() + 86400000).toString(),
  };

  await getCustomRepository(GcpTokenRepository).create(payload);

  await fs.writeFile(TOKEN_PATH, JSON.stringify(payload));
}

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
export default async function authorize() {
  if (process.env.NODE_ENV !== 'production') {
    const connectionManager = new ConnectionManager();

    if (!connectionManager.has('default')) {
      await postgresConnection().then(async () => {
        console.info('🤠 Database connected! (inside authorize function)');
      });
    }
  }

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
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:8000/oauth2callback'
  );

  return oauth2Client;
}

export function handleAuth() {
  const oauth2Client = getOAuth2Client();

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://mail.google.com/'],
  });
}
