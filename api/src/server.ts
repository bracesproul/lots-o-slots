import { startApolloServer } from '@/config';
import express from 'express';
import cookieParser from 'cookie-parser';

async function serverSetup(): Promise<express.Application> {
  const app = express();
  app.use(cookieParser());
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
