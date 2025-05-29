var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/tsup/assets/esm_shims.js
import path from "path";
import { fileURLToPath } from "url";
var getFilename = /* @__PURE__ */ __name(() => fileURLToPath(import.meta.url), "getFilename");
var getDirname = /* @__PURE__ */ __name(() => path.dirname(getFilename()), "getDirname");
var __dirname = /* @__PURE__ */ getDirname();

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

// app/infrastructure/datasources/databases/typeorm/models/account.ts
import { Entity as Entity4, PrimaryGeneratedColumn as PrimaryGeneratedColumn3, Column as Column3, ManyToOne as ManyToOne2, OneToMany as OneToMany3, CreateDateColumn as CreateDateColumn2 } from "typeorm";

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

// app/infrastructure/datasources/databases/typeorm/models/bank.ts
import { Entity as Entity2, OneToMany as OneToMany2, PrimaryColumn } from "typeorm";
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
var Bank = class {
  static {
    __name(this, "Bank");
  }
  name;
  accounts;
};
_ts_decorate2([
  PrimaryColumn({
    type: "text",
    unique: true
  }),
  _ts_metadata2("design:type", String)
], Bank.prototype, "name", void 0);
_ts_decorate2([
  OneToMany2(() => Account, (account) => account.bank, {
    onDelete: "CASCADE"
  }),
  _ts_metadata2("design:type", Array)
], Bank.prototype, "accounts", void 0);
Bank = _ts_decorate2([
  Entity2({
    name: "banks"
  })
], Bank);

// app/infrastructure/datasources/databases/typeorm/models/transactions.ts
import { Column as Column2, Entity as Entity3, ManyToOne, PrimaryGeneratedColumn as PrimaryGeneratedColumn2 } from "typeorm";
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
_ts_decorate3([
  PrimaryGeneratedColumn2(),
  _ts_metadata3("design:type", Number)
], Transaction.prototype, "id", void 0);
_ts_decorate3([
  Column2({
    type: "text",
    enum: TransactionType,
    default: TransactionType.DEBITO
  }),
  _ts_metadata3("design:type", typeof TransactionType === "undefined" ? Object : TransactionType)
], Transaction.prototype, "type", void 0);
_ts_decorate3([
  ManyToOne(() => Account, {
    nullable: true
  }),
  _ts_metadata3("design:type", typeof Account === "undefined" ? Object : Account)
], Transaction.prototype, "sourceAccount", void 0);
_ts_decorate3([
  ManyToOne(() => Account, {
    nullable: true
  }),
  _ts_metadata3("design:type", typeof Account === "undefined" ? Object : Account)
], Transaction.prototype, "destinationAccount", void 0);
_ts_decorate3([
  Column2({
    type: "decimal",
    precision: 12,
    scale: 2
  }),
  _ts_metadata3("design:type", Number)
], Transaction.prototype, "amount", void 0);
_ts_decorate3([
  Column2({
    type: "text",
    nullable: true
  }),
  _ts_metadata3("design:type", String)
], Transaction.prototype, "description", void 0);
_ts_decorate3([
  Column2({
    type: "datetime",
    default: /* @__PURE__ */ __name(() => "CURRENT_TIMESTAMP", "default")
  }),
  _ts_metadata3("design:type", typeof Date === "undefined" ? Object : Date)
], Transaction.prototype, "transactionDate", void 0);
Transaction = _ts_decorate3([
  Entity3({
    name: "transactions"
  })
], Transaction);

// app/infrastructure/datasources/databases/typeorm/models/account.ts
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
_ts_decorate4([
  PrimaryGeneratedColumn3(),
  _ts_metadata4("design:type", Number)
], Account.prototype, "id", void 0);
_ts_decorate4([
  Column3({
    type: "text",
    enum: AccountType,
    default: AccountType.CORRENTE
  }),
  _ts_metadata4("design:type", typeof AccountType === "undefined" ? Object : AccountType)
], Account.prototype, "type", void 0);
_ts_decorate4([
  Column3({
    type: "decimal",
    precision: 12,
    scale: 2,
    default: 0
  }),
  _ts_metadata4("design:type", Number)
], Account.prototype, "balance", void 0);
_ts_decorate4([
  ManyToOne2(() => User, (user) => user.accounts),
  _ts_metadata4("design:type", typeof User === "undefined" ? Object : User)
], Account.prototype, "user", void 0);
_ts_decorate4([
  ManyToOne2(() => Bank, (bank) => bank.accounts),
  _ts_metadata4("design:type", typeof Bank === "undefined" ? Object : Bank)
], Account.prototype, "bank", void 0);
_ts_decorate4([
  OneToMany3(() => Transaction, (t) => t.sourceAccount),
  _ts_metadata4("design:type", Array)
], Account.prototype, "transactions", void 0);
_ts_decorate4([
  CreateDateColumn2(),
  _ts_metadata4("design:type", typeof Date === "undefined" ? Object : Date)
], Account.prototype, "createdAt", void 0);
Account = _ts_decorate4([
  Entity4({
    name: "accounts"
  })
], Account);

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

// app/infrastructure/datasources/databases/typeorm/repositories/account/index.ts
var TypeOrmAccountRepository = class _TypeOrmAccountRepository {
  static {
    __name(this, "TypeOrmAccountRepository");
  }
  repository;
  constructor(repository = AppDataSource.getRepository(Account)) {
    this.repository = repository;
  }
  withTransaction(manager) {
    return new _TypeOrmAccountRepository(manager.getRepository(Account));
  }
  async create(accountEntity) {
    const data = accountEntity.toPersistence();
    const account = this.repository.create({
      type: data.type,
      balance: data.balance,
      createdAt: data.createdAt,
      user: {
        id: data.userId
      },
      bank: {
        name: data.bankName
      }
    });
    const saved = await this.repository.save(account);
    return AccountEntity.reconstruct(saved.id, saved.type, saved.balance, saved.createdAt, saved.user.id, saved.bank.name);
  }
  async findById(id) {
    const account = await this.repository.findOne({
      where: {
        id: id.getValue()
      },
      relations: [
        "user",
        "bank"
      ]
    });
    if (!account) return null;
    return AccountEntity.reconstruct(account.id, account.type, account.balance, account.createdAt, account.user.id, account.bank.name);
  }
  async findByUserId(userId) {
    const accounts = await this.repository.find({
      where: {
        user: {
          id: userId.getValue()
        }
      },
      relations: [
        "user",
        "bank"
      ]
    });
    if (!accounts) return [];
    return accounts.map((account) => AccountEntity.reconstruct(account.id, account.type, account.balance, account.createdAt, account.user.id, account.bank.name));
  }
  async update(id, accountEntity) {
    const accountInDb = await this.repository.findOne({
      where: {
        id: id.getValue()
      },
      relations: [
        "user",
        "bank"
      ]
    });
    if (!accountInDb) throw new AccountNotFoundError(id.getValue().toString());
    const data = accountEntity.toPersistence();
    const updated = this.repository.merge(accountInDb, {
      type: data.type,
      balance: data.balance,
      user: {
        id: data.userId
      },
      bank: {
        name: data.bankName
      }
    });
    const saved = await this.repository.save(updated);
    return AccountEntity.reconstruct(saved.id, saved.type, saved.balance, saved.createdAt, saved.user.id, saved.bank.name);
  }
  async delete(id) {
    await this.repository.delete(id.getValue());
  }
};

