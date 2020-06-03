const searchFile = require('./searchFile.js')
let test = []
module.exports = function searchIndex(obj, dir, index) {
  for (let i = 0; i < obj.children.length; i++) {

    const name = obj.children[i].name
    const search = searchFile(obj.children[i].path, dir, index)

    const arr = new Object([{ [name]: search }])

    test.push(arr[0])
    if (eval(search + '.type') == "folder") {
      searchIndex(obj.children[i], dir, index)
    }
  }
  return test
}