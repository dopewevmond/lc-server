import HttpException from './httpexception'

export class WrongCredentialsException extends HttpException {
  constructor () {
    super(401, 'Wrong username or password')
  }
}
