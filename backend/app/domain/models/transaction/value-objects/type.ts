import { TransactionSchemas } from "@models/transaction/schemas";
import { TransactionType } from "@infrastructure/datasources/databases/typeorm/models/enums";

export class TransactionTypeVo {
  private constructor(private readonly value: TransactionType) {}

  public static create(value: TransactionType): TransactionTypeVo {
    const validatedType = TransactionSchemas.transactionTypeSchema.parse(value);
    return new TransactionTypeVo(validatedType);
  }

  public getValue(): TransactionType {
    return this.value;
  }

  public equals(other: TransactionTypeVo): boolean {
    return this.value === other.value;
  }
}