const express = require('express')
const controller = require('../controllers/auth')
const registerValidators = require('../infrastructure/validators/register.validators')

const router = express.Router()

router.post('/login', controller.login)
router.post('/register', registerValidators, controller.register)

module.exports = router
