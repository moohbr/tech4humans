import { ZodError } from "zod";
import { CreateUserUseCase } from "./index";
import { CreateUserRequest } from "./request";
import { CreateUserResponse } from "./response";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { BankRepositoryInterface } from "@models/bank/repository/interfaces";
import { UserEntity } from "@models/user/entity";
import { AccountEntity } from "@models/account/entity";
import { BankEntity } from "@models/bank/entity";
import { UserAlreadyExistsError } from "@errors/user/user-already-exists-error";
import { BankNotFoundError } from "@errors/bank/bank-not-found-error";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { CreateUserSchemas } from "./schemas";
import { UserId } from "@models/user/value-objects/id";
import { AccountId } from "@models/account/value-objects/id";
import { BankName } from "@models/bank/value-objects/name";

import { UserEmail } from "@models/user/value-objects/email";
import { UserName } from "@models/user/value-objects/name";
import { AccountBalance } from "@models/account/value-objects/balance";
import { AccountTypeVO } from "@models/account/value-objects/type";
import { UserPassword } from "@models/user/value-objects/password";
import { AccountType } from "@infrastructure/datasources/databases/typeorm/models/enums";
// Mock the dependencies
jest.mock("@infrastructure/datasources/databases/typeorm");
jest.mock("./schemas", () => ({
  CreateUserSchemas: {
    httpRequestSchema: {
      parse: jest.fn(),
    },
  },
}));
jest.mock("@models/user/entity", () => ({
  UserEntity: {
    create: jest.fn(),
  },
}));
jest.mock("@models/account/entity", () => ({
  AccountEntity: {
    create: jest.fn(),
  },
}));
jest.mock("@models/user/value-objects/id", () => ({
  UserId: {
    create: jest.fn(),
  },
}));
jest.mock("@models/account/value-objects/id", () => ({
  AccountId: {
    create: jest.fn(),
  },
}));
jest.mock("@models/bank/value-objects/name", () => ({
  BankName: {
    create: jest.fn(),
  },
}));

