import { AccountId } from "@models/account/value-objects/id";
import { AccountTypeVO } from "@models/account/value-objects/type";
import { UpdateAccountOfUserSchemas } from "@useCases/account/update-of-a-user/schemas";
import { AccountName } from "@models/account/value-objects/name";
import { AccountBalance } from "@models/account/value-objects/balance";
import { BankName } from "@models/bank/value-objects/name";

export class UpdateAccountOfUserRequest {
  constructor(
    private readonly accountId: AccountId,
    private readonly accountType?: AccountTypeVO,
    private readonly name?: AccountName,
    private readonly bankName?: BankName,
  ) {}

  public getAccountId(): AccountId {
    return this.accountId;
  }

  public getAccountIdVO(): AccountId {
    return this.accountId;
  }

  public getName(): AccountName {
    if (!this.name) {
      throw new Error("Name not provided");
    }
    return this.name;
  }
  public getAccountType(): AccountTypeVO {
    if (!this.accountType) {
      throw new Error("Account type not provided");
    }
    return this.accountType;
  }


  public getBankName(): BankName {
    if (!this.bankName) {
      throw new Error("Bank name not provided");
    }
    return this.bankName;
  }

  public hasName(): boolean {
    return this.name !== undefined;
  }

  public hasBankName(): boolean {
    return this.bankName !== undefined;
  }

  public hasAccountType(): boolean {
    return this.accountType !== undefined;
  }


  public static createFromRaw(raw: unknown): UpdateAccountOfUserRequest {
    const parsed = UpdateAccountOfUserSchemas.httpRequestSchema.parse(raw);
  

    return new UpdateAccountOfUserRequest(
      AccountId.create(parsed.params.accountId),
      parsed.body.type ? AccountTypeVO.create(parsed.body.type) : undefined,
      parsed.body.name ? AccountName.create(parsed.body.name) : undefined,
      parsed.body.bankName ? BankName.create(parsed.body.bankName) : undefined,
    );
  }
}