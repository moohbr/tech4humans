import { DeleteAccountOfUserUseCaseInterface } from "@useCases/account/delete-of-a-user/interfaces";
import { DeleteAccountOfUserRequest } from "@useCases/account/delete-of-a-user/request";
import { BaseController } from "../../../base/controller";
import { Request, Response } from "express";

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

      const statusCode = this.getErrorStatusCode("DeleteAccount", !!response.getValidationErrors());
      this.sendErrorResponse(res, response.getError() || "Failed to delete account", response.getValidationErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "DeleteAccountOfUserController");
    }
  }
}