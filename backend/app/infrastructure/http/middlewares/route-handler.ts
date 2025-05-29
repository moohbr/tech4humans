import { Request, Response, NextFunction } from "express";

export type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
export type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export class RouteHandlerMiddleware {
  static asyncHandler(handler: AsyncRouteHandler) {
    return (req: Request, res: Response, next: NextFunction): void => {
      Promise.resolve(handler(req, res, next)).catch(next);
    };
  }

  static syncHandler(handler: RouteHandler) {
    return handler;
  }
}
