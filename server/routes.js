const fs = require('fs')
const JSONPath = require('jsonpath')

module.exports = function routes(headers, dir) {
  console.log(headers)

  const result404 = JSONPath.query(dir, "$..[?(@.type=='file' && @.path=='public/semfoto.webp')]")
  result404[0].byte = fs.readFileSync(result404[0].path)
  result404[0].status = 404

  const result = JSONPath.query(dir, `$..[?(@.path == '${headers.substr(1)}')]`)

  if (result.length > 0) {
    if (result[0].type == 'folder') {
      result[0].contentType = 'application/json'
      result[0].byte = JSON.stringify(result[0])
    } else {
      result[0].status = 200
      result[0].byte = fs.readFileSync(result[0].path)
      return result[0]
    }
  } else {
    return result404[0]
  }
}