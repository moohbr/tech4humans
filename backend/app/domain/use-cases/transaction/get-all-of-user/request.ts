import { GetAllOfUserSchemas } from "@useCases/transaction/get-all-of-user/schemas";

export class GetAllOfUserRequest {
    constructor(
        private readonly userId: number,
    ) {}

    public static createFromRaw(raw: unknown): GetAllOfUserRequest {
        const parsed = GetAllOfUserSchemas.requestSchema.parse(raw);
        return new GetAllOfUserRequest(parsed.userId);
    }

    public getUserId(): number {
        return this.userId;
    }
}   