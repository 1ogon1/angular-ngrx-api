const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const config = require('./config/config')

const app = express()

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

mongoose
  .connect(config.mongoDbUrl)
  .then(() => {
    console.log('MogoDB connected')
  })
  .catch((e) => {
    console.log(e)
  })

require('./models/User')

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

module.exports = app
