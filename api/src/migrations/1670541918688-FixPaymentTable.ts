import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixPaymentTable1670541918688 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE payment DROP COLUMN "userIdentifier";
    `);
    await queryRunner.query(`
      ALTER TABLE "payment"
      ADD COLUMN "userId" uuid NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "payment"
      DROP COLUMN "provider";
    `);

    await queryRunner.query(`
      ALTER TABLE "payment"
      ADD COLUMN "provider" payment_provider_enum NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE payment ADD CONSTRAINT FK_payment_userid FOREIGN KEY ("userId") REFERENCES "user"("id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE payment ADD COLUMN "userIdentifier" character varying NOT NULL;
    `);

    await queryRunner.query(`
      DROP TABLE "user_payments";
    `);
  }
}
