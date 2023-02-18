import { registerEnumType } from 'type-graphql';

export enum SupabaseBucket {
  RAW_EMAILS = 'raw-emails',
}

registerEnumType(SupabaseBucket, { name: 'SupabaseBucket' });

export enum SupabaseRawEmailFolderPath {
  BANK_OF_AMERICA_DEPOSITS = 'bank_of_america/deposits',
  PAYPAL_DEPOSITS = 'paypal/deposits',
  CASHAPP_DEPOSITS = 'cashapp/deposits',
  CASHAPP_WITHDRAWALS = 'cashapp/withdrawals',
}

registerEnumType(SupabaseRawEmailFolderPath, {
  name: 'SupabaseRawEmailFolderPath',
});

const BANK_OF_AMERICA_DEPOSITS = 'bank_of_america/deposits';
const PAYPAL_DEPOSITS = 'paypal/deposits';
const CASHAPP_DEPOSITS = 'cashapp/deposits';
const CASHAPP_WITHDRAWALS = 'cashapp/withdrawals';
