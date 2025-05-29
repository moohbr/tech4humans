import { AccountEntity } from "@models/account/entity";
import { AccountFactoryParams } from "@models/account/factory/types";

export class AccountFactory {
  public static create(params: AccountFactoryParams): AccountEntity {
    return AccountEntity.create(params.type, params.balance, params.userId, params.bankName);
  }

  public static reconstruct(params: AccountFactoryParams): AccountEntity {
    return AccountEntity.reconstruct(params.id, params.type, params.balance, params.createdAt, params.userId, params.bankName);
  }
}