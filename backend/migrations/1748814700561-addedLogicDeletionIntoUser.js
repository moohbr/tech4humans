/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddedLogicDeletionIntoUser1748814700561 {
    name = 'AddedLogicDeletionIntoUser1748814700561'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "sourceAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c2edf5312a2dff9e7607e4b4a0c" FOREIGN KEY ("sourceAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "balance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "bankName" text, "deleted" boolean NOT NULL DEFAULT (0), CONSTRAINT "FK_25e502306131bd57b64d1250455" FOREIGN KEY ("bankName") REFERENCES "banks" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_accounts"("id", "name", "type", "balance", "createdAt", "userId", "bankName", "deleted") SELECT "id", "name", "type", "balance", "createdAt", "userId", "bankName", "deleted" FROM "accounts"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`ALTER TABLE "temporary_accounts" RENAME TO "accounts"`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "sourceAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c2edf5312a2dff9e7607e4b4a0c" FOREIGN KEY ("sourceAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "balance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "bankName" text, "deleted" boolean NOT NULL DEFAULT (0), CONSTRAINT "FK_25e502306131bd57b64d1250455" FOREIGN KEY ("bankName") REFERENCES "banks" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_accounts"("id", "name", "type", "balance", "createdAt", "userId", "bankName", "deleted") SELECT "id", "name", "type", "balance", "createdAt", "userId", "bankName", "deleted" FROM "accounts"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`ALTER TABLE "temporary_accounts" RENAME TO "accounts"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "accounts" RENAME TO "temporary_accounts"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "balance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "bankName" text, "deleted" boolean NOT NULL DEFAULT (0), CONSTRAINT "FK_25e502306131bd57b64d1250455" FOREIGN KEY ("bankName") REFERENCES "banks" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "accounts"("id", "name", "type", "balance", "createdAt", "userId", "bankName", "deleted") SELECT "id", "name", "type", "balance", "createdAt", "userId", "bankName", "deleted" FROM "temporary_accounts"`);
        await queryRunner.query(`DROP TABLE "temporary_accounts"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "sourceAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c2edf5312a2dff9e7607e4b4a0c" FOREIGN KEY ("sourceAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME TO "temporary_accounts"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "balance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "bankName" text, "deleted" boolean NOT NULL DEFAULT (0), CONSTRAINT "FK_25e502306131bd57b64d1250455" FOREIGN KEY ("bankName") REFERENCES "banks" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "accounts"("id", "name", "type", "balance", "createdAt", "userId", "bankName", "deleted") SELECT "id", "name", "type", "balance", "createdAt", "userId", "bankName", "deleted" FROM "temporary_accounts"`);
        await queryRunner.query(`DROP TABLE "temporary_accounts"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "sourceAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c2edf5312a2dff9e7607e4b4a0c" FOREIGN KEY ("sourceAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "sourceAccountId", "destinationAccountId" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
    }
}
