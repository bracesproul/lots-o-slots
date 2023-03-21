import { MigrationInterface, QueryRunner } from 'typeorm';

export class V2TransactionEntities1679353172135 implements MigrationInterface {
  name = 'V2TransactionEntities1679353172135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "email_log_v2" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "emailId" character varying NOT NULL, "subject" character varying NOT NULL, "body" character varying NOT NULL, "snippet" character varying, "receivedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_a5b5f3df92039f5913a457631a6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_status_enum" AS ENUM('PENDING', 'COMPLETED', 'FAILED')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_provider_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_paymenttype_enum" AS ENUM('DEPOSIT', 'WITHDRAWAL')`
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userId" uuid, "amount" numeric NOT NULL, "status" "public"."transactions_status_enum" NOT NULL DEFAULT 'PENDING', "emailLogId" uuid NOT NULL, "provider" "public"."transactions_provider_enum" NOT NULL, "senderName" character varying NOT NULL, "paymentType" "public"."transactions_paymenttype_enum" NOT NULL, "bitcoinTransactionId" uuid, "ethereumTransactionId" uuid, "payPalTransactionId" uuid, "cashAppTransactionId" uuid, "bankOfAmericaTransactionId" uuid, "accountId" uuid, CONSTRAINT "REL_f2df0e345122a5da8b96f602ea" UNIQUE ("emailLogId"), CONSTRAINT "REL_19eae2205935204497fc652877" UNIQUE ("bitcoinTransactionId"), CONSTRAINT "REL_dd9848cf68aef74a46fb07fda0" UNIQUE ("ethereumTransactionId"), CONSTRAINT "REL_6829dfae0b1b38ec34571992a4" UNIQUE ("payPalTransactionId"), CONSTRAINT "REL_c23d9c0aff84ef9a072f356007" UNIQUE ("cashAppTransactionId"), CONSTRAINT "REL_dd3ddf89476676b3eaaa19ae69" UNIQUE ("bankOfAmericaTransactionId"), CONSTRAINT "REL_26d8aec71ae9efbe468043cd2b" UNIQUE ("accountId"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bank_of_america_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "amount" numeric NOT NULL, "senderIdentifier" character varying NOT NULL, "transactionId" uuid NOT NULL, CONSTRAINT "PK_679bd98ebce5e60cb48a5428660" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bitcoin_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "transactionId" uuid NOT NULL, "amount" numeric NOT NULL, "walletAddress" character varying NOT NULL, CONSTRAINT "PK_7c08599a3d5ed67350f8d1ccc5c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "ethereum_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "transactionId" uuid NOT NULL, "amount" numeric NOT NULL, "walletAddress" character varying NOT NULL, CONSTRAINT "PK_441d0dcbeba63a85d50664fb371" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "pay_pal_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "transactionId" uuid NOT NULL, "amount" numeric NOT NULL, "senderIdentifier" character varying NOT NULL, CONSTRAINT "PK_c8ef7e51b9ac0ac0c548f616af9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cash_app_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "transactionId" uuid NOT NULL, "amount" numeric NOT NULL, "cashtag" character varying NOT NULL, CONSTRAINT "PK_58c563977f9c82468414027d4ac" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_v2_type_enum" AS ENUM('PAYPAL', 'CASHAPP', 'ZELLE', 'BITCOIN', 'ETHEREUM')`
    );
    await queryRunner.query(
      `CREATE TABLE "account_v2" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "accountIdentifier" character varying NOT NULL, "balance" numeric NOT NULL, "type" "public"."account_v2_type_enum" NOT NULL, "defaultAccount" boolean NOT NULL DEFAULT false, "name" character varying, CONSTRAINT "PK_c25dbc3b35ec2b442a12dd4ebed" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "user_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_f2df0e345122a5da8b96f602eaf" FOREIGN KEY ("emailLogId") REFERENCES "email_log_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_19eae2205935204497fc6528778" FOREIGN KEY ("bitcoinTransactionId") REFERENCES "bitcoin_transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_dd9848cf68aef74a46fb07fda09" FOREIGN KEY ("ethereumTransactionId") REFERENCES "ethereum_transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_6829dfae0b1b38ec34571992a44" FOREIGN KEY ("payPalTransactionId") REFERENCES "pay_pal_transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_c23d9c0aff84ef9a072f3560074" FOREIGN KEY ("cashAppTransactionId") REFERENCES "cash_app_transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_dd3ddf89476676b3eaaa19ae69f" FOREIGN KEY ("bankOfAmericaTransactionId") REFERENCES "bank_of_america_transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9" FOREIGN KEY ("accountId") REFERENCES "account_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_dd3ddf89476676b3eaaa19ae69f"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_c23d9c0aff84ef9a072f3560074"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_6829dfae0b1b38ec34571992a44"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_dd9848cf68aef74a46fb07fda09"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_19eae2205935204497fc6528778"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_f2df0e345122a5da8b96f602eaf"`
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`
    );
    await queryRunner.query(`DROP TABLE "account_v2"`);
    await queryRunner.query(`DROP TYPE "public"."account_v2_type_enum"`);
    await queryRunner.query(`DROP TABLE "cash_app_transactions"`);
    await queryRunner.query(`DROP TABLE "pay_pal_transactions"`);
    await queryRunner.query(`DROP TABLE "ethereum_transactions"`);
    await queryRunner.query(`DROP TABLE "bitcoin_transactions"`);
    await queryRunner.query(`DROP TABLE "bank_of_america_transactions"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(
      `DROP TYPE "public"."transactions_paymenttype_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."transactions_provider_enum"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
    await queryRunner.query(`DROP TABLE "email_log_v2"`);
  }
}
