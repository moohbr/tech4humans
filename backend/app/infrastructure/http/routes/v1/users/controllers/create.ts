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
      logger.info("Creating user", { body: req.body });
      const request = CreateUserRequest.createFromRaw({
        ...req.body,
      });
      logger.info("Request created", { request });
      const response = await this.createUserUseCase.execute(request);
      logger.info("Response", { response });
      if (response.isSuccess()) {
        logger.info("Response is success", { response });
        const user = response.getUser();
        logger.info("User", { user });
        this.sendSuccessResponse(
          res,
          response.getMessage(),
          user.toJSON(),
          201,
        );
        return;
      }

      logger.info("Response is not success", { response });
      const statusCode = this.getErrorStatusCode(
        response.getMessage(),
        response.hasErrors(),
      );
      logger.info("Status code", { statusCode });
      this.sendErrorResponse(
        res,
        response.getMessage(),
        response.getErrors(),
        statusCode,
      );
    } catch (error) {
      this.handleControllerError(error, res, "CreateUserController");
    }
  }
}
