import { User } from "@/types/user/types";

export type LoginCredentials = Pick<User, "email" | "password">;