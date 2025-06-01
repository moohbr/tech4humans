import { Request, Response } from "express";
import { AddAccountToUserUseCaseInterface } from "@useCases/account/add-to-a-user/interfaces";
import { AddAccountToUserRequest } from "@useCases/account/add-to-a-user/request";
import { BaseController } from "@infrastructure/http/routes/base/controller";
import { AccountNotFoundError } from "app/domain/errors/account/account-not-found-error";
import { logger } from "@infrastructure/logger";

export class AddAccountToUserController extends BaseController {
  constructor(private readonly useCase: AddAccountToUserUseCaseInterface) {
    super();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const request = AddAccountToUserRequest.createFromRaw({
        params: {
          userId: req.params.userId,
        },
        body: req.body,
      });
      const response = await this.useCase.execute(request);

      if (response.isSuccess()) {
        const account = response.getData();
        if (!account) {
          throw new AccountNotFoundError("Account not created");
        }
        this.sendSuccessResponse(
          res,
          "Account created successfully",
          account.toJSON(),
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
      this.handleControllerError(error, res, "AddAccountToUserController");
    }
  }
}