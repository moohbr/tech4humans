import { DeleteUserRequest } from "@useCases/user/delete/request";
import { DeleteUserResponse } from "@useCases/user/delete/response";
import { DeleteUserUseCaseInterface } from "@useCases/user/delete/interfaces";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { UserId } from "@models/user/value-objects/id";
import { UserNotFoundError } from "@errors/user/user-not-found-error";
import { logger } from "@infrastructure/logger";

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(
    request: DeleteUserRequest,
  ): Promise<DeleteUserResponse> {
    try {
      const userId = UserId.create(request.getId());
      logger.info("Starting user deletion process", {
        userId: userId.getValue()
      });

      logger.debug("Verifying user existence");
      const user = await this.userRepository.findById(userId);
      if (!user) {
        const error = new UserNotFoundError(userId.toString());
        logger.error("User not found during deletion", {
          userId: userId.getValue(),
          error: error.message
        });
        throw error;
      }

      logger.debug("Deleting user", {
        userId: userId.getValue(),
        email: user.getEmail().getValue()
      });

      await this.userRepository.delete(userId);

      logger.info("User deleted successfully", {
        userId: userId.getValue(),
        email: user.getEmail().getValue()
      });

      return DeleteUserResponse.success();
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): DeleteUserResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return DeleteUserResponse.failure("Houve um erro ao deletar o usuário", errors);
  }
}
