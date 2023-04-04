import { EmailType, execute, imap } from '@/services/imap';

export function fetchAllEmails() {
  imap.once('ready', () => {
    console.log('📬 Fetching emails...');
    // execute('cash@square.com', EmailType.CASHAPP_DEPOSIT);
    execute('customerservice@ealerts.bankofamerica.com', EmailType.BOFA);
    // execute('service@paypal.com', EmailType.PAYPAL);
  });
  imap.once('error', function (err: any) {
    console.error('Connection error: ' + err.stack);
  });
  imap.connect();
}
