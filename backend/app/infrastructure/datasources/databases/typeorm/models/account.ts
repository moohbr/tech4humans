import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { AccountType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { User } from "@infrastructure/datasources/databases/typeorm/models/user";
import { Bank } from "@infrastructure/datasources/databases/typeorm/models/bank";
import { Transaction } from "@infrastructure/datasources/databases/typeorm/models/transactions";

@Entity({ name: "accounts" })
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", enum: AccountType, default: AccountType.CORRENTE })
  type!: AccountType;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  balance!: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user!: User;

  @ManyToOne(() => Bank, (bank) => bank.accounts)
  bank!: Bank;

  @OneToMany(() => Transaction, (t) => t.sourceAccount)
  transactions!: Transaction[];

  @CreateDateColumn()
  createdAt!: Date;
}
