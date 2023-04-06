import Imap from 'node-imap';

const user = process.env.IMAP_EMAIL_V2;
const password = process.env.IMAP_PASSWORD_V2;

if (!user || !password) {
  throw new Error('Missing IMAP credentials');
}

export const imap = new Imap({
  user,
  password,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  debug: console.error,
});
