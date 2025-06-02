import { MigrationInterface, QueryRunner } from "typeorm";

export class Banks1748833153999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO banks (name) VALUES ('Banco do Brasil')`);
        await queryRunner.query(`INSERT INTO banks (name) VALUES ('Nubank')`);
        await queryRunner.query(`INSERT INTO banks (name) VALUES ('Bradesco')`);
        await queryRunner.query(`INSERT INTO banks (name) VALUES ('Santander')`);
        await queryRunner.query(`INSERT INTO banks (name) VALUES ('Itaú')`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
