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

// app/infrastructure/http/routes/v1/transaction/controllers/add-to-a-user.ts
var add_to_a_user_exports = {};
__export(add_to_a_user_exports, {
  AddTransactionToUserController: () => AddTransactionToUserController
});
module.exports = __toCommonJS(add_to_a_user_exports);

// app/infrastructure/logger/index.ts
var import_winston = __toESM(require("winston"));
var consoleFormat = import_winston.default.format.combine(import_winston.default.format.timestamp({
  format: "YYYY-MM-DD HH:mm:ss"
}), import_winston.default.format.errors({
  stack: true
}), import_winston.default.format.printf((info) => {
  const { timestamp, level, message, stack, ...meta } = info;
  const levelColors = {
    error: "\x1B[31m",
    warn: "\x1B[33m",
    info: "\x1B[32m",
    debug: "\x1B[36m",
    verbose: "\x1B[35m"
  };
  const resetColor = "\x1B[0m";
  const levelColor = levelColors[level] || "";
  let logMessage = `${timestamp} [${levelColor}${level.toUpperCase()}${resetColor}]: ${message}`;
  if (stack) {
    logMessage += `
${stack}`;
  }
  const excludeFields = [
    "timestamp",
    "level",
    "message",
    "stack"
  ];
  const filteredMeta = Object.keys(meta).filter((key) => !excludeFields.includes(key)).reduce((obj, key) => {
    obj[key] = meta[key];
    return obj;
  }, {});
  const metaKeys = Object.keys(filteredMeta);
  if (metaKeys.length > 0) {
    const metaString = JSON.stringify(filteredMeta, null, 2);
    logMessage += `
${metaString}`;
  }
  return logMessage;
}));
var isProduction = process.env.NODE_ENV === "production";
var logger = import_winston.default.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? "warn" : "debug"),
  defaultMeta: {
    service: "tech4humans",
    environment: process.env.NODE_ENV || "development"
  },
  transports: [
    new import_winston.default.transports.Console({
      format: consoleFormat,
      handleExceptions: true,
      handleRejections: true
    })
  ],
  exitOnError: false
});

// app/infrastructure/http/routes/base/controller.ts
var import_zod = require("zod");
var BaseController = class {
  static {
    __name(this, "BaseController");
  }
  sendSuccessResponse(res, message, data, statusCode = 200) {
    const response = {
      message
    };
    if (data !== void 0) {
      response.data = data;
    }
    res.status(statusCode).json(response);
  }
  sendErrorResponse(res, message, errors = [], statusCode = 422) {
    logger.error("BaseController.sendErrorResponse", message);
    res.status(statusCode).json({
      message,
      errors
    });
  }
  getErrorStatusCode(message, hasValidationErrors) {
    if (hasValidationErrors) return 400;
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("invalid credentials") || lowerMessage.includes("authentication failed")) {
      return 401;
    }
    if (lowerMessage.includes("unauthorized") || lowerMessage.includes("permission") || lowerMessage.includes("account locked") || lowerMessage.includes("account disabled")) {
      return 403;
    }
    if (lowerMessage.includes("not found")) {
      return 404;
    }
    if (lowerMessage.includes("already exists") || lowerMessage.includes("duplicate")) {
      return 409;
    }
    return 422;
  }
  handleControllerError(error, res, controllerName) {
    if (error instanceof import_zod.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code
      }));
      res.status(400).json({
        success: false,
        message: "Invalid request format",
        errors
      });
      return;
    }
    logger.error(`${controllerName} Error:`, error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
  validateRequiredParam(param, paramName, res) {
    if (!param) {
      this.sendErrorResponse(res, `${paramName} is required`, [
        `${paramName} parameter is missing`
      ], 400);
      return false;
    }
    return true;
  }
};

// app/infrastructure/datasources/databases/typeorm/models/enums.ts
var AccountType = /* @__PURE__ */ function(AccountType2) {
  AccountType2["CORRENTE"] = "Corrente";
  AccountType2["POUPANCA"] = "Poupan\xE7a";
  AccountType2["CREDITO"] = "Cr\xE9dito";
  AccountType2["INVESTIMENTO"] = "Investimento";
  return AccountType2;
}({});
var TransactionType = /* @__PURE__ */ function(TransactionType2) {
  TransactionType2["DEBITO"] = "D\xE9bito";
  TransactionType2["CREDITO"] = "Cr\xE9dito";
  TransactionType2["TRANSFERENCIA"] = "Transfer\xEAncia";
  return TransactionType2;
}({});

