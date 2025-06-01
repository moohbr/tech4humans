import { z } from "zod";
import { UserSchemas } from "../user/schema";
import { AccountType } from "./enum";
import { BankSchemas } from "../bank/schema";

export class AccountSchemas {
  public static readonly nameSchema = z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome não pode exceder 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome só pode conter letras e espaços");

  public static readonly accountIdSchema = z
    .coerce
    .number()
    .int("ID da conta deve ser um número inteiro")
    .positive("ID da conta deve ser positivo");

  public static readonly accountTypeSchema = z.nativeEnum(AccountType);

  public static readonly balanceSchema = z
    .number()
    .refine((val) => Number.isFinite(val), {
      message: "Saldo deve ser um número finito",
    });

  public static readonly createAccountSchema = z.object({
    type: this.accountTypeSchema, 
    balance: this.balanceSchema,
    userId: UserSchemas.userIdSchema,
    bankName: BankSchemas.nameSchema,
  });

  public static readonly accountEntitySchema = z.object({
    id: this.accountIdSchema,
    name: this.nameSchema,
    type: this.accountTypeSchema,
    balance: this.balanceSchema,
    createdAt: z.date(),
  });
}