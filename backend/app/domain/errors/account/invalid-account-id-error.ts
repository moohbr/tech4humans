import { ValidationError } from "../validation-error";

export class InvalidAccountIdError extends ValidationError {
  constructor() {
    super('Cannot get value of new AccountId before persistence');
    Object.setPrototypeOf(this, InvalidAccountIdError.prototype);
  }
} 