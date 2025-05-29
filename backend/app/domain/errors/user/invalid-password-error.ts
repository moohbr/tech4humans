import { ValidationError } from "../validation-error";

export class InvalidPasswordError extends ValidationError {
  constructor(message: string) {
    super(message, []);
    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
} 