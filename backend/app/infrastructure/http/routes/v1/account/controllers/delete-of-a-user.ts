import { DeleteAccountOfUserUseCaseInterface } from "@useCases/account/delete-of-a-user/interfaces";
import { DeleteAccountOfUserRequest } from "@useCases/account/delete-of-a-user/request";
import { BaseController } from "../../../base/controller";
import { Request, Response } from "express";
import { logger } from "@infrastructure/logger";

export class DeleteAccountOfUserController extends BaseController {
  constructor(private readonly useCase: DeleteAccountOfUserUseCaseInterface) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request = DeleteAccountOfUserRequest.createFromRaw({
        params: {
          accountId: req.params.accountId,
        },
      });
      const response = await this.useCase.execute(request);

      if (response.isSuccess()) {
        this.sendSuccessResponse(res, "Account deleted successfully", null, 200);
        return;
      }

      if (response.hasErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error", { error: error.message });
        }
        throw response.getErrors()[0];
      }
    } catch (error) {
      this.handleControllerError(error, res, "DeleteAccountOfUserController");
    }
  }
}