import { LoginUseCaseInterface } from "@useCases/user/login/interfaces";
import { LoginRequest } from "@useCases/user/login/request";
import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";

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
      this.handleControllerError(error, res, "LoginController");
    }
  }
}
