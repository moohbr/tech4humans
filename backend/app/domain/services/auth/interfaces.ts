import { TokenPayload } from "@services/auth/types";

export interface AuthServiceInterface {
  hashPassword(raw: string): Promise<string>;
  comparePassword(raw: string, hash: string): Promise<boolean>;
  generateToken(userId: number): string;
  verifyToken(token: string): TokenPayload;
}
