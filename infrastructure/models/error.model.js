module.exports = class ErrorModel {
    constructor(message, errors) {
        this.errors = []
        this.message = message

        if (errors) {
            if (typeof errors === 'string') {
                this.errors.push(errors)                
            } else if (Array.isArray(errors)) {
                this.errors = errors
            }
        }
    }
}