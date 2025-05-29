import { ValidationError } from "../validation-error";

export class InvalidUserIdError extends ValidationError {
  constructor() {
    super('Cannot get value of new UserId before persistence');
    Object.setPrototypeOf(this, InvalidUserIdError.prototype);
  }
} 