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
  verifyJwt
} from './middleware'
import { authRouter } from './routers'
import { ConnectionHandler } from './controllers/chat'
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.get('/', healthCheck)
app.use('/auth', authRouter)
app.use(ErrorHandler)
app.use(NotFoundHandler)

const httpServer = createServer(app)
const io = new Server(httpServer)
const port = process.env.PORT ?? 3000

io.use(verifyJwt)
io.on('connection', ConnectionHandler)

// setInterval(() => {
//   console.log(io.sockets.adapter.rooms)
// }, 10000)

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
