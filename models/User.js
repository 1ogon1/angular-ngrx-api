const mongoose = require('mongoose')

const dbKeys = require('./shared/db.keys')
const dateModel = require('./shared/date.model')

const userScheme = new mongoose.Schema({
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
  ...dateModel,
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: dbKeys.article }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: dbKeys.favorite }]
})

module.exports = mongoose.model(dbKeys.user, userScheme)
