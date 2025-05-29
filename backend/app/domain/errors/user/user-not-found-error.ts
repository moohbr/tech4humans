import { NotFoundError } from "../not-found-error";

export class UserNotFoundError extends NotFoundError {
  constructor(userId?: string) {
    super(userId ? `User with ID ${userId} not found` : 'User not found');
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
} 