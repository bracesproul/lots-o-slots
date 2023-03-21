import { AbstractRepository, EntityRepository } from 'typeorm';
import { PayPalTransaction } from '@/entities';

@EntityRepository(PayPalTransaction)
// eslint-disable-next-line max-len
export default class PayPalTransactionRepository extends AbstractRepository<PayPalTransaction> {
  async create(input: Partial<PayPalTransaction>): Promise<PayPalTransaction> {
    return this.repository.create(input).save();
  }

  async update(input: Partial<PayPalTransaction>): Promise<PayPalTransaction> {
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

  async findOne(id: string): Promise<PayPalTransaction | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneOrFail(id: string): Promise<PayPalTransaction> {
    return this.repository.findOneOrFail({ where: { id } });
  }
}
