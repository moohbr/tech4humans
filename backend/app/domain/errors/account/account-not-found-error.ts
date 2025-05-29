import { NotFoundError } from "../not-found-error";

export class AccountNotFoundError extends NotFoundError {
  constructor(accountId?: string) {
    super(accountId ? `Account with ID ${accountId} not found` : 'Account not found');
    Object.setPrototypeOf(this, AccountNotFoundError.prototype);
  }
} 