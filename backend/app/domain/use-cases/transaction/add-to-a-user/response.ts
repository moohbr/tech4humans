import { InvalidTransactionIdError } from "@errors/transaction/invalid-transaction-id-error";
import { EntityResponse } from "@useCases/base/entity-response";
import { TransactionEntity } from "@models/transaction/entity";

export class AddTransactionToUserResponse extends EntityResponse<TransactionEntity> {
  private constructor(
    transaction: TransactionEntity | null,
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(transaction, success, message, errors, InvalidTransactionIdError);
  }

  public static success(transaction: TransactionEntity): AddTransactionToUserResponse {
    return new AddTransactionToUserResponse(transaction, true, "Transaction added successfully", []);
  }

  public static failure(message: string, errors: Error[] = []): AddTransactionToUserResponse {
    const finalErrors = errors.length > 0 ? errors : (message ? [new Error(message)] : []);
    return new AddTransactionToUserResponse(null, false, message, finalErrors);
  }

    public static validationFailure(errors: Error[]): AddTransactionToUserResponse {
    return new AddTransactionToUserResponse(null, false, "Validation failed", errors);
  }

  public getTransaction(): TransactionEntity {
    return this.getData();
  }
}