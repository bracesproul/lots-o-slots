import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import { EmailLog } from '@/entities';

@EntityRepository(EmailLog)
export default class EmailLogRepository extends AbstractRepository<EmailLog> {
  emailLogRepo = getRepository(EmailLog);
  async create(emailId: string): Promise<EmailLog> {
    const newEmailLog = this.repository.create({ emailId });
    return this.repository.save(newEmailLog);
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
