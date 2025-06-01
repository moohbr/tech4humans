import { UpdateAccountOfUserRequest } from "@useCases/account/update-of-a-user/request";
import { UpdateAccountOfUserResponse } from "@useCases/account/update-of-a-user/response";
import { UpdateAccountOfUserUseCaseInterface } from "@useCases/account/update-of-a-user/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { AccountEntity } from "@models/account/entity";
import { AccountNotFoundError } from "@errors/account/account-not-found-error";
import { logger } from "@infrastructure/logger";

export class UpdateAccountOfUserUseCase implements UpdateAccountOfUserUseCaseInterface {
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  public async execute(request: UpdateAccountOfUserRequest): Promise<UpdateAccountOfUserResponse> {
    try {
      const accountId = request.getAccountIdVO();
      logger.info("Starting account update process", {
        accountId: accountId.getValue(),
        hasNameUpdate: request.hasName(),
        hasTypeUpdate: request.hasAccountType(),
        hasBankUpdate: request.hasBankName()
      });

      logger.debug("Verifying account existence");
      const account = await this.accountRepository.findById(accountId);
      if (!account) {
        const error = new AccountNotFoundError(accountId.getValue().toString());
        logger.error("Account not found during update", {
          accountId: accountId.getValue(),
          error: error.message
        });
        throw error;
      }

      logger.debug("Creating updated account entity", {
        accountId: accountId.getValue(),
        updatedFields: {
          name: request.hasName(),
          type: request.hasAccountType(),
          bankName: request.hasBankName()
        }
      });

      const updatedAccount = await this.accountRepository.update(
        accountId,
        AccountEntity.create(
          request.hasName() ? request.getName().getValue() : account.getName().getValue(),
          request.hasAccountType() ? request.getAccountType().getValue() : account.getType().getValue(),
          account.getBalance().getValue(),
          account.getUserId().getValue(),
          request.hasBankName() ? request.getBankName().getValue() : account.getBankName().getValue()
        )
      );

      logger.info("Account updated successfully", {
        accountId: updatedAccount.getId().getValue(),
        type: updatedAccount.getType().getValue(),
        balance: updatedAccount.getBalance().getValue()
      });

      return UpdateAccountOfUserResponse.success(updatedAccount);
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        throw error;
      }

      logger.error("Unexpected error during account update", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        accountId: request.getAccountId()
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): UpdateAccountOfUserResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return UpdateAccountOfUserResponse.failure("Houve um erro ao atualizar a conta", errors);
  }
}