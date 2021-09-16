const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

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

app.options('*', cors())
app.use(cors({ optionsSuccessStatus: 200, allowedHeaders: true }))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

module.exports = app
