import { BankSchemas } from "@models/bank/schemas";
import { BankName } from "@models/bank/value-objects/name";

export class BankEntity {
  private constructor(
    private readonly name: BankName,
  ) {}

  public static create(name: string): BankEntity {
    const validated = BankSchemas.createBankSchema.parse({ name });
    return new BankEntity(BankName.create(validated.name));
  }

  public static reconstruct(name: string): BankEntity {
    const validated = BankSchemas.bankEntitySchema.parse({ name });
    return new BankEntity(BankName.create(validated.name));
  }

  public getName(): BankName {
    return this.name;
  }

  public toJSON(): BankRawEntity {
    return {
      name: this.name.getValue(),
    };
  }

  public toPersistence(): BankRawEntity {
    return {
      name: this.name.getValue(),
    };
  }
}