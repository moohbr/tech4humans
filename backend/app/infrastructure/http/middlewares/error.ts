import { logger } from '@infrastructure/logger'
import { NextFunction, Request, Response } from 'express'
import zod from 'zod'


export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof zod.ZodError) {
    logger.http(err.message)
    res.status(404).json({
      error: 'Invalid input. Please check your request body. ' + err.message,
    })
    return
  }

  logger.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
  next(err)
}

