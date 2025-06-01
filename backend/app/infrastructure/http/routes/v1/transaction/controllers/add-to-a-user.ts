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

      if (response.hasErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error", { error: error.message });
        }
        throw response.getErrors()[0];
      }
    } catch (error) {
      this.handleControllerError(error, res, "AddTransactionToUserController");
    }
  }
}