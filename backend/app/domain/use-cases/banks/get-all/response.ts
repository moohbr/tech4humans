import { BankEntity } from "@models/bank/entity";
import { EntityResponse } from "@useCases/base/entity-response";
import { BankNotFoundError } from "@domain/errors/bank/bank-not-found-error";

export class GetAllBanksResponse extends EntityResponse<BankEntity[]> {
  private constructor(
    banks: BankEntity[],
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(banks, success, message, errors, BankNotFoundError);  
  }

  public static success(banks: BankEntity[]): GetAllBanksResponse {
    return new GetAllBanksResponse(banks, true, "Banks fetched successfully", []);
  }

  public static failure(message: string, errors: Error[] = []): GetAllBanksResponse {
    const allErrors = errors.length > 0 ? errors : [new Error(message)];
    return new GetAllBanksResponse([], false, message, allErrors);
  }

  public static validationFailure(errors: Error[]): GetAllBanksResponse {
    return new GetAllBanksResponse([], false, "Validation failed", errors);
  }

  public getBanks(): BankEntity[] {
    return this.data || [];
  }
}