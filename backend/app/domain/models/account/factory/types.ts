import { AccountType } from "@infrastructure/datasources/databases/typeorm/models/enums";

export type AccountFactoryParams = {
  id: number;
  name: string;
  type: AccountType;
  balance: number;
  createdAt: Date;
  userId: number;
  bankName: string;
}   