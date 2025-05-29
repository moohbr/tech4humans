import { InvalidEmailError } from "@errors/user/invalid-email-error";

export class UserEmail {
  private constructor(private readonly value: string) {
    this.validateEmail();
  }

  public static create(email: string): UserEmail {
    return new UserEmail(email);
  }

  public getValue(): string {
    return this.value;
  }

  private validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new InvalidEmailError(this.value);
    }
  }

  public equals(other: UserEmail): boolean {
    return this.value === other.value;
  }
}
