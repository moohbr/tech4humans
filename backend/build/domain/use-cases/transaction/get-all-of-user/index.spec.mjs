var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/models/user/schemas/index.ts
import { z } from "zod";
var UserSchemas = class {
  static {
    __name(this, "UserSchemas");
  }
  static emailSchema = z.string().email("Invalid email format").min(1, "Email is required").max(255, "Email cannot exceed 255 characters");
  static nameSchema = z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static userIdSchema = z.number().int("User ID must be an integer").positive("User ID must be positive");
  static passwordSchema = z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number and special character");
  static createUserSchema = z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: z.string().min(8, "Password hash is required")
  });
  static userEntitySchema = z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: z.date(),
    passwordHash: z.string().min(8, "Password hash is required")
  });
};

// app/domain/use-cases/transaction/get-all-of-user/schemas.ts
import z2 from "zod";
var GetAllOfUserSchemas = class {
  static {
    __name(this, "GetAllOfUserSchemas");
  }
  static requestSchema = z2.object({
    userId: UserSchemas.userIdSchema
  });
  static httpRequestSchema = z2.object({
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
import { z as z3 } from "zod";
var BankSchemas = class {
  static {
    __name(this, "BankSchemas");
  }
  static nameSchema = z3.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static createBankSchema = z3.object({
    name: this.nameSchema
  });
  static bankEntitySchema = z3.object({
    name: this.nameSchema
  });
};

// app/domain/models/account/schemas/index.ts
import { z as z4 } from "zod";
var AccountSchemas = class {
  static {
    __name(this, "AccountSchemas");
  }
  static nameSchema = z4.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static accountIdSchema = z4.number().int("Account ID must be an integer").positive("Account ID must be positive");
  static accountTypeSchema = z4.nativeEnum(AccountType);
  static balanceSchema = z4.number().refine((val) => Number.isFinite(val), {
    message: "Balance must be a finite number"
  });
  static createAccountSchema = z4.object({
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    userId: UserSchemas.userIdSchema,
    bankName: BankSchemas.nameSchema
  });
  static accountEntitySchema = z4.object({
    id: this.accountIdSchema,
    name: this.nameSchema,
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    createdAt: z4.date()
  });
};

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

// app/domain/use-cases/transaction/get-all-of-user/index.ts
import { ZodError } from "zod";

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
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return GetAllOfUserResponse.failure("Failed to fetch transactions", errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return GetAllOfUserResponse.failure("Failed to fetch transactions", [
      message
    ]);
  }
};

// app/domain/use-cases/transaction/get-all-of-user/index.spec.ts
var mockTransactionRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  findByAccountId: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};
describe("GetAllOfUserUseCase", () => {
  const useCase = new GetAllOfUserUseCase(mockTransactionRepository);
  const userId = UserId.create(1);
  const request = new GetAllOfUserRequest(userId.getValue());
  const mockTransactions = [
    TransactionEntity.create({
      type: TransactionType.TRANSFERENCIA,
      amount: 1e3,
      sourceAccountId: 1,
      destinationAccountId: 2,
      description: "Test transaction 1"
    }),
    TransactionEntity.create({
      type: TransactionType.TRANSFERENCIA,
      amount: 2e3,
      sourceAccountId: 1,
      destinationAccountId: 3,
      description: "Test transaction 2"
    })
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Successful Scenarios", () => {
    it("should return transactions successfully when user has transactions", async () => {
      mockTransactionRepository.findByUserId.mockResolvedValue(mockTransactions);
      const response = await useCase.execute(request);
      expect(response.isSuccess()).toBe(true);
      expect(response.getTransactions()).toEqual(mockTransactions);
      expect(mockTransactionRepository.findByUserId).toHaveBeenCalledWith(userId);
    });
    it("should return empty array when user has no transactions", async () => {
      mockTransactionRepository.findByUserId.mockResolvedValue([]);
      const response = await useCase.execute(request);
      expect(response.isSuccess()).toBe(true);
      expect(response.getTransactions()).toEqual([]);
      expect(response.getMessage()).toBe("No transactions found");
    });
  });
  describe("Error Scenarios", () => {
    it("should handle validation failure for missing user ID", async () => {
      try {
        const invalidRequest = GetAllOfUserRequest.createFromRaw({
          params: {}
        });
        fail("Expected validation error for missing userId");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
    it("should handle validation failure for invalid user ID", async () => {
      try {
        const invalidRequest = GetAllOfUserRequest.createFromRaw({
          params: {
            userId: "invalid"
          }
        });
        fail("Expected validation error for invalid userId");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
//# sourceMappingURL=index.spec.mjs.map