import { AbstractRepository, EntityRepository } from 'typeorm';
import { GcpServiceAccount } from '@/entities';

@EntityRepository(GcpServiceAccount)
// eslint-disable-next-line max-len
export default class GcpServiceAccountRepository extends AbstractRepository<GcpServiceAccount> {
  async findRecent(): Promise<GcpServiceAccount | undefined> {
    return this.repository.findOne({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(input: Partial<GcpServiceAccount>): Promise<GcpServiceAccount> {
    const entity = this.repository.create(input);

    return this.repository.save(entity);
  }
}
