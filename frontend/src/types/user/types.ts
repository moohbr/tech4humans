export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export type CreateUserDTO = Partial<Pick<User, "name" | "email" | "password">>

export type UpdateUserDTO = Partial<Pick<User, "name" | "email" | "password">>
