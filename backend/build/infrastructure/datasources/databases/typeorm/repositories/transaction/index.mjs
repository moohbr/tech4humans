var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/tsup/assets/esm_shims.js
import path from "path";
import { fileURLToPath } from "url";
var getFilename = /* @__PURE__ */ __name(() => fileURLToPath(import.meta.url), "getFilename");
var getDirname = /* @__PURE__ */ __name(() => path.dirname(getFilename()), "getDirname");
var __dirname = /* @__PURE__ */ getDirname();

// app/infrastructure/datasources/databases/typeorm/repositories/transaction/index.ts
import { Between } from "typeorm";

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
import { z } from "zod";
var BankSchemas = class {
  static {
    __name(this, "BankSchemas");
  }
  static nameSchema = z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static createBankSchema = z.object({
    name: this.nameSchema
  });
  static bankEntitySchema = z.object({
    name: this.nameSchema
  });
};

// app/domain/models/user/schemas/index.ts
import { z as z2 } from "zod";
var UserSchemas = class {
  static {
    __name(this, "UserSchemas");
  }
  static emailSchema = z2.string().email("Invalid email format").min(1, "Email is required").max(255, "Email cannot exceed 255 characters");
  static nameSchema = z2.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static userIdSchema = z2.number().int("User ID must be an integer").positive("User ID must be positive");
  static passwordSchema = z2.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number and special character");
  static createUserSchema = z2.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: z2.string().min(8, "Password hash is required")
  });
  static userEntitySchema = z2.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: z2.date(),
    passwordHash: z2.string().min(8, "Password hash is required")
  });
};

// app/domain/models/account/schemas/index.ts
import { z as z3 } from "zod";
var AccountSchemas = class {
  static {
    __name(this, "AccountSchemas");
  }
  static nameSchema = z3.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static accountIdSchema = z3.number().int("Account ID must be an integer").positive("Account ID must be positive");
  static accountTypeSchema = z3.nativeEnum(AccountType);
  static balanceSchema = z3.number().refine((val) => Number.isFinite(val), {
    message: "Balance must be a finite number"
  });
  static createAccountSchema = z3.object({
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    userId: UserSchemas.userIdSchema,
    bankName: BankSchemas.nameSchema
  });
  static accountEntitySchema = z3.object({
    id: this.accountIdSchema,
    name: this.nameSchema,
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    createdAt: z3.date()
  });
};

