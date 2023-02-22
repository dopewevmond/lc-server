import type { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import { NotFoundException, UserExistsException } from '../errors'
import HttpException from '../errors/httpexception'

export const GetUserByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const results = await User.findById(id, { passwordHash: 0 })
  if (results == null) {
    next(new NotFoundException('user', 'id', id))
    return
  }
  res.json(results)
}

export const EditProfileHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { bio, username, displayName } = req.body
  const currentUserId = res.locals.user.id
  if (currentUserId == null) {
    next(new HttpException(401, 'Unauthorized. Make sure you are logged in and try again'))
    return
  }
  const isDuplicateUsername = await User.findOne({ _id: { $ne: currentUserId }, username })
  if (isDuplicateUsername != null) {
    next(new UserExistsException(username))
    return
  }
  const currentUser = await User.findById(currentUserId, { passwordHash: 0 })
  if (currentUser == null) {
    next(new HttpException(400, 'User does not exist'))
    return
  }
  currentUser.bio = bio ?? currentUser.bio
  currentUser.username = username ?? currentUser.username
  currentUser.displayName = displayName ?? currentUser.displayName
  await currentUser.save()
  res.json(currentUser)
}
