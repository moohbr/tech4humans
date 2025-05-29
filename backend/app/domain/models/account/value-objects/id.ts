import { AccountSchemas } from "@models/account/schemas";
import { InvalidAccountIdError } from "@errors/account/invalid-account-id-error";

export class AccountId {
  private constructor(
    private readonly value: number | null,
    private readonly isNewId: boolean = false,
  ) {}

  public static create(id: number): AccountId {
    const validatedId = AccountSchemas.accountIdSchema.parse(id);
    return new AccountId(validatedId, false);
  }

  public static createNew(): AccountId {
    return new AccountId(null, true);
  }

  public static createFromDatabase(id: number): AccountId {
    const validatedId = AccountSchemas.accountIdSchema.parse(id);
    return new AccountId(validatedId, false);
  }

  public static createUnsafe(id: number): AccountId {
    return new AccountId(id, false);
  }

  public getValue(): number {
    if (this.value === null) {
      throw new InvalidAccountIdError();
    }
    return this.value;
  }

  public isNew(): boolean {
    return this.isNewId;
  }

  public equals(other: AccountId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value?.toString() ?? "";
  }
}
