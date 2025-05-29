var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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
export {
  GetAllBanksResponse
};
//# sourceMappingURL=response.mjs.map