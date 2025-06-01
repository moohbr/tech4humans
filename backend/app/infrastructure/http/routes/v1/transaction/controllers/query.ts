import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";
import { QueryTransactionUseCaseInterface } from "@useCases/transaction/query/interfaces";
import { QueryTransactionRequest } from "@useCases/transaction/query/request";
import { logger } from "@infrastructure/logger";
import { QueryTransactionSchemas } from "@useCases/transaction/query/schemas";

export class QueryTransactionController extends BaseController {
  constructor(
    private readonly queryTransactionUseCase: QueryTransactionUseCaseInterface,
  ) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request = QueryTransactionRequest.createFromRaw({
        userId: req.params.userId,
        accountId: req.query.accountId,
        date: req.query.date,
        orderBy: req.query.orderBy,
        orderByField: req.query.orderByField,
        page: req.query.page,
        limit: req.query.limit,
      });

      const response = await this.queryTransactionUseCase.execute(request);

      if (response.isSuccess()) {
        this.sendSuccessResponse(
          res,
          response.getMessage(),
          response.getTransactions().map((t) => t.toJSON()),
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
      this.handleControllerError(error, res, "QueryTransactionController");
    }
  }
}