// app/domain/models/bank/entity/index.ts
var BankEntity = class _BankEntity {
  static {
    __name(this, "BankEntity");
  }
  name;
  constructor(name) {
    this.name = name;
  }
  static create(name) {
    const validated = BankSchemas.createBankSchema.parse({
      name
    });
    return new _BankEntity(BankName.create(validated.name));
  }
  static reconstruct(name) {
    const validated = BankSchemas.bankEntitySchema.parse({
      name
    });
    return new _BankEntity(BankName.create(validated.name));
  }
  getName() {
    return this.name;
  }
  toJSON() {
    return {
      name: this.name.getValue()
    };
  }
  toPersistence() {
    return {
      name: this.name.getValue()
    };
  }
};

// app/infrastructure/datasources/databases/typeorm/repositories/bank/index.ts
var TypeOrmBankRepository = class _TypeOrmBankRepository {
  static {
    __name(this, "TypeOrmBankRepository");
  }
  repository;
  constructor(repository = AppDataSource.getRepository(Bank)) {
    this.repository = repository;
  }
  withTransaction(manager) {
    return new _TypeOrmBankRepository(manager.getRepository(Bank));
  }
  async findByName(name) {
    const bank = await this.repository.findOne({
      where: {
        name: name.getValue()
      }
    });
    if (!bank) {
      return null;
    }
    return BankEntity.reconstruct(bank.name);
  }
  async findAll() {
    const banks = await this.repository.find();
    return banks.map((bank) => BankEntity.reconstruct(bank.name));
  }
  async delete(name) {
    await this.repository.delete(name.getValue());
  }
};

// app/infrastructure/datasources/databases/typeorm/repositories/transaction/index.ts
import { Between } from "typeorm";

