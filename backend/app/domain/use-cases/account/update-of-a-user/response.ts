import { AccountEntity } from "@models/account/entity";
import { EntityResponse } from "@useCases/base/entity-response";
import { AccountNotFoundError } from "@domain/errors/account/account-not-found-error";

export class UpdateAccountOfUserResponse extends EntityResponse<AccountEntity> {
  private constructor(
    account: AccountEntity | null,
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(account, success, message, errors, AccountNotFoundError);
  }

  public static success(account: AccountEntity): UpdateAccountOfUserResponse {
    return new UpdateAccountOfUserResponse(account, true, "Account updated successfully", []);
  }

  public static failure(message: string, errors: Error[]): UpdateAccountOfUserResponse {
    return new UpdateAccountOfUserResponse(null, false, message, errors);
  }

  public static validationFailure(errors: Error[]): UpdateAccountOfUserResponse {
    return new UpdateAccountOfUserResponse(null, false, "Validation failed", errors);
  }
}