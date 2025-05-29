import { Request, Response } from "express";
import { BaseRouter } from "@infrastructure/http/routes/base/router";
import { CreateUserController } from "@infrastructure/http/routes/v1/users/controllers/create";
import { DeleteUserController } from "@infrastructure/http/routes/v1/users/controllers/delete";
import { UpdateUserController } from "@infrastructure/http/routes/v1/users/controllers/update";
import { LoginController } from "@infrastructure/http/routes/v1/users/controllers/login";
import { DeleteUserSchemas } from "@useCases/user/delete/schemas";


export class UserRouter extends BaseRouter {
  private static instance: UserRouter;

  static getInstance(): UserRouter {
    if (!UserRouter.instance) {
      UserRouter.instance = new UserRouter();
    }
    return UserRouter.instance;
  }

  protected setupRoutes(): void {
    this.setupCreateUserRoute();
    this.setupUpdateUserRoute();
    this.setupDeleteUserRoute();
    this.setupLoginRoute();
  }

  private setupCreateUserRoute(): void {
    this.router.post(
      "/",
      this.handleCreateUser.bind(this),
    );
  }

  private setupDeleteUserRoute(): void {
    this.router.delete(
      "/:id",
      this.handleDeleteUser.bind(this),
    );
  }

  private setupUpdateUserRoute(): void {
    this.router.patch("/:id", this.handleUpdateUser.bind(this));
  }

  private setupLoginRoute(): void {
    this.router.post("/login",  this.handleLoginUser.bind(this));
  }

  private async handleCreateUser(req: Request, res: Response): Promise<void> {
    const controller = this.container.get<CreateUserController>(
      "CreateUserController",
    );
    await controller.handle(req, res);
  }

  private async handleDeleteUser(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> {
    const controller = this.container.get<DeleteUserController>(
      "DeleteUserController",
    );
    await controller.handle(req, res);
  }

  private async handleLoginUser(req: Request, res: Response): Promise<void> {
    const controller = this.container.get<LoginController>("LoginController");
    await controller.handle(req, res);
  }

  private async handleUpdateUser(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> {
    const controller = this.container.get<UpdateUserController>(
      "UpdateUserController",
    );
    await controller.handle(req, res);
  }
}

export default UserRouter.getInstance;
