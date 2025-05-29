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
      const name = request.getName();
      const email = request.getEmail();
      const password = request.getPassword();
      const bankName = request.getBankName();
      const accountType = request.getAccountType();
      const accountBalance = request.getAccountBalance();
      const accountName = request.getAccountName();

      const userExists = await this.userRepository.exists(email);
      if (userExists) {
        throw new UserAlreadyExistsError(email.getValue());
      }

      const passwordVO = UserPassword.create(password.getValue());
      const hashedPassword = await passwordVO.hash();

      const bankNameVO = BankName.create(bankName.getValue());
      const bank = await this.bankRepository.findByName(bankNameVO);
      if (!bank) {
        throw new BankNotFoundError(bankName.getValue());
      }

      let user = UserEntity.create(
        name.getValue(),
        email.getValue(),
        hashedPassword.getValue(),
      );

      await AppDataSource.transaction(async (manager) => {
        const transactionalUserRepo = this.userRepository.withTransaction(manager);
        const transactionalAccountRepo = this.accountRepository.withTransaction(manager);

        user = await transactionalUserRepo.create(user);
        logger.info("User created in transaction");

        const account = AccountEntity.create(
          accountName.getValue(),
          accountType.getValue(),
          accountBalance.getValue(),
          user.getId().getValue(),
          bank.getName().getValue(),
        );

        await transactionalAccountRepo.create(account);
        logger.info("Account created in transaction");
      });

      return CreateUserResponse.success(user);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): CreateUserResponse {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      return CreateUserResponse.validationFailure(errors);
    }

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return CreateUserResponse.failure("Houve um erro ao criar o usuário", [message]);
  }
}