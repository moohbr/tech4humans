import { ZodError } from "zod";
import { AddTransactionToUserRequest } from "@useCases/transaction/add-to-a-user/request";
import { AddTransactionToUserResponse } from "@useCases/transaction/add-to-a-user/response";
import { AddTransactionToUserUseCaseInterface } from "@useCases/transaction/add-to-a-user/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { TransactionRepositoryInterface } from "@models/transaction/repository/interfaces";
import { TransactionEntity } from "@models/transaction/entity";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { AccountNotFoundError } from "@errors/account/account-not-found-error";
import { InsufficientFundsError } from "@errors/transaction/insufficient-funds-error";
import { InvalidTransactionTypeError } from "@errors/transaction/invalid-transaction-type-error";
import { TransactionType } from "@infrastructure/datasources/databases/typeorm/models/enums";

export class AddTransactionToUserUseCase implements AddTransactionToUserUseCaseInterface {
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  public async execute(request: AddTransactionToUserRequest): Promise<AddTransactionToUserResponse> {
    try {
      const transaction = await AppDataSource.transaction(async (manager) => {
        const sourceAccount = await this.accountRepository.findById(request.getSourceAccountIdVO(), manager);
        const destinationAccount = await this.accountRepository.findById(request.getDestinationAccountIdVO(), manager);

        if (!sourceAccount) {
          throw new AccountNotFoundError(request.getSourceAccountIdVO().getValue().toString());
        }
        
        if (!destinationAccount) {
          throw new AccountNotFoundError(request.getDestinationAccountIdVO().getValue().toString());
        }

        switch (request.getType()) {
          case TransactionType.TRANSFERENCIA:
            if (sourceAccount.getBalance().getValue() < request.getAmount().getValue()) {
              throw new InsufficientFundsError();
            }

            const transferAmount = request.getAmount().getValue();
            sourceAccount.decreaseBalance(transferAmount);
            destinationAccount.increaseBalance(transferAmount);
            break;
          default:
            throw new InvalidTransactionTypeError();
        }

        await this.accountRepository.update(request.getSourceAccountIdVO(), sourceAccount, manager);
        await this.accountRepository.update(request.getDestinationAccountIdVO(), destinationAccount, manager);

        const newTransaction = TransactionEntity.create({
          type: request.getType(),
          amount: request.getAmount().getValue(),
          sourceAccountId: request.getSourceAccountId().getValue(),
          destinationAccountId: request.getDestinationAccountId().getValue(),
          description: `
          ${request.getType()} from ${request.getSourceAccountId()} to ${request.getDestinationAccountId()} with amount ${request.getAmount()}`,
        });
        

        return await this.transactionRepository.create(newTransaction, manager);
      });

      return AddTransactionToUserResponse.success(transaction);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): AddTransactionToUserResponse {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      return AddTransactionToUserResponse.validationFailure(errors);
    }

    if (error instanceof AccountNotFoundError) {
      return AddTransactionToUserResponse.failure("", [error.message]);
    }

    if (error instanceof InsufficientFundsError) {
      return AddTransactionToUserResponse.failure("", [error.message]);
    }

    if (error instanceof InvalidTransactionTypeError) {
      return AddTransactionToUserResponse.failure("", [error.message]);
    }

    if (error instanceof Error) {
      if (error.message.includes("Description must have at least 2 characters")) {
        return AddTransactionToUserResponse.failure("", [error.message]);
      }
      return AddTransactionToUserResponse.failure(error.message);
    }

    return AddTransactionToUserResponse.failure("Unknown error occurred");
  }
}