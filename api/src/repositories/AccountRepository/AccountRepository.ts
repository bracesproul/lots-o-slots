import { AbstractRepository, EntityRepository } from 'typeorm';
import { Account } from '@/entities';
import { ApolloError } from 'apollo-server-express';
import { PaymentProvider } from '@/entities/Payment/Payment';

@EntityRepository(Account)
export default class AccountRepository extends AbstractRepository<Account> {
  async getAll({ type }: { type?: PaymentProvider }): Promise<Account[]> {
    let query = this.repository
      .createQueryBuilder('account')
      .addSelect('"account"."createdAt"', 'createdAt');

    if (type) {
      query = query.andWhere('"type" = :type', {
        type: type,
      });
    }
    return query.getMany();
  }

  async createAccount({
    email,
    balance,
    canWithdrawal,
    canAcceptDeposits,
  }: {
    email: string;
    balance?: number;
    canWithdrawal?: boolean;
    canAcceptDeposits?: boolean;
  }): Promise<Account> {
    const prevAccount = await this.repository.findOne({ where: { email } });
    if (prevAccount) {
      throw new Error('Account already exists');
    }
    const account = this.repository.create({
      email,
      type: PaymentProvider.CASHAPP,
      balance: balance ?? 0,
      dailyWithdrawals: 0,
      weeklyWithdrawals: 0,
      canWithdrawal: canWithdrawal ?? false,
      canAcceptDeposits: canAcceptDeposits ?? false,
    });
    return this.repository.save(account);
  }

  async findOne(email: string): Promise<Account | undefined> {
    return this.repository.findOne({ where: { email } });
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
    account.balance = Number(account.balance) + Number(amount);
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
