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

// app/domain/models/transaction/schemas/index.ts
var import_zod4 = require("zod");
var TransactionSchemas = class {
  static {
    __name(this, "TransactionSchemas");
  }
  static transactionIdSchema = import_zod4.z.number().int("Transaction ID must be an integer").positive("Transaction ID must be positive");
  static amountSchema = import_zod4.z.number().refine((val) => Number.isFinite(val), {
    message: "Amount must be a finite number"
  });
  static descriptionSchema = import_zod4.z.string().min(2, "Description must have at least 2 characters").max(255, "Description cannot exceed 255 characters");
  static accountIdSchema = AccountSchemas.accountIdSchema;
  static transactionDateSchema = import_zod4.z.date();
  static transactionTypeSchema = import_zod4.z.nativeEnum(TransactionType);
  static createTransactionSchema = import_zod4.z.object({
    amount: this.amountSchema,
    description: this.descriptionSchema,
    destinationAccountId: this.accountIdSchema,
    sourceAccountId: this.accountIdSchema,
    type: this.transactionTypeSchema
  });
  static transactionEntitySchema = import_zod4.z.object({
    id: this.transactionIdSchema,
    amount: this.amountSchema,
    description: this.descriptionSchema,
    destinationAccountId: this.accountIdSchema,
    sourceAccountId: this.accountIdSchema,
    type: this.transactionTypeSchema
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

// app/domain/errors/transaction/invalid-transaction-id-error.ts
var InvalidTransactionIdError = class _InvalidTransactionIdError extends ValidationError {
  static {
    __name(this, "InvalidTransactionIdError");
  }
  constructor(id) {
    super(`Invalid transaction id: ${id}`);
    Object.setPrototypeOf(this, _InvalidTransactionIdError.prototype);
  }
};

// app/domain/models/transaction/value-objects/id.ts
var TransactionId = class _TransactionId {
  static {
    __name(this, "TransactionId");
  }
  value;
  isNewId;
  constructor(value, isNewId = false) {
    this.value = value;
    this.isNewId = isNewId;
  }
  static create(id) {
    const validatedId = TransactionSchemas.transactionIdSchema.parse(id);
    return new _TransactionId(validatedId, false);
  }
  static createNew() {
    return new _TransactionId(null, true);
  }
  static createFromDatabase(id) {
    const validatedId = TransactionSchemas.transactionIdSchema.parse(id);
    return new _TransactionId(validatedId, false);
  }
  static createUnsafe(id) {
    return new _TransactionId(id, false);
  }
  getValue() {
    if (this.value === null) {
      throw new InvalidTransactionIdError("new");
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

// app/domain/models/transaction/value-objects/description.ts
var TransactionDescription = class _TransactionDescription {
  static {
    __name(this, "TransactionDescription");
  }
  value;
  constructor(value) {
    this.value = value;
  }
  static create(value) {
    const validatedDescription = TransactionSchemas.descriptionSchema.parse(value);
    return new _TransactionDescription(validatedDescription);
  }
  getValue() {
    return this.value;
  }
  equals(other) {
    return this.value === other.value;
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

// app/domain/models/transaction/entity/index.ts
var TransactionEntity = class _TransactionEntity {
  static {
    __name(this, "TransactionEntity");
  }
  id;
  amount;
  description;
  destinationAccountId;
  sourceAccountId;
  type;
  constructor(id, amount, description, destinationAccountId, sourceAccountId, type) {
    this.id = id;
    this.amount = amount;
    this.description = description;
    this.destinationAccountId = destinationAccountId;
    this.sourceAccountId = sourceAccountId;
    this.type = type;
  }
  static create(params) {
    const validatedData = TransactionSchemas.createTransactionSchema.parse(params);
    return new _TransactionEntity(null, TransactionAmount.create(validatedData.amount), TransactionDescription.create(validatedData.description), AccountId.create(validatedData.destinationAccountId), AccountId.create(validatedData.sourceAccountId), TransactionTypeVo.create(validatedData.type));
  }
  static createFromDatabase(params) {
    const validatedData = TransactionSchemas.transactionEntitySchema.parse(params);
    return new _TransactionEntity(TransactionId.create(validatedData.id), TransactionAmount.create(validatedData.amount), TransactionDescription.create(validatedData.description), AccountId.create(validatedData.destinationAccountId), AccountId.create(validatedData.sourceAccountId), TransactionTypeVo.create(validatedData.type));
  }
  getId() {
    return this.id;
  }
  getDestinationAccountId() {
    return this.destinationAccountId;
  }
  getSourceAccountId() {
    return this.sourceAccountId;
  }
  getAmount() {
    return this.amount;
  }
  getDescription() {
    return this.description;
  }
  getType() {
    return this.type;
  }
  toPersistence() {
    return {
      id: this.id?.getValue() ?? 0,
      amount: this.amount.getValue(),
      description: this.description.getValue(),
      destinationAccountId: this.destinationAccountId.getValue(),
      sourceAccountId: this.sourceAccountId.getValue(),
      type: this.type.getValue()
    };
  }
  toJSON() {
    return {
      id: this.id?.getValue() ?? 0,
      amount: this.amount.getValue(),
      description: this.description.getValue(),
      destinationAccountId: this.destinationAccountId.getValue(),
      sourceAccountId: this.sourceAccountId.getValue(),
      type: this.type.getValue()
    };
  }
  static reconstruct(params) {
    return new _TransactionEntity(TransactionId.create(params.id), TransactionAmount.create(params.amount), TransactionDescription.create(params.description), AccountId.create(params.destinationAccountId), AccountId.create(params.sourceAccountId), TransactionTypeVo.create(params.type));
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

// app/domain/use-cases/transaction/add-to-a-user/index.ts
var import_zod6 = require("zod");

// app/domain/use-cases/transaction/add-to-a-user/response.ts
var AddTransactionToUserResponse = class _AddTransactionToUserResponse {
  static {
    __name(this, "AddTransactionToUserResponse");
  }
  transaction;
  success;
  message;
  errors;
  constructor(transaction, success, message, errors) {
    this.transaction = transaction;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(transaction) {
    return new _AddTransactionToUserResponse(transaction, true, transaction, []);
  }
  static failure(message, errors = []) {
    const finalErrors = errors.length > 0 ? errors : message ? [
      message
    ] : [];
    return new _AddTransactionToUserResponse(null, false, message, finalErrors);
  }
  static validationFailure(errors) {
    return new _AddTransactionToUserResponse(null, false, "Validation failed", errors);
  }
  getTransaction() {
    if (!this.transaction) {
      throw new InvalidTransactionIdError("Cannot get transaction from failed response");
    }
    return this.transaction;
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

// app/domain/errors/transaction/insufficient-funds-error.ts
var InsufficientFundsError = class _InsufficientFundsError extends ValidationError {
  static {
    __name(this, "InsufficientFundsError");
  }
  constructor() {
    super("Insufficient funds");
    Object.setPrototypeOf(this, _InsufficientFundsError.prototype);
  }
};

// app/domain/errors/transaction/invalid-transaction-type-error.ts
var InvalidTransactionTypeError = class _InvalidTransactionTypeError extends ValidationError {
  static {
    __name(this, "InvalidTransactionTypeError");
  }
  constructor() {
    super("Invalid transaction type");
    Object.setPrototypeOf(this, _InvalidTransactionTypeError.prototype);
  }
};

// app/domain/use-cases/transaction/add-to-a-user/index.ts
var AddTransactionToUserUseCase = class {
  static {
    __name(this, "AddTransactionToUserUseCase");
  }
  accountRepository;
  transactionRepository;
  constructor(accountRepository, transactionRepository) {
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
  }
  async execute(request) {
    try {
      const transaction = await AppDataSource.transaction(async (manager) => {
        const sourceAccount = await this.accountRepository.findById(request.getSourceAccountIdVO(), manager);
        const destinationAccount = await this.accountRepository.findById(request.getDestinationAccountIdVO(), manager);
        if (!sourceAccount) {
          throw new AccountNotFoundError(request.getSourceAccountIdVO().getValue().toString());
        }
        if (!destinationAccount) {
          throw new AccountNotFoundError(request.getDestinationAccountIdVO().getValue().toString());
        }
        switch (request.getType()) {
          case TransactionType.TRANSFERENCIA:
            if (sourceAccount.getBalance() < request.getAmount()) {
              throw new InsufficientFundsError();
            }
            const transferAmount = request.getAmount();
            sourceAccount.decreaseBalance(transferAmount);
            destinationAccount.increaseBalance(transferAmount);
            break;
          default:
            throw new InvalidTransactionTypeError();
        }
        await this.accountRepository.update(request.getSourceAccountIdVO(), sourceAccount, manager);
        await this.accountRepository.update(request.getDestinationAccountIdVO(), destinationAccount, manager);
        const newTransaction = TransactionEntity.create({
          type: request.getType(),
          amount: request.getAmount(),
          sourceAccountId: request.getSourceAccountId(),
          destinationAccountId: request.getDestinationAccountId(),
          description: `
          ${request.getType()} from ${request.getSourceAccountId()} to ${request.getDestinationAccountId()} with amount ${request.getAmount()}`
        });
        return await this.transactionRepository.create(newTransaction, manager);
      });
      return AddTransactionToUserResponse.success(transaction);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof import_zod6.ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return AddTransactionToUserResponse.validationFailure(errors);
    }
    if (error instanceof AccountNotFoundError) {
      return AddTransactionToUserResponse.failure("", [
        error.message
      ]);
    }
    if (error instanceof InsufficientFundsError) {
      return AddTransactionToUserResponse.failure("", [
        error.message
      ]);
    }
    if (error instanceof InvalidTransactionTypeError) {
      return AddTransactionToUserResponse.failure("", [
        error.message
      ]);
    }
    if (error instanceof Error) {
      if (error.message.includes("Description must have at least 2 characters")) {
        return AddTransactionToUserResponse.failure("", [
          error.message
        ]);
      }
      return AddTransactionToUserResponse.failure(error.message);
    }
    return AddTransactionToUserResponse.failure("Unknown error occurred");
  }
};

// app/domain/use-cases/transaction/add-to-a-user/index.spec.ts
jest.mock("@infrastructure/datasources/databases/typeorm");
describe("AddTransactionToUserUseCase", () => {
  let useCase;
  let mockAccountRepository;
  let mockTransactionRepository;
  let mockManager;
  let mockRequest;
  beforeEach(() => {
    mockAccountRepository = {
      findById: jest.fn(),
      update: jest.fn()
    };
    mockTransactionRepository = {
      create: jest.fn()
    };
    mockManager = {};
    mockRequest = {
      getSourceAccountIdVO: jest.fn(),
      getDestinationAccountIdVO: jest.fn(),
      getType: jest.fn(),
      getAmount: jest.fn(),
      getSourceAccountId: jest.fn(),
      getDestinationAccountId: jest.fn()
    };
    AppDataSource.transaction = jest.fn().mockImplementation((callback) => callback(mockManager));
    useCase = new AddTransactionToUserUseCase(mockAccountRepository, mockTransactionRepository);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("Successful Transaction", () => {
    it("should successfully transfer money between accounts", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);
      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(100);
      mockRequest.getSourceAccountId.mockReturnValue(1);
      mockRequest.getDestinationAccountId.mockReturnValue(2);
      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500),
        decreaseBalance: jest.fn()
      };
      const destinationAccount = {
        increaseBalance: jest.fn()
      };
      const createdTransaction = {
        id: "trans-789",
        type: TransactionType.TRANSFERENCIA,
        amount: 100
      };
      mockAccountRepository.findById.mockResolvedValueOnce(sourceAccount).mockResolvedValueOnce(destinationAccount);
      mockTransactionRepository.create.mockResolvedValue(createdTransaction);
      const result2 = await useCase.execute(mockRequest);
      expect(result2.isSuccess()).toBe(true);
      expect(result2.getMessage()).toEqual(createdTransaction);
      expect(mockRequest.getSourceAccountIdVO).toHaveBeenCalledTimes(2);
      expect(mockRequest.getDestinationAccountIdVO).toHaveBeenCalledTimes(2);
      expect(mockRequest.getType).toHaveBeenCalledTimes(3);
      expect(mockRequest.getAmount).toHaveBeenCalledTimes(4);
      expect(sourceAccount.decreaseBalance).toHaveBeenCalledWith(100);
      expect(destinationAccount.increaseBalance).toHaveBeenCalledWith(100);
      expect(mockAccountRepository.update).toHaveBeenCalledTimes(2);
      expect(mockTransactionRepository.create).toHaveBeenCalledWith(expect.any(TransactionEntity), mockManager);
    });
  });
  describe("Account Not Found Errors", () => {
    it("should return error when source account is not found", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);
      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      const destinationAccount = {};
      mockAccountRepository.findById.mockResolvedValueOnce(null).mockResolvedValueOnce(destinationAccount);
      const result2 = await useCase.execute(mockRequest);
      expect(result2.isSuccess()).toBe(false);
      expect(result2.getErrors()).toContain(`Account with ID ${sourceAccountId.getValue()} not found`);
      expect(mockAccountRepository.update).not.toHaveBeenCalled();
      expect(mockTransactionRepository.create).not.toHaveBeenCalled();
    });
    it("should return error when destination account is not found", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);
      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      const sourceAccount = {};
      mockAccountRepository.findById.mockResolvedValueOnce(sourceAccount).mockResolvedValueOnce(null);
      const result2 = await useCase.execute(mockRequest);
      expect(result2.isSuccess()).toBe(false);
      expect(result2.getErrors()).toContain(`Account with ID ${destinationAccountId.getValue()} not found`);
      expect(mockAccountRepository.update).not.toHaveBeenCalled();
      expect(mockTransactionRepository.create).not.toHaveBeenCalled();
    });
  });
  describe("Insufficient Funds Error", () => {
    it("should return error when source account has insufficient funds", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);
      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(1e3);
      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500)
      };
      const destinationAccount = {};
      mockAccountRepository.findById.mockResolvedValueOnce(sourceAccount).mockResolvedValueOnce(destinationAccount);
      const result2 = await useCase.execute(mockRequest);
      expect(result2.isSuccess()).toBe(false);
      expect(result2.getErrors()).toContain("Insufficient funds");
      expect(mockAccountRepository.update).not.toHaveBeenCalled();
      expect(mockTransactionRepository.create).not.toHaveBeenCalled();
    });
  });
  describe("Invalid Transaction Type Error", () => {
    it("should return error for unsupported transaction type", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);
      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue("INVALID_TYPE");
      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500)
      };
      const destinationAccount = {};
      mockAccountRepository.findById.mockResolvedValueOnce(sourceAccount).mockResolvedValueOnce(destinationAccount);
      const result2 = await useCase.execute(mockRequest);
      expect(result2.isSuccess()).toBe(false);
      expect(result2.getErrors()).toContain("Invalid transaction type");
      expect(mockAccountRepository.update).not.toHaveBeenCalled();
      expect(mockTransactionRepository.create).not.toHaveBeenCalled();
    });
  });
  describe("Database Transaction Rollback", () => {
    it("should rollback transaction when an error occurs", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);
      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(100);
      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500),
        decreaseBalance: jest.fn()
      };
      const destinationAccount = {
        increaseBalance: jest.fn()
      };
      mockAccountRepository.findById.mockResolvedValueOnce(sourceAccount).mockResolvedValueOnce(destinationAccount);
      mockAccountRepository.update.mockRejectedValue(new Error("Update failed"));
      const result2 = await useCase.execute(mockRequest);
      expect(result2.isSuccess()).toBe(false);
      expect(result2.getErrors()).toContain("Update failed");
      expect(AppDataSource.transaction).toHaveBeenCalled();
    });
  });
  describe("Edge Cases", () => {
    it("should handle zero amount transactions", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);
      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(0);
      mockRequest.getSourceAccountId.mockReturnValue(1);
      mockRequest.getDestinationAccountId.mockReturnValue(2);
      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500),
        decreaseBalance: jest.fn()
      };
      const destinationAccount = {
        increaseBalance: jest.fn()
      };
      const createdTransaction = {
        id: "trans-789",
        type: TransactionType.TRANSFERENCIA,
        amount: 0
      };
      mockAccountRepository.findById.mockResolvedValueOnce(sourceAccount).mockResolvedValueOnce(destinationAccount);
      mockTransactionRepository.create.mockResolvedValue(createdTransaction);
      const result2 = await useCase.execute(mockRequest);
      expect(result2.isSuccess()).toBe(true);
      expect(sourceAccount.decreaseBalance).toHaveBeenCalledWith(0);
      expect(destinationAccount.increaseBalance).toHaveBeenCalledWith(0);
    });
    it("should handle same account transfer (source equals destination)", async () => {
      const accountId = AccountId.create(1);
      mockRequest.getSourceAccountIdVO.mockReturnValue(accountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(accountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(100);
      mockRequest.getSourceAccountId.mockReturnValue(1);
      mockRequest.getDestinationAccountId.mockReturnValue(1);
      const account = {
        getBalance: jest.fn().mockReturnValue(500),
        decreaseBalance: jest.fn(),
        increaseBalance: jest.fn()
      };
      const createdTransaction = {
        id: "trans-789",
        type: TransactionType.TRANSFERENCIA,
        amount: 100
      };
      mockAccountRepository.findById.mockResolvedValue(account);
      mockTransactionRepository.create.mockResolvedValue(createdTransaction);
      const result2 = await useCase.execute(mockRequest);
      expect(result2.isSuccess()).toBe(true);
      expect(account.decreaseBalance).toHaveBeenCalledWith(100);
      expect(account.increaseBalance).toHaveBeenCalledWith(100);
    });
  });
});
//# sourceMappingURL=index.spec.js.map