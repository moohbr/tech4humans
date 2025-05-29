import { AccountSchemas } from "@models/account/schemas";
import { InvalidBalanceError } from "@errors/account/invalid-balance-error";

export class AccountBalance {
  private constructor(private value: number) {
    if (!Number.isFinite(value)) {
      throw new InvalidBalanceError(value);
    }
  }

  public static create(type: unknown): AccountBalance {
    const validatedType = AccountSchemas.balanceSchema.parse(type);
    return new AccountBalance(validatedType);
  }

  public getValue(): number {
    return this.value;
  }

  public isNegative(): boolean {
    return this.value < 0;
  }

  public isPositive(): boolean {
    return this.value > 0;
  }

  public isZero(): boolean {
    return this.value === 0;
  }

  public increase(amount: number): void {
    this.value += amount;
  }

  public decrease(amount: number): void {
    this.value -= amount;
  }
}
