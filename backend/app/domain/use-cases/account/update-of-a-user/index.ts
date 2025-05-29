import { UpdateAccountOfUserRequest } from "@useCases/account/update-of-a-user/request";
import { UpdateAccountOfUserResponse } from "@useCases/account/update-of-a-user/response";
import { UpdateAccountOfUserUseCaseInterface } from "@useCases/account/update-of-a-user/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { AccountNotFoundError } from "@errors/account/account-not-found-error";
import { AccountEntity } from "@models/account/entity";

export class UpdateAccountOfUserUseCase implements UpdateAccountOfUserUseCaseInterface {
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  public async execute(request: UpdateAccountOfUserRequest): Promise<UpdateAccountOfUserResponse> {
    try {
        const account = await this.accountRepository.findById(request.getAccountIdVO());
        
        if (!account) {
          throw new AccountNotFoundError(request.getAccountId().toString());
        }

      const updatedAccount = await this.accountRepository.update(
        request.getAccountIdVO(),
        AccountEntity.create(
          request.getName().getValue(),
          request.getAccountType().getValue(),
          account.getBalance().getValue(),
          account.getUserId().getValue(),
          request.getBankName().getValue(),
        )
      );

      return UpdateAccountOfUserResponse.success(updatedAccount);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): UpdateAccountOfUserResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return UpdateAccountOfUserResponse.failure(message, []);
  }
}