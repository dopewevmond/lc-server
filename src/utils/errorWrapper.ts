import type { RequestHandler, Request, Response, NextFunction } from 'express'

export const errorWrapper =
  (handler: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }
