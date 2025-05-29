import { UpdateAccountOfUserUseCaseInterface } from "@useCases/account/update-of-a-user/interfaces";
import { UpdateAccountOfUserRequest } from "@useCases/account/update-of-a-user/request";
import { BaseController } from "../../../base/controller";
import { Request, Response } from "express";

export class UpdateAccountOfUserController extends BaseController {
  constructor(private readonly useCase: UpdateAccountOfUserUseCaseInterface) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request = UpdateAccountOfUserRequest.createFromRaw({
        params: {
          accountId: req.params.accountId,
        },
        body: req.body,
      });

      const response = await this.useCase.execute(request);

      if (response.isSuccess()) {
        this.sendSuccessResponse(res, "Account updated successfully", response.getData(), 200);
        return;
      }

      const statusCode = this.getErrorStatusCode("UpdateAccount", !!response.getValidationErrors());
      this.sendErrorResponse(res, response.getError() || "Failed to update account", response.getValidationErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "UpdateAccountOfUserController");
    }
  }
}