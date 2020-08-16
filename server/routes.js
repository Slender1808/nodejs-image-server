const fs = require('fs')
const JSONPath = require('jsonpath')

module.exports = function routes(headers, dir) {
 
  const result = JSONPath.query(dir, `$..[?(@.path == '${headers.substr(1)}')]`)
  console.log(result[0].path)

  if (result.length > 0) {
    if (result[0].type == 'folder') {
      result[0].byte = JSON.stringify(result[0])
      return result[0]
    } else {
      result[0].byte = fs.readFileSync(result[0].path)
      return result[0]
    }
  } else {
    return 404
  }
}