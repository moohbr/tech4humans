import { z } from "zod";
import { ConfigSchemas } from "./schemas";

declare global {
  namespace NodeJS {
    // @ts-expect-error ProcessEnv always will be Record<string, string | string[] | undefined>
    interface ProcessEnv extends z.infer<typeof ConfigSchemas.envSchema> {
      NODE_ENV: "development" | "production";
      DATABASE_PATH: string;
      APP_PORT: number;
      APP_HOST: string;
      JWT_SECRET: string;
      SESSION_SECRET: string;
      OPENAI_API_KEY: string;
    }
  }
}
