import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPaymentTable1672685059343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TYPE "public"."payment_provider_enum" ADD VALUE 'BITCOIN';
        ALTER TYPE "public"."payment_provider_enum" ADD VALUE 'ETHEREUM';
    `);

    await queryRunner.query(
      `
        CREATE TABLE "user_payment" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "deletedAt" TIMESTAMP WITH TIME ZONE,
            "paymentIdentifier" character varying NOT NULL,
            "paymentProvider" "public"."payment_provider_enum" NOT NULL,
            "amount" numeric NOT NULL,
            "userId" UUID NULL
        )
        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
