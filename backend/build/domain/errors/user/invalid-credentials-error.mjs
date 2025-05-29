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
export {
  InvalidCredentialsError
};
//# sourceMappingURL=invalid-credentials-error.mjs.map