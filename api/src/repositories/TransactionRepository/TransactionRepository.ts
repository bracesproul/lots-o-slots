import {
  AbstractRepository,
  EntityRepository,
  getCustomRepository,
} from 'typeorm';
import { EmailLogV2, Transaction } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';
import { PaymentType } from '@/entities/Transaction/types';
import { PaymentStatus } from '@/entities/Transaction/types';
import { BankOfAmericaTransactionRepository } from '../BankOfAmericaTransactionRepository';
import { EmailLogV2Repository } from '../EmailLogV2Repository';
import { v4 as uuid } from 'uuid';
import { PayPalTransactionRepository } from '../PayPalTransactionRepository';
import { CashAppTransactionRepository } from '../CashAppTransactionRepository';

@EntityRepository(Transaction)
// eslint-disable-next-line max-len
export default class TransactionRepository extends AbstractRepository<Transaction> {
  async getAll({
    status,
    provider,
    paymentType,
  }: {
    status?: PaymentStatus;
    provider?: PaymentProvider;
    paymentType?: string;
  }): Promise<Transaction[]> {
    const query = await this.repository
      .createQueryBuilder('transaction')
      .where({
        ...(status && { status }),
        ...(provider && { provider }),
        ...(paymentType && { paymentType }),
      })
      .getMany();
    return query;
  }

  async create(input: Partial<Transaction>): Promise<Transaction> {
    return this.repository.create(input).save();
  }

  async createAdminTransaction({
    amount,
    status,
    emailLogId,
    provider,
    senderName,
    paymentType,
  }: {
    amount: number;
    status: PaymentStatus;
    emailLogId?: string;
    provider: PaymentProvider;
    senderName: string;
    paymentType?: PaymentType;
  }): Promise<Transaction> {
    let emailLog: EmailLogV2 = {} as EmailLogV2;
    if (!emailLogId) {
      const randomNegativeNumber = Math.floor(Math.random() * -1000);
      emailLog = await getCustomRepository(EmailLogV2Repository).create({
        emailId: randomNegativeNumber,
        subject: 'Admin created transaction',
        body: 'Admin created transaction',
        receivedAt: new Date(),
      });
    }

    const transaction = await this.repository
      .create({
        amount,
        status,
        emailLog,
        emailLogId: emailLog.id,
        provider,
        paymentType,
        senderName,
      })
      .save();

    if (provider === PaymentProvider.ZELLE) {
      const bofaPayload = await getCustomRepository(
        BankOfAmericaTransactionRepository
      ).create({
        amount,
        senderIdentifier: senderName,
        transaction,
        transactionId: transaction.id,
      });
      await this.repository
        .create({
          ...transaction,
          bankOfAmericaTransaction: bofaPayload,
        })
        .save();
    } else if (provider === PaymentProvider.PAYPAL) {
      const payPalPayload = await getCustomRepository(
        PayPalTransactionRepository
      ).create({
        amount,
        senderIdentifier: senderName,
        transaction,
        transactionId: transaction.id,
      });
      await this.repository
        .create({
          ...transaction,
          payPalTransaction: payPalPayload,
        })
        .save();
    } else if (provider === PaymentProvider.CASHAPP) {
      const cashAppPayload = await getCustomRepository(
        CashAppTransactionRepository
      ).create({
        amount,
        cashtag: senderName,
        transaction,
        transactionId: transaction.id,
      });
      await this.repository
        .create({
          ...transaction,
          cashAppTransaction: cashAppPayload,
        })
        .save();
    }

    await getCustomRepository(EmailLogV2Repository).update({
      id: emailLog.id,
      transaction,
    });

    return transaction;
  }

  async update(input: Partial<Transaction>): Promise<Transaction> {
    const previousEmail = await this.repository.findOne({
      where: { id: input.id },
    });

    return this.repository
      .create({
        ...previousEmail,
        ...input,
      })
      .save();
  }

  async findOne(id: string): Promise<Transaction | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneOrFail(id: string): Promise<Transaction> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async findByEmailId(emailId: string): Promise<Transaction | undefined> {
    return this.repository.findOne({ where: { emailId } });
  }

  async getRecentUpdate(
    provider: PaymentProvider
  ): Promise<Transaction | undefined> {
    const result = await this.repository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.emailLog', 'emailLogV2')
      .where('transaction.provider = :provider', {
        provider,
      })
      .orderBy('emailLogV2.emailId', 'DESC')
      .take(1)
      .getOne();
    return result;
  }

  async updateStatus(input: {
    status: PaymentStatus;
    id: string;
  }): Promise<Transaction> {
    const transaction = await this.repository.findOneOrFail({
      where: { id: input.id },
    });
    return this.repository
      .create({
        ...transaction,
        status: input.status,
      })
      .save();
  }
}
