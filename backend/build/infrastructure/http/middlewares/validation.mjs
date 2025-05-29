var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/infrastructure/http/middlewares/validation.ts
import { ZodError } from "zod";
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
        if (error instanceof ZodError) {
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
export {
  ValidationMiddleware
};
//# sourceMappingURL=validation.mjs.map