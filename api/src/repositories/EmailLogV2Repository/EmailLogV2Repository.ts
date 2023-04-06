import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import { EmailLogV2, Transaction } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';

@EntityRepository(EmailLogV2)
// eslint-disable-next-line max-len
export default class EmailLogV2Repository extends AbstractRepository<EmailLogV2> {
  async getAll({
    hasTransactions,
    processed,
  }: {
    hasTransactions?: boolean;
    /**
     * @default false
     */
    processed?: boolean;
  }): Promise<EmailLogV2[]> {
    const isEmailProcessed = processed === undefined ? false : processed;
    const query = this.repository.createQueryBuilder('emailLog');

    if (hasTransactions === false) {
      query.where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('transaction.emailLogId')
          .from(Transaction, 'transaction')
          .getQuery();
        return 'emailLog.id NOT IN ' + subQuery;
      });
    }

    query.andWhere('emailLog.processed = :processed', {
      processed: isEmailProcessed,
    });

    const emails = await query.orderBy('emailLog.createdAt', 'DESC').getMany();

    return emails;
  }

  async create(input: Partial<EmailLogV2>): Promise<EmailLogV2> {
    const previousEmail = await this.repository.findOne({
      where: { emailId: input.emailId },
    });

    if (previousEmail) {
      return previousEmail;
    }

    return this.repository.create(input).save();
  }

  async update(input: Partial<EmailLogV2>): Promise<EmailLogV2> {
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

  async findOne(id: string): Promise<EmailLogV2 | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneOrFail(id: string): Promise<EmailLogV2> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async findByEmailId(emailId: number): Promise<EmailLogV2 | undefined> {
    return this.repository.findOne({ where: { emailId } });
  }

  async deleteByEmailId(emailId: number): Promise<void> {
    await this.repository.delete({ emailId });
  }

  async markAsProcessed({
    id,
    emailId,
  }: {
    id?: string;
    emailId?: number;
  }): Promise<void> {
    let email: EmailLogV2 | undefined;
    if (id) {
      email = await this.findOne(id);
    }
    if (emailId) {
      email = await this.findByEmailId(emailId);
    }
    if (email) {
      email.processed = true;
      await this.repository.save(email);
    }
  }
}
