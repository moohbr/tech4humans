import { UpdateUserSchemas } from "@useCases/user/update/schemas";

export class UpdateUserRequest {
  constructor(
    private readonly id: number,
    private readonly name?: string,
    private readonly email?: string,
    private readonly password?: string,
  ) {}

  public static createFromRaw(raw: unknown): UpdateUserRequest {
    const parsed = UpdateUserSchemas.httpRequestSchema.parse(raw);
    return new UpdateUserRequest(
      parsed.params.id,
      parsed.body.user.name,
      parsed.body.user.email,
      parsed.body.user.password,
    );
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string | undefined {
    return this.name;
  }

  public getEmail(): string | undefined {
    return this.email;
  }

  public getPassword(): string | undefined {
    return this.password;
  }
}
