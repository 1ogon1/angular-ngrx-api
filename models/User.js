const mongoose = require('mongoose')
const scheme = mongoose.Schema

const userScheme = new scheme({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
})

module.exports = mongoose.model('users', userScheme)
