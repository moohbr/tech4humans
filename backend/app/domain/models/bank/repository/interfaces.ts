import { BankEntity } from "@models/bank/entity";
import { EntityManager } from "typeorm";
import { BankName } from "@models/bank/value-objects/name";

export interface BankRepositoryInterface {
  withTransaction(manager: EntityManager): this;
  findByName(name: BankName): Promise<BankEntity | null>;
  findAll(): Promise<BankEntity[]>;
  delete(name: BankName): Promise<void>;
}