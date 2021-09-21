const express = require('express')
const passport = require('passport')
const controller = require('../controllers/user')

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getCurrentUser)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)

module.exports = module.exports = {
    router,
    route: 'user'
}
