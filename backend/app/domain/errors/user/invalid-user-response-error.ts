import { ValidationError } from "../validation-error";

export class InvalidUserResponseError extends ValidationError {
  constructor() {
    super("Cannot get user from failed response");
    Object.setPrototypeOf(this, InvalidUserResponseError.prototype);
  }
}