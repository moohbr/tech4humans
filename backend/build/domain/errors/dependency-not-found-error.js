"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// app/domain/errors/dependency-not-found-error.ts
var dependency_not_found_error_exports = {};
__export(dependency_not_found_error_exports, {
  DependencyNotFoundError: () => DependencyNotFoundError
});
module.exports = __toCommonJS(dependency_not_found_error_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DependencyNotFoundError
});
//# sourceMappingURL=dependency-not-found-error.js.map