import { EntityResponse } from "@useCases/base/entity-response";
import { UserNotFoundError } from "@domain/errors/user/user-not-found-error";

export class DeleteUserResponse extends EntityResponse<void> {
  private constructor(success: boolean, message: string, errors: Error[]) {
    super(null, success, message, errors, UserNotFoundError);
  }

  public static success(): DeleteUserResponse {
    return new DeleteUserResponse(true, "User deleted successfully", []);
  }

  public static failure(message: string, errors: Error[] = []): DeleteUserResponse {
    return new DeleteUserResponse(false, message, errors);
  }

  public static validationFailure(errors: Error[]): DeleteUserResponse {
    return new DeleteUserResponse(false, "Validation failed", errors);
  }
}
