const mongoose = require('mongoose')

const dbKeys = require('./shared/db.keys')
const mediaMidel = require('./shared/media.midel')

const tagScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    ...mediaMidel,
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: dbKeys.article }]
})

module.exports = mongoose.model(dbKeys.tag, tagScheme)
