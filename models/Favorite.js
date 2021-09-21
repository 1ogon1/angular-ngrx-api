const mongoose = require('mongoose')

const dbKeys = require('./shared/db.keys')

const favoriteScheme = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    article_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    dateAdd: {
        type: Date,
        default: new Date()
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: dbKeys.user }],
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: dbKeys.article }]
})

module.exports = mongoose.model(dbKeys.favorite, favoriteScheme)
