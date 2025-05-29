import { BankEntity } from "@models/bank/entity";

export class BankFactory {
  public static create(params: BankFactoryParams): BankEntity {
    return BankEntity.create(params.name);
  }

  public static reconstruct(params: BankFactoryParams): BankEntity {
    return BankEntity.reconstruct( params.name);
  }
}