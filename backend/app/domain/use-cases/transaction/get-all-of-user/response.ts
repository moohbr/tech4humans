import { TransactionNotFoundError } from "@domain/errors/transaction/transaction-not-found-error";
import { TransactionEntity } from "@models/transaction/entity";
import { EntityResponse } from "@useCases/base/entity-response";

export class GetAllOfUserResponse extends EntityResponse<TransactionEntity[]> {
  constructor(
    transactions: TransactionEntity[],
    success: boolean,
    message: string,
    errors: string[]
  ) {
    super(transactions, success, message, errors, TransactionNotFoundError);
  }

  public static success(transactions: TransactionEntity[]): GetAllOfUserResponse {
    return new GetAllOfUserResponse(transactions, true, "Transactions fetched successfully", []);
  }

  public static failure(message: string, errors: string[]): GetAllOfUserResponse {
    return new GetAllOfUserResponse([], false, message, errors);
  }

  public getTransactions(): TransactionEntity[] {
    return this.data || [];
  }
}