import { Between, Repository } from "typeorm";
import { TransactionEntity } from "@models/transaction/entity";
import { TransactionRepositoryInterface } from "@models/transaction/repository/interfaces";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { Transaction } from "@infrastructure/datasources/databases/typeorm/models/transactions";
import { TransactionId } from "@models/transaction/value-objects/id";
import { AccountId } from "@models/account/value-objects/id"; 
import { UserId } from "@models/user/value-objects/id";
import { TransactionNotFoundError } from "@errors/transaction/transaction-not-found-error";

export class TypeOrmTransactionRepository implements TransactionRepositoryInterface {
  constructor(
    private readonly repository: Repository<Transaction> = AppDataSource.getRepository(Transaction)
  ) {}

  public async findAll(): Promise<TransactionEntity[]> {
    const transactions = await this.repository.find({
        relations: ['sourceAccount', 'destinationAccount'],
    });

    return transactions.map(transaction => TransactionEntity.reconstruct({
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description,
        destinationAccountId: transaction.destinationAccount.id,
        sourceAccountId: transaction.sourceAccount.id,
        type: transaction.type,
    }));
  }
  
  public async findByUserId(userId: UserId): Promise<TransactionEntity[]> {
    const transactions = await this.repository.find({
        where: { sourceAccount: { user: {id: userId.getValue() } } },
        relations: ['sourceAccount', 'destinationAccount'],
    });

    return transactions.map(transaction => TransactionEntity.reconstruct({
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description,
        destinationAccountId: transaction.destinationAccount.id,
        sourceAccountId: transaction.sourceAccount.id,
        type: transaction.type,
    }));
  }

  public async create(transactionEntity: TransactionEntity): Promise<TransactionEntity> {
    const transactionData = transactionEntity.toPersistence();
    
    const transaction = this.repository.create({    
      sourceAccount: { id: transactionData.sourceAccountId },
      destinationAccount: { id: transactionData.destinationAccountId },
      amount: transactionData.amount,
      description: transactionData.description,
      type: transactionData.type,
    });

    const savedTransaction = await this.repository.save(transaction);

    return TransactionEntity.reconstruct({
        id: savedTransaction.id,
        amount: savedTransaction.amount,
        description: savedTransaction.description,
        destinationAccountId: savedTransaction.destinationAccount.id,
        sourceAccountId: savedTransaction.sourceAccount.id,
        type: savedTransaction.type,
    });
  }

  public async findById(id: TransactionId): Promise<TransactionEntity | null> {
    const transaction = await this.repository.findOne({
      where: { id: id.getValue() },
      relations: ['sourceAccount', 'destinationAccount'],
    });

    if (!transaction) {
      return null;
    }

    return TransactionEntity.reconstruct({
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description,
        destinationAccountId: transaction.destinationAccount.id,
        sourceAccountId: transaction.sourceAccount.id,
        type: transaction.type,
    });
  }

  public async findByAccountId(accountId: AccountId): Promise<TransactionEntity[]> {
    const transactions = await this.repository.find({
      where: [
        { sourceAccount: { id: accountId.getValue() } },
        { destinationAccount: { id: accountId.getValue() } }
      ],
      relations: ['sourceAccount', 'destinationAccount'],
      order: { transactionDate: 'DESC' },
    });

    return transactions.map(transaction => 
      TransactionEntity.reconstruct({
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description,
        destinationAccountId: transaction.destinationAccount.id,
        sourceAccountId: transaction.sourceAccount.id,
        type: transaction.type,
      })
    );
  }

  public async findByDateRange(startDate: Date, endDate: Date): Promise<TransactionEntity[]> {
    const transactions = await this.repository.find({
      where: {
        transactionDate: Between(startDate, endDate),
      },
      relations: ['sourceAccount', 'destinationAccount'],
      order: { transactionDate: 'DESC' },
    });

    return transactions.map(transaction => 
      TransactionEntity.reconstruct({
        id: transaction.id,
        amount: transaction.amount,
        description: transaction.description,
        destinationAccountId: transaction.destinationAccount.id,
        sourceAccountId: transaction.sourceAccount.id,
        type: transaction.type,
      })
    );
  }

  public async update(id: TransactionId, transactionEntity: TransactionEntity): Promise<TransactionEntity> {
    const transactionData = transactionEntity.toPersistence();
    
    const transactionInDatabase = await this.repository.findOne({
      where: { id: id.getValue() },
    });

    if (!transactionInDatabase) {
      throw new TransactionNotFoundError(id.getValue().toString());
    }

    const updatedTransaction = this.repository.merge(transactionInDatabase, {
      amount: transactionData.amount,
      description: transactionData.description,
      type: transactionData.type,
      sourceAccount: { id: transactionData.sourceAccountId },
      destinationAccount: { id: transactionData.destinationAccountId },
    });

    const savedTransaction = await this.repository.save(updatedTransaction);

    return TransactionEntity.reconstruct({
      id: savedTransaction.id,
      amount: savedTransaction.amount,
      description: savedTransaction.description,
      destinationAccountId: savedTransaction.destinationAccount.id,
      sourceAccountId: savedTransaction.sourceAccount.id,
      type: savedTransaction.type,
    });
  }

  public async delete(id: TransactionId): Promise<void> {
    await this.repository.delete(id.getValue());
  }

  public async exists(id: TransactionId): Promise<boolean> {
    const count = await this.repository.count({
      where: { id: id.getValue() },
    });
    return count > 0;
  }
}