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

// app/domain/use-cases/account/delete-of-a-user/response.ts
var response_exports = {};
__export(response_exports, {
  DeleteAccountOfUserResponse: () => DeleteAccountOfUserResponse
});
module.exports = __toCommonJS(response_exports);
var DeleteAccountOfUserResponse = class _DeleteAccountOfUserResponse {
  static {
    __name(this, "DeleteAccountOfUserResponse");
  }
  success;
  error;
  validationErrors;
  constructor(success, error, validationErrors) {
    this.success = success;
    this.error = error;
    this.validationErrors = validationErrors;
  }
  static success() {
    return new _DeleteAccountOfUserResponse(true);
  }
  static failure(error) {
    return new _DeleteAccountOfUserResponse(false, error);
  }
  static validationFailure(errors) {
    return new _DeleteAccountOfUserResponse(false, void 0, errors);
  }
  isSuccess() {
    return this.success;
  }
  getError() {
    return this.error;
  }
  getValidationErrors() {
    return this.validationErrors;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteAccountOfUserResponse
});
//# sourceMappingURL=response.js.map