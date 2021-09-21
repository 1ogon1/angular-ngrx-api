const express = require('express')
const passport = require('passport')
const controller = require('../controllers/article')

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getList)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)

module.exports = {
    router,
    route: 'article'
}
