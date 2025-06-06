import { ZodError } from "zod";
import { UpdateUserRequest } from "@useCases/user/update/request";
import { UpdateUserResponse } from "@useCases/user/update/response";
import { UpdateUserUseCaseInterface } from "@useCases/user/update/interfaces";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { UserId } from "@models/user/value-objects/id";
import { UserEntity } from "@models/user/entity";
import { UserNotFoundError } from "@errors/user/user-not-found-error";
import { logger } from "@infrastructure/logger";

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(
    request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    try {
      const userId = UserId.create(request.getId());
      logger.info("Starting user update process", { 
        userId: userId.getValue(),
        hasNameUpdate: request.getName() !== null,
        hasEmailUpdate: request.getEmail() !== null,
        hasPasswordUpdate: request.getPassword() !== null
      });

      logger.debug("Fetching existing user");
      const user = await this.userRepository.findById(userId);
      if (!user) {
        const error = new UserNotFoundError(userId.toString());
        logger.error("User not found during update", {
          userId: userId.getValue(),
          error: error.message
        });
        throw error;
      }

      logger.debug("Creating updated user entity", {
        userId: userId.getValue(),
        updatedFields: {
          name: request.getName() !== null,
          email: request.getEmail() !== null,
          password: request.getPassword() !== null
        }
      });

      const updatedUser = await this.userRepository.update(
        userId, 
        UserEntity.create(
          request.getName() ?? user.getName().getValue(),
          request.getEmail() ?? user.getEmail().getValue(),
          request.getPassword() ?? user.getPasswordHash(),
        )
      );

      logger.info("User updated successfully", {
        userId: updatedUser.getId().getValue(),
        email: updatedUser.getEmail().getValue()
      });

      return UpdateUserResponse.success(updatedUser);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }

      logger.error("Unexpected error during user update", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        userId: request.getId()
      });

      return this.handleError(error);
    }
  }

  private handleError(error: unknown): UpdateUserResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return UpdateUserResponse.failure("Houve um erro ao atualizar o usuário", errors);
  }
}
