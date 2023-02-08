import type { Socket } from 'socket.io'
import type { JwtPayload } from 'jsonwebtoken'

export type ExtendedSocket = Socket & { userId: string }
export type TokenPayload = JwtPayload & { username: string, id: string }
