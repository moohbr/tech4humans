var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/use-cases/user/delete/schemas.ts
import { z as z2 } from "zod";

// app/domain/models/user/schemas/index.ts
import { z } from "zod";
var UserSchemas = class {
  static {
    __name(this, "UserSchemas");
  }
  static emailSchema = z.string().email("Invalid email format").min(1, "Email is required").max(255, "Email cannot exceed 255 characters");
  static nameSchema = z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static userIdSchema = z.number().int("User ID must be an integer").positive("User ID must be positive");
  static passwordSchema = z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number and special character");
  static createUserSchema = z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: z.string().min(8, "Password hash is required")
  });
  static userEntitySchema = z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: z.date(),
    passwordHash: z.string().min(8, "Password hash is required")
  });
};

// app/domain/use-cases/user/delete/schemas.ts
var DeleteUserSchemas = class {
  static {
    __name(this, "DeleteUserSchemas");
  }
  static requestSchema = z2.object({
    id: UserSchemas.userIdSchema
  });
  static httpRequestSchema = z2.object({
    params: this.requestSchema
  });
};

// app/domain/use-cases/user/delete/request.ts
var DeleteUserRequest = class _DeleteUserRequest {
  static {
    __name(this, "DeleteUserRequest");
  }
  id;
  constructor(id) {
    this.id = id;
  }
  static createFromRaw(raw) {
    const parsed = DeleteUserSchemas.requestSchema.parse(raw);
    return new _DeleteUserRequest(parsed.id);
  }
  getId() {
    return this.id;
  }
};
export {
  DeleteUserRequest
};
//# sourceMappingURL=request.mjs.map