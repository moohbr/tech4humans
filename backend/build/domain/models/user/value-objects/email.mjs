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
export {
  UserEmail
};
//# sourceMappingURL=email.mjs.map