import { UserId } from "@models/user/value-objects/id";
import { GetAllAccountsOfUserSchemas } from "@useCases/account/get-all-of-user/schemas";

export class GetAllAccountsOfUserRequest {
  constructor(
    private readonly userId: UserId
  ) {}

  public getUserId(): number {
    return this.userId.getValue();
  }

  public getUserIdVO(): UserId {
    return this.userId;
  }

  public static createFromRaw(raw: unknown): GetAllAccountsOfUserRequest {
    const parsed = GetAllAccountsOfUserSchemas.httpRequestSchema.parse(raw);
    return new GetAllAccountsOfUserRequest(
      UserId.create(parsed.params.userId)
    );
  }
}