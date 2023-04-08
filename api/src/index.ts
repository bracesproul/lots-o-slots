import postgresConnection from '@/config/typeorm';
import serverSetup from './server';
import { config as setupEnv } from 'dotenv-flow';
import { runJobs } from './worker/startJobs';

setupEnv({ silent: true });

async function main() {
  console.info('Starting server...');

  await postgresConnection().then(async () => {
    console.info('🤠 Database connected!');
  });

  if (process.env.NODE_ENV === 'production') {
    console.info('👷 Running jobs...');
    runJobs();
  }

  const app = await serverSetup();
  app.listen(process.env.PORT, () => {
    console.info(`🎂 Server ready!`);
  });
}

main().catch((error) => {
  console.error('caught error @ main', error);
  process.exit(1);
});
