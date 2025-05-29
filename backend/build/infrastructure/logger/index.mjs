var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/infrastructure/logger/index.ts
import winston from "winston";
var consoleFormat = winston.format.combine(winston.format.timestamp({
  format: "YYYY-MM-DD HH:mm:ss"
}), winston.format.errors({
  stack: true
}), winston.format.printf((info) => {
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
var logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? "warn" : "debug"),
  defaultMeta: {
    service: "tech4humans",
    environment: process.env.NODE_ENV || "development"
  },
  transports: [
    new winston.transports.Console({
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
export {
  logWithContext,
  logger,
  morganStream
};
//# sourceMappingURL=index.mjs.map