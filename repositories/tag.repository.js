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
            slug: data.name
        })

        await tag.save()

        return {
            status: status.success,
            data: {
                slug: tag.slug
            }
        }
    } catch (e) {
        return {
            status: status.exception,
            message: 'Failed to create user'
        }
    }
}

module.exports.getPopularList = () => {

}