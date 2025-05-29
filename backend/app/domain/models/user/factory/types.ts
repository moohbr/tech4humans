import { UserEntity } from "@models/user/entity";

export type CreateUserData = Pick<
  ReturnType<UserEntity["toPersistence"]>,
  "name" | "email" | "passwordHash"
>;
