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

// app/domain/errors/bank/invalid-bank-id-error.ts
var InvalidBankIdError = class _InvalidBankIdError extends ValidationError {
  static {
    __name(this, "InvalidBankIdError");
  }
  constructor(id) {
    super(`Invalid bank id: ${id}`);
    Object.setPrototypeOf(this, _InvalidBankIdError.prototype);
  }
};
export {
  InvalidBankIdError
};
//# sourceMappingURL=invalid-bank-id-error.mjs.map