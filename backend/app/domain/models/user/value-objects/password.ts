import { InvalidPasswordError } from "@errors/user/invalid-password-error";
import bcrypt from "bcryptjs";

export class UserPassword {
  private constructor(
    private readonly value: string,
    private readonly isHashed: boolean = false,
  ) {
    if (!isHashed) {
      this.validatePassword();
    }
  }

  public static create(plainPassword: string): UserPassword {
    return new UserPassword(plainPassword, false);
  }

  public static createFromHash(hashedPassword: string): UserPassword {
    return new UserPassword(hashedPassword, true);
  }

  public async hash(): Promise<UserPassword> {
    if (this.isHashed) {
      return this;
    }
    const hashedValue = await bcrypt.hash(this.value, 10);
    return new UserPassword(hashedValue, true);
  }

  public async compare(plainPassword: string): Promise<boolean> {
    if (!this.isHashed) {
      throw new InvalidPasswordError("Cannot compare with unhashed password");
    }
    return bcrypt.compare(plainPassword, this.value);
  }

  public async compareWithHash(hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(this.value, hashedPassword);
  }

  public getValue(): string {
    return this.value;
  }

  public isHashedPassword(): boolean {
    return this.isHashed;
  }

  private validatePassword(): void {
    if (
      !this.value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      )
    ) {
      throw new InvalidPasswordError(
        "Password must contain at least 8 characters with uppercase, lowercase, number and special character",
      );
    }
  }
}
