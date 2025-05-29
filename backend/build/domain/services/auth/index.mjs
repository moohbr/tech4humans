var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/services/auth/index.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
var AuthService = class {
  static {
    __name(this, "AuthService");
  }
  jwtSecret;
  jwtExpiresIn;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = "1h";
  }
  async hashPassword(raw) {
    return bcrypt.hash(raw, 10);
  }
  async comparePassword(raw, hash) {
    return bcrypt.compare(raw, hash);
  }
  generateToken(userId) {
    return jwt.sign({
      userId
    }, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn
    });
  }
  verifyToken(token) {
    const decoded = jwt.verify(token, this.jwtSecret);
    return decoded;
  }
};
export {
  AuthService
};
//# sourceMappingURL=index.mjs.map