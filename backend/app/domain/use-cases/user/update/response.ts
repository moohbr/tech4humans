import { UserEntity } from "@models/user/entity";
import { InvalidUserResponseError } from "@errors/user/invalid-user-response-error";
import { EntityResponse } from "@useCases/base/entity-response";

export class UpdateUserResponse extends EntityResponse<UserEntity> {
  private constructor(
    user: UserEntity | null,
    success: boolean,
    message: string,
    errors: string[]
  ) {
    super(user, success, message, errors, InvalidUserResponseError);
  }

  public static success(user: UserEntity): UpdateUserResponse {
    return new UpdateUserResponse(user, true, "User updated successfully", []);
  }

  public static failure(message: string, errors: string[] = []): UpdateUserResponse {
    return new UpdateUserResponse(null, false, message, errors);
  }

  public static validationFailure(errors: string[]): UpdateUserResponse {
    return new UpdateUserResponse(null, false, "Validation failed", errors);
  }

  public getUser(): UserEntity {
    return this.getData();
  }
}