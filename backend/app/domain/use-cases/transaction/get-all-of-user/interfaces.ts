import { GetAllOfUserRequest } from "@useCases/transaction/get-all-of-user/request";
import { GetAllOfUserResponse } from "@useCases/transaction/get-all-of-user/response";

export interface GetAllOfUserUseCaseInterface {
    execute(request: GetAllOfUserRequest): Promise<GetAllOfUserResponse>;
}   