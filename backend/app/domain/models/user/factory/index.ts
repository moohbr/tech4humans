import { UserEntity } from "@models/user/entity";
import { UserSchemas } from "@models/user/schemas";
import { CreateUserData } from "@models/user/factory/types";

export class UserFactory {
  public static createUser(data: CreateUserData): UserEntity {
    const validatedData = UserSchemas.createUserSchema.parse(data);
    return UserEntity.create(
      validatedData.name,
      validatedData.email,
      validatedData.passwordHash,
    );
  }

  public static createUserFromRaw(rawData: unknown): UserEntity {
    const validatedData = UserSchemas.createUserSchema.parse(rawData);
    return UserEntity.create(
      validatedData.name,
      validatedData.email,
      validatedData.passwordHash,
    );
  }
}
