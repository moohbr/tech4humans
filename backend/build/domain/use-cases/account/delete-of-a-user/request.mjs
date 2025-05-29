var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/infrastructure/datasources/databases/typeorm/models/enums.ts
var AccountType = /* @__PURE__ */ function(AccountType2) {
  AccountType2["CORRENTE"] = "Corrente";
  AccountType2["POUPANCA"] = "Poupan\xE7a";
  AccountType2["CREDITO"] = "Cr\xE9dito";
  AccountType2["INVESTIMENTO"] = "Investimento";
  return AccountType2;
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

// app/domain/use-cases/account/delete-of-a-user/schemas.ts
import { z as z4 } from "zod";
var DeleteAccountOfUserSchemas = class {
  static {
    __name(this, "DeleteAccountOfUserSchemas");
  }
  static requestSchema = z4.object({
    accountId: AccountSchemas.accountIdSchema
  });
  static httpRequestSchema = z4.object({
    params: this.requestSchema
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
export {
  DeleteAccountOfUserRequest
};
//# sourceMappingURL=request.mjs.map