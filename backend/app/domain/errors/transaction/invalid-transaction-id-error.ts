import { ValidationError } from "../validation-error";

export class InvalidTransactionIdError extends ValidationError {
  constructor() {
    super("Invalid transaction id");
    Object.setPrototypeOf(this, InvalidTransactionIdError.prototype);
  }
}