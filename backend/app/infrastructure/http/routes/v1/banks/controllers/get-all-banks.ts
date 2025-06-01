import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";
import { GetAllBanksUseCaseInterface } from "@useCases/banks/get-all/interfaces";
import { logger } from "@infrastructure/logger";

export class GetAllBanksController extends BaseController {
  constructor(private readonly getAllBanksUseCase: GetAllBanksUseCaseInterface) {
    super();
  }

  async handle(_req: Request, res: Response): Promise<void> {
    try {
      const response = await this.getAllBanksUseCase.execute();

      if (response.isSuccess()) {
        this.sendSuccessResponse(
          res,
          response.getMessage(),
          response.getBanks(),
          200,
        );
        return;
      }

      if (response.hasErrors()) {
        for (const error of response.getErrors()) {
          logger.error("Error", { error: error.message });
        }
        throw response.getErrors()[0];;
      }

    } catch (error) {
      this.handleControllerError(error, res, "GetAllBanksController");
    }
  }
}   