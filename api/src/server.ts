import { startApolloServer } from '@/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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

        const whiteList = process.env.CORS_ORIGIN
          ? String(process.env.CORS_ORIGIN).split(',')
          : [];
        if (whiteList.includes(requestOrigin)) {
          return callback(null, true);
        }

        let hostname = requestOrigin;

        try {
          ({ hostname } = new URL(requestOrigin));
        } catch (error) {
          console.error(
            `Could not parse origin: ${requestOrigin}. Continuing anyways...`
          );
        }

        if (whiteList.includes(hostname)) {
          return callback(null, true);
        }

        // check if the whiteList includes any hostname prefixed with the
        // protocols
        const acceptableProtocols = ['http', 'https'];
        if (
          acceptableProtocols.some((protocol) =>
            whiteList.includes(`${protocol}://${hostname}`)
          )
        ) {
          return callback(null, true);
        }

        // HACK: for staging we want to enable all our PR builds which end
        // with .vercel.app
        if (
          process.env.NODE_ENV === 'staging' &&
          requestOrigin &&
          requestOrigin.endsWith('.vercel.app')
        ) {
          return callback(null, true);
        }

        console.error(
          `Could not accept origin: ${requestOrigin} with ${process.env.CORS_ORIGIN}`
        );

        callback(new Error('Not allowed.'), false);
      },
      credentials: true,
      optionsSuccessStatus: 200,
      exposedHeaders: ['Set-Cookie'],
    })
  );
  app.get('/', (_, res) => {
    return res.send('API is running');
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
