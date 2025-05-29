import { DeleteUserUseCaseInterface } from "@useCases/user/delete/interfaces";
import { DeleteUserRequest } from "@useCases/user/delete/request";
import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";

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

      const statusCode = this.getErrorStatusCode(
        response.getMessage(),
        response.hasErrors(),
      );
      this.sendErrorResponse(
        res,
        response.getMessage(),
        response.getErrors(),
        statusCode,
      );
    } catch (error) {
      this.handleControllerError(error, res, "DeleteUserController");
    }
  }
}
