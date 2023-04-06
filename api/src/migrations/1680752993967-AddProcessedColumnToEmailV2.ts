import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProcessedColumnToEmailV21680752993967
  implements MigrationInterface
{
  name = 'AddProcessedColumnToEmailV21680752993967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "email_log_v2" ADD "processed" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "email_log_v2" DROP COLUMN "processed"`
    );
  }
}
