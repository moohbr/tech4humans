import { ValidationError } from "../validation-error";

export class InvalidEmailError extends ValidationError {
  constructor(email: string) {
    super(`Invalid email format: ${email}`);
    Object.setPrototypeOf(this, InvalidEmailError.prototype);
  }
} 