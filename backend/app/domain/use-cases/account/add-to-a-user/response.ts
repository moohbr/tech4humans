import { AccountEntity } from "@models/account/entity";
import { EntityResponse } from "@useCases/base/entity-response";
import { AccountNotFoundError } from "@domain/errors/account/account-not-found-error";

export class AddAccountToUserResponse extends EntityResponse<AccountEntity> {
  private constructor(account: AccountEntity | null, success: boolean, message: string, errors: string[]) {
    super(account, success, message, errors, AccountNotFoundError);
  }

  public static success(account: AccountEntity): AddAccountToUserResponse {
    return new AddAccountToUserResponse(account, true, "Account added successfully", []);
  }

  public static failure(message: string, errors: string[]): AddAccountToUserResponse {
    return new AddAccountToUserResponse(null, false, message, errors);
  }

  public static validationFailure(errors: string[]): AddAccountToUserResponse {
    return new AddAccountToUserResponse(null, false, "Validation failed", errors);
  }
}