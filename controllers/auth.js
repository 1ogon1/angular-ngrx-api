const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config/config')
const User = require('../models/User')
const errorHandler = require('../utils/error-handler')

module.exports.login = async (request, response) => {
  const candidate = await User.findOne({
    email: require.body.email,
  })

  if (candidate && bcrypt.compareSync(request.body.password, candidate.password)) {
    const token = jwt.sign(
      {
        email: candidate.email,
        userId: candidate._id,
      },
      config.secretKey,
      { expiresIn: 60 * 60 }
    )

    response.status(200).json({ token: `Bearer ${token}` })
  }

  response.status(403).json({ message: 'Wrong login data' })
}

module.exports.register = async (request, response) => {
  const candidate = await User.findOne({
    email: request.body.email,
  })

  if (candidate) {
    return response.status(409).json({
      message: 'User with this email already exists',
    })
  }

  const salt = bcrypt.genSaltSync(10)
  const user = new User({
    email: request.body.email,
    username: request.body.username,
    password: bcrypt.hashSync(request.body.password, salt),
  })

  try {
    await user.save()
    response.status(201).json(user)
  } catch (e) {
    errorHandler(response, e)
  }
}
