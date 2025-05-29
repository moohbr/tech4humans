"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// app/domain/use-cases/transaction/get-all-of-user/index.ts
var get_all_of_user_exports = {};
__export(get_all_of_user_exports, {
  GetAllOfUserUseCase: () => GetAllOfUserUseCase
});
module.exports = __toCommonJS(get_all_of_user_exports);
var import_zod3 = require("zod");

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
var import_zod = require("zod");
var UserSchemas = class {
  static {
    __name(this, "UserSchemas");
  }
  static emailSchema = import_zod.z.string().email("Invalid email format").min(1, "Email is required").max(255, "Email cannot exceed 255 characters");
  static nameSchema = import_zod.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static userIdSchema = import_zod.z.number().int("User ID must be an integer").positive("User ID must be positive");
  static passwordSchema = import_zod.z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number and special character");
  static createUserSchema = import_zod.z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: import_zod.z.string().min(8, "Password hash is required")
  });
  static userEntitySchema = import_zod.z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: import_zod.z.date(),
    passwordHash: import_zod.z.string().min(8, "Password hash is required")
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
var import_zod2 = __toESM(require("zod"));
var GetAllOfUserSchemas = class {
  static {
    __name(this, "GetAllOfUserSchemas");
  }
  static requestSchema = import_zod2.default.object({
    userId: UserSchemas.userIdSchema
  });
  static httpRequestSchema = import_zod2.default.object({
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
    if (error instanceof import_zod3.ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return GetAllOfUserResponse.failure("Failed to fetch transactions", errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return GetAllOfUserResponse.failure("Failed to fetch transactions", [
      message
    ]);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllOfUserUseCase
});
//# sourceMappingURL=index.js.map