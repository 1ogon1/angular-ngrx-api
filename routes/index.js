const fs = require('fs')
const path = require('path')

module.exports = (app) => {
    fs.readdir(__dirname, (error, files) => {
        if (error) {
            return console.log('Unable to scan router directory: ' + err);
        }

        const currentFile = path.basename(__filename)

        files
            .filter(f => f.indexOf('.js') > -1 && f !== currentFile)
            .forEach((file) => {
                const { route, router } = require(path.resolve(__dirname, file))

                if (router && route) {
                    app.use(`/api/${route}`, router)
                }
            })
    })
}