import { Router } from 'express'
import { validate, errorWrapper } from '../utils'
import { LoginHandler, SignupHandler } from '../controllers/auth'
import { loginValidationSchema, signupValidationSchema } from '../validators'

export const authRouter = Router()

authRouter.post(
  '/login',
  validate(loginValidationSchema),
  errorWrapper(LoginHandler)
)

authRouter.post(
  '/signup',
  validate(signupValidationSchema),
  errorWrapper(SignupHandler)
)
