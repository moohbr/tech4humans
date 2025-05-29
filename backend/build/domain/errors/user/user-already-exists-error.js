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

// app/domain/errors/user/user-already-exists-error.ts
var user_already_exists_error_exports = {};
__export(user_already_exists_error_exports, {
  UserAlreadyExistsError: () => UserAlreadyExistsError
});
module.exports = __toCommonJS(user_already_exists_error_exports);

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

// app/domain/errors/user/user-already-exists-error.ts
var UserAlreadyExistsError = class _UserAlreadyExistsError extends ConflictError {
  static {
    __name(this, "UserAlreadyExistsError");
  }
  constructor(email) {
    super(`User already exists: ${email}`);
    Object.setPrototypeOf(this, _UserAlreadyExistsError.prototype);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserAlreadyExistsError
});
//# sourceMappingURL=user-already-exists-error.js.map