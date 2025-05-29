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

// app/infrastructure/http/routes/factory/index.ts
var factory_exports = {};
__export(factory_exports, {
  RouterFactory: () => RouterFactory
});
module.exports = __toCommonJS(factory_exports);
var import_express = require("express");
var RouterFactory = class {
  static {
    __name(this, "RouterFactory");
  }
  static createRouter(config = {}) {
    return (0, import_express.Router)({
      mergeParams: config.mergeParams ?? true,
      caseSensitive: config.caseSensitive ?? true,
      strict: config.strict ?? true
    });
  }
  static createStandardRouter() {
    return this.createRouter({
      mergeParams: true,
      caseSensitive: true,
      strict: true
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RouterFactory
});
//# sourceMappingURL=index.js.map