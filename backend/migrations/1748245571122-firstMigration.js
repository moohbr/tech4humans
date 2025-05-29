/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class FirstMigration1748245571122 {
    name = 'FirstMigration1748245571122'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "temporary_bank" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_bank"("id", "name") SELECT "id", "name" FROM "bank"`);
        await queryRunner.query(`DROP TABLE "bank"`);
        await queryRunner.query(`ALTER TABLE "temporary_bank" RENAME TO "bank"`);
        await queryRunner.query(`CREATE TABLE "temporary_bank" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_bank"("id", "name") SELECT "id", "name" FROM "bank"`);
        await queryRunner.query(`DROP TABLE "bank"`);
        await queryRunner.query(`ALTER TABLE "temporary_bank" RENAME TO "bank"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" text, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "originAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_6e328d7823e68db7cb5ac7abc67" FOREIGN KEY ("destinationAccountId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_bbf515dcb582b9c1dfa70462846" FOREIGN KEY ("originAccountId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "type", "amount", "description", "transactionDate", "createdAt", "originAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "createdAt", "originAccountId", "destinationAccountId" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
        await queryRunner.query(`CREATE TABLE "temporary_account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "initialBalance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "bankId" integer, CONSTRAINT "FK_76583b119c2424eff065c937cf9" FOREIGN KEY ("bankId") REFERENCES "bank" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_account"("id", "name", "type", "initialBalance", "createdAt", "userId", "bankId") SELECT "id", "name", "type", "initialBalance", "createdAt", "userId", "bankId" FROM "account"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`ALTER TABLE "temporary_account" RENAME TO "account"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "email", "createdAt") SELECT "id", "name", "email", "createdAt" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "email", "createdAt") SELECT "id", "name", "email", "createdAt" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "account" RENAME TO "temporary_account"`);
        await queryRunner.query(`CREATE TABLE "account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar CHECK( "type" IN ('Corrente','Poupança','Crédito','Investimento') ) NOT NULL DEFAULT ('Corrente'), "initialBalance" decimal(12,2) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "bankId" integer, CONSTRAINT "FK_76583b119c2424eff065c937cf9" FOREIGN KEY ("bankId") REFERENCES "bank" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "account"("id", "name", "type", "initialBalance", "createdAt", "userId", "bankId") SELECT "id", "name", "type", "initialBalance", "createdAt", "userId", "bankId" FROM "temporary_account"`);
        await queryRunner.query(`DROP TABLE "temporary_account"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('Débito','Crédito','Transferência') ) NOT NULL DEFAULT ('Débito'), "amount" decimal(12,2) NOT NULL, "description" varchar, "transactionDate" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "originAccountId" integer, "destinationAccountId" integer, CONSTRAINT "FK_6e328d7823e68db7cb5ac7abc67" FOREIGN KEY ("destinationAccountId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_bbf515dcb582b9c1dfa70462846" FOREIGN KEY ("originAccountId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "type", "amount", "description", "transactionDate", "createdAt", "originAccountId", "destinationAccountId") SELECT "id", "type", "amount", "description", "transactionDate", "createdAt", "originAccountId", "destinationAccountId" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`ALTER TABLE "bank" RENAME TO "temporary_bank"`);
        await queryRunner.query(`CREATE TABLE "bank" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "bank"("id", "name") SELECT "id", "name" FROM "temporary_bank"`);
        await queryRunner.query(`DROP TABLE "temporary_bank"`);
        await queryRunner.query(`ALTER TABLE "bank" RENAME TO "temporary_bank"`);
        await queryRunner.query(`CREATE TABLE "bank" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "bank"("id", "name") SELECT "id", "name" FROM "temporary_bank"`);
        await queryRunner.query(`DROP TABLE "temporary_bank"`);
    }
}
