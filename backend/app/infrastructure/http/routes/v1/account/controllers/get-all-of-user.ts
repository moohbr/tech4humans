import { GetAllAccountsOfUserUseCaseInterface } from "@useCases/account/get-all-of-user/interfaces";
import { GetAllAccountsOfUserRequest } from "@useCases/account/get-all-of-user/request";
import { BaseController } from "../../../base/controller";
import { Request, Response } from "express";

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

      const statusCode = this.getErrorStatusCode("GetAllAccountsOfUser", !!response.getValidationErrors());
      this.sendErrorResponse(res, response.getError() || "Failed to retrieve accounts", response.getValidationErrors(), statusCode);
    } catch (error) {
      this.handleControllerError(error, res, "GetAllAccountsOfUserController");
    }
  }
}