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

// app/infrastructure/http/routes/v1/users/controllers/create.ts
var create_exports = {};
__export(create_exports, {
  CreateUserController: () => CreateUserController
});
module.exports = __toCommonJS(create_exports);

// app/domain/use-cases/user/create/schemas.ts
var import_zod4 = require("zod");

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

// app/infrastructure/datasources/databases/typeorm/models/enums.ts
var AccountType = /* @__PURE__ */ function(AccountType2) {
  AccountType2["CORRENTE"] = "Corrente";
  AccountType2["POUPANCA"] = "Poupan\xE7a";
  AccountType2["CREDITO"] = "Cr\xE9dito";
  AccountType2["INVESTIMENTO"] = "Investimento";
  return AccountType2;
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

// app/domain/models/account/schemas/index.ts
var import_zod3 = require("zod");
var AccountSchemas = class {
  static {
    __name(this, "AccountSchemas");
  }
  static nameSchema = import_zod3.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static accountIdSchema = import_zod3.z.number().int("Account ID must be an integer").positive("Account ID must be positive");
  static accountTypeSchema = import_zod3.z.nativeEnum(AccountType);
  static balanceSchema = import_zod3.z.number().refine((val) => Number.isFinite(val), {
    message: "Balance must be a finite number"
  });
  static createAccountSchema = import_zod3.z.object({
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    userId: UserSchemas.userIdSchema,
    bankName: BankSchemas.nameSchema
  });
  static accountEntitySchema = import_zod3.z.object({
    id: this.accountIdSchema,
    name: this.nameSchema,
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    createdAt: import_zod3.z.date()
  });
};

// app/domain/use-cases/user/create/schemas.ts
var CreateUserSchemas = class {
  static {
    __name(this, "CreateUserSchemas");
  }
  static requestSchema = import_zod4.z.object({
    account: import_zod4.z.object({
      type: AccountSchemas.accountTypeSchema,
      balance: AccountSchemas.balanceSchema
    }),
    bank: import_zod4.z.object({
      name: BankSchemas.nameSchema
    }),
    user: import_zod4.z.object({
      name: UserSchemas.nameSchema,
      email: UserSchemas.emailSchema,
      password: UserSchemas.passwordSchema
    })
  });
  static httpRequestSchema = import_zod4.z.object({
    body: this.requestSchema
  });
};

// app/domain/models/user/value-objects/name.ts
var UserName = class _UserName {
  static {
    __name(this, "UserName");
  }
  value;
  constructor(value) {
    this.value = value;
  }
  static create(name) {
    const validatedName = UserSchemas.nameSchema.parse(name);
    return new _UserName(validatedName);
  }
  getValue() {
    return this.value;
  }
  equals(other) {
    return this.value === other.value;
  }
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

// app/domain/errors/user/invalid-email-error.ts
var InvalidEmailError = class _InvalidEmailError extends ValidationError {
  static {
    __name(this, "InvalidEmailError");
  }
  constructor(email) {
    super(`Invalid email format: ${email}`);
    Object.setPrototypeOf(this, _InvalidEmailError.prototype);
  }
};

// app/domain/models/user/value-objects/email.ts
var UserEmail = class _UserEmail {
  static {
    __name(this, "UserEmail");
  }
  value;
  constructor(value) {
    this.value = value;
    this.validateEmail();
  }
  static create(email) {
    return new _UserEmail(email);
  }
  getValue() {
    return this.value;
  }
  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new InvalidEmailError(this.value);
    }
  }
  equals(other) {
    return this.value === other.value;
  }
};

// app/domain/errors/user/invalid-password-error.ts
var InvalidPasswordError = class _InvalidPasswordError extends ValidationError {
  static {
    __name(this, "InvalidPasswordError");
  }
  constructor(message) {
    super(message, []);
    Object.setPrototypeOf(this, _InvalidPasswordError.prototype);
  }
};

// app/domain/models/user/value-objects/password.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var UserPassword = class _UserPassword {
  static {
    __name(this, "UserPassword");
  }
  value;
  isHashed;
  constructor(value, isHashed = false) {
    this.value = value;
    this.isHashed = isHashed;
    if (!isHashed) {
      this.validatePassword();
    }
  }
  static create(plainPassword) {
    return new _UserPassword(plainPassword, false);
  }
  static createFromHash(hashedPassword) {
    return new _UserPassword(hashedPassword, true);
  }
  async hash() {
    if (this.isHashed) {
      return this;
    }
    const hashedValue = await import_bcryptjs.default.hash(this.value, 10);
    return new _UserPassword(hashedValue, true);
  }
  async compare(plainPassword) {
    if (!this.isHashed) {
      throw new InvalidPasswordError("Cannot compare with unhashed password");
    }
    return import_bcryptjs.default.compare(plainPassword, this.value);
  }
  getValue() {
    return this.value;
  }
  isHashedPassword() {
    return this.isHashed;
  }
  validatePassword() {
    if (!this.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      throw new InvalidPasswordError("Password must contain at least 8 characters with uppercase, lowercase, number and special character");
    }
  }
};

