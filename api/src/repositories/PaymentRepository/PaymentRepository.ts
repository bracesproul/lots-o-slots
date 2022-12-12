import {
  AbstractRepository,
  EntityRepository,
  SelectQueryBuilder,
} from 'typeorm';
import { Payment, User } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';
import { GetPaymentsInput } from '@/resolvers/Payment/types';

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
  }: {
    userIdentifier: string;
    amount: number;
    processed?: boolean;
    emailId: string;
    provider: PaymentProvider;
    senderName: string;
    transactionId?: string;
  }): Promise<Payment> {
    const loggedPayment = await this.repository.findOne({
      where: { transactionId },
    });
    if (loggedPayment) {
      console.log('PAYMENT ALREADY LOGGED');
      return loggedPayment;
    }

    let user = await User.findOne({ where: { userIdentifier } });
    if (!user) {
      user = User.create({
        userIdentifier,
        balance: amount,
      });
      await User.save(user);
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
}
