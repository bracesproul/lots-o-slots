import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCanAcceptDepositsAccountTable1670553947598
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ADD "canAcceptDeposits" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No need to revert this migration
  }
}
