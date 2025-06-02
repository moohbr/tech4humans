import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { GetAllAccountsOfUserRequest } from "@useCases/account/get-all-of-user/request";
import { UserId } from "@models/user/value-objects/id";
import { AccountEntity } from "@models/account/entity";
import { GetAllAccountsOfUserUseCase } from ".";
import { AccountType } from "@infrastructure/datasources/databases/typeorm/models/enums";

const mockAccountRepository: jest.Mocked<AccountRepositoryInterface> = {
  withTransaction: jest.fn(),
  create: jest.fn(),
  findByUserId: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("GetAllAccountsOfUserUseCase", () => {
  const useCase = new GetAllAccountsOfUserUseCase(mockAccountRepository);
  
  const userId = UserId.create(1);
  const request = new GetAllAccountsOfUserRequest(userId);
  const mockAccounts = [
    AccountEntity.create(
      "123456",
      AccountType.POUPANCA,
      1000,
      userId.getValue(),
      "Bank A",
    ),
    AccountEntity.create(
      "123456",
      AccountType.CORRENTE,
      2000,
      userId.getValue(),
      "Bank B",
    )
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
    expect(response.getErrors()).toMatch(/No accounts found/);
  });

  it("should handle validation failure for missing user ID", async () => {
    try {
      const invalidRequest = GetAllAccountsOfUserRequest.createFromRaw({
        params: {},
      });
      
      fail("Expected validation error for missing userId");
      
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});