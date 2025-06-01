import { AddTransactionToUserRequest } from "@useCases/transaction/add-to-a-user/request";
import { AddTransactionToUserResponse } from "@useCases/transaction/add-to-a-user/response";
import { AddTransactionToUserUseCaseInterface } from "@useCases/transaction/add-to-a-user/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { TransactionRepositoryInterface } from "@models/transaction/repository/interfaces";
import { TransactionEntity } from "@models/transaction/entity";
import { TransactionType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { AccountNotFoundError } from "@errors/account/account-not-found-error";
import { InsufficientFundsError } from "@errors/transaction/insufficient-funds-error";
import { InvalidTransactionTypeError } from "@errors/transaction/invalid-transaction-type-error";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { logger } from "@infrastructure/logger";

export class AddTransactionToUserUseCase implements AddTransactionToUserUseCaseInterface {
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  public async execute(request: AddTransactionToUserRequest): Promise<AddTransactionToUserResponse> {
    try {
      logger.info("Starting transaction creation process", {
        sourceAccountId: request.getSourceAccountId().getValue(),
        destinationAccountId: request.getDestinationAccountId().getValue(),
        type: request.getType(),
        amount: request.getAmount().getValue()
      });

      const transaction = await AppDataSource.transaction(async (manager) => {
        logger.debug("Finding source and destination accounts");
        
        const sourceAccount = await this.accountRepository.findById(request.getSourceAccountId(), manager);
        const destinationAccount = await this.accountRepository.findById(request.getDestinationAccountId(), manager);

        if (!sourceAccount) {
          const error = new AccountNotFoundError(request.getSourceAccountId().getValue().toString());
          logger.error("Source account not found", {
            accountId: request.getSourceAccountId().getValue(),
            error: error.message
          });
          throw error;
        }
        
        if (!destinationAccount) {
          const error = new AccountNotFoundError(request.getDestinationAccountId().getValue().toString());
          logger.error("Destination account not found", {
            accountId: request.getDestinationAccountId().getValue(),
            error: error.message
          });
          throw error;
        }

        logger.debug("Processing transaction based on type", { type: request.getType() });

        switch (request.getType()) {
          case TransactionType.TRANSFERENCIA:
            if (sourceAccount.getBalance().getValue() < request.getAmount().getValue()) {
              const error = new InsufficientFundsError();
              logger.error("Insufficient funds for transfer", {
                sourceAccountId: sourceAccount.getId().getValue(),
                currentBalance: sourceAccount.getBalance().getValue(),
                requiredAmount: request.getAmount().getValue(),
                error: error.message
              });
              throw error;
            }

            sourceAccount.decreaseBalance(request.getAmount().getValue());
            destinationAccount.increaseBalance(request.getAmount().getValue());

            logger.info("Balance updated for accounts", {
              sourceAccountId: sourceAccount.getId().getValue(),
              destinationAccountId: destinationAccount.getId().getValue(),
              amount: request.getAmount().getValue()
            });
            break;
          default:
            const error = new InvalidTransactionTypeError();
            logger.error("Invalid transaction type", {
              type: request.getType(),
              error: error.message
            });
            throw error;
        }

        await this.accountRepository.update(request.getSourceAccountId(), sourceAccount, manager);
        await this.accountRepository.update(request.getDestinationAccountId(), destinationAccount, manager);

        logger.debug("Creating transaction record");
        
        const newTransaction = TransactionEntity.create({
          type: request.getType(),
          amount: request.getAmount().getValue(),
          sourceAccountId: request.getSourceAccountId().getValue(),
          destinationAccountId: request.getDestinationAccountId().getValue(),
          description: `${request.getType()} from account ${request.getSourceAccountId().getValue()} to ${request.getDestinationAccountId().getValue()} with amount ${request.getAmount().getValue()}`
        });

        const savedTransaction = await this.transactionRepository.create(newTransaction, manager);
        
        if (!savedTransaction) {
          throw new Error("Failed to create transaction");
        }
        
        logger.info("Transaction created successfully", {
          transactionId: savedTransaction.getId()?.getValue() ?? 'new',
          type: savedTransaction.getType().getValue(),
          amount: savedTransaction.getAmount().getValue()
        });

        return savedTransaction;
      });

      return AddTransactionToUserResponse.success(transaction);
    } catch (error) {
      return this.handleError(error);
    }
  }

    private handleError(error: unknown): AddTransactionToUserResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return AddTransactionToUserResponse.failure("Houve um erro ao adicionar a transação", errors);
  }
}