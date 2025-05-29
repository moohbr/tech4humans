var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/tsup/assets/esm_shims.js
import path from "path";
import { fileURLToPath } from "url";
var getFilename = /* @__PURE__ */ __name(() => fileURLToPath(import.meta.url), "getFilename");
var getDirname = /* @__PURE__ */ __name(() => path.dirname(getFilename()), "getDirname");
var __dirname = /* @__PURE__ */ getDirname();

// app/domain/use-cases/account/add-to-a-user/index.ts
import { ZodError } from "zod";

// app/domain/use-cases/account/add-to-a-user/response.ts
var AddAccountToUserResponse = class _AddAccountToUserResponse {
  static {
    __name(this, "AddAccountToUserResponse");
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
    return new _AddAccountToUserResponse(true, data);
  }
  static failure(error) {
    return new _AddAccountToUserResponse(false, void 0, error);
  }
  static validationFailure(errors) {
    return new _AddAccountToUserResponse(false, void 0, void 0, errors);
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

// app/infrastructure/datasources/databases/typeorm/index.ts
import "reflect-metadata";

// app/config/schemas.ts
import fs from "fs";
import path2 from "path";
import { z as z4 } from "zod";

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
  databasePathSchema = z4.string().min(1).refine((val) => val.endsWith(".sqlite"), {
    message: "Database path must end with .sqlite"
  }).refine((val) => fs.existsSync(path2.resolve(val)), {
    message: "Database file does not exist"
  });
  envSchema = z4.object({
    DATABASE_PATH: this.databasePathSchema.default("db.sqlite"),
    APP_PORT: z4.coerce.number().default(8080),
    APP_HOST: z4.string().optional().default("0.0.0.0"),
    JWT_SECRET: z4.string().optional().default("keyboard cat"),
    NODE_ENV: z4.nativeEnum(NODE_ENV).default(NODE_ENV.DEV),
    SESSION_SECRET: z4.string().optional().default("keyboard cat"),
    OPENAI_API_KEY: z4.string().default("")
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

// app/domain/errors/user/user-not-found-error.ts
var UserNotFoundError = class _UserNotFoundError extends NotFoundError {
  static {
    __name(this, "UserNotFoundError");
  }
  constructor(userId) {
    super(userId ? `User with ID ${userId} not found` : "User not found");
    Object.setPrototypeOf(this, _UserNotFoundError.prototype);
  }
};

// app/domain/use-cases/account/add-to-a-user/index.ts
var AddAccountToUserUseCase = class {
  static {
    __name(this, "AddAccountToUserUseCase");
  }
  accountRepository;
  userRepository;
  constructor(accountRepository, userRepository) {
    this.accountRepository = accountRepository;
    this.userRepository = userRepository;
  }
  async execute(request) {
    try {
      const userId = request.getUserIdVO();
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new UserNotFoundError(userId.getValue().toString());
      }
      const account = AccountEntity.create(request.getAccountTypeVO().getValue(), request.getInitialBalanceVO().getValue(), userId.getValue(), request.getBankNameVO().getValue());
      const savedAccount = await AppDataSource.transaction(async (manager) => {
        return await this.accountRepository.create(account, manager);
      });
      return AddAccountToUserResponse.success(savedAccount);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return AddAccountToUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return AddAccountToUserResponse.failure(message);
  }
};
export {
  AddAccountToUserUseCase
};
//# sourceMappingURL=index.mjs.map