// app/domain/models/bank/schemas/index.ts
var import_zod2 = require("zod");
var BankSchemas = class {
  static {
    __name(this, "BankSchemas");
  }
  static nameSchema = import_zod2.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static createBankSchema = import_zod2.z.object({
    name: this.nameSchema
  });
  static bankEntitySchema = import_zod2.z.object({
    name: this.nameSchema
  });
};

// app/domain/models/user/schemas/index.ts
var import_zod3 = require("zod");
var UserSchemas = class {
  static {
    __name(this, "UserSchemas");
  }
  static emailSchema = import_zod3.z.string().email("Invalid email format").min(1, "Email is required").max(255, "Email cannot exceed 255 characters");
  static nameSchema = import_zod3.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static userIdSchema = import_zod3.z.number().int("User ID must be an integer").positive("User ID must be positive");
  static passwordSchema = import_zod3.z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number and special character");
  static createUserSchema = import_zod3.z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: import_zod3.z.string().min(8, "Password hash is required")
  });
  static userEntitySchema = import_zod3.z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: import_zod3.z.date(),
    passwordHash: import_zod3.z.string().min(8, "Password hash is required")
  });
};

// app/domain/models/account/schemas/index.ts
var import_zod4 = require("zod");
var AccountSchemas = class {
  static {
    __name(this, "AccountSchemas");
  }
  static nameSchema = import_zod4.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static accountIdSchema = import_zod4.z.number().int("Account ID must be an integer").positive("Account ID must be positive");
  static accountTypeSchema = import_zod4.z.nativeEnum(AccountType);
  static balanceSchema = import_zod4.z.number().refine((val) => Number.isFinite(val), {
    message: "Balance must be a finite number"
  });
  static createAccountSchema = import_zod4.z.object({
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    userId: UserSchemas.userIdSchema,
    bankName: BankSchemas.nameSchema
  });
  static accountEntitySchema = import_zod4.z.object({
    id: this.accountIdSchema,
    name: this.nameSchema,
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    createdAt: import_zod4.z.date()
  });
};

// app/domain/models/transaction/schemas/index.ts
var import_zod5 = require("zod");
var TransactionSchemas = class {
  static {
    __name(this, "TransactionSchemas");
  }
  static transactionIdSchema = import_zod5.z.number().int("Transaction ID must be an integer").positive("Transaction ID must be positive");
  static amountSchema = import_zod5.z.number().refine((val) => Number.isFinite(val), {
    message: "Amount must be a finite number"
  });
  static descriptionSchema = import_zod5.z.string().min(2, "Description must have at least 2 characters").max(255, "Description cannot exceed 255 characters");
  static accountIdSchema = AccountSchemas.accountIdSchema;
  static transactionDateSchema = import_zod5.z.date();
  static transactionTypeSchema = import_zod5.z.nativeEnum(TransactionType);
  static createTransactionSchema = import_zod5.z.object({
    amount: this.amountSchema,
    description: this.descriptionSchema,
    destinationAccountId: this.accountIdSchema,
    sourceAccountId: this.accountIdSchema,
    type: this.transactionTypeSchema
  });
  static transactionEntitySchema = import_zod5.z.object({
    id: this.transactionIdSchema,
    amount: this.amountSchema,
    description: this.descriptionSchema,
    destinationAccountId: this.accountIdSchema,
    sourceAccountId: this.accountIdSchema,
    type: this.transactionTypeSchema
  });
};

