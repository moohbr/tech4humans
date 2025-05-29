import { z } from "zod";

export class BankSchemas {

  public static readonly nameSchema = z
    .string()
    .min(2, "Name must have at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");

  public static readonly createBankSchema = z.object({
    name: this.nameSchema,
  });

  public static readonly bankEntitySchema = z.object({
    name: this.nameSchema,
  });
}

