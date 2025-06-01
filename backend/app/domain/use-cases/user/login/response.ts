import { InvalidAuthResultError } from "@errors/user/invalid-auth-result-error";
import { AuthResult } from "@useCases/user/login/types";
import { EntityResponse } from "@useCases/base/entity-response";

export class LoginResponse extends EntityResponse<AuthResult> {
  private constructor(
    authResult: AuthResult | null,
    success: boolean,
    message: string,
    errors: Error[]
  ) {
    super(authResult, success, message, errors, InvalidAuthResultError);
  }

  public static success(authResult: AuthResult): LoginResponse {
    return new LoginResponse(authResult, true, "Login successful", []);
  }

  public static failure(message: string, errors: Error[] = []): LoginResponse {
    return new LoginResponse(null, false, message, errors);
  }

  public static validationFailure(errors: Error[]): LoginResponse {
    return new LoginResponse(null, false, "Validation failed", errors);
  }

  public getAuthResult(): AuthResult {
    return this.getData();
  }
}