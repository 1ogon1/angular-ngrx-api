const User = require('../models/User')
const catchErrorHandler = require('../utils/catch-error-handler')
const validationErrorHandler = require('../utils/validation-error-handler')

module.exports.getById = async (request, response) => {
  try {
    console.log(request.params)
    if (request.params.id) {
      const user = await User.findById(request.params.id)

      if (user) {
        return response.status(200).json(user)
      }
    }

    return response.status(404).json(validationErrorHandler('User not found'))
  } catch (e) {
    catchErrorHandler(response, e)
  }
}
