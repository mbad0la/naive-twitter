const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profileImageUrl: { type: String, default: '/img/profile_image.jpg' },
  followers: [String]
})

userSchema.index({ username: 1 })

const User = mongoose.model('users', userSchema)

module.exports = { User }
