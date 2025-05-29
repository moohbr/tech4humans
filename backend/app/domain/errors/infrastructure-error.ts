import { DomainError } from "./domain-error";

export abstract class InfrastructureError extends DomainError {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InfrastructureError.prototype);
    }

    public getStatusCode(): number {
        return 500;
    }
}