const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passwort = require('passport')
const path = require('path')

const app = express()

const authRouter = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)
// const keys = require('./config/keys')

// mongoose
//     .connect(keys.mongoDbUrl)
//     .then(() => {
//         console.log('MogoDB connected')
//     })
//     .catch((e) => {
//         console.log(e)
//     });

module.exports = app