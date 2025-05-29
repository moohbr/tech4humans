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

// app/domain/errors/conflict-error.ts
var ConflictError = class _ConflictError extends DomainError {
  static {
    __name(this, "ConflictError");
  }
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _ConflictError.prototype);
  }
  getStatusCode() {
    return 409;
  }
};
export {
  ConflictError
};
//# sourceMappingURL=conflict-error.mjs.map