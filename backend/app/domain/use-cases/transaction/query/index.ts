import { QueryTransactionRequest } from "@useCases/transaction/query/request";
import { QueryTransactionResponse } from "@useCases/transaction/query/response";
import { QueryTransactionUseCaseInterface } from "@useCases/transaction/query/interfaces";
import { TransactionRepositoryInterface } from "@models/transaction/repository/interfaces";
import { TransactionNotFoundError } from "@errors/transaction/transaction-not-found-error";
import { AccountId } from "@models/account/value-objects/id";
import { Page } from "@models/base/value-objects/page";
import { Limit } from "@models/base/value-objects/limit";
import { QueryTransactionSchemas } from "./schemas";
import { logger } from "@infrastructure/logger";
import { TransactionEntity } from "@models/transaction/entity";
import { UserId } from "@models/user/value-objects/id";
import { OrderBy } from "@models/base/value-objects/orderBy";

export class QueryTransactionUseCase implements QueryTransactionUseCaseInterface {
    constructor(
        private readonly transactionRepository: TransactionRepositoryInterface,
    ) { }

    public async execute(request: QueryTransactionRequest): Promise<QueryTransactionResponse> {
        try {
            logger.info("Starting transaction query process", {
                userId: request.getUserId(),
                accountId: request.getAccountId(),
                page: request.getPage(),
                limit: request.getLimit(),
                orderBy: request.getOrderBy()
            });

            logger.debug("Validating request parameters");
            const validated = QueryTransactionSchemas.httpRequestSchema.parse({
                query: {
                    accountId: request.getAccountId()?.getValue(),
                    page: request.getPage()?.getValue(),
                    limit: request.getLimit()?.getValue(),
                    orderBy: request.getOrderBy()?.getValue()
                },
                params: {
                    userId: request.getUserId().getValue(),
                }
            });

            const userId = UserId.create(validated.params?.userId);
            const accountId = validated.query?.accountId ? AccountId.create(validated.query.accountId) : undefined;
            
            const date = validated.query?.date ? new Date(validated.query.date) : undefined;
            const orderByField = validated.query?.orderByField;
            
            const hasFilters = !!(accountId || date || orderByField);
            
            const page = hasFilters && validated.query?.page ? Page.create(validated.query.page) : undefined;
            const limit = hasFilters && validated.query?.limit ? Limit.create(validated.query.limit) : undefined;
            const orderBy = validated.query?.orderBy ? OrderBy.create(validated.query.orderBy) : undefined;

            logger.debug("Querying transactions with parameters", {
                userId: userId.getValue(),
                accountId: accountId?.getValue(),
                date: date?.toISOString(),
                orderByField,
                page: page?.getValue(),
                limit: limit?.getValue(),
                orderBy: orderBy?.getValue(),
                hasFilters,
                willUsePagination: hasFilters
            });

            if (!userId) {
                const error = new Error("User ID is required");
                logger.error("Missing user ID in query", {
                    error: error.message
                });
                throw error;
            }

            const queryOptions: any = {};
            if (hasFilters) {
                if (page) queryOptions.page = page;
                if (limit) queryOptions.limit = limit;
                if (accountId) queryOptions.accountId = accountId;
                if (date) queryOptions.date = date;
                if (orderByField) queryOptions.orderByField = orderByField;
            }
            if (orderBy) queryOptions.orderBy = orderBy;

            logger.debug("Fetching transactions from repository", {
                userId: userId.getValue(),
                queryOptions,
                hasFilters,
                fetchMode: hasFilters ? 'filtered_with_pagination' : 'all_user_transactions'
            });

            const transactions = await this.transactionRepository.findByUserId(
                userId, 
                hasFilters ? queryOptions : undefined
            );

            if (!transactions || transactions.length === 0) {
                const error = new TransactionNotFoundError();
                logger.warn("No transactions found for query", {
                    userId: userId.getValue(),
                    accountId: accountId?.getValue(),
                    error: error.message
                });
                throw error;
            }

            const totalAmount = transactions.reduce((sum: number, t: TransactionEntity) => 
                sum + t.getAmount().getValue(), 0
            );

            logger.info("Successfully retrieved transactions", {
                transactionCount: transactions.length,
                totalAmount,
                userId: userId.getValue(),
                accountId: accountId?.getValue(),
                hasFilters,
                fetchMode: hasFilters ? 'filtered_with_pagination' : 'all_user_transactions'
            });

            return QueryTransactionResponse.success(transactions);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown): QueryTransactionResponse {
        const message = error instanceof Error ? error.message : "Unknown error occurred";
        const errors = error instanceof Error ? [error] : [new Error(message)];
        return QueryTransactionResponse.failure("Error querying transactions", errors);
    }
}