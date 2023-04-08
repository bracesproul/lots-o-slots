import { AbstractRepository, EntityRepository } from 'typeorm';
import { ChaseTransaction } from '@/entities';

@EntityRepository(ChaseTransaction)
// eslint-disable-next-line max-len
export default class ChaseTransactionRepository extends AbstractRepository<ChaseTransaction> {
  async create(input: Partial<ChaseTransaction>): Promise<ChaseTransaction> {
    return this.repository.create(input).save();
  }

  async update(input: Partial<ChaseTransaction>): Promise<ChaseTransaction> {
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

  async findOne(id: string): Promise<ChaseTransaction | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneOrFail(id: string): Promise<ChaseTransaction> {
    return this.repository.findOneOrFail({ where: { id } });
  }
}
