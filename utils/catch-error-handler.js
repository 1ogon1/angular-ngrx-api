const { StatusCodes } = require("http-status-codes")
const validationErrorHandler = require("./validation-error-handler")

module.exports = (response, e) => {
  response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(validationErrorHandler(e.message))
}
