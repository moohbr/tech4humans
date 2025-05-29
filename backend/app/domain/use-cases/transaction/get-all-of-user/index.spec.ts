import { TransactionRepositoryInterface } from "@models/transaction/repository/interfaces";
import { GetAllOfUserRequest } from "@useCases/transaction/get-all-of-user/request";
import { UserId } from "@models/user/value-objects/id";
import { TransactionEntity } from "@models/transaction/entity";
import { GetAllOfUserUseCase } from ".";
import { TransactionType } from "@infrastructure/datasources/databases/typeorm/models/enums";

const mockTransactionRepository: jest.Mocked<TransactionRepositoryInterface> = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  findByAccountId: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("GetAllOfUserUseCase", () => {
  const useCase = new GetAllOfUserUseCase(mockTransactionRepository);
  
  const userId = UserId.create(1);
  const request = new GetAllOfUserRequest(userId.getValue());

  const mockTransactions = [
    TransactionEntity.create({
      type: TransactionType.TRANSFERENCIA,
      amount: 1000,
      sourceAccountId: 1,
      destinationAccountId: 2,
      description: "Test transaction 1",
    }),
    TransactionEntity.create({
      type: TransactionType.TRANSFERENCIA,
      amount: 2000,
      sourceAccountId: 1,
      destinationAccountId: 3,
      description: "Test transaction 2",
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
          params: {},
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
            userId: "invalid",
          },
        });
        
        fail("Expected validation error for invalid userId");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
