import type { ExtendedError } from 'socket.io/dist/namespace'
import { verify } from 'jsonwebtoken'
import type { ExtendedSocket, TokenPayload } from '../types'
import type { Request, Response, NextFunction } from 'express'

export const verifySocketJwt = (
  socket: ExtendedSocket,
  next: (error?: ExtendedError) => void
): void => {
  const token = socket.handshake.auth.token ?? null
  if (token == null) {
    const error: ExtendedError = new Error(
      'an authentication error has occured'
    )
    error.data = 'Authentication token is required'
    next(error)
    return
  }
  verify(
    token,
    String(process.env.SECRET),
    (err: any, { id, username }: TokenPayload): void => {
      if (err != null) {
        const error: ExtendedError = new Error(
          'an authentication error has occured'
        )
        error.data = 'Invalid authentication token'
        next(error)
        return
      }
      socket.userId = id
      console.log(`${username} connected`)
      next()
    }
  )
}

export const verifyRESTJwt = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (authHeader == null) {
    res.status(401).json({ message: 'authorization token missing from request' })
    return
  }
  const accessToken = authHeader.split(' ')[1]
  verify(accessToken, String(process.env.SECRET), (err, user) => {
    if (err != null) {
      res.status(401).json({ message: err.message })
      return
    }
    const userPayload = user as TokenPayload
    res.locals.user = userPayload
    next()
  })
}
