const ErrorModel = require("../infrastructure/models/error.model")

module.exports = (message, errors, onlyFirstError = true) => {
    const messages = []

    errors && errors.array({ onlyFirstError }).forEach(({ msg, param }) => {
        let error = messages.find(e => e.type === param)

        if (error) {
            error.messages.push(msg)
        } else {
            error = {
                type: param,
                messages: [msg]
            }

            messages.push(error)
        }
    });

    return new ErrorModel(message || 'An unhandled error has occurred', messages)
}