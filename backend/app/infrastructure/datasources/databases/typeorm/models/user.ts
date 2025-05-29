import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "@infrastructure/datasources/databases/typeorm/models/account";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text", name: "password_hash" })
  passwordHash!: string;

  @OneToMany(() => Account, (account) => account.user, { onDelete: "CASCADE" })
  accounts!: Account[];

  @CreateDateColumn()
  createdAt!: Date;
}
