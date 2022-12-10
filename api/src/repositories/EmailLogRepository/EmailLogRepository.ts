import {
  AbstractRepository,
  EntityRepository,
  TransactionManager,
  getManager,
} from 'typeorm';
import { EmailLog } from '@/entities';
import { CreateEmailLogInput } from '@/resolvers/EmailLog/types';

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
}
