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

// app/infrastructure/http/middlewares/route-handler.ts
var route_handler_exports = {};
__export(route_handler_exports, {
  RouteHandlerMiddleware: () => RouteHandlerMiddleware
});
module.exports = __toCommonJS(route_handler_exports);
var RouteHandlerMiddleware = class {
  static {
    __name(this, "RouteHandlerMiddleware");
  }
  static asyncHandler(handler) {
    return (req, res, next) => {
      Promise.resolve(handler(req, res, next)).catch(next);
    };
  }
  static syncHandler(handler) {
    return handler;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RouteHandlerMiddleware
});
//# sourceMappingURL=route-handler.js.map