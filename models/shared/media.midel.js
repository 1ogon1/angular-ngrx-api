const slug = require('slug')

const dateModel = require("./date.model");

module.exports = {
    active: {
        type: Boolean,
        default: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        set: value => slug(value)
    },
    ...dateModel
}