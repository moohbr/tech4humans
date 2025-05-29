import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { ZodError } from "zod";
import { DeleteAccountOfUserRequest } from "@useCases/account/delete-of-a-user/request";
import { DeleteAccountOfUserUseCaseInterface } from "@useCases/account/delete-of-a-user/interfaces";
import { DeleteAccountOfUserResponse } from "@useCases/account/delete-of-a-user/response";
import { AccountNotFoundError } from "@domain/errors/account/account-not-found-error";

export class DeleteAccountOfUserUseCase implements DeleteAccountOfUserUseCaseInterface {
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  public async execute(request: DeleteAccountOfUserRequest): Promise<DeleteAccountOfUserResponse> {
    try {
      const account = await this.accountRepository.findById(request.getAccountIdVO());
      if (!account) {
        throw new AccountNotFoundError(request.getAccountId().toString());
      }

      await this.accountRepository.delete(request.getAccountIdVO());
  
      return DeleteAccountOfUserResponse.success();
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): DeleteAccountOfUserResponse {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      return DeleteAccountOfUserResponse.validationFailure(errors);
    }

    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return DeleteAccountOfUserResponse.failure(message, []);
  }
}
