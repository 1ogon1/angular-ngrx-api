const { check } = require('express-validator')

const User = require('../../models/User')

module.exports = [
    check('email', 'Invalid email address')
        .notEmpty()
        .isEmail()
        .custom(async (email) => {
            const user = await User.findOne({ email })

            if (user) {
                throw new Error('User with this email already exist')
            }
        }),
    check('username', 'Username is required field')
        .notEmpty()
        .trim()
        .isLength({ min: 3 })
        .custom(async (username) => {
            const user = await User.findOne({ username })

            if (user) {
                throw new Error('User with this username already exist')
            }
        }),
    check('password', 'The minimum password length is 6 characters')
        .trim()
        .isLength({ min: 6 })
        .withMessage()
]