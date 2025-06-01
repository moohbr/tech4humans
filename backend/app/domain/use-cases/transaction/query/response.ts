import { TransactionNotFoundError } from "@domain/errors/transaction/transaction-not-found-error";
import { TransactionEntity } from "@models/transaction/entity";
import { EntityResponse } from "@useCases/base/entity-response";

export class QueryTransactionResponse extends EntityResponse<TransactionEntity[]> {
    constructor(
        transactions: TransactionEntity[],
        success: boolean,
        message: string,
        errors: Error[]
    ) {
        super(transactions, success, message, errors, TransactionNotFoundError);
    }

    public static success(transactions: TransactionEntity[]): QueryTransactionResponse {
        return new QueryTransactionResponse(transactions, true, "Transactions fetched successfully", []);
    }

    public static failure(message: string, errors: Error[]): QueryTransactionResponse {
        return new QueryTransactionResponse([], false, message, errors);
    }

    public getTransactions(): TransactionEntity[] {
        return this.data || [];
    }
}