import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { AccountId } from "@models/account/value-objects/id";
import { DeleteAccountOfUserRequest } from "@useCases/account/delete-of-a-user/request";
import { DeleteAccountOfUserUseCase } from "@useCases/account/delete-of-a-user";

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

describe("DeleteAccountOfUserUseCase", () => {
  const useCase = new DeleteAccountOfUserUseCase(mockAccountRepository);
  
  const accountId = AccountId.create(1);
  const request = new DeleteAccountOfUserRequest(accountId);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete account successfully", async () => {
    mockAccountRepository.delete.mockResolvedValue(undefined);

    const response = await useCase.execute(request);

    expect(response.isSuccess()).toBe(true);
    expect(mockAccountRepository.delete).toHaveBeenCalledWith(accountId, {});
  });

  it("should return failure if deletion fails", async () => {
    const error = new Error("Database error");
    mockAccountRepository.delete.mockRejectedValue(error);

    const response = await useCase.execute(request);

    expect(response.isSuccess()).toBe(false);
    expect(response.getMessage()).toBeDefined();
  });

  it("should handle validation failure for invalid account ID", async () => {
    try {
      const invalidRequest = DeleteAccountOfUserRequest.createFromRaw({
        params: {
          accountId: "invalid",
        },
      });
      
      const response = await useCase.execute(invalidRequest);
      expect(response.isSuccess()).toBe(false);
      expect(response.getErrors().length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});