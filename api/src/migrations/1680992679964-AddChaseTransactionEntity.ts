import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddChaseTransactionEntity1680992679964
  implements MigrationInterface
{
  name = 'AddChaseTransactionEntity1680992679964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chase_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "amount" numeric NOT NULL, "senderIdentifier" character varying NOT NULL, "transactionId" uuid NOT NULL, CONSTRAINT "PK_5e4979b91ec3174d367bf33318a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "chaseTransactionId" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "UQ_920b28126319ce546395abcecf4" UNIQUE ("chaseTransactionId")`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."payment_provider_enum" RENAME TO "payment_provider_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_provider_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM', 'CHASE')`
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ALTER COLUMN "provider" TYPE "public"."payment_provider_enum" USING "provider"::"text"::"public"."payment_provider_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."payment_provider_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."account_type_enum" RENAME TO "account_type_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_type_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM', 'CHASE')`
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "type" TYPE "public"."account_type_enum" USING "type"::"text"::"public"."account_type_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."account_type_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_payment_paymentprovider_enum" RENAME TO "user_payment_paymentprovider_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_payment_paymentprovider_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM', 'CHASE')`
    );
    await queryRunner.query(
      `ALTER TABLE "user_payment" ALTER COLUMN "paymentProvider" TYPE "public"."user_payment_paymentprovider_enum" USING "paymentProvider"::"text"::"public"."user_payment_paymentprovider_enum"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."user_payment_paymentprovider_enum_old"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."withdrawal_requests_payoutmethod_enum" RENAME TO "withdrawal_requests_payoutmethod_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."withdrawal_requests_payoutmethod_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM', 'CHASE')`
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal_requests" ALTER COLUMN "payoutMethod" TYPE "public"."withdrawal_requests_payoutmethod_enum" USING "payoutMethod"::"text"::"public"."withdrawal_requests_payoutmethod_enum"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."withdrawal_requests_payoutmethod_enum_old"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."transactions_provider_enum" RENAME TO "transactions_provider_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_provider_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM', 'CHASE')`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ALTER COLUMN "provider" TYPE "public"."transactions_provider_enum" USING "provider"::"text"::"public"."transactions_provider_enum"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."transactions_provider_enum_old"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."account_v2_type_enum" RENAME TO "account_v2_type_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_v2_type_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM', 'CHASE')`
    );
    await queryRunner.query(
      `ALTER TABLE "account_v2" ALTER COLUMN "type" TYPE "public"."account_v2_type_enum" USING "type"::"text"::"public"."account_v2_type_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."account_v2_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_920b28126319ce546395abcecf4" FOREIGN KEY ("chaseTransactionId") REFERENCES "chase_transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_920b28126319ce546395abcecf4"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_v2_type_enum_old" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`
    );
    await queryRunner.query(
      `ALTER TABLE "account_v2" ALTER COLUMN "type" TYPE "public"."account_v2_type_enum_old" USING "type"::"text"::"public"."account_v2_type_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."account_v2_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."account_v2_type_enum_old" RENAME TO "account_v2_type_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_provider_enum_old" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ALTER COLUMN "provider" TYPE "public"."transactions_provider_enum_old" USING "provider"::"text"::"public"."transactions_provider_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."transactions_provider_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."transactions_provider_enum_old" RENAME TO "transactions_provider_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."withdrawal_requests_payoutmethod_enum_old" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal_requests" ALTER COLUMN "payoutMethod" TYPE "public"."withdrawal_requests_payoutmethod_enum_old" USING "payoutMethod"::"text"::"public"."withdrawal_requests_payoutmethod_enum_old"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."withdrawal_requests_payoutmethod_enum"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."withdrawal_requests_payoutmethod_enum_old" RENAME TO "withdrawal_requests_payoutmethod_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_payment_paymentprovider_enum_old" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`
    );
    await queryRunner.query(
      `ALTER TABLE "user_payment" ALTER COLUMN "paymentProvider" TYPE "public"."user_payment_paymentprovider_enum_old" USING "paymentProvider"::"text"::"public"."user_payment_paymentprovider_enum_old"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."user_payment_paymentprovider_enum"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_payment_paymentprovider_enum_old" RENAME TO "user_payment_paymentprovider_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_type_enum_old" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "type" TYPE "public"."account_type_enum_old" USING "type"::"text"::"public"."account_type_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."account_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."account_type_enum_old" RENAME TO "account_type_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_provider_enum_old" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ALTER COLUMN "provider" TYPE "public"."payment_provider_enum_old" USING "provider"::"text"::"public"."payment_provider_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."payment_provider_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."payment_provider_enum_old" RENAME TO "payment_provider_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "UQ_920b28126319ce546395abcecf4"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP COLUMN "chaseTransactionId"`
    );
    await queryRunner.query(`DROP TABLE "chase_transactions"`);
  }
}
