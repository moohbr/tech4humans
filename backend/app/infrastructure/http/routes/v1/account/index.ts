import { Request, Response } from "express";
import { BaseRouter } from "../../base/router";
import { AddAccountToUserController } from "./controllers/add-to-a-user";
import { DeleteAccountOfUserController } from "./controllers/delete-of-a-user";
import { UpdateAccountOfUserController } from "./controllers/update-of-a-user";
import { GetAllAccountsOfUserController } from "./controllers/get-all-of-user";  

export class AccountRouter extends BaseRouter {
  private static instance: AccountRouter;

  static getInstance(): AccountRouter {
    if (!AccountRouter.instance) {
      AccountRouter.instance = new AccountRouter();
    }
    return AccountRouter.instance;
  }

  protected setupRoutes(): void {
    this.setupAddAccountToUserRoute();
    this.setupDeleteAccountOfUserRoute();
    this.setupUpdateAccountOfUserRoute();
    this.setupGetAllAccountsOfUserRoute();
  }

  private setupAddAccountToUserRoute(): void {
    this.router.post(
      "/user/:userId",
      this.handleCreateUser.bind(this),
    );
  }

    private setupDeleteAccountOfUserRoute(): void {
    this.router.delete(
        "/:accountId",
      this.handleDeleteUser.bind(this),
    );
  }

  private setupGetAllAccountsOfUserRoute(): void {
    this.router.get('/user/:userId', this.handleGetAllAccountsOfUser.bind(this));
  }

  private setupUpdateAccountOfUserRoute(): void {  
    this.router.patch("/:accountId", this.handleUpdateUser.bind(this));
  }
            
  private async handleCreateUser(req: Request, res: Response): Promise<void> {
    const controller = this.container.get<AddAccountToUserController>(
      "AddAccountToUserController",
    );
    await controller.handle(req, res);
  }

  private async handleDeleteUser(
    req: Request<{ accountId: string }>,
    res: Response,
  ): Promise<void> {
    const controller = this.container.get<DeleteAccountOfUserController>(
      "DeleteAccountOfUserController",
    );  
    await controller.handle(req, res);
  }

  private async handleUpdateUser(
    req: Request<{ accountId: string }>,
    res: Response,
  ): Promise<void> {
    const controller = this.container.get<UpdateAccountOfUserController>(
      "UpdateAccountOfUserController",
    );
    await controller.handle(req, res);
  }

private async handleGetAllAccountsOfUser(
    req: Request<{ userId: string }>,
    res: Response,
  ): Promise<void> {
    const controller = this.container.get<GetAllAccountsOfUserController>(
      "GetAllAccountsOfUserController",
    );
    await controller.handle(req, res);
  }
}

export default AccountRouter.getInstance;
