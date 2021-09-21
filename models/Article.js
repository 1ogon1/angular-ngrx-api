const mongoose = require('mongoose')

const dbKeys = require('./shared/db.keys')
const mediaMidel = require('./shared/media.midel')

const articleScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    body: {
        type: String,
    },
    ...mediaMidel,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: dbKeys.tag }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: dbKeys.user }
})

module.exports = mongoose.model(dbKeys.article, articleScheme)
