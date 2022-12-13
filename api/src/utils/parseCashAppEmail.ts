import { EmailObjectType } from '@/types';
import { getCustomRepository } from 'typeorm';
import { Payment, Account } from '@/entities';
import { AccountRepository, PaymentRepository } from '@/repositories';
import { PaymentInfoType } from '@/types/paymentInfo';
import { PaymentProvider } from '@/entities/Payment/Payment';
/**
 * Will likely want to do all of this from the HTML tags inside each email body.
 * Search for some tag, check if it includes the correct text, etc.
 */

type ParsedPaymentResponse = {
  success: boolean;
  amount: number;
  name: string | null;
  transactionId: string;
  cashTag: string | null;
};

export async function parseCashAppEmail(
  email: EmailObjectType
): Promise<ParsedPaymentResponse> {
  const { subject, body } = email;
  if (subject.includes('sent you $')) {
    return await parsePayment(email);
  } else if (subject.includes('You paid') && body.includes('Payment to $')) {
    return await parsePayout(email);
  } else {
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }
}

async function parsePayment(email: EmailObjectType) {
  const body = email.body.replace(/\r/g, '');

  const cashtagRegex = new RegExp(/^Payment from \$([^\s]+)/m);
  const cashtagMatch = body.match(cashtagRegex);

  const amountRegex = new RegExp(/(?<=\$)\d+\.\d+/);
  const amountMatch = body.match(amountRegex);

  const nameRegex = new RegExp(/From\s(.+)/);
  const nameMatch = body.match(nameRegex);

  const transactionIdRegex = new RegExp(/#([^\s]+)\sTo/);
  const transactionIdMatch = body.match(transactionIdRegex);

  if (!cashtagMatch || !amountMatch || !nameMatch || !transactionIdMatch) {
    console.log('failed to parse cashapp payment', {
      cashtagMatch,
      amountMatch,
      nameMatch,
      transactionIdMatch,
    });
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }

  const amount = Number(amountMatch[0]);
  const name = nameMatch[1];
  const transactionId = transactionIdMatch[1];
  const cashTag = cashtagMatch[1];

  await updateDatabasePayment({
    amount,
    name,
    transactionId,
    cashTag,
    email,
  });

  return {
    success: true,
    amount,
    name,
    transactionId,
    cashTag,
  };
}

async function parsePayout(email: EmailObjectType) {
  const body = email.body.replace(/\r/g, '');

  const cashtagRegex = new RegExp(/^Payment to \$([^\s]+)/m);
  const cashtagMatch = body.match(cashtagRegex);

  const amountRegex = new RegExp(/(?<=\$)\d+\.\d+/);
  const amountMatch = body.match(amountRegex);

  const nameRegex = new RegExp(/To\s(.+)/);
  const nameMatch = body.match(nameRegex);

  const transactionIdRegex = new RegExp(/#([^\s]+)\sTo/);
  const transactionIdMatch = body.match(transactionIdRegex);

  if (!cashtagMatch || !amountMatch || !nameMatch || !transactionIdMatch) {
    console.log('failed to parse cashapp payout', {
      cashtagMatch,
      amountMatch,
      nameMatch,
      transactionIdMatch,
    });
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }

  const amount = Number(amountMatch[0]);
  const name = nameMatch[1];
  const transactionId = transactionIdMatch[1];
  const cashTag = cashtagMatch[1];

  return {
    success: true,
    amount,
    name,
    transactionId,
    cashTag,
  };
}

type UpdatePaymentAndAccountResponse = {
  success: boolean;
  payment: Payment;
  account: Account;
};

async function updateDatabasePayment(
  paymentInfo: PaymentInfoType
): Promise<UpdatePaymentAndAccountResponse> {
  const paymentRepository = getCustomRepository(PaymentRepository);
  const accountRepository = getCustomRepository(AccountRepository);

  const payment = await paymentRepository.createPayment({
    userIdentifier: paymentInfo.name,
    amount: paymentInfo.amount,
    emailId: paymentInfo.email.id,
    provider: PaymentProvider.CASHAPP,
    senderName: paymentInfo.name,
    transactionId: paymentInfo.transactionId,
    cashTag: paymentInfo.cashTag,
  });

  let account = await accountRepository.findOne(paymentInfo.email.to);
  if (!account) {
    account = await accountRepository.createAccount({
      email: paymentInfo.email.to,
      balance: paymentInfo.amount,
      canWithdrawal: true,
      canAcceptDeposits: true,
    });
  }
  const updatedAccount = await accountRepository.creditAccountBalance({
    id: account.id,
    amount: paymentInfo.amount,
  });
  return { success: true, account: updatedAccount, payment };
}
