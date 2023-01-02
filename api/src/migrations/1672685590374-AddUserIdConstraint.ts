import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdConstraint1672685590374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_payment" ADD CONSTRAINT FK_user_payment_userid FOREIGN KEY ("userId") REFERENCES "user"("id");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // no-op
  }
}
