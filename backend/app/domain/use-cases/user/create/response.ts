import { EntityResponse } from "@useCases/base/entity-response";
import { UserNotFoundError } from "@domain/errors/user/user-not-found-error";
import { UserEntity } from "@models/user/entity";

export class CreateUserResponse extends EntityResponse<UserEntity> {
  private constructor(user: UserEntity | null, success: boolean, message: string, errors: string[]) {
    super(user, success, message, errors, UserNotFoundError);
  }

  public static success(user: UserEntity): CreateUserResponse {
    return new CreateUserResponse(user, true, "User created successfully", []);
  }

  public static failure(message: string, errors: string[] = []): CreateUserResponse {
    return new CreateUserResponse(null, false, message, errors);
  }

  public static validationFailure(errors: string[]): CreateUserResponse {
    return new CreateUserResponse(null, false, "Validation failed", errors);
  }

  public getUser(): UserEntity {
    return this.getData();
  }
}