import type { RequestHandler, Request, Response, NextFunction } from 'express'

export const errorWrapper =
  (handler: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    await Promise.resolve(handler(req, res, next)).catch(next)
  }
