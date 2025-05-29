import { InvalidTransactionIdError } from "@errors/transaction/invalid-transaction-id-error";
import { TransactionSchemas } from "@models/transaction/schemas";

export class TransactionId {
    private constructor(
      private readonly value: number | null,
      private readonly isNewId: boolean = false,
    ) {}
  
    public static create(id: number): TransactionId {
      const validatedId = TransactionSchemas.transactionIdSchema.parse(id);
      return new TransactionId(validatedId, false);
    }
  
    public static createNew(): TransactionId {
      return new TransactionId(null, true);
    }
  
    public static createFromDatabase(id: number): TransactionId {
      const validatedId = TransactionSchemas.transactionIdSchema.parse(id);
      return new TransactionId(validatedId, false);
    }
  
    public static createUnsafe(id: number): TransactionId {
      return new TransactionId(id, false);
    }
  
    public getValue(): number {
      if (this.value === null) {
        throw new InvalidTransactionIdError("new");
      }
      return this.value;
    }
  
    public isNew(): boolean {
      return this.isNewId;
    }
  
    public equals(other: TransactionId): boolean {
      return this.value === other.value;
    }
  
    public toString(): string {
      return this.value?.toString() ?? "new";
    }
  }