import { execute, imap } from '@/services/imap';
import { EventEmitter } from 'events';

class ImapConnection extends EventEmitter {
  box: any;
}

export const imapConnection = new ImapConnection();

function initializeImapConnection() {
  return new Promise((resolve) => {
    imap.once('ready', () => {
      imap.openBox('INBOX', false, function (err: any, mailBox: any) {
        if (err) {
          console.error('error opening inbox', err);
          imap.end();
        }
        resolve(true);
      });
      imap.subscribeBox('INBOX', function (err: any) {
        if (err) {
          console.log('error subscribing to inbox', err);
          imap.end();
        }
      });
    });

    imap.on('mail', function () {
      imapConnection.emit('mail');
    });

    imap.once('error', function (err: any) {
      console.error('Connection error: ' + err.stack);
      imap.end();
    });
    imap.once('close', function () {
      imapConnection.emit('close');
    });
    imap.connect();
  });
}

async function executeFetch() {
  console.log('📬 Fetching emails...');
  await execute();
}

export async function fetchAllEmails() {
  if (imap.state !== 'authenticated') await initializeImapConnection();
  await executeFetch();
}
