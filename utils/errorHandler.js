const { StatusCodes } = require("http-status-codes")

const ErrorModel = require("../infrastructure/models/error.model")

const validationError = (message, errors, onlyFirstError = true) => {
    const messages = []

    errors && errors.array({ onlyFirstError }).forEach(({ msg, param }) => {
        let error = messages.find(e => e.type === param)

        if (error) {
            error.messages.push(msg)
        } else {
            error = {
                type: param,
                messages: [msg]
            }

            messages.push(error)
        }
    });

    return new ErrorModel(message || 'An unhandled error has occurred', messages)
}

module.exports.catchError = (response, e) => {
  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(validationError(e.message))
}

module.exports.validationError = validationError