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

// app/infrastructure/http/routes/base/controller.ts
import { ZodError } from "zod";
var BaseController = class {
  static {
    __name(this, "BaseController");
  }
  sendSuccessResponse(res, message, data, statusCode = 200) {
    const response = {
      message
    };
    if (data !== void 0) {
      response.data = data;
    }
    res.status(statusCode).json(response);
  }
  sendErrorResponse(res, message, errors = [], statusCode = 422) {
    logger.error("BaseController.sendErrorResponse", message);
    res.status(statusCode).json({
      message,
      errors
    });
  }
  getErrorStatusCode(message, hasValidationErrors) {
    if (hasValidationErrors) return 400;
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("invalid credentials") || lowerMessage.includes("authentication failed")) {
      return 401;
    }
    if (lowerMessage.includes("unauthorized") || lowerMessage.includes("permission") || lowerMessage.includes("account locked") || lowerMessage.includes("account disabled")) {
      return 403;
    }
    if (lowerMessage.includes("not found")) {
      return 404;
    }
    if (lowerMessage.includes("already exists") || lowerMessage.includes("duplicate")) {
      return 409;
    }
    return 422;
  }
  handleControllerError(error, res, controllerName) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code
      }));
      res.status(400).json({
        success: false,
        message: "Invalid request format",
        errors
      });
      return;
    }
    logger.error(`${controllerName} Error:`, error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
  validateRequiredParam(param, paramName, res) {
    if (!param) {
      this.sendErrorResponse(res, `${paramName} is required`, [
        `${paramName} parameter is missing`
      ], 400);
      return false;
    }
    return true;
  }
};

// app/domain/models/user/schemas/index.ts
import { z } from "zod";
var UserSchemas = class {
  static {
    __name(this, "UserSchemas");
  }
  static emailSchema = z.string().email("Invalid email format").min(1, "Email is required").max(255, "Email cannot exceed 255 characters");
  static nameSchema = z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static userIdSchema = z.number().int("User ID must be an integer").positive("User ID must be positive");
  static passwordSchema = z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain uppercase, lowercase, number and special character");
  static createUserSchema = z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: z.string().min(8, "Password hash is required")
  });
  static userEntitySchema = z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: z.date(),
    passwordHash: z.string().min(8, "Password hash is required")
  });
};

// app/domain/use-cases/transaction/get-all-of-user/schemas.ts
import z2 from "zod";
var GetAllOfUserSchemas = class {
  static {
    __name(this, "GetAllOfUserSchemas");
  }
  static requestSchema = z2.object({
    userId: UserSchemas.userIdSchema
  });
  static httpRequestSchema = z2.object({
    params: this.requestSchema
  });
};

// app/domain/use-cases/transaction/get-all-of-user/request.ts
var GetAllOfUserRequest = class _GetAllOfUserRequest {
  static {
    __name(this, "GetAllOfUserRequest");
  }
  userId;
  constructor(userId) {
    this.userId = userId;
  }
  static createFromRaw(raw) {
    const parsed = GetAllOfUserSchemas.requestSchema.parse(raw);
    return new _GetAllOfUserRequest(parsed.userId);
  }
  getUserId() {
    return this.userId;
  }
};

// app/infrastructure/http/routes/v1/transaction/controllers/get-all-of-user.ts
var GetAllTransactionsOfUserController = class extends BaseController {
  static {
    __name(this, "GetAllTransactionsOfUserController");
  }
  getAllOfUserUseCase;
  constructor(getAllOfUserUseCase) {
    super(), this.getAllOfUserUseCase = getAllOfUserUseCase;
  }
  async handle(req, res) {
    try {
      const userId = req.params.userId;
      if (!this.validateRequiredParam(userId, "User ID", res)) return;
      const request = GetAllOfUserRequest.createFromRaw({
        userId
      });
      const response = await this.getAllOfUserUseCase.execute(request);
      if (response.isSuccess()) {
        this.sendSuccessResponse(res, response.getMessage(), response.getTransactions().map((t) => t.toJSON()));
        return;
      }
      const statusCode = this.getErrorStatusCode(response.getMessage(), response.hasErrors());
      this.sendErrorResponse(res, response.getMessage(), response.getErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "GetAllTransactionsOfUserController");
    }
  }
};
export {
  GetAllTransactionsOfUserController
};
//# sourceMappingURL=get-all-of-user.mjs.map