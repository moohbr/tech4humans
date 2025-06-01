import { z } from "zod";

export class UserSchemas {
  public static readonly emailSchema = z
    .string()
    .email("Formato de email inválido")
    .min(1, "Email é obrigatório")
    .max(255, "Email não pode exceder 255 caracteres");

  public static readonly nameSchema = z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(100, "Nome não pode exceder 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome só pode conter letras e espaços");

  public static readonly userIdSchema = z
    .coerce
    .number()
    .int("ID do usuário deve ser um número inteiro")
    .positive("ID do usuário deve ser positivo");

  public static readonly passwordSchema = z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais",
    );

  public static readonly createUserSchema = z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    password: this.passwordSchema,
  });

  public static readonly userEntitySchema = z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    password: this.passwordSchema,
  });
}
