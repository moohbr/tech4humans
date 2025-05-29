import { GetAllAccountsOfUserRequest } from "@useCases/account/get-all-of-user/request";
import { GetAllAccountsOfUserResponse } from "@useCases/account/get-all-of-user/response";

export interface GetAllAccountsOfUserUseCaseInterface {
  execute(request: GetAllAccountsOfUserRequest): Promise<GetAllAccountsOfUserResponse>;
}
