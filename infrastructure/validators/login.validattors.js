const { check } = require("express-validator");

module.exports = [
    check('email', 'Invalid email address')
        .notEmpty()
        .isEmail(),
    check('password', 'The minimum password length is 6 characters')
        .trim()
        .isLength({ min: 6 })
        .withMessage()
]