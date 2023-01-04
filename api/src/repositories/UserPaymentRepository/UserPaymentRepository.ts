import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserPayment } from '@/entities';
import { GameType, PaymentProvider } from '@/entities/Payment/Payment';

@EntityRepository(UserPayment)
/* eslint-disable-next-line max-len */
export default class UserPaymentRepository extends AbstractRepository<UserPayment> {
  async getAll({ processed }: { processed?: boolean }): Promise<UserPayment[]> {
    let query = this.repository
      .createQueryBuilder('user_payment')
      .addSelect('"user_payment"."updatedAt"', 'updatedAt');

    if (processed !== undefined) {
      query = query.andWhere('"user_payment"."processed" = :processed', {
        processed,
      });
    }

    return query.addOrderBy('"updatedAt"', 'DESC').getMany();
  }

  async create({
    paymentIdentifier,
    paymentProvider,
    amount,
    userId,
    gameType,
  }: {
    paymentIdentifier: string;
    paymentProvider: PaymentProvider;
    amount: number;
    userId?: string;
    gameType: GameType;
  }): Promise<UserPayment> {
    const userPayment = this.repository.create({
      paymentIdentifier,
      paymentProvider,
      amount,
      userId,
      gameType,
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
