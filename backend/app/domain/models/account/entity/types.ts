import { AccountType } from "@infrastructure/datasources/databases/typeorm/models/enums";

export type AccountRawEntity = {
    id: number | null;
    name: string;
    type: AccountType;
    balance: number;
    createdAt: Date;
    userId: number;
    bankName: string;
}