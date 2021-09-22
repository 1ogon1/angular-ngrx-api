module.exports = class Pagination {
    skip = 0
    limit = 2

    constructor({ page, itemsPerPage }) {
        if (itemsPerPage && itemsPerPage > 0 && itemsPerPage <= 100) {
            this.limit = +itemsPerPage
        }

        if (page && page > 1) {
            this.skip = (+page - 1) * this.limit
        }
    }
}