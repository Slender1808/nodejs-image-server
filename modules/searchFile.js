function teste(dir){
  return searchIndex(dir, dir, indexFile(dir))
}

//  { 'jpg-t.jpg': 0 }
let indice = []
function indexFile(obj) {
  for (let i = 0; i < obj.children.length; i++) {

    const name = obj.children[i].name
    const arr = new Object([{ [name]: i }])
    indice.push(arr[0])
    if (obj.children[i].type == "folder") {
      indexFile(obj.children[i])
    }
  }
  return indice
}

//  { 'jpg-t.jpg': 'dir.children[0].children[0]' }
let test = []
function searchIndex(obj, dir, index) {
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

//   dir.children[0].children[0]
function searchFile(header, dir, index) {
  const arryHeaders = header.split("/")

  let arrIndex = []
  let ind = 0

  for (let i = 1; i < arryHeaders.length; i++) {
    let file = arryHeaders[i]
    //  Buscando no index o file
    for (let i = 0; i < index.length; i++) {
      if (index[i][file] != undefined) {
        arrIndex[ind] = index[i][file]
        ind++
        break
      }
    }
  }

  let search = 'dir'
  for (let i = 0; i < arrIndex.length; i++) {
    search = search + '.children[' + arrIndex[i] + ']'
  }

  return search

}

module.exports = {
  teste,
  indexFile,
  searchIndex,
  searchFile,
}