var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/use-cases/user/delete/response.ts
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
export {
  DeleteUserResponse
};
//# sourceMappingURL=response.mjs.map