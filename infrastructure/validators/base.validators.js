const { check } = require('express-validator')

module.exports.emailValidator = check('email', 'Invalid email address').notEmpty().isEmail()