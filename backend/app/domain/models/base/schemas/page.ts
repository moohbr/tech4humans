import { z } from "zod";

export class PageSchemas {
    private static readonly minPage = 1;
    private static readonly defaultPage = 1;

    public static readonly pageSchema = z.
        coerce
        .number()
        .int()
        .min(this.minPage)
        .default(this.defaultPage);
}