import { AccountId } from "@models/account/value-objects/id";
import { QueryTransactionSchemas } from "@useCases/transaction/query/schemas";
import { Page } from "@models/base/value-objects/page";
import { Limit } from "@models/base/value-objects/limit";
import { OrderBy } from "@models/base/value-objects/orderBy";
import { UserId } from "@models/user/value-objects/id";

export class QueryTransactionRequest {
    constructor(
        private readonly userId: UserId,
        private readonly accountId: AccountId | undefined,
        private readonly date?: Date,
        private readonly orderBy?: OrderBy,
        private readonly orderByField?: 'date' | 'amount',
        private readonly page?: Page,
        private readonly limit?: Limit,
    ) { }

    public static createFromRaw(raw: unknown): QueryTransactionRequest {
        const parsed = QueryTransactionSchemas.requestSchema.parse(raw);
        return new QueryTransactionRequest(
            UserId.create(parsed.userId),
            parsed.accountId ? AccountId.create(parsed.accountId) : undefined,
            parsed.date ? new Date(parsed.date) : undefined,
            OrderBy.create(parsed.orderBy),
            parsed.orderByField,
            Page.create(parsed.page),
            Limit.create(parsed.limit)
        );
    }

    public getUserId(): UserId {
        return this.userId;
    }

    public getAccountId(): AccountId | undefined {
        return this.accountId;
    }

    public getDate(): Date | undefined {
        return this.date;
    }

    public getOrderBy(): OrderBy | undefined {
        return this.orderBy;
    }

    public getOrderByField(): 'date' | 'amount' | undefined {
        return this.orderByField;
    }

    public getPage(): Page | undefined {
        return this.page;
    }

    public getLimit(): Limit | undefined {
        return this.limit;
    }
}   