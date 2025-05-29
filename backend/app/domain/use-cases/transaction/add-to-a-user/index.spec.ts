import { AddTransactionToUserRequest } from "@useCases/transaction/add-to-a-user/request";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { TransactionRepositoryInterface } from "@models/transaction/repository/interfaces";
import { TransactionEntity } from "@models/transaction/entity";
import { AccountId } from "@models/account/value-objects/id";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { TransactionType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { AddTransactionToUserUseCase } from ".";

jest.mock("@infrastructure/datasources/databases/typeorm");

describe("AddTransactionToUserUseCase", () => {
  let useCase: AddTransactionToUserUseCase;
  let mockAccountRepository: jest.Mocked<AccountRepositoryInterface>;
  let mockTransactionRepository: jest.Mocked<TransactionRepositoryInterface>;
  let mockManager: any;
  let mockRequest: jest.Mocked<AddTransactionToUserRequest>;

  beforeEach(() => {
    mockAccountRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    mockTransactionRepository = {
      create: jest.fn(),
    } as any;

    mockManager = {};

    mockRequest = {
      getSourceAccountIdVO: jest.fn(),
      getDestinationAccountIdVO: jest.fn(),
      getType: jest.fn(),
      getAmount: jest.fn(),
      getSourceAccountId: jest.fn(),
      getDestinationAccountId: jest.fn(),
    } as any;

    (AppDataSource.transaction as jest.Mock) = jest.fn().mockImplementation(
      (callback) => callback(mockManager)
    );

    useCase = new AddTransactionToUserUseCase(
      mockAccountRepository,
      mockTransactionRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful Transaction", () => {
    it("should successfully transfer money between accounts", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);

      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(100);
      mockRequest.getSourceAccountId.mockReturnValue(1);
      mockRequest.getDestinationAccountId.mockReturnValue(2);

      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500),
        decreaseBalance: jest.fn(),
      } as any;

      const destinationAccount = {
        increaseBalance: jest.fn(),
      } as any;

      const createdTransaction = {
        id: "trans-789",
        type: TransactionType.TRANSFERENCIA,
        amount: 100,
      } as any;

      mockAccountRepository.findById
        .mockResolvedValueOnce(sourceAccount)
        .mockResolvedValueOnce(destinationAccount);
      mockTransactionRepository.create.mockResolvedValue(createdTransaction);

      const result = await useCase.execute(mockRequest);

      expect(result.isSuccess()).toBe(true);
      expect(result.getMessage()).toEqual(createdTransaction);
      expect(mockRequest.getSourceAccountIdVO).toHaveBeenCalledTimes(2);
      expect(mockRequest.getDestinationAccountIdVO).toHaveBeenCalledTimes(2);
      expect(mockRequest.getType).toHaveBeenCalledTimes(3);
      expect(mockRequest.getAmount).toHaveBeenCalledTimes(4);
      expect(sourceAccount.decreaseBalance).toHaveBeenCalledWith(100);
      expect(destinationAccount.increaseBalance).toHaveBeenCalledWith(100);
      expect(mockAccountRepository.update).toHaveBeenCalledTimes(2);
      expect(mockTransactionRepository.create).toHaveBeenCalledWith(
        expect.any(TransactionEntity),
        mockManager
      );
    });
  });

  describe("Account Not Found Errors", () => {
    it("should return error when source account is not found", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);

      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);

      const destinationAccount = {} as any;

      mockAccountRepository.findById
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(destinationAccount);

      const result = await useCase.execute(mockRequest);

      expect(result.isSuccess()).toBe(false);
      expect(result.getErrors()).toContain(`Account with ID ${sourceAccountId.getValue()} not found`);
      expect(mockAccountRepository.update).not.toHaveBeenCalled();
      expect(mockTransactionRepository.create).not.toHaveBeenCalled();
    });

    it("should return error when destination account is not found", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);

      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);

      const sourceAccount = {} as any;

      mockAccountRepository.findById
        .mockResolvedValueOnce(sourceAccount)
        .mockResolvedValueOnce(null);

      const result = await useCase.execute(mockRequest);

      expect(result.isSuccess()).toBe(false);
      expect(result.getErrors()).toContain(
        `Account with ID ${destinationAccountId.getValue()} not found`
      );
      expect(mockAccountRepository.update).not.toHaveBeenCalled();
      expect(mockTransactionRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("Insufficient Funds Error", () => {
    it("should return error when source account has insufficient funds", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);

      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(1000);

      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500),
      } as any;

      const destinationAccount = {} as any;

      mockAccountRepository.findById
        .mockResolvedValueOnce(sourceAccount)
        .mockResolvedValueOnce(destinationAccount);

      const result = await useCase.execute(mockRequest);

      expect(result.isSuccess()).toBe(false);
      expect(result.getErrors()).toContain("Insufficient funds");
      expect(mockAccountRepository.update).not.toHaveBeenCalled();
      expect(mockTransactionRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("Invalid Transaction Type Error", () => {
    it("should return error for unsupported transaction type", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);

      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue("INVALID_TYPE" as any);

      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500),
      } as any;

      const destinationAccount = {} as any;

      mockAccountRepository.findById
        .mockResolvedValueOnce(sourceAccount)
        .mockResolvedValueOnce(destinationAccount);

      const result = await useCase.execute(mockRequest);

      expect(result.isSuccess()).toBe(false);
      expect(result.getErrors()).toContain("Invalid transaction type");
      expect(mockAccountRepository.update).not.toHaveBeenCalled();
      expect(mockTransactionRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("Database Transaction Rollback", () => {
    it("should rollback transaction when an error occurs", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);

      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(100);

      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500),
        decreaseBalance: jest.fn(),
      } as any;

      const destinationAccount = {
        increaseBalance: jest.fn(),
      } as any;

      mockAccountRepository.findById
        .mockResolvedValueOnce(sourceAccount)
        .mockResolvedValueOnce(destinationAccount);
      mockAccountRepository.update.mockRejectedValue(
        new Error("Update failed")
      );

      const result = await useCase.execute(mockRequest);

      expect(result.isSuccess()).toBe(false);
      expect(result.getErrors()).toContain("Update failed");
      expect(AppDataSource.transaction).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero amount transactions", async () => {
      const sourceAccountId = AccountId.create(1);
      const destinationAccountId = AccountId.create(2);

      mockRequest.getSourceAccountIdVO.mockReturnValue(sourceAccountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(destinationAccountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(0);
      mockRequest.getSourceAccountId.mockReturnValue(1);
      mockRequest.getDestinationAccountId.mockReturnValue(2);

      const sourceAccount = {
        getBalance: jest.fn().mockReturnValue(500),
        decreaseBalance: jest.fn(),
      } as any;

      const destinationAccount = {
        increaseBalance: jest.fn(),
      } as any;

      const createdTransaction = {
        id: "trans-789",
        type: TransactionType.TRANSFERENCIA,
        amount: 0,
      } as any;

      mockAccountRepository.findById
        .mockResolvedValueOnce(sourceAccount)
        .mockResolvedValueOnce(destinationAccount);
      mockTransactionRepository.create.mockResolvedValue(createdTransaction);

      const result = await useCase.execute(mockRequest);

      expect(result.isSuccess()).toBe(true);
      expect(sourceAccount.decreaseBalance).toHaveBeenCalledWith(0);
      expect(destinationAccount.increaseBalance).toHaveBeenCalledWith(0);
    });

    it("should handle same account transfer (source equals destination)", async () => {
      const accountId = AccountId.create(1);

      mockRequest.getSourceAccountIdVO.mockReturnValue(accountId);
      mockRequest.getDestinationAccountIdVO.mockReturnValue(accountId);
      mockRequest.getType.mockReturnValue(TransactionType.TRANSFERENCIA);
      mockRequest.getAmount.mockReturnValue(100);
      mockRequest.getSourceAccountId.mockReturnValue(1);
      mockRequest.getDestinationAccountId.mockReturnValue(1);

      const account = {
        getBalance: jest.fn().mockReturnValue(500),
        decreaseBalance: jest.fn(),
        increaseBalance: jest.fn(),
      } as any;

      const createdTransaction = {
        id: "trans-789",
        type: TransactionType.TRANSFERENCIA,
        amount: 100,
      } as any;

      mockAccountRepository.findById
        .mockResolvedValue(account); 
      mockTransactionRepository.create.mockResolvedValue(createdTransaction);

      const result = await useCase.execute(mockRequest);

      expect(result.isSuccess()).toBe(true);
      expect(account.decreaseBalance).toHaveBeenCalledWith(100);
      expect(account.increaseBalance).toHaveBeenCalledWith(100);
    });
  });
});