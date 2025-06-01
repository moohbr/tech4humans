import { LoginCredentials } from "@/types/auth/types";

export type LoginCredentials = Pick<LoginCredentials, "email" | "password">;