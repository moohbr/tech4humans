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

// app/domain/errors/user/invalid-credentials-error.ts
var invalid_credentials_error_exports = {};
__export(invalid_credentials_error_exports, {
  InvalidCredentialsError: () => InvalidCredentialsError
});
module.exports = __toCommonJS(invalid_credentials_error_exports);

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

// app/domain/errors/not-authorized-error.ts
var NotAuthorizedError = class extends DomainError {
  static {
    __name(this, "NotAuthorizedError");
  }
  constructor() {
    super("Not authorized");
  }
  getStatusCode() {
    return 401;
  }
};

// app/domain/errors/user/invalid-credentials-error.ts
var InvalidCredentialsError = class _InvalidCredentialsError extends NotAuthorizedError {
  static {
    __name(this, "InvalidCredentialsError");
  }
  constructor() {
    super();
    Object.setPrototypeOf(this, _InvalidCredentialsError.prototype);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InvalidCredentialsError
});
//# sourceMappingURL=invalid-credentials-error.js.map