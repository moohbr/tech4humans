import { DomainError } from "./domain-error";

export class ValidationError extends DomainError {
  constructor(message: string, private readonly errors: string[] = []) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  public getStatusCode(): number {
    return 400;
  }

  public getErrors(): string[] {
    return this.errors;
  }
} 