import fs from "fs";
import path from "path";
import { z } from "zod";
import { NODE_ENV } from "./enums";

export class ConfigSchemas {
  private readonly databasePathSchema = z
    .string()
    .min(1)
    .refine((val) => val.endsWith(".sqlite"), {
      message: "Database path must end with .sqlite",
    })
    .refine((val) => fs.existsSync(path.resolve(val)), {
      message: "Database file does not exist",
    });

  public readonly envSchema = z.object({
    DATABASE_PATH: this.databasePathSchema.default("db.sqlite"),
    APP_PORT: z.coerce.number().default(8080),
    APP_HOST: z.string().optional().default("0.0.0.0"),
    JWT_SECRET: z.string().optional().default("keyboard cat"),
    NODE_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEV),
    SESSION_SECRET: z.string().optional().default("keyboard cat"),
    OPENAI_API_KEY: z.string().default(""),
  });
}
