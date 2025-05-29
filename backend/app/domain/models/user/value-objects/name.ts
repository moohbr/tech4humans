import { UserSchemas } from "@models/user/schemas";

export class UserName {
  private constructor(private readonly value: string) {}

  public static create(name: string): UserName {
    const validatedName = UserSchemas.nameSchema.parse(name);
    return new UserName(validatedName);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UserName): boolean {
    return this.value === other.value;
  }
}
