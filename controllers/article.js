const { StatusCodes } = require('http-status-codes')

const Pagination = require('../utils/pagination')
const repositoryStatus = require('../utils/repositoryStatus')
const repository = require('../repositories/article.repository')
const { catchError, validationError } = require('../utils/errorHandler')

module.exports.getList = async (request, response) => {
    try {
        const result = await repository.getList(new Pagination(request.query), request.user.id, request.query.tag)

        switch (result.status) {
            case repositoryStatus.success:
                return response.status(StatusCodes.OK).json(result.data)
            case repositoryStatus.exception:
                return response.status(StatusCodes.BAD_REQUEST).json(validationError(result.message))
        }
    } catch (e) {
        catchError(response, e)
    }
}

module.exports.create = async (request, response) => {
    try {
        const result = await repository.create(request.body, request.user.id)

        switch (result.status) {
            case repositoryStatus.success:
                return response.status(StatusCodes.CREATED).json(result.data)
            case repositoryStatus.exception:
                return response.status(StatusCodes.BAD_REQUEST).json(validationError(result.message))
        }
    } catch (e) {
        catchError(response, e)
    }
}

module.exports.favorite = async (request, response) => {
    try {
        const result = await repository.favorite(request.body.id, request.user.id)

        switch (result.status) {
            case repositoryStatus.success:
                return response.status(StatusCodes.OK).json()
            case repositoryStatus.notFound:
                return response.status(StatusCodes.NOT_FOUND).json(validationError(result.message))
            case repositoryStatus.exception:
                return response.status(StatusCodes.BAD_REQUEST).json(validationError(result.message))
        }
    } catch (e) {
        catchError(response, e)
    }
}

module.exports.addTag = async (request, response) => {
    try {
        const result = await repository.addTag(request.body.articleId, request.body.tagId)

        switch (result.status) {
            case repositoryStatus.success:
                return response.status(StatusCodes.OK).json()
            case repositoryStatus.notFound:
                return response.status(StatusCodes.NOT_FOUND).json(validationError(result.message))
            case repositoryStatus.exception:
                return response.status(StatusCodes.BAD_REQUEST).json(validationError(result.message))
        }
    } catch (e) {
        catchError(response, e)
    }
}