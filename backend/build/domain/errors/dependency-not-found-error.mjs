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

// app/domain/errors/dependency-not-found-error.ts
var DependencyNotFoundError = class _DependencyNotFoundError extends DomainError {
  static {
    __name(this, "DependencyNotFoundError");
  }
  constructor(dependencyName) {
    super(`Dependency ${dependencyName} not found`);
    Object.setPrototypeOf(this, _DependencyNotFoundError.prototype);
  }
  getStatusCode() {
    return 500;
  }
};
export {
  DependencyNotFoundError
};
//# sourceMappingURL=dependency-not-found-error.mjs.map