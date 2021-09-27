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
    author: { type: mongoose.Schema.Types.ObjectId, ref: dbKeys.user },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: dbKeys.favorites }]
})

articleScheme.static.lookup = function ({ parg, query }) {
    const ref = mongoose.model(this.schema.path(path).caster.options.ref)

    const pipeline = [
        {
            $lookup: {
                from: ref.collection.name,
                as: path,
                let: { [path]: `$${path}` },
                pipeline: [
                    {
                        $match: {
                            ...query,
                            $expr: {
                                $in: [
                                    $_id, `$$${path}`
                                ]
                            }
                        }
                    }
                ]
            }
        }
    ]

    return this
        .aggregate(pipeline)
        .exec()
        .then(r => r
            .map(m => this({
                ...m,
                [path]: m[path].map(r => ref(r))
            })))
}

module.exports = mongoose.model(dbKeys.article, articleScheme)
