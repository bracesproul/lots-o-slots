import postgresConnection from '@/config/typeorm';
import serverSetup from './server';
import { config as setupEnv } from 'dotenv-flow';
import { fetchAllEmails } from './worker/jobs';
import { format } from 'date-fns';

setupEnv({ silent: true });

function runJobs() {
  if (process.env.NODE_ENV === 'development') return;
  console.log(
    'Starting email job...',
    format(new Date(), 'MMM dd, yyy hh:mm:ss a')
  );

  fetchAllEmails();
}

async function main() {
  console.info('Starting server...');

  await postgresConnection().then(async () => {
    console.info('🤠 Database connected!');
  });

  // Run jobs every 5 minutes
  const jobsIntervalId = setInterval(runJobs, 60 * 1000);

  const app = await serverSetup();
  app.listen(process.env.PORT, () => {
    console.info(`🎂 Server ready!`);
  });
}

main().catch((error) => {
  console.error('caught error @ main', error);
  process.exit(1);
});
