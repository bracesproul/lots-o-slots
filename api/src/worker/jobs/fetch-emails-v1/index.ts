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

export function fetchPayPalEmails() {
  imap.once('ready', () => {
    console.log('📬 Fetching paypal emails...');
    execute('service@paypal.com', EmailType.PAYPAL);
  });
  imap.once('error', function (err: any) {
    console.error('Connection error: ' + err.stack);
  });
  imap.connect();
}

export function fetchCashAppEmails() {
  imap.once('ready', () => {
    console.log('📬 Fetching cashapp emails...');
    execute('cash@square.com', EmailType.CASHAPP_DEPOSIT);
  });
  imap.once('error', function (err: any) {
    console.error('Connection error: ' + err.stack);
  });
  imap.connect();
}
