const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  name: { type: String, required: true },
  followers: [String]
})

const postUser = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true }
})

const postSchema = new Schema({
  user: postUser,
  content: { type: String, required: true, minlength: 1, maxlength: 140 },
  timestamp: { type : Date, default: Date.now }
})

userSchema.index({ username: 1, name: 1 })
postSchema.index({ 'user.username': 1, timestamp: -1 })

const User = mongoose.model('users', userSchema)
const Post = mongoose.model('posts', postSchema)

module.exports = { User, Post }
