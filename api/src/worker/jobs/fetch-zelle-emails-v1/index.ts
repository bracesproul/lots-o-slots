import { EmailType, execute, imap } from '@/services/imap';

export function fetchBoFAEmails() {
  imap.once('ready', () => {
    console.log('📬 Fetching bofa emails...');
    execute('customerservice@ealerts.bankofamerica.com', EmailType.BOFA);
  });
  imap.once('error', function (err: any) {
    console.error('Connection error: ' + err.stack);
  });
  imap.connect();
}

if (require.main === module) {
  console.time('fetchBoFAEmails');
  fetchBoFAEmails();
}
