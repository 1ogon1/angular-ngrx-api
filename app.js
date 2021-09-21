const cors = require('cors')
const express = require('express')
const passport = require('passport')

const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

//init mongoDB
require('./models/index')()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.options('*', cors())
app.use(cors({ optionsSuccessStatus: 200, allowedHeaders: true }))

// init routes
require('./routes/index')(app)

module.exports = app
