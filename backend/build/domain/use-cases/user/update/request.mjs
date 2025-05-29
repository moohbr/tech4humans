var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/use-cases/user/update/schemas.ts
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

// app/domain/use-cases/user/update/schemas.ts
var UpdateUserSchemas = class {
  static {
    __name(this, "UpdateUserSchemas");
  }
  static requestSchema = z2.object({
    user: z2.object({
      name: UserSchemas.nameSchema,
      email: UserSchemas.emailSchema,
      password: UserSchemas.passwordSchema
    }),
    params: z2.object({
      id: UserSchemas.userIdSchema
    })
  });
  static httpRequestSchema = z2.object({
    body: this.requestSchema,
    params: z2.object({
      id: UserSchemas.userIdSchema
    })
  });
};

// app/domain/use-cases/user/update/request.ts
var UpdateUserRequest = class _UpdateUserRequest {
  static {
    __name(this, "UpdateUserRequest");
  }
  id;
  name;
  email;
  password;
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static createFromRaw(raw) {
    const parsed = UpdateUserSchemas.httpRequestSchema.parse(raw);
    return new _UpdateUserRequest(parsed.params.id, parsed.body.user.name, parsed.body.user.email, parsed.body.user.password);
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
};
export {
  UpdateUserRequest
};
//# sourceMappingURL=request.mjs.map