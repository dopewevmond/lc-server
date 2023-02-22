import type { Request, Response } from 'express'
import { User } from '../models'

export const SearchUsersHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { query } = req.body
  const currentUser = res.locals.user.id
  const results = await User.find({
    _id: { $ne: currentUser },
    $or: [
      { username: { $regex: query, $options: 'i' } },
      { displayName: { $regex: query, $options: 'i' } }
    ]
  }, { passwordHash: 0 })
  res.json(results)
}
