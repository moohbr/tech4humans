"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var import_zod = require("zod");
var BankSchemas = class {
  static {
    __name(this, "BankSchemas");
  }
  static nameSchema = import_zod.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static createBankSchema = import_zod.z.object({
    name: this.nameSchema
  });
  static bankEntitySchema = import_zod.z.object({
    name: this.nameSchema
  });
};

// app/domain/models/user/schemas/index.ts
var import_zod2 = require("zod");
var UserSchemas = class {
  static {
    __name(this, "UserSchemas");
  }
  static emailSchema = import_zod2.z.string().email("Invalid email format").min(1, "Email is required").max(255, "Email cannot exceed 255 characters");
  static nameSchema = import_zod2.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static userIdSchema = import_zod2.z.number().int("User ID must be an integer").positive("User ID must be positive");
  static passwordSchema = import_zod2.z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number and special character");
  static createUserSchema = import_zod2.z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: import_zod2.z.string().min(8, "Password hash is required")
  });
  static userEntitySchema = import_zod2.z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: import_zod2.z.date(),
    passwordHash: import_zod2.z.string().min(8, "Password hash is required")
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

// app/domain/use-cases/account/update-of-a-user/schemas.ts
var import_zod4 = require("zod");
var UpdateAccountOfUserSchemas = class {
  static {
    __name(this, "UpdateAccountOfUserSchemas");
  }
  static requestSchema = import_zod4.z.object({
    accountId: AccountSchemas.accountIdSchema,
    account: import_zod4.z.object({
      type: AccountSchemas.accountTypeSchema.optional()
    })
  });
  static httpRequestSchema = import_zod4.z.object({
    params: import_zod4.z.object({
      accountId: AccountSchemas.accountIdSchema
    }),
    body: this.requestSchema
  });
};

