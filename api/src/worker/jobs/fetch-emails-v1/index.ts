import { EmailType, execute, imap } from '@/services/imap';

export function fetchEmails() {
  imap.once('ready', () => {
    console.log('📬 Fetching emails...');
    execute('customerservice@ealerts.bankofamerica.com', EmailType.BOFA);
    execute('service@paypal.com', EmailType.PAYPAL);
    execute('cash@square.com', EmailType.CASHAPP_DEPOSIT);
  });
  imap.once('error', function (err: any) {
    console.error('Connection error: ' + err.stack);
  });
  imap.connect();
}
