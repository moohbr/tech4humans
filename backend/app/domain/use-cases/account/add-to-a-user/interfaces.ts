import { AddAccountToUserRequest } from "@useCases/account/add-to-a-user/request";
import { AddAccountToUserResponse } from "@useCases/account/add-to-a-user/response";

export interface AddAccountToUserUseCaseInterface {
  execute(request: AddAccountToUserRequest): Promise<AddAccountToUserResponse>;
}
