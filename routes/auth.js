const express = require('express')
const controller = require('../controllers/auth')
const loginValidattors = require('../infrastructure/validators/login.validattors')
const registerValidators = require('../infrastructure/validators/register.validators')

const router = express.Router()

router.post('/login', loginValidattors, controller.login)
router.post('/register', registerValidators, controller.register)

module.exports = module.exports = {
    router,
    route: 'auth'
}
