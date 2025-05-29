import { DomainError } from "./domain-error";

export class NotAuthorizedError extends DomainError {
  constructor() {
    super("Not authorized");
  }

  public getStatusCode(): number {
    return 401;
  }
}