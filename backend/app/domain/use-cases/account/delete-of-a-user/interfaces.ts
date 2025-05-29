import { DeleteAccountOfUserRequest } from "@useCases/account/delete-of-a-user/request";
import { DeleteAccountOfUserResponse } from "@useCases/account/delete-of-a-user/response";

export interface DeleteAccountOfUserUseCaseInterface {
  execute(request: DeleteAccountOfUserRequest): Promise<DeleteAccountOfUserResponse>;
}
