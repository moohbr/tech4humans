var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/use-cases/user/login/index.ts
import { ZodError } from "zod";

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

// app/domain/errors/user/invalid-auth-result-error.ts
var InvalidAuthResultError = class _InvalidAuthResultError extends ValidationError {
  static {
    __name(this, "InvalidAuthResultError");
  }
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _InvalidAuthResultError.prototype);
  }
};

// app/domain/use-cases/user/login/response.ts
var LoginResponse = class _LoginResponse {
  static {
    __name(this, "LoginResponse");
  }
  authResult;
  success;
  message;
  errors;
  constructor(authResult, success, message, errors) {
    this.authResult = authResult;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(authResult) {
    return new _LoginResponse(authResult, true, "Login successful", []);
  }
  static failure(message, errors = []) {
    return new _LoginResponse(null, false, message, errors);
  }
  static validationFailure(errors) {
    return new _LoginResponse(null, false, "Validation failed", errors);
  }
  getAuthResult() {
    if (!this.authResult) {
      throw new InvalidAuthResultError("Cannot get auth result from failed response");
    }
    return this.authResult;
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
import bcrypt from "bcryptjs";
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
    const hashedValue = await bcrypt.hash(this.value, 10);
    return new _UserPassword(hashedValue, true);
  }
  async compare(plainPassword) {
    if (!this.isHashed) {
      throw new InvalidPasswordError("Cannot compare with unhashed password");
    }
    return bcrypt.compare(plainPassword, this.value);
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

// app/domain/use-cases/user/login/schemas.ts
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

// app/domain/use-cases/user/login/schemas.ts
var UserLoginSchemas = class {
  static {
    __name(this, "UserLoginSchemas");
  }
  static requestSchema = z2.object({
    email: UserSchemas.emailSchema,
    password: z2.string().min(8).max(100)
  });
  static httpRequestSchema = z2.object({
    body: this.requestSchema
  });
};

// app/domain/errors/not-authorized-error.ts
var NotAuthorizedError = class extends DomainError {
  static {
    __name(this, "NotAuthorizedError");
  }
  constructor() {
    super("Not authorized");
  }
  getStatusCode() {
    return 401;
  }
};

// app/domain/errors/user/invalid-credentials-error.ts
var InvalidCredentialsError = class _InvalidCredentialsError extends NotAuthorizedError {
  static {
    __name(this, "InvalidCredentialsError");
  }
  constructor() {
    super();
    Object.setPrototypeOf(this, _InvalidCredentialsError.prototype);
  }
};

// app/domain/use-cases/user/login/index.ts
var LoginUseCase = class {
  static {
    __name(this, "LoginUseCase");
  }
  userRepository;
  authService;
  constructor(userRepository, authService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }
  async execute(request) {
    try {
      const validated = UserLoginSchemas.requestSchema.parse({
        email: request.getEmail(),
        password: request.getPassword()
      });
      const email = UserEmail.create(validated.email);
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new InvalidCredentialsError();
      }
      const userPassword = UserPassword.createFromHash(user.getPasswordHash());
      const isValid = await userPassword.compare(validated.password);
      if (!isValid) {
        throw new InvalidCredentialsError();
      }
      const token = this.authService.generateToken(user.getId().getValue());
      return LoginResponse.success({
        token,
        user
      });
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return LoginResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return LoginResponse.failure(message);
  }
};
export {
  LoginUseCase
};
//# sourceMappingURL=index.mjs.map