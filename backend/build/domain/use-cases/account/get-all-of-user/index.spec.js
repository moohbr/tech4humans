"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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

// app/domain/use-cases/account/get-all-of-user/schemas.ts
var import_zod2 = require("zod");
var GetAllAccountsOfUserSchemas = class {
  static {
    __name(this, "GetAllAccountsOfUserSchemas");
  }
  static requestSchema = import_zod2.z.object({
    userId: UserSchemas.userIdSchema
  });
  static httpRequestSchema = import_zod2.z.object({
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

// app/infrastructure/datasources/databases/typeorm/models/enums.ts
var AccountType = /* @__PURE__ */ function(AccountType2) {
  AccountType2["CORRENTE"] = "Corrente";
  AccountType2["POUPANCA"] = "Poupan\xE7a";
  AccountType2["CREDITO"] = "Cr\xE9dito";
  AccountType2["INVESTIMENTO"] = "Investimento";
  return AccountType2;
}({});

// app/domain/models/bank/schemas/index.ts
var import_zod3 = require("zod");
var BankSchemas = class {
  static {
    __name(this, "BankSchemas");
  }
  static nameSchema = import_zod3.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static createBankSchema = import_zod3.z.object({
    name: this.nameSchema
  });
  static bankEntitySchema = import_zod3.z.object({
    name: this.nameSchema
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

// app/domain/use-cases/account/get-all-of-user/index.ts
var import_zod5 = require("zod");

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
    if (error instanceof import_zod5.ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return GetAllAccountsOfUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return GetAllAccountsOfUserResponse.failure(message);
  }
};

// app/domain/use-cases/account/get-all-of-user/index.spec.ts
var mockAccountRepository = {
  withTransaction: jest.fn(),
  create: jest.fn(),
  findByUserId: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};
describe("GetAllAccountsOfUserUseCase", () => {
  const useCase = new GetAllAccountsOfUserUseCase(mockAccountRepository);
  const userId = UserId.create(1);
  const request = new GetAllAccountsOfUserRequest(userId);
  const mockAccounts = [
    AccountEntity.create(AccountType.POUPANCA, 1e3, userId.getValue(), "Bank A"),
    AccountEntity.create(AccountType.CORRENTE, 2e3, userId.getValue(), "Bank B")
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return accounts successfully when user has accounts", async () => {
    mockAccountRepository.findByUserId.mockResolvedValue(mockAccounts);
    const response = await useCase.execute(request);
    expect(response.isSuccess()).toBe(true);
    expect(response.getData()).toEqual(mockAccounts);
    expect(mockAccountRepository.findByUserId).toHaveBeenCalledWith(userId);
  });
  it("should return failure when user has no accounts (null)", async () => {
    mockAccountRepository.findByUserId.mockResolvedValue(null);
    const response = await useCase.execute(request);
    expect(response.isSuccess()).toBe(false);
    expect(response.getError()).toMatch(/No accounts found/);
  });
  it("should handle validation failure for missing user ID", async () => {
    try {
      const invalidRequest = GetAllAccountsOfUserRequest.createFromRaw({
        params: {}
      });
      fail("Expected validation error for missing userId");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
//# sourceMappingURL=index.spec.js.map