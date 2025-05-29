import { AccountEntity } from "@models/account/entity";
import { EntityResponse } from "@useCases/base/entity-response";
import { AccountNotFoundError } from "@domain/errors/account/account-not-found-error";

export class UpdateAccountOfUserResponse extends EntityResponse<AccountEntity> {
  private constructor(
    account: AccountEntity | null,
    success: boolean,
    message: string,
    errors: string[]
  ) {
    super(account, success, message, errors, AccountNotFoundError);
  }

  public static success(account: AccountEntity): UpdateAccountOfUserResponse {
    return new UpdateAccountOfUserResponse(account, true, "Account updated successfully", []);
  }

  public static failure(message: string, errors: string[]): UpdateAccountOfUserResponse {
    return new UpdateAccountOfUserResponse(null, false, message, errors);
  }

  public static validationFailure(errors: string[]): UpdateAccountOfUserResponse {
    return new UpdateAccountOfUserResponse(null, false, "Validation failed", errors);
  }
}