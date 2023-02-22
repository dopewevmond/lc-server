import { Router } from 'express'
import { SearchUsersHandler } from '../controllers/search'
import { validate, errorWrapper } from '../utils'
import { searchValidationSchema } from '../validators'
import { verifyRESTJwt } from '../middleware'

export const searchRouter = Router()

searchRouter.use(verifyRESTJwt)

searchRouter.post(
  '/users',
  validate(searchValidationSchema),
  errorWrapper(SearchUsersHandler)
)
