import { DIContainer } from "@infrastructure/di/container";
import { errorHandler } from "@infrastructure/http/middlewares";
import { Router } from "express";
import { RouterFactory } from "@infrastructure/http/routes/factory";

export abstract class BaseRouter {
  protected readonly router: Router;
  protected readonly container: DIContainer;

  constructor() {
    this.container = DIContainer.getInstance();
    this.router = RouterFactory.createStandardRouter();
    this.setupMiddleware();
    this.setupRoutes();
  }

  protected setupMiddleware(): void {
    this.router.use(errorHandler);
  }

  protected abstract setupRoutes(): void;

  public getRouter(): Router {
    return this.router;
  }
}
