import { UserEntity } from "@models/user/entity";

export type AuthResult = {
  token: string;
  user: UserEntity;
}