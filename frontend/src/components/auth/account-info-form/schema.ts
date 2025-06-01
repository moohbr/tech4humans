import { AccountSchemas } from "@/types/account/schema";
import { BankSchemas } from "@/types/bank/schema";
import { z } from "zod";

export const accountInfoFormSchema = z.object({
  name: AccountSchemas.nameSchema,
  type: AccountSchemas.accountTypeSchema,
  balance: AccountSchemas.balanceSchema,
  bank: z.object({
    name: BankSchemas.nameSchema,
  }),
});


export const accountInfoTransformedSchema = accountInfoFormSchema.transform((data) => ({
  ...data,
  balance: Number(data.balance),
}));
