import { startApolloServer } from '@/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { getOAuth2Client } from '@/services/gmail/auth/Auth';
import { getCustomRepository } from 'typeorm';
import { GcpTokenRepository } from './repositories';

async function serverSetup(): Promise<express.Application> {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: (requestOrigin, callback) => {
        // origin === undefined means it was the same origin
        if (requestOrigin === undefined) {
          return callback(null, true);
        }

        // HACK: for staging we want to enable all our PR builds which end
        // with .vercel.app
        // add domain when we have it.
        if (
          process.env.NODE_ENV === 'staging' &&
          requestOrigin &&
          requestOrigin.endsWith('.vercel.app')
        ) {
          return callback(null, true);
        }

        // console.error(
        //   `Could not accept origin: ${requestOrigin} with ${process.env.CORS_ORIGIN}`
        // );

        // callback(new Error('Not allowed.'), false);
        return callback(null, true);
      },
      credentials: true,
      optionsSuccessStatus: 200,
      exposedHeaders: ['Set-Cookie'],
    })
  );
  app.get('/', (_, res) => {
    return res.status(200).send('API is running');
  });

  const oauth2Client = getOAuth2Client();

  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.refresh_token) {
      oauth2Client.setCredentials({
        refresh_token: tokens.refresh_token,
      });

      if (tokens.access_token && tokens.refresh_token) {
        const tokenRepo = getCustomRepository(GcpTokenRepository);
        await tokenRepo.create({
          token_type: tokens.token_type ?? 'Bearer',
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date:
            tokens.expiry_date?.toString() ??
            (Date.now() + 86400000).toString(),
        });
      }
    }
  });

  app.get('/oauth2callback', async (req, res) => {
    const query = req.query;
    const code = query.code as string;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials({
      refresh_token: tokens.refresh_token,
    });
  });

  const apollo = await startApolloServer();
  apollo.applyMiddleware({
    app,
    cors: false,
    path: '/graphql',
  });

  return app;
}

export default serverSetup;
