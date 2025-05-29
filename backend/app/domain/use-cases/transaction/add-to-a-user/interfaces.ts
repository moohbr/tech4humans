import { AddTransactionToUserRequest } from "@useCases/transaction/add-to-a-user/request";
import { AddTransactionToUserResponse } from "@useCases/transaction/add-to-a-user/response";

export interface AddTransactionToUserUseCaseInterface {
  execute(request: AddTransactionToUserRequest): Promise<AddTransactionToUserResponse>;
}