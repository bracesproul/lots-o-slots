import { AbstractRepository, EntityRepository } from 'typeorm';
import { Account } from '@/entities';
import { ApolloError } from 'apollo-server-express';
import { PaymentProvider, PaymentType } from '@/entities/Payment/Payment';

@EntityRepository(Account)
export default class AccountRepository extends AbstractRepository<Account> {
  async getAll({
    provider,
    defaultAccounts,
  }: {
    type?: PaymentType;
    provider?: PaymentProvider;
    defaultAccounts?: boolean;
  }): Promise<Account[]> {
    let query = this.repository
      .createQueryBuilder('account')
      .addSelect('"account"."createdAt"', 'createdAt');

    if (provider) {
      query = query.andWhere('"type" = :type', {
        type: provider,
      });
    }

    if (defaultAccounts === true) {
      query = query.andWhere('"defaultAccount" = :defaultAccount', {
        defaultAccount: true,
      });
    }

    return query.getMany();
  }

  async createAccount({
    email,
    balance,
    canWithdrawal,
    canAcceptDeposits,
    cashtag,
    weeklyWithdrawals,
    bitcoinAddress,
    ethereumAddress,
    paymentProvider,
  }: {
    email: string;
    balance?: number;
    canWithdrawal?: boolean;
    canAcceptDeposits?: boolean;
    cashtag?: string;
    weeklyWithdrawals?: number;
    bitcoinAddress?: string;
    ethereumAddress?: string;
    paymentProvider: PaymentProvider;
  }): Promise<Account> {
    let prevAccount: Account | undefined;

    if (email) {
      email = email.toLowerCase();
      prevAccount = await this.repository.findOne({
        where: { email, type: paymentProvider },
      });
    } else if (cashtag) {
      prevAccount = await this.repository.findOne({
        where: { cashtag, type: paymentProvider },
      });
    } else if (bitcoinAddress) {
      prevAccount = await this.repository.findOne({
        where: { bitcoinAddress, type: paymentProvider },
      });
    } else if (ethereumAddress) {
      prevAccount = await this.repository.findOne({
        where: { ethereumAddress, type: paymentProvider },
      });
    }

    if (prevAccount) {
      throw new Error('Account already exists');
    }

    const account = this.repository.create({
      email: email.toLowerCase(),
      type: paymentProvider,
      balance: balance ?? 0,
      dailyWithdrawals: 0,
      canWithdrawal: canWithdrawal ?? false,
      canAcceptDeposits: canAcceptDeposits ?? false,
      cashtag,
      weeklyWithdrawals,
      bitcoinAddress,
      ethereumAddress,
    });
    return this.repository.save(account);
  }

  async findOne(email: string): Promise<Account | undefined> {
    return this.repository.findOneOrFail({ where: { email } });
  }

  async makeAccountActive({
    id,
    isCashapp,
  }: {
    id: string;
    isCashapp?: boolean;
  }): Promise<Account> {
    const account = await this.repository.findOneOrFail({ where: { id } });

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
    const account = await this.repository.findOneOrFail({ where: { id } });
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
    const account = await this.repository.findOneOrFail({ where: { id } });
    account.balance = account.balance - amount;
    return this.repository.save(account);
  }

  async checkIfAccountCanWithdraw({ id }: { id: string }): Promise<boolean> {
    const account = await this.repository.findOneOrFail({ where: { id } });
    if (!account.canWithdrawal) {
      return false;
    }
    return true;
  }

  async switchDefaultAccount({
    id,
    type,
  }: {
    id: string;
    type: PaymentProvider;
  }): Promise<Account> {
    const newDefaultAccount = await this.repository.findOneOrFail({
      where: { id },
    });
    newDefaultAccount.defaultAccount = true;
    this.repository.save(newDefaultAccount);
    const otherAccounts = await this.repository.find({ where: { type } });
    otherAccounts.forEach((a) => {
      if (a.id !== id) {
        a.defaultAccount = false;
      }
    });
    await this.repository.save(otherAccounts);
    return newDefaultAccount;
  }
}
