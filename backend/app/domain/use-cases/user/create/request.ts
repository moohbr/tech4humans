import { CreateUserSchemas } from "@useCases/user/create/schemas";
import { UserName } from "@models/user/value-objects/name";
import { UserEmail } from "@models/user/value-objects/email";
import { UserPassword } from "@models/user/value-objects/password";
import { AccountBalance } from "@models/account/value-objects/balance";
import { BankName } from "@models/bank/value-objects/name";
import { AccountTypeVO } from "@models/account/value-objects/type";
import { AccountName } from "@models/account/value-objects/name";

export class CreateUserRequest {
  constructor(
    private readonly name: UserName,
    private readonly email: UserEmail,
    private readonly password: UserPassword,
    private readonly accountName: AccountName,
    private readonly accountType: AccountTypeVO,
    private readonly accountBalance: AccountBalance,
    private readonly bankName: BankName,
  ) {}

  public static createFromRaw(raw: unknown): CreateUserRequest {
    const parsed = CreateUserSchemas.requestSchema.parse(raw);
    return new CreateUserRequest(
      UserName.create(parsed.user.name),
      UserEmail.create(parsed.user.email),
      UserPassword.create(parsed.user.password),
      AccountName.create(parsed.account.name),
      AccountTypeVO.create(parsed.account.type),
      AccountBalance.create(parsed.account.balance),
      BankName.create(parsed.account.bank.name),
    );
  }

  public getName(): UserName {
    return this.name;
  }

  public getEmail(): UserEmail {
    return this.email;
  }

  public getPassword(): UserPassword {
    return this.password;
  }

  public getAccountName(): AccountName {
    return this.accountName;
  }

  public getAccountType(): AccountTypeVO {
    return this.accountType;
  }

  public getAccountBalance(): AccountBalance {
    return this.accountBalance;
  }

  public getBankName(): BankName {
    return this.bankName;
  }
}
