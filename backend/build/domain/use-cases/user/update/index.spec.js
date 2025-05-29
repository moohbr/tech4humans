"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// app/domain/use-cases/user/update/index.spec.ts
var import_zod4 = require("zod");

// app/domain/use-cases/user/update/index.ts
var import_zod3 = require("zod");

// app/domain/errors/domain-error.ts
var DomainError = class _DomainError extends Error {
  static {
    __name(this, "DomainError");
  }
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, _DomainError.prototype);
  }
};

// app/domain/errors/validation-error.ts
var ValidationError = class _ValidationError extends DomainError {
  static {
    __name(this, "ValidationError");
  }
  errors;
  constructor(message, errors = []) {
    super(message), this.errors = errors;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  getStatusCode() {
    return 400;
  }
  getErrors() {
    return this.errors;
  }
};

// app/domain/errors/user/invalid-user-response-error.ts
var InvalidUserResponseError = class _InvalidUserResponseError extends ValidationError {
  static {
    __name(this, "InvalidUserResponseError");
  }
  constructor() {
    super("Cannot get user from failed response");
    Object.setPrototypeOf(this, _InvalidUserResponseError.prototype);
  }
};

// app/domain/use-cases/user/update/response.ts
var UpdateUserResponse = class _UpdateUserResponse {
  static {
    __name(this, "UpdateUserResponse");
  }
  user;
  success;
  message;
  errors;
  constructor(user, success, message, errors) {
    this.user = user;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(user) {
    return new _UpdateUserResponse(user, true, "User updated successfully", []);
  }
  static failure(message, errors = []) {
    return new _UpdateUserResponse(null, false, message, errors);
  }
  static validationFailure(errors) {
    return new _UpdateUserResponse(null, false, "Validation failed", errors);
  }
  getUser() {
    if (!this.user) {
      throw new InvalidUserResponseError();
    }
    return this.user;
  }
  isSuccess() {
    return this.success;
  }
  getMessage() {
    return this.message;
  }
  getErrors() {
    return this.errors;
  }
  hasErrors() {
    return this.errors.length > 0;
  }
};

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

// app/domain/errors/user/invalid-user-id-error.ts
var InvalidUserIdError = class _InvalidUserIdError extends ValidationError {
  static {
    __name(this, "InvalidUserIdError");
  }
  constructor() {
    super("Cannot get value of new UserId before persistence");
    Object.setPrototypeOf(this, _InvalidUserIdError.prototype);
  }
};

// app/domain/models/user/value-objects/id.ts
var UserId = class _UserId {
  static {
    __name(this, "UserId");
  }
  value;
  isNewId;
  constructor(value, isNewId = false) {
    this.value = value;
    this.isNewId = isNewId;
  }
  static create(id) {
    const validatedId = UserSchemas.userIdSchema.parse(id);
    return new _UserId(validatedId, false);
  }
  static createNew() {
    return new _UserId(null, true);
  }
  static createFromDatabase(id) {
    const validatedId = UserSchemas.userIdSchema.parse(id);
    return new _UserId(validatedId, false);
  }
  static createUnsafe(id) {
    return new _UserId(id, false);
  }
  getValue() {
    if (this.value === null) {
      throw new InvalidUserIdError();
    }
    return this.value;
  }
  isNew() {
    return this.isNewId;
  }
  equals(other) {
    return this.value === other.value;
  }
  toString() {
    return this.value?.toString() ?? "new";
  }
};

// app/domain/use-cases/user/update/schemas.ts
var import_zod2 = require("zod");
var UpdateUserSchemas = class {
  static {
    __name(this, "UpdateUserSchemas");
  }
  static requestSchema = import_zod2.z.object({
    user: import_zod2.z.object({
      name: UserSchemas.nameSchema,
      email: UserSchemas.emailSchema,
      password: UserSchemas.passwordSchema
    }),
    params: import_zod2.z.object({
      id: UserSchemas.userIdSchema
    })
  });
  static httpRequestSchema = import_zod2.z.object({
    body: this.requestSchema,
    params: import_zod2.z.object({
      id: UserSchemas.userIdSchema
    })
  });
};

// app/domain/errors/user/invalid-email-error.ts
var InvalidEmailError = class _InvalidEmailError extends ValidationError {
  static {
    __name(this, "InvalidEmailError");
  }
  constructor(email) {
    super(`Invalid email format: ${email}`);
    Object.setPrototypeOf(this, _InvalidEmailError.prototype);
  }
};

// app/domain/models/user/value-objects/email.ts
var UserEmail = class _UserEmail {
  static {
    __name(this, "UserEmail");
  }
  value;
  constructor(value) {
    this.value = value;
    this.validateEmail();
  }
  static create(email) {
    return new _UserEmail(email);
  }
  getValue() {
    return this.value;
  }
  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new InvalidEmailError(this.value);
    }
  }
  equals(other) {
    return this.value === other.value;
  }
};

