const express = require('express')
const passport = require('passport')
const controller = require('../controllers/tag')

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getPopularList)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

module.exports = module.exports = {
    router,
    route: 'tags'
}
