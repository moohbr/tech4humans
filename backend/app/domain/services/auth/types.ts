import { UserEntity } from "@models/user/entity";

export type TokenPayload = {
  userId:   Pick<ReturnType<UserEntity["toPersistence"]>, "id">;
};