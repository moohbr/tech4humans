"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// app/domain/use-cases/user/delete/request.ts
var request_exports = {};
__export(request_exports, {
  DeleteUserRequest: () => DeleteUserRequest
});
module.exports = __toCommonJS(request_exports);

// app/domain/use-cases/user/delete/schemas.ts
var import_zod2 = require("zod");

// app/domain/models/user/schemas/index.ts
var import_zod = require("zod");
var UserSchemas = class {
  static {
    __name(this, "UserSchemas");
  }
  static emailSchema = import_zod.z.string().email("Invalid email format").min(1, "Email is required").max(255, "Email cannot exceed 255 characters");
  static nameSchema = import_zod.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static userIdSchema = import_zod.z.number().int("User ID must be an integer").positive("User ID must be positive");
  static passwordSchema = import_zod.z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number and special character");
  static createUserSchema = import_zod.z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: import_zod.z.string().min(8, "Password hash is required")
  });
  static userEntitySchema = import_zod.z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: import_zod.z.date(),
    passwordHash: import_zod.z.string().min(8, "Password hash is required")
  });
};

// app/domain/use-cases/user/delete/schemas.ts
var DeleteUserSchemas = class {
  static {
    __name(this, "DeleteUserSchemas");
  }
  static requestSchema = import_zod2.z.object({
    id: UserSchemas.userIdSchema
  });
  static httpRequestSchema = import_zod2.z.object({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteUserRequest
});
//# sourceMappingURL=request.js.map