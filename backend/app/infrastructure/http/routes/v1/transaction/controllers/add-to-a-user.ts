import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";
import { AddTransactionToUserUseCaseInterface } from "@useCases/transaction/add-to-a-user/interfaces";
import { AddTransactionToUserRequest } from "@useCases/transaction/add-to-a-user/request";
import { logger } from "@infrastructure/logger";

export class AddTransactionToUserController extends BaseController {
  constructor(
    private readonly addTransactionToUserUseCase: AddTransactionToUserUseCaseInterface,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request = AddTransactionToUserRequest.createFromRaw({
        params: {
          sourceAccountId: req.params.sourceAccountId,
          destinationAccountId: req.params.destinationAccountId,
        },
        body: req.body,
      });
      logger.info("Request", { request });

      const response = await this.addTransactionToUserUseCase.execute(request);

      if (response.isSuccess()) {
        const transaction = response.getTransaction();
        this.sendSuccessResponse(
          res,
          response.getMessage(),
          transaction.toJSON(),
          201,
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
      this.handleControllerError(error, res, "AddTransactionToUserController");
    }
  }
}