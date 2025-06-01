import { GetAllAccountsOfUserRequest } from "@useCases/account/get-all-of-user/request";
import { GetAllAccountsOfUserResponse } from "@useCases/account/get-all-of-user/response";
import { GetAllAccountsOfUserUseCaseInterface } from "@useCases/account/get-all-of-user/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { AccountNotFoundError } from "@errors/account/account-not-found-error";
import { logger } from "@infrastructure/logger";

export class GetAllAccountsOfUserUseCase implements GetAllAccountsOfUserUseCaseInterface {
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  public async execute(request: GetAllAccountsOfUserRequest): Promise<GetAllAccountsOfUserResponse> {
    try {
      const userId = request.getUserIdVO();
      logger.info("Starting to fetch user accounts", {
        userId: userId.getValue()
      });
      
      logger.debug("Querying accounts from repository");
      const accounts = await this.accountRepository.findByUserId(userId);
      
      if (!accounts || accounts.length === 0) {
        const error = new AccountNotFoundError("No accounts found");
        logger.warn("No accounts found for user", {
          userId: userId.getValue(),
          error: error.message
        });
        throw error;
      }

      logger.info("Successfully retrieved user accounts", {
        userId: userId.getValue(),
        accountCount: accounts.length,
        totalBalance: accounts.reduce((sum, account) => sum + account.getBalance().getValue(), 0)
      });

      return GetAllAccountsOfUserResponse.success(accounts);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): GetAllAccountsOfUserResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return GetAllAccountsOfUserResponse.failure("Houve um erro ao buscar as contas", errors);
  }
}