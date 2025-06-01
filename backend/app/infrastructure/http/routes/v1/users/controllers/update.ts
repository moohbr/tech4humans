import { BaseController } from "@infrastructure/http/routes/base/controller";
import { UpdateUserUseCaseInterface } from "@useCases/user/update/interfaces";
import { UpdateUserRequest } from "@useCases/user/update/request";
import { Request, Response } from "express";
import { logger } from "@infrastructure/logger";

export class UpdateUserController extends BaseController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCaseInterface) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      const request = UpdateUserRequest.createFromRaw({
        params: {
          id: userId,
        },
        body: req.body,
      });
      const response = await this.updateUserUseCase.execute(request);

      if (response.isSuccess()) {
        const user = response.getUser();
        this.sendSuccessResponse(res, response.getMessage(), user.toJSON());
        return;
      }

      if (response.hasErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error", { error: error.message });
        }
        throw response.getErrors()[0];
      }     
    } catch (error) {
      this.handleControllerError(error, res, "UpdateUserController");
    }
  }
}
