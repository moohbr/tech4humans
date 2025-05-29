import { BankSchemas } from "@models/bank/schemas";

export class BankName {
  private constructor(private readonly value: string) {}

  public static create(value: string): BankName {
    const validated = BankSchemas.nameSchema.parse(value);
    return new BankName(validated);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: BankName): boolean {
    return this.value === other.value;
  }
}