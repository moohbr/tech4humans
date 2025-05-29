import { AuthServiceInterface } from "@services/auth/interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TokenPayload } from "@services/auth/types";

export class AuthService implements AuthServiceInterface {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = "1h";
  }

  public async hashPassword(raw: string): Promise<string> {
    return bcrypt.hash(raw, 10);
  }

  public async comparePassword(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash);
  }

  public generateToken(userId: number): string {
    return jwt.sign({ userId }, this.jwtSecret, { 
      expiresIn: this.jwtExpiresIn,
    });
  }

  public verifyToken(token: string): TokenPayload {
    const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;
    return decoded;
  }
}
