const mongoose = require('mongoose')

const Tag = require('../models/Tag')
const User = require('../models/User')
const Article = require('../models/Article')
const Favorite = require('../models/Favorite')
const status = require('../utils/repositoryStatus')
const { updateRating } = require('./tag.repository')

module.exports.getList = async (pagination, currentUserId, tagId) => {
    try {
        const query = { active: true }

        if (tagId) {
            await updateRating(tagId)
            query.tags = { $in: [tagId] }
        }

        const articles = await Article
            .find(query, null, { skip: pagination.skip, limit: pagination.limit })
            .populate('author', '_id username image')

        const favorites = await Favorite.find({
            '_id': {
                '$in': articles.map(a => a.favorites).flat(1).map(id => mongoose.Types.ObjectId(id))
            }
        }, 'userId articleId')

        const tags = await Tag.find({
            _id: {
                $in: articles.map(a => a.tags).flat(1).map(id => mongoose.Types.ObjectId(id))
            }
        }, '_id name')

        return {
            status: status.success,
            data: {
                articles: articles.map(article => ({
                    id: article._id,
                    slug: article.slug,
                    title: article.title,
                    description: article.description,
                    createdAt: article.createdAt,
                    favorites: article.favorites?.length || 0,
                    favorided: favorites?.some(f => f.userId == currentUserId && f.articleId == `${article._id}`),
                    tags: article
                        .tags?.map(at => {
                            const tag = tags.find(t => `${t._id}` == `${at}`)

                            return tag ? {
                                id: tag._id,
                                name: tag.name
                            } : null
                        })
                        .filter(t => t != null),
                    author: {
                        id: article.author._id,
                        image: article.author.image,
                        username: article.author.username
                    }
                })),
                articlesCount: await Article.count()
            }
        }
    } catch (e) {
        console.log(e)

        return {
            status: status.exception,
            message: 'Failed to process the request. Please try again later'
        }
    }
}

module.exports.create = async (data, userId) => {
    try {
        const author = await User.findById(userId)
        const article = new Article({
            author: author._id,
            body: data.body,
            slug: data.title,
            title: data.title,
            active: data.active || true,
            description: data.description,
        })
        author.articles.push(article);

        await article.save()
        await author.save()

        return {
            status: status.success,
            data: {
                slug: article.slug
            }
        }
    } catch (e) {
        console.log(e)

        return {
            status: status.exception,
            message: 'Failed to create article'
        }
    }
}

module.exports.favorite = async (articleId, userId) => {
    try {
        const article = await Article.findById(articleId);

        if (article) {
            const user = await User.findById(userId)
            let favorite = await Favorite.findOne({ userId, articleId })

            if (favorite) {
                user.favorites.remove(favorite)
                article.favorites.remove(favorite)

                await user.save()
                await article.save()
                await favorite.remove()

                return {
                    status: status.success
                }
            }

            favorite = new Favorite({
                userId,
                articleId,
                user: user._id,
                article: article._id
            })

            user.favorites.push(favorite)
            article.favorites.push(favorite)

            await favorite.save()
            await user.save()
            await article.save()

            return {
                status: status.success
            }
        }

        return {
            status: status.notFound,
            message: 'Articles not found'
        }
    } catch (e) {
        console.log(e)

        return {
            status: status.exception,
            message: 'Failed to process the request. Please try again later'
        }
    }
}

module.exports.addTag = async (articleId, tagId) => {
    try {
        const article = await Article.findById(articleId)

        if (article) {
            const tag = await Tag.findById(tagId)

            if (tag) {
                if (article.tags.some(t => `${t}` == `${tag._id}`)) {
                    article.tags.remove(tag)
                    tag.articles.remove(article)
                } else {
                    article.tags.push(tag)
                    tag.articles.push(article)
                }

                await tag.save()
                await article.save()

                return {
                    status: status.success
                }
            }

            return {
                status: status.notFound,
                message: 'Tag not found'
            }
        }

        return {
            status: status.notFound,
            message: 'Article not found'
        }
    } catch (e) {
        console.log(e)

        return {
            status: status.exception,
            message: 'Failed to process the request. Please try again later'
        }
    }
}