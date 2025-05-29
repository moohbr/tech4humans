import { TransactionSchemas } from "@models/transaction/schemas";

export class TransactionAmount {
  private constructor(private readonly value: number) {}

  public static create(value: number): TransactionAmount {
    const validatedAmount = TransactionSchemas.amountSchema.parse(value);
    return new TransactionAmount(validatedAmount);
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: TransactionAmount): boolean {
    return this.value === other.value;
  }
}