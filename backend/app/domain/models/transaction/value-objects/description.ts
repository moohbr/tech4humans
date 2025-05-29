import { TransactionSchemas } from "@models/transaction/schemas";

export class TransactionDescription {
  private constructor(private readonly value: string) {}

  public static create(value: string): TransactionDescription {
    const validatedDescription = TransactionSchemas.descriptionSchema.parse(value);
    return new TransactionDescription(validatedDescription);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: TransactionDescription): boolean {
    return this.value === other.value;
  }
}