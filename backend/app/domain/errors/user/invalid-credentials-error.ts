import { NotAuthorizedError } from "../not-authorized-error";

export class InvalidCredentialsError extends NotAuthorizedError {
  constructor() {
    super();
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
} 