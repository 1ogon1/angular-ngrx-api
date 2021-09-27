const Tag = require('../models/Tag')
const status = require("../utils/repositoryStatus")

module.exports.create = async ({ name }) => {
    try {
        let tag = await Tag.findOne({ name })

        if (tag) {
            return {
                status: status.error,
                message: 'Tag with this name already exist'
            }
        }

        tag = new Tag({
            name,
            slug: name
        })

        await tag.save()

        return {
            status: status.success,
            data: {
                slug: tag.slug
            }
        }
    } catch (e) {
        console.log(e);
        return {
            status: status.exception,
            message: 'Failed to create tag'
        }
    }
}

module.exports.getPopularList = async () => {
    try {
        const tags = await Tag.find().sort({ rating: -1 }).limit(20)

        return {
            status: status.success,
            data: {
                tags: tags.map(tag => ({
                    id: tag._id,
                    name: tag.name,
                    slug: tag.slug
                }))
            }
        }
    } catch (e) {
        return {
            status: status.exception,
            message: 'Failed to get the list of tags'
        }
    }
}

module.exports.updateRating = async (id) => {
    try {
        const tag = await Tag.findById(id)

        if (tag) {
            tag.rating += 1
            tag.updatedAt = new Date()

            await tag.save()
        }
    } catch (e) {
        console.log(e);
    }
}