import { type ExtendedSocket } from '../types'

export const ConnectionHandler = (socket: ExtendedSocket): void => {
  void socket.join(socket.userId)
  socket.on('disconnect', () => {
    void socket.leave(socket.userId)
  })
}
