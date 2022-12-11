import {
  AbstractRepository,
  EntityRepository,
  TransactionManager,
  getManager,
  getRepository,
} from 'typeorm';
import { EmailLog } from '@/entities';
import { CreateEmailLogInput } from '@/resolvers/EmailLog/types';
import { RecentUpdateReturnType } from './types';

@EntityRepository(EmailLog)
export default class EmailLogRepository extends AbstractRepository<EmailLog> {
  async create(
    input: CreateEmailLogInput,
    @TransactionManager() manager = getManager()
  ): Promise<EmailLog> {
    const { emailId } = input;
    const newEmailLog = manager.create(EmailLog, { emailId });
    return manager.save(newEmailLog);
  }

  async findOne(
    id: string,
    @TransactionManager() manager = getManager()
  ): Promise<EmailLog | undefined> {
    return manager.findOne(EmailLog, id);
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
