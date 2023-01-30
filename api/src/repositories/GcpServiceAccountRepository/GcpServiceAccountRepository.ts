import { AbstractRepository, EntityRepository } from 'typeorm';
import { GcpServiceAccount } from '@/entities';

@EntityRepository(GcpServiceAccount)
// eslint-disable-next-line max-len
export default class GcpServiceAccountRepository extends AbstractRepository<GcpServiceAccount> {}
