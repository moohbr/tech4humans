import { ValidationError } from "../validation-error";

export class InvalidTransactionTypeError extends ValidationError {
  constructor(message?: string) {
    const defaultMessage = 'Invalid transaction type';
    super(message || defaultMessage);
    Object.setPrototypeOf(this, InvalidTransactionTypeError.prototype);
  }
} 