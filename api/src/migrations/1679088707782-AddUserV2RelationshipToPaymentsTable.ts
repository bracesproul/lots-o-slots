import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserV2RelationshipToPaymentsTable1679088707782 implements MigrationInterface {
    name = 'AddUserV2RelationshipToPaymentsTable1679088707782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_payment" ADD "userV2Id" uuid`);
        await queryRunner.query(`ALTER TABLE "user_payment" ADD CONSTRAINT "FK_c88d034c976201bcde94dc49079" FOREIGN KEY ("userV2Id") REFERENCES "user_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_payment" DROP CONSTRAINT "FK_c88d034c976201bcde94dc49079"`);
        await queryRunner.query(`ALTER TABLE "user_payment" DROP COLUMN "userV2Id"`);
    }

}
