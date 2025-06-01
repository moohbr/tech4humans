import { QueryTransactionRequest } from "@useCases/transaction/query/request";
import { QueryTransactionResponse } from "@useCases/transaction/query/response";

export interface QueryTransactionUseCaseInterface {
    execute(request: QueryTransactionRequest): Promise<QueryTransactionResponse>;
}   