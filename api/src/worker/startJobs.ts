import { CronJob } from 'cron';
import {
  fetchBoFAEmails,
  fetchPayPalEmails,
  fetchCashAppEmails,
  fetchAllEmails,
} from './jobs';

export function startJobs() {
  const fetchBofaJob = new CronJob(
    '* 3 * * * *',
    function () {
      console.log('Starting fetchEmailsJob...');
      fetchBoFAEmails();
    },
    null,
    true,
    'America/Los_Angeles'
  );

  const fetchPaypalJob = new CronJob(
    '* 3 * * * *',
    function () {
      console.log('Starting fetchEmailsJob...');
      fetchPayPalEmails();
    },
    null,
    true,
    'America/Los_Angeles'
  );

  const fetchCashappJob = new CronJob(
    '* 3 * * * *',
    function () {
      console.log('Starting fetchEmailsJob...');
      fetchCashAppEmails();
    },
    null,
    true,
    'America/Los_Angeles'
  );

  const fetchAllEmailsJob = new CronJob(
    '* 3 * * * *',
    function () {
      console.log('Starting fetchAllEmails...');
      fetchAllEmails();
    },
    null,
    true,
    'America/Los_Angeles'
  );

  // fetchBofaJob.start();
  // fetchPaypalJob.start();
  // fetchCashappJob.start();
  fetchAllEmailsJob.start();
}
