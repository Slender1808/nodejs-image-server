const fs = require('fs'), path = require('path');

module.exports = function dirTree(filename) {
  const stats = fs.lstatSync(filename)
  var info = {
    path: filename,
    name: path.basename(filename)
  }
  return stats.isDirectory() ? (
    info.type = 'folder',
    info.children = fs.readdirSync(filename).map(function (info) {
      return dirTree(filename + '/' + info)
    })
  ) : (
      // Assuming it's a file. In real life it could be a symlink or
      // something else!
      info.type = 'file',
      info.byte = fs.readFileSync(filename),
      info.ext = path.extname(filename)
    ),
    info
}