// app/domain/use-cases/account/update-of-a-user/request.ts
var UpdateAccountOfUserRequest = class _UpdateAccountOfUserRequest {
  static {
    __name(this, "UpdateAccountOfUserRequest");
  }
  accountId;
  accountType;
  constructor(accountId, accountType) {
    this.accountId = accountId;
    this.accountType = accountType;
  }
  getAccountId() {
    return this.accountId.getValue();
  }
  getAccountIdVO() {
    return this.accountId;
  }
  getAccountType() {
    if (!this.accountType) {
      throw new Error("Account type not provided");
    }
    return this.accountType;
  }
  hasAccountType() {
    return this.accountType !== void 0;
  }
  static createFromRaw(raw) {
    const parsed = UpdateAccountOfUserSchemas.httpRequestSchema.parse(raw);
    const accountType = parsed.body.account.type ? AccountTypeVO.create(parsed.body.account.type) : void 0;
    return new _UpdateAccountOfUserRequest(AccountId.create(parsed.params.accountId), accountType);
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

// app/domain/models/account/entity/index.ts
var AccountEntity = class _AccountEntity {
  static {
    __name(this, "AccountEntity");
  }
  id;
  type;
  balance;
  createdAt;
  userId;
  bankName;
  constructor(id, type, balance, createdAt, userId, bankName) {
    this.id = id;
    this.type = type;
    this.balance = balance;
    this.createdAt = createdAt;
    this.userId = userId;
    this.bankName = bankName;
  }
  static create(type, balance, userId, bankName) {
    const validated = AccountSchemas.createAccountSchema.parse({
      type,
      balance,
      userId,
      bankName
    });
    return new _AccountEntity(AccountId.createNew(), AccountTypeVO.create(validated.type), AccountBalance.create(validated.balance), /* @__PURE__ */ new Date(), UserId.create(userId), BankName.create(bankName));
  }
  static reconstruct(id, type, balance, createdAt, userId, bankName) {
    const validated = AccountSchemas.accountEntitySchema.parse({
      id,
      type,
      balance,
      createdAt
    });
    return new _AccountEntity(AccountId.create(validated.id), AccountTypeVO.create(validated.type), AccountBalance.create(validated.balance), validated.createdAt, UserId.create(userId), BankName.create(bankName));
  }
  toPersistence() {
    return {
      id: this.id.getValue(),
      type: this.type.getValue(),
      balance: this.balance.getValue(),
      createdAt: this.createdAt,
      userId: this.userId.getValue(),
      bankName: this.bankName.getValue()
    };
  }
  toJSON() {
    return {
      id: this.id.getValue(),
      type: this.type.getValue(),
      balance: this.balance.getValue(),
      createdAt: this.createdAt,
      userId: this.userId.getValue(),
      bankName: this.bankName.getValue()
    };
  }
  increaseBalance(amount) {
    this.balance.increase(amount);
  }
  decreaseBalance(amount) {
    this.balance.decrease(amount);
  }
  getBalance() {
    return this.balance.getValue();
  }
  getUserId() {
    return this.userId.getValue();
  }
  setType(type) {
    this.type.setValue(type);
  }
};

// app/domain/use-cases/account/update-of-a-user/response.ts
var UpdateAccountOfUserResponse = class _UpdateAccountOfUserResponse {
  static {
    __name(this, "UpdateAccountOfUserResponse");
  }
  success;
  data;
  error;
  validationErrors;
  constructor(success, data, error, validationErrors) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.validationErrors = validationErrors;
  }
  static success(data) {
    return new _UpdateAccountOfUserResponse(true, data);
  }
  static failure(error) {
    return new _UpdateAccountOfUserResponse(false, void 0, error);
  }
  static validationFailure(errors) {
    return new _UpdateAccountOfUserResponse(false, void 0, void 0, errors);
  }
  isSuccess() {
    return this.success;
  }
  getData() {
    return this.data;
  }
  getError() {
    return this.error;
  }
  getValidationErrors() {
    return this.validationErrors;
  }
};

// app/infrastructure/datasources/databases/typeorm/index.ts
var import_reflect_metadata = require("reflect-metadata");

// app/config/schemas.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_zod5 = require("zod");

// app/config/enums.ts
var NODE_ENV = /* @__PURE__ */ function(NODE_ENV2) {
  NODE_ENV2["DEV"] = "development";
  NODE_ENV2["PROD"] = "production";
  NODE_ENV2["TEST"] = "test";
  return NODE_ENV2;
}({});

// app/config/schemas.ts
var ConfigSchemas = class {
  static {
    __name(this, "ConfigSchemas");
  }
  databasePathSchema = import_zod5.z.string().min(1).refine((val) => val.endsWith(".sqlite"), {
    message: "Database path must end with .sqlite"
  }).refine((val) => import_fs.default.existsSync(import_path.default.resolve(val)), {
    message: "Database file does not exist"
  });
  envSchema = import_zod5.z.object({
    DATABASE_PATH: this.databasePathSchema.default("db.sqlite"),
    APP_PORT: import_zod5.z.coerce.number().default(8080),
    APP_HOST: import_zod5.z.string().optional().default("0.0.0.0"),
    JWT_SECRET: import_zod5.z.string().optional().default("keyboard cat"),
    NODE_ENV: import_zod5.z.nativeEnum(NODE_ENV).default(NODE_ENV.DEV),
    SESSION_SECRET: import_zod5.z.string().optional().default("keyboard cat"),
    OPENAI_API_KEY: import_zod5.z.string().default("")
  });
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

// app/config/index.ts
var result = new ConfigSchemas().envSchema.safeParse(process.env);
if (!result.success) {
  throw new ValidationError("Invalid environment variables: " + JSON.stringify(result.error?.format(), null, 2));
} else {
  logger.info("Environment variables are valid");
}
Object.entries(result.data).forEach(([key, value]) => {
  if (value !== void 0) {
    process.env[key] = String(value);
  }
});

// app/infrastructure/datasources/databases/typeorm/models/bank.ts
var import_typeorm4 = require("typeorm");

// app/infrastructure/datasources/databases/typeorm/models/account.ts
var import_typeorm3 = require("typeorm");

// app/infrastructure/datasources/databases/typeorm/models/user.ts
var import_typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
var User = class {
  static {
    __name(this, "User");
  }
  id;
  name;
  email;
  passwordHash;
  accounts;
  createdAt;
};
_ts_decorate([
  (0, import_typeorm.PrimaryGeneratedColumn)(),
  _ts_metadata("design:type", Number)
], User.prototype, "id", void 0);
_ts_decorate([
  (0, import_typeorm.Column)({
    type: "text"
  }),
  _ts_metadata("design:type", String)
], User.prototype, "name", void 0);
_ts_decorate([
  (0, import_typeorm.Column)({
    type: "text",
    unique: true
  }),
  _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
  (0, import_typeorm.Column)({
    type: "text",
    name: "password_hash"
  }),
  _ts_metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
_ts_decorate([
  (0, import_typeorm.OneToMany)(() => Account, (account) => account.user, {
    onDelete: "CASCADE"
  }),
  _ts_metadata("design:type", Array)
], User.prototype, "accounts", void 0);
_ts_decorate([
  (0, import_typeorm.CreateDateColumn)(),
  _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "createdAt", void 0);
User = _ts_decorate([
  (0, import_typeorm.Entity)({
    name: "users"
  })
], User);

// app/infrastructure/datasources/databases/typeorm/models/transactions.ts
var import_typeorm2 = require("typeorm");
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function _ts_metadata2(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata2, "_ts_metadata");
var Transaction = class {
  static {
    __name(this, "Transaction");
  }
  id;
  type;
  sourceAccount;
  destinationAccount;
  amount;
  description;
  transactionDate;
};
_ts_decorate2([
  (0, import_typeorm2.PrimaryGeneratedColumn)(),
  _ts_metadata2("design:type", Number)
], Transaction.prototype, "id", void 0);
_ts_decorate2([
  (0, import_typeorm2.Column)({
    type: "text",
    enum: TransactionType,
    default: TransactionType.DEBITO
  }),
  _ts_metadata2("design:type", typeof TransactionType === "undefined" ? Object : TransactionType)
], Transaction.prototype, "type", void 0);
_ts_decorate2([
  (0, import_typeorm2.ManyToOne)(() => Account, {
    nullable: true
  }),
  _ts_metadata2("design:type", typeof Account === "undefined" ? Object : Account)
], Transaction.prototype, "sourceAccount", void 0);
_ts_decorate2([
  (0, import_typeorm2.ManyToOne)(() => Account, {
    nullable: true
  }),
  _ts_metadata2("design:type", typeof Account === "undefined" ? Object : Account)
], Transaction.prototype, "destinationAccount", void 0);
_ts_decorate2([
  (0, import_typeorm2.Column)({
    type: "decimal",
    precision: 12,
    scale: 2
  }),
  _ts_metadata2("design:type", Number)
], Transaction.prototype, "amount", void 0);
_ts_decorate2([
  (0, import_typeorm2.Column)({
    type: "text",
    nullable: true
  }),
  _ts_metadata2("design:type", String)
], Transaction.prototype, "description", void 0);
_ts_decorate2([
  (0, import_typeorm2.Column)({
    type: "datetime",
    default: /* @__PURE__ */ __name(() => "CURRENT_TIMESTAMP", "default")
  }),
  _ts_metadata2("design:type", typeof Date === "undefined" ? Object : Date)
], Transaction.prototype, "transactionDate", void 0);
Transaction = _ts_decorate2([
  (0, import_typeorm2.Entity)({
    name: "transactions"
  })
], Transaction);

// app/infrastructure/datasources/databases/typeorm/models/account.ts
function _ts_decorate3(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate3, "_ts_decorate");
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
var Account = class {
  static {
    __name(this, "Account");
  }
  id;
  type;
  balance;
  user;
  bank;
  transactions;
  createdAt;
};
_ts_decorate3([
  (0, import_typeorm3.PrimaryGeneratedColumn)(),
  _ts_metadata3("design:type", Number)
], Account.prototype, "id", void 0);
_ts_decorate3([
  (0, import_typeorm3.Column)({
    type: "text",
    enum: AccountType,
    default: AccountType.CORRENTE
  }),
  _ts_metadata3("design:type", typeof AccountType === "undefined" ? Object : AccountType)
], Account.prototype, "type", void 0);
_ts_decorate3([
  (0, import_typeorm3.Column)({
    type: "decimal",
    precision: 12,
    scale: 2,
    default: 0
  }),
  _ts_metadata3("design:type", Number)
], Account.prototype, "balance", void 0);
_ts_decorate3([
  (0, import_typeorm3.ManyToOne)(() => User, (user) => user.accounts),
  _ts_metadata3("design:type", typeof User === "undefined" ? Object : User)
], Account.prototype, "user", void 0);
_ts_decorate3([
  (0, import_typeorm3.ManyToOne)(() => Bank, (bank) => bank.accounts),
  _ts_metadata3("design:type", typeof Bank === "undefined" ? Object : Bank)
], Account.prototype, "bank", void 0);
_ts_decorate3([
  (0, import_typeorm3.OneToMany)(() => Transaction, (t) => t.sourceAccount),
  _ts_metadata3("design:type", Array)
], Account.prototype, "transactions", void 0);
_ts_decorate3([
  (0, import_typeorm3.CreateDateColumn)(),
  _ts_metadata3("design:type", typeof Date === "undefined" ? Object : Date)
], Account.prototype, "createdAt", void 0);
Account = _ts_decorate3([
  (0, import_typeorm3.Entity)({
    name: "accounts"
  })
], Account);

// app/infrastructure/datasources/databases/typeorm/models/bank.ts
function _ts_decorate4(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate4, "_ts_decorate");
function _ts_metadata4(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata4, "_ts_metadata");
var Bank = class {
  static {
    __name(this, "Bank");
  }
  name;
  accounts;
};
_ts_decorate4([
  (0, import_typeorm4.PrimaryColumn)({
    type: "text",
    unique: true
  }),
  _ts_metadata4("design:type", String)
], Bank.prototype, "name", void 0);
_ts_decorate4([
  (0, import_typeorm4.OneToMany)(() => Account, (account) => account.bank, {
    onDelete: "CASCADE"
  }),
  _ts_metadata4("design:type", Array)
], Bank.prototype, "accounts", void 0);
Bank = _ts_decorate4([
  (0, import_typeorm4.Entity)({
    name: "banks"
  })
], Bank);

// app/infrastructure/datasources/databases/typeorm/index.ts
var import_path2 = __toESM(require("path"));
var import_typeorm5 = require("typeorm");
var migrationsPath = import_path2.default.resolve(__dirname, "../../../../../migrations/");
var AppDataSource = new import_typeorm5.DataSource({
  type: "sqlite",
  database: process.env.DATABASE_PATH,
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV !== "development",
  entities: [
    User,
    Bank,
    Account,
    Transaction
  ],
  migrations: [
    migrationsPath + "/*{.ts,.js}"
  ],
  migrationsTableName: "migrations"
});

// app/domain/errors/not-found-error.ts
var NotFoundError = class _NotFoundError extends DomainError {
  static {
    __name(this, "NotFoundError");
  }
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _NotFoundError.prototype);
  }
  getStatusCode() {
    return 404;
  }
};

// app/domain/errors/account/account-not-found-error.ts
var AccountNotFoundError = class _AccountNotFoundError extends NotFoundError {
  static {
    __name(this, "AccountNotFoundError");
  }
  constructor(accountId) {
    super(accountId ? `Account with ID ${accountId} not found` : "Account not found");
    Object.setPrototypeOf(this, _AccountNotFoundError.prototype);
  }
};

// app/domain/use-cases/account/update-of-a-user/index.ts
var UpdateAccountOfUserUseCase = class {
  static {
    __name(this, "UpdateAccountOfUserUseCase");
  }
  accountRepository;
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }
  async execute(request) {
    try {
      const account = await AppDataSource.transaction(async (manager) => {
        const account2 = await this.accountRepository.findById(request.getAccountIdVO(), manager);
        if (!account2) {
          throw new AccountNotFoundError(request.getAccountId().toString());
        }
        if (request.hasAccountType()) {
          account2.setType(request.getAccountType().getValue());
        }
        await this.accountRepository.update(request.getAccountIdVO(), account2, manager);
        return account2;
      });
      return UpdateAccountOfUserResponse.success(account);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return UpdateAccountOfUserResponse.failure(message);
  }
};

// app/domain/use-cases/account/update-of-a-user/index.spec.ts
jest.mock("@infrastructure/datasources/databases/typeorm", () => ({
  AppDataSource: {
    transaction: jest.fn()
  }
}));
var mockAccountRepository = {
  withTransaction: jest.fn(),
  create: jest.fn(),
  findByUserId: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};
describe("UpdateAccountOfUserUseCase", () => {
  const useCase = new UpdateAccountOfUserUseCase(mockAccountRepository);
  const accountId = AccountId.create(123);
  const requestWithType = new UpdateAccountOfUserRequest(accountId, AccountTypeVO.create(AccountType.POUPANCA));
  const requestWithoutType = new UpdateAccountOfUserRequest(accountId);
  const mockAccount = AccountEntity.create(AccountType.CORRENTE, 1e3, 1, "Bank A");
  const mockManager = {};
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should successfully update account type", async () => {
    mockAccountRepository.findById.mockResolvedValue(mockAccount);
    mockAccountRepository.update.mockResolvedValue(mockAccount);
    AppDataSource.transaction.mockImplementation(async (callback) => {
      return callback(mockManager);
    });
    const response = await useCase.execute(requestWithType);
    expect(response.isSuccess()).toBe(true);
    expect(response.getData()).toBe(mockAccount);
    expect(mockAccountRepository.findById).toHaveBeenCalledWith(accountId, mockManager);
    expect(mockAccountRepository.update).toHaveBeenCalledWith(accountId, mockAccount, mockManager);
  });
  it("should handle account not found", async () => {
    mockAccountRepository.findById.mockResolvedValue(null);
    AppDataSource.transaction.mockImplementation(async (callback) => {
      return callback(mockManager);
    });
    const response = await useCase.execute(requestWithType);
    expect(response.isSuccess()).toBe(false);
    expect(response.getError()).toMatch(`Account with ID ${accountId.getValue()} not found`);
    expect(mockAccountRepository.update).not.toHaveBeenCalled();
  });
  it("should handle request without account type (partial update)", async () => {
    mockAccountRepository.findById.mockResolvedValue(mockAccount);
    mockAccountRepository.update.mockResolvedValue(mockAccount);
    AppDataSource.transaction.mockImplementation(async (callback) => {
      return callback(mockManager);
    });
    const response = await useCase.execute(requestWithoutType);
    expect(response.isSuccess()).toBe(true);
    expect(response.getData()).toBe(mockAccount);
    expect(mockAccountRepository.findById).toHaveBeenCalledWith(accountId, mockManager);
    expect(mockAccountRepository.update).toHaveBeenCalledWith(accountId, mockAccount, mockManager);
  });
  it("should handle validation failure for missing account ID", async () => {
    try {
      const invalidRequest = UpdateAccountOfUserRequest.createFromRaw({
        params: {},
        body: {
          account: {
            type: AccountType.POUPANCA
          }
        }
      });
      fail("Expected validation error for missing accountId");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it("should handle validation failure for invalid account type", async () => {
    try {
      const invalidRequest = UpdateAccountOfUserRequest.createFromRaw({
        params: {
          accountId: "123"
        },
        body: {
          account: {
            type: "INVALID_TYPE"
          }
        }
      });
      fail("Expected validation error for invalid account type");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
//# sourceMappingURL=index.spec.js.map