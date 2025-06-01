import { ZodError } from "zod";
import { CreateUserRequest } from "@useCases/user/create/request";
import { CreateUserResponse } from "@useCases/user/create/response";
import { CreateUserUseCaseInterface } from "@useCases/user/create/interfaces";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { UserPassword } from "@models/user/value-objects/password";
import { UserEntity } from "@models/user/entity";
import { AccountEntity } from "@models/account/entity";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { BankRepositoryInterface } from "@models/bank/repository/interfaces";
import { BankName } from "@models/bank/value-objects/name";
import { BankNotFoundError } from "@errors/bank/bank-not-found-error";
import { UserAlreadyExistsError } from "@errors/user/user-already-exists-error";
import { logger } from "@infrastructure/logger";

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly accountRepository: AccountRepositoryInterface,
    private readonly bankRepository: BankRepositoryInterface,
  ) { }

  public async execute(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      logger.info("Starting user creation process");

      const userExists = await this.userRepository.exists(request.getEmail());
      if (userExists) {
        const error = new UserAlreadyExistsError(request.getEmail().getValue());
        logger.error("User already exists", {
          email: request.getEmail().getValue(),
          error: error.message
        });
        throw error;
      }

      logger.debug("Checking bank existence", { bankName: request.getBankName().getValue() });
      const bank = await this.bankRepository.findByName(request.getBankName());
      if (!bank) {
        const error = new BankNotFoundError(request.getBankName().getValue());
        logger.error("Bank not found during user creation", {
          bankName: request.getBankName().getValue(),
          error: error.message
        });
        throw error;
      }

      const hashedPassword = await request.getPassword().hash();

      const user = UserEntity.create(
        request.getName().getValue(),
        request.getEmail().getValue(),
        hashedPassword.getValue()
      );

      logger.info("Starting transaction for user and account creation");

      const createdUser = await AppDataSource.transaction(async (manager) => {
        const transactionalUserRepo = this.userRepository.withTransaction(manager);
        const transactionalAccountRepo = this.accountRepository.withTransaction(manager);

        const newUser = await transactionalUserRepo.create(user);
        logger.info("User created in transaction", {
          userId: newUser.getId().getValue(),
          email: newUser.getEmail().getValue()
        });

        const account = AccountEntity.create(
          request.getAccountName().getValue(),
          request.getAccountType().getValue(),
          request.getAccountBalance().getValue(),
          newUser.getId().getValue(),
          bank.getName().getValue()
        );

        const createdAccount = await transactionalAccountRepo.create(account);
        logger.info("Account created in transaction", {
          accountId: createdAccount.getId().getValue(),
          userId: newUser.getId().getValue()
        });

        return newUser;
      });

      logger.info("User creation process completed successfully", {
        userId: createdUser.getId().getValue(),
        email: createdUser.getEmail().getValue()
      });

      return CreateUserResponse.success(createdUser);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError || error instanceof BankNotFoundError) {
        throw error;
      }

      logger.error("Unexpected error during user creation", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): CreateUserResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return CreateUserResponse.failure("Houve um erro ao criar o usuário", errors);
  }
}