import { BaseRouter } from "@infrastructure/http/routes/base/router";
import { GetAllBanksController } from "@infrastructure/http/routes/v1/banks/controllers/get-all-banks";
import { Request, Response } from "express";

export class BankRouter extends BaseRouter {
  private static instance: BankRouter;

  static getInstance(): BankRouter {
    if (!BankRouter.instance) {
      BankRouter.instance = new BankRouter();
    }
    return BankRouter.instance;
  }

  protected setupRoutes(): void {
    this.router.get('/', this.handleGetAllBanks.bind(this));
  }

  private async handleGetAllBanks(req: Request, res: Response): Promise<void> {
    const controller = this.container.get<GetAllBanksController>("GetAllBanksController");
    await controller.handle(req, res);
  }
}