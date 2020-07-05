const fs = require('fs')
const contentFilePath = 'base.json'

function save(content) {
  console.log('Json Salvo')
  return fs.writeFileSync(contentFilePath, JSON.stringify(content))
}

function load() {
  console.log('Json Load')
  return JSON.parse(fs.readFileSync(contentFilePath, 'utf-8'))
}

module.exports = {
  save,
  load
}