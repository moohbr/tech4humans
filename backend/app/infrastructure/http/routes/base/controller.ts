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
    errors: string[] = [],
    statusCode: number = 422,
  ): void {
    logger.error("BaseController.sendErrorResponse", message);
    res.status(statusCode).json({
      message,
      errors,
    });
  }

  protected getErrorStatusCode(
    message: string,
    hasValidationErrors: boolean,
  ): number {
    if (hasValidationErrors) return 400;

    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("invalid credentials") ||
      lowerMessage.includes("authentication failed")
    ) {
      return 401;
    }

    if (
      lowerMessage.includes("unauthorized") ||
      lowerMessage.includes("permission") ||
      lowerMessage.includes("account locked") ||
      lowerMessage.includes("account disabled")
    ) {
      return 403;
    }

    if (lowerMessage.includes("not found")) {
      return 404;
    }

    if (
      lowerMessage.includes("already exists") ||
      lowerMessage.includes("duplicate")
    ) {
      return 409;
    }

    return 422;
  }

  protected handleControllerError(
    error: unknown,
    res: Response,
    controllerName: string,
  ): void {
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      }));
      res.status(400).json({
        success: false,
        message: "Invalid request format",
        errors,
      });
      return;
    }

    logger.error(`${controllerName} Error:`, error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
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
        [`${paramName} parameter is missing`],
        400,
      );
      return false;
    }
    return true;
  }
}