// app/domain/models/user/value-objects/name.ts
var UserName = class _UserName {
  static {
    __name(this, "UserName");
  }
  value;
  constructor(value) {
    this.value = value;
  }
  static create(name) {
    const validatedName = UserSchemas.nameSchema.parse(name);
    return new _UserName(validatedName);
  }
  getValue() {
    return this.value;
  }
  equals(other) {
    return this.value === other.value;
  }
};

// app/domain/errors/user/invalid-password-error.ts
var InvalidPasswordError = class _InvalidPasswordError extends ValidationError {
  static {
    __name(this, "InvalidPasswordError");
  }
  constructor(message) {
    super(message, []);
    Object.setPrototypeOf(this, _InvalidPasswordError.prototype);
  }
};

// app/domain/models/user/value-objects/password.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var UserPassword = class _UserPassword {
  static {
    __name(this, "UserPassword");
  }
  value;
  isHashed;
  constructor(value, isHashed = false) {
    this.value = value;
    this.isHashed = isHashed;
    if (!isHashed) {
      this.validatePassword();
    }
  }
  static create(plainPassword) {
    return new _UserPassword(plainPassword, false);
  }
  static createFromHash(hashedPassword) {
    return new _UserPassword(hashedPassword, true);
  }
  async hash() {
    if (this.isHashed) {
      return this;
    }
    const hashedValue = await import_bcryptjs.default.hash(this.value, 10);
    return new _UserPassword(hashedValue, true);
  }
  async compare(plainPassword) {
    if (!this.isHashed) {
      throw new InvalidPasswordError("Cannot compare with unhashed password");
    }
    return import_bcryptjs.default.compare(plainPassword, this.value);
  }
  getValue() {
    return this.value;
  }
  isHashedPassword() {
    return this.isHashed;
  }
  validatePassword() {
    if (!this.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      throw new InvalidPasswordError("Password must contain at least 8 characters with uppercase, lowercase, number and special character");
    }
  }
};

// app/domain/models/user/entity/index.ts
var UserEntity = class _UserEntity {
  static {
    __name(this, "UserEntity");
  }
  id;
  name;
  email;
  createdAt;
  password;
  constructor(id, name, email, createdAt, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.password = password;
  }
  static create(name, email, passwordHash) {
    const validatedData = UserSchemas.createUserSchema.parse({
      name,
      email,
      passwordHash
    });
    return new _UserEntity(UserId.createNew(), UserName.create(validatedData.name), UserEmail.create(validatedData.email), /* @__PURE__ */ new Date(), UserPassword.createFromHash(passwordHash));
  }
  static reconstruct(id, name, email, createdAt, passwordHash) {
    const validatedData = UserSchemas.userEntitySchema.parse({
      id,
      name,
      email,
      createdAt,
      passwordHash
    });
    return new _UserEntity(UserId.createFromDatabase(validatedData.id), UserName.create(validatedData.name), UserEmail.create(validatedData.email), validatedData.createdAt, UserPassword.createFromHash(passwordHash));
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
  getCreatedAt() {
    return this.createdAt;
  }
  getPasswordHash() {
    return this.password.getValue();
  }
  toPersistence() {
    return {
      id: this.id.isNew() ? null : this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt,
      passwordHash: this.password.getValue()
    };
  }
  toJSON() {
    return {
      id: this.id.isNew() ? null : this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt
    };
  }
};

// app/domain/errors/not-found-error.ts
var NotFoundError = class _NotFoundError extends DomainError {
  static {
    __name(this, "NotFoundError");
  }
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _NotFoundError.prototype);
  }
  getStatusCode() {
    return 404;
  }
};

