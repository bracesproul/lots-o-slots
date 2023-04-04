import postgresConnection from '@/config/typeorm';
import serverSetup from './server';
import { config as setupEnv } from 'dotenv-flow';
import {
  fetchBoFAEmails,
  fetchCashAppEmails,
  fetchPayPalEmails,
} from './worker/jobs';
import { format } from 'date-fns';

setupEnv({ silent: true });

function runJobs() {
  console.log(
    'Starting email job...',
    format(new Date(), 'MMM dd, yyy hh:mm:ss a')
  );
  fetchBoFAEmails();

  // Schedule the second function to run after 1 minute (60,000 ms)
  setTimeout(() => {
    fetchPayPalEmails();

    // Schedule the third function to run after another 1 minute
    setTimeout(() => {
      fetchCashAppEmails();
    }, 1 * 60 * 1000);
  }, 1 * 60 * 1000);
  console.log('Ended email job', format(new Date(), 'MMM dd, yyy hh:mm:ss a'));
}

async function main() {
  console.info('Starting server...');

  await postgresConnection().then(async () => {
    console.info('🤠 Database connected!');
  });

  // Run jobs every 5 minutes
  const jobsIntervalId = setInterval(runJobs, 5 * 60 * 1000);

  const app = await serverSetup();
  app.listen(process.env.PORT, () => {
    console.info(`🎂 Server ready!`);
  });
}

main().catch((error) => {
  console.error('caught error @ main', error);
  process.exit(1);
});
