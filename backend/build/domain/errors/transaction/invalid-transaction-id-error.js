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

// app/domain/errors/transaction/invalid-transaction-id-error.ts
var invalid_transaction_id_error_exports = {};
__export(invalid_transaction_id_error_exports, {
  InvalidTransactionIdError: () => InvalidTransactionIdError
});
module.exports = __toCommonJS(invalid_transaction_id_error_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InvalidTransactionIdError
});
//# sourceMappingURL=invalid-transaction-id-error.js.map