const mongoose = require('mongoose')

const dbKeys = require('./shared/db.keys')
const mediaMidel = require('./shared/media.midel')

const tagScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ...mediaMidel,
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: dbKeys.article }]
})

module.exports = mongoose.model(dbKeys.tag, tagScheme)
