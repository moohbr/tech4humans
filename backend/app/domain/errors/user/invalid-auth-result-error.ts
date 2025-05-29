import { ValidationError } from "../validation-error";

export class InvalidAuthResultError extends ValidationError {
  constructor(message?: string) {
    const errorMessage = message || "Invalid auth result";
    super(errorMessage);
    Object.setPrototypeOf(this, InvalidAuthResultError.prototype);
  }
}