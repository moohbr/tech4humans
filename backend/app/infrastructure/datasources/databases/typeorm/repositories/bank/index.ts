import { EntityManager, Repository } from "typeorm";
import { BankEntity } from "@models/bank/entity";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { Bank } from "@infrastructure/datasources/databases/typeorm/models/bank";
import { BankRepositoryInterface } from "@models/bank/repository/interfaces";
import { BankName } from "@models/bank/value-objects/name";

export class TypeOrmBankRepository implements BankRepositoryInterface {
  constructor(
    private readonly repository: Repository<Bank> = AppDataSource.getRepository(Bank)
  ) {}

  public withTransaction(manager: EntityManager): this {
    return new TypeOrmBankRepository(manager.getRepository(Bank)) as this;
  }

  public async findByName(name: BankName): Promise<BankEntity | null> {
    const bank = await this.repository.findOne({
      where: { name: name.getValue() }
    });

    if (!bank) {
      return null;
    }

    return BankEntity.reconstruct(bank.name);
  }

  public async findAll(): Promise<BankEntity[]> {
    const banks = await this.repository.find();
    return banks.map(bank => BankEntity.reconstruct(bank.name));
  }

  public async delete(name: BankName): Promise<void> {
    await this.repository.delete(name.getValue());
  }
}
