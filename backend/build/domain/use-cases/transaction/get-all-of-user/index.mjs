var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/use-cases/transaction/get-all-of-user/index.ts
import { ZodError } from "zod";

// app/domain/use-cases/transaction/get-all-of-user/response.ts
var GetAllOfUserResponse = class _GetAllOfUserResponse {
  static {
    __name(this, "GetAllOfUserResponse");
  }
  transactions;
  success;
  message;
  errors;
  constructor(transactions, success, message, errors) {
    this.transactions = transactions;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(transactions) {
    return new _GetAllOfUserResponse(transactions, true, "Transactions fetched successfully", []);
  }
  static failure(message, errors) {
    return new _GetAllOfUserResponse([], false, message, errors);
  }
  getTransactions() {
    return this.transactions;
  }
  isSuccess() {
    return this.success;
  }
  getMessage() {
    return this.message;
  }
  getErrors() {
    return this.errors;
  }
  hasErrors() {
    return this.errors.length > 0;
  }
};

// app/domain/models/user/schemas/index.ts
import { z } from "zod";
var UserSchemas = class {
  static {
    __name(this, "UserSchemas");
  }
  static emailSchema = z.string().email("Invalid email format").min(1, "Email is required").max(255, "Email cannot exceed 255 characters");
  static nameSchema = z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static userIdSchema = z.number().int("User ID must be an integer").positive("User ID must be positive");
  static passwordSchema = z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number and special character");
  static createUserSchema = z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: z.string().min(8, "Password hash is required")
  });
  static userEntitySchema = z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: z.date(),
    passwordHash: z.string().min(8, "Password hash is required")
  });
};

// app/domain/errors/domain-error.ts
var DomainError = class _DomainError extends Error {
  static {
    __name(this, "DomainError");
  }
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, _DomainError.prototype);
  }
};

// app/domain/errors/validation-error.ts
var ValidationError = class _ValidationError extends DomainError {
  static {
    __name(this, "ValidationError");
  }
  errors;
  constructor(message, errors = []) {
    super(message), this.errors = errors;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  getStatusCode() {
    return 400;
  }
  getErrors() {
    return this.errors;
  }
};

// app/domain/errors/user/invalid-user-id-error.ts
var InvalidUserIdError = class _InvalidUserIdError extends ValidationError {
  static {
    __name(this, "InvalidUserIdError");
  }
  constructor() {
    super("Cannot get value of new UserId before persistence");
    Object.setPrototypeOf(this, _InvalidUserIdError.prototype);
  }
};

// app/domain/models/user/value-objects/id.ts
var UserId = class _UserId {
  static {
    __name(this, "UserId");
  }
  value;
  isNewId;
  constructor(value, isNewId = false) {
    this.value = value;
    this.isNewId = isNewId;
  }
  static create(id) {
    const validatedId = UserSchemas.userIdSchema.parse(id);
    return new _UserId(validatedId, false);
  }
  static createNew() {
    return new _UserId(null, true);
  }
  static createFromDatabase(id) {
    const validatedId = UserSchemas.userIdSchema.parse(id);
    return new _UserId(validatedId, false);
  }
  static createUnsafe(id) {
    return new _UserId(id, false);
  }
  getValue() {
    if (this.value === null) {
      throw new InvalidUserIdError();
    }
    return this.value;
  }
  isNew() {
    return this.isNewId;
  }
  equals(other) {
    return this.value === other.value;
  }
  toString() {
    return this.value?.toString() ?? "new";
  }
};

// app/domain/use-cases/transaction/get-all-of-user/schemas.ts
import z2 from "zod";
var GetAllOfUserSchemas = class {
  static {
    __name(this, "GetAllOfUserSchemas");
  }
  static requestSchema = z2.object({
    userId: UserSchemas.userIdSchema
  });
  static httpRequestSchema = z2.object({
    params: this.requestSchema
  });
};

// app/domain/use-cases/transaction/get-all-of-user/index.ts
var GetAllOfUserUseCase = class {
  static {
    __name(this, "GetAllOfUserUseCase");
  }
  transactionRepository;
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }
  async execute(request) {
    try {
      const validated = GetAllOfUserSchemas.httpRequestSchema.parse({
        params: {
          userId: request.getUserId()
        }
      });
      const userId = UserId.create(validated.params.userId);
      const transactions = await this.transactionRepository.findByUserId(userId);
      if (!transactions || transactions.length === 0) {
        return GetAllOfUserResponse.failure("No transactions found", []);
      }
      return GetAllOfUserResponse.success(transactions);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return GetAllOfUserResponse.failure("Failed to fetch transactions", errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return GetAllOfUserResponse.failure("Failed to fetch transactions", [
      message
    ]);
  }
};
export {
  GetAllOfUserUseCase
};
//# sourceMappingURL=index.mjs.map