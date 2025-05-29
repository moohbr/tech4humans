import { ValidationError } from "../validation-error";

export class InvalidBalanceError extends ValidationError {
  constructor(value: unknown) {
    super(`Balance must be a finite number. Got: ${value}`);
    Object.setPrototypeOf(this, InvalidBalanceError.prototype);
  }
} 