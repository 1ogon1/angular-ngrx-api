const { StatusCodes } = require('http-status-codes')

const Article = require('../models/Article')
const dbKeys = require('../models/shared/db.keys')
const User = require('../models/User')
const catchErrorHandler = require('../utils/catch-error-handler')

let page = 1
let itemsPerPage = 25

module.exports.getList = async (request, response) => {
    try {
        initPagination(request)

        const articles = await Article.find().populate('author');

        console.log(articles);

        return response.status(StatusCodes.OK).json(articles)
    } catch (e) {
        catchErrorHandler(response.e)
    }
}

function initPagination(request) {
    page = (request.params.page && request.params.page > 1) || page;
    itemsPerPage = request.params.itemsPerPage || itemsPerPage
}

module.exports.create = async (request, response) => {
    try {
        const author = await User.findById(request.user.id)
        const article = new Article({
            author: author._id,
            body: request.body.body,
            slug: request.body.title,
            title: request.body.title,
            active: request.body.active || true,
            description: request.body.description,
        })
        author.articles.push(article);

        await article.save()
        await author.save()

        response.status(StatusCodes.CREATED).json({ slug: article.slug })
    } catch (e) {
        catchErrorHandler(response, e)
    }
}