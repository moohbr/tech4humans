import { GetAllAccountsOfUserUseCaseInterface } from "@useCases/account/get-all-of-user/interfaces";
import { GetAllAccountsOfUserRequest } from "@useCases/account/get-all-of-user/request";
import { BaseController } from "../../../base/controller";
import { Request, Response } from "express";
import { logger } from "@infrastructure/logger";

export class GetAllAccountsOfUserController extends BaseController {
  constructor(private readonly useCase: GetAllAccountsOfUserUseCaseInterface) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      const request = GetAllAccountsOfUserRequest.createFromRaw({
        params: {
          userId,
        },
      });
      const response = await this.useCase.execute(request);

      if (response.isSuccess()) {
        this.sendSuccessResponse(res, "Accounts retrieved successfully", response.getData(), 200);
        return;
      }

      if (response.hasErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error", { error: error.message });
        }
        throw response.getErrors()[0];
      }
    } catch (error) {
      this.handleControllerError(error, res, "GetAllAccountsOfUserController");
    }
  }
}