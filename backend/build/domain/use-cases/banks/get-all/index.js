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

// app/domain/use-cases/banks/get-all/index.ts
var get_all_exports = {};
__export(get_all_exports, {
  GetAllBanksUseCase: () => GetAllBanksUseCase
});
module.exports = __toCommonJS(get_all_exports);

// app/domain/use-cases/banks/get-all/response.ts
var GetAllBanksResponse = class _GetAllBanksResponse {
  static {
    __name(this, "GetAllBanksResponse");
  }
  banks;
  success;
  message;
  errors;
  constructor(banks, success, message, errors) {
    this.banks = banks;
    this.success = success;
    this.message = message;
    this.errors = errors;
  }
  static success(banks) {
    return new _GetAllBanksResponse(banks, true, "Banks fetched successfully", []);
  }
  static failure(message, errors = []) {
    const allErrors = errors.length > 0 ? errors : [
      message
    ];
    return new _GetAllBanksResponse([], false, message, allErrors);
  }
  static validationFailure(errors) {
    return new _GetAllBanksResponse([], false, "Validation failed", errors);
  }
  getBanks() {
    return this.banks;
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

// app/domain/errors/not-found-error.ts
var NotFoundError = class _NotFoundError extends DomainError {
  static {
    __name(this, "NotFoundError");
  }
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, _NotFoundError.prototype);
  }
  getStatusCode() {
    return 404;
  }
};

// app/domain/errors/bank/bank-not-found-error.ts
var BankNotFoundError = class _BankNotFoundError extends NotFoundError {
  static {
    __name(this, "BankNotFoundError");
  }
  constructor(name) {
    super(`Bank not found: ${name}`);
    Object.setPrototypeOf(this, _BankNotFoundError.prototype);
  }
};

// app/domain/use-cases/banks/get-all/index.ts
var GetAllBanksUseCase = class {
  static {
    __name(this, "GetAllBanksUseCase");
  }
  bankRepository;
  constructor(bankRepository) {
    this.bankRepository = bankRepository;
  }
  async execute() {
    try {
      const banks = await this.bankRepository.findAll();
      if (!banks || banks.length === 0) {
        throw new BankNotFoundError("No banks found");
      }
      return GetAllBanksResponse.success(banks);
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return GetAllBanksResponse.failure(message);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetAllBanksUseCase
});
//# sourceMappingURL=index.js.map