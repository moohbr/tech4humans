import { UserLoginSchemas } from "@useCases/user/login/schemas";
import { UserEmail } from "@models/user/value-objects/email";
import { UserPassword } from "@models/user/value-objects/password";

export class LoginRequest {
  private readonly email: UserEmail;
  private readonly password: UserPassword;

  constructor(email: UserEmail, password: UserPassword) {
    this.email = email;
    this.password = password;
  }

  public static createFromRaw(raw: unknown): LoginRequest {
    const parsed = UserLoginSchemas.requestSchema.parse(raw);
    return new LoginRequest(
      UserEmail.create(parsed.email),
      UserPassword.create(parsed.password)
    );
  }

  public getEmail(): UserEmail {
    return this.email;
  }

  public getPassword(): UserPassword {
    return this.password;
  }
}
