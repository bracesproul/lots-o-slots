import { EmailType, execute, imap } from '@/services/imap';

export function fetchPayPalEmails() {
  imap.once('ready', () => {
    console.log('📬 Fetching paypal emails...');
    // execute('service@paypal.com', EmailType.PAYPAL);
  });
  imap.once('error', function (err: any) {
    console.error('Connection error: ' + err.stack);
  });
  imap.connect();
}

if (require.main === module) {
  console.time('fetchPayPalEmails');
  fetchPayPalEmails();
}
