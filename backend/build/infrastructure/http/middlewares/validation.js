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

// app/infrastructure/http/middlewares/validation.ts
var validation_exports = {};
__export(validation_exports, {
  ValidationMiddleware: () => ValidationMiddleware
});
module.exports = __toCommonJS(validation_exports);
var import_zod = require("zod");
var ValidationMiddleware = class {
  static {
    __name(this, "ValidationMiddleware");
  }
  static validate(schema) {
    return (req, res, next) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params
        });
        next();
      } catch (error) {
        if (error instanceof import_zod.ZodError) {
          const errors = error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
            code: err.code
          }));
          res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
          });
          return;
        }
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidationMiddleware
});
//# sourceMappingURL=validation.js.map