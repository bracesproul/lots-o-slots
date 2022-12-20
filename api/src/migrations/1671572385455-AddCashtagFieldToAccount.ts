import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCashtagFieldToAccount1671572385455
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "account"
      ADD COLUMN "cashtag" character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
