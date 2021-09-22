const User = require("../models/User")
const status = require('../utils/repositoryStatus')

module.exports.getById = async (id) => {
    try {
        const user = await User.findById(id)

        if (user) {
            return {
                status: status.success,
                data: {
                    user:
                    {
                        id: user._id,
                        bio: user.bio,
                        image: user.image,
                        email: user.email,
                        username: user.username
                    }
                }
            }
        }

        return {
            status: status.notFound,
            message: 'User not found'
        }
    } catch (e) {
        console.log(e)
        return {
            status: status.exception,
            message: 'Failed to create user'
        }
    }
}