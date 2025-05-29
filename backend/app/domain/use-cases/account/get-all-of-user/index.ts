import { ZodError } from "zod";
import { GetAllAccountsOfUserRequest } from "@useCases/account/get-all-of-user/request";
import { GetAllAccountsOfUserResponse } from "@useCases/account/get-all-of-user/response";
import { GetAllAccountsOfUserUseCaseInterface } from "@useCases/account/get-all-of-user/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";

export class GetAllAccountsOfUserUseCase implements GetAllAccountsOfUserUseCaseInterface {
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  public async execute(request: GetAllAccountsOfUserRequest): Promise<GetAllAccountsOfUserResponse> {
    try {
      const userId = request.getUserIdVO();
      
      const accounts = await this.accountRepository.findByUserId(userId);
      
      if (!accounts || accounts.length === 0) {
        return GetAllAccountsOfUserResponse.failure("No accounts found", []);
      }

      return GetAllAccountsOfUserResponse.success(accounts);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): GetAllAccountsOfUserResponse {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      return GetAllAccountsOfUserResponse.validationFailure(errors);
    }

    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return GetAllAccountsOfUserResponse.failure(message, []);
  }
}