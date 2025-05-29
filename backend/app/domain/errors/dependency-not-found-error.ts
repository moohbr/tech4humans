import { DomainError } from "./domain-error";

export class DependencyNotFoundError extends DomainError {
  constructor(dependencyName: string) {
    super(`Dependency ${dependencyName} not found`);
    Object.setPrototypeOf(this, DependencyNotFoundError.prototype);
  }

  public getStatusCode(): number {
    return 500;
  }
}