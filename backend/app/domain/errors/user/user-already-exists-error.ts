import { ConflictError } from "../conflict-error";

export class UserAlreadyExistsError extends ConflictError {
  constructor(email: string) {
    super(`User already exists: ${email}`);
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }
}