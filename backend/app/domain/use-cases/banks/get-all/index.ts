import { GetAllBanksResponse } from "@useCases/banks/get-all/response";
import { GetAllBanksUseCaseInterface } from "@useCases/banks/get-all/interfaces";
import { BankRepositoryInterface } from "@models/bank/repository/interfaces";
import { BankNotFoundError } from "@domain/errors/bank/bank-not-found-error";

export class GetAllBanksUseCase implements GetAllBanksUseCaseInterface {
  constructor(private readonly bankRepository: BankRepositoryInterface) {}

  async execute(): Promise<GetAllBanksResponse> {
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

  private handleError(error: unknown): GetAllBanksResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return GetAllBanksResponse.failure(message, []);
  }
}