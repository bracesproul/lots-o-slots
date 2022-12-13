import { AbstractRepository, EntityRepository } from 'typeorm';
import { Payment, User } from '@/entities';
import { PaymentProvider, PaymentType } from '@/entities/Payment/Payment';
import { GetPaymentsInput } from '@/resolvers/Payment/types';
import { PayoutUserReturnType } from './types';
import { EmailObjectType } from '@/types';

@EntityRepository(Payment)
export default class PaymentRepository extends AbstractRepository<Payment> {
  async getAll(input: GetPaymentsInput): Promise<Payment[]> {
    let query = this.repository
      .createQueryBuilder('payment')
      .addSelect('"payment"."createdAt"', 'createdAt');

    if (input.paymentProvider) {
      query = query.andWhere('"provider" = :provider', {
        provider: input.paymentProvider,
      });
    }

    if (input.processed === true) {
      query = query.andWhere('payment.processed = :processed', {
        processed: input.processed,
      });
    }
    return query.addOrderBy('"createdAt"', 'ASC').getMany();
  }

  async createPayment({
    userIdentifier,
    amount,
    processed,
    emailId,
    provider,
    senderName,
    transactionId,
    cashTag,
    paymentType,
  }: {
    userIdentifier: string;
    amount: number;
    processed?: boolean;
    emailId: string;
    provider: PaymentProvider;
    senderName: string;
    transactionId?: string;
    cashTag?: string;
    paymentType: PaymentType;
  }): Promise<Payment> {
    const loggedPayment = await this.repository.findOne({
      where: { transactionId },
    });
    if (loggedPayment) {
      return loggedPayment;
    }

    let user = await User.findOne({
      where: [
        { userIdentifier_paypal: userIdentifier },
        { userIdentifier_zelle: userIdentifier },
        { userIdentifier_cashapp: userIdentifier },
        { cashTag: cashTag },
      ],
    });
    if (!user) {
      switch (provider) {
        case PaymentProvider.PAYPAL:
          {
            user = User.create({
              userIdentifier_paypal: userIdentifier,
              balance: amount,
            });
          }
          await User.save(user);
          break;
        case PaymentProvider.ZELLE:
          {
            user = User.create({
              userIdentifier_zelle: userIdentifier,
              balance: amount,
            });
          }
          await User.save(user);
          break;
        case PaymentProvider.CASHAPP:
          {
            console.log('CASHTAG TO BE ADDED', cashTag);
            user = User.create({
              userIdentifier_cashapp: userIdentifier,
              cashTag: cashTag,
              balance: amount,
            });
          }
          await User.save(user);
          break;
      }
    } else {
      user.balance = Number(user.balance) + Number(amount);
      await User.save(user);
    }
    const payment = this.repository.create({
      userId: user.id,
      amount,
      processed: processed || false,
      emailId,
      provider,
      transactionId,
      senderName,
      paymentType,
    });
    return this.repository.save(payment);
  }

  async markPaymentAsProcessed({ id }: { id: string }): Promise<Payment> {
    const payment = await this.repository.findOneOrFail(id);
    payment.processed = true;
    return this.repository.save(payment);
  }

  async getProcessedPayments(): Promise<Payment[]> {
    return this.repository.find({ where: { processed: true } });
  }

  async getUnprocessedPayments(): Promise<Payment[]> {
    return this.repository.find({ where: { processed: false } });
  }

  async payoutUser({
    uniqueIdentifier,
    cashTag,
    amount,
    email,
  }: {
    uniqueIdentifier: string;
    cashTag: string;
    amount: number;
    email: EmailObjectType;
  }): Promise<PayoutUserReturnType> {
    /**
     * a. add new payment with type of PAYOUT
     * 1. find user
     * 2. check if user has enough balance
     * 3. if yes, subtract amount from user balance
     */


    const user = await User.findOne({
      where: [
        { userIdentifier_paypal: uniqueIdentifier },
        { userIdentifier_zelle: uniqueIdentifier },
        { userIdentifier_cashapp: uniqueIdentifier },
        { cashTag: cashTag },
      ],
    });
    if (!user) {
      // discord message.
      return {
        success: false,
        message: 'User not found',
        user: null,
        payment: null,
      };
    }
    if (user.balance < amount) {
      // discord message
      return {
        success: false,
        message: 'User does not have enough balance',
        user: user,
        payment: null,
      };
    }
    user.balance = Number(user.balance) - Number(amount);
    await User.save(user);

    const payment = await this.createPayment({
      userIdentifier: uniqueIdentifier,
      amount,
      processed: true,
      emailId: email.id,
      provider: PaymentProvider.CASHAPP,
      senderName: uniqueIdentifier,
      cashTag,
      paymentType: PaymentType.PAYOUT,
    });

    return {
      success: true,
      message: 'Successfully paid out user.',
      user: user,
      payment: payment,
    };
  }
}
