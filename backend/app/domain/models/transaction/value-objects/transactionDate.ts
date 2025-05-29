import { TransactionSchemas } from "@models/transaction/schemas";

export class TransactionDate {
  private constructor(private readonly value: Date) {}

  public static create(value: Date): TransactionDate {
    const validatedDate = TransactionSchemas.transactionDateSchema.parse(value);
    return new TransactionDate(validatedDate);
  }

  public getValue(): Date {
    return this.value;
  }

  public equals(other: TransactionDate): boolean {
    return this.value.getTime() === other.value.getTime();
  }
}