import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransactionType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { Account } from "@infrastructure/datasources/databases/typeorm/models/account";

@Entity({ name: "transactions" })
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "text",
    enum: TransactionType,
    default: TransactionType.DEBITO,
  })
  type!: TransactionType;

  @ManyToOne(() => Account, { nullable: true })
  sourceAccount!: Account;

  @ManyToOne(() => Account, { nullable: true })
  destinationAccount!: Account;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  transactionDate!: Date;
}
