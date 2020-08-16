const fs = require('fs')
const path = require('path')
const switchContentType = require('./switchContentType')

module.exports = function dirTree(filename) {
  const stats = fs.lstatSync(filename)
  var info = {
    path: filename,
    name: path.basename(filename)
  }
  return stats.isDirectory() ? (
    info.type = 'folder',
    info.contentType = 'application/json',
    info.children = fs.readdirSync(filename).map(function (info) {
      return dirTree(filename + '/' + info)
    })
    
  ) : (
      // Assuming it's a file. In real life it could be a symlink or
      // something else!
      info.type = 'file',
      info.ext = path.extname(filename),
      info.contentType = switchContentType(info.ext)
    ),
    info
}