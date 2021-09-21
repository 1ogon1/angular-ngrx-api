const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const config = require("../config/config")

module.exports.login = async ({ email, password }) => {
    const candidate = await User.findOne({ email })

    if (candidate && bcrypt.compareSync(password, candidate.password)) {
        return {
            success: true,
            data: getUserData(candidate)
        }
    }

    return {
        success: false,
        message: 'Wrong login data'
    }
}

module.exports.register = async (data) => {
    let user = await User.findOne({
        email: data.email,
    })

    if (user) {
        return {
            success: false,
            message: 'User with this email already exists'
        }
    }

    user = new User({
        bio: null,
        image: null,
        email: data.email,
        username: data.username,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)),
    })

    try {
        await user.save()

        return {
            success: true,
            data: getUserData(user)
        }
    } catch (e) {
        // catchErrorHandler(response, e)
        return {
            success: false,
            message: 'Failed to create user'
        }
    }
}

function getUserData(user) {
    return {
        user: {
            id: user._id,
            bio: user.bio,
            image: user.image,
            email: user.email,
            username: user.username,
            token: getToken(user.email, user._id)
        }
    }
}

function getToken(email, userId) {
    return jwt.sign(
        { email, userId },
        config.secretKey,
        { expiresIn: 60 * 60 }
    )
}