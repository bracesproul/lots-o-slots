import {
  AbstractRepository,
  EntityRepository,
  getCustomRepository,
} from 'typeorm';
import { UserPayment, UserV2 } from '@/entities';
import { GameType, PaymentProvider } from '@/entities/Payment/Payment';
import { UserV2Repository } from '../UserV2Repository';

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

  async findById(id: string): Promise<UserPayment> {
    return this.repository.findOneOrFail(id);
  }

  async create({
    paymentIdentifier,
    paymentProvider,
    amount,
    userId,
    gameType,
    username,
  }: {
    paymentIdentifier: string;
    paymentProvider: PaymentProvider;
    amount: number;
    userId: string;
    gameType: GameType;
    username?: string;
  }): Promise<UserPayment> {
    const userPayment = this.repository.create({
      paymentIdentifier,
      paymentProvider,
      amount,
      userV2Id: userId,
      gameType,
    });

    if (username) {
      const user = await getCustomRepository(UserV2Repository).getById(userId);

      await getCustomRepository(UserV2Repository).update(
        {
          supabaseId: user.supabaseId,
          data: {
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            username: username,
          },
        },
        user
      );
    }

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

  async updateStatus({ id, processed }: { id: string; processed: boolean }) {
    const userPayment = await this.findById(id);
    userPayment.processed = processed;
    return this.repository.save(userPayment);
  }

  async delete(id: string) {
    const userPayment = await this.findById(id);
    return this.repository.remove(userPayment);
  }
}