// app/domain/errors/user/user-not-found-error.ts
var UserNotFoundError = class _UserNotFoundError extends NotFoundError {
  static {
    __name(this, "UserNotFoundError");
  }
  constructor(userId) {
    super(userId ? `User with ID ${userId} not found` : "User not found");
    Object.setPrototypeOf(this, _UserNotFoundError.prototype);
  }
};

// app/domain/use-cases/user/update/index.ts
var UpdateUserUseCase = class {
  static {
    __name(this, "UpdateUserUseCase");
  }
  userRepository;
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(request) {
    try {
      const validated = UpdateUserSchemas.httpRequestSchema.parse({
        body: {
          user: {
            name: request.getName(),
            email: request.getEmail(),
            password: request.getPassword()
          }
        },
        params: {
          id: request.getId()
        }
      });
      const userId = UserId.create(validated.params.id);
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new UserNotFoundError(validated.params.id.toString());
      }
      const updatedUser = await this.userRepository.update(userId, UserEntity.create(validated.body.user.name, validated.body.user.email, validated.body.user.password));
      return UpdateUserResponse.success(updatedUser);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof import_zod3.ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return UpdateUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return UpdateUserResponse.failure(message);
  }
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

// app/domain/use-cases/user/update/index.spec.ts
jest.mock("./schemas", () => ({
  UpdateUserSchemas: {
    httpRequestSchema: {
      parse: jest.fn()
    }
  }
}));
jest.mock("@models/user/value-objects/id", () => ({
  UserId: {
    create: jest.fn()
  }
}));
jest.mock("@models/user/entity", () => ({
  UserEntity: {
    create: jest.fn()
  }
}));
describe("UpdateUserUseCase", () => {
  let useCase;
  let userRepository;
  let mockRequest;
  let mockUserId;
  let mockUserEntity;
  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = {
      findById: jest.fn(),
      update: jest.fn()
    };
    useCase = new UpdateUserUseCase(userRepository);
    mockRequest = new UpdateUserRequest(1, "John Doe", "john@example.com", "newpassword123");
    mockUserId = {
      value: 1
    };
    mockUserEntity = {
      getId: /* @__PURE__ */ __name(() => ({
        getValue: /* @__PURE__ */ __name(() => 1, "getValue")
      }), "getId"),
      getName: /* @__PURE__ */ __name(() => "John Doe", "getName"),
      getEmail: /* @__PURE__ */ __name(() => "john@example.com", "getEmail")
    };
    UserId.create.mockReturnValue(mockUserId);
    UserEntity.create.mockReturnValue(mockUserEntity);
  });
  it("should successfully update a user", async () => {
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123"
        }
      },
      params: {
        id: 1
      }
    };
    const existingUser = {
      getId: /* @__PURE__ */ __name(() => ({
        getValue: /* @__PURE__ */ __name(() => 1, "getValue")
      }), "getId")
    };
    const updatedUser = {
      getId: /* @__PURE__ */ __name(() => ({
        getValue: /* @__PURE__ */ __name(() => 1, "getValue")
      }), "getId"),
      getName: /* @__PURE__ */ __name(() => "John Doe", "getName"),
      getEmail: /* @__PURE__ */ __name(() => "john@example.com", "getEmail")
    };
    UpdateUserSchemas.httpRequestSchema.parse.mockReturnValue(validatedData);
    userRepository.findById.mockResolvedValue(existingUser);
    userRepository.update.mockResolvedValue(updatedUser);
    const result = await useCase.execute(mockRequest);
    expect(result.isSuccess()).toBe(true);
    expect(result.getMessage()).toBe("User updated successfully");
    expect(result.getUser()).toBe(updatedUser);
    expect(UpdateUserSchemas.httpRequestSchema.parse).toHaveBeenCalledWith({
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123"
        }
      },
      params: {
        id: 1
      }
    });
    expect(UserId.create).toHaveBeenCalledWith(1);
    expect(userRepository.findById).toHaveBeenCalledWith(mockUserId);
    expect(UserEntity.create).toHaveBeenCalledWith("John Doe", "john@example.com", "newpassword123");
    expect(userRepository.update).toHaveBeenCalledWith(mockUserId, mockUserEntity);
  });
  it("should fail if user not found", async () => {
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123"
        }
      },
      params: {
        id: 1
      }
    };
    UpdateUserSchemas.httpRequestSchema.parse.mockReturnValue(validatedData);
    userRepository.findById.mockResolvedValue(null);
    const result = await useCase.execute(mockRequest);
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toContain(`User with ID ${mockRequest.getId()} not found`);
  });
  it("should fail with validation error for invalid email", async () => {
    const invalidRequest = new UpdateUserRequest(1, "John Doe", "invalid-email", "newpassword123");
    const zodError = new import_zod4.ZodError([
      {
        code: "invalid_string",
        validation: "email",
        message: "Invalid email format",
        path: [
          "body",
          "user",
          "email"
        ]
      }
    ]);
    UpdateUserSchemas.httpRequestSchema.parse.mockImplementation(() => {
      throw zodError;
    });
    const result = await useCase.execute(invalidRequest);
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Validation failed");
    expect(result.getErrors()).toContain("body.user.email: Invalid email format");
  });
  it("should fail with validation error for invalid password", async () => {
    jest.spyOn(mockRequest, "getPassword").mockReturnValue("short");
    const zodError = new import_zod4.ZodError([
      {
        code: "too_small",
        minimum: 8,
        type: "string",
        inclusive: true,
        exact: false,
        message: "Password must be at least 8 characters long",
        path: [
          "body",
          "user",
          "password"
        ]
      }
    ]);
    UpdateUserSchemas.httpRequestSchema.parse.mockImplementation(() => {
      throw zodError;
    });
    const result = await useCase.execute(mockRequest);
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Validation failed");
    expect(result.getErrors()).toContain("body.user.password: Password must be at least 8 characters long");
  });
  it("should fail with validation error for invalid name", async () => {
    jest.spyOn(mockRequest, "getName").mockReturnValue("");
    const zodError = new import_zod4.ZodError([
      {
        code: "too_small",
        minimum: 1,
        type: "string",
        inclusive: true,
        exact: false,
        message: "Name cannot be empty",
        path: [
          "body",
          "user",
          "name"
        ]
      }
    ]);
    UpdateUserSchemas.httpRequestSchema.parse.mockImplementation(() => {
      throw zodError;
    });
    const result = await useCase.execute(mockRequest);
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Validation failed");
    expect(result.getErrors()).toContain("body.user.name: Name cannot be empty");
  });
  it("should handle unknown errors", async () => {
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123"
        }
      },
      params: {
        id: 1
      }
    };
    UpdateUserSchemas.httpRequestSchema.parse.mockReturnValue(validatedData);
    userRepository.findById.mockRejectedValue(new Error("Database connection failed"));
    const result = await useCase.execute(mockRequest);
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Database connection failed");
  });
  it("should handle UserNotFoundError specifically", async () => {
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123"
        }
      },
      params: {
        id: 1
      }
    };
    UpdateUserSchemas.httpRequestSchema.parse.mockReturnValue(validatedData);
    userRepository.findById.mockResolvedValue(null);
    const result = await useCase.execute(mockRequest);
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toContain(`User with ID ${mockRequest.getId()} not found`);
  });
});
//# sourceMappingURL=index.spec.js.map