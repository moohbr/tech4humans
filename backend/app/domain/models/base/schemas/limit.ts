import { z } from "zod";

export class LimitSchemas {
  private static readonly maxLimit = 100;
  private static readonly defaultLimit = 10;

  public static readonly limitSchema = z.
        coerce
        .number()
        .int()
        .min(1)
        .max(this.maxLimit)
        .default(this.defaultLimit);
}