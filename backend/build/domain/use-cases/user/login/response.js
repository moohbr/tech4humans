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

// app/domain/use-cases/user/login/response.ts
var response_exports = {};
__export(response_exports, {
  LoginResponse: () => LoginResponse
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

// app/domain/errors/user/invalid-auth-result-error.ts
var InvalidAuthResultError = class _InvalidAuthResultError extends ValidationError {
  static {
    __name(this, "InvalidAuthResultError");
  }
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _InvalidAuthResultError.prototype);
  }
};

// app/domain/use-cases/user/login/response.ts
var LoginResponse = class _LoginResponse {
  static {
    __name(this, "LoginResponse");
  }
  authResult;
  success;
  message;
  errors;
  constructor(authResult, success, message, errors) {
    this.authResult = authResult;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(authResult) {
    return new _LoginResponse(authResult, true, "Login successful", []);
  }
  static failure(message, errors = []) {
    return new _LoginResponse(null, false, message, errors);
  }
  static validationFailure(errors) {
    return new _LoginResponse(null, false, "Validation failed", errors);
  }
  getAuthResult() {
    if (!this.authResult) {
      throw new InvalidAuthResultError("Cannot get auth result from failed response");
    }
    return this.authResult;
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
  LoginResponse
});
//# sourceMappingURL=response.js.map