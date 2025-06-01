import { GetAllBanksResponse } from "@useCases/banks/get-all/response";
import { GetAllBanksUseCaseInterface } from "@useCases/banks/get-all/interfaces";
import { BankRepositoryInterface } from "@models/bank/repository/interfaces";
import { BankNotFoundError } from "@errors/bank/bank-not-found-error";
import { logger } from "@infrastructure/logger";

export class GetAllBanksUseCase implements GetAllBanksUseCaseInterface {
  constructor(
    private readonly bankRepository: BankRepositoryInterface,
  ) {}

  public async execute(): Promise<GetAllBanksResponse> {
    try {
      logger.info("Starting to fetch all banks");

      logger.debug("Querying bank repository");
      const banks = await this.bankRepository.findAll();

      if (!banks || banks.length === 0) {
        const error = new BankNotFoundError("No banks found");
        logger.warn("No banks found in the system", {
          error: error.message
        });
        throw error;
      }

      logger.info("Successfully retrieved banks", {
        bankCount: banks.length,
        bankNames: banks.map(bank => bank.getName().getValue())
      });

      return GetAllBanksResponse.success(banks);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): GetAllBanksResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return GetAllBanksResponse.failure("Houve um erro ao buscar os bancos", errors);
  }
}