import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentTypeEnumToPaymentsTable1670900243410
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."payment_type_enum" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'PAYOUT');`
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "paymentType" payment_type_enum NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no need to revert this.
  }
}
