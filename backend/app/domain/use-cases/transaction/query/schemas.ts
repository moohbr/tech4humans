import { AccountSchemas } from "@models/account/schemas";
import { UserSchemas } from "@models/user/schemas";
import { BaseSchemas } from "@models/base/schemas";
import z from "zod";

export class QueryTransactionSchemas {
    public static readonly requestSchema = z.object({
        userId: UserSchemas.userIdSchema,
        accountId: AccountSchemas.accountIdSchema.optional(),
        date: z.coerce.date().optional(),
        orderBy: BaseSchemas.orderBySchema.optional(),
        orderByField: z.enum(['date', 'amount']).optional().default("date"),
        page: BaseSchemas.pageSchema,
        limit: BaseSchemas.limitSchema,
    });

    public static readonly httpRequestSchema = z.object({
        query: this.requestSchema.omit({ userId: true }),
        params: z.object({
            userId: UserSchemas.userIdSchema,
        }),
    }); 
}