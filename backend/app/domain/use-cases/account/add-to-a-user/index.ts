import { ZodError } from "zod";
import { AddAccountToUserRequest } from "@useCases/account/add-to-a-user/request";
import { AddAccountToUserResponse } from "@useCases/account/add-to-a-user/response";
import { AddAccountToUserUseCaseInterface } from "@useCases/account/add-to-a-user/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { AccountEntity } from "@models/account/entity";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { UserNotFoundError } from "@errors/user/user-not-found-error";
import { logger } from "@infrastructure/logger";

export class AddAccountToUserUseCase
  implements AddAccountToUserUseCaseInterface
{
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(
    request: AddAccountToUserRequest,
  ): Promise<AddAccountToUserResponse> {
    try {
      const userId = request.getUserIdVO();
      logger.info("Starting account creation process", {
        userId: userId.getValue(),
        accountName: request.getName().getValue(),
        accountType: request.getAccountTypeVO().getValue(),
        bankName: request.getBankNameVO().getValue()
      });

      logger.debug("Verifying user existence");
      const user = await this.userRepository.findById(userId);
      if (!user) {
        const error = new UserNotFoundError(userId.getValue().toString());
        logger.error("User not found during account creation", {
          userId: userId.getValue(),
          error: error.message
        });
        throw error;
      }

      logger.debug("Creating account entity", {
        accountType: request.getAccountTypeVO().getValue(),
        initialBalance: request.getInitialBalanceVO().getValue()
      });
  
      const account = AccountEntity.create(
        request.getName().getValue(),
        request.getAccountTypeVO().getValue(),
        request.getInitialBalanceVO().getValue(),
        userId.getValue(),
        request.getBankNameVO().getValue(),
      );
  
      logger.info("Starting database transaction for account creation");
      const savedAccount = await AppDataSource.transaction(async (manager) => {
        logger.debug("Persisting account to database");
        const createdAccount = await this.accountRepository.create(account, manager);
        logger.info("Account created successfully", {
          accountId: createdAccount.getId().getValue(),
          userId: userId.getValue(),
          accountType: createdAccount.getType().getValue()
        });
        return createdAccount;
      });
  
      return AddAccountToUserResponse.success(savedAccount);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }

      logger.error("Unexpected error during account creation", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        userId: request.getUserIdVO().getValue()
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): AddAccountToUserResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return AddAccountToUserResponse.failure("Houve um erro ao adicionar a conta", errors);
  }
}
