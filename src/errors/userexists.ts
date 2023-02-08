import HttpException from './httpexception'

export class UserExistsException extends HttpException {
  constructor (username: string) {
    super(400, `A user already exists with username ${username}`)
  }
}
