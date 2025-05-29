var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/use-cases/account/delete-of-a-user/response.ts
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
export {
  DeleteAccountOfUserResponse
};
//# sourceMappingURL=response.mjs.map