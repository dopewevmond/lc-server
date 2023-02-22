import { Router } from 'express'
import { validate, errorWrapper } from '../utils'
import { EditProfileValidationSchema, getUserByIdValidationSchema } from '../validators'
import { verifyRESTJwt } from '../middleware'
import { EditProfileHandler, GetUserByIdHandler } from '../controllers/users'

export const userRouter = Router()

userRouter.use(verifyRESTJwt)

userRouter.get(
  '/:id',
  validate(getUserByIdValidationSchema),
  errorWrapper(GetUserByIdHandler)
)

userRouter.patch('/edit-profile', validate(EditProfileValidationSchema), errorWrapper(EditProfileHandler))
