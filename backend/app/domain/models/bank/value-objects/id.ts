import { BankSchemas } from "@models/bank/schemas";
import { InvalidBankIdError } from "@errors/bank/invalid-bank-id-error";

export class BankId {
  private constructor(
    private readonly value: number | null,
    private readonly isNewId: boolean = false,
  ) {}

  public static create(id: number): BankId {
    const validatedId = BankSchemas.bankIdSchema.parse(id );
    return new BankId(validatedId, false);
  }

  public static createNew(): BankId {
    return new BankId(null, true);
  }

  public static createFromDatabase(id: number): BankId {
    const validatedId = BankSchemas.bankIdSchema.parse(id);
    return new BankId(validatedId, false);
  }

  public static createUnsafe(id: number): BankId {
    return new BankId(id, false);
  }

  public getValue(): number {
    if (this.value === null) {
      throw new InvalidBankIdError("new");
    }
    return this.value;
  }

  public isNew(): boolean {
    return this.isNewId;
  }

  public equals(other: BankId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value?.toString() ?? "new";
  }
}
