import { AbstractRepository, EntityRepository } from 'typeorm';
import { Account } from '@/entities';
import { ApolloError } from 'apollo-server-express';
import { PaymentProvider } from '@/entities/Payment/Payment';

@EntityRepository(Account)
export default class AccountRepository extends AbstractRepository<Account> {
  async getAll(): Promise<Account[]> {
    return this.repository
      .createQueryBuilder('aayment')
      .addSelect('"aayment"."createdAt"', 'createdAt')
      .addOrderBy('"createdAt"', 'ASC')
      .getMany();
  }

  async makeAccountActive({
    id,
    isCashapp,
  }: {
    id: string;
    isCashapp?: boolean;
  }): Promise<Account> {
    const account = await this.repository.findOneOrFail(id);

    if (isCashapp) {
      const previousAccount = await this.repository.findOneOrFail({
        where: { id, type: PaymentProvider.CASHAPP },
      });
      previousAccount.canAcceptDeposits = false;
      await this.repository.save(previousAccount);
    }

    if (account.canAcceptDeposits) {
      throw new ApolloError('Account is already active');
    }
    account.canAcceptDeposits = true;
    return this.repository.save(account);
  }

  async creditAccountBalance({
    id,
    amount,
  }: {
    id: string;
    amount: number;
  }): Promise<Account> {
    const account = await this.repository.findOneOrFail(id);
    account.balance = account.balance + amount;
    return this.repository.save(account);
  }

  async debitAccountBalance({
    id,
    amount,
  }: {
    id: string;
    amount: number;
  }): Promise<Account> {
    const account = await this.repository.findOneOrFail(id);
    account.balance = account.balance - amount;
    return this.repository.save(account);
  }

  async checkIfAccountCanWithdraw({ id }: { id: string }): Promise<boolean> {
    const account = await this.repository.findOneOrFail(id);
    if (!account.canWithdrawal) {
      return false;
    }
    return true;
  }
}
