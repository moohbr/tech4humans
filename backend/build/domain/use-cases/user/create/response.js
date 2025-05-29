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

// app/domain/use-cases/user/create/response.ts
var response_exports = {};
__export(response_exports, {
  CreateUserResponse: () => CreateUserResponse
});
module.exports = __toCommonJS(response_exports);

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

// app/domain/errors/user/invalid-user-response-error.ts
var InvalidUserResponseError = class _InvalidUserResponseError extends ValidationError {
  static {
    __name(this, "InvalidUserResponseError");
  }
  constructor() {
    super("Cannot get user from failed response");
    Object.setPrototypeOf(this, _InvalidUserResponseError.prototype);
  }
};

// app/domain/use-cases/user/create/response.ts
var CreateUserResponse = class _CreateUserResponse {
  static {
    __name(this, "CreateUserResponse");
  }
  user;
  success;
  message;
  errors;
  constructor(user, success, message, errors) {
    this.user = user;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(user) {
    return new _CreateUserResponse(user, true, "User created successfully", []);
  }
  static failure(message, errors = []) {
    return new _CreateUserResponse(null, false, message, errors);
  }
  static validationFailure(errors) {
    return new _CreateUserResponse(null, false, "Validation failed", errors);
  }
  getUser() {
    if (!this.user) {
      throw new InvalidUserResponseError();
    }
    return this.user;
  }
  isSuccess() {
    return this.success;
  }
  getMessage() {
    return this.message;
  }
  getErrors() {
    return this.errors;
  }
  hasErrors() {
    return this.errors.length > 0;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserResponse
});
//# sourceMappingURL=response.js.map