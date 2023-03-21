import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import { EmailLogV2 } from '@/entities';
import { PaymentProvider } from '@/entities/Payment/Payment';

@EntityRepository(EmailLogV2)
// eslint-disable-next-line max-len
export default class EmailLogV2Repository extends AbstractRepository<EmailLogV2> {
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
}
