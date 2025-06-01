import { Account } from "../account/types";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export type CreateUserDTO = {
    user: Pick<User, "name" | "email" | "password">;
    account: Pick<Account, "name" | "type" | "balance" | "bankName">;
}

export type CreateUserResponse = User;

export type LoginUserDTO = Pick<User, "email" | "password">;

export type LoginUserResponse = {
    token: string;
}

export type UpdateUserDTO = Partial<Pick<User, "name" | "email" | "password">>
