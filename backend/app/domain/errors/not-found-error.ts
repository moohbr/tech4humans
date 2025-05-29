import { DomainError } from "./domain-error";

export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public getStatusCode(): number {
    return 404;
  }
} 