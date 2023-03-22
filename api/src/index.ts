import postgresConnection from '@/config/typeorm';
import serverSetup from './server';
import { startJobs } from './worker';
import { config as setupEnv } from 'dotenv-flow';
import { EmailType, execute, imap } from './services/imap';

setupEnv({ silent: true });

async function main() {
  console.info('Starting server...');

  await postgresConnection().then(async () => {
    console.info('🤠 Database connected!');
  });

  startJobs();

  const app = await serverSetup();
  app.listen(process.env.PORT, () => {
    console.info(`🎂 Server ready!`);
  });
}

main().catch((error) => {
  console.error('caught error @ main', error);
  process.exit(1);
});
