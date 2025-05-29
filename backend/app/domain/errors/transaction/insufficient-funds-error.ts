import { ValidationError } from "../validation-error";

export class InsufficientFundsError extends ValidationError {
  constructor() {
    super('Insufficient funds');
    Object.setPrototypeOf(this, InsufficientFundsError.prototype);
  }
} 