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

// app/domain/use-cases/transaction/add-to-a-user/request.ts
var request_exports = {};
__export(request_exports, {
  AddTransactionToUserRequest: () => AddTransactionToUserRequest
});
module.exports = __toCommonJS(request_exports);

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

// app/domain/use-cases/transaction/add-to-a-user/schemas.ts
var import_zod5 = require("zod");
var AddTransactionToUserSchemas = class {
  static {
    __name(this, "AddTransactionToUserSchemas");
  }
  static requestSchema = import_zod5.z.object({
    params: import_zod5.z.object({
      sourceAccountId: AccountSchemas.accountIdSchema,
      destinationAccountId: AccountSchemas.accountIdSchema
    }),
    transaction: import_zod5.z.object({
      type: TransactionSchemas.transactionTypeSchema,
      amount: TransactionSchemas.amountSchema
    })
  });
  static httpRequestSchema = import_zod5.z.object({
    params: import_zod5.z.object({
      sourceAccountId: AccountSchemas.accountIdSchema,
      destinationAccountId: AccountSchemas.accountIdSchema
    }),
    body: import_zod5.z.object({
      transaction: import_zod5.z.object({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddTransactionToUserRequest
});
//# sourceMappingURL=request.js.map