import { DeleteUserRequest } from "@useCases/user/delete/request";
import { DeleteUserResponse } from "@useCases/user/delete/response";

export interface DeleteUserUseCaseInterface {
  execute(request: DeleteUserRequest): Promise<DeleteUserResponse>;
}
