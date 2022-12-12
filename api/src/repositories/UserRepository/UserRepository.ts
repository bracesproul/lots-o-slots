import {
  AbstractRepository,
  EntityRepository,
  getManager,
  TransactionManager,
} from 'typeorm';
import { User } from '@/entities';
import { ApolloError } from 'apollo-server-express';

@EntityRepository(User)
export default class UserRepository extends AbstractRepository<User> {
  async getAll(): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('"user"."createdAt"', 'createdAt')
      .addOrderBy('"createdAt"', 'ASC')
      .getMany();
  }

  async createUser(
    {
      userIdentifier,
      balance,
    }: {
      userIdentifier: string;
      balance: number;
    },
    @TransactionManager() manager = getManager()
  ): Promise<User> {
    if (
      await manager.findOne(User, {
        where: [
          { userIdentifier_paypal: userIdentifier },
          { userIdentifier_zelle: userIdentifier },
          { userIdentifier_cashapp: userIdentifier },
        ],
      })
    ) {
      throw new ApolloError('Username already exists');
    }
    const user = manager.create(User, {
      userIdentifier_zelle: userIdentifier,
      balance,
    });
    return manager.save(user);
  }

  async updateUserBalance({
    id,
    balance,
  }: {
    id: string;
    balance: number;
  }): Promise<User> {
    const user = await this.repository.findOneOrFail(id);
    user.balance = user.balance + balance;
    return this.repository.save(user);
  }
}
