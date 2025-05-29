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
      logger.info("Updating user", { request });

      const userId = UserId.create(request.getId());
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new UserNotFoundError(userId.toString());
      }

      const updatedUser = await this.userRepository.update(userId, UserEntity.create(
        request.getName() ?? user.getName().getValue(),
        request.getEmail() ?? user.getEmail().getValue(),
        request.getPassword() ?? user.getPasswordHash(),
      ));

      return UpdateUserResponse.success(updatedUser);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): UpdateUserResponse {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      return UpdateUserResponse.validationFailure(errors);
    }
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return UpdateUserResponse.failure("Houve um erro ao atualizar o usuário", [message]);
  }
}
