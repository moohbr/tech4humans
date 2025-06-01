import { CreateUserUseCaseInterface } from "@useCases/user/create/interfaces";
import { CreateUserRequest } from "@useCases/user/create/request";
import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";
import { logger } from "@infrastructure/logger";

export class CreateUserController extends BaseController {
  constructor(private readonly createUserUseCase: CreateUserUseCaseInterface) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request = CreateUserRequest.createFromRaw({
        ...req.body,
      });
      const response = await this.createUserUseCase.execute(request);
      if (response.isSuccess()) {
        const user = response.getUser();
        this.sendSuccessResponse(
          res,
          response.getMessage(),
          user.toJSON(),
          201,
        );
        return;
      }

      if (response.hasErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error", { error: error.message });
        }
        throw response.getErrors()[0];
      }
    } catch (error) {
      this.handleControllerError(error, res, "CreateUserController");
    }
  }
}
