const fs = require('fs')
const path = require('path')
const mongoose = require("mongoose")

const config = require("../config/config")

module.exports = () => {
    mongoose
        .connect(config.mongoDbUrl)
        .then(() => {
            console.log('MogoDB connected')

            fs.readdir(__dirname, (error, files) => {
                if (error) {
                    return console.log('Unable to scan db models directory: ' + err);
                }

                const currentFile = path.basename(__filename)
                
                files
                    .filter(f => f.indexOf('.js') > -1 && f !== currentFile)
                    .forEach((file) => {
                        require(path.resolve(__dirname, file))
                    })
            })
        })
        .catch((e) => {
            console.log(e)
        })
}
