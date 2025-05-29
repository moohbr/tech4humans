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

// app/domain/models/bank/value-objects/id.ts
var id_exports = {};
__export(id_exports, {
  BankId: () => BankId
});
module.exports = __toCommonJS(id_exports);

// app/domain/models/bank/schemas/index.ts
var import_zod = require("zod");
var BankSchemas = class {
  static {
    __name(this, "BankSchemas");
  }
  static nameSchema = import_zod.z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static createBankSchema = import_zod.z.object({
    name: this.nameSchema
  });
  static bankEntitySchema = import_zod.z.object({
    name: this.nameSchema
  });
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

// app/domain/errors/validation-error.ts
var ValidationError = class _ValidationError extends DomainError {
  static {
    __name(this, "ValidationError");
  }
  errors;
  constructor(message, errors = []) {
    super(message), this.errors = errors;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  getStatusCode() {
    return 400;
  }
  getErrors() {
    return this.errors;
  }
};

// app/domain/errors/bank/invalid-bank-id-error.ts
var InvalidBankIdError = class _InvalidBankIdError extends ValidationError {
  static {
    __name(this, "InvalidBankIdError");
  }
  constructor(id) {
    super(`Invalid bank id: ${id}`);
    Object.setPrototypeOf(this, _InvalidBankIdError.prototype);
  }
};

// app/domain/models/bank/value-objects/id.ts
var BankId = class _BankId {
  static {
    __name(this, "BankId");
  }
  value;
  isNewId;
  constructor(value, isNewId = false) {
    this.value = value;
    this.isNewId = isNewId;
  }
  static create(id) {
    const validatedId = BankSchemas.bankIdSchema.parse(id);
    return new _BankId(validatedId, false);
  }
  static createNew() {
    return new _BankId(null, true);
  }
  static createFromDatabase(id) {
    const validatedId = BankSchemas.bankIdSchema.parse(id);
    return new _BankId(validatedId, false);
  }
  static createUnsafe(id) {
    return new _BankId(id, false);
  }
  getValue() {
    if (this.value === null) {
      throw new InvalidBankIdError("new");
    }
    return this.value;
  }
  isNew() {
    return this.isNewId;
  }
  equals(other) {
    return this.value === other.value;
  }
  toString() {
    return this.value?.toString() ?? "new";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BankId
});
//# sourceMappingURL=id.js.map