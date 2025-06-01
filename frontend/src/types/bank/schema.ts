import { z } from "zod";

export class BankSchemas {

  public static readonly nameSchema = z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome não pode exceder 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome só pode conter letras e espaços");

  public static readonly createBankSchema = z.object({
    name: this.nameSchema,
  });

  public static readonly bankEntitySchema = z.object({
    name: this.nameSchema,
  });
}

