import "reflect-metadata";
import "@config";
import { Bank } from "@infrastructure/datasources/databases/typeorm/models/bank";
import path from "path";
import { DataSource } from "typeorm";
import { User } from "@infrastructure/datasources/databases/typeorm/models/user";
import { Account } from "@infrastructure/datasources/databases/typeorm/models/account";
import { Transaction } from "@infrastructure/datasources/databases/typeorm/models/transactions";

const migrationsPath = path.resolve(__dirname, "../../../../../migrations/");

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_PATH,
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV !== "development",
  entities: [User, Bank, Account, Transaction],
  migrations: [migrationsPath + "/*{.ts,.js}"],
  migrationsTableName: "migrations",
});