// app/domain/use-cases/transaction/add-to-a-user/schemas.ts
var import_zod6 = require("zod");
var AddTransactionToUserSchemas = class {
  static {
    __name(this, "AddTransactionToUserSchemas");
  }
  static requestSchema = import_zod6.z.object({
    params: import_zod6.z.object({
      sourceAccountId: AccountSchemas.accountIdSchema,
      destinationAccountId: AccountSchemas.accountIdSchema
    }),
    transaction: import_zod6.z.object({
      type: TransactionSchemas.transactionTypeSchema,
      amount: TransactionSchemas.amountSchema
    })
  });
  static httpRequestSchema = import_zod6.z.object({
    params: import_zod6.z.object({
      sourceAccountId: AccountSchemas.accountIdSchema,
      destinationAccountId: AccountSchemas.accountIdSchema
    }),
    body: import_zod6.z.object({
      transaction: import_zod6.z.object({
        type: TransactionSchemas.transactionTypeSchema,
        amount: TransactionSchemas.amountSchema
      })
    })
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

// app/domain/errors/account/invalid-account-id-error.ts
var InvalidAccountIdError = class _InvalidAccountIdError extends ValidationError {
  static {
    __name(this, "InvalidAccountIdError");
  }
  constructor() {
    super("Cannot get value of new AccountId before persistence");
    Object.setPrototypeOf(this, _InvalidAccountIdError.prototype);
  }
};

// app/domain/models/account/value-objects/id.ts
var AccountId = class _AccountId {
  static {
    __name(this, "AccountId");
  }
  value;
  isNewId;
  constructor(value, isNewId = false) {
    this.value = value;
    this.isNewId = isNewId;
  }
  static create(id) {
    const validatedId = AccountSchemas.accountIdSchema.parse(id);
    return new _AccountId(validatedId, false);
  }
  static createNew() {
    return new _AccountId(null, true);
  }
  static createFromDatabase(id) {
    const validatedId = AccountSchemas.accountIdSchema.parse(id);
    return new _AccountId(validatedId, false);
  }
  static createUnsafe(id) {
    return new _AccountId(id, false);
  }
  getValue() {
    if (this.value === null) {
      throw new InvalidAccountIdError();
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
    return this.value?.toString() ?? "";
  }
};

// app/domain/models/transaction/value-objects/type.ts
var TransactionTypeVo = class _TransactionTypeVo {
  static {
    __name(this, "TransactionTypeVo");
  }
  value;
  constructor(value) {
    this.value = value;
  }
  static create(value) {
    const validatedType = TransactionSchemas.transactionTypeSchema.parse(value);
    return new _TransactionTypeVo(validatedType);
  }
  getValue() {
    return this.value;
  }
  equals(other) {
    return this.value === other.value;
  }
};

// app/domain/models/transaction/value-objects/amount.ts
var TransactionAmount = class _TransactionAmount {
  static {
    __name(this, "TransactionAmount");
  }
  value;
  constructor(value) {
    this.value = value;
  }
  static create(value) {
    const validatedAmount = TransactionSchemas.amountSchema.parse(value);
    return new _TransactionAmount(validatedAmount);
  }
  getValue() {
    return this.value;
  }
  equals(other) {
    return this.value === other.value;
  }
};

// app/domain/use-cases/transaction/add-to-a-user/request.ts
var AddTransactionToUserRequest = class _AddTransactionToUserRequest {
  static {
    __name(this, "AddTransactionToUserRequest");
  }
  sourceAccountId;
  destinationAccountId;
  type;
  amount;
  constructor(sourceAccountId, destinationAccountId, type, amount) {
    this.sourceAccountId = sourceAccountId;
    this.destinationAccountId = destinationAccountId;
    this.type = type;
    this.amount = amount;
  }
  static createFromRaw(raw) {
    const parsed = AddTransactionToUserSchemas.httpRequestSchema.parse(raw);
    return new _AddTransactionToUserRequest(AccountId.create(parsed.params.sourceAccountId), AccountId.create(parsed.params.destinationAccountId), TransactionTypeVo.create(parsed.body.transaction.type), TransactionAmount.create(parsed.body.transaction.amount));
  }
  // Return primitive values for schema validation
  getSourceAccountId() {
    return this.sourceAccountId.getValue();
  }
  getDestinationAccountId() {
    return this.destinationAccountId.getValue();
  }
  getType() {
    return this.type.getValue();
  }
  getAmount() {
    return this.amount.getValue();
  }
  // Return value objects for domain logic
  getSourceAccountIdVO() {
    return this.sourceAccountId;
  }
  getDestinationAccountIdVO() {
    return this.destinationAccountId;
  }
  getTypeVO() {
    return this.type;
  }
  getAmountVO() {
    return this.amount;
  }
};

// app/infrastructure/http/routes/v1/transaction/controllers/add-to-a-user.ts
var AddTransactionToUserController = class extends BaseController {
  static {
    __name(this, "AddTransactionToUserController");
  }
  addTransactionToUserUseCase;
  constructor(addTransactionToUserUseCase) {
    super(), this.addTransactionToUserUseCase = addTransactionToUserUseCase;
  }
  async handle(req, res) {
    try {
      const userId = req.params.userId;
      if (!this.validateRequiredParam(userId, "User ID", res)) return;
      const request = AddTransactionToUserRequest.createFromRaw({
        userId,
        ...req.body
      });
      const response = await this.addTransactionToUserUseCase.execute(request);
      if (response.isSuccess()) {
        const transaction = response.getTransaction();
        this.sendSuccessResponse(res, response.getMessage(), transaction.toJSON(), 201);
        return;
      }
      const statusCode = this.getErrorStatusCode(response.getMessage(), response.hasErrors());
      this.sendErrorResponse(res, response.getMessage(), response.getErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "AddTransactionToUserController");
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddTransactionToUserController
});
//# sourceMappingURL=add-to-a-user.js.map