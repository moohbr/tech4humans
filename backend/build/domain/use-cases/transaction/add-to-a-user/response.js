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

// app/domain/use-cases/transaction/add-to-a-user/response.ts
var response_exports = {};
__export(response_exports, {
  AddTransactionToUserResponse: () => AddTransactionToUserResponse
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

// app/domain/errors/transaction/invalid-transaction-id-error.ts
var InvalidTransactionIdError = class _InvalidTransactionIdError extends ValidationError {
  static {
    __name(this, "InvalidTransactionIdError");
  }
  constructor(id) {
    super(`Invalid transaction id: ${id}`);
    Object.setPrototypeOf(this, _InvalidTransactionIdError.prototype);
  }
};

// app/domain/use-cases/transaction/add-to-a-user/response.ts
var AddTransactionToUserResponse = class _AddTransactionToUserResponse {
  static {
    __name(this, "AddTransactionToUserResponse");
  }
  transaction;
  success;
  message;
  errors;
  constructor(transaction, success, message, errors) {
    this.transaction = transaction;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(transaction) {
    return new _AddTransactionToUserResponse(transaction, true, transaction, []);
  }
  static failure(message, errors = []) {
    const finalErrors = errors.length > 0 ? errors : message ? [
      message
    ] : [];
    return new _AddTransactionToUserResponse(null, false, message, finalErrors);
  }
  static validationFailure(errors) {
    return new _AddTransactionToUserResponse(null, false, "Validation failed", errors);
  }
  getTransaction() {
    if (!this.transaction) {
      throw new InvalidTransactionIdError("Cannot get transaction from failed response");
    }
    return this.transaction;
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
  AddTransactionToUserResponse
});
//# sourceMappingURL=response.js.map