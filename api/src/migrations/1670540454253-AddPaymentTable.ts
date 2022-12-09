import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentTable1670540454253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE payment (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "deletedAt" TIMESTAMP WITH TIME ZONE,
        "userIdentifier" character varying NOT NULL,
        "amount" numeric NOT NULL,
        "processed" boolean NOT NULL DEFAULT false,
        "emailId" character varying NOT NULL,
        "provider" character varying NOT NULL,
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE payment
    `);
  }
}
