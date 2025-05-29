import { LoginRequest } from "@useCases/user/login/request";
import { LoginResponse } from "@useCases/user/login/response";

export interface LoginUseCaseInterface {
  execute(request: LoginRequest): Promise<LoginResponse>;
}
