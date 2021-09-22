const { catchError } = require("../utils/errorHandler")
const repository = require('../repositories/tag.repository')
const repositoryStatus = require("../utils/repositoryStatus")

module.exports.getPopularList = async (request, response) => {
    try {
          const result = await repository.getPopularList()

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

module.exports.create = async (request, response) => {
    try {
        const result = await repository.create(request.body)

        switch (result.status) {
            case repositoryStatus.success:
                return response.status(StatusCodes.OK).json(result.data)
            case repositoryStatus.error:
                return response.status(StatusCodes.NOT_FOUND).json(validationError(result.message))
            case repositoryStatus.exception:
                return response.status(StatusCodes.BAD_REQUEST).json(validationError(result.message))
        }
    } catch (e) {
        catchError(e)
    }
}