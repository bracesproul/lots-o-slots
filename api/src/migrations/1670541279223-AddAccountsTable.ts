import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccountsTable1670541279223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE "public"."payment_provider_enum" AS ENUM ('PAYPAL', 'CASHAPP', 'ZELLE');
    `);

    await queryRunner.query(`
      CREATE TABLE account (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "deletedAt" TIMESTAMP WITH TIME ZONE,
        "email" character varying NOT NULL,
        "type" payment_provider_enum NOT NULL,
        "balance" numeric NOT NULL,
        "dailyWithdrawals" numeric NOT NULL,
        "weeklyWithdrawals" numeric NOT NULL,
        "canWithdrawal" boolean NOT NULL DEFAULT false,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7435" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
