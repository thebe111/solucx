import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1628908265463 implements MigrationInterface {
    name = 'InitialMigration1628908265463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "telephone" character varying NOT NULL, "CPF" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "experience_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transaction_date" TIMESTAMP NOT NULL, "value" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "id_customer" uuid, "id_contributor" uuid, "id_shop" uuid, CONSTRAINT "PK_9609c7d5a473c5bbccf48e73c06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contributors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c94ff4e6bca235dc30625c92c90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" integer NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, "id_experience_transaction" uuid, CONSTRAINT "REL_bfd80090fa7fb41ed94bc1afa6" UNIQUE ("id_experience_transaction"), CONSTRAINT "PK_2c804ed4019b80ce48eedba5cec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "experience_transactions" ADD CONSTRAINT "FK_7d94c67ecd57a75d833a7507ca9" FOREIGN KEY ("id_customer") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience_transactions" ADD CONSTRAINT "FK_8c8d919952a6f9cb9242a3be074" FOREIGN KEY ("id_contributor") REFERENCES "contributors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience_transactions" ADD CONSTRAINT "FK_8f6c96a8e5f8a787611bac484fd" FOREIGN KEY ("id_shop") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rates" ADD CONSTRAINT "FK_bfd80090fa7fb41ed94bc1afa67" FOREIGN KEY ("id_experience_transaction") REFERENCES "experience_transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rates" DROP CONSTRAINT "FK_bfd80090fa7fb41ed94bc1afa67"`);
        await queryRunner.query(`ALTER TABLE "experience_transactions" DROP CONSTRAINT "FK_8f6c96a8e5f8a787611bac484fd"`);
        await queryRunner.query(`ALTER TABLE "experience_transactions" DROP CONSTRAINT "FK_8c8d919952a6f9cb9242a3be074"`);
        await queryRunner.query(`ALTER TABLE "experience_transactions" DROP CONSTRAINT "FK_7d94c67ecd57a75d833a7507ca9"`);
        await queryRunner.query(`DROP TABLE "rates"`);
        await queryRunner.query(`DROP TABLE "contributors"`);
        await queryRunner.query(`DROP TABLE "experience_transactions"`);
        await queryRunner.query(`DROP TABLE "shops"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
