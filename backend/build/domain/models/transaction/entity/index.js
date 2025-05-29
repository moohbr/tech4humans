"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// app/domain/models/transaction/entity/index.ts
var entity_exports = {};
__export(entity_exports, {
  TransactionEntity: () => TransactionEntity
});
module.exports = __toCommonJS(entity_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TransactionEntity
});
//# sourceMappingURL=index.js.map