var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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
export {
  UpdateUserResponse
};
//# sourceMappingURL=response.mjs.map