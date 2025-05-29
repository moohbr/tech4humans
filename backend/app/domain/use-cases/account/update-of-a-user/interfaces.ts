import { UpdateAccountOfUserRequest } from "@useCases/account/update-of-a-user/request";
import { UpdateAccountOfUserResponse } from "@useCases/account/update-of-a-user/response";

export interface UpdateAccountOfUserUseCaseInterface {
  execute(request: UpdateAccountOfUserRequest): Promise<UpdateAccountOfUserResponse>;
}
