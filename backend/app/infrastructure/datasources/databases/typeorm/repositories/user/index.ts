import { EntityManager, Repository } from "typeorm";
import { UserEmail } from "@models/user/value-objects/email";
import { UserId } from "@models/user/value-objects/id";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { User } from "@infrastructure/datasources/databases/typeorm/models/user";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { UserEntity } from "@models/user/entity";
import { UserNotFoundError } from "@errors/user/user-not-found-error";
import { logger } from "@infrastructure/logger";

export class TypeOrmUserRepository implements UserRepositoryInterface {
  constructor(
    private readonly repository: Repository<User> = AppDataSource.getRepository(User)
  ) {}

  withTransaction(manager: EntityManager): this {
    return new TypeOrmUserRepository(manager.getRepository(User)) as this;
  }
  
  public async create(userEntity: UserEntity): Promise<UserEntity> {
    logger.info("Creating user", { userEntity });
    const userData = userEntity.toPersistence();
    const user = this.repository.create({
      name: userData.name,
      email: userData.email,
      createdAt: userData.createdAt,
      passwordHash: userData.passwordHash,
    });

    const savedUser = await this.repository.save(user);
    logger.info("User saved", { savedUser }, "savedUser");
    return UserEntity.reconstruct(
      savedUser.id,
      savedUser.name,
      savedUser.email,
      savedUser.createdAt,
      savedUser.passwordHash,
    );
  }

  public async findByEmail(email: UserEmail): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { email: email.getValue() },
    });

    if (!user) {
      return null;
    }

    return UserEntity.reconstruct(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.passwordHash,
    );
  }

  public async findById(id: UserId): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { id: id.getValue() },
    });

    if (!user) {
      return null;
    }

    return UserEntity.reconstruct(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.passwordHash,
    );
  }

  public async exists(email: UserEmail): Promise<boolean> {
    const count = await this.repository.count({
      where: { email: email.getValue() },
    });
    return count > 0;
  }

  public async update(id: UserId, userEntity: UserEntity): Promise<UserEntity> {
    const userData = userEntity.toPersistence();
    const userInDatabase = await this.repository.findOne({
      where: { id: id.getValue() },
    });

    if (!userInDatabase) {
        throw new UserNotFoundError(id.getValue().toString());
    }

    const updatedUser = this.repository.merge(userInDatabase, {
      name: userData.name,
      email: userData.email,
      passwordHash: userData.passwordHash,
    });

    const savedUser = await this.repository.save(updatedUser);

    return UserEntity.reconstruct(
      savedUser.id,
      savedUser.name,
      savedUser.email,
      savedUser.createdAt,
      savedUser.passwordHash,
    );
  }

  public async delete(id: UserId): Promise<void> {
    await this.repository.delete(id.getValue());
  }
}
