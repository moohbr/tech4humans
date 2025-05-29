import { DomainError } from "./domain-error";

export class ConflictError extends DomainError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  public getStatusCode(): number {
    return 409;
  }
}