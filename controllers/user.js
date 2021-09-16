const User = require('../models/User')
const errorHandler = require('../utils/error-handler')

module.exports.getById = async (request, response) => {
  try {
    console.log(request.params)
    if (request.params.id) {
      const user = await User.findById(request.params.id)

      if (user) {
        return response.status(200).json(user)
      }
    }

    return response.status(404).json({
      message: 'User not found',
    })
  } catch (e) {
    errorHandler(response, e)
  }
}
