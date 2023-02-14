import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import { EmailLog } from '@/entities';

@EntityRepository(EmailLog)
export default class EmailLogRepository extends AbstractRepository<EmailLog> {
  emailLogRepo = getRepository(EmailLog);

  async create(input: Partial<EmailLog>): Promise<EmailLog> {
    const previousEmail = await this.emailLogRepo.findOne({
      where: { emailId: input.emailId },
    });

    if (previousEmail) {
      if (previousEmail.processed) {
        // discord webhook trying to process email that has already been processed
      }
      if (previousEmail.type !== input.type) {
        // discord webhook trying to process email with new type
      }
    }

    return this.repository
      .create({
        ...previousEmail,
        ...input,
      })
      .save();
  }

  async findOne(id: string): Promise<EmailLog | undefined> {
    return this.emailLogRepo.findOne({ where: { id } });
  }

  async getRecentUpdate(): Promise<EmailLog> {
    const result = await this.repository
      .createQueryBuilder()
      .select('*')
      .from('email_log', 'e')
      .orderBy('e.createdAt', 'DESC')
      .limit(1)
      .getRawOne();
    return result;
  }
}
