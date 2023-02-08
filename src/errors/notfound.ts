import HttpException from './httpexception'

export class NotFoundException extends HttpException {
  constructor (entity: string, idType: string, id: string) {
    super(404, `${entity[0].toUpperCase()}${entity.slice(1)} with ${idType} ${id} was not found`)
  }
}
