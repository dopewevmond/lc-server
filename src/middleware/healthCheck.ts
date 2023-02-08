import type { Request, Response } from 'express'

export const healthCheck = (_req: Request, res: Response): void => {
  res.send('Health check. App is working')
}
