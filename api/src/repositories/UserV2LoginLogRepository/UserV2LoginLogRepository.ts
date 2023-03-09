import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import { UserV2LoginLog, UserV2 } from '@/entities';
import { isSameDay } from 'date-fns';

@EntityRepository(UserV2LoginLog)
export default class UserV2LoginLogRepository extends AbstractRepository<UserV2LoginLog> {
  async updateLog(userId: string): Promise<UserV2LoginLog> {
    const user = await getRepository(UserV2).findOneOrFail({
      where: { id: userId }
    })

    const previousEntry = await this.repository.createQueryBuilder('userLog')
      .where('userLog.userId = :userId', { userId })
      .orderBy('userLog.loginDate', 'DESC')
      .getOne();
  
    if (!previousEntry) {
      return this.repository.create({
        loginDate: new Date(),
        user,
      }).save()
    }
    const recentLogin = new Date(previousEntry.loginDate);
    if (isSameDay(recentLogin, new Date())) {
      return previousEntry;
    }
    return this.repository.create({
      loginDate: new Date(),
      user,
    }).save();
  }
}
