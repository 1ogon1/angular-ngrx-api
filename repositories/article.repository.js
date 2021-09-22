const mongoose = require('mongoose')

const User = require('../models/User')
const Article = require('../models/Article')
const status = require('../utils/repositoryStatus')
const Favorite = require('../models/Favorite')

module.exports.getList = async (pagination, currentUserId) => {
    try {
        const articles = await Article
            .find({ active: true }, null, { skip: pagination.skip, limit: pagination.limit })
            .populate('author', '_id username image')

        const favorites = await Favorite.find({
            '_id': {
                '$in': articles.map(a => a.favorites).flat(1).map(id => mongoose.Types.ObjectId(id))
            }
        }, 'userId articleId')

        if (articles) {
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
                        tags: article.tags?.map(tag => ({
                            id: tag._id,
                            name: tag.name
                        })),
                        author: {
                            id: article.author._id,
                            image: article.author.image,
                            username: article.author.username
                        }
                    })),
                    articlesCount: await Article.count()
                }
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

module.exports.create = async (data, userId) => {
    try {
        console.log({ data, userId });
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