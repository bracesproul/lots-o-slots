import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditPaymentTableColumns1670865418242
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "payment"
      ADD COLUMN "transactionId" character varying NULL,
      ADD COLUMN "senderName" character varying NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no need to reverse this migration
  }
}
