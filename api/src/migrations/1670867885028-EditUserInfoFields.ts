import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditUserInfoFields1670867885028 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      DROP COLUMN "userIdentifier",
      ADD COLUMN "userIdentifier_zelle" character varying NULL,
      ADD COLUMN "userIdentifier_paypal" character varying NULL,
      ADD COLUMN "userIdentifier_cashapp" character varying NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no need to revert this.
  }
}
