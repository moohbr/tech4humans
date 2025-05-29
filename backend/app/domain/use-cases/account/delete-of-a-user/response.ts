import { EntityResponse } from "@useCases/base/entity-response";
import { AccountNotFoundError } from "@domain/errors/account/account-not-found-error";

export class DeleteAccountOfUserResponse extends EntityResponse<void> {
  private constructor(success: boolean, message: string, errors: string[]) {
    super(null, success, message, errors, AccountNotFoundError);
  }

  public static success(): DeleteAccountOfUserResponse {
    return new DeleteAccountOfUserResponse(true, "Account deleted successfully", []);
  }

  public static failure(message: string, errors: string[]): DeleteAccountOfUserResponse {
    return new DeleteAccountOfUserResponse(false, message, errors);
  }

  public static validationFailure(errors: string[]): DeleteAccountOfUserResponse {
    return new DeleteAccountOfUserResponse(false, "Validation failed", errors);
  }
}