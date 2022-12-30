import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import { User } from '@/entities';
import { ApolloError } from 'apollo-server-express';

@EntityRepository(User)
export default class UserRepository extends AbstractRepository<User> {
  userRepo = getRepository(User);

  async getAll(): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .addSelect('"user"."createdAt"', 'createdAt')
      .addOrderBy('"createdAt"', 'ASC')
      .getMany();
  }

  async createUser({
    userIdentifier,
    balance,
    email,
    password,
  }: {
    userIdentifier?: string;
    balance: number;
    email?: string;
    password?: string;
  }): Promise<User> {
    if (
      await this.userRepo.findOne({
        where: [
          { userIdentifier_paypal: userIdentifier },
          { userIdentifier_zelle: userIdentifier },
          { userIdentifier_cashapp: userIdentifier },
          { email: email },
        ],
      })
    ) {
      throw new ApolloError('User already exists');
    }
    const user = this.repository.create({
      userIdentifier_zelle: userIdentifier,
      balance,
      email,
      password,
    });
    return this.repository.save(user);
  }

  async updateUserBalance({
    id,
    balance,
  }: {
    id: string;
    balance: number;
  }): Promise<User> {
    const user = await this.repository.findOneOrFail({ where: { id } });
    user.balance = user.balance + balance;
    return this.repository.save(user);
  }
}
