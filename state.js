const fs = require('fs')
const contentFilePath = './src/app/infra/base.json'

function save(content) {
    console.log('Json Salvo')
    var contentString = JSON.stringify(content)
    return fs.writeFileSync(contentFilePath, contentString)
}

function load() {
    var fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
    var contentJson = JSON.parse(fileBuffer)
    return contentJson
}

module.exports = {
    save,
    load
}