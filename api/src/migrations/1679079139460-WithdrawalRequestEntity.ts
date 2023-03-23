import { MigrationInterface, QueryRunner } from 'typeorm';

export class WithdrawalRequestEntity1679079139460
  implements MigrationInterface
{
  name = 'WithdrawalRequestEntity1679079139460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."withdrawal_requests_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."withdrawal_requests_payoutmethod_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`
    );
    await queryRunner.query(
      `CREATE TABLE "withdrawal_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userId" uuid NOT NULL, "status" "public"."withdrawal_requests_status_enum" NOT NULL DEFAULT 'PENDING', "amount" numeric NOT NULL, "payoutMethod" "public"."withdrawal_requests_payoutmethod_enum" NOT NULL, "payoutAddress" character varying NOT NULL, CONSTRAINT "PK_e1b3734a3f3cbd46bf0ad7eedb6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal_requests" ADD CONSTRAINT "FK_bc861755994227c5b2582edd782" FOREIGN KEY ("userId") REFERENCES "user_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawal_requests" DROP CONSTRAINT "FK_bc861755994227c5b2582edd782"`
    );
    await queryRunner.query(`DROP TABLE "withdrawal_requests"`);
    await queryRunner.query(
      `DROP TYPE "public"."withdrawal_requests_payoutmethod_enum"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."withdrawal_requests_status_enum"`
    );
  }
}
