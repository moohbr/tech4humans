import { ZodError } from "zod";
import { AddAccountToUserRequest } from "@useCases/account/add-to-a-user/request";
import { AddAccountToUserResponse } from "@useCases/account/add-to-a-user/response";
import { AddAccountToUserUseCaseInterface } from "@useCases/account/add-to-a-user/interfaces";
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { AccountEntity } from "@models/account/entity";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { UserNotFoundError } from "@errors/user/user-not-found-error";

export class AddAccountToUserUseCase
  implements AddAccountToUserUseCaseInterface
{
  constructor(
    private readonly accountRepository: AccountRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(
    request: AddAccountToUserRequest,
  ): Promise<AddAccountToUserResponse> {
    try {
      const userId = request.getUserIdVO();
      
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new UserNotFoundError(userId.getValue().toString());
      }
  
      const account = AccountEntity.create(
        request.getName().getValue(),
        request.getAccountTypeVO().getValue(),
        request.getInitialBalanceVO().getValue(),
        userId.getValue(),
        request.getBankNameVO().getValue(),
      );
  
      const savedAccount = await AppDataSource.transaction(async (manager) => {
        return await this.accountRepository.create(account, manager);
      });
  
      return AddAccountToUserResponse.success(savedAccount);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): AddAccountToUserResponse {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      return AddAccountToUserResponse.validationFailure(errors);
    }

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return AddAccountToUserResponse.failure(message, []);
  }
}
