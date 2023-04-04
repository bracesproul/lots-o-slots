import { AbstractRepository, EntityRepository } from 'typeorm';
import { Account } from '@/entities';
import { ApolloError } from 'apollo-server-express';
import { PaymentProvider } from '@/entities/Payment/Payment';
import { GraphQLError } from 'graphql';
import { PaymentType } from '@/entities/Transaction/types';

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
      throw new ApolloError('Account already exists');
    }

    const account = this.repository.create({
      email: email.toLowerCase(),
      type: paymentProvider,
      balance: balance ?? 0,
      dailyWithdrawals: 0,
      canWithdrawal: canWithdrawal ?? false,
      canAcceptDeposits: canAcceptDeposits ?? false,
      cashtag,
      weeklyWithdrawals: weeklyWithdrawals ?? 0,
      bitcoinAddress,
      ethereumAddress,
    });
    return this.repository.save(account);
  }

  async findOne(email: string): Promise<Account | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<Account> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async makeAccountActive({
    id,
    isCashapp,
  }: {
    id: string;
    isCashapp?: boolean;
  }): Promise<Account> {
    const account = await this.repository.findOne({ where: { id } });

    if (!account) {
      throw new ApolloError('Account not found');
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
  }): Promise<Account | null> {
    const account = await this.repository.findOne({ where: { id } });
    if (!account) {
      return null;
    }
    account.balance = Number(account.balance) + Number(amount);
    return this.repository.save(account);
  }

  async debitAccountBalance({
    id,
    amount,
  }: {
    id: string;
    amount: number;
  }): Promise<Account | null> {
    const account = await this.repository.findOne({ where: { id } });
    if (!account) {
      return null;
    }
    account.balance = account.balance - amount;
    return this.repository.save(account);
  }

  async checkIfAccountCanWithdraw({ id }: { id: string }): Promise<boolean> {
    const account = await this.repository.findOne({ where: { id } });
    if (!account || !account.canWithdrawal) {
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
    const newDefaultAccount = await this.repository.findOne({
      where: { id },
    });

    if (!newDefaultAccount) {
      throw new ApolloError('Account not found');
    }

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

  async update({
    id,
    name,
    identifier,
    balance,
    type,
  }: {
    id: string;
    name?: string;
    identifier?: string;
    balance?: number;
    type: PaymentProvider;
  }): Promise<Account> {
    const account = await this.findById(id);
    if (!account) {
      throw new ApolloError('Account not found');
    }
    const updateEmail =
      type !==
      (PaymentProvider.CASHAPP ||
        PaymentProvider.BITCOIN ||
        PaymentProvider.ETHEREUM);
    const updateBtcAddress = type === PaymentProvider.BITCOIN;
    const updateEthAddress = type === PaymentProvider.ETHEREUM;
    const updateCashtag = type === PaymentProvider.CASHAPP;

    await this.repository.update(id, {
      name,
      balance: balance ? balance : account.balance,
      email: updateEmail ? identifier : account.email,
      cashtag: updateCashtag ? identifier : account.cashtag,
      bitcoinAddress: updateBtcAddress ? identifier : account.bitcoinAddress,
      ethereumAddress: updateEthAddress ? identifier : account.ethereumAddress,
      type: type ? type : account.type,
    });

    await account.reload();
    return account;
  }

  async create({
    name,
    identifier,
    balance,
    type,
  }: {
    name: string;
    identifier: string;
    balance: number;
    type: PaymentProvider;
  }): Promise<Account> {
    const updateEmail =
      type !==
      (PaymentProvider.CASHAPP ||
        PaymentProvider.BITCOIN ||
        PaymentProvider.ETHEREUM);
    const updateBtcAddress = type === PaymentProvider.BITCOIN;
    const updateEthAddress = type === PaymentProvider.ETHEREUM;
    const updateCashtag = type === PaymentProvider.CASHAPP;

    if (updateEmail) {
      const account = await this.repository.findOne({
        where: { email: identifier, type },
      });
      if (account) {
        throw new GraphQLError(
          'Account with this email and payment type already exists.'
        );
      }
    }

    if (updateBtcAddress || updateEthAddress || updateCashtag) {
      const account = await this.repository.findOne({
        where: [
          { bitcoinAddress: identifier },
          { ethereumAddress: identifier },
          { cashtag: identifier },
        ],
      });
      if (account) {
        throw new GraphQLError('Account already exists with this identifier.');
      }
    }

    return this.repository
      .create({
        name,
        balance,
        type,
        email: updateEmail ? identifier : 'placeholder',
        cashtag: updateCashtag ? identifier : undefined,
        bitcoinAddress: updateBtcAddress ? identifier : undefined,
        ethereumAddress: updateEthAddress ? identifier : undefined,
        dailyWithdrawals: 0,
        weeklyWithdrawals: 0,
        canWithdrawal: true,
        canAcceptDeposits: true,
      })
      .save();
  }

  async delete(id: string): Promise<boolean> {
    const account = await this.repository.findOne({ where: { id } });
    if (!account) {
      throw new GraphQLError('Account not found');
    }
    await this.repository.softDelete(id);
    return true;
  }

  async makeAccountDefault(id: string): Promise<Account> {
    const accountToMakeDefault = await this.repository.findOneOrFail({
      where: { id },
    });

    const otherAccounts = await this.repository.find({
      where: { type: accountToMakeDefault.type },
    });
    otherAccounts.forEach((a) => {
      if (a.id !== id) {
        a.defaultAccount = false;
      }
    });
    await this.repository.save(otherAccounts);

    accountToMakeDefault.defaultAccount = true;
    return this.repository.save(accountToMakeDefault);
  }

  async findCashappAccountByEmail(email: string): Promise<Account | undefined> {
    return this.repository.findOne({
      where: { email, type: PaymentProvider.CASHAPP },
    });
  }
}
