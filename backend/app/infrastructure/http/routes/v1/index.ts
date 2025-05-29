import { BaseRouter } from "@infrastructure/http/routes/base/router";
import { UserRouter } from "@infrastructure/http/routes/v1/users";
import { AccountRouter } from "@infrastructure/http/routes/v1/account";
import { TransactionRouter } from "@infrastructure/http/routes/v1/transaction";
import { BankRouter } from "@infrastructure/http/routes/v1/banks";

export class V1Router extends BaseRouter {
  private static instance: V1Router;

  static getInstance(): V1Router {
    if (!V1Router.instance) {
      V1Router.instance = new V1Router();
    }
    return V1Router.instance;
  }

  private constructor() {
    super();
  }

  protected setupRoutes(): void {
    this.setupUserRoutes();
    this.setupBankRoutes();
    this.setupAccountRoutes();
    this.setupTransactionRoutes();
  }

  private setupUserRoutes(): void {
    this.router.use("/users", new UserRouter().getRouter());
  }

  private setupBankRoutes(): void {
    this.router.use('/banks', new BankRouter().getRouter());
  }

  private setupAccountRoutes(): void {
    this.router.use('/accounts', new AccountRouter().getRouter());
  }

  private setupTransactionRoutes(): void {
    this.router.use('/transactions', new TransactionRouter().getRouter());
  }
}
