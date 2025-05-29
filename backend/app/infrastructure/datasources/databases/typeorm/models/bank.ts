import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Account } from "@infrastructure/datasources/databases/typeorm/models/account";

@Entity({ name: "banks" })
export class Bank {
  @PrimaryColumn({ type: "text", unique: true })
  name!: string;

  @OneToMany(() => Account, (account) => account.bank, { onDelete: "CASCADE" })
  accounts!: Account[];
}
