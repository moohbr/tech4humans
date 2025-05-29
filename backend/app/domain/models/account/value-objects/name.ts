export class AccountName {
  private constructor(private readonly value: string) {}

  public static create(value: string): AccountName {
    return new AccountName(value);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: AccountName): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }

  public toJSON(): string {
    return this.value;
  }

  public toPersistence(): string {
    return this.value;
  }
}