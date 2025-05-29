import { ValidationError } from "../validation-error";

export class InvalidTransactionTypeError extends ValidationError {
  constructor() {
    super('Invalid transaction type');
    Object.setPrototypeOf(this, InvalidTransactionTypeError.prototype);
  }
} 