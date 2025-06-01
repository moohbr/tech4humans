import { AccountEntity } from "@models/account/entity";
import { EntityResponse } from "@useCases/base/entity-response";
import { AccountNotFoundError } from "@domain/errors/account/account-not-found-error";

export class GetAllAccountsOfUserResponse extends EntityResponse<AccountEntity[]> {
  private constructor(
    accounts: AccountEntity[],
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(accounts, success, message, errors, AccountNotFoundError);
  }

  public static success(accounts: AccountEntity[]): GetAllAccountsOfUserResponse {
    return new GetAllAccountsOfUserResponse(accounts, true, "Accounts fetched successfully", []);
  }

  public static failure(message: string, errors: Error[]): GetAllAccountsOfUserResponse {
    return new GetAllAccountsOfUserResponse([], false, message, errors);
  }

  public static validationFailure(errors: Error[]): GetAllAccountsOfUserResponse {
    return new GetAllAccountsOfUserResponse([], false, "Validation failed", errors);
  }
} 