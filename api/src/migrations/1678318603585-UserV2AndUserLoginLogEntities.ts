import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserV2AndUserLoginLogEntities1678318603585
  implements MigrationInterface
{
  name = 'UserV2AndUserLoginLogEntities1678318603585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "fk_payment_userid"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment" DROP CONSTRAINT "fk_user_payment_userid"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."user_v2_role_enum" AS ENUM('ADMIN', 'USER')
        `);
    await queryRunner.query(`
            CREATE TABLE "user_v2" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "username" character varying NOT NULL,
                "role" "public"."user_v2_role_enum" NOT NULL DEFAULT 'USER',
                CONSTRAINT "PK_102f37816225c577e3c06c51bb7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_v2_login_log" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "login" TIMESTAMP WITH TIME ZONE NOT NULL,
                "userId" uuid NOT NULL,
                CONSTRAINT "PK_eb33a4ac2d4fd81dc795ccb0b1d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "createdAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updatedAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "deletedAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "deletedAt" TIMESTAMP WITH TIME ZONE
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"
            ALTER COLUMN "processed" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."payment_type_enum"
            RENAME TO "payment_type_enum_old"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."payment_paymenttype_enum" AS ENUM('DEPOSIT', 'WITHDRAWAL', 'PAYOUT')
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"
            ALTER COLUMN "paymentType" TYPE "public"."payment_paymenttype_enum" USING "paymentType"::"text"::"public"."payment_paymenttype_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "canWithdrawal" DROP DEFAULT
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."account_type_enum" AS ENUM(
                'PAYPAL',
                'CASHAPP',
                'ZELLE',
                'BITCOIN',
                'ETHEREUM'
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "type" TYPE "public"."account_type_enum" USING "type"::"text"::"public"."account_type_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "canAcceptDeposits" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "email_log"
            ADD CONSTRAINT "PK_edfd3f7225051fc07bdd63a22dc" PRIMARY KEY ("id")
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment"
            ADD CONSTRAINT "PK_57db108902981ff1f5fcc2f2336" PRIMARY KEY ("id")
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."payment_provider_enum"
            RENAME TO "payment_provider_enum_old"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."user_payment_paymentprovider_enum" AS ENUM(
                'PAYPAL',
                'CASHAPP',
                'ZELLE',
                'BITCOIN',
                'ETHEREUM'
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment"
            ALTER COLUMN "paymentProvider" TYPE "public"."user_payment_paymentprovider_enum" USING "paymentProvider"::"text"::"public"."user_payment_paymentprovider_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment" DROP COLUMN "processed"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment"
            ADD "processed" boolean NOT NULL DEFAULT false
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."game_type_enum"
            RENAME TO "game_type_enum_old"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."user_payment_gametype_enum" AS ENUM('SLOTS', 'POKER')
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment"
            ALTER COLUMN "gameType" TYPE "public"."user_payment_gametype_enum" USING "gameType"::"text"::"public"."user_payment_gametype_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "project_id"
            SET DEFAULT 'lots-o-slots'
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "auth_uri"
            SET DEFAULT 'https://accounts.google.com/o/oauth2/auth'
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "token_uri"
            SET DEFAULT 'https://oauth2.googleapis.com/token'
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "auth_provider_x509_cert_url"
            SET DEFAULT 'https://www.googleapis.com/oauth2/v1/certs'
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "redirect_uris"
            SET DEFAULT 'http://localhost'
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "type"
            SET DEFAULT 'service_account'
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "project_id"
            SET DEFAULT 'lots-o-slots'
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "auth_uri"
            SET DEFAULT 'https://accounts.google.com/o/oauth2/auth'
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "token_uri"
            SET DEFAULT 'https://oauth2.googleapis.com/token'
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "auth_provider_x509_cert_url"
            SET DEFAULT 'https://www.googleapis.com/oauth2/v1/certs'
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment"
            ADD CONSTRAINT "FK_9a70c56afa711c69a105c73de1a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_v2_login_log"
            ADD CONSTRAINT "FK_4893a6dec4940dad4b478d5d99a" FOREIGN KEY ("userId") REFERENCES "user_v2"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_v2_login_log" DROP CONSTRAINT "FK_4893a6dec4940dad4b478d5d99a"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment" DROP CONSTRAINT "FK_9a70c56afa711c69a105c73de1a"
        `);
    await queryRunner.query(`
            ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "auth_provider_x509_cert_url" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "token_uri" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "auth_uri" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "project_id" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_service_accounts"
            ALTER COLUMN "type" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "redirect_uris" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "auth_provider_x509_cert_url" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "token_uri" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "auth_uri" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "gcp_credentials"
            ALTER COLUMN "project_id" DROP DEFAULT
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."game_type_enum_old" AS ENUM('POKER', 'SLOTS')
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment"
            ALTER COLUMN "gameType" TYPE "public"."game_type_enum_old" USING "gameType"::"text"::"public"."game_type_enum_old"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_payment_gametype_enum"
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."game_type_enum_old"
            RENAME TO "game_type_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment" DROP COLUMN "processed"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment"
            ADD "processed" boolean NOT NULL DEFAULT false
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."payment_provider_enum_old" AS ENUM(
                'PAYPAL',
                'CASHAPP',
                'ZELLE',
                'BITCOIN',
                'ETHEREUM'
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment"
            ALTER COLUMN "paymentProvider" TYPE "public"."payment_provider_enum_old" USING "paymentProvider"::"text"::"public"."payment_provider_enum_old"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_payment_paymentprovider_enum"
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."payment_provider_enum_old"
            RENAME TO "payment_provider_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment" DROP CONSTRAINT "PK_57db108902981ff1f5fcc2f2336"
        `);
    await queryRunner.query(`
            ALTER TABLE "email_log" DROP CONSTRAINT "PK_edfd3f7225051fc07bdd63a22dc"
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "canAcceptDeposits"
            SET DEFAULT false
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."payment_provider_enum_old" AS ENUM(
                'PAYPAL',
                'CASHAPP',
                'ZELLE',
                'BITCOIN',
                'ETHEREUM'
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "type" TYPE "public"."payment_provider_enum_old" USING "type"::"text"::"public"."payment_provider_enum_old"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."account_type_enum"
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."payment_provider_enum_old"
            RENAME TO "payment_provider_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "canWithdrawal"
            SET DEFAULT false
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."payment_type_enum_old" AS ENUM('DEPOSIT', 'WITHDRAWAL', 'PAYOUT')
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"
            ALTER COLUMN "paymentType" TYPE "public"."payment_type_enum_old" USING "paymentType"::"text"::"public"."payment_type_enum_old"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."payment_paymenttype_enum"
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."payment_type_enum_old"
            RENAME TO "payment_type_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"
            ALTER COLUMN "processed"
            SET DEFAULT false
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "deletedAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "deletedAt" TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updatedAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updatedAt" TIMESTAMP DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "createdAt"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            DROP TABLE "user_v2_login_log"
        `);
    await queryRunner.query(`
            DROP TABLE "user_v2"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_v2_role_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_payment"
            ADD CONSTRAINT "fk_user_payment_userid" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "payment"
            ADD CONSTRAINT "fk_payment_userid" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
