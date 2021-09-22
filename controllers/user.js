const { StatusCodes } = require('http-status-codes')

const repository = require('../repositories/user.repository')
const repositoryStatus = require('../utils/repositoryStatus')
const { validationError, catchError } = require('../utils/errorHandler')

module.exports.getCurrentUser = async (request, response) => {
  try {
    const result = await repository.getById(request.user.id)

    switch (result.status) {
      case repositoryStatus.success:
        return response.status(StatusCodes.OK).json(result.data)
      case repositoryStatus.notFound:
        return response.status(StatusCodes.NOT_FOUND).json(validationError(result.message))
      case repositoryStatus.exception:
        return response.status(StatusCodes.BAD_REQUEST).json(validationError(result.message))
    }
  } catch (e) {
    catchError(response, e)
  }
}

module.exports.getById = async (request, response) => {
  try {
    const result = await repository.getById(request.params.id)

    switch (result.status) {
      case repositoryStatus.success:
        return response.status(StatusCodes.OK).json(result.data)
      case repositoryStatus.notFound:
        return response.status(StatusCodes.NOT_FOUND).json(validationError(result.message))
      case repositoryStatus.exception:
        return response.status(StatusCodes.BAD_REQUEST).json(validationError(result.message))
    }
  } catch (e) {
    catchError(response, e)
  }
}
