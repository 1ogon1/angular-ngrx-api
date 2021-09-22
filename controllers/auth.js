const { StatusCodes } = require('http-status-codes')
const { validationResult } = require('express-validator')

const { validationError } = require('../utils/errorHandler')
const repository = require('../repositories/auth.repository')

module.exports.login = async (request, response) => {
  const error = validationResult(request)

  if (!error.isEmpty()) {
    return response.status(StatusCodes.BAD_REQUEST).json(validationError('Invalid input data', error))
  }

  const result = await repository.login(request.body)

  if (result.success) {
    return response.status(StatusCodes.OK).json(result.data)
  }

  response.status(StatusCodes.BAD_REQUEST).json(validationError(result.message))
}

module.exports.register = async (request, response) => {
  const error = validationResult(request)

  if (!error.isEmpty()) {
    return response.status(StatusCodes.BAD_REQUEST).json(validationError('Invalid input data', error))
  }

  const result = await repository.register(request.body)

  if (result.success) {
    return response.status(StatusCodes.CREATED).json(result.data)
  }

  response.status(StatusCodes.BAD_REQUEST).json(validationError(result.message))
}