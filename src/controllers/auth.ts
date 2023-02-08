import type { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { User } from '../models'
import { WrongCredentialsException, UserExistsException } from '../errors'
import type { TokenPayload } from '../types'

export const LoginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user == null) {
    next(new WrongCredentialsException()); return
  }
  const passwordsMatch = await bcrypt.compare(password, user.passwordHash)
  if (!passwordsMatch) {
    next(new WrongCredentialsException()); return
  }
  const tokenPayload: TokenPayload = { username, id: String(user._id) }
  const token = jwt.sign(tokenPayload, String(process.env.SECRET))
  res.json({ token })
}

export const SignupHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, displayName } = req.body
  const existingUsername = await User.exists({ username })
  if (existingUsername != null) {
    next(new UserExistsException(username)); return
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ username, passwordHash, displayName })
  const { _id } = await user.save()
  const tokenPayload: TokenPayload = { username, id: String(_id) }
  const token = jwt.sign(tokenPayload, String(process.env.SECRET))
  res.status(201).json({ token })
}
