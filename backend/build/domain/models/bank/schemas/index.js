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

// app/domain/models/bank/schemas/index.ts
var schemas_exports = {};
__export(schemas_exports, {
  BankSchemas: () => BankSchemas
});
module.exports = __toCommonJS(schemas_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BankSchemas
});
//# sourceMappingURL=index.js.map