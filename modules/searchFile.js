//  { 'jpg-t.jpg': 0 }
let indice = []
function indexFile(obj) {
  for (let i = 0; i < obj.children.length; i++) {

    const name = obj.children[i].path.replace("public", "")
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
    const name = obj.children[i].path.replace("public", "")
    const search = searchFile(name, index)

    const arr = new Object([{ [name]: search }])

    console.log('name ' + name)
    console.log('search ' + search)

    test.push(arr[0])
    if (eval(search + '.type') == "folder") {
      searchIndex(obj.children[i], dir, index)
    }
  }

  return test
}

//   dir.children[0].children[0]
function searchFile(header, index) {
  let arryHeaders = header.split("/")
  console.log(arryHeaders)
  console.log('--------')
  let arrIndex = []
  let ind = 0

  for (var sub = 1; sub < arryHeaders.length; sub++) {
    let file = '/' + arryHeaders[sub]
    //  Buscando no index o file
    for (let i = 0; i < index.length; i++) {
      if (index[i][file] != undefined) {
        arrIndex[ind] = index[i][file]
        const pos = sub + 1
        arryHeaders[pos] = file + '/' + arryHeaders[pos]
        console.log('arryHeaders ' + arryHeaders[pos])
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
  indexFile,
  searchIndex,
  searchFile,
}