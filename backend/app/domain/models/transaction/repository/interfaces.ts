import { UserId } from "@models/user/value-objects/id";
import { TransactionEntity } from "@models/transaction/entity";
import { TransactionId } from "@models/transaction/value-objects/id";
import { AccountId } from "@models/account/value-objects/id";
import { EntityManager } from "typeorm";
import { Limit } from "@models/base/value-objects/limit";
import { OrderBy } from "@models/base/value-objects/orderBy";
import { Page } from "@models/base/value-objects/page";

export type QueryTransactionParams = {
    page: Page,
    limit: Limit,
    orderBy: OrderBy,
    orderByField: 'date' | 'amount',
    date?: Date
}

export interface TransactionRepositoryInterface {
    create(transaction: TransactionEntity, manager?: EntityManager): Promise<TransactionEntity>;
    findById(id: TransactionId): Promise<TransactionEntity | null>;
    findAll(): Promise<TransactionEntity[]>;
    findByUserId(userId: UserId, params?: QueryTransactionParams): Promise<TransactionEntity[]>;
    findByAccountId(accountId: AccountId): Promise<TransactionEntity[]>;
    update(id: TransactionId, transaction: TransactionEntity, manager?: EntityManager): Promise<TransactionEntity>;
    delete(id: TransactionId): Promise<void>;
}