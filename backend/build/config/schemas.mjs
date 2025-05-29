var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/config/schemas.ts
import fs from "fs";
import path from "path";
import { z } from "zod";

// app/config/enums.ts
var NODE_ENV = /* @__PURE__ */ function(NODE_ENV2) {
  NODE_ENV2["DEV"] = "development";
  NODE_ENV2["PROD"] = "production";
  NODE_ENV2["TEST"] = "test";
  return NODE_ENV2;
}({});

// app/config/schemas.ts
var ConfigSchemas = class {
  static {
    __name(this, "ConfigSchemas");
  }
  databasePathSchema = z.string().min(1).refine((val) => val.endsWith(".sqlite"), {
    message: "Database path must end with .sqlite"
  }).refine((val) => fs.existsSync(path.resolve(val)), {
    message: "Database file does not exist"
  });
  envSchema = z.object({
    DATABASE_PATH: this.databasePathSchema.default("db.sqlite"),
    APP_PORT: z.coerce.number().default(8080),
    APP_HOST: z.string().optional().default("0.0.0.0"),
    JWT_SECRET: z.string().optional().default("keyboard cat"),
    NODE_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEV),
    SESSION_SECRET: z.string().optional().default("keyboard cat"),
    OPENAI_API_KEY: z.string().default("")
  });
};
export {
  ConfigSchemas
};
//# sourceMappingURL=schemas.mjs.map