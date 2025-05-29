"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// app/domain/services/auth/index.ts
var auth_exports = {};
__export(auth_exports, {
  AuthService: () => AuthService
});
module.exports = __toCommonJS(auth_exports);
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthService = class {
  static {
    __name(this, "AuthService");
  }
  jwtSecret;
  jwtExpiresIn;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = "1h";
  }
  async hashPassword(raw) {
    return import_bcryptjs.default.hash(raw, 10);
  }
  async comparePassword(raw, hash) {
    return import_bcryptjs.default.compare(raw, hash);
  }
  generateToken(userId) {
    return import_jsonwebtoken.default.sign({
      userId
    }, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn
    });
  }
  verifyToken(token) {
    const decoded = import_jsonwebtoken.default.verify(token, this.jwtSecret);
    return decoded;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthService
});
//# sourceMappingURL=index.js.map