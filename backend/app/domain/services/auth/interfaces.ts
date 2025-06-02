import { TokenPayload } from "@services/auth/types";

export interface AuthServiceInterface {
  hashPassword(raw: string): Promise<string>;
  comparePassword(raw: string, hash: string): Promise<boolean>;
  generateToken(user: TokenPayload["user"]): string;
  verifyToken(token: string): TokenPayload;
}
