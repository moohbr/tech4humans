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

// app/domain/errors/infrastructure-error.ts
var InfrastructureError = class _InfrastructureError extends DomainError {
  static {
    __name(this, "InfrastructureError");
  }
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _InfrastructureError.prototype);
  }
  getStatusCode() {
    return 500;
  }
};
export {
  InfrastructureError
};
//# sourceMappingURL=infrastructure-error.mjs.map