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

// app/infrastructure/logger/index.ts
var logger_exports = {};
__export(logger_exports, {
  logWithContext: () => logWithContext,
  logger: () => logger,
  morganStream: () => morganStream
});
module.exports = __toCommonJS(logger_exports);
var import_winston = __toESM(require("winston"));
var consoleFormat = import_winston.default.format.combine(import_winston.default.format.timestamp({
  format: "YYYY-MM-DD HH:mm:ss"
}), import_winston.default.format.errors({
  stack: true
}), import_winston.default.format.printf((info) => {
  const { timestamp, level, message, stack, ...meta } = info;
  const levelColors = {
    error: "\x1B[31m",
    warn: "\x1B[33m",
    info: "\x1B[32m",
    debug: "\x1B[36m",
    verbose: "\x1B[35m"
  };
  const resetColor = "\x1B[0m";
  const levelColor = levelColors[level] || "";
  let logMessage = `${timestamp} [${levelColor}${level.toUpperCase()}${resetColor}]: ${message}`;
  if (stack) {
    logMessage += `
${stack}`;
  }
  const excludeFields = [
    "timestamp",
    "level",
    "message",
    "stack"
  ];
  const filteredMeta = Object.keys(meta).filter((key) => !excludeFields.includes(key)).reduce((obj, key) => {
    obj[key] = meta[key];
    return obj;
  }, {});
  const metaKeys = Object.keys(filteredMeta);
  if (metaKeys.length > 0) {
    const metaString = JSON.stringify(filteredMeta, null, 2);
    logMessage += `
${metaString}`;
  }
  return logMessage;
}));
var isProduction = process.env.NODE_ENV === "production";
var logger = import_winston.default.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? "warn" : "debug"),
  defaultMeta: {
    service: "tech4humans",
    environment: process.env.NODE_ENV || "development"
  },
  transports: [
    new import_winston.default.transports.Console({
      format: consoleFormat,
      handleExceptions: true,
      handleRejections: true
    })
  ],
  exitOnError: false
});
var morganStream = {
  write: /* @__PURE__ */ __name((message) => {
    logger.info(message.trim(), {
      component: "http"
    });
  }, "write")
};
var logWithContext = {
  database: /* @__PURE__ */ __name((message, meta) => {
    logger.info(message, {
      component: "database",
      ...meta
    });
  }, "database"),
  server: /* @__PURE__ */ __name((message, meta) => {
    logger.info(message, {
      component: "server",
      ...meta
    });
  }, "server"),
  auth: /* @__PURE__ */ __name((message, meta) => {
    logger.info(message, {
      component: "auth",
      ...meta
    });
  }, "auth"),
  api: /* @__PURE__ */ __name((message, meta) => {
    logger.info(message, {
      component: "api",
      ...meta
    });
  }, "api"),
  error: /* @__PURE__ */ __name((message, error, meta) => {
    logger.error(message, {
      error: error?.message,
      stack: error?.stack,
      ...meta
    });
  }, "error")
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  logWithContext,
  logger,
  morganStream
});
//# sourceMappingURL=index.js.map