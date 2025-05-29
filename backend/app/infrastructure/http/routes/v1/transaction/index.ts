import { Request, Response } from "express";
import { BaseRouter } from "@infrastructure/http/routes/base/router";
import { GetAllTransactionsOfUserController } from "@infrastructure/http/routes/v1/transaction/controllers/get-all-of-user";
import { AddTransactionToUserController } from "@infrastructure/http/routes/v1/transaction/controllers/add-to-a-user";

export class TransactionRouter extends BaseRouter {
  private static instance: TransactionRouter;

  static getInstance(): TransactionRouter {
    if (!TransactionRouter.instance) {
      TransactionRouter.instance = new TransactionRouter();
    }
    return TransactionRouter.instance;
  }

  protected setupRoutes(): void {
    this.setupGetAllTransactionsOfUserRoute();
    this.setupAddTransactionToUserRoute();
  }

  private setupAddTransactionToUserRoute(): void {
    this.router.post(
      "/from/:sourceAccountId/to/:destinationAccountId",
      this.handleAddTransactionToUser.bind(this)
    );
  }
  private setupGetAllTransactionsOfUserRoute(): void {
    this.router.get(
      "/user/:userId",
      this.handleGetAllTransactionsOfUser.bind(this)
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

  private async handleGetAllTransactionsOfUser(
    req: Request<{ userId: string }>,
    res: Response
  ): Promise<void> {
    const controller = this.container.get<GetAllTransactionsOfUserController>(
      "GetAllTransactionsOfUserController"
    );
    await controller.handle(req, res);
  }
}

export default TransactionRouter.getInstance;
