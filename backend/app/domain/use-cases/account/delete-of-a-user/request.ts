import { DeleteAccountOfUserSchemas } from "@useCases/account/delete-of-a-user/schemas";
import { AccountId } from "@models/account/value-objects/id";

export class DeleteAccountOfUserRequest {
  constructor(
    private readonly accountId: AccountId
  ) {}

  public getAccountId(): number | string {
    return this.accountId.getValue();
  }

  public getAccountIdVO(): AccountId {
    return this.accountId;
  }

  public static createFromRaw(raw: unknown): DeleteAccountOfUserRequest {
    const parsed = DeleteAccountOfUserSchemas.httpRequestSchema.parse(raw);
    return new DeleteAccountOfUserRequest(
      AccountId.create(parsed.params.accountId)
    );
  }
}