var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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
export {
  GetAllAccountsOfUserResponse
};
//# sourceMappingURL=response.mjs.map