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

// app/domain/use-cases/account/get-all-of-user/index.ts
var get_all_of_user_exports = {};
__export(get_all_of_user_exports, {
  GetAllAccountsOfUserUseCase: () => GetAllAccountsOfUserUseCase
});
module.exports = __toCommonJS(get_all_of_user_exports);
var import_zod = require("zod");

// app/domain/use-cases/account/get-all-of-user/response.ts
var GetAllAccountsOfUserResponse = class _GetAllAccountsOfUserResponse {
  static {
    __name(this, "GetAllAccountsOfUserResponse");
  }
  success;
  data;
  error;
  validationErrors;
  constructor(success, data, error, validationErrors) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.validationErrors = validationErrors;
  }
  static success(data) {
    return new _GetAllAccountsOfUserResponse(true, data);
  }
  static failure(error) {
    return new _GetAllAccountsOfUserResponse(false, void 0, error);
  }
  static validationFailure(errors) {
    return new _GetAllAccountsOfUserResponse(false, void 0, void 0, errors);
  }
  isSuccess() {
    return this.success;
  }
  getData() {
    return this.data;
  }
  getError() {
    return this.error;
  }
  getValidationErrors() {
    return this.validationErrors;
  }
};

// app/domain/use-cases/account/get-all-of-user/index.ts
var GetAllAccountsOfUserUseCase = class {
  static {
    __name(this, "GetAllAccountsOfUserUseCase");
  }
  accountRepository;
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }
  async execute(request) {
    try {
      const userId = request.getUserIdVO();
      const accounts = await this.accountRepository.findByUserId(userId);
      if (!accounts || accounts.length === 0) {
        return GetAllAccountsOfUserResponse.failure("No accounts found");
      }
      return GetAllAccountsOfUserResponse.success(accounts);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    if (error instanceof import_zod.ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return GetAllAccountsOfUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return GetAllAccountsOfUserResponse.failure(message);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllAccountsOfUserUseCase
});
//# sourceMappingURL=index.js.map