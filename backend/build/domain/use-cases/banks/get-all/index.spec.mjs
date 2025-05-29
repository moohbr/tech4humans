var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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

// app/domain/use-cases/banks/get-all/index.spec.ts
var mockBankRepository = {
  withTransaction: jest.fn(),
  findAll: jest.fn(),
  findByName: jest.fn(),
  delete: jest.fn()
};
describe("GetAllBanksUseCase", () => {
  const useCase = new GetAllBanksUseCase(mockBankRepository);
  const mockBanks = [
    BankEntity.create("Bank A"),
    BankEntity.create("Bank B"),
    BankEntity.create("Bank C")
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return banks successfully when banks exist", async () => {
    mockBankRepository.findAll.mockResolvedValue(mockBanks);
    const response = await useCase.execute();
    expect(response.isSuccess()).toBe(true);
    expect(response.getBanks()).toEqual(mockBanks);
    expect(mockBankRepository.findAll).toHaveBeenCalledTimes(1);
  });
  it("should return failure when no banks exist (null)", async () => {
    mockBankRepository.findAll.mockResolvedValue([]);
    const response = await useCase.execute();
    expect(response.isSuccess()).toBe(false);
    expect(response.getErrors()).toContain("Bank not found: No banks found");
  });
});
//# sourceMappingURL=index.spec.mjs.map