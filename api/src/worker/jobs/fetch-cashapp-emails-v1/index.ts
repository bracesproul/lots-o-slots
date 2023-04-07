import { EmailType, execute, imap } from '@/services/imap';

export function fetchCashAppEmails() {
  imap.once('ready', () => {
    console.log('📬 Fetching cashapp emails...');
    // execute('cash@square.com', EmailType.CASHAPP_DEPOSIT);
  });
  imap.once('error', function (err: any) {
    console.error('Connection error: ' + err.stack);
  });
  imap.connect();
}

if (require.main === module) {
  console.time('fetchCashAppEmails');
  fetchCashAppEmails();
}
