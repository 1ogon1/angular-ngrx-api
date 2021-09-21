const { StatusCodes } = require('http-status-codes')
const { validationResult } = require('express-validator')

const repository = require('../repositories/auth.repository')
const validationErrorHandler = require('../utils/validation-error-handler')

module.exports.login = async (request, response) => {
  const error = validationResult(request)

  if (!error.isEmpty()) {
    return response.status(StatusCodes.BAD_REQUEST).json(validationErrorHandler('Invalid input data', error))
  }

  const result = await repository.login(request.body)

  if (result.success) {
    return response.status(StatusCodes.OK).json(result.data)
  }

  response.status(StatusCodes.BAD_REQUEST).json(validationErrorHandler(result.message))
}

module.exports.register = async (request, response) => {
  const error = validationResult(request)

  if (!error.isEmpty()) {
    return response.status(StatusCodes.BAD_REQUEST).json(validationErrorHandler('Invalid input data', error))
  }

  const result = await repository.register(request.body)

  if (result.success) {
    return response.status(StatusCodes.CREATED).json(result.data)
  }

  response.status(StatusCodes.BAD_REQUEST).json(validationErrorHandler(result.message))
}