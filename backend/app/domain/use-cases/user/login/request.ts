import { UserLoginSchemas } from "@useCases/user/login/schemas";

export class LoginRequest {
  constructor(
    private readonly email: string,
    private readonly password: string,
  ) {}

  public static createFromRaw(raw: unknown): LoginRequest {
    const parsed = UserLoginSchemas.requestSchema.parse(raw);
    return new LoginRequest(parsed.email, parsed.password);
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }
}
