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

// app/domain/use-cases/user/delete/response.ts
var response_exports = {};
__export(response_exports, {
  DeleteUserResponse: () => DeleteUserResponse
});
module.exports = __toCommonJS(response_exports);
var DeleteUserResponse = class _DeleteUserResponse {
  static {
    __name(this, "DeleteUserResponse");
  }
  success;
  message;
  errors;
  constructor(success, message, errors) {
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success() {
    return new _DeleteUserResponse(true, "User deleted successfully", []);
  }
  static failure(message, errors = []) {
    return new _DeleteUserResponse(false, message, errors);
  }
  static validationFailure(errors) {
    return new _DeleteUserResponse(false, "Validation failed", errors);
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
  DeleteUserResponse
});
//# sourceMappingURL=response.js.map