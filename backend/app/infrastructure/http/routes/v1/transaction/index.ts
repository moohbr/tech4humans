import { Request, Response } from "express";
import { BaseRouter } from "@infrastructure/http/routes/base/router";
import { AddTransactionToUserController } from "@infrastructure/http/routes/v1/transaction/controllers/add-to-a-user";
import { QueryTransactionController } from "./controllers/query";


export class TransactionRouter extends BaseRouter {
  private static instance: TransactionRouter;

  static getInstance(): TransactionRouter {
    if (!TransactionRouter.instance) {
      TransactionRouter.instance = new TransactionRouter();
    }
    return TransactionRouter.instance;
  }

  protected setupRoutes(): void {
    this.setupAddTransactionToUserRoute();
    this.setupGetTransactionsRoute();
  }

  private setupAddTransactionToUserRoute(): void {
    this.router.post(
      "/from/:sourceAccountId/to/:destinationAccountId",
      this.handleAddTransactionToUser.bind(this)
    );
  }

  private setupGetTransactionsRoute(): void {
    this.router.get(
      "/user/:userId",
      this.handleGetTransactions.bind(this)
    );
  }

  private async handleAddTransactionToUser(
    req: Request<{ sourceAccountId: string, destinationAccountId: string }>,
    res: Response
  ): Promise<void> {
    const controller = this.container.get<AddTransactionToUserController>(
      "AddTransactionToUserController"
    );
    await controller.handle(req, res);
  }

  private async handleGetTransactions(
    req: Request<{ userId: string }>,
    res: Response
  ): Promise<void> {    
    const controller = this.container.get<QueryTransactionController>(
      "QueryTransactionController"
    );
    await controller.handle(req, res);
  }
}

export default TransactionRouter.getInstance;
