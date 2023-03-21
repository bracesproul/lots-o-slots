import { AbstractRepository, EntityRepository } from 'typeorm';
import { BankOfAmericaTransaction } from '@/entities';

@EntityRepository(BankOfAmericaTransaction)
// eslint-disable-next-line max-len
export default class BankOfAmericaTransactionRepository extends AbstractRepository<BankOfAmericaTransaction> {
  async create(
    input: Partial<BankOfAmericaTransaction>
  ): Promise<BankOfAmericaTransaction> {
    return this.repository.create(input).save();
  }

  async update(
    input: Partial<BankOfAmericaTransaction>
  ): Promise<BankOfAmericaTransaction> {
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

  async findOne(id: string): Promise<BankOfAmericaTransaction | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneOrFail(id: string): Promise<BankOfAmericaTransaction> {
    return this.repository.findOneOrFail({ where: { id } });
  }
}
