import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProcessedToUserPayment1672686070843
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_payment" ADD "processed" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
