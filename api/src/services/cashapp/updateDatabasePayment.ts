import { Account } from '@/entities';
import { PaymentProvider, PaymentType } from '@/entities/Payment/Payment';
import {
  PaymentRepository,
  AccountRepository,
  EmailLogRepository,
} from '@/repositories';
import { PaymentInfoType } from '@/types/paymentInfo';
import { getCustomRepository } from 'typeorm';
import { UpdatePaymentAndAccountResponse } from './types';

export async function updateDatabasePayment(
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
    paymentType: paymentInfo.type ?? PaymentType.DEPOSIT,
  });

  let account = await accountRepository.findOne(paymentInfo.email.to);
  if (!account) {
    account = await accountRepository.createAccount({
      email: paymentInfo.email.to,
      balance: paymentInfo.amount,
      canWithdrawal: true,
      canAcceptDeposits: true,
      paymentProvider: PaymentProvider.CASHAPP,
    });
  }

  let updatedAccount: Account | null;
  if (paymentInfo.type === PaymentType.WITHDRAWAL) {
    updatedAccount = await accountRepository.debitAccountBalance({
      id: account.id,
      amount: paymentInfo.amount,
    });
  } else {
    updatedAccount = await accountRepository.creditAccountBalance({
      id: account.id,
      amount: paymentInfo.amount,
    });
  }

  return { success: true, account: updatedAccount, payment };
}