// app/domain/models/transaction/schemas/index.ts
import { z as z4 } from "zod";
var TransactionSchemas = class {
  static {
    __name(this, "TransactionSchemas");
  }
  static transactionIdSchema = z4.number().int("Transaction ID must be an integer").positive("Transaction ID must be positive");
  static amountSchema = z4.number().refine((val) => Number.isFinite(val), {
    message: "Amount must be a finite number"
  });
  static descriptionSchema = z4.string().min(2, "Description must have at least 2 characters").max(255, "Description cannot exceed 255 characters");
  static accountIdSchema = AccountSchemas.accountIdSchema;
  static transactionDateSchema = z4.date();
  static transactionTypeSchema = z4.nativeEnum(TransactionType);
  static createTransactionSchema = z4.object({
    amount: this.amountSchema,
    description: this.descriptionSchema,
    destinationAccountId: this.accountIdSchema,
    sourceAccountId: this.accountIdSchema,
    type: this.transactionTypeSchema
  });
  static transactionEntitySchema = z4.object({
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
import "reflect-metadata";

// app/config/schemas.ts
import fs from "fs";
import path2 from "path";
import { z as z5 } from "zod";

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
  databasePathSchema = z5.string().min(1).refine((val) => val.endsWith(".sqlite"), {
    message: "Database path must end with .sqlite"
  }).refine((val) => fs.existsSync(path2.resolve(val)), {
    message: "Database file does not exist"
  });
  envSchema = z5.object({
    DATABASE_PATH: this.databasePathSchema.default("db.sqlite"),
    APP_PORT: z5.coerce.number().default(8080),
    APP_HOST: z5.string().optional().default("0.0.0.0"),
    JWT_SECRET: z5.string().optional().default("keyboard cat"),
    NODE_ENV: z5.nativeEnum(NODE_ENV).default(NODE_ENV.DEV),
    SESSION_SECRET: z5.string().optional().default("keyboard cat"),
    OPENAI_API_KEY: z5.string().default("")
  });
};

// app/infrastructure/logger/index.ts
import winston from "winston";
var consoleFormat = winston.format.combine(winston.format.timestamp({
  format: "YYYY-MM-DD HH:mm:ss"
}), winston.format.errors({
  stack: true
}), winston.format.printf((info) => {
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
var logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? "warn" : "debug"),
  defaultMeta: {
    service: "tech4humans",
    environment: process.env.NODE_ENV || "development"
  },
  transports: [
    new winston.transports.Console({
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
import { Entity as Entity4, OneToMany as OneToMany3, PrimaryColumn } from "typeorm";

// app/infrastructure/datasources/databases/typeorm/models/account.ts
import { Entity as Entity3, PrimaryGeneratedColumn as PrimaryGeneratedColumn3, Column as Column3, ManyToOne as ManyToOne2, OneToMany as OneToMany2, CreateDateColumn as CreateDateColumn2 } from "typeorm";

// app/infrastructure/datasources/databases/typeorm/models/user.ts
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
  PrimaryGeneratedColumn(),
  _ts_metadata("design:type", Number)
], User.prototype, "id", void 0);
_ts_decorate([
  Column({
    type: "text"
  }),
  _ts_metadata("design:type", String)
], User.prototype, "name", void 0);
_ts_decorate([
  Column({
    type: "text",
    unique: true
  }),
  _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
  Column({
    type: "text",
    name: "password_hash"
  }),
  _ts_metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
_ts_decorate([
  OneToMany(() => Account, (account) => account.user, {
    onDelete: "CASCADE"
  }),
  _ts_metadata("design:type", Array)
], User.prototype, "accounts", void 0);
_ts_decorate([
  CreateDateColumn(),
  _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "createdAt", void 0);
User = _ts_decorate([
  Entity({
    name: "users"
  })
], User);

// app/infrastructure/datasources/databases/typeorm/models/transactions.ts
import { Column as Column2, Entity as Entity2, ManyToOne, PrimaryGeneratedColumn as PrimaryGeneratedColumn2 } from "typeorm";
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
  PrimaryGeneratedColumn2(),
  _ts_metadata2("design:type", Number)
], Transaction.prototype, "id", void 0);
_ts_decorate2([
  Column2({
    type: "text",
    enum: TransactionType,
    default: TransactionType.DEBITO
  }),
  _ts_metadata2("design:type", typeof TransactionType === "undefined" ? Object : TransactionType)
], Transaction.prototype, "type", void 0);
_ts_decorate2([
  ManyToOne(() => Account, {
    nullable: true
  }),
  _ts_metadata2("design:type", typeof Account === "undefined" ? Object : Account)
], Transaction.prototype, "sourceAccount", void 0);
_ts_decorate2([
  ManyToOne(() => Account, {
    nullable: true
  }),
  _ts_metadata2("design:type", typeof Account === "undefined" ? Object : Account)
], Transaction.prototype, "destinationAccount", void 0);
_ts_decorate2([
  Column2({
    type: "decimal",
    precision: 12,
    scale: 2
  }),
  _ts_metadata2("design:type", Number)
], Transaction.prototype, "amount", void 0);
_ts_decorate2([
  Column2({
    type: "text",
    nullable: true
  }),
  _ts_metadata2("design:type", String)
], Transaction.prototype, "description", void 0);
_ts_decorate2([
  Column2({
    type: "datetime",
    default: /* @__PURE__ */ __name(() => "CURRENT_TIMESTAMP", "default")
  }),
  _ts_metadata2("design:type", typeof Date === "undefined" ? Object : Date)
], Transaction.prototype, "transactionDate", void 0);
Transaction = _ts_decorate2([
  Entity2({
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
  PrimaryGeneratedColumn3(),
  _ts_metadata3("design:type", Number)
], Account.prototype, "id", void 0);
_ts_decorate3([
  Column3({
    type: "text",
    enum: AccountType,
    default: AccountType.CORRENTE
  }),
  _ts_metadata3("design:type", typeof AccountType === "undefined" ? Object : AccountType)
], Account.prototype, "type", void 0);
_ts_decorate3([
  Column3({
    type: "decimal",
    precision: 12,
    scale: 2,
    default: 0
  }),
  _ts_metadata3("design:type", Number)
], Account.prototype, "balance", void 0);
_ts_decorate3([
  ManyToOne2(() => User, (user) => user.accounts),
  _ts_metadata3("design:type", typeof User === "undefined" ? Object : User)
], Account.prototype, "user", void 0);
_ts_decorate3([
  ManyToOne2(() => Bank, (bank) => bank.accounts),
  _ts_metadata3("design:type", typeof Bank === "undefined" ? Object : Bank)
], Account.prototype, "bank", void 0);
_ts_decorate3([
  OneToMany2(() => Transaction, (t) => t.sourceAccount),
  _ts_metadata3("design:type", Array)
], Account.prototype, "transactions", void 0);
_ts_decorate3([
  CreateDateColumn2(),
  _ts_metadata3("design:type", typeof Date === "undefined" ? Object : Date)
], Account.prototype, "createdAt", void 0);
Account = _ts_decorate3([
  Entity3({
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
  PrimaryColumn({
    type: "text",
    unique: true
  }),
  _ts_metadata4("design:type", String)
], Bank.prototype, "name", void 0);
_ts_decorate4([
  OneToMany3(() => Account, (account) => account.bank, {
    onDelete: "CASCADE"
  }),
  _ts_metadata4("design:type", Array)
], Bank.prototype, "accounts", void 0);
Bank = _ts_decorate4([
  Entity4({
    name: "banks"
  })
], Bank);

// app/infrastructure/datasources/databases/typeorm/index.ts
import path3 from "path";
import { DataSource } from "typeorm";
var migrationsPath = path3.resolve(__dirname, "../../../../../migrations/");
var AppDataSource = new DataSource({
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

// app/domain/errors/transaction/transaction-not-found-error.ts
var TransactionNotFoundError = class _TransactionNotFoundError extends NotFoundError {
  static {
    __name(this, "TransactionNotFoundError");
  }
  constructor(id) {
    super(`Transaction not found: ${id}`);
    Object.setPrototypeOf(this, _TransactionNotFoundError.prototype);
  }
};

// app/infrastructure/datasources/databases/typeorm/repositories/transaction/index.ts
var TypeOrmTransactionRepository = class {
  static {
    __name(this, "TypeOrmTransactionRepository");
  }
  repository;
  constructor(repository = AppDataSource.getRepository(Transaction)) {
    this.repository = repository;
  }
  async findAll() {
    const transactions = await this.repository.find({
      relations: [
        "sourceAccount",
        "destinationAccount"
      ]
    });
    return transactions.map((transaction) => TransactionEntity.reconstruct({
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      destinationAccountId: transaction.destinationAccount.id,
      sourceAccountId: transaction.sourceAccount.id,
      type: transaction.type
    }));
  }
  async findByUserId(userId) {
    const transactions = await this.repository.find({
      where: {
        sourceAccount: {
          user: {
            id: userId.getValue()
          }
        }
      },
      relations: [
        "sourceAccount",
        "destinationAccount"
      ]
    });
    return transactions.map((transaction) => TransactionEntity.reconstruct({
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      destinationAccountId: transaction.destinationAccount.id,
      sourceAccountId: transaction.sourceAccount.id,
      type: transaction.type
    }));
  }
  async create(transactionEntity) {
    const transactionData = transactionEntity.toPersistence();
    const transaction = this.repository.create({
      sourceAccount: {
        id: transactionData.sourceAccountId
      },
      destinationAccount: {
        id: transactionData.destinationAccountId
      },
      amount: transactionData.amount,
      description: transactionData.description,
      type: transactionData.type
    });
    const savedTransaction = await this.repository.save(transaction);
    return TransactionEntity.reconstruct({
      id: savedTransaction.id,
      amount: savedTransaction.amount,
      description: savedTransaction.description,
      destinationAccountId: savedTransaction.destinationAccount.id,
      sourceAccountId: savedTransaction.sourceAccount.id,
      type: savedTransaction.type
    });
  }
  async findById(id) {
    const transaction = await this.repository.findOne({
      where: {
        id: id.getValue()
      },
      relations: [
        "sourceAccount",
        "destinationAccount"
      ]
    });
    if (!transaction) {
      return null;
    }
    return TransactionEntity.reconstruct({
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      destinationAccountId: transaction.destinationAccount.id,
      sourceAccountId: transaction.sourceAccount.id,
      type: transaction.type
    });
  }
  async findByAccountId(accountId) {
    const transactions = await this.repository.find({
      where: [
        {
          sourceAccount: {
            id: accountId.getValue()
          }
        },
        {
          destinationAccount: {
            id: accountId.getValue()
          }
        }
      ],
      relations: [
        "sourceAccount",
        "destinationAccount"
      ],
      order: {
        transactionDate: "DESC"
      }
    });
    return transactions.map((transaction) => TransactionEntity.reconstruct({
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      destinationAccountId: transaction.destinationAccount.id,
      sourceAccountId: transaction.sourceAccount.id,
      type: transaction.type
    }));
  }
  async findByDateRange(startDate, endDate) {
    const transactions = await this.repository.find({
      where: {
        transactionDate: Between(startDate, endDate)
      },
      relations: [
        "sourceAccount",
        "destinationAccount"
      ],
      order: {
        transactionDate: "DESC"
      }
    });
    return transactions.map((transaction) => TransactionEntity.reconstruct({
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      destinationAccountId: transaction.destinationAccount.id,
      sourceAccountId: transaction.sourceAccount.id,
      type: transaction.type
    }));
  }
  async update(id, transactionEntity) {
    const transactionData = transactionEntity.toPersistence();
    const transactionInDatabase = await this.repository.findOne({
      where: {
        id: id.getValue()
      }
    });
    if (!transactionInDatabase) {
      throw new TransactionNotFoundError(id.getValue().toString());
    }
    const updatedTransaction = this.repository.merge(transactionInDatabase, {
      amount: transactionData.amount,
      description: transactionData.description,
      type: transactionData.type,
      sourceAccount: {
        id: transactionData.sourceAccountId
      },
      destinationAccount: {
        id: transactionData.destinationAccountId
      }
    });
    const savedTransaction = await this.repository.save(updatedTransaction);
    return TransactionEntity.reconstruct({
      id: savedTransaction.id,
      amount: savedTransaction.amount,
      description: savedTransaction.description,
      destinationAccountId: savedTransaction.destinationAccount.id,
      sourceAccountId: savedTransaction.sourceAccount.id,
      type: savedTransaction.type
    });
  }
  async delete(id) {
    await this.repository.delete(id.getValue());
  }
  async exists(id) {
    const count = await this.repository.count({
      where: {
        id: id.getValue()
      }
    });
    return count > 0;
  }
};
export {
  TypeOrmTransactionRepository
};
//# sourceMappingURL=index.mjs.map