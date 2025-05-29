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

// app/domain/use-cases/transaction/get-all-of-user/response.ts
var response_exports = {};
__export(response_exports, {
  GetAllOfUserResponse: () => GetAllOfUserResponse
});
module.exports = __toCommonJS(response_exports);
var GetAllOfUserResponse = class _GetAllOfUserResponse {
  static {
    __name(this, "GetAllOfUserResponse");
  }
  transactions;
  success;
  message;
  errors;
  constructor(transactions, success, message, errors) {
    this.transactions = transactions;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(transactions) {
    return new _GetAllOfUserResponse(transactions, true, "Transactions fetched successfully", []);
  }
  static failure(message, errors) {
    return new _GetAllOfUserResponse([], false, message, errors);
  }
  getTransactions() {
    return this.transactions;
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
  GetAllOfUserResponse
});
//# sourceMappingURL=response.js.map