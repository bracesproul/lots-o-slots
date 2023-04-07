import { AbstractRepository, EntityRepository } from 'typeorm';
import { CashAppTransaction } from '@/entities';

@EntityRepository(CashAppTransaction)
// eslint-disable-next-line max-len
export default class CashAppTransactionRepository extends AbstractRepository<CashAppTransaction> {
  async create(
    input: Partial<CashAppTransaction>
  ): Promise<CashAppTransaction> {
    return this.repository.create(input).save();
  }

  async update(
    input: Partial<CashAppTransaction>
  ): Promise<CashAppTransaction> {
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

  async findOne(id: string): Promise<CashAppTransaction | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneOrFail(id: string): Promise<CashAppTransaction> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async checkDuplicateByCashAppId(
    cashAppId: string
  ): Promise<CashAppTransaction | undefined> {
    return this.repository.findOne({ where: { cashAppId } });
  }
}
