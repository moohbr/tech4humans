var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/use-cases/account/get-all-of-user/index.ts
import { ZodError } from "zod";

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
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return GetAllAccountsOfUserResponse.validationFailure(errors);
    }
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return GetAllAccountsOfUserResponse.failure(message);
  }
};
export {
  GetAllAccountsOfUserUseCase
};
//# sourceMappingURL=index.mjs.map