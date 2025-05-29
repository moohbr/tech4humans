import { UpdateUserRequest } from "@useCases/user/update/request";
import { UpdateUserResponse } from "@useCases/user/update/response";

export interface UpdateUserUseCaseInterface {
  execute(request: UpdateUserRequest): Promise<UpdateUserResponse>;
}
