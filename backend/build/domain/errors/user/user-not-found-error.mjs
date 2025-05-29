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
export {
  UserNotFoundError
};
//# sourceMappingURL=user-not-found-error.mjs.map