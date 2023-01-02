import { AbstractRepository, EntityRepository } from 'typeorm';
import { Payment, User, UserPayment } from '@/entities';
import { PaymentProvider, PaymentType } from '@/entities/Payment/Payment';
import { GetPaymentsInput } from '@/resolvers/Payment/types';
import { EmailObjectType } from '@/types';

@EntityRepository(UserPayment)
/* eslint-disable-next-line max-len */
export default class UserPaymentRepository extends AbstractRepository<UserPayment> {
  async getAll(): Promise<UserPayment[]> {
    const query = this.repository
      .createQueryBuilder('user_payment')
      .addSelect('"user_payment"."updatedAt"', 'updatedAt');

    return query.addOrderBy('"updatedAt"', 'DESC').getMany();
  }

  async create({
    paymentIdentifier,
    paymentProvider,
    amount,
    userId,
  }: {
    paymentIdentifier: string;
    paymentProvider: PaymentProvider;
    amount: number;
    userId?: string;
  }): Promise<UserPayment> {
    const userPayment = this.repository.create({
      paymentIdentifier,
      paymentProvider,
      amount,
      userId,
    });

    return this.repository.save(userPayment);
  }

  async markAsProcessed(id: string): Promise<UserPayment | undefined> {
    const userPayment = await this.repository.findOne(id);
    if (!userPayment) {
      return undefined;
    }
    userPayment.processed = true;
    return this.repository.save(userPayment);
  }
}
