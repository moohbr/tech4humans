import { UserId } from "@models/user/value-objects/id";
import { AccountEntity } from "@models/account/entity";
import { AccountId } from "@models/account/value-objects/id";
import { EntityManager } from "typeorm";

export interface AccountRepositoryInterface {
  withTransaction(manager: EntityManager): this;
  create(account: AccountEntity, manager?: EntityManager): Promise<AccountEntity>;
  findByUserId(id: UserId): Promise<AccountEntity[] | null>;
  findById(id: AccountId, manager?: EntityManager): Promise<AccountEntity | null>;
  update(id: AccountId, account: AccountEntity, manager?: EntityManager): Promise<AccountEntity>;
  delete(id: AccountId, manager?: EntityManager): Promise<void>;
}
