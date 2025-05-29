import { AccountTypeVO } from "@models/account/value-objects/type";
import { AddAccountToUserSchemas } from "@useCases/account/add-to-a-user/schemas";
import { UserId } from "@models/user/value-objects/id";
import { AccountBalance } from "@models/account/value-objects/balance";
import { BankName } from "@models/bank/value-objects/name";
import { AccountName } from "@models/account/value-objects/name";

export class AddAccountToUserRequest {
  constructor(
    private readonly userId: UserId,
    private readonly accountType: AccountTypeVO,
    private readonly initialBalance: AccountBalance,
    private readonly bankName: BankName,
    private readonly name: AccountName

  ) {}

  public getUserId(): number {
    return this.userId.getValue();
  }

  public getAccountType(): string {
    return this.accountType.getValue();
  }

  public getInitialBalance(): number {
    return this.initialBalance.getValue();
  }

  public getBankName(): BankName {
    return this.bankName;
  }

  public getName(): AccountName {
    return this.name;
  }

  public getUserIdVO(): UserId {
    return this.userId;
  }

  public getAccountTypeVO(): AccountTypeVO {
    return this.accountType;
  }

  public getInitialBalanceVO(): AccountBalance {
    return this.initialBalance;
  }

  public getBankNameVO(): BankName {
    return this.bankName;
  }

  public static createFromRaw(raw: unknown): AddAccountToUserRequest {
    const parsed = AddAccountToUserSchemas.httpRequestSchema.parse(raw);
    return new AddAccountToUserRequest(
      UserId.create(parsed.params.userId),
      AccountTypeVO.create(parsed.body.type),
      AccountBalance.create(parsed.body.balance),
      BankName.create(parsed.body.bankName),
      AccountName.create(parsed.body.name)
    );
  }
}
  