import { DomainError } from "@domain/errors/domain-error";
import { ValidationError } from "@domain/errors/validation-error";
import { logger } from "@infrastructure/logger";
import { Response } from "express";
import { ZodError } from "zod";

export abstract class BaseController {
  protected sendSuccessResponse(
    res: Response,
    message: string,
    data?: unknown,
    statusCode: number = 200,
  ): void {
    const response: any = {
      message,
    };

    if (data !== undefined) {
      response.data = data;
    }

    res.status(statusCode).json(response);
  }

  protected sendErrorResponse(
    res: Response,
    message: string,
    errors: Error[] = [],
    statusCode: number = 422,
  ): void {
    logger.error(this.constructor.name, { message, errors, statusCode });
    res.status(statusCode).json({
      message,
      errors,
    });
  }

  protected handleControllerError(
    error: unknown,
    res: Response,
    controllerName: string,
  ): void {
    logger.info("Error type", { error: error instanceof Error ? error.constructor.name : "Unknown error" });
    if (error instanceof ZodError) {
      logger.info("ZodError", { error: error.message });
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      }));
      this.sendErrorResponse(
        res,
        "Invalid request format",
        errors.map((err) => new ValidationError(err.message, [err.code.toString()])),
        ValidationError.prototype.getStatusCode(),
      );
      return;
    }

    if (error instanceof DomainError) {
      logger.info("DomainError", { error: error.message, statusCode: error.getStatusCode() });
      this.sendErrorResponse(
        res,
        error.message,
        [error],
        error.getStatusCode(),
      );
      return;
    }


    logger.error(`${controllerName} Error:`, error);
    this.sendErrorResponse(
      res,
      error instanceof Error ? error.message : "Internal server error",
      [error as Error],
      500,
    );
    return;
  }

  protected validateRequiredParam(
    param: string | undefined,
    paramName: string,
    res: Response,
  ): boolean {
    if (!param) {
      this.sendErrorResponse(
        res,
        `${paramName} is required`,
        [new ValidationError(`${paramName} parameter is missing`)],
        422,
      );
      return false;
    }
    return true;
  }
}
