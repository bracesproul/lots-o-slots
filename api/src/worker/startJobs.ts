import { CronJob } from 'cron';
import { fetchEmails } from './jobs';

export function startJobs() {
  const fetchEmailsJob = new CronJob(
    '* 3 * * * *',
    function () {
      console.log('Starting fetchEmailsJob...');
      fetchEmails();
    },
    null,
    true,
    'America/Los_Angeles'
  );

  fetchEmailsJob.start();
}