describe("CreateUserUseCase", () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<UserRepositoryInterface>;
  let accountRepository: jest.Mocked<AccountRepositoryInterface>;
  let bankRepository: jest.Mocked<BankRepositoryInterface>;
  let mockRequest: CreateUserRequest;

  beforeEach(() => {
    jest.clearAllMocks();

    userRepository = {
      exists: jest.fn(),
      create: jest.fn(),
      withTransaction: jest.fn().mockReturnThis(),
    } as any;

    accountRepository = {
      create: jest.fn(),
      withTransaction: jest.fn().mockReturnThis(),
    } as any;

    bankRepository = {
      findByName: jest.fn(),
    } as any;

    useCase = new CreateUserUseCase(
      userRepository,
      accountRepository,
      bankRepository
    );

    mockRequest = new CreateUserRequest(
      UserName.create("John Doe"),
      UserEmail.create("john@example.com"),
      UserPassword.create("Password@123"),
      AccountTypeVO.create(AccountType.POUPANCA),
      AccountBalance.create(1000),
      BankName.create("Test Bank")
    );

    (AppDataSource.transaction as jest.Mock).mockImplementation(async (cb) => {
      return cb({});
    });

    (UserId.create as jest.Mock).mockReturnValue({ value: 123 });
    (AccountId.create as jest.Mock).mockReturnValue({ value: 123 });
    (BankName.create as jest.Mock).mockReturnValue({ value: "Test Bank" });
    (UserEntity.create as jest.Mock).mockReturnValue({
      id: { getValue: () => 123 },
      name: { getValue: () => "John Doe" },
      email: { getValue: () => "john@example.com" },
      password: { getValue: () => "password123" },
      createdAt: new Date(),
      getId: jest.fn().mockReturnValue({ getValue: () => 123 }),
      getName: jest.fn().mockReturnValue("John Doe"),
      getEmail: jest.fn().mockReturnValue("john@example.com"),
      toPersistence: jest.fn(),
      toJSON: jest.fn(),
    });
    (AccountEntity.create as jest.Mock).mockReturnValue({
      id: { getValue: () => 123 },
      type: { getValue: () => AccountType.POUPANCA },
      balance: { getValue: () => 1000 },
      createdAt: new Date(),
      userId: { getValue: () => 123 },
      bankName: { getValue: () => "Test Bank" },
      getId: jest.fn().mockReturnValue({ getValue: () => 123 }),
      getBalance: jest.fn().mockReturnValue(1000),
      getUserId: jest.fn().mockReturnValue(123),
      toPersistence: jest.fn(),
      toJSON: jest.fn(),
      increaseBalance: jest.fn(),
      decreaseBalance: jest.fn(),
      setType: jest.fn(),
    });
  });

  it("should successfully create a user and account", async () => {
    // Arrange
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
        account: {
          type: AccountType.POUPANCA,
          balance: 1000,
          bankName: "Test Bank",
        },
      },
    };

    (CreateUserSchemas.httpRequestSchema.parse as jest.Mock).mockReturnValue(validatedData);
    userRepository.exists.mockResolvedValue(false);

    const mockBank = {
      name: { getValue: () => "Test Bank" },
      getName: jest.fn().mockReturnValue({ getValue: () => "Test Bank" }),
      toPersistence: jest.fn(),
      toJSON: jest.fn(),
    } as unknown as BankEntity;
    bankRepository.findByName.mockResolvedValue(mockBank);

    const mockUser = {
      id: { getValue: () => 123 },
      name: { getValue: () => "John Doe" },
      email: { getValue: () => "john@example.com" },
      password: { getValue: () => "password123" },
      createdAt: new Date(),
      getId: jest.fn().mockReturnValue({ getValue: () => 123 }),
      getName: jest.fn().mockReturnValue("John Doe"),
      getEmail: jest.fn().mockReturnValue("john@example.com"),
      toPersistence: jest.fn(),
      toJSON: jest.fn(),
    } as unknown as UserEntity;
    userRepository.create.mockResolvedValue(mockUser);

    const mockAccount = {
      id: { getValue: () => 123 },
      type: { getValue: () => AccountType.POUPANCA },
      balance: { getValue: () => 1000 },
      createdAt: new Date(),
      userId: { getValue: () => 123 },
      bankName: { getValue: () => "Test Bank" },
      toPersistence: jest.fn(),
      toJSON: jest.fn(),
      increaseBalance: jest.fn(),
      decreaseBalance: jest.fn(),
      getBalance: jest.fn().mockReturnValue(1000),
      getUserId: jest.fn().mockReturnValue(123),
      setType: jest.fn(),
    } as unknown as AccountEntity;
    accountRepository.create.mockResolvedValue(mockAccount);

    // Act
    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(true);
    expect(CreateUserSchemas.httpRequestSchema.parse).toHaveBeenCalledWith({
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
        account: {
          type: AccountType.POUPANCA,
          balance: 1000,
          bankName: "Test Bank",
        },
      },
    });
    expect(userRepository.exists).toHaveBeenCalled();
    expect(BankName.create).toHaveBeenCalledWith("Test Bank");
    expect(bankRepository.findByName).toHaveBeenCalled();
    expect(UserEntity.create).toHaveBeenCalledWith("John Doe", "john@example.com", "password123");
    expect(userRepository.create).toHaveBeenCalled();
    expect(AccountEntity.create).toHaveBeenCalledWith(AccountType.POUPANCA, 1000, expect.any(Object), expect.any(Object));
    expect(accountRepository.create).toHaveBeenCalled();
  });

  it("should fail if user already exists", async () => {
    // Arrange
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
        account: {
          type: AccountType.POUPANCA,
          balance: 1000,
          bankName: "Test Bank",
        },
      },
    };

    (CreateUserSchemas.httpRequestSchema.parse as jest.Mock).mockReturnValue(validatedData);
    userRepository.exists.mockResolvedValue(true);

    // Act
    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toContain("User already exists");
  });

  it("should fail if bank not found", async () => {
    // Arrange
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "Password@123",
        },
        account: {
          type: AccountType.POUPANCA,
          balance: 1000,
          bankName: "Test Bank",
        },
      },
    };

    (CreateUserSchemas.httpRequestSchema.parse as jest.Mock).mockReturnValue(validatedData);
    userRepository.exists.mockResolvedValue(false);
    bankRepository.findByName.mockResolvedValue(null);

    // Act
    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toContain("Bank not found");
  });

  it("should fail with validation error for invalid email", async () => {
    // Arrange
    const invalidRequest = new CreateUserRequest(
      UserName.create("John Doe"),
      UserEmail.create("invalid-email"),
      UserPassword.create("password123"),
      AccountTypeVO.create(AccountType.POUPANCA),
      AccountBalance.create(1000),
      BankName.create("Test Bank")
    );

    const zodError = new ZodError([
      {
        code: "invalid_string",
        validation: "email",
        message: "Invalid email format",
        path: ["body", "user", "email"],
      },
    ]);

    (CreateUserSchemas.httpRequestSchema.parse as jest.Mock).mockImplementation(() => {
      throw zodError;
    });

    // Act
    const result = await useCase.execute(invalidRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Validation failed");
    expect(result.getErrors()).toContain("body.user.email: Invalid email format");
  });

  it("should fail with validation error for invalid password", async () => {
    // Arrange
    const invalidRequest = new CreateUserRequest(
      UserName.create("John Doe"),
      UserEmail.create("john@example.com"),
      UserPassword.create("short"),
      AccountTypeVO.create(AccountType.POUPANCA),
      AccountBalance.create(1000),
      BankName.create("Test Bank")
    );

    const zodError = new ZodError([
      {
        code: "too_small",
        minimum: 8,
        type: "string",
        inclusive: true,
        exact: false,
        message: "Password must be at least 8 characters long",
        path: ["body", "user", "password"],
      },
    ]);

    (CreateUserSchemas.httpRequestSchema.parse as jest.Mock).mockImplementation(() => {
      throw zodError;
    });

    // Act
    const result = await useCase.execute(invalidRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Validation failed");
    expect(result.getErrors()).toContain("body.user.password: Password must be at least 8 characters long");
  });

  it("should fail with validation error for invalid account balance", async () => {
    // Arrange
    const invalidRequest = new CreateUserRequest(
      UserName.create("John Doe"),
      UserEmail.create("john@example.com"),
      UserPassword.create("Password@123"),
      AccountTypeVO.create(AccountType.POUPANCA),
      AccountBalance.create(-100),
      BankName.create("Test Bank")
    );

    const zodError = new ZodError([
      {
        code: "too_small",
        minimum: 0,
        type: "number",
        inclusive: true,
        exact: false,
        message: "Balance cannot be negative",
        path: ["body", "account", "balance"],
      },
    ]);

    (CreateUserSchemas.httpRequestSchema.parse as jest.Mock).mockImplementation(() => {
      throw zodError;
    });

    // Act
    const result = await useCase.execute(invalidRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Validation failed");
    expect(result.getErrors()).toContain("body.account.balance: Balance cannot be negative");
  });

  it("should handle unknown errors", async () => {
    // Arrange
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
        account: {
          type: AccountType.POUPANCA,
          balance: 1000,
          bankName: "Test Bank",
        },
      },
    };

    (CreateUserSchemas.httpRequestSchema.parse as jest.Mock).mockReturnValue(validatedData);
    userRepository.exists.mockRejectedValue(new Error("Database connection failed"));

    // Act
    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Database connection failed");
  });

  it("should handle transaction rollback on error", async () => {
    // Arrange
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
        account: {
          type: AccountType.POUPANCA,
          balance: 1000,
          bankName: "Test Bank",
        },
      },
    };

    (CreateUserSchemas.httpRequestSchema.parse as jest.Mock).mockReturnValue(validatedData);
    userRepository.exists.mockResolvedValue(false);

    const mockBank = {
      getName: () => ({ getValue: () => "Test Bank" }),
    } as BankEntity;
    bankRepository.findByName.mockResolvedValue(mockBank);

    // Mock user creation success but account creation failure
    const mockUser = {
      id: { getValue: () => 123 },
      name: { getValue: () => "John Doe" },
      email: { getValue: () => "john@example.com" },
      password: { getValue: () => "Password@123" },
      createdAt: new Date(),
      getId: jest.fn().mockReturnValue({ getValue: () => 123 }),
      getName: jest.fn().mockReturnValue("John Doe"),
      getEmail: jest.fn().mockReturnValue("john@example.com"),
      toPersistence: jest.fn(),
      toJSON: jest.fn(),
    } as unknown as UserEntity;
    userRepository.create.mockResolvedValue(mockUser);
    accountRepository.create.mockRejectedValue(new Error("Account creation failed"));

    // Act
    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Account creation failed");
    expect(AppDataSource.transaction).toHaveBeenCalled();
  });
});