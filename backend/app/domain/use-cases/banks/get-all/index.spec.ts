import { BankRepositoryInterface } from "@models/bank/repository/interfaces";
import { BankEntity } from "@models/bank/entity";
import { GetAllBanksUseCase } from ".";

const mockBankRepository: jest.Mocked<BankRepositoryInterface> = {
  withTransaction: jest.fn(),
  findAll: jest.fn(),
  findByName: jest.fn(),
  delete: jest.fn(),
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
    mockBankRepository.findAll.mockResolvedValue([] as BankEntity[]);

    const response = await useCase.execute();

    expect(response.isSuccess()).toBe(false);
    expect(response.getErrors()).toContain("Bank not found: No banks found");
  });
});