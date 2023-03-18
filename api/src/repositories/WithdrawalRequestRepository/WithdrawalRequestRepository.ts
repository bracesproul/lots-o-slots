import {
  AbstractRepository,
  EntityRepository,
  getCustomRepository,
} from 'typeorm';
import { UserV2, WithdrawalRequest } from '@/entities';
import { WithdrawalRequestStatus } from '@/entities/WithdrawalRequest/types';
import { GetAllInput } from './types';
import { PaymentProvider } from '@/entities/Payment/Payment';
import { UserV2Repository } from '../UserV2Repository';

@EntityRepository(WithdrawalRequest)
// Line length too long, so we disable the rule for this line
// @typescript-eslint/ban-ts-comment
// eslint-disable-next-line
export default class WithdrawalRequestRepository extends AbstractRepository<WithdrawalRequest> {
  async getAll(input?: GetAllInput): Promise<WithdrawalRequest[]> {
    const defaultInput = {
      orderBy: 'createdAt',
    };
    const { orderBy } = { ...defaultInput, ...input };

    return this.repository
      .createQueryBuilder('withdrawalRequest')
      .addSelect(`"withdrawalRequest"."${orderBy}"`, `${orderBy}`)
      .addOrderBy(`"${orderBy}"`, 'ASC')
      .getMany();
  }

  async findById(id: string): Promise<WithdrawalRequest> {
    return this.repository.findOneOrFail({
      where: { id },
    });
  }

  async create({
    userId,
    amount,
    payoutMethod,
    payoutAddress,
    status = WithdrawalRequestStatus.PENDING,
  }: {
    userId: string;
    amount: number;
    payoutMethod: PaymentProvider;
    payoutAddress: string;
    status?: WithdrawalRequestStatus;
  }): Promise<WithdrawalRequest> {
    const user = await getCustomRepository(UserV2Repository).getById(userId);
    const withdrawalRequest: WithdrawalRequest = this.repository.create({
      status,
      user,
      userId,
      amount,
      payoutMethod,
      payoutAddress,
    });

    return this.repository.save(withdrawalRequest);
  }

  async updateStatus({
    id,
    status,
  }: {
    id: string;
    status: WithdrawalRequestStatus;
  }): Promise<WithdrawalRequest> {
    const withdrawalRequest = await this.findById(id);
    withdrawalRequest.status = status;
    return this.repository.save(withdrawalRequest);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
