const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const config = require('../config/config')
const catchErrorHandler = require('../utils/catch-error-handler')
const validationErrorHandler = require('../utils/validation-error-handler')

module.exports.login = async (request, response) => {
  const error = validationResult(request)

  console.log({error: error.array()});
  if (!error.isEmpty()) {
    return response.status(StatusCodes.BAD_REQUEST).json(validationErrorHandler('Invalid input data', error))
  }

  const candidate = await User.findOne({
    email: request.body.email,
  })

  if (candidate && bcrypt.compareSync(request.body.password, candidate.password)) {
    return response.status(StatusCodes.OK).json({
      user:
      {
        id: candidate._id,
        bio: candidate.bio, 
        image: candidate.image, 
        email: candidate.email, 
        username: candidate.username, 
        token: getToken(candidate.email, candidate._id)
      }
    })
  }

  response.status(StatusCodes.BAD_REQUEST).json(validationErrorHandler('Wrong login data'))
}

module.exports.register = async (request, response) => {
  const error = validationResult(request)

  if (!error.isEmpty()) {
    return response.status(StatusCodes.BAD_REQUEST).json(validationErrorHandler('Invalid input data', error))
  }

  const candidate = await User.findOne({
    email: request.body.email,
  })

  if (candidate) {
    return response.status(StatusCodes.BAD_REQUEST).json(validationErrorHandler('User with this email already exists'))
  }

  const salt = bcrypt.genSaltSync(10)
  const user = new User({
    bio: null,
    image: null,
    email: request.body.email,
    username: request.body.username,
    password: bcrypt.hashSync(request.body.password, salt),
  })

  try {
    await user.save()
    response.status(StatusCodes.CREATED).json({
      user:
      {
        id: user._id,
        bio: user.bio, 
        image: user.image, 
        email: user.email, 
        username: user.username, 
        token: getToken(user.email, user._id)
      }
    })
  } catch (e) {
    catchErrorHandler(response, e)
  }
}

function getToken(email, userId) {
  const token = jwt.sign(
    { email, userId },
    config.secretKey,
    { expiresIn: 60 * 60 }
  )

  return `Bearer ${token}`
}