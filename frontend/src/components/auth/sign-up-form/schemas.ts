import { BankSchemas } from "@/types/bank/schema";
import { AccountSchemas } from "@/types/account/schema";
import { UserSchemas } from "@/types/user/schema";
import { z } from "zod";

export const signUpSchema = z.object({
  account: z.object({
    name: AccountSchemas.nameSchema,
    type: AccountSchemas.accountTypeSchema,
    balance: AccountSchemas.balanceSchema,
    bank: z.object({
      name: BankSchemas.nameSchema,
    }),
  }),
  user: z.object({
    name: UserSchemas.nameSchema,
    email: UserSchemas.emailSchema,
    password: UserSchemas.passwordSchema,
  }),
});