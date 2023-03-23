import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIdFieldsToCashAppAndPayPal1679357088239 implements MigrationInterface {
    name = 'AddIdFieldsToCashAppAndPayPal1679357088239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pay_pal_transactions" ADD "payPalId" character varying`);
        await queryRunner.query(`ALTER TABLE "cash_app_transactions" ADD "cashAppId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cash_app_transactions" DROP COLUMN "cashAppId"`);
        await queryRunner.query(`ALTER TABLE "pay_pal_transactions" DROP COLUMN "payPalId"`);
    }

}
