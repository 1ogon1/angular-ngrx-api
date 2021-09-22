const mongoose = require('mongoose')

const dbKeys = require('./shared/db.keys')

const favoriteScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId
    },
    dateAdd: {
        type: Date,
        default: new Date()
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: dbKeys.user },
    article: { type: mongoose.Schema.Types.ObjectId, ref: dbKeys.article }
})

module.exports = mongoose.model(dbKeys.favorite, favoriteScheme)