// app/domain/errors/account/invalid-balance-error.ts
var InvalidBalanceError = class _InvalidBalanceError extends ValidationError {
  static {
    __name(this, "InvalidBalanceError");
  }
  constructor(value) {
    super(`Balance must be a finite number. Got: ${value}`);
    Object.setPrototypeOf(this, _InvalidBalanceError.prototype);
  }
};

// app/domain/models/account/value-objects/balance.ts
var AccountBalance = class _AccountBalance {
  static {
    __name(this, "AccountBalance");
  }
  value;
  constructor(value) {
    this.value = value;
    if (!Number.isFinite(value)) {
      throw new InvalidBalanceError(value);
    }
  }
  static create(type) {
    const validatedType = AccountSchemas.balanceSchema.parse(type);
    return new _AccountBalance(validatedType);
  }
  getValue() {
    return this.value;
  }
  isNegative() {
    return this.value < 0;
  }
  isPositive() {
    return this.value > 0;
  }
  isZero() {
    return this.value === 0;
  }
  increase(amount) {
    this.value += amount;
  }
  decrease(amount) {
    this.value -= amount;
  }
};

// app/domain/models/bank/value-objects/name.ts
var BankName = class _BankName {
  static {
    __name(this, "BankName");
  }
  value;
  constructor(value) {
    this.value = value;
  }
  static create(value) {
    const validated = BankSchemas.nameSchema.parse(value);
    return new _BankName(validated);
  }
  getValue() {
    return this.value;
  }
  equals(other) {
    return this.value === other.value;
  }
};

// app/domain/models/account/value-objects/type.ts
var AccountTypeVO = class _AccountTypeVO {
  static {
    __name(this, "AccountTypeVO");
  }
  value;
  constructor(value) {
    this.value = value;
  }
  static create(type) {
    const validatedType = AccountSchemas.accountTypeSchema.parse(type);
    return new _AccountTypeVO(validatedType);
  }
  getValue() {
    return this.value;
  }
  setValue(value) {
    this.value = value;
  }
};

// app/domain/use-cases/user/create/request.ts
var CreateUserRequest = class _CreateUserRequest {
  static {
    __name(this, "CreateUserRequest");
  }
  name;
  email;
  password;
  accountType;
  accountBalance;
  bankName;
  constructor(name, email, password, accountType, accountBalance, bankName) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.accountType = accountType;
    this.accountBalance = accountBalance;
    this.bankName = bankName;
  }
  static createFromRaw(raw) {
    const parsed = CreateUserSchemas.requestSchema.parse(raw);
    return new _CreateUserRequest(UserName.create(parsed.user.name), UserEmail.create(parsed.user.email), UserPassword.create(parsed.user.password), AccountTypeVO.create(parsed.account.type), AccountBalance.create(parsed.account.balance), BankName.create(parsed.bank.name));
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getAccountType() {
    return this.accountType;
  }
  getAccountBalance() {
    return this.accountBalance;
  }
  getBankName() {
    return this.bankName;
  }
};

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
var import_zod5 = require("zod");
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
    if (error instanceof import_zod5.ZodError) {
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

// app/infrastructure/http/routes/v1/users/controllers/create.ts
var CreateUserController = class extends BaseController {
  static {
    __name(this, "CreateUserController");
  }
  createUserUseCase;
  constructor(createUserUseCase) {
    super(), this.createUserUseCase = createUserUseCase;
  }
  async handle(req, res) {
    try {
      logger.info("Creating user", {
        body: req.body
      });
      const request = CreateUserRequest.createFromRaw({
        ...req.body
      });
      logger.info("Request created", {
        request
      });
      const response = await this.createUserUseCase.execute(request);
      logger.info("Response", {
        response
      });
      if (response.isSuccess()) {
        logger.info("Response is success", {
          response
        });
        const user = response.getUser();
        logger.info("User", {
          user
        });
        this.sendSuccessResponse(res, response.getMessage(), user.toJSON(), 201);
        return;
      }
      logger.info("Response is not success", {
        response
      });
      const statusCode = this.getErrorStatusCode(response.getMessage(), response.hasErrors());
      logger.info("Status code", {
        statusCode
      });
      this.sendErrorResponse(res, response.getMessage(), response.getErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "CreateUserController");
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserController
});
//# sourceMappingURL=create.js.map