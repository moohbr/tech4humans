import { UserEntity } from "@models/user/entity";

export type TokenPayload = {
  user:   Pick<ReturnType<UserEntity["toPersistence"]>, "id" | "name" | "email">;
};