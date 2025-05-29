import { AccountType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { AccountTypeVO } from "@models/account/value-objects/type";
import { UserId } from "@models/user/value-objects/id";
import { AccountBalance } from "@models/account/value-objects/balance";
import { AccountId } from "@models/account/value-objects/id";
import { AccountSchemas } from "@models/account/schemas";
import { BankName } from "@models/bank/value-objects/name";
import { AccountRawEntity } from "./types";
import { AccountName } from "../value-objects/name";

export class AccountEntity {
  private constructor(
    private readonly id: AccountId,
    private readonly name: AccountName,
    private readonly type: AccountTypeVO,
    private readonly balance: AccountBalance,
    private readonly createdAt: Date,
    private readonly userId: UserId,
    private readonly bankName: BankName,
  ) {}

  public static create(
    name: string,
    type: AccountType,
    balance: number,
    userId: number,
    bankName: string,
  ): AccountEntity {
    const validated = AccountSchemas.createAccountSchema.parse({
      name,
      type,
      balance,
      userId,
      bankName,
    });

    const accountId = AccountId.createNew();

    return new AccountEntity(
      accountId,
      AccountName.create(name),
      AccountTypeVO.create(validated.type),
      AccountBalance.create(validated.balance),
      new Date(),
      UserId.create(userId),
      BankName.create(bankName),
    );
  }

  public static reconstruct(
    id: number,
    name: string,
    type: AccountType,
    balance: number,
    createdAt: Date,
    userId: number,
      bankName: string,
  ): AccountEntity {
    const validated = AccountSchemas.accountEntitySchema.parse({
      id,
      name,
      type,
      balance,
      createdAt,
    });

    return new AccountEntity(
      AccountId.create(validated.id),
      AccountName.create(validated.name),
      AccountTypeVO.create(validated.type),
      AccountBalance.create(validated.balance),
      validated.createdAt,
      UserId.create(userId),
      BankName.create(bankName),
    );
  }

  public toPersistence(): AccountRawEntity  {
    return {
      id: this.id.isNew() ? null : this.id.getValue(),
      name: this.name.getValue(),
      type: this.type.getValue(),
      balance: this.balance.getValue(),
      createdAt: this.createdAt,
      userId: this.userId.getValue(),
      bankName: this.bankName.getValue(),
    };
  }

  public toJSON(): AccountRawEntity {
    return {
      id: this.id.isNew() ? null : this.id.getValue(),
      name: this.name.toJSON(),
      type: this.type.getValue(),
      balance: this.balance.getValue(),
      createdAt: this.createdAt,
      userId: this.userId.getValue(),
      bankName: this.bankName.getValue(),
    };
  }

  public increaseBalance(amount: number): void {
    this.balance.increase(amount);
  }

  public decreaseBalance(amount: number): void {
    this.balance.decrease(amount);
  }

  public getBalance(): AccountBalance {
    return this.balance;
  }

  public getUserId(): UserId {
    return this.userId;
  }

  public getName(): AccountName {
    return this.name;
  }

  public getType(): AccountTypeVO {
    return this.type;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

}
