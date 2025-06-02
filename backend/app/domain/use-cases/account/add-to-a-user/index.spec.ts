import { AccountEntity } from "@models/account/entity";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { AccountBalance } from "@models/account/value-objects/balance";
import { AccountName } from "@models/account/value-objects/name";
import { AccountTypeVO } from "@models/account/value-objects/type";
import { BankName } from "@models/bank/value-objects/name";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { UserId } from "@models/user/value-objects/id";
import { AddAccountToUserUseCase } from "@useCases/account/add-to-a-user";
import { AddAccountToUserRequest } from "@useCases/account/add-to-a-user/request";

const mockUserRepository: jest.Mocked<UserRepositoryInterface> = {
  withTransaction: jest.fn(),
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  exists: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockAccountRepository: jest.Mocked<AccountRepositoryInterface> = {
  withTransaction: jest.fn(),
  create: jest.fn(),
  findByUserId: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock("@infrastructure/datasources/databases/typeorm", () => ({
  AppDataSource: {
    transaction: jest.fn((cb) => cb({})),
  },
}));

describe("AddAccountToUserUseCase", () => {
  const useCase = new AddAccountToUserUseCase(
    mockAccountRepository,
    mockUserRepository
  );

  const userId = UserId.createUnsafe(1);
  const accountType = AccountTypeVO.create("Poupança");
  const balance = AccountBalance.create(1000);
  const bankName = BankName.create("Bank of Jest");
  const accountName = AccountName.create("Account of Jest");
  const request = new AddAccountToUserRequest(
    userId,
    accountType,
    balance,
    bankName,
    accountName
  );

  const fakeAccount = AccountEntity.create(
    accountName.getValue(),
    accountType.getValue(),
    balance.getValue(),
    userId.getValue(),
    bankName.getValue(),
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create account successfully", async () => {
    mockUserRepository.findById.mockResolvedValue({ id: 1 } as any);
    mockAccountRepository.create.mockResolvedValue(fakeAccount);

    const response = await useCase.execute(request);

    if (!response.isSuccess()) {
     
    }

    expect(response.isSuccess()).toBe(true);
    if (response.isSuccess()) {
      expect(response.getData()).toEqual(fakeAccount);
    }
    expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    expect(mockAccountRepository.create).toHaveBeenCalled();
  });

  it("should return failure if user is not found", async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const response = await useCase.execute(request);

    expect(response.isSuccess()).toBe(false);
    
    const errors = response.getErrors();
    if (errors && errors.length > 0) {
      fail('Expected user not found error, but got validation errors');
    } else {
      const errorMessage = response.getMessage();
      expect(errorMessage).toBeDefined();
      expect(errorMessage).toMatch(`User with ID ${userId.getValue()} not found`);
    }
  });

  it("should return validation failure for invalid account type", async () => {
    try {
      const invalidRequest = AddAccountToUserRequest.createFromRaw({
        body: {
          user: { id: 1 },
          account: {
            type: "",
            balance: 1000,
            bankName: "Bank of Jest",
          },
        },
      });
      
      const response = await useCase.execute(invalidRequest);
      expect(response.isSuccess()).toBe(false);
      expect(response.getErrors().length).toBeGreaterThan(0);
      
    } catch (error) {
      // console.log("Caught error:", error);
      expect(error).toBeDefined();
    }
  });
});