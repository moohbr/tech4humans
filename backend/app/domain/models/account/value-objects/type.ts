import { AccountType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { AccountSchemas } from "@models/account/schemas";

export class AccountTypeVO {
  private constructor(private value: AccountType) {}

  public static create(type: unknown): AccountTypeVO {
    const validatedType = AccountSchemas.accountTypeSchema.parse(type);
    return new AccountTypeVO(validatedType);
  }

  public getValue(): AccountType {
    return this.value;
  }
  
  public setValue(value: AccountType): void {
    this.value = value;
  }
}
