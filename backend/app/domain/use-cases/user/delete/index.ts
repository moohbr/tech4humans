import { ZodError } from "zod";
import { DeleteUserRequest } from "@useCases/user/delete/request";
import { DeleteUserResponse } from "@useCases/user/delete/response";
import { DeleteUserUseCaseInterface } from "@useCases/user/delete/interfaces";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { AppDataSource } from "@infrastructure/datasources/databases/typeorm";
import { UserId } from "@models/user/value-objects/id";
import { UserNotFoundError } from "@errors/user/user-not-found-error";

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(
    request: DeleteUserRequest,
  ): Promise<DeleteUserResponse> {
    try {
      const userId = UserId.create(request.getId());

      await AppDataSource.transaction(async (manager) => {
        const transactionalUserRepo = this.userRepository.withTransaction(manager);

        const user = await transactionalUserRepo.findById(userId);
        if (!user) {
          throw new UserNotFoundError(userId.toString());
        }
        console.log("Deleting user", { user });

        await transactionalUserRepo.delete(userId);
      });

      return DeleteUserResponse.success();
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): DeleteUserResponse {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      return DeleteUserResponse.validationFailure(errors);
    }

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return DeleteUserResponse.failure("Houve um erro ao deletar o usuário", [message]);
  }
}
