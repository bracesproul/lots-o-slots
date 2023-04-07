import { EmailType, execute, imap } from '@/services/imap';

function executeFetch() {
  console.log('📬 Fetching emails...');
  execute();
}

export function fetchAllEmails() {
  imap.once('ready', executeFetch);
  imap.once('error', function (err: any) {
    console.error('Connection error: ' + err.stack);
  });
  if (imap.state !== 'authenticated') imap.connect();
  else executeFetch();
}
