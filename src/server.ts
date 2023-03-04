import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as morgan from 'morgan'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {
  ErrorHandler,
  healthCheck,
  NotFoundHandler,
  verifySocketJwt
} from './middleware'
import { authRouter, searchRouter } from './routers'
import { type ExtendedSocket } from './types'
import { userRouter } from './routers/userRouter'
// import { Message } from './models/Message'
require('dotenv').config()

interface IMessage {
  message: string
  recipientId: string
  senderId: string
}

// const saveMessage = async (message: IMessage): Promise<void> => {
//   const newMessage = new Message(message)
//   await newMessage.save()
// }

const app = express()
app.use(cors())
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.get('/', healthCheck)
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/search', searchRouter)
app.use(ErrorHandler)
app.use(NotFoundHandler)

const httpServer = createServer(app)
const io = new Server(httpServer)
const port = process.env.PORT ?? 3000

io.use(verifySocketJwt)
io.on('connection', (socket: ExtendedSocket) => {
  void socket.join(socket.userId)

  socket.on('sendMessage', (messageObj: IMessage) => {
    const timestamp = new Date().toISOString()
    const msg = { ...messageObj, timestamp }
    io.to(messageObj.recipientId).emit('receiveMessage', msg)
    // persist to database
    // void saveMessage(msg)
  })

  socket.on('disconnect', () => {
    void socket.leave(socket.userId)
  })
})

// setInterval(() => {
// // send a message to just one connected client
//   console.log('emitted message')
//   io.to('63e3c50d0daad40afb1bf054').emit('receiveMessage', { message: 'just testing out stuff' })
// }, 10000)

mongoose.set('strictQuery', false)
mongoose
  .connect(String(process.env.MONGO_URI))
  .then(() => {
    console.log('connected to database')
    // start listening on server only after successful database connection
    httpServer.emit('ready')
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

httpServer.on('ready', () => {
  httpServer.listen(port, () => {
    console.log(`http server is running on port ${port}`)
  })
})
