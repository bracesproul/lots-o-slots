import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultAccountToAccountTable1671570483076
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "account"
    ADD COLUMN "defaultAccount" BOOLEAN;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
