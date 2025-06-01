import { LoginUseCaseInterface } from "@useCases/user/login/interfaces";
import { LoginRequest } from "@useCases/user/login/request";
import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";
import { logger } from "@infrastructure/logger";

export class LoginController extends BaseController {
  constructor(private readonly loginUseCase: LoginUseCaseInterface) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request = LoginRequest.createFromRaw(req.body);
      const response = await this.loginUseCase.execute(request);

      if (response.isSuccess()) {
        const authResult = response.getAuthResult();
        this.sendSuccessResponse(res, response.getMessage(), authResult);
        return;
      }

      if (response.hasErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error" , { error: error.message });
        }
        throw response.getErrors()[0];
      }
    } catch (error) {
      this.handleControllerError(error, res, "LoginController");
    }
  }
}
