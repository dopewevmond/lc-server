import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, required: true },
  dateJoined: { type: Date, default: Date.now },
  avatar: { type: String, required: false },
  bio: { type: String, default: '' }
})

export const User = model('User', userSchema)
