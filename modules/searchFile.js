module.exports = function searchFile(header, dir, index) {
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