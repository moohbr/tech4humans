/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class ImprovePKs1748407213951 {
    name = 'ImprovePKs1748407213951'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "originAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type", "amount", "description", "transactionDate", "createdAt", "originAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "createdAt", "originAccountId", "destinationAccountId" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "initialBalance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "bankId" integer, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_accounts"("id", "name", "type", "initialBalance", "createdAt", "userId", "bankId") SELECT "id", "name", "type", "initialBalance", "createdAt", "userId", "bankId" FROM "accounts"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`ALTER TABLE "temporary_accounts" RENAME TO "accounts"`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "destinationAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type", "amount", "description", "transactionDate", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "destinationAccountId" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_accounts"("id", "type", "createdAt", "userId") SELECT "id", "type", "createdAt", "userId" FROM "accounts"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`ALTER TABLE "temporary_accounts" RENAME TO "accounts"`);
        await queryRunner.query(`CREATE TABLE "temporary_banks" ("name" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_banks"("name") SELECT "name" FROM "banks"`);
        await queryRunner.query(`DROP TABLE "banks"`);
        await queryRunner.query(`ALTER TABLE "temporary_banks" RENAME TO "banks"`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "destinationAccountId" integer, "sourceAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type", "amount", "description", "transactionDate", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "destinationAccountId" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "balance" decimal(12,2) NOT NULL DEFAULT (0), "bankName" text, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_accounts"("id", "type", "createdAt", "userId") SELECT "id", "type", "createdAt", "userId" FROM "accounts"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`ALTER TABLE "temporary_accounts" RENAME TO "accounts"`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "destinationAccountId" integer, "sourceAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type", "amount", "description", "transactionDate", "destinationAccountId", "sourceAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "destinationAccountId", "sourceAccountId" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "balance" decimal(12,2) NOT NULL DEFAULT (0), "bankName" text, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_accounts"("id", "type", "createdAt", "userId", "balance", "bankName") SELECT "id", "type", "createdAt", "userId", "balance", "bankName" FROM "accounts"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`ALTER TABLE "temporary_accounts" RENAME TO "accounts"`);
        await queryRunner.query(`CREATE TABLE "temporary_banks" ("name" text PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_banks"("name") SELECT "name" FROM "banks"`);
        await queryRunner.query(`DROP TABLE "banks"`);
        await queryRunner.query(`ALTER TABLE "temporary_banks" RENAME TO "banks"`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "destinationAccountId" integer, "sourceAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c2edf5312a2dff9e7607e4b4a0c" FOREIGN KEY ("sourceAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type", "amount", "description", "transactionDate", "destinationAccountId", "sourceAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "destinationAccountId", "sourceAccountId" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "balance" decimal(12,2) NOT NULL DEFAULT (0), "bankName" text, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_25e502306131bd57b64d1250455" FOREIGN KEY ("bankName") REFERENCES "banks" ("name") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_accounts"("id", "type", "createdAt", "userId", "balance", "bankName") SELECT "id", "type", "createdAt", "userId", "balance", "bankName" FROM "accounts"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`ALTER TABLE "temporary_accounts" RENAME TO "accounts"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "accounts" RENAME TO "temporary_accounts"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "balance" decimal(12,2) NOT NULL DEFAULT (0), "bankName" text, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "accounts"("id", "type", "createdAt", "userId", "balance", "bankName") SELECT "id", "type", "createdAt", "userId", "balance", "bankName" FROM "temporary_accounts"`);
        await queryRunner.query(`DROP TABLE "temporary_accounts"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "destinationAccountId" integer, "sourceAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type", "amount", "description", "transactionDate", "destinationAccountId", "sourceAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "destinationAccountId", "sourceAccountId" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`ALTER TABLE "banks" RENAME TO "temporary_banks"`);
        await queryRunner.query(`CREATE TABLE "banks" ("name" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "banks"("name") SELECT "name" FROM "temporary_banks"`);
        await queryRunner.query(`DROP TABLE "temporary_banks"`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME TO "temporary_accounts"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "balance" decimal(12,2) NOT NULL DEFAULT (0), "bankName" text, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "accounts"("id", "type", "createdAt", "userId", "balance", "bankName") SELECT "id", "type", "createdAt", "userId", "balance", "bankName" FROM "temporary_accounts"`);
        await queryRunner.query(`DROP TABLE "temporary_accounts"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "destinationAccountId" integer, "sourceAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type", "amount", "description", "transactionDate", "destinationAccountId", "sourceAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "destinationAccountId", "sourceAccountId" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME TO "temporary_accounts"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "accounts"("id", "type", "createdAt", "userId") SELECT "id", "type", "createdAt", "userId" FROM "temporary_accounts"`);
        await queryRunner.query(`DROP TABLE "temporary_accounts"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "destinationAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type", "amount", "description", "transactionDate", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "destinationAccountId" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`ALTER TABLE "banks" RENAME TO "temporary_banks"`);
        await queryRunner.query(`CREATE TABLE "banks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "banks"("name") SELECT "name" FROM "temporary_banks"`);
        await queryRunner.query(`DROP TABLE "temporary_banks"`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME TO "temporary_accounts"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "initialBalance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "bankId" integer, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "accounts"("id", "type", "createdAt", "userId") SELECT "id", "type", "createdAt", "userId" FROM "temporary_accounts"`);
        await queryRunner.query(`DROP TABLE "temporary_accounts"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "originAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type", "amount", "description", "transactionDate", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "destinationAccountId" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME TO "temporary_accounts"`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "initialBalance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "bankId" integer, CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_284431ab046a654132d200a6b49" FOREIGN KEY ("bankId") REFERENCES "banks" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "accounts"("id", "name", "type", "initialBalance", "createdAt", "userId", "bankId") SELECT "id", "name", "type", "initialBalance", "createdAt", "userId", "bankId" FROM "temporary_accounts"`);
        await queryRunner.query(`DROP TABLE "temporary_accounts"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "originAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_e201d424e91624d3f4b9f0efed2" FOREIGN KEY ("originAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e704cd38335d6b334f2fce8caf9" FOREIGN KEY ("destinationAccountId") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type", "amount", "description", "transactionDate", "createdAt", "originAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "createdAt", "originAccountId", "destinationAccountId" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
    }
}
