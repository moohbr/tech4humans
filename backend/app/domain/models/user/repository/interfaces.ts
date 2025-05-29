import { EntityManager } from "typeorm";
import { UserEntity } from "@models/user/entity";
import { UserEmail } from "@models/user/value-objects/email";
import { UserId } from "@models/user/value-objects/id";

export interface UserRepositoryInterface {
  withTransaction(manager: EntityManager): this;
  create(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: UserEmail): Promise<UserEntity | null>;
  findById(id: UserId): Promise<UserEntity | null>;
  exists(email: UserEmail): Promise<boolean>;
  update(id: UserId, user: UserEntity): Promise<UserEntity>;
  delete(id: UserId): Promise<void>;
}
