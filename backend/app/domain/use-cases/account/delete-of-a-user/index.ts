import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { DeleteAccountOfUserRequest } from "@useCases/account/delete-of-a-user/request";
import { DeleteAccountOfUserUseCaseInterface } from "@useCases/account/delete-of-a-user/interfaces";
import { DeleteAccountOfUserResponse } from "@useCases/account/delete-of-a-user/response";
import { AccountNotFoundError } from "@domain/errors/account/account-not-found-error";
import { logger } from "@infrastructure/logger";

export class DeleteAccountOfUserUseCase implements DeleteAccountOfUserUseCaseInterface {
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  public async execute(request: DeleteAccountOfUserRequest): Promise<DeleteAccountOfUserResponse> {
    try {
      const accountId = request.getAccountIdVO();
      logger.info("Starting account deletion process", {
        accountId: accountId.getValue()
      });

      logger.debug("Verifying account existence");
      const account = await this.accountRepository.findById(accountId);
      if (!account) {
        const error = new AccountNotFoundError(request.getAccountId().toString());
        logger.error("Account not found during deletion", {
          accountId: accountId.getValue(),
          error: error.message
        });
        throw error;
      }

      logger.debug("Deleting account", {
        accountId: accountId.getValue(),
        accountType: account.getType().getValue(),
        balance: account.getBalance().getValue()
      });

      await this.accountRepository.delete(accountId);
      
      logger.info("Account deleted successfully", {
        accountId: accountId.getValue()
      });
  
      return DeleteAccountOfUserResponse.success();
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): DeleteAccountOfUserResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return DeleteAccountOfUserResponse.failure("Houve um erro ao deletar a conta", errors);
  }
}
