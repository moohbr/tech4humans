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

// app/domain/errors/transaction/transaction-not-found-error.ts
var TransactionNotFoundError = class _TransactionNotFoundError extends NotFoundError {
  static {
    __name(this, "TransactionNotFoundError");
  }
  constructor(id) {
    super(`Transaction not found: ${id}`);
    Object.setPrototypeOf(this, _TransactionNotFoundError.prototype);
  }
};
export {
  TransactionNotFoundError
};
//# sourceMappingURL=transaction-not-found-error.mjs.map