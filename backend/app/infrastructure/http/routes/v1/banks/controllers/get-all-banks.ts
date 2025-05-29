import { Request, Response } from "express";
import { BaseController } from "@infrastructure/http/routes/base/controller";
import { GetAllBanksUseCaseInterface } from "@useCases/banks/get-all/interfaces";

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
    const statusCode = this.getErrorStatusCode(
      response.getMessage(),
      response.hasErrors(),
    );
    this.sendErrorResponse(
      res,
      response.getMessage(),
      response.getErrors(),
        statusCode,
      );
    } catch (error) {
      this.handleControllerError(error, res, "GetAllBanksController");
    }
  }
}   