// app/domain/models/transaction/schemas/index.ts
import { z as z5 } from "zod";
var TransactionSchemas = class {
  static {
    __name(this, "TransactionSchemas");
  }
  static transactionIdSchema = z5.number().int("Transaction ID must be an integer").positive("Transaction ID must be positive");
  static amountSchema = z5.number().refine((val) => Number.isFinite(val), {
    message: "Amount must be a finite number"
  });
  static descriptionSchema = z5.string().min(2, "Description must have at least 2 characters").max(255, "Description cannot exceed 255 characters");
  static accountIdSchema = AccountSchemas.accountIdSchema;
  static transactionDateSchema = z5.date();
  static transactionTypeSchema = z5.nativeEnum(TransactionType);
  static createTransactionSchema = z5.object({
    amount: this.amountSchema,
    description: this.descriptionSchema,
    destinationAccountId: this.accountIdSchema,
    sourceAccountId: this.accountIdSchema,
    type: this.transactionTypeSchema
  });
  static transactionEntitySchema = z5.object({
    id: this.transactionIdSchema,
    amount: this.amountSchema,
    description: this.descriptionSchema,
    destinationAccountId: this.accountIdSchema,
    sourceAccountId: this.accountIdSchema,
    type: this.transactionTypeSchema
  });
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
import bcrypt from "bcryptjs";
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
    const hashedValue = await bcrypt.hash(this.value, 10);
    return new _UserPassword(hashedValue, true);
  }
  async compare(plainPassword) {
    if (!this.isHashed) {
      throw new InvalidPasswordError("Cannot compare with unhashed password");
    }
    return bcrypt.compare(plainPassword, this.value);
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

// app/domain/models/user/entity/index.ts
var UserEntity = class _UserEntity {
  static {
    __name(this, "UserEntity");
  }
  id;
  name;
  email;
  createdAt;
  password;
  constructor(id, name, email, createdAt, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.password = password;
  }
  static create(name, email, passwordHash) {
    const validatedData = UserSchemas.createUserSchema.parse({
      name,
      email,
      passwordHash
    });
    return new _UserEntity(UserId.createNew(), UserName.create(validatedData.name), UserEmail.create(validatedData.email), /* @__PURE__ */ new Date(), UserPassword.createFromHash(passwordHash));
  }
  static reconstruct(id, name, email, createdAt, passwordHash) {
    const validatedData = UserSchemas.userEntitySchema.parse({
      id,
      name,
      email,
      createdAt,
      passwordHash
    });
    return new _UserEntity(UserId.createFromDatabase(validatedData.id), UserName.create(validatedData.name), UserEmail.create(validatedData.email), validatedData.createdAt, UserPassword.createFromHash(passwordHash));
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getPasswordHash() {
    return this.password.getValue();
  }
  toPersistence() {
    return {
      id: this.id.isNew() ? null : this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt,
      passwordHash: this.password.getValue()
    };
  }
  toJSON() {
    return {
      id: this.id.isNew() ? null : this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt
    };
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

// app/infrastructure/datasources/databases/typeorm/repositories/user/index.ts
var TypeOrmUserRepository = class _TypeOrmUserRepository {
  static {
    __name(this, "TypeOrmUserRepository");
  }
  repository;
  constructor(repository = AppDataSource.getRepository(User)) {
    this.repository = repository;
  }
  withTransaction(manager) {
    return new _TypeOrmUserRepository(manager.getRepository(User));
  }
  async create(userEntity) {
    logger.info("Creating user", {
      userEntity
    });
    const userData = userEntity.toPersistence();
    logger.info("User data", {
      userData
    });
    const user = this.repository.create({
      name: userData.name,
      email: userData.email,
      createdAt: userData.createdAt,
      passwordHash: userData.passwordHash
    });
    logger.info("User created", {
      user
    });
    const savedUser = await this.repository.save(user);
    logger.info("User saved", {
      savedUser
    });
    return UserEntity.reconstruct(savedUser.id, savedUser.name, savedUser.email, savedUser.createdAt, savedUser.passwordHash);
  }
  async findByEmail(email) {
    const user = await this.repository.findOne({
      where: {
        email: email.getValue()
      }
    });
    if (!user) {
      return null;
    }
    return UserEntity.reconstruct(user.id, user.name, user.email, user.createdAt, user.passwordHash);
  }
  async findById(id) {
    const user = await this.repository.findOne({
      where: {
        id: id.getValue()
      }
    });
    if (!user) {
      return null;
    }
    return UserEntity.reconstruct(user.id, user.name, user.email, user.createdAt, user.passwordHash);
  }
  async exists(email) {
    const count = await this.repository.count({
      where: {
        email: email.getValue()
      }
    });
    return count > 0;
  }
  async update(id, userEntity) {
    const userData = userEntity.toPersistence();
    const userInDatabase = await this.repository.findOne({
      where: {
        id: id.getValue()
      }
    });
    if (!userInDatabase) {
      throw new UserNotFoundError(id.getValue().toString());
    }
    const updatedUser = this.repository.merge(userInDatabase, {
      name: userData.name,
      email: userData.email,
      passwordHash: userData.passwordHash
    });
    const savedUser = await this.repository.save(updatedUser);
    return UserEntity.reconstruct(savedUser.id, savedUser.name, savedUser.email, savedUser.createdAt, savedUser.passwordHash);
  }
  async delete(id) {
    await this.repository.delete(id.getValue());
  }
};

// app/domain/errors/dependency-not-found-error.ts
var DependencyNotFoundError = class _DependencyNotFoundError extends DomainError {
  static {
    __name(this, "DependencyNotFoundError");
  }
  constructor(dependencyName) {
    super(`Dependency ${dependencyName} not found`);
    Object.setPrototypeOf(this, _DependencyNotFoundError.prototype);
  }
  getStatusCode() {
    return 500;
  }
};

// app/domain/use-cases/account/add-to-a-user/schemas.ts
import { z as z6 } from "zod";
var AddAccountToUserSchemas = class {
  static {
    __name(this, "AddAccountToUserSchemas");
  }
  static requestSchema = z6.object({
    user: z6.object({
      id: UserSchemas.userIdSchema
    }),
    account: z6.object({
      type: AccountSchemas.accountTypeSchema,
      balance: AccountSchemas.balanceSchema,
      bankName: BankSchemas.nameSchema
    })
  });
  static httpRequestSchema = z6.object({
    body: this.requestSchema
  });
};

// app/domain/use-cases/account/add-to-a-user/request.ts
var AddAccountToUserRequest = class _AddAccountToUserRequest {
  static {
    __name(this, "AddAccountToUserRequest");
  }
  userId;
  accountType;
  initialBalance;
  bankName;
  constructor(userId, accountType, initialBalance, bankName) {
    this.userId = userId;
    this.accountType = accountType;
    this.initialBalance = initialBalance;
    this.bankName = bankName;
  }
  // These getters should return PRIMITIVE VALUES for schema validation
  getUserId() {
    return this.userId.getValue();
  }
  getAccountType() {
    return this.accountType.getValue();
  }
  getInitialBalance() {
    return this.initialBalance.getValue();
  }
  getBankName() {
    return this.bankName.getValue();
  }
  // If you need the Value Objects themselves, add separate methods:
  getUserIdVO() {
    return this.userId;
  }
  getAccountTypeVO() {
    return this.accountType;
  }
  getInitialBalanceVO() {
    return this.initialBalance;
  }
  getBankNameVO() {
    return this.bankName;
  }
  static createFromRaw(raw) {
    const parsed = AddAccountToUserSchemas.httpRequestSchema.parse(raw);
    return new _AddAccountToUserRequest(UserId.create(parsed.body.user.id), AccountTypeVO.create(parsed.body.account.type), AccountBalance.create(parsed.body.account.balance), BankName.create(parsed.body.account.bankName));
  }
};

// app/infrastructure/http/routes/base/controller.ts
import { ZodError } from "zod";
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
    if (error instanceof ZodError) {
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

// app/infrastructure/http/routes/v1/account/controllers/add-to-a-user.ts
var AddAccountToUserController = class extends BaseController {
  static {
    __name(this, "AddAccountToUserController");
  }
  useCase;
  constructor(useCase) {
    super(), this.useCase = useCase;
  }
  async handle(req, res) {
    try {
      const request = AddAccountToUserRequest.createFromRaw(req.body);
      const response = await this.useCase.execute(request);
      if (response.isSuccess()) {
        const account = response.getData();
        if (!account) {
          throw new AccountNotFoundError("Account not created");
        }
        this.sendSuccessResponse(res, "Account created successfully", account.toJSON(), 201);
        return;
      }
      const statusCode = this.getErrorStatusCode("AddAccountToUser", !!response.getValidationErrors());
      this.sendErrorResponse(res, response.getError() || "Failed to create account", response.getValidationErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "AddAccountToUserController");
    }
  }
};

// app/domain/use-cases/account/delete-of-a-user/schemas.ts
import { z as z7 } from "zod";
var DeleteAccountOfUserSchemas = class {
  static {
    __name(this, "DeleteAccountOfUserSchemas");
  }
  static requestSchema = z7.object({
    accountId: AccountSchemas.accountIdSchema
  });
  static httpRequestSchema = z7.object({
    params: this.requestSchema
  });
};

// app/domain/use-cases/account/delete-of-a-user/request.ts
var DeleteAccountOfUserRequest = class _DeleteAccountOfUserRequest {
  static {
    __name(this, "DeleteAccountOfUserRequest");
  }
  accountId;
  constructor(accountId) {
    this.accountId = accountId;
  }
  getAccountId() {
    return this.accountId.getValue();
  }
  getAccountIdVO() {
    return this.accountId;
  }
  static createFromRaw(raw) {
    const parsed = DeleteAccountOfUserSchemas.httpRequestSchema.parse(raw);
    return new _DeleteAccountOfUserRequest(AccountId.create(parsed.params.accountId));
  }
};

// app/infrastructure/http/routes/v1/account/controllers/delete-of-a-user.ts
var DeleteAccountOfUserController = class extends BaseController {
  static {
    __name(this, "DeleteAccountOfUserController");
  }
  useCase;
  constructor(useCase) {
    super(), this.useCase = useCase;
  }
  async handle(req, res) {
    try {
      const accountId = req.params.accountId;
      if (!this.validateRequiredParam(accountId, "Account ID", res)) return;
      const request = DeleteAccountOfUserRequest.createFromRaw({
        accountId
      });
      const response = await this.useCase.execute(request);
      if (response.isSuccess()) {
        this.sendSuccessResponse(res, "Account deleted successfully", null, 200);
        return;
      }
      const statusCode = this.getErrorStatusCode("DeleteAccount", !!response.getValidationErrors());
      this.sendErrorResponse(res, response.getError() || "Failed to delete account", response.getValidationErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "DeleteAccountOfUserController");
    }
  }
};

// app/domain/use-cases/account/get-all-of-user/schemas.ts
import { z as z8 } from "zod";
var GetAllAccountsOfUserSchemas = class {
  static {
    __name(this, "GetAllAccountsOfUserSchemas");
  }
  static requestSchema = z8.object({
    userId: UserSchemas.userIdSchema
  });
  static httpRequestSchema = z8.object({
    params: this.requestSchema
  });
};

// app/domain/use-cases/account/get-all-of-user/request.ts
var GetAllAccountsOfUserRequest = class _GetAllAccountsOfUserRequest {
  static {
    __name(this, "GetAllAccountsOfUserRequest");
  }
  userId;
  constructor(userId) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId.getValue();
  }
  getUserIdVO() {
    return this.userId;
  }
  static createFromRaw(raw) {
    const parsed = GetAllAccountsOfUserSchemas.httpRequestSchema.parse(raw);
    return new _GetAllAccountsOfUserRequest(UserId.create(parsed.params.userId));
  }
};

// app/infrastructure/http/routes/v1/account/controllers/get-all-of-user.ts
var GetAllAccountsOfUserController = class extends BaseController {
  static {
    __name(this, "GetAllAccountsOfUserController");
  }
  useCase;
  constructor(useCase) {
    super(), this.useCase = useCase;
  }
  async handle(req, res) {
    try {
      const userId = req.params.userId;
      if (!this.validateRequiredParam(userId, "User ID", res)) return;
      const request = GetAllAccountsOfUserRequest.createFromRaw({
        userId
      });
      const response = await this.useCase.execute(request);
      if (response.isSuccess()) {
        this.sendSuccessResponse(res, "Accounts retrieved successfully", response.getData(), 200);
        return;
      }
      const statusCode = this.getErrorStatusCode("GetAllAccountsOfUser", !!response.getValidationErrors());
      this.sendErrorResponse(res, response.getError() || "Failed to retrieve accounts", response.getValidationErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "GetAllAccountsOfUserController");
    }
  }
};

// app/domain/use-cases/account/update-of-a-user/schemas.ts
import { z as z9 } from "zod";
var UpdateAccountOfUserSchemas = class {
  static {
    __name(this, "UpdateAccountOfUserSchemas");
  }
  static requestSchema = z9.object({
    accountId: AccountSchemas.accountIdSchema,
    account: z9.object({
      type: AccountSchemas.accountTypeSchema.optional()
    })
  });
  static httpRequestSchema = z9.object({
    params: z9.object({
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

// app/infrastructure/http/routes/v1/account/controllers/update-of-a-user.ts
var UpdateAccountOfUserController = class extends BaseController {
  static {
    __name(this, "UpdateAccountOfUserController");
  }
  useCase;
  constructor(useCase) {
    super(), this.useCase = useCase;
  }
  async handle(req, res) {
    try {
      const accountId = req.params.accountId;
      if (!this.validateRequiredParam(accountId, "Account ID", res)) return;
      const request = UpdateAccountOfUserRequest.createFromRaw({
        accountId,
        ...req.body
      });
      const response = await this.useCase.execute(request);
      if (response.isSuccess()) {
        this.sendSuccessResponse(res, "Account updated successfully", response.getData(), 200);
        return;
      }
      const statusCode = this.getErrorStatusCode("UpdateAccount", !!response.getValidationErrors());
      this.sendErrorResponse(res, response.getError() || "Failed to update account", response.getValidationErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "UpdateAccountOfUserController");
    }
  }
};

// app/infrastructure/http/routes/v1/banks/controllers/get-all-banks.ts
var GetAllBanksController = class extends BaseController {
  static {
    __name(this, "GetAllBanksController");
  }
  getAllBanksUseCase;
  constructor(getAllBanksUseCase) {
    super(), this.getAllBanksUseCase = getAllBanksUseCase;
  }
  async handle(_req, res) {
    try {
      const response = await this.getAllBanksUseCase.execute();
      if (response.isSuccess()) {
        this.sendSuccessResponse(res, response.getMessage(), response.getBanks(), 200);
        return;
      }
      const statusCode = this.getErrorStatusCode(response.getMessage(), response.hasErrors());
      this.sendErrorResponse(res, response.getMessage(), response.getErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "GetAllBanksController");
    }
  }
};

// app/domain/use-cases/transaction/add-to-a-user/schemas.ts
import { z as z10 } from "zod";
var AddTransactionToUserSchemas = class {
  static {
    __name(this, "AddTransactionToUserSchemas");
  }
  static requestSchema = z10.object({
    params: z10.object({
      sourceAccountId: AccountSchemas.accountIdSchema,
      destinationAccountId: AccountSchemas.accountIdSchema
    }),
    transaction: z10.object({
      type: TransactionSchemas.transactionTypeSchema,
      amount: TransactionSchemas.amountSchema
    })
  });
  static httpRequestSchema = z10.object({
    params: z10.object({
      sourceAccountId: AccountSchemas.accountIdSchema,
      destinationAccountId: AccountSchemas.accountIdSchema
    }),
    body: z10.object({
      transaction: z10.object({
        type: TransactionSchemas.transactionTypeSchema,
        amount: TransactionSchemas.amountSchema
      })
    })
  });
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

// app/domain/use-cases/transaction/get-all-of-user/schemas.ts
import z11 from "zod";
var GetAllOfUserSchemas = class {
  static {
    __name(this, "GetAllOfUserSchemas");
  }
  static requestSchema = z11.object({
    userId: UserSchemas.userIdSchema
  });
  static httpRequestSchema = z11.object({
    params: this.requestSchema
  });
};

// app/domain/use-cases/transaction/get-all-of-user/request.ts
var GetAllOfUserRequest = class _GetAllOfUserRequest {
  static {
    __name(this, "GetAllOfUserRequest");
  }
  userId;
  constructor(userId) {
    this.userId = userId;
  }
  static createFromRaw(raw) {
    const parsed = GetAllOfUserSchemas.requestSchema.parse(raw);
    return new _GetAllOfUserRequest(parsed.userId);
  }
  getUserId() {
    return this.userId;
  }
};

// app/infrastructure/http/routes/v1/transaction/controllers/get-all-of-user.ts
var GetAllTransactionsOfUserController = class extends BaseController {
  static {
    __name(this, "GetAllTransactionsOfUserController");
  }
  getAllOfUserUseCase;
  constructor(getAllOfUserUseCase) {
    super(), this.getAllOfUserUseCase = getAllOfUserUseCase;
  }
  async handle(req, res) {
    try {
      const userId = req.params.userId;
      if (!this.validateRequiredParam(userId, "User ID", res)) return;
      const request = GetAllOfUserRequest.createFromRaw({
        userId
      });
      const response = await this.getAllOfUserUseCase.execute(request);
      if (response.isSuccess()) {
        this.sendSuccessResponse(res, response.getMessage(), response.getTransactions().map((t) => t.toJSON()));
        return;
      }
      const statusCode = this.getErrorStatusCode(response.getMessage(), response.hasErrors());
      this.sendErrorResponse(res, response.getMessage(), response.getErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "GetAllTransactionsOfUserController");
    }
  }
};

// app/domain/use-cases/user/create/schemas.ts
import { z as z12 } from "zod";
var CreateUserSchemas = class {
  static {
    __name(this, "CreateUserSchemas");
  }
  static requestSchema = z12.object({
    account: z12.object({
      type: AccountSchemas.accountTypeSchema,
      balance: AccountSchemas.balanceSchema
    }),
    bank: z12.object({
      name: BankSchemas.nameSchema
    }),
    user: z12.object({
      name: UserSchemas.nameSchema,
      email: UserSchemas.emailSchema,
      password: UserSchemas.passwordSchema
    })
  });
  static httpRequestSchema = z12.object({
    body: this.requestSchema
  });
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

// app/domain/use-cases/user/delete/schemas.ts
import { z as z13 } from "zod";
var DeleteUserSchemas = class {
  static {
    __name(this, "DeleteUserSchemas");
  }
  static requestSchema = z13.object({
    id: UserSchemas.userIdSchema
  });
  static httpRequestSchema = z13.object({
    params: this.requestSchema
  });
};

// app/domain/use-cases/user/delete/request.ts
var DeleteUserRequest = class _DeleteUserRequest {
  static {
    __name(this, "DeleteUserRequest");
  }
  id;
  constructor(id) {
    this.id = id;
  }
  static createFromRaw(raw) {
    const parsed = DeleteUserSchemas.requestSchema.parse(raw);
    return new _DeleteUserRequest(parsed.id);
  }
  getId() {
    return this.id;
  }
};

// app/infrastructure/http/routes/v1/users/controllers/delete.ts
var DeleteUserController = class extends BaseController {
  static {
    __name(this, "DeleteUserController");
  }
  deleteUserUseCase;
  constructor(deleteUserUseCase) {
    super(), this.deleteUserUseCase = deleteUserUseCase;
  }
  async handle(req, res) {
    try {
      const userId = req.params.id;
      if (!this.validateRequiredParam(userId, "User ID", res)) return;
      const request = DeleteUserRequest.createFromRaw({
        id: userId
      });
      const response = await this.deleteUserUseCase.execute(request);
      if (response.isSuccess()) {
        this.sendSuccessResponse(res, response.getMessage());
        return;
      }
      const statusCode = this.getErrorStatusCode(response.getMessage(), response.hasErrors());
      this.sendErrorResponse(res, response.getMessage(), response.getErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "DeleteUserController");
    }
  }
};

// app/domain/use-cases/user/login/schemas.ts
import { z as z14 } from "zod";
var UserLoginSchemas = class {
  static {
    __name(this, "UserLoginSchemas");
  }
  static requestSchema = z14.object({
    email: UserSchemas.emailSchema,
    password: z14.string().min(8).max(100)
  });
  static httpRequestSchema = z14.object({
    body: this.requestSchema
  });
};

// app/domain/use-cases/user/login/request.ts
var LoginRequest = class _LoginRequest {
  static {
    __name(this, "LoginRequest");
  }
  email;
  password;
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  static createFromRaw(raw) {
    const parsed = UserLoginSchemas.requestSchema.parse(raw);
    return new _LoginRequest(parsed.email, parsed.password);
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
};

// app/infrastructure/http/routes/v1/users/controllers/login.ts
var LoginController = class extends BaseController {
  static {
    __name(this, "LoginController");
  }
  loginUseCase;
  constructor(loginUseCase) {
    super(), this.loginUseCase = loginUseCase;
  }
  async handle(req, res) {
    try {
      const request = LoginRequest.createFromRaw(req.body);
      const response = await this.loginUseCase.execute(request);
      if (response.isSuccess()) {
        const authResult = response.getAuthResult();
        this.sendSuccessResponse(res, response.getMessage(), authResult);
        return;
      }
      const statusCode = this.getErrorStatusCode(response.getMessage(), response.hasErrors());
      this.sendErrorResponse(res, response.getMessage(), response.getErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "LoginController");
    }
  }
};

// app/domain/use-cases/user/update/schemas.ts
import { z as z15 } from "zod";
var UpdateUserSchemas = class {
  static {
    __name(this, "UpdateUserSchemas");
  }
  static requestSchema = z15.object({
    user: z15.object({
      name: UserSchemas.nameSchema,
      email: UserSchemas.emailSchema,
      password: UserSchemas.passwordSchema
    }),
    params: z15.object({
      id: UserSchemas.userIdSchema
    })
  });
  static httpRequestSchema = z15.object({
    body: this.requestSchema,
    params: z15.object({
      id: UserSchemas.userIdSchema
    })
  });
};

// app/domain/use-cases/user/update/request.ts
var UpdateUserRequest = class _UpdateUserRequest {
  static {
    __name(this, "UpdateUserRequest");
  }
  id;
  name;
  email;
  password;
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static createFromRaw(raw) {
    const parsed = UpdateUserSchemas.httpRequestSchema.parse(raw);
    return new _UpdateUserRequest(parsed.params.id, parsed.body.user.name, parsed.body.user.email, parsed.body.user.password);
  }
  getId() {
    return this.id;
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
};

// app/infrastructure/http/routes/v1/users/controllers/update.ts
var UpdateUserController = class extends BaseController {
  static {
    __name(this, "UpdateUserController");
  }
  updateUserUseCase;
  constructor(updateUserUseCase) {
    super(), this.updateUserUseCase = updateUserUseCase;
  }
  async handle(req, res) {
    try {
      const userId = req.params.id;
      if (!this.validateRequiredParam(userId, "User ID", res)) return;
      const request = UpdateUserRequest.createFromRaw({
        params: {
          id: userId
        },
        body: req.body
      });
      const response = await this.updateUserUseCase.execute(request);
      if (response.isSuccess()) {
        const user = response.getUser();
        this.sendSuccessResponse(res, response.getMessage(), user.toJSON());
        return;
      }
      const statusCode = this.getErrorStatusCode(response.getMessage(), response.hasErrors());
      this.sendErrorResponse(res, response.getMessage(), response.getErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "UpdateUserController");
    }
  }
};

// app/domain/use-cases/account/add-to-a-user/index.ts
import { ZodError as ZodError2 } from "zod";

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
    if (error instanceof ZodError2) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return AddAccountToUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return AddAccountToUserResponse.failure(message);
  }
};

// app/domain/use-cases/account/delete-of-a-user/index.ts
import { ZodError as ZodError3 } from "zod";

// app/domain/use-cases/account/delete-of-a-user/response.ts
var DeleteAccountOfUserResponse = class _DeleteAccountOfUserResponse {
  static {
    __name(this, "DeleteAccountOfUserResponse");
  }
  success;
  error;
  validationErrors;
  constructor(success, error, validationErrors) {
    this.success = success;
    this.error = error;
    this.validationErrors = validationErrors;
  }
  static success() {
    return new _DeleteAccountOfUserResponse(true);
  }
  static failure(error) {
    return new _DeleteAccountOfUserResponse(false, error);
  }
  static validationFailure(errors) {
    return new _DeleteAccountOfUserResponse(false, void 0, errors);
  }
  isSuccess() {
    return this.success;
  }
  getError() {
    return this.error;
  }
  getValidationErrors() {
    return this.validationErrors;
  }
};

// app/domain/use-cases/account/delete-of-a-user/index.ts
var DeleteAccountOfUserUseCase = class {
  static {
    __name(this, "DeleteAccountOfUserUseCase");
  }
  accountRepository;
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }
  async execute(request) {
    try {
      const accountId = request.getAccountIdVO();
      await AppDataSource.transaction(async (manager) => {
        await this.accountRepository.delete(accountId, manager);
      });
      return DeleteAccountOfUserResponse.success();
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof ZodError3) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return DeleteAccountOfUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return DeleteAccountOfUserResponse.failure(message);
  }
};

// app/domain/use-cases/account/get-all-of-user/index.ts
import { ZodError as ZodError4 } from "zod";

// app/domain/use-cases/account/get-all-of-user/response.ts
var GetAllAccountsOfUserResponse = class _GetAllAccountsOfUserResponse {
  static {
    __name(this, "GetAllAccountsOfUserResponse");
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
    return new _GetAllAccountsOfUserResponse(true, data);
  }
  static failure(error) {
    return new _GetAllAccountsOfUserResponse(false, void 0, error);
  }
  static validationFailure(errors) {
    return new _GetAllAccountsOfUserResponse(false, void 0, void 0, errors);
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

// app/domain/use-cases/account/get-all-of-user/index.ts
var GetAllAccountsOfUserUseCase = class {
  static {
    __name(this, "GetAllAccountsOfUserUseCase");
  }
  accountRepository;
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }
  async execute(request) {
    try {
      const userId = request.getUserIdVO();
      const accounts = await this.accountRepository.findByUserId(userId);
      if (!accounts || accounts.length === 0) {
        return GetAllAccountsOfUserResponse.failure("No accounts found");
      }
      return GetAllAccountsOfUserResponse.success(accounts);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof ZodError4) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return GetAllAccountsOfUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return GetAllAccountsOfUserResponse.failure(message);
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

// app/domain/use-cases/banks/get-all/response.ts
var GetAllBanksResponse = class _GetAllBanksResponse {
  static {
    __name(this, "GetAllBanksResponse");
  }
  banks;
  success;
  message;
  errors;
  constructor(banks, success, message, errors) {
    this.banks = banks;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(banks) {
    return new _GetAllBanksResponse(banks, true, "Banks fetched successfully", []);
  }
  static failure(message, errors = []) {
    const allErrors = errors.length > 0 ? errors : [
      message
    ];
    return new _GetAllBanksResponse([], false, message, allErrors);
  }
  static validationFailure(errors) {
    return new _GetAllBanksResponse([], false, "Validation failed", errors);
  }
  getBanks() {
    return this.banks;
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

// app/domain/errors/bank/bank-not-found-error.ts
var BankNotFoundError = class _BankNotFoundError extends NotFoundError {
  static {
    __name(this, "BankNotFoundError");
  }
  constructor(name) {
    super(`Bank not found: ${name}`);
    Object.setPrototypeOf(this, _BankNotFoundError.prototype);
  }
};

// app/domain/use-cases/banks/get-all/index.ts
var GetAllBanksUseCase = class {
  static {
    __name(this, "GetAllBanksUseCase");
  }
  bankRepository;
  constructor(bankRepository) {
    this.bankRepository = bankRepository;
  }
  async execute() {
    try {
      const banks = await this.bankRepository.findAll();
      if (!banks || banks.length === 0) {
        throw new BankNotFoundError("No banks found");
      }
      return GetAllBanksResponse.success(banks);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return GetAllBanksResponse.failure(message);
  }
};

// app/domain/use-cases/transaction/add-to-a-user/index.ts
import { ZodError as ZodError5 } from "zod";

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
    if (error instanceof ZodError5) {
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

// app/domain/use-cases/transaction/get-all-of-user/index.ts
import { ZodError as ZodError6 } from "zod";

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
    if (error instanceof ZodError6) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return GetAllOfUserResponse.failure("Failed to fetch transactions", errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return GetAllOfUserResponse.failure("Failed to fetch transactions", [
      message
    ]);
  }
};

// app/domain/use-cases/user/create/index.ts
import { ZodError as ZodError7 } from "zod";

// app/domain/errors/user/invalid-user-response-error.ts
var InvalidUserResponseError = class _InvalidUserResponseError extends ValidationError {
  static {
    __name(this, "InvalidUserResponseError");
  }
  constructor() {
    super("Cannot get user from failed response");
    Object.setPrototypeOf(this, _InvalidUserResponseError.prototype);
  }
};

// app/domain/use-cases/user/create/response.ts
var CreateUserResponse = class _CreateUserResponse {
  static {
    __name(this, "CreateUserResponse");
  }
  user;
  success;
  message;
  errors;
  constructor(user, success, message, errors) {
    this.user = user;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(user) {
    return new _CreateUserResponse(user, true, "User created successfully", []);
  }
  static failure(message, errors = []) {
    return new _CreateUserResponse(null, false, message, errors);
  }
  static validationFailure(errors) {
    return new _CreateUserResponse(null, false, "Validation failed", errors);
  }
  getUser() {
    if (!this.user) {
      throw new InvalidUserResponseError();
    }
    return this.user;
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

// app/domain/errors/conflict-error.ts
var ConflictError = class _ConflictError extends DomainError {
  static {
    __name(this, "ConflictError");
  }
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _ConflictError.prototype);
  }
  getStatusCode() {
    return 409;
  }
};

// app/domain/errors/user/user-already-exists-error.ts
var UserAlreadyExistsError = class _UserAlreadyExistsError extends ConflictError {
  static {
    __name(this, "UserAlreadyExistsError");
  }
  constructor(email) {
    super(`User already exists: ${email}`);
    Object.setPrototypeOf(this, _UserAlreadyExistsError.prototype);
  }
};

// app/domain/use-cases/user/create/index.ts
var CreateUserUseCase = class {
  static {
    __name(this, "CreateUserUseCase");
  }
  userRepository;
  accountRepository;
  bankRepository;
  constructor(userRepository, accountRepository, bankRepository) {
    this.userRepository = userRepository;
    this.accountRepository = accountRepository;
    this.bankRepository = bankRepository;
  }
  async execute(request) {
    try {
      logger.info("Creating user", {
        request
      });
      const name = request.getName();
      const email = request.getEmail();
      const password = request.getPassword();
      const bankName = request.getBankName();
      const accountType = request.getAccountType();
      const accountBalance = request.getAccountBalance();
      logger.info("Checking if user exists", {
        email
      });
      const userExists = await this.userRepository.exists(email);
      if (userExists) {
        throw new UserAlreadyExistsError(email.getValue());
      }
      logger.info("Hashing password", {
        password
      });
      const passwordVO = UserPassword.create(password.getValue());
      const hashedPassword = await passwordVO.hash();
      logger.info("Finding bank", {
        bankName
      });
      const bankNameVO = BankName.create(bankName.getValue());
      const bank = await this.bankRepository.findByName(bankNameVO);
      if (!bank) {
        throw new BankNotFoundError(bankName.getValue());
      }
      logger.info("Creating user", {
        name,
        email,
        hashedPassword
      });
      const user = UserEntity.create(name.getValue(), email.getValue(), hashedPassword.getValue());
      logger.info("Creating account", {
        accountType,
        accountBalance,
        bankName
      });
      await AppDataSource.transaction(async (manager) => {
        const transactionalUserRepo = this.userRepository.withTransaction(manager);
        const transactionalAccountRepo = this.accountRepository.withTransaction(manager);
        await transactionalUserRepo.create(user);
        logger.info("User created in transaction");
        const account = AccountEntity.create(accountType.getValue(), accountBalance.getValue(), user.getId().getValue(), bank.getName().getValue());
        logger.info("Account created", {
          account
        });
        await transactionalAccountRepo.create(account);
        logger.info("Account created in transaction");
      });
      logger.info("User created");
      return CreateUserResponse.success(user);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof ZodError7) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return CreateUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return CreateUserResponse.failure(message);
  }
};

// app/domain/use-cases/user/delete/index.ts
import { ZodError as ZodError8 } from "zod";

// app/domain/use-cases/user/delete/response.ts
var DeleteUserResponse = class _DeleteUserResponse {
  static {
    __name(this, "DeleteUserResponse");
  }
  success;
  message;
  errors;
  constructor(success, message, errors) {
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success() {
    return new _DeleteUserResponse(true, "User deleted successfully", []);
  }
  static failure(message, errors = []) {
    return new _DeleteUserResponse(false, message, errors);
  }
  static validationFailure(errors) {
    return new _DeleteUserResponse(false, "Validation failed", errors);
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

// app/domain/use-cases/user/delete/index.ts
var DeleteUserUseCase = class {
  static {
    __name(this, "DeleteUserUseCase");
  }
  userRepository;
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(request) {
    try {
      const validated = DeleteUserSchemas.httpRequestSchema.parse({
        params: {
          id: request.getId()
        }
      });
      const userId = UserId.create(validated.params.id);
      await AppDataSource.transaction(async (manager) => {
        const transactionalUserRepo = this.userRepository.withTransaction(manager);
        const user = await transactionalUserRepo.findById(userId);
        if (!user) {
          throw new UserNotFoundError(validated.params.id.toString());
        }
        await transactionalUserRepo.delete(userId);
      });
      return DeleteUserResponse.success();
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof ZodError8) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return DeleteUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return DeleteUserResponse.failure(message);
  }
};

// app/domain/use-cases/user/login/index.ts
import { ZodError as ZodError9 } from "zod";

// app/domain/errors/user/invalid-auth-result-error.ts
var InvalidAuthResultError = class _InvalidAuthResultError extends ValidationError {
  static {
    __name(this, "InvalidAuthResultError");
  }
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _InvalidAuthResultError.prototype);
  }
};

// app/domain/use-cases/user/login/response.ts
var LoginResponse = class _LoginResponse {
  static {
    __name(this, "LoginResponse");
  }
  authResult;
  success;
  message;
  errors;
  constructor(authResult, success, message, errors) {
    this.authResult = authResult;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(authResult) {
    return new _LoginResponse(authResult, true, "Login successful", []);
  }
  static failure(message, errors = []) {
    return new _LoginResponse(null, false, message, errors);
  }
  static validationFailure(errors) {
    return new _LoginResponse(null, false, "Validation failed", errors);
  }
  getAuthResult() {
    if (!this.authResult) {
      throw new InvalidAuthResultError("Cannot get auth result from failed response");
    }
    return this.authResult;
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

// app/domain/errors/not-authorized-error.ts
var NotAuthorizedError = class extends DomainError {
  static {
    __name(this, "NotAuthorizedError");
  }
  constructor() {
    super("Not authorized");
  }
  getStatusCode() {
    return 401;
  }
};

// app/domain/errors/user/invalid-credentials-error.ts
var InvalidCredentialsError = class _InvalidCredentialsError extends NotAuthorizedError {
  static {
    __name(this, "InvalidCredentialsError");
  }
  constructor() {
    super();
    Object.setPrototypeOf(this, _InvalidCredentialsError.prototype);
  }
};

// app/domain/use-cases/user/login/index.ts
var LoginUseCase = class {
  static {
    __name(this, "LoginUseCase");
  }
  userRepository;
  authService;
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }
  async execute(request) {
    try {
      const validated = UserLoginSchemas.requestSchema.parse({
        email: request.getEmail(),
        password: request.getPassword()
      });
      const email = UserEmail.create(validated.email);
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new InvalidCredentialsError();
      }
      const userPassword = UserPassword.createFromHash(user.getPasswordHash());
      const isValid = await userPassword.compare(validated.password);
      if (!isValid) {
        throw new InvalidCredentialsError();
      }
      const token = this.authService.generateToken(user.getId().getValue());
      return LoginResponse.success({
        token,
        user
      });
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof ZodError9) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return LoginResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return LoginResponse.failure(message);
  }
};

// app/domain/use-cases/user/update/index.ts
import { ZodError as ZodError10 } from "zod";

// app/domain/use-cases/user/update/response.ts
var UpdateUserResponse = class _UpdateUserResponse {
  static {
    __name(this, "UpdateUserResponse");
  }
  user;
  success;
  message;
  errors;
  constructor(user, success, message, errors) {
    this.user = user;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(user) {
    return new _UpdateUserResponse(user, true, "User updated successfully", []);
  }
  static failure(message, errors = []) {
    return new _UpdateUserResponse(null, false, message, errors);
  }
  static validationFailure(errors) {
    return new _UpdateUserResponse(null, false, "Validation failed", errors);
  }
  getUser() {
    if (!this.user) {
      throw new InvalidUserResponseError();
    }
    return this.user;
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

// app/domain/use-cases/user/update/index.ts
var UpdateUserUseCase = class {
  static {
    __name(this, "UpdateUserUseCase");
  }
  userRepository;
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(request) {
    try {
      const validated = UpdateUserSchemas.httpRequestSchema.parse({
        body: {
          user: {
            name: request.getName(),
            email: request.getEmail(),
            password: request.getPassword()
          }
        },
        params: {
          id: request.getId()
        }
      });
      const userId = UserId.create(validated.params.id);
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new UserNotFoundError(validated.params.id.toString());
      }
      const updatedUser = await this.userRepository.update(userId, UserEntity.create(validated.body.user.name, validated.body.user.email, validated.body.user.password));
      return UpdateUserResponse.success(updatedUser);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof ZodError10) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return UpdateUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return UpdateUserResponse.failure(message);
  }
};

// app/domain/services/auth/index.ts
import bcrypt2 from "bcryptjs";
import jwt from "jsonwebtoken";
var AuthService = class {
  static {
    __name(this, "AuthService");
  }
  jwtSecret;
  jwtExpiresIn;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = "1h";
  }
  async hashPassword(raw) {
    return bcrypt2.hash(raw, 10);
  }
  async comparePassword(raw, hash) {
    return bcrypt2.compare(raw, hash);
  }
  generateToken(userId) {
    return jwt.sign({
      userId
    }, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn
    });
  }
  verifyToken(token) {
    const decoded = jwt.verify(token, this.jwtSecret);
    return decoded;
  }
};

// app/infrastructure/di/container.ts
var DIContainer = class _DIContainer {
  static {
    __name(this, "DIContainer");
  }
  static instance;
  dependencies = /* @__PURE__ */ new Map();
  constructor() {
    this.registerDependencies();
  }
  static getInstance() {
    if (!_DIContainer.instance) {
      _DIContainer.instance = new _DIContainer();
    }
    return _DIContainer.instance;
  }
  registerDependencies() {
    this.registerRepositories();
    this.registerServices();
    this.registerUseCases();
    this.registerControllers();
  }
  registerRepositories() {
    this.dependencies.set("UserRepository", new TypeOrmUserRepository());
    this.dependencies.set("AccountRepository", new TypeOrmAccountRepository());
    this.dependencies.set("BankRepository", new TypeOrmBankRepository());
    this.dependencies.set("TransactionRepository", new TypeOrmTransactionRepository());
  }
  registerServices() {
    this.dependencies.set("AuthService", new AuthService());
  }
  registerUseCases() {
    this.dependencies.set("AddAccountToUserUseCase", new AddAccountToUserUseCase(this.get("AccountRepository"), this.get("UserRepository")));
    this.dependencies.set("DeleteAccountOfUserUseCase", new DeleteAccountOfUserUseCase(this.get("AccountRepository")));
    this.dependencies.set("GetAllAccountsOfUserUseCase", new GetAllAccountsOfUserUseCase(this.get("AccountRepository")));
    this.dependencies.set("UpdateAccountOfUserUseCase", new UpdateAccountOfUserUseCase(this.get("AccountRepository")));
    this.dependencies.set("GetAllBanksUseCase", new GetAllBanksUseCase(this.get("BankRepository")));
    this.dependencies.set("CreateUserUseCase", new CreateUserUseCase(this.get("UserRepository"), this.get("AccountRepository"), this.get("BankRepository")));
    this.dependencies.set("DeleteUserUseCase", new DeleteUserUseCase(this.get("UserRepository")));
    this.dependencies.set("LoginUserUseCase", new LoginUseCase(this.get("UserRepository"), this.get("AuthService")));
    this.dependencies.set("UpdateUserUseCase", new UpdateUserUseCase(this.get("UserRepository")));
    this.dependencies.set("AddTransactionToUserUseCase", new AddTransactionToUserUseCase(this.get("AccountRepository"), this.get("TransactionRepository")));
    this.dependencies.set("GetAllTransactionsOfUserUseCase", new GetAllOfUserUseCase(this.get("TransactionRepository")));
  }
  registerControllers() {
    this.dependencies.set("AddAccountToUserController", new AddAccountToUserController(this.get("AddAccountToUserUseCase")));
    this.dependencies.set("DeleteAccountOfUserController", new DeleteAccountOfUserController(this.get("DeleteAccountOfUserUseCase")));
    this.dependencies.set("GetAllAccountsOfUserController", new GetAllAccountsOfUserController(this.get("GetAllAccountsOfUserUseCase")));
    this.dependencies.set("UpdateAccountOfUserController", new UpdateAccountOfUserController(this.get("UpdateAccountOfUserUseCase")));
    this.dependencies.set("GetAllBanksController", new GetAllBanksController(this.get("GetAllBanksUseCase")));
    this.dependencies.set("CreateUserController", new CreateUserController(this.get("CreateUserUseCase")));
    this.dependencies.set("DeleteUserController", new DeleteUserController(this.get("DeleteUserUseCase")));
    this.dependencies.set("LoginController", new LoginController(this.get("LoginUserUseCase")));
    this.dependencies.set("UpdateUserController", new UpdateUserController(this.get("UpdateUserUseCase")));
    this.dependencies.set("AddTransactionToUserController", new AddTransactionToUserController(this.get("AddTransactionToUserUseCase")));
    this.dependencies.set("GetAllTransactionsOfUserController", new GetAllTransactionsOfUserController(this.get("GetAllTransactionsOfUserUseCase")));
  }
  get(key) {
    const dependency = this.dependencies.get(key);
    if (!dependency) {
      throw new DependencyNotFoundError(key);
    }
    return dependency;
  }
  register(key, instance) {
    this.dependencies.set(key, instance);
  }
  has(key) {
    return this.dependencies.has(key);
  }
};

// app/infrastructure/http/middlewares/error.ts
import zod from "zod";
function errorHandler(err, _req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof zod.ZodError) {
    logger.http(err.message);
    res.status(404).json({
      error: "Invalid input. Please check your request body. " + err.message
    });
    return;
  }
  logger.error(err);
  res.status(500).json({
    error: "Internal Server Error"
  });
  next(err);
}
__name(errorHandler, "errorHandler");

// app/infrastructure/http/routes/factory/index.ts
import { Router } from "express";
var RouterFactory = class {
  static {
    __name(this, "RouterFactory");
  }
  static createRouter(config = {}) {
    return Router({
      mergeParams: config.mergeParams ?? true,
      caseSensitive: config.caseSensitive ?? true,
      strict: config.strict ?? true
    });
  }
  static createStandardRouter() {
    return this.createRouter({
      mergeParams: true,
      caseSensitive: true,
      strict: true
    });
  }
};

// app/infrastructure/http/routes/base/router.ts
var BaseRouter = class {
  static {
    __name(this, "BaseRouter");
  }
  router;
  container;
  constructor() {
    this.container = DIContainer.getInstance();
    this.router = RouterFactory.createStandardRouter();
    this.setupMiddleware();
    this.setupRoutes();
  }
  setupMiddleware() {
    this.router.use(errorHandler);
  }
  getRouter() {
    return this.router;
  }
};

// app/infrastructure/http/middlewares/validation.ts
import { ZodError as ZodError11 } from "zod";
var ValidationMiddleware = class {
  static {
    __name(this, "ValidationMiddleware");
  }
  static validate(schema) {
    return (req, res, next) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params
        });
        next();
      } catch (error) {
        if (error instanceof ZodError11) {
          const errors = error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
            code: err.code
          }));
          res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
          });
          return;
        }
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    };
  }
};

// app/infrastructure/http/routes/v1/users/index.ts
var UserRouter = class _UserRouter extends BaseRouter {
  static {
    __name(this, "UserRouter");
  }
  static instance;
  static getInstance() {
    if (!_UserRouter.instance) {
      _UserRouter.instance = new _UserRouter();
    }
    return _UserRouter.instance;
  }
  setupRoutes() {
    this.setupCreateUserRoute();
    this.setupUpdateUserRoute();
    this.setupDeleteUserRoute();
    this.setupLoginRoute();
  }
  setupCreateUserRoute() {
    this.router.post("/", this.handleCreateUser.bind(this));
  }
  setupDeleteUserRoute() {
    this.router.delete("/:id", ValidationMiddleware.validate(DeleteUserSchemas.httpRequestSchema), this.handleDeleteUser.bind(this));
  }
  setupUpdateUserRoute() {
    this.router.put("/:id", ValidationMiddleware.validate(UpdateUserSchemas.httpRequestSchema), this.handleUpdateUser.bind(this));
  }
  setupLoginRoute() {
    this.router.post("/login", ValidationMiddleware.validate(UserLoginSchemas.httpRequestSchema), this.handleLoginUser.bind(this));
  }
  async handleCreateUser(req, res) {
    const controller = this.container.get("CreateUserController");
    await controller.handle(req, res);
  }
  async handleDeleteUser(req, res) {
    const controller = this.container.get("DeleteUserController");
    await controller.handle(req, res);
  }
  async handleLoginUser(req, res) {
    const controller = this.container.get("LoginController");
    await controller.handle(req, res);
  }
  async handleUpdateUser(req, res) {
    const controller = this.container.get("UpdateUserController");
    await controller.handle(req, res);
  }
};
var users_default = UserRouter.getInstance;

// app/infrastructure/http/routes/v1/account/index.ts
var AccountRouter = class _AccountRouter extends BaseRouter {
  static {
    __name(this, "AccountRouter");
  }
  static instance;
  static getInstance() {
    if (!_AccountRouter.instance) {
      _AccountRouter.instance = new _AccountRouter();
    }
    return _AccountRouter.instance;
  }
  setupRoutes() {
    this.setupAddAccountToUserRoute();
    this.setupDeleteAccountOfUserRoute();
    this.setupUpdateAccountOfUserRoute();
    this.setupGetAllAccountsOfUserRoute();
  }
  setupAddAccountToUserRoute() {
    this.router.post("/user/:userId", ValidationMiddleware.validate(AddAccountToUserSchemas.httpRequestSchema), this.handleCreateUser.bind(this));
  }
  setupDeleteAccountOfUserRoute() {
    this.router.delete("/:accountId", ValidationMiddleware.validate(DeleteAccountOfUserSchemas.httpRequestSchema), this.handleDeleteUser.bind(this));
  }
  setupGetAllAccountsOfUserRoute() {
    this.router.get("/user/:userId", ValidationMiddleware.validate(GetAllAccountsOfUserSchemas.httpRequestSchema), this.handleGetAllAccountsOfUser.bind(this));
  }
  setupUpdateAccountOfUserRoute() {
    this.router.put("/:accountId", ValidationMiddleware.validate(UpdateAccountOfUserSchemas.httpRequestSchema), this.handleUpdateUser.bind(this));
  }
  async handleCreateUser(req, res) {
    const controller = this.container.get("AddAccountToUserController");
    await controller.handle(req, res);
  }
  async handleDeleteUser(req, res) {
    const controller = this.container.get("DeleteAccountOfUserController");
    await controller.handle(req, res);
  }
  async handleUpdateUser(req, res) {
    const controller = this.container.get("UpdateAccountOfUserController");
    await controller.handle(req, res);
  }
  async handleGetAllAccountsOfUser(req, res) {
    const controller = this.container.get("GetAllAccountsOfUserController");
    await controller.handle(req, res);
  }
};
var account_default = AccountRouter.getInstance;

// app/infrastructure/http/routes/v1/transaction/index.ts
var TransactionRouter = class _TransactionRouter extends BaseRouter {
  static {
    __name(this, "TransactionRouter");
  }
  static instance;
  static getInstance() {
    if (!_TransactionRouter.instance) {
      _TransactionRouter.instance = new _TransactionRouter();
    }
    return _TransactionRouter.instance;
  }
  setupRoutes() {
    this.setupGetAllTransactionsOfUserRoute();
    this.setupAddTransactionToUserRoute();
  }
  setupAddTransactionToUserRoute() {
    this.router.post("/user/:userId", ValidationMiddleware.validate(AddTransactionToUserSchemas.httpRequestSchema), this.handleAddTransactionToUser.bind(this));
  }
  setupGetAllTransactionsOfUserRoute() {
    this.router.get("/user/:userId", ValidationMiddleware.validate(GetAllOfUserSchemas.httpRequestSchema), this.handleGetAllTransactionsOfUser.bind(this));
  }
  async handleAddTransactionToUser(req, res) {
    const controller = this.container.get("AddTransactionToUserController");
    await controller.handle(req, res);
  }
  async handleGetAllTransactionsOfUser(req, res) {
    const controller = this.container.get("GetAllOfUserController");
    await controller.handle(req, res);
  }
};
var transaction_default = TransactionRouter.getInstance;

// app/infrastructure/http/routes/v1/banks/index.ts
var BankRouter = class _BankRouter extends BaseRouter {
  static {
    __name(this, "BankRouter");
  }
  static instance;
  static getInstance() {
    if (!_BankRouter.instance) {
      _BankRouter.instance = new _BankRouter();
    }
    return _BankRouter.instance;
  }
  setupRoutes() {
    this.router.get("/", this.handleGetAllBanks.bind(this));
  }
  async handleGetAllBanks(req, res) {
    const controller = this.container.get("GetAllBanksController");
    await controller.handle(req, res);
  }
};

// app/infrastructure/http/routes/v1/index.ts
var V1Router = class _V1Router extends BaseRouter {
  static {
    __name(this, "V1Router");
  }
  static instance;
  static getInstance() {
    if (!_V1Router.instance) {
      _V1Router.instance = new _V1Router();
    }
    return _V1Router.instance;
  }
  constructor() {
    super();
  }
  setupRoutes() {
    this.setupUserRoutes();
    this.setupBankRoutes();
    this.setupAccountRoutes();
    this.setupTransactionRoutes();
  }
  setupUserRoutes() {
    this.router.use("/users", new UserRouter().getRouter());
  }
  setupBankRoutes() {
    this.router.use("/banks", new BankRouter().getRouter());
  }
  setupAccountRoutes() {
    this.router.use("/accounts", new AccountRouter().getRouter());
  }
  setupTransactionRoutes() {
    this.router.use("/transactions", new TransactionRouter().getRouter());
  }
};
export {
  V1Router
};
//# sourceMappingURL=index.mjs.map