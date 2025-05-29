import { InfrastructureError } from "../infrastructure-error";

export class DatabaseConnectionError extends InfrastructureError {
  constructor() {
    super("Database connection failed");
  }
}