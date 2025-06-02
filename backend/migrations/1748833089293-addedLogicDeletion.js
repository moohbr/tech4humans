/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddedLogicDeletion1748833089293 {
    name = 'AddedLogicDeletion1748833089293'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password_hash" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deleted" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "sourceAccountId" integer, "destinationAccountId" integer)`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "balance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deleted" boolean NOT NULL DEFAULT (0), "userId" integer, "bankName" text)`);
        await queryRunner.query(`CREATE TABLE "banks" ("name" text PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "sourceAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_c2edf5312a2dff9e7607e4b4a0c" FOREIGN KEY ("sourceAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "balance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deleted" boolean NOT NULL DEFAULT (0), "userId" integer, "bankName" text, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_25e502306131bd57b64d1250455" FOREIGN KEY ("bankName") REFERENCES "banks" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_accounts"("id", "name", "type", "balance", "createdAt", "deleted", "userId", "bankName") SELECT "id", "name", "type", "balance", "createdAt", "deleted", "userId", "bankName" FROM "accounts"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`ALTER TABLE "temporary_accounts" RENAME TO "accounts"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "accounts" RENAME TO "temporary_accounts"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "balance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "deleted" boolean NOT NULL DEFAULT (0), "userId" integer, "bankName" text)`);
        await queryRunner.query(`INSERT INTO "accounts"("id", "name", "type", "balance", "createdAt", "deleted", "userId", "bankName") SELECT "id", "name", "type", "balance", "createdAt", "deleted", "userId", "bankName" FROM "temporary_accounts"`);
        await queryRunner.query(`DROP TABLE "temporary_accounts"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "sourceAccountId" integer, "destinationAccountId" integer)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "banks"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
