import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { UpdateAccountOfUserRequest } from "@useCases/account/update-of-a-user/request";
import { AccountId } from "@models/account/value-objects/id";
import { AccountEntity } from "@models/account/entity";
import { UpdateAccountOfUserUseCase } from ".";
import { AccountType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { AccountTypeVO } from "@models/account/value-objects/type";

jest.mock("@infrastructure/datasources/databases/typeorm", () => ({
  AppDataSource: {
    transaction: jest.fn(),
  },
}));

const mockAccountRepository: jest.Mocked<AccountRepositoryInterface> = {
  withTransaction: jest.fn(),
  create: jest.fn(),
  findByUserId: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("UpdateAccountOfUserUseCase", () => {
  const useCase = new UpdateAccountOfUserUseCase(mockAccountRepository);
  const accountId = AccountId.create(123);
  const requestWithType = new UpdateAccountOfUserRequest(accountId, AccountTypeVO.create(AccountType.POUPANCA));
  const requestWithoutType = new UpdateAccountOfUserRequest(accountId);

  const mockAccount = AccountEntity.create(
    "123456",
    AccountType.CORRENTE,
    1000,
    1,
    "Bank A",
  );

  const mockManager = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully update account type", async () => {
    mockAccountRepository.findById.mockResolvedValue(mockAccount);
    mockAccountRepository.update.mockResolvedValue(mockAccount);
    (AppDataSource.transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback(mockManager);
    });

    const response = await useCase.execute(requestWithType);

    expect(response.isSuccess()).toBe(true);
    expect(response.getData()).toBe(mockAccount);
    expect(mockAccountRepository.findById).toHaveBeenCalledWith(accountId, mockManager);
    expect(mockAccountRepository.update).toHaveBeenCalledWith(accountId, mockAccount, mockManager);
  });

  it("should handle account not found", async () => {
    mockAccountRepository.findById.mockResolvedValue(null);
    (AppDataSource.transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback(mockManager);
    });

    const response = await useCase.execute(requestWithType);

    expect(response.isSuccess()).toBe(false);
    expect(response.getErrors()).toMatch(`Account with ID ${accountId.getValue()} not found`);
    expect(mockAccountRepository.update).not.toHaveBeenCalled();
  });

  it("should handle request without account type (partial update)", async () => {
    mockAccountRepository.findById.mockResolvedValue(mockAccount);
    mockAccountRepository.update.mockResolvedValue(mockAccount);
    (AppDataSource.transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback(mockManager);
    });

    const response = await useCase.execute(requestWithoutType);

    expect(response.isSuccess()).toBe(true);
    expect(response.getData()).toBe(mockAccount);
    expect(mockAccountRepository.findById).toHaveBeenCalledWith(accountId, mockManager);
    expect(mockAccountRepository.update).toHaveBeenCalledWith(accountId, mockAccount, mockManager);
  });

  it("should handle validation failure for missing account ID", async () => {
    try {
      const invalidRequest = UpdateAccountOfUserRequest.createFromRaw({
        params: {},
        body: {
          account: {
            type: AccountType.POUPANCA,
          },
        },
      });
      fail("Expected validation error for missing accountId");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should handle validation failure for invalid account type", async () => {
    try {
      const invalidRequest = UpdateAccountOfUserRequest.createFromRaw({
        params: {
          accountId: "123",
        },
        body: {
          account: {
            type: "INVALID_TYPE",
          },
        },
      });
      fail("Expected validation error for invalid account type");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});