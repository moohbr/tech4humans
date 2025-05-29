import { NotFoundError } from "../not-found-error";

export class BankNotFoundError extends NotFoundError {
  constructor(message?: string) {
    const errorMessage = "Bank not found with name: ";
    super(`${errorMessage} ${message}`);
    Object.setPrototypeOf(this, BankNotFoundError.prototype);
  }
}