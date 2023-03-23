import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeEmailIdFieldToBeNumber1679357966968 implements MigrationInterface {
    name = 'ChangeEmailIdFieldToBeNumber1679357966968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_log_v2" DROP COLUMN "emailId"`);
        await queryRunner.query(`ALTER TABLE "email_log_v2" ADD "emailId" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_log_v2" DROP COLUMN "emailId"`);
        await queryRunner.query(`ALTER TABLE "email_log_v2" ADD "emailId" character varying NOT NULL`);
    }

}
