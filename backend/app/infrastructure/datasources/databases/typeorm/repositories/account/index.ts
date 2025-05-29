import { EntityManager, Repository } from "typeorm";
import { AccountEntity } from "@models/account/entity";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { AccountId } from "@models/account/value-objects/id";
import { UserId } from "@models/user/value-objects/id";
import { Account } from "@infrastructure/datasources/databases/typeorm/models/account";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { AccountNotFoundError } from "@errors/account/account-not-found-error";
import { logger } from "@infrastructure/logger";

export class TypeOrmAccountRepository implements AccountRepositoryInterface {
  constructor(
    private readonly repository: Repository<Account> = AppDataSource.getRepository(Account)
  ) {}

  withTransaction(manager: EntityManager): this {
    return new TypeOrmAccountRepository(manager.getRepository(Account)) as this;
  }
  
  public async create(accountEntity: AccountEntity): Promise<AccountEntity> {
    logger.info("Creating account", { accountEntity });
    const data = accountEntity.toPersistence();
    const account = this.repository.create({
      name: data.name,
      type: data.type,
      balance: data.balance,
      createdAt: data.createdAt,
      user: { id: data.userId },
      bank: { name: data.bankName },
    });

    const saved = await this.repository.save(account);
    logger.info("Account saved", { saved });
    return AccountEntity.reconstruct(
      saved.id,
      saved.name,
      saved.type,
      saved.balance,
      saved.createdAt,
      saved.user.id,
      saved.bank.name,
    );
  }

  public async findById(id: AccountId): Promise<AccountEntity | null> {
    const account = await this.repository.findOne({
      where: { id: id.getValue() },
      relations: ["user", "bank"],
    });

    if (!account) return null;

    return AccountEntity.reconstruct(
      account.id,
      account.name,
      account.type,
      account.balance,
      account.createdAt,
      account.user.id,
      account.bank.name,
    );
  }

  public async findByUserId(userId: UserId): Promise<AccountEntity[]> {
    const accounts = await this.repository.find({
      where: { user: { id: userId.getValue() } },
      relations: ["user", "bank"],
    });

    if (!accounts) return [];

    return accounts.map(account => AccountEntity.reconstruct(
      account.id,
      account.name,
      account.type,
      account.balance,
      account.createdAt,
      account.user.id,
      account.bank.name,
    ));
  }

  public async update(
    id: AccountId,
    accountEntity: AccountEntity,
  ): Promise<AccountEntity> {
    const accountInDb = await this.repository.findOne({
      where: { id: id.getValue() },
      relations: ["user", "bank"],
    });

    if (!accountInDb) throw new AccountNotFoundError(id.getValue().toString());

    const data = accountEntity.toPersistence();

    const updated = this.repository.merge(accountInDb, {
      name: data.name,
      type: data.type,
      balance: data.balance,
      user: { id: data.userId },
      bank: { name: data.bankName },
    });

    const saved = await this.repository.save(updated);

    return AccountEntity.reconstruct(
      saved.id,
      saved.name,
      saved.type,
      saved.balance,
      saved.createdAt,
      saved.user.id,
      saved.bank.name,
    );
  }

  public async delete(id: AccountId): Promise<void> {
    await this.repository.delete(id.getValue());
  }
}
