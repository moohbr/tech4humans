import { NotFoundError } from "../not-found-error";

export class TransactionNotFoundError extends NotFoundError {
  constructor(message?: string) {
    const errorMessage = "Transaction not found";
    super(`${errorMessage} ${message}`);
    Object.setPrototypeOf(this, TransactionNotFoundError.prototype);
  }
} 