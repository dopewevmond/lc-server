import mongoose from 'mongoose'
const { Schema, model } = mongoose

const messageSchema = new Schema({
  message: { type: String, required: true },
  senderId: { type: String, required: true },
  recipientId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  delivered: { type: Boolean, default: false }
})

export const Message = model('Message', messageSchema)
