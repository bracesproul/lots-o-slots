import { EmailObjectType } from '@/types';
import { Payment, User, Account } from '@/entities';
import { getCustomRepository } from 'typeorm';
/**
 * Will likely want to do all of this from the HTML tags inside each email body.
 * Search for some tag, check if it includes the correct text, etc.
 */

export async function parseCashAppEmail(email: EmailObjectType) {
  /**
   * 1. Check if it's a payment, or withdrawal.
   * If payment send it to `parsePayment()`, else send to `parseWithdrawal()`
   */
  const { subject } = email;
  if (subject.includes('sent you')) {
    await parsePayment(email);
  } else if (
    subject.includes('You purchased bitcoin') ||
    subject.includes('Your withdrawal of')
    // other possible withdrawal subjects
  ) {
    await parseWithdrawal(email);
  }
}

async function parsePayment(email: EmailObjectType) {
  // parse payment.
  const paymentRepo = getCustomRepository(Payment);
  const userRepo = getCustomRepository(User);
  /**
   * 1. Search for exiting user, if none exist then create new
   * and update balance and unique id (cashtag, etc)
   * 2. Add new payment inside payment repo.
   * 3. Update balance
   * 3a. Find account (derive from sentTo email address)
   * 3b. Update balance
   */
}

async function parseWithdrawal(email: EmailObjectType) {
  // parse withdrawal.
  const accountRepo = getCustomRepository(Account);
  /**
   * Find account from sentTo email address.
   * Update balance
   */
}
