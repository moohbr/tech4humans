import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";
import { GetAllOfUserUseCaseInterface } from "@useCases/transaction/get-all-of-user/interfaces";
import { GetAllOfUserRequest } from "@useCases/transaction/get-all-of-user/request";

export class GetAllTransactionsOfUserController extends BaseController {
  constructor(
    private readonly getAllOfUserUseCase: GetAllOfUserUseCaseInterface,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      if (!this.validateRequiredParam(userId, "User ID", res)) return;

      const request = GetAllOfUserRequest.createFromRaw({
        userId,
      });

      const response = await this.getAllOfUserUseCase.execute(request);

      if (response.isSuccess()) {
        this.sendSuccessResponse(
          res,
          response.getMessage(),
          response.getTransactions().map((t) => t.toJSON()),
        );
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
      this.handleControllerError(error, res, "GetAllTransactionsOfUserController");
    }
  }
}