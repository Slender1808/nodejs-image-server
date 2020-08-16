const fs = require('fs')
const JSONPath = require('jsonpath')

module.exports = function routes(headers, dir) {
 
  const result = JSONPath.query(dir, `$..[?(@.path == '${headers.substr(1)}')]`)

  if (result.length > 0) {
    if (result[0].type == 'folder') {
      result[0].byte = JSON.stringify(result)
      return result[0]
    } else {
      return result[0]
    }
  } else {
    return 404
  }
}