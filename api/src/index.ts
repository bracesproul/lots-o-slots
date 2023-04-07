import postgresConnection from '@/config/typeorm';
import serverSetup from './server';
import { config as setupEnv } from 'dotenv-flow';
import { fetchAllEmails, imapConnection } from './worker/jobs';
import { format } from 'date-fns';

setupEnv({ silent: true });

function runJobs() {
  if (process.env.NODE_ENV === 'development') return;
  console.log(
    'Starting email job...',
    format(new Date(), 'MMM dd, yyy hh:mm:ss a')
  );

  const startedAt = Date.now();
  new Promise((resolve) => {
    // keep track of  statuses so we can watch for new mail while the current job is running, as it wont pick it up after the search
    let nextPollTimeoutId: number;
    let finishedCurrentJob = false;
    let gotNewMail = false;

    imapConnection.once('mail', () => {
      console.log('Got new mail, starting next job ASAP');
      if (nextPollTimeoutId) clearTimeout(nextPollTimeoutId);
      if (finishedCurrentJob) resolve(true);
      else gotNewMail = true;
    });

    // If the connection closes, we want to poll for anything missed ASAP
    imapConnection.once('close', () => {
      console.log('Imap connection closed, starting next job ASAP');
      if (nextPollTimeoutId) clearTimeout(nextPollTimeoutId);
      if (finishedCurrentJob) resolve(true);
      else gotNewMail = true;
    });

    fetchAllEmails().then(() => {
      console.log(`Finished getting emails in ${Date.now() - startedAt}ms`);
      if (gotNewMail) resolve(true);
      else {
        finishedCurrentJob = true;
        setTimeout(() => {
          imapConnection.removeAllListeners('mail');
          resolve(true);
        }, 60 * 1000 * 10); // Poll every 10 minutes regardless of if new mail or not
      }
    });
  }).then(runJobs);
}

async function main() {
  console.info('Starting server...');

  await postgresConnection().then(async () => {
    console.info('🤠 Database connected!');
  });

  runJobs();

  const app = await serverSetup();
  app.listen(process.env.PORT, () => {
    console.info(`🎂 Server ready!`);
  });
}

main().catch((error) => {
  console.error('caught error @ main', error);
  process.exit(1);
});
