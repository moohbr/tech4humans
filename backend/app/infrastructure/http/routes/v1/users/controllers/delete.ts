import { DeleteUserUseCaseInterface } from "@useCases/user/delete/interfaces";
import { DeleteUserRequest } from "@useCases/user/delete/request";
import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";
import { logger } from "@infrastructure/logger";

export class DeleteUserController extends BaseController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCaseInterface) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      if (!this.validateRequiredParam(userId, "User ID", res)) return;

      const request = DeleteUserRequest.createFromRaw({ id: userId });
      const response = await this.deleteUserUseCase.execute(request);

      if (response.isSuccess()) {
        this.sendSuccessResponse(res, response.getMessage());
        return;
      }

      if (response.hasErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error", { error: error.message });
        }
        throw response.getErrors()[0];
      }
    } catch (error) {
      this.handleControllerError(error, res, "DeleteUserController");
    }
  }
}
