import type { ExtendedError } from 'socket.io/dist/namespace'
import { verify } from 'jsonwebtoken'
import type { ExtendedSocket, TokenPayload } from '../types'

export const verifyJwt = (
  socket: ExtendedSocket,
  next: (error?: ExtendedError) => void
): void => {
  const token = socket.handshake.auth.token ?? null
  if (token == null) {
    const error: ExtendedError = new Error('an authentication error has occured')
    error.data = 'Authentication token is required'
    next(error)
  } else {
    verify(token, String(process.env.SECRET), (err: any, payload: TokenPayload): void => {
      if (err instanceof Error) {
        const error: ExtendedError = new Error('an authentication error has occured')
        error.data = 'Invalid authentication token'
        next(error); return
      }
      socket.userId = payload.id
      next()
    }
    )
  }
}
