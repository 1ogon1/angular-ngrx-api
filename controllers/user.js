const { StatusCodes } = require('http-status-codes')

const User = require('../models/User')
const catchErrorHandler = require('../utils/catch-error-handler')
const validationErrorHandler = require('../utils/validation-error-handler')

module.exports.getCurrentUser = async (request, response) => {
  try {
    const user = await User.findById(request.user.id)

    if (user) {
      return response.status(200).json({
        user:
        {
          id: user._id,
          bio: user.bio,
          image: user.image,
          email: user.email,
          username: user.username
        }
      })
    }
 
    return response.status(StatusCodes.UNAUTHORIZED).json()
  } catch (e) {
    catchErrorHandler(response.e)
  }
}

module.exports.getById = async (request, response) => {
  try {
    if (request.params.id) {
      const user = await User.findById(request.params.id).populate('articles')
      //  User.findById(request.params.id).populate('articles').exec(function(e, a) {
      //    console.log(a);
      //  })

      return response.status(200).json(user)
      if (user) {
        return response.status(200).json({
          user:
          {
            id: user._id,
            bio: user.bio,
            image: user.image,
            email: user.email,
            username: user.username,
            articles: user.articles
          }
        })
      }
    }

    return response.status(StatusCodes.NOT_FOUND).json(validationErrorHandler('User not found'))
  } catch (e) {
    catchErrorHandler(response, e)
  }
}
