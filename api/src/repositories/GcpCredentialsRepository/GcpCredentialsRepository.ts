import { AbstractRepository, EntityRepository } from 'typeorm';
import { GcpCredentials } from '@/entities';

@EntityRepository(GcpCredentials)
// eslint-disable-next-line max-len
export default class GcpCredentialsRepository extends AbstractRepository<GcpCredentials> {
  async findRecent(): Promise<GcpCredentials | undefined> {
    return this.repository.findOne({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(input: Partial<GcpCredentials>): Promise<GcpCredentials> {
    const entity = this.repository.create(input);

    return this.repository.save(entity);
  }
}
